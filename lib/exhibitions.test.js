import { describe, it, expect } from "vitest";
import { existsSync } from "fs";
import { join } from "path";
import { exhibitions, exhibitionBySlug } from "../data/exhibitions/index.js";
import { validateCaseStudy } from "./caseStudy/blocks.js";

const fileExists = (p) => existsSync(join(process.cwd(), "public", p));

describe.each(exhibitions)("exhibition $slug", (e) => {
  it("is a valid case study and every photo exists in public/", () => {
    expect(validateCaseStudy(e, { fileExists })).toEqual([]);
  });
  it("links to its own page and has a card cover", () => {
    expect(e.href).toBe(`/exhibitions/${e.slug}`);
    expect(fileExists(e.card.coverImage), e.card.coverImage).toBe(true);
  });
  it("explore links point at other exhibitions", () => {
    for (const slug of e.explore) {
      expect(exhibitionBySlug[slug], slug).toBeDefined();
      expect(slug).not.toBe(e.slug);
    }
  });
});
