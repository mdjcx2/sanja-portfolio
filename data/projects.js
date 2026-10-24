// The project list behind every card (home "Selected work", /work grid and
// case study "Explore more"). Each slug with a file in data/caseStudies/
// gets a full page at /work/<slug>.
//
// Content from sanjadevic.com/portfolio, in her order after Logo Designs.

export const projects = [
  {
    slug: "logo-designs",
    featured: true,
    group: "selected",
    title: "Logo Designs",
    client: "Clients worldwide",
    year: "2006 – 2022",
    summary: "A selection of realized logo designs, created for clients all over the world.",
    coverImage: "/images/logo-designs/logo-01.jpg",
    coverGradient: "linear-gradient(155deg, #3a0022 0%, #6b0040 55%, #ff0095 100%)",
  },
  {
    slug: "package-design",
    featured: true,
    group: "selected",
    title: "Package Design",
    client: "Clients worldwide",
    year: null,
    summary: "A selection of package designs, created for clients all over the world.",
    coverImage: "/images/package-design/04.jpg",
    coverGradient: "linear-gradient(155deg, #030d06 0%, #092010 55%, #0d2a15 100%)",
  },
  {
    slug: "ui-design",
    featured: true,
    group: "selected",
    title: "UI Design",
    client: "Clients worldwide",
    year: null,
    summary: "A selection of app designs, created for clients all over the world.",
    coverImage: "/images/ui-design/01.jpg",
    coverGradient: "linear-gradient(155deg, #020a18 0%, #071830 55%, #0a2040 100%)",
  },
  {
    slug: "metalac-cookware",
    featured: true,
    group: "selected",
    title: "Metalac Cookware",
    client: "Metalac d.o.o.",
    year: null,
    summary: "Cookware design for Metalac, exhibited at Ambiente in Frankfurt.",
    coverImage: "/images/metalac-cookware/05.jpg",
    coverGradient: "linear-gradient(155deg, #100520 0%, #1a0835 55%, #220b45 100%)",
  },
];

// Section headings on /work, in order. Projects are placed by their `group`.
export const projectGroups = [
  { key: "selected", label: "Selected work" },
];
