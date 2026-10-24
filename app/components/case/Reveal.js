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
      { threshold: 0.1 },
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
