import { describe, it, expect } from "vitest";
import { existsSync } from "fs";
import { join } from "path";
import { caseStudies } from "../../data/caseStudies/index.js";
import { validateCaseStudy } from "./blocks.js";
import { projects } from "../../data/projects.js";

const fileExists = (p) => existsSync(join(process.cwd(), "public", p));

describe.each(Object.values(caseStudies))("case study $slug", (cs) => {
  it("is valid and every media file exists in public/", () => {
    expect(validateCaseStudy(cs, { fileExists })).toEqual([]);
  });
  it("has a project card", () => {
    expect(projects.some((p) => p.slug === cs.slug)).toBe(true);
  });
  it("explore links point at real projects", () => {
    for (const slug of cs.explore ?? []) expect(projects.some((p) => p.slug === slug), slug).toBe(true);
  });
});

describe("projects", () => {
  it("every card opens a case study", () => {
    for (const p of projects) expect(caseStudies[p.slug], p.slug).toBeDefined();
  });
});
