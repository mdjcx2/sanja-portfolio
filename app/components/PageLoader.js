"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "../../data/siteConfig.js";
import Logo from "./Logo";

const EXCLUDED = ["/", "/dark"];

export default function PageLoader() {
  const pathname  = usePathname();
  const [visible, setVisible] = useState(false);
  const [fading,  setFading]  = useState(false);
  const prevPath  = useRef(null);

  useEffect(() => {
    if (EXCLUDED.includes(pathname)) {
      prevPath.current = pathname;
      return;
    }

    // Don't show on the very first render of a page we're already on
    if (prevPath.current === null) {
      prevPath.current = pathname;
      return;
    }

    // Only show when pathname actually changes (navigation)
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;

    setFading(false);
    setVisible(true);

    const t1 = setTimeout(() => setFading(true),  900);
    const t2 = setTimeout(() => setVisible(false), 1400);

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [pathname]);

  if (!visible) return null;

  return (
    <div style={{
      position:   "fixed", inset: 0, zIndex: 9999,
      background: "#020408",
      display:    "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 18,
      opacity:    fading ? 0 : 1,
      transition: "opacity 0.5s cubic-bezier(0.4,0,0.2,1)",
      pointerEvents: fading ? "none" : "all",
    }}>
      <style>{`
        @keyframes pl-shimmer {
          from { background-position: -200% center; }
          to   { background-position:  200% center; }
        }
        .pl-title {
          background: linear-gradient(90deg,
            rgba(255,255,255,0.25) 20%,
            rgba(255,255,255,0.95) 50%,
            rgba(255,255,255,0.25) 80%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: pl-shimmer 2s linear infinite;
        }
        .pl-label {
          background: linear-gradient(90deg,
            rgba(0,210,255,0.15) 20%,
            rgba(0,210,255,0.7)  50%,
            rgba(0,210,255,0.15) 80%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: pl-shimmer 2s linear infinite;
          animation-delay: 0.3s;
        }
      `}</style>

      <span className="pl-title" style={{
        fontFamily: "var(--font-syne), sans-serif",
        fontSize: "1.15rem", fontWeight: 500, letterSpacing: "-0.01em",
      }}>
        <Logo size={40} title={siteConfig.name} style={{ color: "rgba(255,255,255,0.92)" }} />
      </span>
      <span className="pl-label" style={{
        fontFamily: "var(--font-syne), sans-serif", fontSize: "0.4375rem",
        letterSpacing: "0.22em", textTransform: "uppercase",
      }}>
        Loading
      </span>
    </div>
  );
}
