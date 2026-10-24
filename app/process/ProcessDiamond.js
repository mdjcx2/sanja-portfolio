"use client";

import { useState, useEffect, useRef } from "react";

const PHASE_COLORS = {
  discover: { light: "#B8955A", dark: "#C8A870" },
  define:   { light: "#B85C38", dark: "#C97050" },
  develop:  { light: "#3A8C8C", dark: "#4AACAC" },
  deliver:  { light: "#6B5EA8", dark: "#8B7EC8" },
};

const phases = [
  {
    id: "discover", label: "DISCOVER", sub: "insight into the problem",
    title: "Discover, exploring the problem space",
    desc: "Research, interviews, competitive analysis. AI compresses the time between raw data and first insight.",
    tools: ["Claude", "NotebookLM", "ChatGPT"],
    wf: [
      { l: "Interview synthesis", d: "8 user transcripts into Claude. Structured findings in 20 minutes instead of 2 days. Time saved on transcription is spent on interpretation." },
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
      { l: "Stakeholder summaries", d: "Discovery findings into a clear narrative for leadership. First draft in minutes." },
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
      { l: "Handoff rationale", d: "Turning design decisions into written reasoning for engineers. Why this pattern, why this spacing." },
      { l: "Realistic content", d: "Figma AI generates contextual placeholder content, real names, addresses, titles instead of lorem ipsum." },
    ],
  },
];

const labelX = [100, 260, 420, 580];
const ulX    = [48,  222, 372, 538];
const ulW    = [104, 76,  96,  84 ];

const fills = [
  "20,190 180,60 180,320",
  "180,60 340,190 180,320",
  "340,190 500,60 500,320",
  "500,60 660,190 500,320",
];

// Approximate lengths of each line segment
const D1_SIDE = 206; // diagonal sides of diamond 1
const D1_VERT = 260; // vertical span
const D2_SIDE = 206;
const D2_VERT = 260;

