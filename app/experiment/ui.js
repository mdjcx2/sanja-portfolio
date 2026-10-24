"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "../../data/siteConfig.js";

// ─────────────────────────────────────────────────────────────────────────────
// Color helpers
// ─────────────────────────────────────────────────────────────────────────────
export function rgbToHex([r, g, b]) {
  const h = v => Math.round(Math.min(1, Math.max(0, v)) * 255).toString(16).padStart(2, "0");
  return `#${h(r)}${h(g)}${h(b)}`;
}
export function hexToRgb(hex) {
  return [parseInt(hex.slice(1,3),16)/255, parseInt(hex.slice(3,5),16)/255, parseInt(hex.slice(5,7),16)/255];
}

// ─────────────────────────────────────────────────────────────────────────────
// Design tokens
// ─────────────────────────────────────────────────────────────────────────────
export const tokens = {
  bg:         "#030507",
  surface:    "rgba(255,255,255,0.03)",
  surfaceHi:  "rgba(255,255,255,0.06)",
  border:     "rgba(255,255,255,0.07)",
  borderDim:  "rgba(255,255,255,0.04)",
  text:       "rgba(255,255,255,0.88)",
  textMuted:  "rgba(255,255,255,0.40)",
  textDim:    "rgba(255,255,255,0.18)",
  accent:     "rgba(0,210,255,0.90)",
  accentMid:  "rgba(0,210,255,0.50)",
  accentDim:  "rgba(0,210,255,0.08)",
  accentGlow: "0 0 8px rgba(0,210,255,0.45)",
};

