"use client";

import { useEffect } from "react";
import { useScramble } from "./case/useScramble";

const VISUALLY_HIDDEN = { position: "absolute", width: 1, height: 1, margin: -1, padding: 0, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap", border: 0 };

// The nav links' scramble (same speed), played once on a big title when
// `start` turns true (e.g. as the hero fades in). Each word keeps
// its real width (hidden copy sets it, scramble laid over), so nothing jumps; words can
// still wrap. Screen readers get the plain text.
export default function ScrambleTitle({ text, start = true }) {
  const [display, play] = useScramble(text);

  useEffect(() => { if (start) play(); }, [start, play]);

  const shown = display.split(" ");
  return (
    <>
      <span style={VISUALLY_HIDDEN}>{text}</span>
      <span aria-hidden="true">
        {text.split(" ").map((word, i) => (
          <span key={i}>
            {i > 0 && " "}
            <span style={{ position: "relative", display: "inline-block", whiteSpace: "nowrap" }}>
              <span style={{ visibility: "hidden" }}>{word}</span>
              <span style={{ position: "absolute", top: 0, left: 0 }}>{shown[i]}</span>
            </span>
          </span>
        ))}
      </span>
    </>
  );
}
