"use client";

import { useState, useEffect, useRef, useId, useCallback } from "react";
import Link from "next/link";
import { siteConfig } from "../data/siteConfig.js";
import { projects } from "../data/projects.js";
import { cardProps } from "../lib/projectCard.js";
import { blobStates } from "../data/blobStates";
import { Knob, ColorSwatch, Sep, tokens, hexToRgb } from "./experiment/ui";
import CrystalLoader from "./components/CrystalLoader";
import DarkNav from "./components/DarkNav";
import Button from "./components/Button";
import ProjectCard from "./components/ProjectCard";
import ScrambleTitle from "./components/ScrambleTitle";
import { useTheme } from "./components/ThemeProvider";
import { useBlobPreset } from "./components/BlobPresetContext";
import { ArrowDown, ArrowRight } from "@phosphor-icons/react";
import CaseFooter from "./components/case/CaseFooter";

const lerp = (a, b, t) => a + (b - a) * t;
const ease = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

const blend = (A, B, t) => ({
  px:      lerp(A.px,      B.px,      t),
  py:      lerp(A.py,      B.py,      t),
  scale:   lerp(A.scale,   B.scale,   t),
  camZ:    lerp(A.camZ,    B.camZ,    t),
  rotX:    lerp(A.rotX,    B.rotX,    t),
  rotY:    lerp(A.rotY,    B.rotY,    t),
  freq:    lerp(A.freq,    B.freq,    t),
  amp:     lerp(A.amp,     B.amp,     t),
  speed:   lerp(A.speed,   B.speed,   t),
  fresnel: lerp(A.fresnel, B.fresnel, t),
  colorA:  A.colorA.map((v, i) => lerp(v, B.colorA[i], t)),
  colorB:  A.colorB.map((v, i) => lerp(v, B.colorB[i], t)),
  colorC:  A.colorC.map((v, i) => lerp(v, B.colorC[i], t)),
});

const CRYSTAL = {
  freq: 5.0, amp: 0.11, speed: 0.05, fresnel: 1.6,
  colorA: [0.00, 0.04, 0.14],
  colorB: [0.75, 0.92, 1.00],
  colorC: [0.50, 0.78, 1.00],
};

const INITIAL_SECTIONS = blobStates.map(s => ({
  ...s,
  colorA: [...s.colorA],
  colorB: [...s.colorB],
  colorC: [...s.colorC],
}));

const SECTION_NAMES = ["Hero", "Work", "Scale", "Contact"];
const SECTION_IDS   = ["hero", "work", "scale", "contact"];
// Index of the last section (Contact); the dots, arrow and fade-ins key off it.
const LAST = SECTION_IDS.length - 1;

// Fractional section index (1.5 = halfway from Work to Scale), measured from
// each section's real top so sections taller than the viewport still map cleanly.
function sectionProgress() {
  const tops = SECTION_IDS.map(id => document.getElementById(id)?.offsetTop ?? 0);
  const y = window.scrollY;
  for (let i = tops.length - 1; i >= 0; i--) {
    if (y >= tops[i]) {
      if (i === tops.length - 1) return i;
      return i + Math.min(1, (y - tops[i]) / Math.max(1, tops[i + 1] - tops[i]));
    }
  }
  return 0;
}


const PRESETS = [
  { name: "Amoeba",  freq: 1.0, amp: 0.50, speed: 0.15, fresnel: 3.5, colorA: [0.00, 0.02, 0.12], colorB: [0.00, 0.82, 1.00], colorC: [0.00, 1.00, 0.60] },
  { name: "Crystal", freq: 5.0, amp: 0.11, speed: 0.05, fresnel: 1.6, colorA: [0.00, 0.04, 0.14], colorB: [0.75, 0.92, 1.00], colorC: [0.50, 0.78, 1.00] },
  { name: "Pulsar",  freq: 1.5, amp: 0.88, speed: 0.52, fresnel: 4.8, colorA: [0.12, 0.00, 0.08], colorB: [1.00, 0.08, 0.55], colorC: [1.00, 0.42, 0.00] },
  { name: "Storm",   freq: 3.2, amp: 0.72, speed: 0.38, fresnel: 3.0, colorA: [0.08, 0.03, 0.00], colorB: [1.00, 0.62, 0.00], colorC: [1.00, 0.22, 0.00] },
  { name: "Wraith",  freq: 0.7, amp: 0.26, speed: 0.07, fresnel: 8.0, colorA: [0.01, 0.01, 0.03], colorB: [1.00, 1.00, 1.00], colorC: [0.68, 0.88, 1.00] },
];

// ─── Preset Swatch ───────────────────────────────────────────────────────────
function PresetSwatch({ preset, onClick }) {
  const [hover, setHover] = useState(false);
  const { name, colorA, colorB, colorC } = preset;
  const toHex = ([r, g, b]) => {
    const h = v => Math.round(Math.min(1, Math.max(0, v)) * 255).toString(16).padStart(2, "0");
    return `#${h(r)}${h(g)}${h(b)}`;
  };
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      title={name}
      style={{
        display: "flex", flexDirection: "column", gap: 5,
        padding: "7px 8px", borderRadius: 3, cursor: "pointer",
        background: hover ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.025)",
        border: `1px solid ${hover ? "rgba(255,255,255,0.14)" : tokens.border}`,
        transition: "all 0.15s",
      }}
    >
      {/* Color strip */}
      <div style={{ display: "flex", height: 6, borderRadius: 2, overflow: "hidden", width: 44 }}>
        <div style={{ flex: 1, background: toHex(colorA) }} />
        <div style={{ flex: 1, background: toHex(colorB) }} />
        <div style={{ flex: 1, background: toHex(colorC) }} />
      </div>
      {/* Name */}
      <span style={{
        fontFamily: "var(--font-syne), sans-serif", fontSize: "0.5rem", letterSpacing: "0.08em",
        textTransform: "uppercase", color: "#fff",
        transition: "color 0.15s",
      }}>
        {name}
      </span>
    </button>
  );
}