// ─────────────────────────────────────────────────────────────────────────────
// Knob, range slider with custom track + thumb
// Props: label, value, min, max, step, onChange
// ─────────────────────────────────────────────────────────────────────────────
export function Knob({ label, value, min, max, step = 0.01, onChange }) {
  const [active, setActive] = useState(false);
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  const decimals = step < 0.1 ? 3 : step < 1 ? 2 : 0;
  const display = Number(value).toFixed(decimals);

  return (
    <div style={{ marginBottom: 16 }}>
      {/* Label */}
      <span style={{ fontFamily:"monospace", fontSize:"0.5625rem", color:tokens.textMuted, letterSpacing:"0.04em", display:"block", marginBottom:8 }}>
        {label}
      </span>

      {/* Track + thumb area extra top padding reserves tooltip space */}
      <div style={{ position:"relative", height:32, display:"flex", alignItems:"center" }}>

        {/* Floating tooltip above thumb */}
        <div style={{
          position:"absolute",
          left:`${pct}%`,
          top:0,
          transform:"translateX(-50%)",
          pointerEvents:"none",
          opacity: active ? 1 : 0,
          transition:"opacity 0.12s",
        }}>
          <div style={{
            background: tokens.accent,
            color:"#000",
            fontFamily:"monospace", fontSize:"0.5rem", fontWeight:700,
            padding:"2px 6px", borderRadius:3,
            whiteSpace:"nowrap",
            lineHeight:"16px",
          }}>
            {display}
          </div>
          {/* Arrow */}
          <div style={{
            position:"absolute", top:"100%", left:"50%", transform:"translateX(-50%)",
            width:0, height:0,
            borderLeft:"4px solid transparent",
            borderRight:"4px solid transparent",
            borderTop:`4px solid ${tokens.accent}`,
          }} />
        </div>

        {/* Track */}
        <div style={{ position:"absolute", left:0, right:0, top:"50%", marginTop:6, height:3, background:"rgba(255,255,255,0.09)", borderRadius:2 }}>
          <div style={{ height:"100%", width:`${pct}%`, background: active ? tokens.accent : tokens.accentMid, borderRadius:2, transition:"background 0.15s" }} />
        </div>

        {/* Thumb (visual) */}
        <div style={{
          position:"absolute",
          left:`${pct}%`,
          top:"50%", marginTop:6,
          transform:"translate(-50%,-50%)",
          width:13, height:13,
          borderRadius:"50%",
          background:"#fff",
          boxShadow: active ? `0 0 0 3px rgba(0,210,255,0.18), ${tokens.accentGlow}` : "0 1px 4px rgba(0,0,0,0.6)",
          transition: active ? "none" : "box-shadow 0.15s",
          pointerEvents:"none",
        }} />

        {/* Invisible native input */}
        <input
          type="range" min={min} max={max} step={step} value={value}
          aria-label={label}
          onChange={e => onChange(parseFloat(e.target.value))}
          onMouseDown={() => setActive(true)}
          onMouseUp={() => setActive(false)}
          onMouseLeave={() => setActive(false)}
          onTouchStart={() => setActive(true)}
          onTouchEnd={() => setActive(false)}
          style={{ position:"absolute", inset:0, opacity:0, cursor:"pointer", width:"100%", margin:0, zIndex:2 }}
        />
      </div>

      {/* Static value below, right-aligned visible when tooltip is hidden */}
      <div style={{ textAlign:"right", marginTop:2, opacity: active ? 0 : 1, transition:"opacity 0.12s" }}>
        <span style={{ fontFamily:"monospace", fontSize:"0.5rem", color:"rgba(0,210,255,0.55)" }}>
          {display}
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Toggle, on/off switch
// Props: label, value, onChange
// ─────────────────────────────────────────────────────────────────────────────
export function Toggle({ label, value, onChange }) {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:11 }}>
      <span style={{ fontFamily:"monospace", fontSize:"0.5625rem", color:tokens.textMuted }}>
        {label}
      </span>
      <button
        onClick={() => onChange(!value)}
        style={{ width:30, height:15, borderRadius:8, border:"none", cursor:"pointer", background:value?"rgba(0,210,255,0.35)":"rgba(255,255,255,0.08)", position:"relative", transition:"background 0.2s", padding:0, flexShrink:0 }}
      >
        <div style={{ position:"absolute", top:2, left:value?14:2, width:11, height:11, borderRadius:"50%", background:value?"rgb(0,210,255)":"rgba(255,255,255,0.35)", transition:"left 0.18s ease, background 0.2s" }} />
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ColorSwatch, color picker trigger showing hex preview
// Props: label, value ([r,g,b] 0-1), onChange
// ─────────────────────────────────────────────────────────────────────────────
export function ColorSwatch({ label, value, onChange }) {
  const hex = rgbToHex(value);
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
      <span style={{ fontFamily:"monospace", fontSize:"0.5625rem", color:"rgba(255,255,255,0.28)", width:28, flexShrink:0 }}>
        {label}
      </span>
      <label aria-label={`Color ${label}`} style={{ position:"relative", width:44, height:18, borderRadius:3, background:hex, border:"1px solid rgba(255,255,255,0.14)", cursor:"pointer", flexShrink:0, overflow:"hidden" }}>
        <input
          type="color" value={hex}
          aria-label={`Color ${label}`}
          onChange={e => onChange(hexToRgb(e.target.value))}
          style={{ position:"absolute", opacity:0, width:"100%", height:"100%", cursor:"pointer" }}
        />
      </label>
      <span style={{ fontFamily:"monospace", fontSize:"0.5rem", color:tokens.textDim, letterSpacing:"0.04em" }}>
        {hex}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Pill, tab/type selector button
// Props: label, active, onClick
// ─────────────────────────────────────────────────────────────────────────────
export function Pill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily:"monospace", fontSize:"0.5rem", letterSpacing:"0.05em",
        color:       active ? "rgba(0,210,255,0.9)"   : tokens.textDim,
        background:  active ? tokens.accentDim        : "transparent",
        border:     `1px solid ${active ? "rgba(0,210,255,0.25)" : tokens.border}`,
        borderRadius:2, padding:"4px 9px", cursor:"pointer", transition:"all 0.15s",
      }}
    >
      {label}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PresetButton, named preset trigger
// Props: label, onClick
// ─────────────────────────────────────────────────────────────────────────────
export function PresetButton({ label, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily:"monospace", fontSize:"0.5625rem", letterSpacing:"0.07em",
        color:      hover ? "rgba(0,210,255,0.85)"  : "rgba(255,255,255,0.45)",
        background: hover ? "rgba(0,210,255,0.10)"  : "rgba(255,255,255,0.04)",
        border:    `1px solid ${hover ? "rgba(0,210,255,0.28)" : "rgba(255,255,255,0.08)"}`,
        borderRadius:2, padding:"5px 10px", cursor:"pointer", transition:"all 0.14s",
      }}
    >
      {label}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sep, section separator with label
