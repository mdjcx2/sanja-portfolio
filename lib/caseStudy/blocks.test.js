import { describe, it, expect } from "vitest";
import { BLOCK_TYPES, normalizeSection, mediaSources, validateCaseStudy } from "./blocks.js";

const ok = () => true;
const cs = (sections, extra = {}) => ({ slug: "x", title: "X", sections, ...extra });

describe("normalizeSection", () => {
  it("wraps legacy content in a text block", () => {
    expect(normalizeSection({ id: "overview", label: "Overview", content: "Hi" }).blocks)
      .toEqual([{ type: "text", body: "Hi" }]);
  });
  it("adds a figure for legacy hasImage sections", () => {
    const s = normalizeSection({ id: "a", label: "A", content: "c", hasImage: true, imageCaption: "Cap", images: ["/images/a.png"] });
    expect(s.blocks[1]).toEqual({ type: "figure", src: "/images/a.png", caption: "Cap" });
  });
  it("keeps blocks and defaults title to label", () => {
    const s = normalizeSection({ id: "a", label: "A", blocks: [{ type: "text", body: "b" }] });
    expect(s.title).toBe("A");
    expect(s.blocks).toHaveLength(1);
  });
});

describe("mediaSources", () => {
  it("collects src, poster, base, alt and item srcs", () => {
    expect(mediaSources({ type: "hotspot", base: "/b.png", altSrc: "/a.png" })).toEqual(["/b.png", "/a.png"]);
    expect(mediaSources({ type: "video", src: "/v.mp4", poster: "/p.png" })).toEqual(["/v.mp4", "/p.png"]);
    expect(mediaSources({ type: "chips", items: [{ src: "/1.png" }, { src: "/2.png" }] })).toEqual(["/1.png", "/2.png"]);
  });
});

describe("validateCaseStudy", () => {
  it("accepts a valid case study", () => {
    expect(validateCaseStudy(cs([{ id: "a", label: "A", blocks: [{ type: "text", body: "x" }] }]), { fileExists: ok })).toEqual([]);
  });
  it("rejects duplicate section ids", () => {
    const errs = validateCaseStudy(cs([{ id: "a", label: "A", blocks: [] }, { id: "a", label: "B", blocks: [] }]), { fileExists: ok });
    expect(errs).toContain('duplicate section id "a"');
  });
  it("rejects unknown block types", () => {
    const errs = validateCaseStudy(cs([{ id: "a", label: "A", blocks: [{ type: "carousel" }] }]), { fileExists: ok });
    expect(errs).toContain('section "a": unknown block type "carousel"');
  });
  it("names missing media files", () => {
    const errs = validateCaseStudy(cs([{ id: "a", label: "A", blocks: [{ type: "figure", src: "/images/nope.png", caption: "c", width: 10, height: 10 }] }]), { fileExists: () => false });
    expect(errs).toContain('section "a": missing file /images/nope.png');
  });
  it("requires a caption on figures and videos", () => {
    const errs = validateCaseStudy(cs([{ id: "a", label: "A", blocks: [{ type: "figure", src: "/x.png" }] }]), { fileExists: ok });
    expect(errs).toContain('section "a": figure needs a caption');
  });
  it("requires exactly one chosen item in a compare block", () => {
    const errs = validateCaseStudy(cs([{ id: "a", label: "A", blocks: [{ type: "compare", items: [{ src: "/1.png", label: "1" }, { src: "/2.png", label: "2" }] }] }]), { fileExists: ok });
    expect(errs).toContain('section "a": compare needs exactly one chosen item');
  });
  it("requires width, height and alt on every gallery image", () => {
    const errs = validateCaseStudy(cs([{ id: "a", label: "A", blocks: [
      { type: "gallery", items: [{ src: "/1.jpg", width: 10, height: 10, alt: "One" }, { src: "/2.jpg" }] },
    ] }]), { fileExists: ok });
    expect(errs).toEqual(['section "a": /2.jpg needs width and height', 'section "a": gallery image /2.jpg needs alt text']);
  });
  it("only accepts grid or stack as a gallery layout", () => {
    const errs = validateCaseStudy(cs([{ id: "a", label: "A", blocks: [
      { type: "gallery", layout: "masonry", items: [] },
    ] }]), { fileExists: ok });
    expect(errs).toEqual(['section "a": gallery layout "masonry" must be "grid" or "stack"']);
  });
  it("requires a description on hotspots (alt text for the screenshot)", () => {
    const errs = validateCaseStudy(cs([{ id: "a", label: "A", blocks: [{ type: "hotspot", base: "/b.png", altSrc: "/a.png", width: 10, height: 10, spot: {}, label: "l", caption: "c" }] }]), { fileExists: ok });
    expect(errs).toContain('section "a": hotspot needs a description');
  });
  it("requires width and height on images so they don't shift the layout", () => {
    const errs = validateCaseStudy(cs([{ id: "a", label: "A", blocks: [
      { type: "figure", src: "/x.png", caption: "c" },
      { type: "chips", items: [{ src: "/1.png", label: "1", caption: "c", width: 10, height: 10 }, { src: "/2.png", label: "2", caption: "c" }] },
    ] }]), { fileExists: ok });
    expect(errs).toContain('section "a": /x.png needs width and height');
    expect(errs).toContain('section "a": /2.png needs width and height');
    expect(errs).not.toContain('section "a": /1.png needs width and height');
  });
  it("exports every block type the template renders", () => {
    expect(BLOCK_TYPES).toHaveLength(13);
  });
});
