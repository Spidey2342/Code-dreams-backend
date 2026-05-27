import { Router, Response } from "express";
import { prisma } from "../../lib/prisma";
import { requireAuth, AuthRequest } from "../middleware/authMiddleware";

const router = Router();

// ── POST /api/certificates/generate ──
router.post("/generate", requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { trackId } = req.body;

    // Check if already has certificate for this track
    const existing = await prisma.certificate.findFirst({
      where: { userId: req.userId!, trackId },
    });

    if (existing) {
      res.json({ certificate: existing });
      return;
    }

    // Check user completed all lessons in track
   const track = await prisma.track.findFirst({
  where: { OR: [{ id: trackId }, { slug: trackId }] },
      include: { lessons: true },
    });

    if (!track) {
      res.status(404).json({ error: "Track not found" });
      return;
    }

    const progress = await prisma.userProgress.findMany({
      where: { userId: req.userId! },
    });

    const completedIds = new Set(progress.map((p) => p.lessonId));
    const allCompleted = track.lessons.every((l) => completedIds.has(l.id));

    if (!allCompleted) {
      res.status(400).json({ error: "Complete all lessons to earn this certificate" });
      return;
    }

    // Generate certificate
    const certificate = await prisma.certificate.create({
      data: {
        userId: req.userId!,
        trackId,
      },
      include: { user: true },
    });

    res.json({ certificate });
  } catch (error) {
    console.error("Certificate error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ── GET /api/certificates/verify/:code ──
router.get("/verify/:code", async (req, res: Response) => {
  try {
    const { code } = req.params;

    const certificate = await prisma.certificate.findUnique({
      where: { uniqueCode: code },
      include: { user: { select: { name: true } } },
    });

    if (!certificate) {
      res.status(404).json({ error: "Certificate not found" });
      return;
    }

    res.json({
      valid: true,
      name: certificate.user.name,
      trackId: certificate.trackId,
      issuedAt: certificate.issuedAt,
      uniqueCode: certificate.uniqueCode,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ── GET /api/certificates/my ──
router.get("/my", requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const certificates = await prisma.certificate.findMany({
      where: { userId: req.userId! },
      include: { user: { select: { name: true } } },
      orderBy: { issuedAt: "desc" },
    });

    res.json({ certificates });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;