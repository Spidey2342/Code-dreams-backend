import { Router, Request, Response } from "express";
import passport from "../config/passport";
import jwt from "jsonwebtoken";

const router = Router();

const generateToken = (userId: string) =>
  jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "30d" });

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

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

export default router;