import { describe, it, expect } from "vitest";
import { activeSectionId, gaugeFraction } from "./geometry.js";

const secs = [{ id: "a", top: 0 }, { id: "b", top: 1000 }, { id: "c", top: 2000 }];

describe("activeSectionId", () => {
  it("picks the section under the offset line", () => {
    expect(activeSectionId(secs, 950, 800, 3000)).toBe("b");
  });
  it("returns null before the first section", () => {
    expect(activeSectionId([{ id: "a", top: 500 }], 0, 800, 3000)).toBe(null);
  });
  it("marks the last section active at the bottom even when it is short", () => {
    expect(activeSectionId(secs, 2200, 800, 3000)).toBe("c");
    expect(activeSectionId([...secs.slice(0, 2), { id: "c", top: 2900 }], 2200, 800, 3000)).toBe("c");
  });
});

describe("gaugeFraction", () => {
  it("maps each kind", () => {
    expect(gaugeFraction(67, "percent")).toBeCloseTo(0.67);
    expect(gaugeFraction(6.3, "ease")).toBeCloseTo(0.9);
    expect(gaugeFraction(5, "time", 25)).toBeCloseTo(0.8);
  });
  it("clamps out-of-range values", () => {
    expect(gaugeFraction(140, "percent")).toBe(1);
    expect(gaugeFraction(9, "ease")).toBe(1);
    expect(gaugeFraction(40, "time", 25)).toBe(0);
  });
});
