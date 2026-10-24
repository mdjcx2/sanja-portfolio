"use client";

import { useState } from "react";
import styles from "./case.module.css";
import { ScrambleCaption } from "./Figure";

// A screenshot with one clickable spot that cross-fades to a second state.
// base/altSrc: the two screenshots; description: alt text for the base one.
// spot: { left, top, size } in percent of the image width/height.
export default function HotspotImage({ base, altSrc, description, width, height, spot, label, caption }) {
  const [open, setOpen] = useState(false);

  return (
    <figure className={styles.figure}>
      <div className={styles.frame}>
        <img src={base} alt={description} width={width} height={height} loading="lazy" />
        <img src={altSrc} alt="" aria-hidden="true" width={width} height={height} loading="lazy"
          className={styles.hotspotAlt} data-open={open} />
        <button type="button" className={styles.hotspot} aria-label={label} aria-pressed={open}
          onClick={() => setOpen((o) => !o)}
          style={{ left: `${spot.left}%`, top: `${spot.top}%`, width: `${spot.size}%` }} />
      </div>
      {caption && <ScrambleCaption text={caption} />}
    </figure>
  );
}
