import { Router, Response } from "express";
import Anthropic from "@anthropic-ai/sdk";
import { requireAuth, AuthRequest } from "../middleware/authMiddleware";

const router = Router();
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ── POST /api/ai/tutor ──
router.post("/tutor", requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { question, lessonTitle, lessonContent } = req.body;

    if (!question) {
      res.status(400).json({ error: "Question is required" });
      return;
    }

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: `You are a friendly coding tutor for CodePath, an African coding education platform. 
You are helping a student with the lesson: "${lessonTitle}".

Lesson content:
${lessonContent}

Keep your answers:
- Short and clear (3-5 sentences max)
- Beginner friendly — no jargon without explanation
- Encouraging and positive
- Focused on the lesson topic`,
      messages: [{ role: "user", content: question }],
    });

    const answer = message.content[0].type === "text" ? message.content[0].text : "Sorry, I couldn't process that.";

    res.json({ answer });
  } catch (error) {
    console.error("AI tutor error:", error);
    res.status(500).json({ error: "AI tutor is unavailable right now" });
  }
});

// ── POST /api/ai/review ──
router.post("/review", requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { code, projectTitle, requirements } = req.body;

    if (!code) {
      res.status(400).json({ error: "Code is required" });
      return;
    }

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: `You are a code reviewer for CodePath, an African coding education platform.
Review the student's project submission fairly and constructively.
Respond ONLY with a JSON object in this exact format:
{
  "passed": true or false,
  "summary": "one sentence overall assessment",
  "strengths": ["strength 1", "strength 2"],
  "improvements": ["improvement 1", "improvement 2"],
  "encouragement": "one encouraging sentence"
}`,
      messages: [{
        role: "user",
        content: `Project: ${projectTitle}\n\nRequirements: ${requirements}\n\nCode:\n${code}`,
      }],
    });

    const text = message.content[0].type === "text" ? message.content[0].text : "{}";

    try {
      const review = JSON.parse(text);
      res.json(review);
    } catch {
      res.json({ passed: false, summary: "Could not parse review", strengths: [], improvements: [], encouragement: "Keep trying!" });
    }
  } catch (error) {
    console.error("AI review error:", error);
    res.status(500).json({ error: "AI reviewer is unavailable right now" });
  }
});

export default router;