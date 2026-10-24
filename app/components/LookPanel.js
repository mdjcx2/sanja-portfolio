"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useBlobPreset, BLOB_PRESETS, DEFAULT_PRESET, DEFAULT_OVERLAY } from "./BlobPresetContext";

// The background settings behind the nav cog. A side sheet on desktop and a
// bottom sheet on phones, so the background stays visible while it changes.
// Moods pair a blob preset with a dither style; Fine-tune exposes the parts.

export const DITHER_PRESETS = [
  { id: "none",       label: "Off",          shadow: "#000000", highlight: "transparent" },
  { id: "reference",  label: "Reference",    shadow: "#0d1b2a", highlight: "#9bb1d6" },
  { id: "classic",    label: "B&W 1-Bit",    shadow: "#050505", highlight: "#f8fafc" },
  { id: "gameboy",    label: "GameBoy",      shadow: "#0f380f", highlight: "#9bbc0f" },
  { id: "cyberpunk",  label: "Cyber Neon",   shadow: "#2a0845", highlight: "#ff007f" },
  { id: "amber",      label: "Vintage Amber",shadow: "#1a0f00", highlight: "#ffb000" },
  { id: "vaporwave",  label: "Vaporwave",    shadow: "#11002c", highlight: "#00f0ff" },
  { id: "matrix",     label: "Matrix",       shadow: "#001100", highlight: "#00ff66" },
  { id: "halftone",   label: "Halftone",     shadow: "#0c0f1d", highlight: "#e2e8f0" },
  { id: "sunset",     label: "Sunset Gold",  shadow: "#2d0922", highlight: "#ffbe3b" },
  { id: "redalert",   label: "Red Alert",    shadow: "#180003", highlight: "#ff2a4b" },
  { id: "arctic",     label: "Arctic Frost", shadow: "#041527", highlight: "#70e0d8" },
  { id: "toxic",      label: "Toxic Waste",  shadow: "#0d1800", highlight: "#a8ff00" },
  { id: "solar",      label: "Solar Purple", shadow: "#140024", highlight: "#e040fb" },
  { id: "sepia",      label: "Sepia",        shadow: "#1c120c", highlight: "#f5e6ca" },
  { id: "floydmono",  label: "Floyd Mono",   shadow: "#0a0a0c", highlight: "#e0e6ed" },
  { id: "blueprint",  label: "Blueprint",    shadow: "#002244", highlight: "#d0f0ff" },
];

const MOODS = [
  { id: "midnight", name: "Midnight", preset: "Dark",    style: "reference", note: "The original" },
  { id: "glacier",  name: "Glacier",  preset: "Crystal", style: "arctic",    note: "Cool and clear" },
  { id: "neon",     name: "Neon",     preset: "Pulsar",  style: "cyberpunk", note: "Loud and fast" },
  { id: "ember",    name: "Ember",    preset: "Storm",   style: "amber",     note: "Warm and restless" },
];

const SLIDERS = [
  { key: "freq",    label: "Detail", min: 0.1,  max: 10,  step: 0.1 },
  { key: "amp",     label: "Wobble", min: 0.01, max: 1.0, step: 0.01 },
  { key: "speed",   label: "Speed",  min: 0.01, max: 0.6, step: 0.01 },
  { key: "fresnel", label: "Glow",   min: 0.5,  max: 10,  step: 0.1 },
];

const ACCENT = "rgb(var(--blob-r,0),var(--blob-g,210),var(--blob-b,255))";
const ACCENT_A = (a) => `rgba(var(--blob-r,0),var(--blob-g,210),var(--blob-b,255),${a})`;
const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

const toHex = ([r, g, b]) => {
  const h = v => Math.round(Math.min(1, Math.max(0, v)) * 255).toString(16).padStart(2, "0");
  return `#${h(r)}${h(g)}${h(b)}`;
};
const fromHex = hex => [
  parseInt(hex.slice(1, 3), 16) / 255,
  parseInt(hex.slice(3, 5), 16) / 255,
  parseInt(hex.slice(5, 7), 16) / 255,
];
const styleById = id => DITHER_PRESETS.find(d => d.id === id) ?? DITHER_PRESETS[0];

