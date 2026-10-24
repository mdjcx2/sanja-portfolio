"use client";

import { useState, useEffect, useRef } from "react";
import Button from "./Button";

export default function ConstructionModal() {
  const [visible, setVisible] = useState(false);
  const btnRef  = useRef(null);
  const prevFocus = useRef(null);

  useEffect(() => {
    if (!localStorage.getItem("wip-v1")) {
      localStorage.setItem("wip-v1", "1");
      prevFocus.current = document.activeElement;
      setVisible(true);
    }
  }, []);

  // Move focus to button when modal opens
  useEffect(() => {
    if (visible) btnRef.current?.focus();
  }, [visible]);

  // Escape key dismissal
  useEffect(() => {
    if (!visible) return;
    const onKey = e => { if (e.key === "Escape") dismiss(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [visible]);

  // Trap focus inside the modal
  const trapFocus = e => {
    if (e.key !== "Tab") return;
    // Only one focusable element keep focus on it
    e.preventDefault();
    btnRef.current?.focus();
  };

  const dismiss = () => {
    setVisible(false);
    prevFocus.current?.focus();
  };

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      onClick={dismiss}
      style={{
        position: "fixed", inset: 0, zIndex: 9000,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(2,4,8,0.72)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        padding: "24px",
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="wip-title"
        aria-describedby="wip-desc"
        onClick={e => e.stopPropagation()}
        onKeyDown={trapFocus}
        style={{
          background: "rgba(10,14,20,0.96)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 10,
          padding: "40px 44px 36px",
          maxWidth: 420,
          width: "100%",
          boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
        }}
      >
        <p id="wip-title" style={{
          fontFamily: "var(--font-syne), sans-serif",
          fontSize: "0.5625rem", letterSpacing: "0.16em",
          textTransform: "uppercase", color: "rgba(0,210,255,0.55)",
          margin: "0 0 14px",
        }}>
          Work in progress
        </p>
        <p id="wip-desc" style={{
          fontFamily: "var(--font-syne), sans-serif",
          fontSize: "0.9375rem", color: "#fff",
          lineHeight: 1.65, margin: "0 0 16px",
          letterSpacing: "-0.01em",
        }}>
          This portfolio is actively being updated. You may encounter rough edges or missing content.
        </p>
        <p style={{
          fontFamily: "var(--font-syne), sans-serif",
          fontSize: "0.75rem", color: "#fff",
          lineHeight: 1.6, margin: "0 0 32px",
          letterSpacing: "0.01em",
        }}>
          Also this is not a WordPress template. Every line is hand-coded from scratch.
        </p>
        <Button
          ref={btnRef}
          onClick={dismiss}
          variant="secondary"
          size="sm"
        >
          Got it
        </Button>
      </div>
    </div>
  );
}
