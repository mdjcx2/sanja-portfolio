import { NextResponse } from "next/server";
import { validateContactMessage } from "../../../lib/contactMessage.js";

const FROM = "Portfolio <onboarding@resend.dev>";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const result = validateContactMessage(body);

  // Honeypot: pretend success, send nothing.
  if (!result.ok && result.error === "spam") {
    return NextResponse.json({ ok: true });
  }
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }

  // Nothing can be delivered without a mailer key; do not pretend it worked.
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO) {
    return NextResponse.json({ ok: false, error: "mailer not configured" }, { status: 500 });
  }

  const { name, email, message } = result.data;
  const to = process.env.CONTACT_TO;
  const who = name ? `${name} <${email}>` : email;
  const text = `From: ${who}\n\n${message}\n\nReceived: ${new Date().toISOString()}`;

  let resendRes;
  try {
    resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to,
        reply_to: email,
        subject: `Portfolio message from ${name || email}`,
        text,
      }),
    });
  } catch {
    return NextResponse.json({ ok: false }, { status: 502 });
  }

  if (!resendRes.ok) {
    return NextResponse.json({ ok: false }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