// ─── Dither Overlay ──────────────────────────────────────────────────────────
// Photo-reactive dot mask: dark image areas → bright mask → more dots visible.
// SVG filter chain: grayscale → invert → contrast. Radial gradient inside the
// mask fades edges out. All without touching the <img> element.
function DitherOverlay({ src, dotColor = "#9bb1d6", opacity = 0.55 }) {
  const uid = useId().replace(/:/g, "");
  const filterId = `df-${uid}`;
  const gradId   = `dg-${uid}`;
  const patId    = `dp-${uid}`;
  const maskId   = `dm-${uid}`;

  if (!src) return null;
  return (
    <svg
      width="100%" height="100%"
      style={{ position: "absolute", inset: 0, display: "block", zIndex: 2, pointerEvents: "none" }}
      aria-hidden="true"
    >
      <defs>
        {/* Grayscale → invert → contrast: dark photo areas become bright = more dots */}
        <filter id={filterId} colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%">
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncR type="linear" slope="-1" intercept="1" />
            <feFuncG type="linear" slope="-1" intercept="1" />
            <feFuncB type="linear" slope="-1" intercept="1" />
          </feComponentTransfer>
          <feComponentTransfer>
            <feFuncR type="linear" slope="4" intercept="-1" />
            <feFuncG type="linear" slope="4" intercept="-1" />
            <feFuncB type="linear" slope="4" intercept="-1" />
          </feComponentTransfer>
        </filter>

        {/* Radial gradient for edge fade inside the mask */}
        <radialGradient id={gradId} cx="50%" cy="50%" r="65%">
          <stop offset="0%"   stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </radialGradient>

        {/* Mask: photo luminance × radial fade */}
        <mask id={maskId}>
          <image
            href={src}
            width="100%" height="100%"
            preserveAspectRatio="xMidYMid slice"
            filter={`url(#${filterId})`}
          />
          {/* Multiply the radial gradient: darkens edges of the mask */}
          <rect width="100%" height="100%" fill={`url(#${gradId})`} style={{ mixBlendMode: "multiply" }} />
        </mask>

        {/* 4×4 dot in a 5×5 cell */}
        <pattern id={patId} width="5" height="5" patternUnits="userSpaceOnUse">
          <rect width="4" height="4" fill={dotColor} />
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill={`url(#${patId})`} mask={`url(#${maskId})`} opacity={opacity} />
    </svg>
  );
}

