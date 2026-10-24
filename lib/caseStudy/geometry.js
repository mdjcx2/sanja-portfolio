const clamp01 = (n) => Math.min(1, Math.max(0, n));

// Which section the contents drawer should mark as current.
// sections: { id, top }[] in document order, top in px from the document top.
// At the very bottom of the page the last section wins, even when it's too
// short to ever reach the offset line.
export function activeSectionId(sections, scrollY, viewportH, docH, offset = 120) {
  if (sections.length === 0) return null;
  if (scrollY + viewportH >= docH - 2) return sections[sections.length - 1].id;

  let active = null;
  for (const section of sections) {
    if (section.top <= scrollY + offset) active = section.id;
    else break;
  }
  return active;
}

// How full a results-table ring gauge is, from 0 to 1.
// percent: value / 100 · ease: value / 7 (Single Ease Question) · time: faster is fuller.
export function gaugeFraction(value, kind, max) {
  if (kind === "percent") return clamp01(value / 100);
  if (kind === "ease") return clamp01(value / 7);
  if (kind === "time") return clamp01(1 - value / max);
  return 0;
}