// Preset colours under the style's dot screen and tint, like the real background.
function Swatch({ preset, style, radius = 8 }) {
  const cols = [preset.colorA, preset.colorB, preset.colorC].map(toHex);
  return (
    <span aria-hidden="true" style={{
      display: "block", width: "100%", aspectRatio: "4 / 3", borderRadius: radius, overflow: "hidden", position: "relative",
      background: `linear-gradient(135deg, ${cols[0]} 0%, ${cols[1]} 55%, ${cols[2]} 100%)`,
      boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
    }}>
      {style.id !== "none" && (
        <>
          <span style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle, ${style.shadow} 32%, transparent 32%)`, backgroundSize: "4px 4px", mixBlendMode: "hard-light", opacity: 0.8 }} />
          <span style={{ position: "absolute", inset: 0, backgroundColor: style.highlight, mixBlendMode: "color", opacity: 0.45 }} />
        </>
      )}
    </span>
  );
}

function Slider({ label, value, min, max, step, onChange }) {
  const id = useId();
  const [focus, setFocus] = useState(false);
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  const shown = Number(value).toFixed(step < 0.1 ? 2 : 1);
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
        <label htmlFor={id} className="lp-label">{label}</label>
        <span className="lp-value" aria-hidden="true">{shown}</span>
      </div>
      <div style={{ position: "relative", height: 24 }}>
        <span aria-hidden="true" style={{ position: "absolute", left: 0, right: 0, top: 11, height: 3, borderRadius: 2, background: "rgba(255,255,255,0.14)" }}>
          <span style={{ display: "block", height: "100%", width: `${pct}%`, borderRadius: 2, background: ACCENT_A(0.7) }} />
        </span>
        <span aria-hidden="true" style={{
          position: "absolute", left: `${pct}%`, top: 12, width: 16, height: 16, borderRadius: "50%",
          transform: "translate(-50%, -50%)", background: "#fff", pointerEvents: "none",
          boxShadow: focus ? `0 0 0 3px #05070b, 0 0 0 5px ${ACCENT}` : "0 1px 4px rgba(0,0,0,0.6)",
        }} />
        <input
          id={id} type="range" min={min} max={max} step={step} value={value}
          aria-valuetext={shown}
          onChange={e => onChange(parseFloat(e.target.value))}
          onFocus={e => setFocus(e.target.matches(":focus-visible"))}
          onKeyDown={() => setFocus(true)}
          onPointerDown={() => setFocus(false)}
          onBlur={() => setFocus(false)}
          style={{ position: "absolute", inset: 0, width: "100%", margin: 0, opacity: 0, cursor: "pointer" }}
        />
      </div>
    </div>
  );
}

