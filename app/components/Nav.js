"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "../../data/siteConfig.js";

const ACCENTS = [
  { id: "amber",  label: "Amber",  value: "#B8955A", dark: "#C8A870" },
  { id: "sienna", label: "Sienna", value: "#B85C38", dark: "#C97050" },
  { id: "teal",   label: "Teal",   value: "#3A8C8C", dark: "#4AACAC" },
  { id: "indigo", label: "Indigo", value: "#6B5EA8", dark: "#8B7EC8" },
];

export default function Nav() {
  const [open,       setOpen]       = useState(false);
  const [dark,       setDark]       = useState(false);
  const [accent,     setAccent]     = useState("amber");
  const [accentUI,   setAccentUI]   = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const savedTheme    = localStorage.getItem("theme");
    const savedAccentUI = localStorage.getItem("accentUI") !== "false";
    const prefersDark   = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = savedTheme === "dark" || (!savedTheme && prefersDark);

    setDark(isDark);
    setAccent("teal");
    setAccentUI(savedAccentUI);
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.classList.toggle("accent-ui", savedAccentUI);
    applyAccent("teal", isDark);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  function applyAccent(id, isDarkMode) {
    const a = ACCENTS.find(a => a.id === id) || ACCENTS[0];
    document.documentElement.style.setProperty("--accent", isDarkMode ? a.dark : a.value);
    document.documentElement.setAttribute("data-accent", id);
  }

  function toggleDark() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    applyAccent(accent, next);
  }

  function switchAccent(id) {
    setAccent(id);
    localStorage.setItem("accent", id);
    applyAccent(id, dark);
  }

  function toggleAccentUI() {
    const next = !accentUI;
    setAccentUI(next);
    document.documentElement.classList.toggle("accent-ui", next);
    localStorage.setItem("accentUI", next);
  }

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            {siteConfig.wordmark}
          </Link>

          <div className="nav-links nav-links-desktop">
            <Link href="/about"   className="nav-link">About</Link>
            <Link href="/work"    className="nav-link">Selected Work</Link>
            <Link href="/process" className="nav-link">Process</Link>
            <Link href="/contact" className="nav-link">Contact</Link>
          </div>

          <div className="nav-right">

            {/* Accent controls, hidden, preserved for later */}
            <div style={{ display: "none" }} aria-hidden="true">
            {/* Accent colour dots */}
            <div className="nav-accents" aria-label="Choose accent colour">
              {ACCENTS.map(a => (
                <button
                  key={a.id}
                  className={`nav-accent-dot${accent === a.id ? " active" : ""}`}
                  style={{ "--dot-color": a.value }}
                  onClick={() => switchAccent(a.id)}
                  aria-label={`${a.label} accent`}
                  aria-pressed={accent === a.id}
                />
              ))}
            </div>

            {/* Accent UI toggle */}
            <button
              className="nav-accent-ui-toggle"
              onClick={toggleAccentUI}
              aria-label={accentUI ? "Turn off accent elements" : "Turn on accent elements"}
              title={accentUI ? "Accent UI: on" : "Accent UI: off"}
            >
              <span className={`nav-accent-ui-pill${accentUI ? " on" : ""}`}>
                <span className="nav-accent-ui-thumb" />
              </span>
              <span className="nav-accent-ui-label">Accent</span>
            </button>

            </div>

            {/* Dark mode toggle */}
            <button
              className="nav-theme-toggle"
              onClick={toggleDark}
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {dark ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4"/>
                  <line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>

            {/* Burger */}
            <button
              className={`nav-burger${open ? " nav-burger-open" : ""}`}
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      <div className={`nav-drawer${open ? " nav-drawer-open" : ""}`} aria-hidden={!open}>
        <div className="nav-drawer-inner">
          <Link href="/"        className="nav-drawer-link nav-drawer-home">{siteConfig.wordmark}</Link>
          <Link href="/about"   className="nav-drawer-link">About</Link>
          <Link href="/work"    className="nav-drawer-link">Selected Work</Link>
          <Link href="/process" className="nav-drawer-link">Process</Link>
          <Link href="/contact" className="nav-drawer-link">Contact</Link>
          <a href={`mailto:${siteConfig.email}`} className="nav-drawer-email">{siteConfig.email}</a>
        </div>
      </div>

      {open && <div className="nav-overlay" onClick={() => setOpen(false)} aria-hidden="true" />}
    </>
  );
}
