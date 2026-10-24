"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "@phosphor-icons/react";
import styles from "./case.module.css";
import { useScramble } from "./useScramble";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Caption that decodes left to right the first time it enters the viewport.
// Screen readers get the real text.
export function ScrambleCaption({ text }) {
  const ref = useRef(null);
  const [display, play] = useScramble(text);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      play();
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [play]);

  return (
    <figcaption ref={ref} className={styles.caption}>
      <span className={styles.srOnly}>{text}</span>
      <span aria-hidden="true">{display}</span>
    </figcaption>
  );
}

export function Figure({ src, alt = "", width, height, caption }) {
  return (
    <figure className={styles.figure}>
      <div className={styles.frame}>
        <img src={src} alt={alt} width={width} height={height} loading="lazy" />
      </div>
      {caption && <ScrambleCaption text={caption} />}
    </figure>
  );
}

// Autoplaying, looping, muted video with a click-to-pause overlay.
// Under reduced motion it starts paused.
export function VideoFigure({ src, poster, caption }) {
  const video = useRef(null);
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    video.current?.play().then(() => setPaused(false)).catch(() => setPaused(true));
  }, []);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) v.play().then(() => setPaused(false)).catch(() => {});
    else {
      v.pause();
      setPaused(true);
    }
  };

  return (
    <figure className={styles.figure}>
      <div className={styles.frame}>
        <video ref={video} src={src} poster={poster} loop muted playsInline
          controlsList="nodownload noplaybackrate" disablePictureInPicture />
        <button type="button" className={styles.videoToggle} data-paused={paused} onClick={toggle}
          aria-label={paused ? "Play video" : "Pause video"}>
          <span className={styles.videoIcon}>{paused ? <Play size={22} weight="fill" /> : <Pause size={22} weight="fill" />}</span>
        </button>
      </div>
      {caption && <ScrambleCaption text={caption} />}
    </figure>
  );
}
