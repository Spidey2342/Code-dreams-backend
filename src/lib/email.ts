import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = `${process.env.FROM_NAME || "CodePath Ghana"} <${process.env.FROM_EMAIL || "onboarding@resend.dev"}>`;
const FRONTEND_URL = process.env.FRONTEND_URL || "https://code-dreams.vercel.app";

export async function sendWelcomeEmail(name: string, email: string) {
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Welcome to CodePath Ghana 🇬🇭",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;background:#0a0a0f;color:#f8fafc;padding:40px 32px;border-radius:16px">
        <div style="margin-bottom:32px">
          <div style="background:#6366f1;width:40px;height:40px;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px">
            <span style="color:white;font-family:monospace;font-size:14px">&lt;/&gt;</span>
          </div>
          <h1 style="font-size:24px;font-weight:700;margin:0 0 8px;color:#f8fafc">Welcome to CodePath Ghana, ${name}!</h1>
          <p style="color:#94a3b8;font-size:15px;line-height:1.6;margin:0">You just made a great decision. Let's get you writing real code.</p>
        </div>

        <div style="background:#0f0f1a;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:24px;margin-bottom:24px">
          <h2 style="font-size:16px;font-weight:600;margin:0 0 16px;color:#f8fafc">Your first steps:</h2>
          <div style="margin-bottom:12px;display:flex;gap:12px">
            <span style="color:#6366f1;font-weight:700;font-size:16px">01</span>
            <p style="margin:0;color:#94a3b8;font-size:14px;line-height:1.6">Start with <strong style="color:#f8fafc">HTML & CSS Foundation</strong> — 18 free lessons, no setup needed</p>
          </div>
          <div style="margin-bottom:12px;display:flex;gap:12px">
            <span style="color:#6366f1;font-weight:700;font-size:16px">02</span>
            <p style="margin:0;color:#94a3b8;font-size:14px;line-height:1.6">Write real code in your browser — see results instantly</p>
          </div>
          <div style="display:flex;gap:12px">
            <span style="color:#6366f1;font-weight:700;font-size:16px">03</span>
            <p style="margin:0;color:#94a3b8;font-size:14px;line-height:1.6">Complete lessons to earn XP and climb the leaderboard</p>
          </div>
        </div>

        <a href="${FRONTEND_URL}/lessons?track=html-css" style="display:block;background:#6366f1;color:white;text-decoration:none;text-align:center;padding:14px;border-radius:8px;font-weight:600;font-size:15px;margin-bottom:24px">
          Start Lesson 1 Now →
        </a>

        <p style="color:#475569;font-size:13px;text-align:center;margin:0">
          Built for Ghanaian students · <a href="${FRONTEND_URL}" style="color:#6366f1">code-dreams.vercel.app</a>
        </p>
      </div>
    `,
  });
}

export async function sendNudgeEmail(name: string, email: string) {
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: "You signed up but haven't started yet 👀",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;background:#0a0a0f;color:#f8fafc;padding:40px 32px;border-radius:16px">
        <h1 style="font-size:22px;font-weight:700;margin:0 0 12px;color:#f8fafc">Hey ${name}, don't let this sit 👋</h1>
        <p style="color:#94a3b8;font-size:15px;line-height:1.6;margin:0 0 24px">You created a CodePath Ghana account but haven't started your first lesson yet.</p>

        <div style="background:#0f0f1a;border:1px solid rgba(99,102,241,0.2);border-radius:12px;padding:20px;margin-bottom:24px">
          <p style="margin:0 0 8px;color:#f8fafc;font-weight:600">Lesson 1 takes 10 minutes.</p>
          <p style="margin:0;color:#94a3b8;font-size:14px;line-height:1.6">You'll write your first HTML page, see it render live in your browser, and earn your first 50 XP. No downloads. Works on your phone.</p>
        </div>

        <a href="${FRONTEND_URL}/lessons?track=html-css" style="display:block;background:#6366f1;color:white;text-decoration:none;text-align:center;padding:14px;border-radius:8px;font-weight:600;font-size:15px;margin-bottom:24px">
          Start Lesson 1 Free →
        </a>

        <p style="color:#475569;font-size:13px;text-align:center;margin:0">
          CodePath Ghana · <a href="${FRONTEND_URL}" style="color:#6366f1">code-dreams.vercel.app</a>
        </p>
      </div>
    `,
  });
}

