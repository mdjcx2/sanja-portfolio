import { describe, it, expect } from "vitest";
import { existsSync } from "fs";
import { join } from "path";
import { publications } from "../data/publications.js";

const exists = (p) => existsSync(join(process.cwd(), "public", p));

describe.each(publications)("publication $id", (p) => {
  it("has a unique id", () => {
    expect(publications.filter((q) => q.id === p.id)).toHaveLength(1);
  });
  it("every image exists in public/ with size and alt text", () => {
    for (const img of [p.cover, ...p.spreads]) {
      expect(exists(img.src), img.src).toBe(true);
      expect(img.width && img.height, img.src).toBeTruthy();
      expect(img.alt, img.src).toBeTruthy();
    }
  });
});
