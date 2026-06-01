import { Router, Response } from "express";
import { prisma } from "../../lib/prisma";
import { requireAuth, AuthRequest } from "../middleware/authMiddleware";

const router = Router();

// ── GET /api/tracks ──
router.get("/", async (_req, res: Response) => {
  try {
    const tracks = await prisma.track.findMany({
      orderBy: { order: "asc" },
      include: { _count: { select: { lessons: true } } },
    });
    res.json(tracks);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ── GET /api/tracks/:slug/lessons ──
router.get("/:slug/lessons", requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { slug } = req.params;

    const track = await prisma.track.findUnique({ where: { slug } });
    if (!track) { res.status(404).json({ error: "Track not found" }); return; }

    const user = await prisma.user.findUnique({ where: { id: req.userId! } });

    const lessons = await prisma.lesson.findMany({
      where: { trackId: track.id },
      orderBy: { order: "asc" },
      select: {
        id: true, order: true, title: true,
        xpValue: true, isFree: true, content: true,
      },
    });

    const progress = await prisma.userProgress.findMany({
      where: { userId: req.userId },
      select: { lessonId: true },
    });

    const completedIds = new Set(progress.map((p) => p.lessonId));

    const lessonsWithProgress = lessons.map((l) => ({
      ...l,
      completed: completedIds.has(l.id),
      locked: l.order >= 19 && !user?.isPro,
    }));

    res.json({ track, lessons: lessonsWithProgress });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ── GET /api/tracks/:slug/lessons/:id ──
router.get("/:slug/lessons/:id", requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const lesson = await prisma.lesson.findUnique({ where: { id } });
    if (!lesson) { res.status(404).json({ error: "Lesson not found" }); return; }

    const progress = await prisma.userProgress.findUnique({
      where: { userId_lessonId: { userId: req.userId!, lessonId: id } },
    });

    res.json({ ...lesson, completed: !!progress });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ── POST /api/tracks/:slug/lessons/:id/complete ──
router.post("/:slug/lessons/:id/complete", requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const lesson = await prisma.lesson.findUnique({ where: { id } });
    if (!lesson) { res.status(404).json({ error: "Lesson not found" }); return; }

    // Check if already completed
    const existing = await prisma.userProgress.findUnique({
      where: { userId_lessonId: { userId: req.userId!, lessonId: id } },
    });

    if (existing) {
      res.json({ message: "Already completed", xpEarned: 0 });
      return;
    }

    // Mark complete
    await prisma.userProgress.create({
      data: { userId: req.userId!, lessonId: id, xpEarned: lesson.xpValue },
    });

    // Update streak
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const streak = await prisma.userStreak.findUnique({ where: { userId: req.userId } });

    if (streak) {
      const last = streak.lastActivityDate ? new Date(streak.lastActivityDate) : null;
      last?.setHours(0, 0, 0, 0);

      const isToday = last?.getTime() === today.getTime();
      const isYesterday = last?.getTime() === today.getTime() - 86400000;

      await prisma.userStreak.update({
        where: { userId: req.userId },
        data: {
          currentStreak: isToday ? streak.currentStreak : isYesterday ? streak.currentStreak + 1 : 1,
          longestStreak: Math.max(streak.longestStreak, isYesterday ? streak.currentStreak + 1 : 1),
          lastActivityDate: today,
        },
      });
    }

    res.json({ message: "Lesson completed", xpEarned: lesson.xpValue });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;