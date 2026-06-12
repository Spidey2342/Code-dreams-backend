import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import aiRoutes from "./routes/ai";
import trackRoutes from "./routes/tracks";
import projectRoutes from "./routes/projects";
import paymentRoutes from "./routes/payments";
import codeRoutes from "./routes/code";
// import oauthRoutes from "./routes/oauth";
import certificateRoutes from "./routes/certificates";
import session from "express-session";
import passport from "./config/passport";

// add with the other routes


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ──
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
// after app.use(express.json()):
app.use(session({
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
// ── Routes ──
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/tracks", trackRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/code", codeRoutes);
// app.use("/api/auth", oauthRoutes);
app.get("/api/admin/seed-js", async (req, res) => {
  if (req.query.secret !== process.env.SEED_SECRET) { res.status(403).json({ error: "forbidden" }); return; }
  try {
    const { seedJavaScript } = require("../prisma/seedJavaScript");
    await seedJavaScript();
    res.json({ ok: true, message: "JS track seeded" });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});
// ── Health check ──
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "CodePath API is running" });
});

// ── 404 handler ──
app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ── Start ──
app.listen(PORT, () => {
  console.log(`🚀 CodePath API running on http://localhost:${PORT}`);
});

export default app;