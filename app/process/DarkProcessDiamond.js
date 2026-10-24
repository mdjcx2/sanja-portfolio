"use client";

import { useState, useRef, useEffect } from "react";

// Accent strings use CSS vars so they respond to the gear preset
const ACCENT       = "rgba(var(--blob-r,0),var(--blob-g,210),var(--blob-b,255),0.75)";
const ACCENT_FILL  = "rgba(var(--blob-r,0),var(--blob-g,210),var(--blob-b,255),0.08)";
const ACCENT_BORDER= "rgba(var(--blob-r,0),var(--blob-g,210),var(--blob-b,255),0.2)";

export const phases = [
  {
    id: "discover", label: "DISCOVER", sub: "insight into the problem",
    title: "Discover, exploring the problem space",
    desc: "Research, interviews, competitive analysis. AI compresses the time between raw data and actionable product decisions.",
    tools: ["Claude", "NotebookLM", "ChatGPT"],
    wf: [
      { l: "Interview synthesis", d: "8 user transcripts into Claude. Structured findings in 20 minutes instead of 2 days. Time saved on transcription is redirected to interpretation." },
      { l: "Pattern finding", d: "NotebookLM indexes research notes across sessions. Ask a question, get a cross-source answer with citations." },
      { l: "Research questions", d: "Claude generates 20 interview questions from a brief. You pick the 8 that matter and catch 3 you would have missed." },
    ],
  },
  {
    id: "define", label: "DEFINE", sub: "the area to focus upon",
    title: "Define, framing the right problem",
    desc: "Turning research into decisions. AI converts raw findings into clear, testable problem statements.",
    tools: ["Claude", "ChatGPT"],
    wf: [
      { l: "Problem statements", d: "Paste your findings, ask Claude to draft 3 How Might We framings. Pick one, refine it, own it." },
      { l: "Design principles", d: "Research findings become draft principles. AI structures them, you pressure-test against what users said." },
      { l: "Stakeholder summaries", d: "Discovery findings into a clear narrative for leadership positioning, rationale, and recommended direction. First draft in minutes." },
    ],
  },
  {
    id: "develop", label: "DEVELOP", sub: "potential solutions",
    title: "Develop, where AI fits most naturally",
    desc: "Ideation, structure, rapid concept generation. AI expands the solution space faster than any other method.",
    tools: ["Figma AI", "Figma MCP Bridge", "Claude", "ChatGPT"],
    wf: [
      { l: "IA generation", d: "Paste a problem statement, get 10 different information architecture approaches in 30 seconds. You pick the 2 worth exploring." },
      { l: "Figma AI layouts", d: "First-pass screen structures from a brief. Start from something, not a blank canvas." },
      { l: "Figma MCP Bridge", d: "Query existing design files, generate components from a description, or document what is already there." },
      { l: "Microcopy variants", d: "10 versions of a button label or error message. What used to be a workshop takes 2 minutes." },
    ],
  },
  {
    id: "deliver", label: "DELIVER", sub: "solutions that work",
    title: "Deliver, closing the loop",
    desc: "Documentation, handoff, and design system work. AI handles the first draft so you focus on accuracy.",
    tools: ["Claude", "Figma AI", "ChatGPT"],
    wf: [
      { l: "Design system docs", d: "Component behaviour, usage guidelines, dos and don'ts. Claude writes the first draft, you edit for accuracy." },
      { l: "Handoff rationale", d: "Turning design decisions into written reasoning for engineers. Why this pattern, why this spacing, why this interaction model." },
      { l: "Realistic content", d: "Figma AI generates contextual placeholder content real names, addresses, product titles instead of lorem ipsum." },
    ],
  },
];

const labelX  = [100, 260, 420, 580];
const ulX     = [48,  222, 372, 538];
const ulW     = [104, 76,  96,  84];
// Outer horizontal edge of each phase triangle (SVG units, viewBox 680)
const triLeft  = [20,  180, 340, 500];
const triRight = [180, 340, 500, 660];
const fills  = [
  "20,190 180,60 180,320",
  "180,60 340,190 180,320",
  "340,190 500,60 500,320",
  "500,60 660,190 500,320",
];
const D_SIDE = 206;
const D_VERT = 260;

const lines = [
  { x1:20,  y1:190, x2:180, y2:60,  phase:0, dash:D_SIDE },
  { x1:180, y1:60,  x2:180, y2:320, phase:0, dash:D_VERT },
  { x1:180, y1:320, x2:20,  y2:190, phase:0, dash:D_SIDE },
  { x1:180, y1:60,  x2:340, y2:190, phase:1, dash:D_SIDE },
  { x1:340, y1:190, x2:180, y2:320, phase:1, dash:D_SIDE },
  { x1:340, y1:190, x2:500, y2:60,  phase:2, dash:D_SIDE },
  { x1:500, y1:60,  x2:500, y2:320, phase:2, dash:D_VERT },
  { x1:500, y1:320, x2:340, y2:190, phase:2, dash:D_SIDE },
  { x1:500, y1:60,  x2:660, y2:190, phase:3, dash:D_SIDE },
  { x1:660, y1:190, x2:500, y2:320, phase:3, dash:D_SIDE },
];

