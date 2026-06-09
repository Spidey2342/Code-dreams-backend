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
router.get("/leaderboard", requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: { progress: true },
    });

    // Rank EVERYONE first (rank is global), then slice for display
    const ranked = users
      .map((u) => ({
        id: u.id,
        name: u.name,
        totalXP: u.progress.reduce((sum, p) => sum + p.xpEarned, 0),
        isYou: u.id === req.userId,
      }))
      .filter((u) => u.totalXP > 0)
      .sort((a, b) => b.totalXP - a.totalXP)
      .map((u, i) => ({ ...u, rank: i + 1 })); // rank assigned to ALL

    const leaderboard = ranked.slice(0, 50);          // top 50 for display
    const currentUser = ranked.find((u) => u.isYou) || null; // your real rank

    res.json({ leaderboard, currentUser, totalUsers: ranked.length });
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

// Update name
router.put("/update", requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { name } = req.body;
    if (!name?.trim()) { res.status(400).json({ error: "Name is required" }); return; }
    const user = await prisma.user.update({
      where: { id: req.userId! },
      data: { name: name.trim() },
    });
    res.json({ name: user.name });
  } catch (error) {
    res.status(500).json({ error: "Failed to update" });
  }
});

// Change password
router.put("/change-password", requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await prisma.user.findUnique({ where: { id: req.userId! } });
    if (!user) { res.status(404).json({ error: "User not found" }); return; }

    const bcrypt = require("bcryptjs");
    const valid = await bcrypt.compare(currentPassword, user.password);
    if (!valid) { res.status(400).json({ error: "Current password is incorrect" }); return; }

    if (!newPassword || newPassword.length < 8) {
      res.status(400).json({ error: "New password must be at least 8 characters" });
      return;
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({ where: { id: req.userId! }, data: { password: hashed } });
    res.json({ message: "Password changed" });
  } catch (error) {
    res.status(500).json({ error: "Failed to change password" });
  }
});

// Delete account
router.delete("/delete", requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    await prisma.userProgress.deleteMany({ where: { userId: req.userId! } });
    await prisma.userStreak.deleteMany({ where: { userId: req.userId! } });
    await prisma.user.delete({ where: { id: req.userId! } });
    res.json({ message: "Account deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete account" });
  }
});

export default router;