import { Router, Response } from "express";
import { prisma } from "../../lib/prisma";
import { requireAuth, AuthRequest } from "../middleware/authMiddleware";
import Anthropic from "@anthropic-ai/sdk";

const router = Router();
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ── POST /api/projects/submit ──
router.post("/submit", requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { githubUrl, trackId, projectTitle, requirements } = req.body;

    if (!githubUrl) {
      res.status(400).json({ error: "GitHub URL is required" });
      return;
    }

    // Save submission
    const submission = await prisma.projectSubmission.create({
      data: {
        userId: req.userId!,
        trackId,
        githubUrl,
        passed: false,
      },
    });

    // AI review
    let review = {
      passed: false,
      summary: "Your submission has been received and will be reviewed.",
      strengths: ["Project submitted successfully"],
      improvements: ["Add your Anthropic API credits to enable full AI review"],
      encouragement: "Keep building — you are making great progress!",
    };

    try {
      const message = await anthropic.messages.create({
        model: "claude-sonnet-4-5",
        max_tokens: 1024,
        system: `You are a code reviewer for CodePath, an African coding education platform.
Review the student's project submission fairly and constructively based on the GitHub URL provided.
Since you cannot access GitHub directly, evaluate based on the URL structure and give encouraging feedback.
Respond ONLY with a JSON object in this exact format with no markdown:
{"passed":true,"summary":"one sentence","strengths":["strength 1","strength 2"],"improvements":["improvement 1"],"encouragement":"one sentence"}`,
        messages: [{
          role: "user",
          content: `Project: ${projectTitle}\nRequirements: ${requirements}\nGitHub URL: ${githubUrl}`,
        }],
      });

      const text = message.content[0].type === "text" ? message.content[0].text : "{}";
      const parsed = JSON.parse(text.trim());
      review = parsed;

      // Update submission with feedback
      await prisma.projectSubmission.update({
        where: { id: submission.id },
        data: { aiFeedback: text, passed: parsed.passed },
      });
    } catch (aiError) {
      console.error("AI review skipped:", aiError);
    }

    res.json(review);
  } catch (error) {
    console.error("Submit error:", error);
    res.status(500).json({ error: "Submission failed" });
  }
});

export default router;