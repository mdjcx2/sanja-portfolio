"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./case.module.css";

// Fades and rises its children in the first time they scroll into view.
// `delay` (seconds) staggers siblings. Reduced motion is handled in CSS.
export default function Reveal({ children, delay = 0, as: Tag = "div", className = "" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      // Fire once the top edge is 10% up the viewport. A ratio threshold would
      // never fire for blocks much taller than the screen (e.g. a long gallery).
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`${styles.reveal} ${className}`} data-shown={shown} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </Tag>
  );
}
