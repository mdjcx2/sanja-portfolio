"use client";

import { useBlobPreset } from "./BlobPresetContext";

export default function FrostOverlay() {
  const { overlayTheme } = useBlobPreset();
  if (!overlayTheme || overlayTheme === "none") return null;
  return (
    <div
      className={`dp-frost-halftone dp-dither-${overlayTheme}`}
      data-site-dither
      style={{
        position: "fixed", inset: 0,
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
}
