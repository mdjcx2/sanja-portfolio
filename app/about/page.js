"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Button from "../components/Button";
import { siteConfig } from "../../data/siteConfig.js";
import DarkNav from "../components/DarkNav";
import DarkPageHero from "../components/DarkPageHero";
import CaseFooter from "../components/case/CaseFooter";

const PHOTOS = siteConfig.away?.photos ?? [];

const btnStyle = {
  background: "rgba(2,4,8,0.6)", border: "1px solid rgba(255,255,255,0.18)",
  borderRadius: 4, color: "#fff",
  fontFamily: "var(--font-syne), sans-serif", fontSize: "0.65rem",
  letterSpacing: "0.1em", padding: "7px 16px", cursor: "pointer", transition: "all 0.2s",
};

function TrailCarousel() {
  const [idx, setIdx]       = useState(0);
  const [playing, setPlaying] = useState(false);
  const intervalRef           = useRef(null);
  const n = PHOTOS.length;

  const go = (dir) => setIdx(i => ((i + dir) + n) % n);

  const toggle = () => {
    if (playing) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setPlaying(false);
    } else {
      intervalRef.current = setInterval(() => setIdx(i => (i + 1) % n), 2500);
      setPlaying(true);
    }
  };

  return (
    <div style={{ position: "relative", userSelect: "none" }}>
      {/* frame */}
      <div style={{ position: "relative", overflow: "hidden", borderRadius: 10, aspectRatio: "3/4" }}>
        {PHOTOS.map((p, i) => (
          <img key={p.src} src={p.src} alt={p.alt} style={{
            position: "absolute", top: 0, left: 0,
            width: "100%", height: "100%", objectFit: "cover", display: "block",
            opacity: i === idx ? 1 : 0,
            transition: "opacity 0.5s ease-in-out",
          }} />
        ))}
      </div>

      {/* controls same pattern as work page carousel */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 16 }}>
        <Button variant="ghost" size="sm" onClick={() => go(-1)}>← prev</Button>
        <Button variant="ghost" size="sm" onClick={toggle} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {playing
            ? <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><rect x="1" y="1" width="3" height="8"/><rect x="6" y="1" width="3" height="8"/></svg>
            : <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><polygon points="1,0 10,5 1,10"/></svg>
          }
          {playing ? "stop" : "play"}
        </Button>
        <span style={{ fontFamily: "var(--font-syne), sans-serif", fontSize: "0.55rem", letterSpacing: "0.12em", color: "#fff" }}>
          {idx + 1} / {n}
        </span>
        <Button variant="ghost" size="sm" onClick={() => go(1)}>next →</Button>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div style={{ minHeight: "100vh", color: "#F0EDE8", position: "relative", zIndex: 1, background: "linear-gradient(to bottom, transparent 20%, rgba(2,4,8,0.48) 60%, rgba(2,4,8,0.66) 100%)" }}>
      <style>{`
        .ab-nav-inner { padding: 0 64px; }
        .ab-hero { padding: 140px 64px 60px; }
        .ab-proof { padding: 0 64px 64px; display: flex; gap: 0; border-top: 1px solid rgba(255,255,255,0.05); }
        .ab-proof-item { flex: 1; padding: 28px 0; padding-right: 32px; border-right: 1px solid rgba(255,255,255,0.05); margin-right: 32px; }
        .ab-proof-item:last-child { border-right: none; margin-right: 0; padding-right: 0; }
        .ab-grid { padding: 0 64px 120px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; max-width: 1200px; align-items: start; }
        .ab-pillars { display: grid; grid-template-columns: 1fr; gap: 0; margin-bottom: 48px; }
        .ab-footer { padding: 28px 64px; }
        .ab-trail { padding: 0 64px 96px; border-top: 1px solid rgba(255,255,255,0.05); }
        .ab-trail-grid { display: grid; grid-template-columns: 380px 1fr; gap: 72px; align-items: start; max-width: 1100px; }
        .ab-leadership { padding: 0 64px 72px; }
        .ab-leadership-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px; }
        .ab-leadership-card { padding: 24px 28px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); }
        @media (max-width: 768px) {
          .ab-nav-inner { padding: 0 24px; }
          .ab-hero { padding: 100px 24px 48px; }
          .ab-proof { padding: 0 24px 48px; flex-direction: column; }
          .ab-proof-item { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.05); margin-right: 0; padding-right: 0; margin-bottom: 0; padding-bottom: 20px; }
          .ab-proof-item:last-child { border-bottom: none; }
          .ab-leadership { padding: 0 24px 56px; }
          .ab-leadership-grid { grid-template-columns: 1fr 1fr; }
          .ab-grid { padding: 0 24px 80px; grid-template-columns: 1fr; gap: 48px; }
          .ab-trail { padding: 0 24px 72px; }
          .ab-trail-grid { grid-template-columns: 1fr; gap: 36px; }
          .ab-footer { padding: 28px 24px; }
        }
        @media (max-width: 480px) {
          .ab-leadership-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <DarkNav />

      {/* Hero */}
      <DarkPageHero
        className="ab-hero"
        label={siteConfig.name}
        heading="About"
        sub={siteConfig.aboutIntro}
      />

      {/* Proof points */}
      <div className="ab-proof">
        {siteConfig.proof.map(({ value, label, sub }) => (
          <div key={value} className="ab-proof-item">
            <p style={{ fontFamily: "var(--font-syne), sans-serif", fontSize: "0.5625rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff", margin: "0 0 6px" }}>
              {value}
            </p>
            <p style={{ fontFamily: "var(--font-syne), sans-serif", fontSize: "0.875rem", fontWeight: 600, color: "#fff", letterSpacing: "-0.01em", margin: "0 0 3px" }}>
              {label}
            </p>
            <p style={{ fontFamily: "var(--font-syne), sans-serif", fontSize: "0.625rem", color: "#fff", letterSpacing: "0.04em", margin: 0 }}>
              {sub}
            </p>
          </div>
        ))}
      </div>

      {/* Highlights */}
      {siteConfig.highlights.length > 0 && (
      <div className="ab-leadership">
        <p style={{
          fontFamily: "var(--font-syne), sans-serif", fontSize: "0.5625rem",
          letterSpacing: "0.14em", textTransform: "uppercase",
          color: "#fff", marginBottom: 16,
        }}>
          Highlights
        </p>
        <div className="ab-leadership-grid">
          {siteConfig.highlights.map(({ stat, label, body }, i) => (
            <div key={i} className="ab-leadership-card">
              <p style={{
                fontFamily: "var(--font-syne), sans-serif", fontSize: "1.125rem",
                fontWeight: 700, color: "#fff", letterSpacing: "-0.02em",
                margin: "0 0 4px",
              }}>
                {stat}
              </p>
              <p style={{
                fontFamily: "var(--font-syne), sans-serif", fontSize: "0.6875rem",
                fontWeight: 600, color: "#fff", letterSpacing: "0.02em",
                margin: "0 0 10px",
              }}>
                {label}
              </p>
              <p style={{
                fontFamily: "var(--font-syne), sans-serif", fontSize: "0.75rem",
                color: "#fff", lineHeight: 1.7, margin: 0,
              }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
      )}

      {/* Body grid */}
      <div className="ab-grid">

        {/* Left: Bio + Philosophy + Skills */}
        <div>
          <div style={{ display: "flex", flexDirection: "column", gap: 22, marginBottom: 48 }}>
            {siteConfig.aboutBio.map((para, i) => (
              <p key={i} style={{
                fontFamily: "var(--font-syne), sans-serif", fontSize: "0.9375rem",
                color: "#fff", lineHeight: 1.75, margin: 0,
              }}>
                {para}
                {i === 1 && <><br />{siteConfig.aboutLocation}</>}
              </p>
            ))}
          </div>

          {/* What I do three pillars */}
          <div className="ab-pillars">
            {siteConfig.pillars.map(({ title, body }, i, arr) => (
              <div key={i} style={{
                padding: "20px 0",
                borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
              }}>
                <p style={{ fontFamily: "var(--font-syne), sans-serif", fontSize: "0.6875rem", fontWeight: 600, color: "#fff", letterSpacing: "0.04em", margin: "0 0 6px" }}>
                  {title}
                </p>
                <p style={{ fontFamily: "var(--font-syne), sans-serif", fontSize: "0.875rem", color: "#fff", lineHeight: 1.65, margin: 0 }}>
                  {body}
                </p>
              </div>
            ))}
          </div>

          <div style={{ borderLeft: "2px solid rgba(255,255,255,0.08)", paddingLeft: 20, marginBottom: 48 }}>
            <p style={{
              fontFamily: "var(--font-syne), sans-serif", fontSize: "1rem", fontWeight: 500,
              color: "#fff", lineHeight: 1.6, margin: 0, letterSpacing: "-0.01em",
            }}>
              &ldquo;{siteConfig.philosophy}&rdquo;
            </p>
          </div>

        </div>

        {/* Right: Experience + CTA */}
        <div>
          <p style={{
            fontFamily: "var(--font-syne), sans-serif", fontSize: "0.625rem", letterSpacing: "0.1em",
            textTransform: "uppercase", color: "#fff", marginBottom: 20,
          }}>
            Experience
          </p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {siteConfig.experience.map((exp, i, arr) => (
              <div key={i} style={{
                borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                padding: "18px 0",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 3, gap: 12, flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "var(--font-syne), sans-serif", fontSize: "1rem", fontWeight: 600, color: "#F0EDE8", letterSpacing: "-0.01em" }}>
                    {exp.company}
                  </span>
                  <span style={{ fontFamily: "var(--font-syne), sans-serif", fontSize: "0.5625rem", color: "rgba(240,237,232,0.42)", letterSpacing: "0.06em", flexShrink: 0 }}>
                    {exp.period}
                  </span>
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "baseline", flexWrap: "wrap", marginBottom: 8 }}>
                  <span style={{ fontFamily: "var(--font-syne), sans-serif", fontSize: "0.8125rem", color: "rgba(240,237,232,0.72)", letterSpacing: "-0.005em" }}>
                    {exp.role}
                  </span>
                  <span style={{ fontFamily: "var(--font-syne), sans-serif", fontSize: "0.75rem", color: "rgba(240,237,232,0.36)", letterSpacing: "0.02em" }}>
                    {exp.meta}
                  </span>
                </div>
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  {exp.pts.map(pt => (
                    <li key={pt} style={{ position: "relative", paddingLeft: "1rem", fontFamily: "var(--font-syne), sans-serif", fontSize: "0.8125rem", lineHeight: 1.6, color: "rgba(240,237,232,0.58)", marginBottom: 2 }}>
                      <span style={{ position: "absolute", left: 0, color: "rgba(240,237,232,0.26)" }}>–</span>
                      {pt}
                    </li>
                  ))}
                </ul>
                {exp.clients && (
                  <p style={{ fontFamily: "var(--font-syne), sans-serif", fontSize: "0.75rem", color: "rgba(240,237,232,0.36)", margin: "8px 0 0" }}>
                    <span style={{ fontWeight: 600, color: "rgba(240,237,232,0.52)", marginRight: 6 }}>Clients</span>
                    {exp.clients}
                  </p>
                )}
              </div>
            ))}
            {siteConfig.earlier && (
            <p style={{ fontFamily: "var(--font-syne), sans-serif", fontSize: "0.75rem", color: "rgba(240,237,232,0.28)", margin: "14px 0 0" }}>
              {siteConfig.earlier}
            </p>
            )}
          </div>

          <div style={{ marginTop: 36, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Button href="/contact" variant="primary" size="md">Get in touch →</Button>
            {siteConfig.cvUrl && <Button href={siteConfig.cvUrl} variant="secondary" size="md" download>Download CV</Button>}
          </div>
        </div>

      </div>

      {/* Away from the screen */}
      {siteConfig.away && (
      <div className="ab-trail">
        <div style={{ paddingTop: 48 }}>
          <p style={{
            fontFamily: "var(--font-syne), sans-serif", fontSize: "0.5625rem",
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: "#fff", marginBottom: 32,
          }}>
            Away from the screen
          </p>
          <div className="ab-trail-grid">

            {/* Photo carousel */}
            {PHOTOS.length > 0 ? <TrailCarousel /> : <div />}

            {/* Text */}
            <div style={{ paddingTop: 4 }}>
              <h2 style={{
                fontFamily: "var(--font-syne), sans-serif", fontWeight: 700,
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)", letterSpacing: "-0.03em",
                color: "#F0EDE8", lineHeight: 1.1, margin: "0 0 24px",
              }}>
                {siteConfig.away.title}
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 36 }}>
                {siteConfig.away.paragraphs.map((para, i) => (
                  <p key={i} style={{
                    fontFamily: "var(--font-syne), sans-serif", fontSize: "0.9375rem",
                    color: "#fff", lineHeight: 1.75, margin: 0,
                  }}>
                    {para}
                  </p>
                ))}
              </div>

              {/* Stats */}
              <div style={{ display: "flex", gap: 0 }}>
                {siteConfig.away.stats.map(({ value, label, sub }, i, arr) => (
                  <div key={i} style={{
                    flex: 1,
                    paddingRight: i < arr.length - 1 ? 24 : 0,
                    marginRight: i < arr.length - 1 ? 24 : 0,
                    borderRight: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  }}>
                    <p style={{
                      fontFamily: "var(--font-syne), sans-serif", fontSize: "1rem",
                      fontWeight: 700, color: "#fff", letterSpacing: "-0.02em",
                      margin: "0 0 3px",
                    }}>{value}</p>
                    <p style={{
                      fontFamily: "var(--font-syne), sans-serif", fontSize: "0.6875rem",
                      color: "#fff", margin: "0 0 2px", letterSpacing: "0.02em",
                    }}>{label}</p>
                    {sub && <p style={{
                      fontFamily: "var(--font-syne), sans-serif", fontSize: "0.5625rem",
                      color: "#fff", margin: 0, letterSpacing: "0.04em",
                    }}>{sub}</p>}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
      )}

      <CaseFooter />
    </div>
  );
}
