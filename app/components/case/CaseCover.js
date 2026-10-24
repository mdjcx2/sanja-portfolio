"use client";

import { useEffect, useRef } from "react";
import styles from "./case.module.css";

// Full-bleed cover with a slow parallax. Skipped under reduced motion.
// position: CSS object-position for the crop (default "center 30%").
// belowNav: start the image under the nav bar instead of behind it, and on
// phones show it whole rather than cropped (for product shots, not photos).
export default function CaseCover({ src, alt = "", width, height, position, belowNav = false }) {
  const img = useRef(null);

  useEffect(() => {
    // Product shots stay still: scaling would eat into their cropped margins
    if (belowNav || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      if (img.current) img.current.style.transform = `translateY(${window.scrollY * 0.3}px) scale(1.1)`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [belowNav]);

  return (
    <div className={styles.cover} data-case-cover data-below-nav={belowNav}>
      <img ref={img} src={src} alt={alt} width={width} height={height} className={styles.coverImg}
        style={position ? { objectPosition: position } : undefined} />
    </div>
  );
}
