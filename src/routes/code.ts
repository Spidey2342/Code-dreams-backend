import { Router, Response } from "express";
import { requireAuth, AuthRequest } from "../middleware/authMiddleware";

const router = Router();

router.post("/run", requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { code, language } = req.body;

    if (!code) {
      res.status(400).json({ error: "Code is required" });
      return;
    }

    const response = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: language || "python",
        version: "3.10.0",
        files: [{ content: code }],
      }),
    });

    const data = await response.json() as any;

    res.json({
      output: data.run?.output || "",
      stderr: data.run?.stderr || "",
      exitCode: data.run?.code || 0,
    });
  } catch (error) {
    console.error("Code run error:", error);
    res.status(500).json({ error: "Failed to run code" });
  }
});

export default router;