export default function LookPanel({ open, onClose, onRestartTour }) {
  const { preset, setPreset, overlayTheme, setOverlayTheme } = useBlobPreset();
  const [fine, setFine] = useState(false);
  const boxRef = useRef(null);
  const titleId = useId();
  const fineId = useId();

  useEffect(() => {
    if (!open) return;
    const trigger = document.activeElement;
    (boxRef.current?.querySelector('[aria-pressed="true"]') || boxRef.current?.querySelector(FOCUSABLE))?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key !== "Tab" || !boxRef.current) return;
      const items = [...boxRef.current.querySelectorAll(FOCUSABLE)].filter(el => el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      if (trigger instanceof HTMLElement) trigger.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  const activeMood = MOODS.find(m => m.preset === preset.name && m.style === overlayTheme);
  const currentLabel = activeMood ? activeMood.name
    : `${preset.name === "Custom" ? "Custom shape" : preset.name} · ${styleById(overlayTheme).label}`;
  const pickMood = (m) => { setPreset(BLOB_PRESETS.find(p => p.name === m.preset) ?? DEFAULT_PRESET); setOverlayTheme(m.style); };
  const tune = (patch) => setPreset({ ...preset, ...patch, name: "Custom" });
  const reset = () => { setPreset(DEFAULT_PRESET); setOverlayTheme(DEFAULT_OVERLAY); };

  return (
    <div className="lp-scrim" onClick={onClose}>
      {/* Raw HTML so the quoted selectors aren't escaped during SSR (hydration mismatch). */}
      <style dangerouslySetInnerHTML={{ __html: `
        .lp-scrim { position:fixed; inset:0; z-index:9800; background:rgba(2,4,8,0.25); animation:lp-fade 0.2s ease; }
        .lp-sheet {
          position:fixed; top:12px; right:12px; bottom:12px; width:min(400px, calc(100vw - 24px));
          display:flex; flex-direction:column; overflow:hidden;
          background:linear-gradient(rgba(255,255,255,0.06), rgba(255,255,255,0.06)), rgba(12,16,24,0.78);
          backdrop-filter:blur(24px); -webkit-backdrop-filter:blur(24px);
          border:1px solid rgba(255,255,255,0.09); border-radius:14px;
          box-shadow:0 24px 64px rgba(0,0,0,0.45);
          font-family:var(--font-syne),sans-serif; color:#F0EDE8;
          animation:lp-in 0.32s cubic-bezier(0.16,1,0.3,1);
        }
        @keyframes lp-fade { from { opacity:0; } to { opacity:1; } }
        @keyframes lp-in { from { opacity:0; transform:translateX(16px); } to { opacity:1; transform:none; } }
        @keyframes lp-up { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:none; } }
        .lp-scroll { flex:1; overflow-y:auto; overscroll-behavior:contain; padding:0 20px 20px; }
        .lp-h { font-size:0.75rem; font-weight:600; letter-spacing:0.08em; text-transform:uppercase; color:rgba(255,255,255,0.62); margin:22px 0 10px; }
        .lp-label { font-size:0.8125rem; color:rgba(255,255,255,0.82); }
        .lp-value { font-size:0.75rem; color:rgba(255,255,255,0.6); font-variant-numeric:tabular-nums; }
        .lp-opt {
          appearance:none; background:none; border:1px solid transparent; border-radius:10px; padding:6px;
          display:flex; flex-direction:column; gap:6px; text-align:left; cursor:pointer; color:inherit; font:inherit;
          transition:border-color 0.15s, background 0.15s;
        }
        .lp-opt:hover { background:rgba(255,255,255,0.04); }
        .lp-opt[aria-pressed="true"] { border-color:${ACCENT_A(0.55)}; background:${ACCENT_A(0.08)}; }
        .lp-opt:focus-visible, .lp-btn:focus-visible, .lp-x:focus-visible, .lp-link:focus-visible, .lp-color:focus-within { outline:2px solid ${ACCENT}; outline-offset:2px; }
        .lp-opt-name { font-size:0.8125rem; font-weight:600; color:#fff; }
        .lp-opt-note { font-size:0.75rem; color:rgba(255,255,255,0.6); margin-top:-4px; }
        .lp-small { font-size:0.75rem; color:rgba(255,255,255,0.72); line-height:1.25; }
        .lp-moods { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
        .lp-grid3 { display:grid; grid-template-columns:repeat(3,1fr); gap:6px; }
        .lp-grid4 { display:grid; grid-template-columns:repeat(4,1fr); gap:4px; }
        .lp-btn {
          appearance:none; font:inherit; font-size:0.8125rem; font-weight:600; border-radius:8px; padding:10px 16px; cursor:pointer;
          border:1px solid rgba(255,255,255,0.16); background:none; color:#F0EDE8; min-height:40px;
        }
        .lp-btn:hover { border-color:rgba(255,255,255,0.3); }
        .lp-btn-primary { background:#F0EDE8; color:#05070b; border-color:#F0EDE8; }
        .lp-btn-primary:hover { background:#fff; }
        .lp-x { appearance:none; width:40px; height:40px; display:flex; align-items:center; justify-content:center; border-radius:8px; border:1px solid rgba(255,255,255,0.14); background:none; color:rgba(255,255,255,0.8); cursor:pointer; flex-shrink:0; }
        .lp-x:hover { color:#fff; border-color:rgba(255,255,255,0.3); }
        .lp-link { appearance:none; background:none; border:none; padding:4px 0; font:inherit; font-size:0.8125rem; color:rgba(255,255,255,0.75); text-decoration:underline; text-underline-offset:3px; text-decoration-color:rgba(255,255,255,0.3); cursor:pointer; }
        .lp-link:hover { color:#fff; }
        .lp-color { display:flex; align-items:center; gap:10px; padding:4px 0; cursor:pointer; border-radius:6px; }
        .lp-color input { width:32px; height:24px; padding:0; border:1px solid rgba(255,255,255,0.2); border-radius:4px; background:none; cursor:pointer; }
        .lp-color input:focus { outline:none; }
        @media (max-width: 640px) {
          .lp-sheet { top:auto; left:0; right:0; bottom:0; width:auto; max-height:88dvh; border-radius:16px 16px 0 0; border-bottom:none; animation:lp-up 0.32s cubic-bezier(0.16,1,0.3,1); }
          .lp-grid4 { grid-template-columns:repeat(3,1fr); }
        }
        @media (prefers-reduced-motion: reduce) { .lp-scrim, .lp-sheet { animation:none; } }
        .lp-sr { position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0 0 0 0); white-space:nowrap; }
      ` }} />

      <div ref={boxRef} role="dialog" aria-modal="true" aria-labelledby={titleId} className="lp-sheet" onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "18px 20px 4px" }}>
          <div style={{ flex: 1 }}>
            <h2 id={titleId} style={{ fontSize: "1.125rem", fontWeight: 700, letterSpacing: "-0.01em", margin: 0, color: "#fff" }}>Background</h2>
            <p style={{ fontSize: "0.8125rem", lineHeight: 1.5, color: "rgba(255,255,255,0.72)", margin: "6px 0 0", textWrap: "pretty" }}>
              Change how the living background looks. Your choice is saved on this device.
            </p>
          </div>
          <button type="button" className="lp-x" onClick={onClose} aria-label="Close background settings">
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <line x1="3" y1="3" x2="15" y2="15" /><line x1="15" y1="3" x2="3" y2="15" />
            </svg>
          </button>
        </div>

        <div className="lp-scroll">
          <h3 className="lp-h">Mood</h3>
          <div className="lp-moods" role="group" aria-label="Mood">
            {MOODS.map(m => {
              const p = BLOB_PRESETS.find(b => b.name === m.preset) ?? DEFAULT_PRESET;
              return (
                <button key={m.id} type="button" className="lp-opt" aria-pressed={activeMood?.id === m.id} onClick={() => pickMood(m)}>
                  <Swatch preset={p} style={styleById(m.style)} />
                  <span className="lp-opt-name">{m.name}</span>
                  <span className="lp-opt-note">{m.note}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button" className="lp-btn" aria-expanded={fine} aria-controls={fineId}
            onClick={() => setFine(v => !v)}
            style={{ width: "100%", marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}
          >
            Fine-tune
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
              style={{ transform: fine ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          <div id={fineId} hidden={!fine}>
            <h3 className="lp-h">Shape</h3>
            <div className="lp-grid3" role="group" aria-label="Shape">
              {BLOB_PRESETS.map(p => (
                <button key={p.name} type="button" className="lp-opt" aria-pressed={preset.name === p.name} onClick={() => setPreset(p)}>
                  <Swatch preset={p} style={styleById("none")} radius={6} />
                  <span className="lp-small">{p.name}</span>
                </button>
              ))}
            </div>

            <h3 className="lp-h">Surface</h3>
            <div className="lp-grid4" role="group" aria-label="Surface">
              {DITHER_PRESETS.map(d => (
                <button key={d.id} type="button" className="lp-opt" aria-pressed={overlayTheme === d.id} onClick={() => setOverlayTheme(d.id)}>
                  <Swatch preset={{ colorA: [0.1, 0.12, 0.16], colorB: [0.42, 0.46, 0.52], colorC: [0.2, 0.22, 0.28] }} style={d} radius={6} />
                  <span className="lp-small">{d.label}</span>
                </button>
              ))}
            </div>

            <h3 className="lp-h">Motion</h3>
            {SLIDERS.map(s => (
              <Slider key={s.key} label={s.label} min={s.min} max={s.max} step={s.step}
                value={preset[s.key]} onChange={v => tune({ [s.key]: v })} />
            ))}

            <h3 className="lp-h">Colours</h3>
            {[["colorA", "Base"], ["colorB", "Light"], ["colorC", "Edge"]].map(([k, label]) => (
              <label key={k} className="lp-color">
                <input type="color" value={toHex(preset[k])} onChange={e => tune({ [k]: fromHex(e.target.value) })} />
                <span className="lp-label">{label}</span>
                <span className="lp-value" style={{ marginLeft: "auto" }}>{toHex(preset[k]).toUpperCase()}</span>
              </label>
            ))}
          </div>

          {onRestartTour && (
            <p style={{ margin: "22px 0 0" }}>
              <button type="button" className="lp-link" onClick={onRestartTour}>Restart the site tour</button>
            </p>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 20px", borderTop: "1px solid rgba(255,255,255,0.08)", background: "rgba(2,4,8,0.3)" }}>
          <p style={{ flex: 1, minWidth: 0, margin: 0, fontSize: "0.8125rem", color: "rgba(255,255,255,0.75)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            <span className="lp-sr">Current look: </span>{currentLabel}
          </p>
          <button type="button" className="lp-btn" onClick={reset}>Reset</button>
          <button type="button" className="lp-btn lp-btn-primary" onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  );
}
