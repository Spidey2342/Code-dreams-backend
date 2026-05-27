import { Router, Response } from "express";
import { prisma } from "../../lib/prisma";
import { requireAuth, AuthRequest } from "../middleware/authMiddleware";
import crypto from "crypto";

const router = Router();

// ── POST /api/payments/initialize ──
router.post("/initialize", requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { plan } = req.body; // "monthly" or "yearly"

    const user = await prisma.user.findUnique({ where: { id: req.userId } });
    if (!user) { res.status(404).json({ error: "User not found" }); return; }

    const amount = plan === "yearly" ? 60000 : 8000; // GHS in pesewas (600 = GHS 6.00)
    const reference = `codepath_${req.userId}_${Date.now()}`;

    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        amount,
        reference,
        currency: "GHS",
        metadata: {
          userId: req.userId,
          plan,
        },
        callback_url: `${process.env.FRONTEND_URL}/payment/success`,
      }),
    });

    const data = await response.json();

    if (!data.status) {
      res.status(400).json({ error: data.message });
      return;
    }

    // Save pending payment
    await prisma.payment.create({
      data: {
        userId: req.userId!,
        paystackRef: reference,
        amount,
        status: "pending",
      },
    });

    res.json({ authorizationUrl: data.data.authorization_url, reference });
  } catch (error) {
    console.error("Payment init error:", error);
    res.status(500).json({ error: "Payment initialization failed" });
  }
});

// ── POST /api/payments/webhook ──
router.post("/webhook", async (req, res: Response) => {
  try {
    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (hash !== req.headers["x-paystack-signature"]) {
      res.status(401).json({ error: "Invalid signature" });
      return;
    }

    const { event, data } = req.body;

    if (event === "charge.success") {
      const { reference, metadata } = data;
      const { userId } = metadata;

      // Update payment status
      await prisma.payment.update({
        where: { paystackRef: reference },
        data: { status: "success" },
      });

      // Upgrade user to pro
      await prisma.user.update({
        where: { id: userId },
        data: { isPro: true },
      });

      console.log(`✅ User ${userId} upgraded to Pro`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(500).json({ error: "Webhook failed" });
  }
});

// ── GET /api/payments/verify/:reference ──
router.get("/verify/:reference", requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { reference } = req.params;

    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` } }
    );

    const data = await response.json();

    if (data.data?.status === "success") {
      await prisma.user.update({
        where: { id: req.userId },
        data: { isPro: true },
      });

      await prisma.payment.update({
        where: { paystackRef: reference },
        data: { status: "success" },
      });

      res.json({ success: true, message: "Payment verified" });
    } else {
      res.json({ success: false, message: "Payment not completed" });
    }
  } catch (error) {
    res.status(500).json({ error: "Verification failed" });
  }
});

export default router;