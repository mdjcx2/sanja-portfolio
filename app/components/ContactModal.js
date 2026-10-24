"use client";

import { useId, useState } from "react";
import Button from "./Button";
import FrostDialog from "./FrostDialog";
import { siteConfig } from "../../data/siteConfig.js";

// Contact form in the unlock modal's frosted dialog. Posts to /api/contact,
// which emails the site owner through Resend.
const field = {
  width: "100%",
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 4,
  color: "#fff",
  fontFamily: "var(--font-syne), sans-serif",
  fontSize: "0.875rem",
  padding: "10px 12px",
};

const label = {
  display: "block",
  fontFamily: "var(--font-syne), sans-serif",
  fontSize: "0.75rem",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.65)",
  marginBottom: 6,
};

function ContactForm({ titleId }) {
  const [state, setState] = useState("idle"); // idle | busy | done | error
  const [form, setForm] = useState({ name: "", email: "", message: "", company_url: "" });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const ids = { name: useId(), email: useId(), message: useId() };

  async function onSubmit(e) {
    e.preventDefault();
    setState("busy");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  return (
    <>
      <p className="pg-client">{siteConfig.wordmark}</p>
      <h2 className="pg-title" id={titleId}>Let&rsquo;s talk</h2>

      {state === "done" ? (
        <p role="status" style={{ fontFamily: "var(--font-syne), sans-serif", fontSize: "0.9375rem", color: "rgba(0,210,255,0.85)", lineHeight: 1.7 }}>
          Thanks, your message is on its way. I&rsquo;ll reply by email.
        </p>
      ) : (
        <>
          <p className="pg-sub">Tell me about the role or project. I usually reply within a day or two.</p>
          <form onSubmit={onSubmit} style={{ display: "grid", gap: 16, width: "100%" }}>
            {/* Honeypot: hidden from people, filled only by bots */}
            <input
              type="text" name="company_url" tabIndex={-1} autoComplete="off" aria-hidden="true"
              value={form.company_url} onChange={set("company_url")}
              style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
            />
            <div>
              <label htmlFor={ids.name} style={label}>Name</label>
              <input id={ids.name} type="text" autoComplete="name" value={form.name} onChange={set("name")} className="ra-field" style={field} />
            </div>
            <div>
              <label htmlFor={ids.email} style={label}>Email</label>
              <input id={ids.email} type="email" required autoComplete="email" value={form.email} onChange={set("email")} className="ra-field" style={field} />
            </div>
            <div>
              <label htmlFor={ids.message} style={label}>Message</label>
              <textarea id={ids.message} required rows={5} value={form.message} onChange={set("message")} className="ra-field" style={{ ...field, resize: "vertical", minHeight: 120, lineHeight: 1.6 }} />
            </div>
            <Button type="submit" variant="primary" size="md" disabled={state === "busy"} style={{ justifySelf: "start" }}>
              {state === "busy" ? "Sending…" : "Send message"}
            </Button>
            {state === "error" && (
              <p role="alert" style={{ fontFamily: "var(--font-syne), sans-serif", fontSize: "0.8125rem", color: "rgba(255,120,120,0.9)", margin: 0 }}>
                Something went wrong. Email{" "}
                <a href={`mailto:${siteConfig.email}`} style={{ color: "rgba(255,255,255,0.8)", textDecoration: "underline" }}>{siteConfig.email}</a>{" "}
                directly.
              </p>
            )}
          </form>
        </>
      )}
    </>
  );
}

export default function ContactModal({ open, onClose }) {
  const titleId = useId();
  return (
    <FrostDialog open={open} onClose={onClose} labelledBy={titleId} initialFocus='input[autocomplete="name"]'>
      {/* Remounts on each open, so a sent form starts fresh next time */}
      {open && <ContactForm titleId={titleId} />}
    </FrostDialog>
  );
}
