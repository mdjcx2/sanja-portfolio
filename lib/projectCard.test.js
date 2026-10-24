import { describe, it, expect } from "vitest";
import { cardProps } from "./projectCard.js";

describe("cardProps", () => {
  it("picks only the card fields, preferring home copy", () => {
    const p = { slug: "x", title: "Long title", homeTitle: "X", client: "C", year: "2024", summary: "full", homeSummary: "short", sections: [{ content: "NDA" }] };
    expect(cardProps(p)).toEqual({ slug: "x", href: "/work/x", title: "X", client: "C", year: "2024", summary: "short", outcome: null, coverImage: null, coverGradient: null });
  });
  it("uses an explicit href, then the project's own", () => {
    expect(cardProps({ slug: "x", href: "/a" }, "/b").href).toBe("/b");
    expect(cardProps({ slug: "x", href: "/a" }).href).toBe("/a");
  });
});
