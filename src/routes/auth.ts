import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "../config/passport";
import { prisma } from "../../lib/prisma";
import crypto from "crypto"

import { sendWelcomeEmail, sendPasswordResetEmail } from "../lib/email";



const router = Router();

const generateToken = (userId: string) =>
  jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "30d" });
const hashToken = (token: string) =>
  crypto.createHash("sha256").update(token).digest("hex");

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// ── POST /api/auth/register ──
router.post("/register", async (req: Request, res: Response) => {
  try {
const { name, email, password, ref } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ error: "Name, email and password are required" });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({ error: "Password must be at least 6 characters" });
      return;
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      res.status(409).json({ error: "An account with this email already exists" });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 12);

   let referredById: string | null = null;
if (ref) {
  const referrer = await prisma.user.findUnique({
    where: { referralCode: ref.trim().toUpperCase() },
  });
  if (referrer && referrer.referralCodeExpiry && referrer.referralCodeExpiry > new Date()) {
    referredById = referrer.id;
  }
}

const user = await prisma.user.create({
  data: { name, email, passwordHash, referredById },
});

    await prisma.userStreak.create({ data: { userId: user.id } });

    try {
  await sendWelcomeEmail(user.name, user.email);
} catch (emailErr) {
  console.error("Welcome email failed:", emailErr);
}

    const token = generateToken(user.id);

    res.status(201).json({
      token,
      user: { id: user.id, name: user.name, email: user.email, isPro: user.isPro },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ── POST /api/auth/login ──
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.passwordHash) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const token = generateToken(user.id);

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, isPro: user.isPro },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ── Google OAuth ──
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${FRONTEND_URL}/login?error=google_failed`,
    session: false,
  }),
  (req: Request, res: Response) => {
    const user = req.user as any;
    const token = generateToken(user.id);
    res.redirect(`${FRONTEND_URL}/auth/callback?token=${token}`);
  }
);

// ── GitHub OAuth ──
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: `${FRONTEND_URL}/login?error=github_failed`,
    session: false,
  }),
  (req: Request, res: Response) => {
    const user = req.user as any;
    const token = generateToken(user.id);
    res.redirect(`${FRONTEND_URL}/auth/callback?token=${token}`);
  }
);


// ── POST /api/auth/forgot-password ──
router.post("/forgot-password", async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ error: "Email is required" });
      return;
    }

    const user = await prisma.user.findUnique({ where: { email } });

    // Only act if the account exists AND has a password (not OAuth-only).
    if (user && user.passwordHash) {
      const rawToken = crypto.randomBytes(32).toString("hex");
      const tokenHash = hashToken(rawToken);
      const expiry = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

      await prisma.user.update({
        where: { id: user.id },
        data: { resetTokenHash: tokenHash, resetTokenExpiry: expiry },
      });

      const resetUrl = `${FRONTEND_URL}/reset-password?token=${rawToken}`;
      try {
        await sendPasswordResetEmail(user.name, user.email, resetUrl);
      } catch (emailErr) {
        console.error("Reset email failed:", emailErr);
      }
    }

    // Always the same response — never reveal whether the email exists.
    res.json({ message: "If an account exists for that email, a reset link has been sent." });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ── POST /api/auth/reset-password ──
router.post("/reset-password", async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) {
      res.status(400).json({ error: "Token and password are required" });
      return;
    }
    if (password.length < 6) {
      res.status(400).json({ error: "Password must be at least 6 characters" });
      return;
    }

    const tokenHash = hashToken(token);
    const user = await prisma.user.findFirst({
      where: { resetTokenHash: tokenHash, resetTokenExpiry: { gt: new Date() } },
    });

    if (!user) {
      res.status(400).json({ error: "This reset link is invalid or has expired." });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 12);
    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash, resetTokenHash: null, resetTokenExpiry: null },
    });

    res.json({ message: "Password reset successful. You can now log in." });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});
export default router;