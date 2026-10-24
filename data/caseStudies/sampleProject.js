// A sample case study on the block-based template. Copy this file per project
// and register it in data/caseStudies/index.js. Block shapes and validation:
// lib/caseStudy/blocks.js. Images need width and height and must exist in public/.

export const sampleProject = {
  slug: "sample-project",
  eyebrow: "Client name",
  title: "Sample Project",
  lede: "Two or three sentences: the problem, what Sanja did, and what changed.",
  // cover: { src: "/images/sample-project/cover.jpg", width: 2400, height: 1200, alt: "…", position: "center" },
  meta: [
    { label: "Role", value: "Placeholder role" },
    { label: "Team", value: "Placeholder team" },
    { label: "Impact", value: "Placeholder impact" },
    { label: "Shipped", value: "2025" },
  ],
  explore: ["logo-designs", "project-two"],
  sections: [
    {
      id: "problem",
      label: "Problem",
      title: "The problem, in one line.",
      blocks: [
        { type: "text", body: "Placeholder: the context and why it mattered.\n\nA second paragraph if needed." },
        { type: "list", items: ["A constraint", "Another constraint", "A third one"] },
      ],
    },
    {
      id: "process",
      label: "Process",
      title: "How the work was done.",
      blocks: [
        {
          type: "process",
          steps: [
            { icon: "list", title: "Research", text: "Placeholder step." },
            { icon: "palette", title: "Explore", text: "Placeholder step." },
            { icon: "stack", title: "Design", text: "Placeholder step." },
          ],
        },
        // { type: "figure", src: "/images/sample-project/flow.png", width: 1600, height: 900, alt: "…", caption: "…" },
      ],
    },
    {
      id: "results",
      label: "Results",
      title: "What changed.",
      blocks: [
        {
          type: "metrics",
          items: [
            { value: "00%", label: "Placeholder metric one" },
            { value: "00", label: "Placeholder metric two" },
            { value: "0×", label: "Placeholder metric three" },
          ],
        },
        { type: "text", body: "Placeholder: where the numbers came from." },
      ],
    },
  ],
};
