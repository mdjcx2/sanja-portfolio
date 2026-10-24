"use client";

import { useEffect, useRef } from "react";

// tabindex="-1" fields (e.g. a honeypot) are left out of focus and the Tab loop.
const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// The frosted dialog shell shared by UnlockModal and ContactModal: takes focus
// (initialFocus selector, else the first control), keeps Tab inside, closes on
// Escape or a backdrop click, and hands focus back to whatever opened it.
export default function FrostDialog({ open, onClose, labelledBy, initialFocus, children }) {
  const boxRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    // Record the opener before moving focus into the dialog.
    const trigger = document.activeElement;
    const box = boxRef.current;
    (box?.querySelector(initialFocus || FOCUSABLE) ?? box?.querySelector(FOCUSABLE))?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key !== "Tab" || !boxRef.current) return;
      const items = [...boxRef.current.querySelectorAll(FOCUSABLE)].filter(el => el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      if (trigger instanceof HTMLElement) trigger.focus();
    };
  }, [open, onClose, initialFocus]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9900,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24, overflowY: "auto",
        background: "rgba(2,4,8,0.7)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        animation: "um-fade 0.25s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <style>{`
        @keyframes um-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes um-rise { from { opacity: 0; transform: translateY(12px) scale(0.98); } to { opacity: 1; transform: none; } }
        @media (prefers-reduced-motion: reduce) { .um-box, .um-box * { animation: none !important; } }
        .um-close:focus-visible { outline: 2px solid rgba(0,210,255,0.6); outline-offset: 2px; }
        .um-close:hover { color: #fff; border-color: rgba(255,255,255,0.25); }
      `}</style>
      <div
        ref={boxRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className="um-box pg-box"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          maxWidth: 440,
          margin: "auto",
          padding: "40px 36px 36px",
          background: "linear-gradient(rgba(255,255,255,0.06), rgba(255,255,255,0.06)), rgba(12,16,24,0.72)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.09)",
          borderRadius: 14,
          boxShadow: "0 24px 64px rgba(0,0,0,0.45)",
          animation: "um-rise 0.35s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="um-close"
          style={{
            position: "absolute", top: 14, right: 14, width: 36, height: 36,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "none", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8,
            color: "rgba(255,255,255,0.7)", cursor: "pointer",
            transition: "color 0.2s, border-color 0.2s",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <line x1="3" y1="3" x2="15" y2="15" /><line x1="15" y1="3" x2="3" y2="15" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}
