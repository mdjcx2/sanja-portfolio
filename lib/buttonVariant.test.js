import { describe, it, expect } from "vitest";
import { BUTTON_VARIANTS, resolveVariant } from "./buttonVariant.js";

describe("resolveVariant", () => {
  it("keeps the five sheet styles and link as they are", () => {
    for (const v of ["filled", "raised", "outline", "tonal", "ghost", "link"]) expect(resolveVariant(v)).toBe(v);
  });
  it("maps the old variant names onto the sheet", () => {
    expect(resolveVariant("primary")).toBe("filled");
    expect(resolveVariant("secondary")).toBe("outline");
    expect(resolveVariant("light")).toBe("raised");
    expect(resolveVariant("ghost-light")).toBe("tonal");
  });
  it("falls back to outline for anything unknown", () => {
    expect(resolveVariant("fancy")).toBe("outline");
    expect(resolveVariant(undefined)).toBe("outline");
  });
  it("lists the sheet's five styles in order", () => {
    expect(BUTTON_VARIANTS).toEqual(["filled", "raised", "outline", "tonal", "ghost"]);
  });
});
