// Fluid Workshop: from sanjadevic.com/exhibitions, photos in the same order
// (resized to 1600px on the long edge).

const DIR = "/images/exhibitions/fluid-workshop";

const images = [
  { src: `${DIR}/01.jpg`, width: 1600, height: 1592, alt: "Fluid Workshop — photo 1 of 1" },
];

export const fluidWorkshop = {
  slug: "fluid-workshop",
  href: "/exhibitions/fluid-workshop",
  eyebrow: "Workshop",
  title: "Fluid Workshop",
  lede: "Workshop leader at the 2021 FLUID Design Forum, organized by the Faculty of Fine Arts Cetinje, Montenegro.",
  meta: [
    { label: "Role", value: "Workshop leader" },
    { label: "Event", value: "FLUID Design Forum 2021" },
    { label: "Host", value: "Faculty of Fine Arts Cetinje, Montenegro" },
  ],
  // Card on /exhibitions
  card: {
    client: "Cetinje",
    year: "2021",
    summary: "Workshop leader at the 2021 FLUID Design Forum, organized by the Faculty of Fine Arts Cetinje, Montenegro.",
    coverImage: `${DIR}/01.jpg`,
  },
  explore: ["block-typographic-heritage", "miniature-books"],
  sections: [
    {
      id: "photos",
      label: "Photos",
      title: "Photos",
      blocks: [{ type: "gallery", layout: "stack", items: images }],
    },
  ],
};
