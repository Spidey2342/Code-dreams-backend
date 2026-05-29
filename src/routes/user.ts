import { Router, Response } from "express";
import { prisma } from "../../lib/prisma";
import { requireAuth, AuthRequest } from "../middleware/authMiddleware";

const router = Router();

// ── GET /api/user/me ──
router.get("/me", requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      include: {
        streak: true,
        progress: {
          include: { lesson: true },
        },
        certificates: true,
      },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const totalXP = user.progress.reduce((sum, p) => sum + p.xpEarned, 0);

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      isPro: user.isPro,
      totalXP,
      currentStreak: user.streak?.currentStreak || 0,
      longestStreak: user.streak?.longestStreak || 0,
      completedLessons: user.progress.length,
      certificates: user.certificates.length,
    });
  } catch (error) {
    console.error("Me error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ── GET /api/user/leaderboard ──
router.get("/leaderboard", requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        progress: true,
      },
      take: 10,
    });

    const ranked = users
      .map((u) => ({
        id: u.id,
        name: u.name,
        totalXP: u.progress.reduce((sum, p) => sum + p.xpEarned, 0),
        isYou: u.id === req.userId,
      }))
      .sort((a, b) => b.totalXP - a.totalXP)
      .map((u, i) => ({ ...u, rank: i + 1 }));

    res.json({ leaderboard: ranked });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ── GET /api/user/activity ──
router.get("/activity", requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const progress = await prisma.userProgress.findMany({
      where: { userId: req.userId },
      include: {
        lesson: {
          include: { track: true },
        },
      },
      orderBy: { completedAt: "desc" },
      take: 10,
    });

    const activity = progress.map((p) => ({
      id: p.id,
      lessonTitle: p.lesson.title,
      trackName: p.lesson.track.name,
      xpEarned: p.xpEarned,
      completedAt: p.completedAt,
      lessonOrder: p.lesson.order,
    }));

    res.json({ activity });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;