import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import aiRoutes from "./routes/ai";
import trackRoutes from "./routes/tracks";
import projectRoutes from "./routes/projects";
import paymentRoutes from "./routes/payments";
import certificateRoutes from "./routes/certificates";

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

// ── Routes ──
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/tracks", trackRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/payments", paymentRoutes);

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