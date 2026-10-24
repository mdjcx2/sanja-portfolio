import { describe, it, expect } from "vitest";
import { SCRAMBLE_CHARS, scrambleFrame, scrambleFrames } from "./scramble.js";

const pickFirst = () => 0; // always SCRAMBLE_CHARS[0]

describe("scrambleFrame", () => {
  it("locks in one more real letter every 2 frames, left to right", () => {
    expect(scrambleFrame("Work", 0, pickFirst)).toBe("AAAA");
    expect(scrambleFrame("Work", 2, pickFirst)).toBe("WAAA");
    expect(scrambleFrame("Work", 5, pickFirst)).toBe("WoAA");
  });
  it("keeps spaces as spaces so words don't jump", () => {
    expect(scrambleFrame("Design system", 0, pickFirst)).toBe("AAAAAA AAAAAA");
  });
  it("returns the real text once every letter is revealed", () => {
    expect(scrambleFrame("Work", scrambleFrames("Work"), pickFirst)).toBe("Work");
  });
  it("uses only the scramble character set for unrevealed letters", () => {
    const out = scrambleFrame("Contact", 0);
    for (const ch of out) expect(SCRAMBLE_CHARS).toContain(ch);
  });
});

describe("scrambleFrames", () => {
  it("is 2 frames per letter (Contact: 14 frames, about 280ms at 20ms a frame)", () => {
    expect(scrambleFrames("Contact")).toBe(14);
  });
});
