"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FRAMES_PER_LETTER, SCRAMBLE_FRAME_MS, scrambleFrame, scrambleFrames } from "../../../lib/caseStudy/scramble.js";

// Returns [display, play]. Call play() to run the scramble once; it's a no-op
// under reduced motion. Render `display` aria-hidden and keep the real text
// for screen readers. Options slow it down: frameMs per frame, perLetter
// frames before each letter locks in (defaults: the nav's quick hover).
export function useScramble(text, { frameMs = SCRAMBLE_FRAME_MS, perLetter = FRAMES_PER_LETTER } = {}) {
  const [display, setDisplay] = useState(text);
  const raf = useRef(0);

  // Driven by requestAnimationFrame, not setInterval: timer ids are shared
  // with setTimeout, so a stale clearTimeout elsewhere could kill an interval.
  const play = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    cancelAnimationFrame(raf.current);
    const last = scrambleFrames(text, perLetter);
    const start = performance.now();
    let shown = -1;
    const tick = (now) => {
      const frame = Math.min(Math.floor((now - start) / frameMs), last);
      // New characters once per frameMs, not on every animation frame
      if (frame !== shown) { shown = frame; setDisplay(scrambleFrame(text, frame, Math.random, perLetter)); }
      if (frame < last) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }, [text, frameMs, perLetter]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);
  useEffect(() => setDisplay(text), [text]);

  return [display, play];
}
