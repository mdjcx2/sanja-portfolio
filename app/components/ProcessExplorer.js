"use client";

import { useId, useRef, useState } from "react";
import { phases } from "../process/DarkProcessDiamond";

// Preview-only take on DarkProcessDiamond for the home page: phase tabs and the
// diamond on the left, the selected phase's detail on the right. Below 1024px it
// stacks: tabs, then the diamond as a small picture, then the detail.

const ACCENT        = "rgba(var(--blob-r,0),var(--blob-g,210),var(--blob-b,255),0.85)";
const ACCENT_SOFT   = "rgba(var(--blob-r,0),var(--blob-g,210),var(--blob-b,255),0.35)";
const ACCENT_RGB    = "rgb(var(--blob-r,0),var(--blob-g,210),var(--blob-b,255))";

// Diamond geometry from DarkProcessDiamond (viewBox x 0–680, diamond y 60–320).
const fills = [
  "20,190 180,60 180,320",
  "180,60 340,190 180,320",
  "340,190 500,60 500,320",
  "500,60 660,190 500,320",
];
const lines = [
  { x1: 20,  y1: 190, x2: 180, y2: 60,  phase: 0 },
  { x1: 180, y1: 60,  x2: 180, y2: 320, phase: 0 },
  { x1: 180, y1: 320, x2: 20,  y2: 190, phase: 0 },
  { x1: 180, y1: 60,  x2: 340, y2: 190, phase: 1 },
  { x1: 340, y1: 190, x2: 180, y2: 320, phase: 1 },
  { x1: 340, y1: 190, x2: 500, y2: 60,  phase: 2 },
  { x1: 500, y1: 60,  x2: 500, y2: 320, phase: 2 },
  { x1: 500, y1: 320, x2: 340, y2: 190, phase: 2 },
  { x1: 500, y1: 60,  x2: 660, y2: 190, phase: 3 },
  { x1: 660, y1: 190, x2: 500, y2: 320, phase: 3 },
];

const title = (label) => label.charAt(0) + label.slice(1).toLowerCase();