// ─── Controls Panel ──────────────────────────────────────────────────────────
function ControlsPanel({ sections, activeSection, onUpdate, onScrollTo, onSave }) {
  const [saveState, setSaveState] = useState("idle"); // idle | saving | saved | copied
  const s = sections[activeSection];

  // Guard: section data not ready yet (e.g. stale localStorage merge in flight)
  if (!s || typeof s.px === "undefined") return null;

  const set = (patch) => onUpdate(activeSection, patch);

  const handleSave = async () => {
    onSave(); // always persist to localStorage
    setSaveState("saving");
    try {
      const res = await fetch("/api/save-blob-states", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sections),
      });
      if (res.ok) {
        setSaveState("saved");
      } else {
        // On Vercel or if API fails, copy JSON to clipboard
        await navigator.clipboard.writeText(JSON.stringify(sections, null, 2));
        setSaveState("copied");
      }
    } catch {
      await navigator.clipboard.writeText(JSON.stringify(sections, null, 2));
      setSaveState("copied");
    }
    setTimeout(() => setSaveState("idle"), 2500);
  };

  return (
    <div style={{
      width: 252,
      height: "100%",
      overflowY: "auto",
      background: "rgba(2,4,8,0.94)",
      borderLeft: `1px solid ${tokens.border}`,
      padding: "16px 0 24px",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Header */}
      <div style={{ padding: "0 16px 14px", borderBottom: `1px solid ${tokens.borderDim}` }}>
        <span style={{ fontFamily: "var(--font-syne), sans-serif", fontSize: "0.625rem", letterSpacing: "0.14em", textTransform: "uppercase", color: tokens.textDim }}>
          Blob Editor
        </span>
      </div>

      {/* Section tabs */}
      <div style={{ display: "flex", gap: 4, padding: "12px 16px", borderBottom: `1px solid ${tokens.borderDim}` }}>
        {SECTION_NAMES.map((name, i) => (
          <button
            key={name}
            onClick={() => onScrollTo(i)}
            style={{
              fontFamily: "var(--font-syne), sans-serif", fontSize: "0.5625rem", letterSpacing: "0.06em",
              padding: "4px 8px", borderRadius: 2, border: "1px solid",
              cursor: "pointer", transition: "all 0.15s",
              color:      i === activeSection ? "rgba(0,210,255,0.9)"  : tokens.textDim,
              background: i === activeSection ? tokens.accentDim       : "transparent",
              borderColor: i === activeSection ? "rgba(0,210,255,0.25)" : tokens.border,
            }}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div style={{ padding: "16px 16px 0", flex: 1 }}>

        <Sep label="Preset" />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 16 }}>
          {PRESETS.map(pr => (
            <PresetSwatch
              key={pr.name}
              preset={pr}
              onClick={() => set({
                freq: pr.freq, amp: pr.amp, speed: pr.speed, fresnel: pr.fresnel,
                colorA: [...pr.colorA], colorB: [...pr.colorB], colorC: [...pr.colorC],
              })}
            />
          ))}
        </div>

        <Sep label="Position" />
        <Knob label="PX" value={s.px}    min={-8}  max={8}  step={0.01} onChange={v => set({ px: v })} />
        <Knob label="PY" value={s.py}    min={-6}  max={6}  step={0.01} onChange={v => set({ py: v })} />

        <Sep label="Transform" />
        <Knob label="Scale" value={s.scale} min={0.1} max={8}  step={0.01} onChange={v => set({ scale: v })} />
        <Knob label="CamZ"  value={s.camZ}  min={2}   max={10} step={0.01} onChange={v => set({ camZ: v })} />

        <Sep label="Rotation" />
        <Knob label="RotX" value={s.rotX} min={-2} max={2} step={0.01} onChange={v => set({ rotX: v })} />
        <Knob label="RotY" value={s.rotY} min={-2} max={2} step={0.01} onChange={v => set({ rotY: v })} />

        <Sep label="Noise" />
        <Knob label="Freq"    value={s.freq}    min={0.1} max={10}  step={0.01}  onChange={v => set({ freq: v })} />
        <Knob label="Amp"     value={s.amp}     min={0.01} max={0.8} step={0.001} onChange={v => set({ amp: v })} />
        <Knob label="Speed"   value={s.speed}   min={0.01} max={0.3} step={0.001} onChange={v => set({ speed: v })} />
        <Knob label="Fresnel" value={s.fresnel} min={0.5} max={8}   step={0.01}  onChange={v => set({ fresnel: v })} />

        <Sep label="Color" />
        <ColorSwatch label="A" value={s.colorA} onChange={v => set({ colorA: v })} />
        <ColorSwatch label="B" value={s.colorB} onChange={v => set({ colorB: v })} />
        <ColorSwatch label="C" value={s.colorC} onChange={v => set({ colorC: v })} />

      </div>

      {/* Save */}
      <div style={{ padding: "20px 16px 0", display: "flex", flexDirection: "column", gap: 6 }}>
        <button
          onClick={handleSave}
          disabled={saveState === "saving"}
          style={{
            width: "100%", padding: "9px",
            fontFamily: "var(--font-syne), sans-serif", fontSize: "0.625rem", letterSpacing: "0.1em", textTransform: "uppercase",
            color: saveState === "saved"  ? "rgba(0,255,140,0.8)"
                 : saveState === "copied" ? "rgba(0,210,255,0.8)"
                 : "rgba(255,255,255,0.3)",
            background: "rgba(255,255,255,0.025)",
            border: `1px solid ${
              saveState === "saved"  ? "rgba(0,255,140,0.2)"  :
              saveState === "copied" ? "rgba(0,210,255,0.2)"  : tokens.border}`,
            borderRadius: 3, cursor: saveState === "saving" ? "default" : "pointer", transition: "all 0.2s",
          }}
        >
          {saveState === "saving" ? "Saving…"
         : saveState === "saved"  ? "✓ Saved to file"
         : saveState === "copied" ? "✓ JSON copied, paste into blobStates.js"
         : "Save to config"}
        </button>
        <span style={{ fontFamily: "var(--font-syne), sans-serif", fontSize: "0.5rem", color: tokens.textDim, textAlign: "center", lineHeight: 1.5 }}>
          In dev: writes data/blobStates.js · On Vercel: copies JSON
        </span>
      </div>
    </div>
  );
}

// ─── Nav Tooltip ─────────────────────────────────────────────────────────────
function NavTooltip({ label, children }) {
  const [show, setShow] = useState(false);
  return (
    <div style={{ position: "relative", display: "inline-flex" }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <span style={{
        position: "absolute",
        right: "calc(100% + 10px)",
        top: "50%",
        transform: show ? "translateY(-50%) translateX(0)" : "translateY(-50%) translateX(4px)",
        background: "rgba(2,4,8,0.92)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(8px)",
        borderRadius: 4,
        padding: "5px 10px",
        fontFamily: "var(--font-syne), sans-serif",
        fontSize: "0.5625rem",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "#fff",
        whiteSpace: "nowrap",
        pointerEvents: "none",
        opacity: show ? 1 : 0,
        transition: "opacity 0.2s ease, transform 0.2s ease",
        zIndex: 9999,
      }}>
        {label}
      </span>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function DarkPage() {
  const mountRef  = useRef(null);
  const scrollRef = useRef(0);
  const statesRef = useRef(INITIAL_SECTIONS.map(s => ({
    ...s, colorA: [...s.colorA], colorB: [...s.colorB], colorC: [...s.colorC],
  })));

  const [activeSection,   setActiveSection]   = useState(0);
  const [loaderDone,      setLoaderDone]      = useState(false);
  const [loaderChecked,   setLoaderChecked]   = useState(false);
  const [panelOpen,       setPanelOpen]       = useState(false);
  const [sections,        setSections]        = useState(statesRef.current);

  const { theme } = useTheme();
  const { preset } = useBlobPreset();
  const isDark = theme === "dark";

  const C = {
    bg:           isDark ? "#020408"                  : "var(--bg)",
    bgCard:       isDark ? "rgba(2,4,8,0.52)"         : "rgba(247,244,240,0.85)",
    text:         isDark ? "#F0EDE8"                  : "var(--text)",
    textHigh:     isDark ? "rgba(255,255,255,0.85)"   : "rgba(0,0,0,0.82)",
    textMid:      isDark ? "rgba(255,255,255,0.72)"   : "rgba(0,0,0,0.65)",
    textLow:      isDark ? "rgba(255,255,255,0.55)"   : "var(--text-muted)",
    textDim:      isDark ? "rgba(255,255,255,0.30)"   : "rgba(0,0,0,0.38)",
    textFaint:    isDark ? "rgba(255,255,255,0.20)"   : "rgba(0,0,0,0.28)",
    textTiny:     isDark ? "rgba(255,255,255,0.10)"   : "rgba(0,0,0,0.14)",
    border:       isDark ? "rgba(255,255,255,0.06)"   : "var(--border)",
    borderMid:    isDark ? "rgba(255,255,255,0.08)"   : "var(--border-dark)",
    borderFaint:  isDark ? "rgba(255,255,255,0.04)"   : "rgba(0,0,0,0.04)",
    cardBg:       isDark ? "rgba(255,255,255,0.025)"  : "rgba(0,0,0,0.025)",
    cardBgHov:    isDark ? "rgba(255,255,255,0.045)"  : "rgba(0,0,0,0.045)",
    cardBorder:   isDark ? "rgba(255,255,255,0.06)"   : "var(--border)",
    cardBorderHov:isDark ? "rgba(255,255,255,0.11)"   : "var(--border-dark)",
  };
  const loadedSectionsRef = useRef(new Set());
  const [loadedSections,  setLoadedSections]  = useState(() => new Set());
  const loadTimersRef = useRef({});
  const [uiLoaded, setUiLoaded] = useState(false);

  const scrollToSection = (i) => {
    const el = document.getElementById(SECTION_IDS[i]);
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: el.offsetTop, behavior: reduce ? "auto" : "smooth" });
  };

  const updateSection = (idx, patch) => {
    const next = statesRef.current.map((s, i) =>
      i === idx ? { ...s, ...patch } : s
    );
    statesRef.current = next;
    setSections([...next]);
  };

  const saveStates = () => {
    localStorage.setItem("dvc-dark-states", JSON.stringify(statesRef.current));
  };

  // Check session before rendering loader
  useEffect(() => {
    const seen = sessionStorage.getItem("dvc-loader-seen") === "1";
    if (seen) setLoaderDone(true);
    setLoaderChecked(true);
  }, []);

  // Load saved states from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem("dvc-dark-states");
      if (raw) {
        const parsed = JSON.parse(raw);
        // Merge with INITIAL_SECTIONS so missing/stale fields never cause crashes
        const merged = INITIAL_SECTIONS.map((def, i) => {
          const saved = parsed[i];
          if (!saved || typeof saved.px === "undefined") return def;
          return { ...def, ...saved };
        });
        statesRef.current = merged;
        setSections([...merged]);
      }
    } catch {}
  }, []);

  // Apply global preset shader params to all sections (positions/scale untouched)
  useEffect(() => {
    const next = statesRef.current.map(s => ({
      ...s,
      freq:    preset.freq,
      amp:     preset.amp,
      speed:   preset.speed,
      fresnel: preset.fresnel,
      colorA:  [...preset.colorA],
      colorB:  [...preset.colorB],
      colorC:  [...preset.colorC],
    }));
    statesRef.current = next;
    setSections([...next]);
  }, [preset]);

  useEffect(() => {
    const onScroll = () => {
      scrollRef.current = sectionProgress();
      setActiveSection(prev => {
        const next = Math.min(Math.round(scrollRef.current), LAST);
        return next === prev ? prev : next;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setUiLoaded(true), 450);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      const all = new Set(SECTION_IDS.map((_, i) => i));
      loadedSectionsRef.current = all;
      setLoadedSections(all);
      return;
    }
    if (loadedSectionsRef.current.has(activeSection)) return;
    const id = setTimeout(() => {
      loadedSectionsRef.current.add(activeSection);
      setLoadedSections(new Set(loadedSectionsRef.current));
    }, 600);
    loadTimersRef.current[activeSection] = id;
    return () => clearTimeout(id);
  }, [activeSection]);

  // Section-by-section wheel scrolling on desktop. A section taller than the
  // screen (Scale on short laptops) scrolls natively until its edge, then hands off.
  useEffect(() => {
    let locked = false;
    const onWheel = (e) => {
      if (window.innerWidth <= 768) return;
      if (document.querySelector('[aria-modal="true"]')) return;
      if (locked) { e.preventDefault(); return; }
      if (Math.abs(e.deltaY) < 20) return;
      const current = Math.min(Math.floor(sectionProgress() + 0.01), SECTION_IDS.length - 1);
      const el = document.getElementById(SECTION_IDS[current]);
      if (el) {
        const top = el.offsetTop, bottom = top + el.offsetHeight;
        const y = window.scrollY, viewBottom = y + window.innerHeight;
        if (e.deltaY > 0 && bottom - viewBottom > 2) return;
        if (e.deltaY < 0 && y - top > 2) return;
      }
      const next = e.deltaY > 0 ? current + 1 : current - 1;
      if (next < 0 || next >= SECTION_IDS.length) return;
      e.preventDefault();
      locked = true;
      if (e.deltaY < 0) {
        // Moving up into a tall section lands on its last screen, not back at its top.
        const prev = document.getElementById(SECTION_IDS[next]);
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const top = Math.max(prev.offsetTop, prev.offsetTop + prev.offsetHeight - window.innerHeight);
        window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
      } else {
        scrollToSection(next);
      }
      setTimeout(() => { locked = false; }, 1100);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  useEffect(() => {
    let animId;
    let cancelled = false;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    let w = window.innerWidth, h = window.innerHeight;
    const s0 = statesRef.current[0];
    const cur = {
      ...s0,
      colorA: [...s0.colorA],
      colorB: [...s0.colorB],
      colorC: [...s0.colorC],
    };

    if (prefersReducedMotion) return;

    import("three").then((THREE) => {
      if (cancelled || !mountRef.current) return;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x020408);
      const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 100);
      camera.position.z = s0.camZ;

      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      mountRef.current.appendChild(renderer.domElement);

      const geometry = new THREE.IcosahedronGeometry(1.8, 80);

      const vertexShader = /* glsl */`
        uniform float uTime;
        uniform float uFreq;
        uniform float uAmp;
        uniform float uSpeed;
        uniform vec2  uMouse;
        varying vec3  vNormal;
        varying vec3  vWorldPos;
        varying float vDisplace;

        vec3 mod289(vec3 x){ return x-floor(x*(1./289.))*289.; }
        vec4 mod289(vec4 x){ return x-floor(x*(1./289.))*289.; }
        vec4 permute(vec4 x){ return mod289(((x*34.)+1.)*x); }
        vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159-0.85373472095314*r; }
        float snoise(vec3 v){
          const vec2 C=vec2(1./6.,1./3.);
          const vec4 D=vec4(0.,.5,1.,2.);
          vec3 i=floor(v+dot(v,C.yyy));
          vec3 x0=v-i+dot(i,C.xxx);
          vec3 g=step(x0.yzx,x0.xyz);
          vec3 l=1.-g;
          vec3 i1=min(g.xyz,l.zxy);
          vec3 i2=max(g.xyz,l.zxy);
          vec3 x1=x0-i1+C.xxx;
          vec3 x2=x0-i2+C.yyy;
          vec3 x3=x0-D.yyy;
          i=mod289(i);
          vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
          float n_=.142857142857;
          vec3 ns=n_*D.wyz-D.xzx;
          vec4 j=p-49.*floor(p*ns.z*ns.z);
          vec4 x_=floor(j*ns.z);
          vec4 y_=floor(j-7.*x_);
          vec4 x=x_*ns.x+ns.yyyy;
          vec4 y=y_*ns.x+ns.yyyy;
          vec4 h=1.-abs(x)-abs(y);
          vec4 b0=vec4(x.xy,y.xy);
          vec4 b1=vec4(x.zw,y.zw);
          vec4 s0=floor(b0)*2.+1.;
          vec4 s1=floor(b1)*2.+1.;
          vec4 sh=-step(h,vec4(0.));
          vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
          vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
          vec3 p0=vec3(a0.xy,h.x);
          vec3 p1=vec3(a0.zw,h.y);
          vec3 p2=vec3(a1.xy,h.z);
          vec3 p3=vec3(a1.zw,h.w);
          vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
          p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
          vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
          m=m*m;
          return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
        }

        void main(){
          vNormal = normalize(normalMatrix * normal);
          float t  = uTime * uSpeed;
          vec3  pos = position;
          float n1 = snoise(pos * uFreq         + vec3(t*.6,  t*.4,  t*.3));
          float n2 = snoise(pos * uFreq * 2.2   + vec3(-t*.4, t*.5, -t*.2) + vec3(uMouse*.35, 0.));
          float n3 = snoise(pos * uFreq * 4.8   + vec3(t*.7, -t*.3,  t*.5));
          float d  = n1*uAmp + n2*(uAmp*.5) + n3*(uAmp*.2);
          d += length(uMouse) * n2 * (uAmp*.3);
          vDisplace = d;
          pos      += normal * d;
          vWorldPos = (modelMatrix * vec4(pos, 1.)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
        }
      `;

      const fragmentShader = /* glsl */`
        uniform float uTime;
        uniform float uFresnelPow;
        uniform vec3  uColorA;
        uniform vec3  uColorB;
        uniform vec3  uColorC;
        varying vec3  vNormal;
        varying vec3  vWorldPos;
        varying float vDisplace;

        void main(){
          vec3  viewDir = normalize(cameraPosition - vWorldPos);
          float fresnel = pow(1. - max(dot(vNormal, viewDir), 0.), uFresnelPow);
          float t       = clamp(vDisplace*.5+.5, 0., 1.);
          float pulse   = sin(uTime*.2)*.5+.5;
          vec3  col     = mix(uColorA, uColorB, t);
          col            = mix(col, uColorC, fresnel*.55);
          col           *= 1. + fresnel * pulse * .08;
          float alpha   = clamp(fresnel*.95 + t*.07, 0., 1.);
          gl_FragColor  = vec4(col, alpha);
        }
      `;

      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime:       { value: 0 },
          uMouse:      { value: new THREE.Vector2(0, 0) },
          uFreq:       { value: CRYSTAL.freq },
          uAmp:        { value: CRYSTAL.amp },
          uSpeed:      { value: CRYSTAL.speed },
          uFresnelPow: { value: CRYSTAL.fresnel },
          uColorA:     { value: new THREE.Color(...CRYSTAL.colorA) },
          uColorB:     { value: new THREE.Color(...CRYSTAL.colorB) },
          uColorC:     { value: new THREE.Color(...CRYSTAL.colorC) },
        },
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const mesh     = new THREE.Mesh(geometry, material);
      const wireMat  = new THREE.MeshBasicMaterial({ color: 0x001830, wireframe: true, transparent: true, opacity: 0.07 });
      const wireMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(1.82, 14), wireMat);
      scene.add(mesh);
      scene.add(wireMesh);

      const SP = 0.05;

      const onMove = (e) => {
        mouse.tx =  (e.clientX / w - 0.5) * 2;
        mouse.ty = -(e.clientY / h - 0.5) * 2;
      };
      const onResize = () => {
        w = innerWidth; h = innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("resize",    onResize);

      const clock = new THREE.Clock();

      const tick = () => {
        if (cancelled) return;
        animId = requestAnimationFrame(tick);
        const elapsed = clock.getElapsedTime();

        mouse.x += (mouse.tx - mouse.x) * 0.04;
        mouse.y += (mouse.ty - mouse.y) * 0.04;

        const live = statesRef.current;
        const sp   = Math.max(0, scrollRef.current);
        const si   = Math.floor(sp);
        const st   = sp - si;
        const sA   = live[Math.min(si,     live.length - 1)];
        const sB   = live[Math.min(si + 1, live.length - 1)];
        const tgt  = blend(sA, sB, ease(Math.min(st, 1)));

        const K = SP;
        cur.px      += (tgt.px      - cur.px)      * K;
        cur.py      += (tgt.py      - cur.py)      * K;
        cur.scale   += (tgt.scale   - cur.scale)   * K;
        cur.camZ    += (tgt.camZ    - cur.camZ)     * K;
        cur.rotX    += (tgt.rotX    - cur.rotX)     * K;
        cur.rotY    += (tgt.rotY    - cur.rotY)     * K;
        cur.freq    += (tgt.freq    - cur.freq)     * K;
        cur.amp     += (tgt.amp     - cur.amp)      * K;
        cur.speed   += (tgt.speed   - cur.speed)    * K;
        cur.fresnel += (tgt.fresnel - cur.fresnel)  * K;
        for (let j = 0; j < 3; j++) {
          cur.colorA[j] += (tgt.colorA[j] - cur.colorA[j]) * K;
          cur.colorB[j] += (tgt.colorB[j] - cur.colorB[j]) * K;
          cur.colorC[j] += (tgt.colorC[j] - cur.colorC[j]) * K;
        }

        mesh.position.set(cur.px, cur.py, 0);
        mesh.scale.setScalar(cur.scale);
        mesh.rotation.y = elapsed * 0.04 + mouse.x * 0.10 + cur.rotY;
        mesh.rotation.x = mouse.y * 0.07 + cur.rotX;
        wireMesh.position.copy(mesh.position);
        wireMesh.scale.copy(mesh.scale);
        wireMesh.rotation.copy(mesh.rotation);
        camera.position.z = cur.camZ;

        material.uniforms.uTime.value       = elapsed;
        material.uniforms.uMouse.value.set(mouse.x, mouse.y);
        material.uniforms.uFreq.value       = cur.freq;
        material.uniforms.uAmp.value        = cur.amp;
        material.uniforms.uSpeed.value      = cur.speed;
        material.uniforms.uFresnelPow.value = cur.fresnel;
        material.uniforms.uColorA.value.setRGB(cur.colorA[0], cur.colorA[1], cur.colorA[2]);
        material.uniforms.uColorB.value.setRGB(cur.colorB[0], cur.colorB[1], cur.colorB[2]);
        material.uniforms.uColorC.value.setRGB(cur.colorC[0], cur.colorC[1], cur.colorC[2]);

        renderer.render(scene, camera);
      };

      tick();

      const domEl = renderer.domElement;
      mountRef._cleanup = () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("resize",    onResize);
        if (mountRef.current && domEl.parentNode === mountRef.current) {
          mountRef.current.removeChild(domEl);
        }
        renderer.dispose();
        geometry.dispose();
        material.dispose();
        wireMat.dispose();
      };
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(animId);
      if (mountRef._cleanup) mountRef._cleanup();
    };
  }, []);

  const ov = {
    fontFamily: "var(--font-syne), sans-serif", fontSize: "0.75rem", letterSpacing: "0.12em",
    textTransform: "uppercase", color: "#fff",
  };
  const hd = {
    fontFamily: "var(--font-syne), sans-serif", fontWeight: 700,
    letterSpacing: "-0.03em", color: C.text, lineHeight: 1.05, margin: 0,
  };
  const bd = {
    fontFamily: "var(--font-syne), sans-serif", fontSize: "0.9375rem",
    color: C.textLow, lineHeight: 1.65, margin: 0,
  };

  return (
    <div id="main-content" style={{ position: "relative", background: C.bg }}>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes hs-shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        .hs-sk { background: linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 75%); background-size: 200% 100%; animation: hs-shimmer 1.4s ease-in-out infinite; }
        .dp-burger { display: none !important; }
        .dp-cta:focus-visible { outline: 2px solid rgba(0,210,255,0.5); outline-offset: 2px; }
        .dp-navdot:focus-visible { outline: 2px solid rgba(0,210,255,0.5); outline-offset: 0; border-radius: 6px; }
        .dp-cap-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        @media (max-width: 1100px) { .dp-cap-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 768px) { .dp-cap-grid { grid-template-columns: 1fr !important; } }
        /* Akeo-style work cards */
        .ak-card { display:block; text-decoration:none; position:relative; overflow:hidden; flex:1; min-height:52vh; cursor:pointer; }
        .ak-card img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:center; transition:transform 0.7s cubic-bezier(0.2,0,0,1), filter 0.5s ease; filter:brightness(0.72) saturate(0.8); }
        .ak-card:hover img { transform:scale(1.04); filter:brightness(0.6) saturate(0.9); }
        .ak-card-overlay { position:absolute; inset:0; background:linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.18) 55%, transparent 100%); pointer-events:none; }
        .ak-card-body { position:absolute; bottom:0; left:0; right:0; padding:28px 32px; }
        .ak-card-title { font-family:var(--font-syne),sans-serif; font-weight:800; font-size:clamp(1.5rem,3.2vw,2.8rem); letter-spacing:-0.04em; line-height:0.95; color:#fff; margin:0 0 12px; text-transform:uppercase; }
        .ak-card-tags { display:flex; gap:6px; flex-wrap:wrap; }
        .ak-card-tag { font-family:var(--font-syne),sans-serif; font-size:0.5rem; letter-spacing:0.14em; text-transform:uppercase; color:rgba(255,255,255,0.65); border:1px solid rgba(255,255,255,0.25); border-radius:2px; padding:3px 8px; }
        /* Capabilities stacked text */
        .ak-cap-line { font-family:var(--font-syne),sans-serif; font-weight:800; text-transform:uppercase; letter-spacing:-0.04em; line-height:0.9; white-space:nowrap; display:block; transition:color 0.25s, opacity 0.25s; }
        .ak-cap-line:hover { color:#fff !important; opacity:1 !important; }
        @media (max-width:768px) {
          .dp-burger { display: flex !important; }
          .dp-hero { height:auto !important; min-height:100dvh !important; }
          .dp-work { height:auto !important; padding:60px 24px 72px !important; }
          .dp-dots { display:none !important; }
          .ak-card { min-height:44vw !important; }
          .ak-card-title { font-size:clamp(1.1rem,5vw,1.8rem) !important; }
          .ak-card-body { padding:18px 20px !important; }
          .dp-pos { height:auto !important; padding:72px 24px !important; }
          .dp-footer { height:auto !important; padding:80px 24px 80px !important; }
        }
        .hw-card {
          display:block; text-decoration:none; position:relative;
          background:rgba(255,255,255,0.06); border-radius:18px; overflow:hidden;
          backdrop-filter:blur(24px); -webkit-backdrop-filter:blur(24px);
          padding:28px 24px 24px;
          transition:transform 0.5s cubic-bezier(0.2,0,0,1), box-shadow 0.5s cubic-bezier(0.2,0,0,1);
          box-shadow:0 0 0 1px rgba(255,255,255,0.09);
          will-change:transform;
        }
        .hw-card:hover { transform:translateY(-8px) scale(1.015); box-shadow:0 32px 72px rgba(0,0,0,0.6),0 0 0 1px rgba(255,255,255,0.16); }
        .pf-work-foot { margin-top:24px; display:flex; align-items:baseline; gap:12px 32px; flex-wrap:wrap; max-width:1300px; }
        .pf-access-link { color:#F0EDE8; text-decoration:underline; text-underline-offset:3px; text-decoration-color:rgba(240,237,232,0.4); transition:text-decoration-color 0.2s; }
        .pf-access-link:hover { text-decoration-color:#F0EDE8; }
        @media (max-width: 768px) {
          .dp-burger    { display: flex !important; }
          .dp-hero   { height: auto !important; min-height: 100dvh !important; padding: 96px 24px 108px !important; }
          .dp-work   { height: auto !important; padding: 80px 24px 108px !important; }
          .dp-pos    { height: auto !important; padding: 72px 24px 108px !important; }
          .dp-pos-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .dp-about  { min-height: 100vh !important; height: auto !important; padding: 48px 24px 32px !important; }
          .dp-about-header { grid-template-columns: 1fr !important; gap: 24px !important; }
          .dp-about-cards { grid-template-columns: 1fr !important; min-height: 360px !important; }
          .dp-footer { height: auto !important; padding: 80px 24px 80px !important; }
          .dp-dots { display: none !important; }
          .dp-cap-grid { grid-template-columns: 1fr !important; }
        }
        /* Dither overlay system */
        .dp-frost-halftone {
          --dither-shadow: #041527;
          --dither-highlight: #70e0d8;
          --dither-dot: 4px;
          --dither-dot-opacity: 0.7;
          --dither-tint-opacity: 0.14;
          position: relative;
        }
        .dp-frost-halftone::before {
          content: "";
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, var(--dither-shadow) 32%, transparent 32%);
          background-size: var(--dither-dot) var(--dither-dot);
          mix-blend-mode: hard-light;
          opacity: var(--dither-dot-opacity);
          pointer-events: none; z-index: 2;
        }
        .dp-frost-halftone::after {
          content: "";
          position: absolute; inset: 0;
          background-color: var(--dither-highlight);
          mix-blend-mode: color;
          opacity: var(--dither-tint-opacity);
          pointer-events: none; z-index: 3;
        }
        /* Theme presets */
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
      `}} />

      {/* Fixed blob canvas, pointerEvents none so touch scrolls the page */}
      <div ref={mountRef} style={{ position: "fixed", inset: 0, zIndex: 0, opacity: loaderDone ? 1 : 0, transition: "opacity 0.4s ease", pointerEvents: "none" }} />

      {/* Vertical section dots + next button fixed bottom right */}
      <div className="dp-dots" style={{
        position: "fixed", right: 64, bottom: 40, zIndex: 200,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
      }}>
        {/* Skeleton dots */}
        <div style={{
          position: "absolute", bottom: 0, right: 0,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
          opacity: uiLoaded ? 0 : 1, transition: "opacity 0.4s ease", pointerEvents: "none",
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
            {[0,1,2,3,4,5,6].map(i => (
              <div key={i} className="hs-sk" style={{ width: 5, height: 5, borderRadius: 2.5 }} />
            ))}
          </div>
          <div className="hs-sk" style={{ width: 36, height: 36, borderRadius: "50%" }} />
        </div>

        {/* Real dots */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", opacity: uiLoaded ? 1 : 0, transition: "opacity 0.4s ease" }}>
          {SECTION_NAMES.map((name, i) => (
            <NavTooltip key={i} label={name}>
              <button aria-label={`Go to ${name}`} aria-current={activeSection === i ? "true" : undefined} onClick={() => scrollToSection(i)} className="dp-navdot" style={{ background: "none", border: "none", cursor: "pointer", width: 44, minHeight: 24, padding: "4px 0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{
                  width: 5, height: activeSection === i ? 18 : 5, borderRadius: 2.5,
                  background: activeSection === i ? "rgba(0,210,255,0.75)" : C.textFaint,
                  transition: "height 0.35s cubic-bezier(0.16,1,0.3,1), background 0.35s ease",
                }} />
              </button>
            </NavTooltip>
          ))}
        </div>
        <div style={{ opacity: uiLoaded ? 1 : 0, transition: "opacity 0.4s ease" }}>
          <NavTooltip label={activeSection < LAST ? SECTION_NAMES[activeSection + 1] : "Back to top"}>
            <button
              aria-label={activeSection < LAST ? `Go to ${SECTION_NAMES[activeSection + 1]}` : "Back to top"}
              onClick={() => activeSection < LAST ? scrollToSection(activeSection + 1) : scrollToSection(0)}
              style={{
                width: 36, height: 36, borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: C.textDim,
                background: "none", cursor: "pointer", padding: 0,
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.textMid; e.currentTarget.style.color = C.text; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.textFaint; e.currentTarget.style.color = C.textDim; }}
            >
              {activeSection < LAST ? (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
                </svg>
              ) : (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>
                </svg>
              )}
            </button>
          </NavTooltip>
        </div>
      </div>

      {/* Loader */}
      {loaderChecked && !loaderDone && <CrystalLoader onDone={() => { sessionStorage.setItem("dvc-loader-seen", "1"); setLoaderDone(true); }} />}

      <DarkNav transparent visible={uiLoaded} onLogoClick={() => scrollToSection(0)} />


      {/* Controls panel */}
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 400,
        transform: panelOpen ? "translateX(0)" : "translateX(252px)",
        visibility: panelOpen ? "visible" : "hidden",
        transition: panelOpen
          ? "transform 0.25s cubic-bezier(0.4,0,0.2,1)"
          : "transform 0.25s cubic-bezier(0.4,0,0.2,1), visibility 0s linear 0.25s",
      }}>
        <ControlsPanel
          sections={sections}
          activeSection={activeSection}
          onUpdate={updateSection}
          onScrollTo={scrollToSection}
          onSave={saveStates}
        />
      </div>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section id="hero" className="dp-hero" style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", textAlign: "center",
        padding: "96px 64px 56px",
        position: "relative", zIndex: 5, pointerEvents: "none",
      }}>
        <div style={{ position: "relative", width: "100%", maxWidth: 1200, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>

          {/* Skeleton */}
          <div style={{
            position: "absolute", top: "50%", left: 0, width: "100%", transform: "translateY(-50%)",
            display: "flex", flexDirection: "column", alignItems: "center",
            opacity: loadedSections.has(0) ? 0 : 1,
            transition: "opacity 0.4s ease",
            pointerEvents: "none",
          }}>
            <div className="hs-sk" style={{ width: 80, height: 8, borderRadius: 2, marginBottom: 16 }} />
            <div className="hs-sk" style={{ width: "52%", height: 54, borderRadius: 4, marginBottom: 8 }} />
            <div className="hs-sk" style={{ width: "40%", height: 54, borderRadius: 4, marginBottom: 20 }} />
            <div className="hs-sk" style={{ width: "72%", height: 9, borderRadius: 2, marginBottom: 6 }} />
            <div className="hs-sk" style={{ width: "60%", height: 9, borderRadius: 2, marginBottom: 6 }} />
            <div className="hs-sk" style={{ width: "48%", height: 9, borderRadius: 2, marginBottom: 32 }} />
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <div className="hs-sk" style={{ width: 118, height: 36, borderRadius: 3 }} />
              <div className="hs-sk" style={{ width: 152, height: 9, borderRadius: 2 }} />
            </div>
          </div>

          {/* Real content */}
          <div style={{
            opacity: loadedSections.has(0) ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}>
            <h1 style={{ ...hd, fontSize: "clamp(3.25rem, 10vw, 8.5rem)", letterSpacing: "-0.04em", lineHeight: 0.95, marginBottom: 24 }}>
              <ScrambleTitle text={siteConfig.name} start={loadedSections.has(0)} />
            </h1>
            <p style={{ ...ov, color: "#fff", marginBottom: 8 }}>
              {siteConfig.role}
            </p>
            <p style={{ ...ov, color: "#fff", textTransform: "none", letterSpacing: "0.01em", fontSize: "0.9375rem", marginBottom: 20 }}>
              {siteConfig.heroLine}
            </p>
            <p style={{ ...bd, maxWidth: 420, margin: "0 auto" }}>
              {siteConfig.aboutLocation}
            </p>
          </div>

        </div>

        {/* View work, pinned to the bottom of the first screen */}
        <div style={{
          display: "flex", justifyContent: "center", paddingTop: 32, pointerEvents: "all",
          opacity: loadedSections.has(0) ? 1 : 0, transition: "opacity 0.4s ease",
        }}>
          <Button
            data-tour="work-btn"
            variant="ghost-light"
            size="md"
            onClick={() => scrollToSection(1)}
            iconRight={<ArrowDown size={16} weight="bold" />}
          >
            View work
          </Button>
        </div>
      </section>

      {/* ── WORK ──────────────────────────────────────────────── */}
      <section id="work" className="dp-work" style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "96px 64px 56px",
        position: "relative", zIndex: 5,
      }}>
        <div style={{
          opacity: loadedSections.has(1) ? 1 : 0,
          transition: "opacity 0.4s ease",
          flex: 1, display: "flex", flexDirection: "column",
        }}>
          <div style={{ margin: "auto 0" }}>
          <h2 style={{ ...hd, fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)", marginBottom: 28 }}>
            Selected work
          </h2>
          <div className="project-grid">
            {projects.filter(p => p.featured).map(card => (
              <ProjectCard key={card.slug} {...cardProps(card)} />
            ))}
          </div>
          </div>
        </div>
      </section>



      {/* ── SCALE ─────────────────────────────────────────────── */}
      <section id="scale" className="dp-pos" style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "96px 64px 56px",
        position: "relative", zIndex: 5,
      }}>
        <div style={{ width: "100%", flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ margin: "auto 0" }}>

          {/* Header */}
          <div style={{
            opacity: loadedSections.has(2) ? 1 : 0,
            transition: "opacity 0.4s ease",
            marginBottom: 36,
          }}>
            <h2 style={{
              fontFamily: "var(--font-syne), sans-serif", fontWeight: 700,
              letterSpacing: "-0.03em", color: C.text, lineHeight: 1.1, margin: 0,
              fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)",
            }}>
              Systems &amp; Scale
            </h2>
          </div>

          {/* Capability cards 3 + 2 grid */}
          <div className="dp-cap-grid" style={{
            opacity: loadedSections.has(2) ? 1 : 0,
            transition: "opacity 0.4s ease 0.08s",
          }}>
            {[
              {
                title: "Cross-functional",
                desc: "Working alongside PM, engineering, data, delivery, and customer success.",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="18" cy="5" r="3"/>
                    <circle cx="6" cy="12" r="3"/>
                    <circle cx="18" cy="19" r="3"/>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                  </svg>
                ),
              },
              {
                title: "Design Systems",
                desc: "Component libraries and token structures that scale with the product.",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                    <polyline points="2 17 12 22 22 17"/>
                    <polyline points="2 12 12 17 22 12"/>
                  </svg>
                ),
              },
              {
                title: "Accessibility",
                desc: "WCAG 2.1 AA as a design input, not an audit: keyboard-first, certified across enterprise video.",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <circle cx="12" cy="7.5" r="1.25"/>
                    <path d="M7.5 10.5l4.5 1 4.5-1"/>
                    <path d="M12 11.5v3l-2.5 4"/>
                    <path d="M12 14.5l2.5 4"/>
                  </svg>
                ),
              },
              {
                title: "AI-assisted Workflows",
                desc: "Using AI for UX research, rapid prototyping, and iteration.",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                ),
              },
            ].map(({ title, desc, icon }) => (
              <div key={title} style={{
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: 12,
                padding: "22px 20px 24px",
                display: "flex", flexDirection: "column", gap: 10,
              }}>
                <div style={{ color: "#fff", flexShrink: 0 }}>
                  {icon}
                </div>
                <h3 style={{
                  fontFamily: "var(--font-syne), sans-serif", fontSize: "0.9375rem",
                  fontWeight: 600, color: C.textHigh,
                  margin: 0, letterSpacing: "-0.015em", lineHeight: 1.3,
                }}>
                  {title}
                </h3>
                <p style={{
                  fontFamily: "var(--font-syne), sans-serif", fontSize: "0.8125rem",
                  color: C.textLow, margin: 0, lineHeight: 1.65,
                }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>

          </div>

          {/* ── Logos, pinned to the bottom of the section ── */}
          <div style={{
            opacity: loadedSections.has(2) ? 1 : 0,
            transition: "opacity 0.4s ease 0.18s",
            marginTop: 44,
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: 32,
          }}>

            {/* Clients row */}
            <div role="group" aria-label="Clients" style={{ display: "flex", flexWrap: "wrap", gap: "16px 40px", alignItems: "center", justifyContent: "center", marginBottom: 28 }}>
              {siteConfig.clients.map(name => (
                <span key={name} style={{ fontFamily: "var(--font-syne), sans-serif", fontSize: "0.8125rem", fontWeight: 700, letterSpacing: "-0.01em", color: "rgba(255,255,255,0.5)", whiteSpace: "nowrap" }}>{name}</span>
              ))}
            </div>

            {/* Employers row */}
            <div role="group" aria-label="Companies I worked for" style={{ display: "flex", flexWrap: "wrap", gap: "16px 40px", alignItems: "center", justifyContent: "center" }}>
              {siteConfig.employers.map(name => (
                <span key={name}
                  style={{ fontFamily: "var(--font-syne), sans-serif", fontSize: "0.8125rem", fontWeight: 700, letterSpacing: "-0.01em", color: "rgba(255,255,255,0.5)", whiteSpace: "nowrap", transition: "color 0.2s", cursor: "default" }}
                  onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.85)"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}
                >{name}</span>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ── FOOTER / CONTACT ──────────────────────────────────── */}
      <footer id="contact" className="dp-footer" style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "flex-end", padding: "96px 0 64px 64px",
        position: "relative", zIndex: 5,
      }}>
        <div style={{ position: "relative" }}>

          {/* Skeleton */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, width: "100%",
            opacity: loadedSections.has(LAST) ? 0 : 1,
            transition: "opacity 0.4s ease", pointerEvents: "none",
          }}>
            <div className="hs-sk" style={{ width: 88, height: 8, borderRadius: 2, marginBottom: 16 }} />
            <div className="hs-sk" style={{ width: "46%", height: 50, borderRadius: 4, marginBottom: 8 }} />
            <div className="hs-sk" style={{ width: "34%", height: 50, borderRadius: 4, marginBottom: 12 }} />
            <div className="hs-sk" style={{ width: "68%", height: 9, borderRadius: 2, marginBottom: 5 }} />
            <div className="hs-sk" style={{ width: "58%", height: 9, borderRadius: 2, marginBottom: 5 }} />
            <div className="hs-sk" style={{ width: "48%", height: 9, borderRadius: 2, marginBottom: 36 }} />
            <div style={{ display: "flex", gap: 20, marginBottom: 44 }}>
              <div className="hs-sk" style={{ width: 176, height: 10, borderRadius: 2 }} />
              <div className="hs-sk" style={{ width: 56, height: 10, borderRadius: 2 }} />
              <div className="hs-sk" style={{ width: 56, height: 10, borderRadius: 2 }} />
            </div>
            <div style={{ display: "flex", gap: 24 }}>
              <div className="hs-sk" style={{ width: 58, height: 8, borderRadius: 2 }} />
              <div className="hs-sk" style={{ width: 78, height: 8, borderRadius: 2 }} />
              <div className="hs-sk" style={{ width: 116, height: 8, borderRadius: 2 }} />
            </div>
          </div>

          {/* Real content */}
          <div style={{ opacity: loadedSections.has(LAST) ? 1 : 0, transition: "opacity 0.4s ease" }}>
            <p style={{ ...ov, marginBottom: 16 }}>Contact</p>
            <h2 style={{ ...hd, fontSize: "clamp(2rem, 5vw, 4rem)", marginBottom: 12 }}>
              Let&apos;s work{" "}<br aria-hidden="true" />together.
            </h2>
            <p style={{ ...bd, fontSize: "0.875rem", maxWidth: 400, marginBottom: 36 }}>
              Open to new opportunities, collaborations, and challenging product design problems.
            </p>
            <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", marginBottom: 32 }}>
              <Button href="/contact" variant="light" size="md">Get in touch</Button>
              <Button href="/portfolio" variant="ghost-light" size="md" iconRight={<ArrowRight size={14} weight="bold" />}>All Work</Button>
            </div>
            <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap", marginBottom: 44 }}>
              <a href={`mailto:${siteConfig.email}`}
                style={{ fontFamily: "var(--font-syne), sans-serif", fontSize: "0.875rem", fontWeight: 500, color: C.textLow, textDecoration: "none", transition: "color 0.2s ease" }}
                onMouseEnter={e => e.target.style.color = C.text}
                onMouseLeave={e => e.target.style.color = C.textLow}
              >{siteConfig.email}</a>
              {siteConfig.socials.map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: "var(--font-syne), sans-serif", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: C.textLow, textDecoration: "none", transition: "color 0.2s ease" }}
                  onMouseEnter={e => e.target.style.color = "rgba(0,210,255,0.85)"}
                  onMouseLeave={e => e.target.style.color = C.textLow}
                >{label}</a>
              ))}
            </div>
            <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ fontFamily: "var(--font-syne), sans-serif", fontSize: "0.75rem", color: C.textLow, letterSpacing: "0.06em" }}>WebGL · Three.js · GLSL</span>
            </div>
          </div>

        </div>
      </footer>


      <CaseFooter />
    </div>
  );
}
