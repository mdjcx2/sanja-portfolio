"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { openContactFromClick } from "./contactModalEvent";
import { siteConfig } from "../../data/siteConfig.js";

// The site's full-screen menu: blurred dark overlay, large Syne links that
// slide right on hover and stagger in. Shared by DarkNav and the case study
// nav (CaseNav) so the menu is the same everywhere.
export const MENU_LINKS = [
  ["Home",    "/",          "Start here"],
  ["Work",    "/portfolio", "Selected case studies"],
  ["Publications", "/publications", "Interviews and features"],
  ["About",   "/about",     "Background"],
  ["Contact", "/contact",   "Let's talk"],
];

const CSS = `
  .dn-dither-overlay {
    position: fixed; inset: 0; z-index: 998;
    background: rgba(2,4,8,0.82);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    display: flex; flex-direction: column;
    justify-content: center;
    padding: 0 64px;
    overflow: hidden;
  }
  /* Override dither for menu: use highlight color as dots so they glow on dark bg */
  .dn-dither-overlay.dp-frost-halftone::before {
    background-image: radial-gradient(circle, var(--dither-highlight) 32%, transparent 32%);
    mix-blend-mode: screen;
    opacity: calc(var(--dither-dot-opacity) * 0.5);
  }
  .dn-dither-overlay.dp-frost-halftone::after {
    opacity: calc(var(--dither-tint-opacity) * 0.6);
  }
  .dn-menu-link {
    font-family: var(--font-syne), sans-serif;
    font-size: clamp(2.4rem, 6vw, 5rem);
    font-weight: 500; letter-spacing: -0.03em;
    color: rgba(255,255,255,0.85); text-decoration: none;
    line-height: 1.05; padding: 0.18em 0;
    display: block; position: relative; z-index: 1;
    transition: color 0.2s, transform 0.2s;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .dn-menu-link:first-of-type { border-top: 1px solid rgba(255,255,255,0.06); }
  .dn-menu-link:hover { color: #fff; transform: translateX(12px); }
  .dn-menu-link:focus-visible { outline: 2px solid rgba(var(--blob-r,191),var(--blob-g,235),var(--blob-b,255),0.9); outline-offset: 4px; }
  .dn-menu-link-active { color: rgba(var(--blob-r,191),var(--blob-g,235),var(--blob-b,255),0.9) !important; }
  @keyframes dn-menu-in {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .dn-menu-link { animation: dn-menu-in 0.32s cubic-bezier(0,0,0.2,1) both; }
  .dn-menu-link:nth-child(1) { animation-delay: 0.04s; }
  .dn-menu-link:nth-child(2) { animation-delay: 0.08s; }
  .dn-menu-link:nth-child(3) { animation-delay: 0.12s; }
  .dn-menu-link:nth-child(4) { animation-delay: 0.16s; }
  .dn-menu-link:nth-child(5) { animation-delay: 0.20s; }

  .dn-menu-footer { position: absolute; bottom: 40px; left: 64px; font-family: var(--font-syne), sans-serif; font-size: 0.625rem; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.25); z-index: 1; }
  @media (max-width: 640px) {
    .dn-dither-overlay { padding: 0 24px; }
    .dn-menu-footer { left: 24px; }
    /* DarkNav has a bottom tab bar on phones; keep the footer above it */
    .dn-dither-overlay[data-bottom-tabs="true"] .dn-menu-footer { bottom: calc(80px + env(safe-area-inset-bottom, 0px) + 12px); }
  }
  @media (prefers-reduced-motion: reduce) {
    .dn-menu-link { animation: none; transition: color 0.2s; }
    .dn-menu-link:hover { transform: none; }
  }
`;

// open/onClose are controlled by the nav that owns the toggle button.
// While open: Esc closes, focus starts on the first link and stays in the
// menu (plus the owning nav's toggle, `toggleRef`), and the page doesn't scroll.
export default function FullscreenMenu({ open, onClose, toggleRef, withBottomTabs = false }) {
  const pathname = usePathname();
  const panel = useRef(null);

  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector("a")?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key !== "Tab") return;
      const items = [toggleRef?.current, ...panel.current.querySelectorAll("a[href]")].filter(Boolean);
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      else if (!items.includes(document.activeElement)) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, toggleRef]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      {open && (
        <div ref={panel} id="site-menu" className="dn-dither-overlay" data-bottom-tabs={withBottomTabs}
          role="dialog" aria-modal="true" aria-label="Menu">
          <nav aria-label="Site">
            {MENU_LINKS.map(([label, href]) => {
              const active = pathname === href || (href !== "/" && pathname.startsWith(href + "/"));
              return (
                <Link key={label} href={href}
                  onClick={(e) => { if (href !== "/contact" || !openContactFromClick(e)) onClose(); }}
                  aria-current={active ? "page" : undefined}
                  className={`dn-menu-link${active ? " dn-menu-link-active" : ""}`}>
                  {label}
                </Link>
              );
            })}
          </nav>
          <p className="dn-menu-footer">{siteConfig.name} · {siteConfig.role}</p>
        </div>
      )}
    </>
  );
}
