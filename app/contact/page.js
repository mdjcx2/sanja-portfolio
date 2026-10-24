"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "../../data/siteConfig.js";
import DarkNav from "../components/DarkNav";
import DarkPageHero from "../components/DarkPageHero";
import CaseFooter from "../components/case/CaseFooter";

// Email assembled after mount so it is not in the server-rendered HTML.
const E = siteConfig.email.split("@");

export default function ContactPage() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    setEmail(E.join("@"));
  }, []);

  return (
    <div style={{ minHeight: "100vh", color: "#F0EDE8", position: "relative", zIndex: 1, background: "linear-gradient(to bottom, rgba(2,4,8,0.12) 0%, rgba(2,4,8,0.45) 100%)" }}>
      <style>{`
        .ct-nav-inner { padding: 0 64px; }
        .ct-hero { padding: 140px 64px 80px; max-width: 800px; }
        .ct-links { padding: 0 64px; }
        .ct-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; max-width: 800px; }
        .ct-footer { padding: 28px 64px; }
        @media (max-width: 768px) {
          .ct-nav-inner { padding: 0 24px; }
          .ct-hero { padding: 100px 24px 56px; }
          .ct-links { padding: 0 24px; }
          .ct-grid { grid-template-columns: 1fr; }
          .ct-footer { padding: 28px 24px; }
        }
      `}</style>

      <DarkNav />

      {/* Hero */}
      <DarkPageHero
        className="ct-hero"
        label={siteConfig.name}
        heading="Contact"
        sub="Placeholder: what kind of work Sanja is open to."
      />

      {/* Contact links */}
      <div className="ct-links" style={{ paddingBottom: 120 }}>
        <div className="ct-grid">

          {[
            { label: "Email", value: email || "...", href: email ? `mailto:${email}` : null },
            ...siteConfig.socials.map(({ label, href }) => ({ label, value: label, href, external: true })),
            ...(siteConfig.cvUrl ? [{ label: "CV", value: "Download CV", href: siteConfig.cvUrl, download: true }] : []),
            { label: "Location", value: siteConfig.aboutLocation, href: null },
          ].map(({ label, value, href, external, download }) => (
            <div key={label} style={{
              padding: "24px 0",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}>
              <p style={{
                fontFamily: "var(--font-syne), sans-serif", fontSize: "0.5625rem", letterSpacing: "0.12em",
                textTransform: "uppercase", color: "#fff", margin: "0 0 8px",
              }}>
                {label}
              </p>
              {href ? (
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  {...(download ? { download: true } : {})}
                  style={{
                    fontFamily: "var(--font-syne), sans-serif", fontSize: "clamp(0.875rem, 2vw, 1.1rem)",
                    fontWeight: 500, color: "#fff", textDecoration: "none",
                    letterSpacing: "-0.01em", transition: "color 0.2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                  onMouseLeave={e => e.currentTarget.style.color = "#fff"}
                >
                  {value}
                </a>
              ) : (
                <span style={{
                  fontFamily: "var(--font-syne), sans-serif", fontSize: "clamp(0.875rem, 2vw, 1.1rem)",
                  fontWeight: 500, color: "#fff", letterSpacing: "-0.01em",
                }}>
                  {value}
                </span>
              )}
            </div>
          ))}

        </div>

        {/* Availability note */}
        <div style={{
          marginTop: 48, maxWidth: 800,
          borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 28,
        }}>
          <p style={{
            fontFamily: "var(--font-syne), sans-serif", fontSize: "0.625rem", letterSpacing: "0.06em",
            color: "#fff", lineHeight: 1.7, margin: "0 0 20px",
          }}>
            Placeholder: a line about availability.
          </p>
          <p style={{
            fontFamily: "var(--font-syne), sans-serif", fontSize: "0.5rem", letterSpacing: "0.14em",
            textTransform: "uppercase", color: "#fff", margin: 0,
          }}>
            {siteConfig.skills.join(" · ")}
          </p>
        </div>
      </div>

      <CaseFooter />
    </div>
  );
}
