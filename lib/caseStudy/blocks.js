// Case study content model: sections made of typed blocks.
// See docs/superpowers/specs/2026-10-23-case-study-template.md.

export const BLOCK_TYPES = Object.freeze([
  "text",
  "list",
  "figure",
  "video",
  "cards",
  "process",
  "compare",
  "results",
  "hotspot",
  "chips",
  "shortcuts",
  "metrics",
]);

const CAPTIONED = new Set(["figure", "video"]);

// Images (not videos) must carry width and height so they reserve their
// space before loading; otherwise the layout shifts and in-page jumps land short.
function imagesNeedingSize(block) {
  if (block.type === "figure" || block.type === "hotspot") return [{ src: block.src ?? block.base, ...block }];
  if (block.type === "compare" || block.type === "chips") return block.items ?? [];
  return [];
}

// Legacy sections ({ id, label, content, hasImage, imageCaption, images })
// become a text block plus an optional figure, so old case studies still render.
export function normalizeSection(section) {
  const { id, label, title = label } = section;
  if (Array.isArray(section.blocks)) return { id, label, title, blocks: section.blocks };

  const blocks = [];
  if (section.content) blocks.push({ type: "text", body: section.content });
  const image = section.images?.[0];
  if (section.hasImage && image) blocks.push({ type: "figure", src: image, caption: section.imageCaption });
  return { id, label, title, blocks };
}

export function mediaSources(block) {
  const own = [block.src, block.poster, block.base, block.altSrc];
  const items = (block.items ?? []).map((item) => item.src);
  return [...own, ...items].filter((src) => typeof src === "string" && src.startsWith("/"));
}

// Returns a list of human-readable problems; [] means the case study is valid.
// fileExists(publicPath) is injected so tests don't touch the disk.
export function validateCaseStudy(cs, { fileExists }) {
  const errors = [];
  const seen = new Set();

  for (const raw of cs.sections ?? []) {
    const section = normalizeSection(raw);
    if (seen.has(section.id)) errors.push(`duplicate section id "${section.id}"`);
    seen.add(section.id);

    for (const block of section.blocks) {
      const where = `section "${section.id}"`;
      if (!BLOCK_TYPES.includes(block.type)) {
        errors.push(`${where}: unknown block type "${block.type}"`);
        continue;
      }
      if (CAPTIONED.has(block.type) && !block.caption) errors.push(`${where}: ${block.type} needs a caption`);
      if (block.type === "compare" && (block.items ?? []).filter((item) => item.chosen).length !== 1) {
        errors.push(`${where}: compare needs exactly one chosen item`);
      }
      if (block.type === "hotspot" && !block.description) errors.push(`${where}: hotspot needs a description`);
      for (const img of imagesNeedingSize(block)) {
        if (!img.width || !img.height) errors.push(`${where}: ${img.src} needs width and height`);
      }
      for (const src of mediaSources(block)) {
        if (!fileExists(src)) errors.push(`${where}: missing file ${src}`);
      }
    }
  }
  return errors;
}
