// The project list behind every card (home "Selected work", /work grid and
// case study "Explore more"). Each slug with a file in data/caseStudies/
// gets a full page at /work/<slug>.
//
// TODO(Sanja): placeholders. Add a cover image in public/images/<slug>/ and
// point coverImage at it; until then the card shows the title on a gradient.

export const projects = [
  {
    slug: "sample-project",
    featured: true,
    group: "selected",
    title: "Sample Project",
    client: "Client name",
    year: "2025",
    summary: "One-sentence summary of the project and its outcome.",
    coverImage: null,
    coverGradient: "linear-gradient(155deg, #020a18 0%, #071830 55%, #0a2040 100%)",
  },
  {
    slug: "project-two",
    featured: true,
    group: "selected",
    title: "Project Two",
    client: "Client name",
    year: "2024",
    summary: "One-sentence summary of the project and its outcome.",
    coverImage: null,
    coverGradient: "linear-gradient(155deg, #030d06 0%, #092010 55%, #0d2a15 100%)",
  },
  {
    slug: "project-three",
    featured: true,
    group: "more",
    title: "Project Three",
    client: "Client name",
    year: "2023",
    summary: "One-sentence summary of the project and its outcome.",
    coverImage: null,
    coverGradient: "linear-gradient(155deg, #100520 0%, #1a0835 55%, #220b45 100%)",
  },
];

// Section headings on /work, in order. Projects are placed by their `group`.
export const projectGroups = [
  { key: "selected", label: "Selected work" },
  { key: "more", label: "More projects" },
];