export async function sendAlmostProEmail(name: string, email: string, lessonsCompleted: number) {
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: `You're ${18 - lessonsCompleted} lessons away from Pro content 🔥`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;background:#0a0a0f;color:#f8fafc;padding:40px 32px;border-radius:16px">
        <h1 style="font-size:22px;font-weight:700;margin:0 0 12px;color:#f8fafc">You're so close, ${name}! 🏁</h1>
        <p style="color:#94a3b8;font-size:15px;line-height:1.6;margin:0 0 24px">
          You've completed <strong style="color:#f8fafc">${lessonsCompleted} lessons</strong>. Only <strong style="color:#f59e0b">${18 - lessonsCompleted} more free lessons</strong> before you reach the Pro content.
        </p>

        <div style="background:#0f0f1a;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:20px;margin-bottom:24px">
          <p style="margin:0 0 12px;color:#f8fafc;font-weight:600">Pro unlocks:</p>
          ${["Lessons 19–30 in all tracks", "AI Tutor — ask anything 24/7", "Project submission + AI review", "Verified certificate on completion"].map(item => `
            <div style="display:flex;gap:10px;margin-bottom:8px">
              <span style="color:#10b981">✓</span>
              <span style="color:#94a3b8;font-size:14px">${item}</span>
            </div>
          `).join("")}
          <div style="margin-top:16px;padding-top:16px;border-top:1px solid rgba(255,255,255,0.06)">
            <span style="font-size:24px;font-weight:800;color:#f8fafc">GHS 80</span>
            <span style="color:#475569;font-size:14px">/month</span>
          </div>
        </div>

        <a href="${FRONTEND_URL}/lessons?track=html-css" style="display:block;background:#6366f1;color:white;text-decoration:none;text-align:center;padding:14px;border-radius:8px;font-weight:600;font-size:15px;margin-bottom:12px">
          Continue Learning →
        </a>

        <a href="${FRONTEND_URL}/pricing" style="display:block;background:transparent;color:#6366f1;text-decoration:none;text-align:center;padding:14px;border-radius:8px;font-weight:600;font-size:15px;border:1px solid rgba(99,102,241,0.3);margin-bottom:24px">
          View Pro Plans →
        </a>

        <p style="color:#475569;font-size:13px;text-align:center;margin:0">
          CodePath Ghana · <a href="${FRONTEND_URL}" style="color:#6366f1">code-dreams.vercel.app</a>
        </p>
      </div>
    `,
  });
}

export async function sendPaymentConfirmationEmail(name: string, email: string) {
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: "You're now Pro! Welcome to the advanced track 🎉",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;background:#0a0a0f;color:#f8fafc;padding:40px 32px;border-radius:16px">
        <div style="text-align:center;margin-bottom:32px">
          <div style="font-size:48px;margin-bottom:16px">🎉</div>
          <h1 style="font-size:24px;font-weight:700;margin:0 0 8px;color:#f8fafc">You're now Pro, ${name}!</h1>
          <p style="color:#94a3b8;font-size:15px;line-height:1.6;margin:0">Your subscription is active. All advanced lessons are now unlocked.</p>
        </div>

        <div style="background:#0f0f1a;border:1px solid rgba(99,102,241,0.2);border-radius:12px;padding:20px;margin-bottom:24px">
          <p style="margin:0 0 12px;color:#f8fafc;font-weight:600">What you've unlocked:</p>
          ${["Lessons 19–30 in HTML & CSS", "Lessons 19–30 in Python", "AI Tutor — available 24/7", "Project submission + AI review", "Verified certificate on completion"].map(item => `
            <div style="display:flex;gap:10px;margin-bottom:8px">
              <span style="color:#10b981">✓</span>
              <span style="color:#94a3b8;font-size:14px">${item}</span>
            </div>
          `).join("")}
        </div>

        <a href="${FRONTEND_URL}/dashboard" style="display:block;background:#6366f1;color:white;text-decoration:none;text-align:center;padding:14px;border-radius:8px;font-weight:600;font-size:15px;margin-bottom:24px">
          Go to Dashboard →
        </a>

        <p style="color:#475569;font-size:13px;text-align:center;margin:0">
          GHS 80/month · Cancel anytime from Settings · <a href="${FRONTEND_URL}" style="color:#6366f1">code-dreams.vercel.app</a>
        </p>
      </div>
    `,
  });
}