// Props: label
// ─────────────────────────────────────────────────────────────────────────────
export function Sep({ label }) {
  return (
    <div style={{
      fontFamily:"monospace", fontSize:"0.5rem", letterSpacing:"0.14em", textTransform:"uppercase",
      color:tokens.textDim, marginBottom:10, marginTop:20, paddingBottom:6,
      borderBottom:`1px solid ${tokens.borderDim}`,
    }}>
      {label}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Panel, dark container card
// Props: children, style (optional), padding (boolean, default true)
// ─────────────────────────────────────────────────────────────────────────────
export function Panel({ children, style = {}, noPad = false }) {
  return (
    <div style={{
      background: tokens.surface,
      border: `1px solid ${tokens.border}`,
      borderRadius: 6,
      padding: noPad ? 0 : 20,
      ...style,
    }}>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PanelHeader, top bar of a panel
// Props: title, tag, children (right slot)
// ─────────────────────────────────────────────────────────────────────────────
export function PanelHeader({ title, tag, children }) {
  return (
    <div style={{
      padding:"11px 18px",
      borderBottom:`1px solid ${tokens.borderDim}`,
      display:"flex", alignItems:"center", justifyContent:"space-between",
    }}>
      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
        <span style={{ fontFamily:"monospace", fontSize:"0.625rem", color:"rgba(255,255,255,0.6)" }}>{title}</span>
        {tag && (
          <span style={{
            fontFamily:"monospace", fontSize:"0.4375rem", letterSpacing:"0.1em", textTransform:"uppercase",
            color:"rgba(0,210,255,0.55)", background:tokens.accentDim,
            border:"1px solid rgba(0,210,255,0.18)", borderRadius:2, padding:"2px 6px",
          }}>{tag}</span>
        )}
      </div>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ExportButton, copy-to-clipboard action
// Props: onClick, copied (boolean)
// ─────────────────────────────────────────────────────────────────────────────
export function ExportButton({ onClick, copied = false }) {
  return (
    <button
      onClick={onClick}
      style={{
        width:"100%", padding:"9px",
        fontFamily:"monospace", fontSize:"0.5625rem", letterSpacing:"0.1em", textTransform:"uppercase",
        color:      copied ? "rgba(0,255,140,0.8)" : "rgba(255,255,255,0.3)",
        background: "rgba(255,255,255,0.025)",
        border:    `1px solid ${copied ? "rgba(0,255,140,0.2)" : tokens.border}`,
        borderRadius:3, cursor:"pointer", transition:"all 0.2s",
      }}
    >
      {copied ? "✓ copied to clipboard" : "Export JSON"}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LabNav, transparent nav for experiment / lab pages
// Props: backHref, backLabel (optional)
// ─────────────────────────────────────────────────────────────────────────────
export function LabNav({ backHref, backLabel }) {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = saved === "dark" || (!saved && prefersDark);
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);
  function toggleDark() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }
  return (
    <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:300, background:"transparent", pointerEvents:"none" }}>
      <div style={{ height:50, padding:"0 24px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <Link href="/" style={{ fontFamily:"var(--font-syne),sans-serif", fontSize:"1.2rem", fontWeight:500, color:"rgba(255,255,255,0.9)", textDecoration:"none", letterSpacing:"-0.01em", pointerEvents:"all" }}>
          {siteConfig.wordmark}
        </Link>
        <div style={{ display:"flex", alignItems:"center", gap:16, pointerEvents:"all" }}>
          {backHref && (
            <Link href={backHref} style={{ fontFamily:"monospace", fontSize:"0.625rem", letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,255,255,0.28)", textDecoration:"none" }}>
              {backLabel || "← Back"}
            </Link>
          )}
          <button onClick={toggleDark} aria-label="Toggle theme" style={{ display:"flex", alignItems:"center", justifyContent:"center", width:32, height:32, background:"none", border:"1px solid rgba(255,255,255,0.12)", borderRadius:"50%", cursor:"pointer", color:"rgba(255,255,255,0.4)" }}>
            {dark ? (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            ) : (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
