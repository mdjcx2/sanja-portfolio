"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import CaseNav from "./case/CaseNav";
import { MENU_LINKS } from "./FullscreenMenu";
import { openContactFromClick } from "./contactModalEvent";


const LINKS = MENU_LINKS;
const BOTTOM_TABS = ["About", "Work", "Contact"];

const ICONS = {
  Work: (fill) => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={fill} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
    </svg>
  ),
  About: (fill) => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={fill} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  ),
  Contact: (fill) => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={fill} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 7l10 7 10-7" />
    </svg>
  ),
};

/* ── Main component ──────────────────────────────────────────────────────── */
// Dark pages: the site nav (CaseNav) plus the phone bottom tab bar.
// transparent is accepted for older callers; the bar is see-through until the
// page scrolls everywhere now.
export default function DarkNav({ visible = true, onLogoClick }) {
  const pathname = usePathname();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        /* Dither system (mirrored from page.js for use in menu overlay) */
        .dp-frost-halftone {
          --dither-shadow: #041527; --dither-highlight: #70e0d8;
          --dither-dot: 4px; --dither-dot-opacity: 0.7; --dither-tint-opacity: 0.14;
          position: relative;
        }
        .dp-frost-halftone::before {
          content: ""; position: absolute; inset: 0;
          background-image: radial-gradient(circle, var(--dither-shadow) 32%, transparent 32%);
          background-size: var(--dither-dot) var(--dither-dot);
          mix-blend-mode: hard-light; opacity: var(--dither-dot-opacity);
          pointer-events: none; z-index: 0;
        }
        .dp-frost-halftone::after {
          content: ""; position: absolute; inset: 0;
          background-color: var(--dither-highlight);
          mix-blend-mode: color; opacity: var(--dither-tint-opacity);
          pointer-events: none; z-index: 0;
        }
        .dp-dither-reference  { --dither-shadow:#0d1b2a; --dither-highlight:#9bb1d6; }
        .dp-dither-classic    { --dither-shadow:#050505; --dither-highlight:#f8fafc; --dither-dot:3px; }
        .dp-dither-gameboy    { --dither-shadow:#0f380f; --dither-highlight:#9bbc0f; --dither-dot:6px; }
        .dp-dither-cyberpunk  { --dither-shadow:#2a0845; --dither-highlight:#ff007f; }
        .dp-dither-amber      { --dither-shadow:#1a0f00; --dither-highlight:#ffb000; }
        .dp-dither-vaporwave  { --dither-shadow:#11002c; --dither-highlight:#00f0ff; }
        .dp-dither-matrix     { --dither-shadow:#001100; --dither-highlight:#00ff66; }
        .dp-dither-halftone   { --dither-shadow:#0c0f1d; --dither-highlight:#e2e8f0; --dither-dot:6px; }
        .dp-dither-sunset     { --dither-shadow:#2d0922; --dither-highlight:#ffbe3b; }
        .dp-dither-redalert   { --dither-shadow:#180003; --dither-highlight:#ff2a4b; }
        .dp-dither-arctic     { --dither-shadow:#041527; --dither-highlight:#70e0d8; }
        .dp-dither-toxic      { --dither-shadow:#0d1800; --dither-highlight:#a8ff00; }
        .dp-dither-solar      { --dither-shadow:#140024; --dither-highlight:#e040fb; }
        .dp-dither-sepia      { --dither-shadow:#1c120c; --dither-highlight:#f5e6ca; }
        .dp-dither-floydmono  { --dither-shadow:#0a0a0c; --dither-highlight:#e0e6ed; }
        .dp-dither-blueprint  { --dither-shadow:#002244; --dither-highlight:#d0f0ff; }

        /* The nav's scroll gradient uses the dark pages' near-black */
        :root { --nav-bg: #020408; }

        /* Phone tab bar */
        .dn-bottom-nav { display: none; }
        .dn-tab { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 5px; flex: 1; padding: 14px 0 8px; text-decoration: none; position: relative; }
        .dn-tab-label { font-family: var(--font-syne), sans-serif; font-size: 0.5625rem; letter-spacing: 0.06em; text-transform: uppercase; transition: color 0.15s; }
        .dn-tab-dot { width: 4px; height: 4px; border-radius: 50%; background: rgba(var(--blob-r,191),var(--blob-g,235),var(--blob-b,255),0.9); position: absolute; top: 6px; opacity: 0; transition: opacity 0.15s; }
        .dn-tab-active .dn-tab-dot { opacity: 1; }

        @media (max-width: 640px) {
          /* Tab bar height, so floating controls (case contents button) sit above it */
          :root { --case-tabbar: calc(80px + env(safe-area-inset-bottom, 0px)); }
          /* Keep the site footer clear of the fixed tab bar */
          [data-site-footer] { padding-bottom: calc(32px + 80px + env(safe-area-inset-bottom, 0px)) !important; }
          .dn-bottom-nav {
            display: flex; position: fixed; bottom: 0; left: 0; right: 0; z-index: 500;
            background: rgba(2,4,8,0.97); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
            border-top: 1px solid rgba(255,255,255,0.14);
            padding-bottom: env(safe-area-inset-bottom, 0px); min-height: 80px;
          }
        }
      ` }} />

      {/* Top bar, full-screen menu and Background panel: the site nav */}
      <CaseNav visible={visible} onLogoClick={onLogoClick} withBottomTabs />

      {/* Mobile bottom tab bar */}
      <div className="dn-bottom-nav">
        {LINKS.filter(([label]) => BOTTOM_TABS.includes(label)).map(([label, href]) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          const iconColor = active ? `rgba(var(--blob-r,191),var(--blob-g,235),var(--blob-b,255),0.9)` : "rgba(255,255,255,0.45)";
          return (
            <Link key={label} href={href} className={`dn-tab${active ? " dn-tab-active" : ""}`}
              onClick={href === "/contact" ? openContactFromClick : undefined}>
              <div className="dn-tab-dot" />
              {ICONS[label](iconColor)}
              <span className="dn-tab-label" style={{ color: active ? `rgba(var(--blob-r,191),var(--blob-g,235),var(--blob-b,255),0.9)` : "rgba(255,255,255,0.4)" }}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
