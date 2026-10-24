"use client";

import Link from "next/link";
import styles from "./nav.module.css";
import { useScramble } from "./useScramble";

// A text link whose letters scramble on hover and focus (the site nav and
// footer). Internal paths use Next's Link; external ones open a new tab;
// anything else (mailto:, #top) is a plain <a>.
export default function ScrambleLink({ label, href, external, current, className, onClick }) {
  const [display, play] = useScramble(label);
  const props = {
    className,
    onClick,
    onMouseEnter: play,
    onFocus: play,
    "aria-current": current ? "page" : undefined,
  };
  const content = (
    <>
      <span className={styles.srOnly}>{label}</span>
      {/* The hidden real word holds the width, so the scramble can't jitter the row */}
      <span aria-hidden="true" className={styles.scramble}>
        <span className={styles.scrambleHold}>{label}</span>
        <span>{display}</span>
      </span>
    </>
  );
  if (external) return <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{content}</a>;
  if (href.startsWith("/")) return <Link href={href} {...props}>{content}</Link>;
  return <a href={href} {...props}>{content}</a>;
}
