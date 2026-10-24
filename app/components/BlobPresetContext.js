"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

const LS_KEY = "dvc-blob-preset";

// ── Presets ──────────────────────────────────────────────────────────────────
// `accent` is optional if set, it overrides colorB for the nav/UI accent color.
// The original site had a dark/invisible blob but cyan nav accent, so "Dark"
// stores the original blob colors and the original cyan in `accent`.
export const BLOB_PRESETS = [
  // Sanja's site look: a Wraith-shaped blob in hot pink/magenta, sepia overlay.
  // No `accent`, so the nav/UI accent follows colorB (pink).
  { name: "Sanja",   freq: 0.7,  amp: 0.26, speed: 0.07, fresnel: 8.0,
    colorA: [0.01, 0.01, 0.03], colorB: [1.00, 0.00, 0.584], colorC: [1.00, 0.00, 0.816] },
  { name: "Dark",    freq: 10.0, amp: 0.07, speed: 0.08, fresnel: 6.0,
    colorA: [0.00, 0.00, 0.00], colorB: [0.00, 0.00, 0.00], colorC: [0.16, 0.16, 0.16],
    accent: [0.00, 0.824, 1.00] }, // original cyan nav accent
  { name: "Crystal", freq: 5.0,  amp: 0.11, speed: 0.05, fresnel: 1.6,
    colorA: [0.00, 0.04, 0.14], colorB: [0.75, 0.92, 1.00], colorC: [0.50, 0.78, 1.00] },
  { name: "Amoeba",  freq: 1.0,  amp: 0.50, speed: 0.15, fresnel: 3.5,
    colorA: [0.00, 0.02, 0.12], colorB: [0.00, 0.82, 1.00], colorC: [0.00, 1.00, 0.60] },
  { name: "Pulsar",  freq: 1.5,  amp: 0.88, speed: 0.52, fresnel: 4.8,
    colorA: [0.12, 0.00, 0.08], colorB: [1.00, 0.08, 0.55], colorC: [1.00, 0.42, 0.00] },
  { name: "Storm",   freq: 3.2,  amp: 0.72, speed: 0.38, fresnel: 3.0,
    colorA: [0.08, 0.03, 0.00], colorB: [1.00, 0.62, 0.00], colorC: [1.00, 0.22, 0.00] },
  { name: "Wraith",  freq: 0.7,  amp: 0.26, speed: 0.07, fresnel: 8.0,
    colorA: [0.01, 0.01, 0.03], colorB: [1.00, 1.00, 1.00], colorC: [0.68, 0.88, 1.00] },
];

export const DEFAULT_PRESET = BLOB_PRESETS[0]; // Sanja
export const DEFAULT_OVERLAY = "sepia";

// ── Accent helpers ────────────────────────────────────────────────────────────
// Uses preset.accent if present (decoupled from blob color), otherwise colorB.
export function applyAccent(preset) {
  try {
    const [r, g, b] = preset.accent ?? preset.colorB;
    const root = document.documentElement;
    root.style.setProperty("--blob-r", String(Math.round(r * 255)));
    root.style.setProperty("--blob-g", String(Math.round(g * 255)));
    root.style.setProperty("--blob-b", String(Math.round(b * 255)));
  } catch {}
}

// ── Context ───────────────────────────────────────────────────────────────────
const BlobPresetContext = createContext({
  preset: DEFAULT_PRESET,
  setPreset: () => {},
  overlayTheme: "reference",
  setOverlayTheme: () => {},
});

export function BlobPresetProvider({ children }) {
  const [preset, setPresetState] = useState(DEFAULT_PRESET);
  const [overlayTheme, setOverlayState] = useState(DEFAULT_OVERLAY);

  // Saved shape: { name, custom?: <full preset when name is "Custom">, overlay? }.
  // Older saves hold only { name }.
  const save = (patch) => {
    try {
      const prev = JSON.parse(localStorage.getItem(LS_KEY) || "{}");
      localStorage.setItem(LS_KEY, JSON.stringify({ ...prev, ...patch }));
    } catch {}
  };

  // Hydrate from localStorage after mount
  useEffect(() => {
    let next = DEFAULT_PRESET;
    try {
      const stored = JSON.parse(localStorage.getItem(LS_KEY) || "null");
      if (stored) {
        const found = BLOB_PRESETS.find(p => p.name === stored.name);
        if (found) next = found;
        else if (stored.name === "Custom" && stored.custom) next = { ...DEFAULT_PRESET, ...stored.custom, name: "Custom" };
        if (typeof stored.overlay === "string") setOverlayState(stored.overlay);
      }
    } catch {}
    setPresetState(next);
    applyAccent(next);
  }, []);

  const setPreset = useCallback((p) => {
    setPresetState(p);
    applyAccent(p);
    save(p.name === "Custom" ? { name: "Custom", custom: p } : { name: p.name, custom: undefined });
  }, []);

  const setOverlayTheme = useCallback((id) => {
    setOverlayState(id);
    save({ overlay: id });
  }, []);

  return (
    <BlobPresetContext.Provider value={{ preset, setPreset, overlayTheme, setOverlayTheme }}>
      {children}
    </BlobPresetContext.Provider>
  );
}

export const useBlobPreset = () => useContext(BlobPresetContext);