export default function DarkProcessDiamond({ compact = false, panelBelow = false }) {
  const [active,        setActive]        = useState(panelBelow ? 0 : compact ? -1 : 0);
  const [hover,         setHover]         = useState(-1);
  const [popoverAnchor, setPopoverAnchor] = useState({ left: 0, right: "auto", ml: 0, mr: 0 });
  const [popoverClosing, setPopoverClosing] = useState(false);
  const detailRef    = useRef(null);
  const wrapperRef   = useRef(null);
  const closeTimerRef = useRef(null);

  // true when a phase should show the active/hover style
  const on = (i) => active === i || hover === i;

  function closePopover() {
    setPopoverClosing(true);
    closeTimerRef.current = setTimeout(() => {
      setActive(-1);
      setPopoverClosing(false);
    }, 160);
  }

  function pick(i) {
    if (panelBelow) {
      setActive(i === active ? -1 : i);
      return;
    }
    if (compact) {
      if (i === active) { closePopover(); return; }
      // Cancel any in-progress close when switching phases
      clearTimeout(closeTimerRef.current);
      setPopoverClosing(false);

      // Measure available space then anchor at the triangle's outer edge
      if (wrapperRef.current) {
        const rect   = wrapperRef.current.getBoundingClientRect();
        const svgW   = rect.width;
        const scale  = svgW / 680;
        // Use the phase centre to compare viewport space on each side
        const centreX    = labelX[i] * scale;
        const spaceRight = window.innerWidth - (rect.left + centreX);
        const spaceLeft  = rect.left + centreX;

        if (spaceRight >= spaceLeft) {
          // Anchor popover's left edge at the triangle's right outer edge
          const pct = (triRight[i] / 680 * 100).toFixed(2) + "%";
          setPopoverAnchor({ left: pct, right: "auto", ml: 10, mr: 0 });
        } else {
          // Anchor popover's right edge at the triangle's left outer edge
          const pct = ((680 - triLeft[i]) / 680 * 100).toFixed(2) + "%";
          setPopoverAnchor({ left: "auto", right: pct, ml: 0, mr: 10 });
        }
      }
      setActive(i);
      return;
    }
    const next = i === active ? -1 : i;
    setActive(next);
    if (next >= 0) {
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60);
    }
  }

  return (
    <div>
      <style>{`
        @keyframes dk-pop-in  {
          from { opacity:0; transform:translateY(-50%) scale(0.94); }
          to   { opacity:1; transform:translateY(-50%) scale(1); }
        }
        @keyframes dk-pop-out {
          from { opacity:1; transform:translateY(-50%) scale(1); }
          to   { opacity:0; transform:translateY(-50%) scale(0.94); }
        }
      `}</style>
      {(!compact || panelBelow) && (
        <p style={{
          fontFamily: "var(--font-syne), sans-serif", fontSize: "0.6875rem",
          letterSpacing: "0.1em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.4)", marginBottom: panelBelow ? 16 : 28,
        }}>
          Click a phase to explore
        </p>
      )}

      <div ref={wrapperRef} style={{ position: "relative" }}>
      <svg viewBox="0 0 680 370" role="img" aria-label="Double diamond design process"
        style={{ display: "block", width: "100%", maxWidth: 823, height: "auto", marginBottom: 0 }}>

        {/* Dashed dividers */}
        {[180, 340, 500].map(x => (
          <line key={x} x1={x} y1={46} x2={x} y2={334}
            stroke="rgba(255,255,255,0.06)" strokeWidth={1} strokeDasharray="5 4" />
        ))}

        {/* Side labels */}
        <text fontSize={9} fontWeight={600} letterSpacing=".12em" fill="rgba(255,255,255,0.18)"
          fontFamily="inherit" textAnchor="middle" transform="translate(10,190) rotate(-90)">PROBLEM</text>
        <text fontSize={9} fontWeight={600} letterSpacing=".12em" fill="rgba(255,255,255,0.18)"
          fontFamily="inherit" textAnchor="middle" transform="translate(670,190) rotate(90)">SOLUTION</text>

        {/* Centre labels */}
        <text fontSize={8} fontWeight={600} letterSpacing=".09em" fill="rgba(255,255,255,0.12)"
          fontFamily="inherit" textAnchor="middle" transform="translate(340,120) rotate(-90)">PROBLEM DEFINITION</text>
        <text fontSize={8} fontWeight={600} letterSpacing=".09em" fill="rgba(255,255,255,0.12)"
          fontFamily="inherit" textAnchor="middle" transform="translate(340,272) rotate(-90)">DESIGN BRIEF</text>

        {/* Diamond lines */}
        {lines.map((ln, i) => (
          <line key={i}
            x1={ln.x1} y1={ln.y1} x2={ln.x2} y2={ln.y2}
            style={{
              stroke: on(ln.phase) ? ACCENT : "rgba(255,255,255,0.1)",
              strokeWidth: on(ln.phase) ? 1.5 : 0.75,
              transition: "stroke 0.25s cubic-bezier(0.4,0,0.2,1), stroke-width 0.25s cubic-bezier(0.4,0,0.2,1)",
            }}
          />
        ))}

        {/* Clickable fills */}
        {phases.map((ph, i) => (
          <polygon key={ph.id} points={fills[i]}
            stroke="none" onClick={() => pick(i)}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(-1)}
            style={{
              fill: `rgb(var(--blob-r,0),var(--blob-g,210),var(--blob-b,255))`,
              fillOpacity: on(i) ? 0.1 : 0,
              cursor: "pointer",
              transition: "fill-opacity 0.2s",
            }} />
        ))}

        {/* Phase labels */}
        {phases.map((ph, i) => (
          <g key={ph.id} onClick={() => pick(i)}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(-1)}
            style={{ cursor: "pointer" }}>
            <clipPath id={"dk-ul-" + i}>
              <rect x={ulX[i]} y={34} height={3} width={on(i) ? ulW[i] : 0}
                style={{ transition: "width 0.3s cubic-bezier(0.4,0,0.2,1)" }} />
            </clipPath>
            <rect x={ulX[i]} y={35} width={ulW[i]} height={1.5}
              style={{ fill: ACCENT }}
              clipPath={"url(#dk-ul-" + i + ")"} />
            <text x={labelX[i]} y={20} textAnchor="middle" fontSize={10} fontWeight={600}
              letterSpacing=".1em" fontFamily="inherit"
              style={{
                fill: on(i) ? ACCENT : "rgba(255,255,255,0.7)",
                transition: "fill 0.25s cubic-bezier(0.4,0,0.2,1)",
              }}>
              {ph.label}
            </text>
            <text x={labelX[i]} y={33} textAnchor="middle" fontSize={10} fontFamily="inherit"
              style={{
                fill: on(i) ? "rgba(var(--blob-r,0),var(--blob-g,210),var(--blob-b,255),0.5)" : "rgba(255,255,255,0.3)",
                transition: "fill 0.25s cubic-bezier(0.4,0,0.2,1)",
              }}>
              {ph.sub}
            </text>
          </g>
        ))}

        {/* Endpoint dots */}
        <circle cx={20}  cy={190} r={5}
          style={{ fill: on(0) ? ACCENT : "rgba(255,255,255,0.2)", transition: "fill 0.2s" }} />
        <circle cx={340} cy={190} r={5}
          style={{ fill: on(1) || on(2) ? ACCENT : "rgba(255,255,255,0.2)", transition: "fill 0.2s" }} />
        <circle cx={660} cy={190} r={5}
          style={{ fill: on(3) ? ACCENT : "rgba(255,255,255,0.2)", transition: "fill 0.2s" }} />

      </svg>

      {/* Compact popover landing page only (not when panelBelow is active) */}
      {compact && !panelBelow && (active >= 0 || popoverClosing) && (
        <>
          {/* Backdrop click outside to dismiss */}
          <div onClick={closePopover} style={{ position: "fixed", inset: 0, zIndex: 49 }} />

          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: "absolute",
              /* vertically centred on the diamond body (y=190 / 370 ≈ 51%) */
              top: "51%",
              left: popoverAnchor.left,
              right: popoverAnchor.right,
              marginLeft: popoverAnchor.ml,
              marginRight: popoverAnchor.mr,
              width: 340,
              maxWidth: "calc(100vw - 48px)",
              zIndex: 50,
              animation: popoverClosing
                ? "dk-pop-out 0.16s cubic-bezier(0.4,0,1,1) both"
                : "dk-pop-in  0.22s cubic-bezier(0,0,0.2,1.1) both",
              background: "rgba(2,4,8,0.46)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 14,
              padding: "24px 24px 20px",
            }}
          >
            <h3 style={{
              fontFamily: "var(--font-syne), sans-serif",
              fontSize: "1rem", fontWeight: 600,
              letterSpacing: "-0.02em", color: ACCENT,
              marginBottom: 10,
            }}>
              {phases[active].title}
            </h3>
            <p style={{
              fontFamily: "var(--font-syne), sans-serif", fontSize: "0.8125rem",
              color: "#fff", lineHeight: 1.7, marginBottom: 16,
            }}>
              {phases[active].desc}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16 }}>
              {phases[active].tools.map(t => (
                <span key={t} style={{
                  fontFamily: "var(--font-syne), sans-serif", fontSize: "0.5625rem",
                  letterSpacing: "0.06em", color: "#fff",
                  border: `1px solid ${ACCENT_BORDER}`,
                  borderRadius: 2, padding: "4px 9px",
                }}>
                  {t}
                </span>
              ))}
            </div>
            <div>
              {phases[active].wf.map((w, wi, arr) => (
                <div key={wi} style={{
                  padding: "10px 0",
                  borderBottom: wi < arr.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                }}>
                  <p style={{
                    fontFamily: "var(--font-syne), sans-serif", fontSize: "0.8125rem",
                    fontWeight: 600, color: "#fff", marginBottom: 4,
                    letterSpacing: "-0.01em",
                  }}>
                    {w.l}
                  </p>
                  <p style={{
                    fontFamily: "var(--font-syne), sans-serif", fontSize: "0.75rem",
                    color: "#fff", lineHeight: 1.65, margin: 0,
                  }}>
                    {w.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      </div>{/* end position:relative wrapper */}

      {/* Inline panel panelBelow mode */}
      {panelBelow && active >= 0 && (
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32,
          marginTop: 20, paddingTop: 20,
          borderTop: "1px solid rgba(255,255,255,0.07)",
        }}>
          <div>
            <h3 style={{
              fontFamily: "var(--font-syne), sans-serif", fontSize: "0.9375rem",
              fontWeight: 600, letterSpacing: "-0.01em",
              color: ACCENT, margin: "0 0 10px",
            }}>
              {phases[active].title}
            </h3>
            <p style={{
              fontFamily: "var(--font-syne), sans-serif", fontSize: "0.8125rem",
              color: "rgba(255,255,255,0.8)", lineHeight: 1.65, margin: "0 0 14px",
            }}>
              {phases[active].desc}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {phases[active].tools.map(t => (
                <span key={t} style={{
                  fontFamily: "var(--font-syne), sans-serif", fontSize: "0.5625rem",
                  letterSpacing: "0.06em", color: "#fff",
                  border: `1px solid ${ACCENT_BORDER}`, borderRadius: 2, padding: "4px 9px",
                }}>{t}</span>
              ))}
            </div>
          </div>
          <div>
            {phases[active].wf.map((w, i, arr) => (
              <div key={i} style={{
                padding: "10px 0",
                borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
              }}>
                <p style={{
                  fontFamily: "var(--font-syne), sans-serif", fontSize: "0.8125rem",
                  fontWeight: 600, color: "#fff", margin: "0 0 4px",
                }}>{w.l}</p>
                <p style={{
                  fontFamily: "var(--font-syne), sans-serif", fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.65)", lineHeight: 1.65, margin: 0,
                }}>{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detail panel full process page only */}
      {!compact && active >= 0 && (
        <div ref={detailRef} className="dk-detail-grid" style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56,
          paddingTop: 40, marginTop: 40,
          borderTop: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(2,4,8,0.46)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          padding: "40px 36px 36px",
          marginLeft: -36, marginRight: -36,
        }}>
          <div>
            <h2 style={{
              fontFamily: "var(--font-syne), sans-serif",
              fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", fontWeight: 600,
              letterSpacing: "-0.02em", color: ACCENT,
              marginBottom: 14,
            }}>
              {phases[active].title}
            </h2>
            <p style={{
              fontFamily: "var(--font-syne), sans-serif", fontSize: "0.875rem",
              color: "#fff", lineHeight: 1.72, marginBottom: 24,
            }}>
              {phases[active].desc}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {phases[active].tools.map(t => (
                <span key={t} style={{
                  fontFamily: "var(--font-syne), sans-serif", fontSize: "0.5625rem",
                  letterSpacing: "0.06em", color: "#fff",
                  border: `1px solid ${ACCENT_BORDER}`,
                  borderRadius: 2, padding: "4px 9px",
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {phases[active].wf.map((w, i, arr) => (
              <div key={i} style={{
                padding: "16px 0",
                borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
              }}>
                <p style={{
                  fontFamily: "var(--font-syne), sans-serif", fontSize: "0.875rem",
                  fontWeight: 600, color: "#fff", marginBottom: 6,
                  letterSpacing: "-0.01em",
                }}>
                  {w.l}
                </p>
                <p style={{
                  fontFamily: "var(--font-syne), sans-serif", fontSize: "0.8125rem",
                  color: "#fff", lineHeight: 1.72,
                }}>
                  {w.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