export default function ProcessDiamond({ animate = false }) {
  const [active,    setActive]    = useState(-1);
  const [drawn,     setDrawn]     = useState(!animate);
  const [step,      setStep]      = useState(0);
  const ref = useRef(null);

  function col(id) {
    return PHASE_COLORS[id].light;
  }

  function pick(i) {
    setActive(i === active ? -1 : i);
  }

  // Trigger animation when section enters viewport (once only)
  useEffect(() => {
    if (!animate || drawn) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        runAnimation();
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [animate, drawn]);

  function runAnimation() {
    const delays = [0, 200, 300, 500, 700, 900, 1000, 1200, 1400, 1600, 1800, 2000];
    delays.forEach((d, i) => {
      setTimeout(() => setStep(i + 1), d);
    });
    setTimeout(() => setDrawn(true), 2200);
  }

  // Line draw progress: step controls which lines are visible
  // step 0 = nothing, step 1+ = sequential lines appear
  const lineVisible = (index) => drawn || step > index;
  const dotVisible  = (index) => drawn || step > index;
  const labelVisible = (index) => drawn || step > (7 + index);

  const lineStyle = (visible) => ({
    transition: "stroke-dashoffset 0.5s cubic-bezier(0,0,0.2,1), stroke 0.2s",
    strokeDashoffset: visible ? 0 : 300,
  });

  return (
    <div ref={ref}>
      <p className="process-hint" style={{ opacity: drawn || step > 0 ? 1 : 0, transition: "opacity 0.4s" }}>
        Click a phase to explore how AI fits in
      </p>

      <svg width="100%" viewBox="0 0 680 370" className="process-svg" role="img" aria-label="Double diamond design process">

        {/* Phase labels */}
        {phases.map((ph, i) => (
          <g key={ph.id} onClick={() => pick(i)} style={{ cursor: "pointer", opacity: labelVisible(i) ? 1 : 0, transition: "opacity 0.4s" }}>
            <clipPath id={"ul-clip-" + i}>
              <rect x={ulX[i]} y={34} height={3} width={active === i ? ulW[i] : 0} style={{ transition: "width 0.3s cubic-bezier(0.4,0,0.2,1)" }} />
            </clipPath>
            <rect x={ulX[i]} y={35} width={ulW[i]} height={1.5} fill={col(ph.id)} clipPath={"url(#ul-clip-" + i + ")"} />
            <text x={labelX[i]} y={20} textAnchor="middle" fontSize={10} fontWeight={600} letterSpacing=".1em" fill={active === i ? col(ph.id) : "var(--text)"} fontFamily="inherit" style={{ transition: "fill 0.25s cubic-bezier(0.4,0,0.2,1)" }}>{ph.label}</text>
            <text x={labelX[i]} y={33} textAnchor="middle" fontSize={10} fill={active === i ? col(ph.id) : "var(--text-muted)"} fontFamily="inherit" style={{ transition: "fill 0.25s cubic-bezier(0.4,0,0.2,1)" }}>{ph.sub}</text>
          </g>
        ))}

        {/* Side labels */}
        <text fontSize={9} fontWeight={600} letterSpacing=".12em" fill="var(--text-subtle)" fontFamily="inherit" textAnchor="middle" transform="translate(10,190) rotate(-90)">PROBLEM</text>
        <text fontSize={9} fontWeight={600} letterSpacing=".12em" fill="var(--text-subtle)" fontFamily="inherit" textAnchor="middle" transform="translate(670,190) rotate(90)">SOLUTION</text>

        {/* Centre labels */}
        <text fontSize={8} fontWeight={600} letterSpacing=".09em" fill="var(--text-subtle)" fontFamily="inherit" textAnchor="middle" transform="translate(340,120) rotate(-90)">PROBLEM DEFINITION</text>
        <text fontSize={8} fontWeight={600} letterSpacing=".09em" fill="var(--text-subtle)" fontFamily="inherit" textAnchor="middle" transform="translate(340,272) rotate(-90)">DESIGN BRIEF</text>

        {/* Dashed dividers */}
        {[180, 340, 500].map(x => (
          <line key={x} x1={x} y1={46} x2={x} y2={334} stroke="var(--border)" strokeWidth={1} strokeDasharray="5 4" />
        ))}

        {/* Diamond 1, Discover half (3 lines, drawn sequentially) */}
        <line x1="20"  y1="190" x2="180" y2="60"  stroke={active === 0 ? col("discover") : "var(--border-dark)"} strokeWidth={1} strokeDasharray={D1_SIDE} style={lineStyle(lineVisible(0))} />
        <line x1="180" y1="60"  x2="180" y2="320" stroke={active === 0 ? col("discover") : "var(--border-dark)"} strokeWidth={1} strokeDasharray={D1_VERT} style={lineStyle(lineVisible(1))} />
        <line x1="180" y1="320" x2="20"  y2="190" stroke={active === 0 ? col("discover") : "var(--border-dark)"} strokeWidth={1} strokeDasharray={D1_SIDE} style={lineStyle(lineVisible(2))} />

        {/* Diamond 1, Define half */}
        <line x1="180" y1="60"  x2="340" y2="190" stroke={active === 1 ? col("define") : "var(--border-dark)"} strokeWidth={1} strokeDasharray={D1_SIDE} style={lineStyle(lineVisible(3))} />
        <line x1="340" y1="190" x2="180" y2="320" stroke={active === 1 ? col("define") : "var(--border-dark)"} strokeWidth={1} strokeDasharray={D1_SIDE} style={lineStyle(lineVisible(4))} />

        {/* Diamond 2, Develop half */}
        <line x1="340" y1="190" x2="500" y2="60"  stroke={active === 2 ? col("develop") : "var(--border-dark)"} strokeWidth={1} strokeDasharray={D2_SIDE} style={lineStyle(lineVisible(5))} />
        <line x1="500" y1="60"  x2="500" y2="320" stroke={active === 2 ? col("develop") : "var(--border-dark)"} strokeWidth={1} strokeDasharray={D2_VERT} style={lineStyle(lineVisible(6))} />
        <line x1="500" y1="320" x2="340" y2="190" stroke={active === 2 ? col("develop") : "var(--border-dark)"} strokeWidth={1} strokeDasharray={D2_SIDE} style={lineStyle(lineVisible(7))} />

        {/* Diamond 2, Deliver half */}
        <line x1="500" y1="60"  x2="660" y2="190" stroke={active === 3 ? col("deliver") : "var(--border-dark)"} strokeWidth={1} strokeDasharray={D2_SIDE} style={lineStyle(lineVisible(8))} />
        <line x1="660" y1="190" x2="500" y2="320" stroke={active === 3 ? col("deliver") : "var(--border-dark)"} strokeWidth={1} strokeDasharray={D2_SIDE} style={lineStyle(lineVisible(9))} />

        {/* Clickable half-fills */}
        {phases.map((ph, i) => (
          <polygon key={ph.id} points={fills[i]} fill={col(ph.id)} fillOpacity={active === i ? 0.12 : 0} stroke="none" onClick={() => pick(i)} style={{ cursor: "pointer", transition: "fill-opacity 0.2s" }} />
        ))}

        {/* Endpoint dots */}
        <circle cx={20}  cy={190} r={6} fill={active === 0 ? col("discover") : "var(--text-muted)"} style={{ opacity: dotVisible(0) ? 1 : 0, transition: "opacity 0.3s, fill 0.2s" }} />
        <circle cx={340} cy={190} r={6} fill={active === 1 ? col("define") : active === 2 ? col("develop") : "var(--text-muted)"} style={{ opacity: dotVisible(5) ? 1 : 0, transition: "opacity 0.3s, fill 0.2s" }} />
        <circle cx={660} cy={190} r={6} fill={active === 3 ? col("deliver") : "var(--text-muted)"} style={{ opacity: dotVisible(9) ? 1 : 0, transition: "opacity 0.3s, fill 0.2s" }} />

      </svg>

      {/* Detail panel */}
      {active >= 0 && (
        <div className="process-detail">
          <div>
            <h2 className="process-detail-title" style={{ color: col(phases[active].id) }}>{phases[active].title}</h2>
            <p className="process-detail-desc">{phases[active].desc}</p>
            <div className="process-tools">
              {phases[active].tools.map(t => (
                <span key={t} className="process-tool" style={{ borderColor: col(phases[active].id) + "44" }}>{t}</span>
              ))}
            </div>
          </div>
          <div className="process-workflows">
            {phases[active].wf.map((w, i) => (
              <div key={i} className="process-workflow-item">
                <p className="process-workflow-label">{w.l}</p>
                <p className="process-workflow-detail">{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