export default function ProcessExplorer() {
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(-1);
  const tabRefs = useRef([]);
  const uid = useId();
  const on = (i) => active === i || hover === i;

  const onTabKey = (e, i) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    let next = step !== undefined ? (i + step + phases.length) % phases.length
      : e.key === "Home" ? 0 : e.key === "End" ? phases.length - 1 : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="px-grid">
      {/* Raw HTML so the quoted selectors aren't escaped during SSR (hydration mismatch). */}
      <style dangerouslySetInnerHTML={{ __html: `
        .px-grid { display:grid; grid-template-columns:minmax(0,1.35fr) minmax(0,1fr); gap:48px; align-items:stretch; }
        .px-left { display:flex; flex-direction:column; }
        .px-left .px-diamond { margin-top:auto; }
        .px-stack { display:grid; }
        .px-panel { grid-area:1 / 1; display:flex; flex-direction:column; }
        .px-ghost { visibility:hidden; }
        .px-wf { margin-top:auto; padding-top:8px; }
        .px-tabs { display:grid; grid-template-columns:repeat(4,1fr); gap:8px; margin-bottom:20px; }
        .px-tab {
          appearance:none; background:none; cursor:pointer; text-align:left;
          border:1px solid rgba(255,255,255,0.09); border-radius:10px; padding:12px 14px;
          font-family:var(--font-syne),sans-serif; color:rgba(255,255,255,0.78);
          transition:border-color 0.2s, background 0.2s, color 0.2s;
        }
        .px-tab:hover { border-color:rgba(255,255,255,0.2); color:#fff; }
        .px-tab[aria-selected="true"] { border-color:${ACCENT_SOFT}; background:rgba(var(--blob-r,0),var(--blob-g,210),var(--blob-b,255),0.08); color:${ACCENT}; }
        .px-tab:focus-visible { outline:2px solid ${ACCENT}; outline-offset:2px; }
        .px-tab-name { display:block; font-size:0.875rem; font-weight:600; letter-spacing:0.02em; }
        .px-tab-sub { display:block; margin-top:4px; font-size:0.75rem; line-height:1.4; color:rgba(255,255,255,0.55); }
        .px-tab[aria-selected="true"] .px-tab-sub { color:rgba(255,255,255,0.7); }
        .px-chip { font-family:var(--font-syne),sans-serif; font-size:0.75rem; letter-spacing:0.02em; color:#fff; border:1px solid ${ACCENT_SOFT}; border-radius:6px; padding:5px 10px; }
        .px-on { animation:px-in 0.3s cubic-bezier(0.16,1,0.3,1); }
        @keyframes px-in { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:none; } }
        @media (prefers-reduced-motion: reduce) { .px-on { animation:none; } }
        @media (max-width: 1023px) {
          .px-grid { grid-template-columns:1fr; gap:28px; }
          .px-left .px-diamond { max-width:420px; margin:0 auto; }
          .px-ghost { display:none; }
        }
        @media (max-width: 560px) {
          .px-tabs { grid-template-columns:repeat(2,1fr); }
          .px-tab-sub { display:none; }
        }
      ` }} />

      <div className="px-left">
        <div role="tablist" aria-label="Design process phases" className="px-tabs">
          {phases.map((p, i) => (
            <button
              key={p.id}
              ref={el => (tabRefs.current[i] = el)}
              role="tab"
              id={`${uid}-tab-${i}`}
              aria-selected={active === i}
              aria-controls={`${uid}-panel`}
              tabIndex={active === i ? 0 : -1}
              className="px-tab"
              onClick={() => setActive(i)}
              onKeyDown={e => onTabKey(e, i)}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(-1)}
            >
              <span className="px-tab-name">{title(p.label)}</span>
              <span className="px-tab-sub">{p.sub}</span>
            </button>
          ))}
        </div>

        {/* Picture only: the tabs above are the accessible control. */}
        <svg viewBox="0 50 680 280" aria-hidden="true" className="px-diamond"
          style={{ display: "block", width: "100%", height: "auto" }}>
          {[180, 340, 500].map(x => (
            <line key={x} x1={x} y1={52} x2={x} y2={328}
              stroke="rgba(255,255,255,0.06)" strokeWidth={1} strokeDasharray="5 4" />
          ))}
          {lines.map((ln, i) => (
            <line key={i} x1={ln.x1} y1={ln.y1} x2={ln.x2} y2={ln.y2}
              style={{
                stroke: on(ln.phase) ? ACCENT : "rgba(255,255,255,0.14)",
                strokeWidth: on(ln.phase) ? 1.75 : 1,
                transition: "stroke 0.25s, stroke-width 0.25s",
              }} />
          ))}
          {phases.map((p, i) => (
            <polygon key={p.id} points={fills[i]} stroke="none"
              onClick={() => setActive(i)}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(-1)}
              style={{ fill: ACCENT_RGB, fillOpacity: active === i ? 0.12 : hover === i ? 0.06 : 0, cursor: "pointer", transition: "fill-opacity 0.2s" }} />
          ))}
          {[[20, [0]], [340, [1, 2]], [660, [3]]].map(([cx, ph]) => (
            <circle key={cx} cx={cx} cy={190} r={5}
              style={{ fill: ph.some(on) ? ACCENT : "rgba(255,255,255,0.25)", transition: "fill 0.2s" }} />
          ))}
        </svg>
      </div>

      {/* Every phase renders into the same grid cell, so the row is as tall as the
          longest phase and nothing jumps when switching tabs. Only the active one
          is visible and exposed; the rest just reserve the space. */}
      <div className="px-stack">
        {phases.map((p, pi) => {
          const isOn = pi === active;
          return (
            <div
              key={p.id}
              {...(isOn
                ? { role: "tabpanel", id: `${uid}-panel`, "aria-labelledby": `${uid}-tab-${active}` }
                : { "aria-hidden": true })}
              className={isOn ? "px-panel px-on" : "px-panel px-ghost"}
            >
              <h3 style={{
                fontFamily: "var(--font-syne), sans-serif", fontSize: "1.125rem", fontWeight: 600,
                letterSpacing: "-0.01em", color: ACCENT, margin: "0 0 10px", textWrap: "balance",
              }}>
                {p.title}
              </h3>
              <p style={{
                fontFamily: "var(--font-syne), sans-serif", fontSize: "0.9375rem",
                color: "rgba(255,255,255,0.82)", lineHeight: 1.65, margin: "0 0 16px", textWrap: "pretty",
              }}>
                {p.desc}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
                {p.tools.map(t => <span key={t} className="px-chip">{t}</span>)}
              </div>
              <ul className="px-wf" style={{ listStyle: "none", marginBottom: 0, paddingLeft: 0, paddingRight: 0, paddingBottom: 0 }}>
                {p.wf.map((w, i, arr) => (
                  <li key={w.l} style={{
                    padding: "12px 0",
                    borderTop: "1px solid rgba(255,255,255,0.07)",
                    ...(i === arr.length - 1 ? { paddingBottom: 0 } : null),
                  }}>
                    <p style={{
                      fontFamily: "var(--font-syne), sans-serif", fontSize: "0.875rem",
                      fontWeight: 600, color: "#fff", margin: "0 0 4px",
                    }}>{w.l}</p>
                    <p style={{
                      fontFamily: "var(--font-syne), sans-serif", fontSize: "0.8125rem",
                      color: "rgba(255,255,255,0.68)", lineHeight: 1.6, margin: 0, textWrap: "pretty",
                    }}>{w.d}</p>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
