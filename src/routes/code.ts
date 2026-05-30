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

    // Encode code to base64 to avoid encoding issues
    const encoded = Buffer.from(code, 'utf-8').toString('base64');

    const response = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: language || "python",
        version: "3.10.0",
        files: [{ 
          name: "main.py",
          content: code,
          encoding: "utf8"
        }],
      }),
    });

    const data = await response.json() as any;
    
    console.log("Piston response:", JSON.stringify(data));

    const stdout = data.run?.stdout || data.run?.output || "";
    const stderr = data.run?.stderr || "";
    const exitCode = data.run?.code ?? 0;

    res.json({
      output: stdout,
      stderr: stderr,
      exitCode: exitCode,
    });
  } catch (error) {
    console.error("Code run error:", error);
    res.status(500).json({ error: "Failed to run code" });
  }
});

export default router;