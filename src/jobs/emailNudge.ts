import { prisma } from "../../lib/prisma";
import { sendNudgeEmail, sendAlmostProEmail } from "../lib/email";

export async function runEmailNudges() {
  console.log("Running email nudges...");

  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  // Find users who signed up 24hrs ago with no lessons
  const inactiveUsers = await prisma.user.findMany({
    where: {
      createdAt: { lte: oneDayAgo },
      progress: { none: {} },
    },
    select: { id: true, name: true, email: true },
  });

  for (const user of inactiveUsers) {
    try {
      await sendNudgeEmail(user.name, user.email);
      console.log(`Nudge sent to ${user.email}`);
    } catch (err) {
      console.error(`Nudge failed for ${user.email}:`, err);
    }
  }

  // Find users at lesson 15-17 (almost at paywall)
  const almostProUsers = await prisma.user.findMany({
    where: {
      isPro: false,
    },
    include: {
      progress: true,
    },
  });

  for (const user of almostProUsers) {
    const count = user.progress.length;
    if (count >= 15 && count <= 17) {
      try {
        await sendAlmostProEmail(user.name, user.email, count);
        console.log(`Almost-pro email sent to ${user.email}`);
      } catch (err) {
        console.error(`Almost-pro email failed for ${user.email}:`, err);
      }
    }
  }

  console.log("Email nudges complete.");
}