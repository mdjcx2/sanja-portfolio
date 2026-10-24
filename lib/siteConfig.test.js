import { describe, it, expect } from "vitest";
import { existsSync } from "fs";
import { join } from "path";
import { siteConfig } from "../data/siteConfig.js";

describe("siteConfig", () => {
  it("cvUrl points at a file in public/", () => {
    if (siteConfig.cvUrl) expect(existsSync(join(process.cwd(), "public", siteConfig.cvUrl))).toBe(true);
  });
  it("photos on /about exist", () => {
    for (const p of siteConfig.away?.photos ?? []) expect(existsSync(join(process.cwd(), "public", p.src)), p.src).toBe(true);
  });
});
