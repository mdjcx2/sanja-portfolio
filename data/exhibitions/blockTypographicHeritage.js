// Block – Typographic Heritage in the Assembly System: from sanjadevic.com/exhibitions, photos in the same order
// (resized to 1600px on the long edge).

const DIR = "/images/exhibitions/block-typographic-heritage";

const images = [
  { src: `${DIR}/01.jpg`, width: 1600, height: 1200, alt: "Block – Typographic Heritage in the Assembly System — photo 1 of 16" },
  { src: `${DIR}/02.jpg`, width: 1200, height: 1600, alt: "Block – Typographic Heritage in the Assembly System — photo 2 of 16" },
  { src: `${DIR}/03.jpg`, width: 1200, height: 1600, alt: "Block – Typographic Heritage in the Assembly System — photo 3 of 16" },
  { src: `${DIR}/04.jpg`, width: 1200, height: 1600, alt: "Block – Typographic Heritage in the Assembly System — photo 4 of 16" },
  { src: `${DIR}/05.jpg`, width: 1200, height: 1600, alt: "Block – Typographic Heritage in the Assembly System — photo 5 of 16" },
  { src: `${DIR}/06.jpg`, width: 1200, height: 1600, alt: "Block – Typographic Heritage in the Assembly System — photo 6 of 16" },
  { src: `${DIR}/07.jpg`, width: 1200, height: 1600, alt: "Block – Typographic Heritage in the Assembly System — photo 7 of 16" },
  { src: `${DIR}/08.jpg`, width: 1200, height: 1600, alt: "Block – Typographic Heritage in the Assembly System — photo 8 of 16" },
  { src: `${DIR}/09.jpg`, width: 1478, height: 1600, alt: "Block – Typographic Heritage in the Assembly System — photo 9 of 16" },
  { src: `${DIR}/10.jpg`, width: 1104, height: 1600, alt: "Block – Typographic Heritage in the Assembly System — photo 10 of 16" },
  { src: `${DIR}/11.jpg`, width: 1200, height: 1600, alt: "Block – Typographic Heritage in the Assembly System — photo 11 of 16" },
  { src: `${DIR}/12.jpg`, width: 1200, height: 1600, alt: "Block – Typographic Heritage in the Assembly System — photo 12 of 16" },
  { src: `${DIR}/13.jpg`, width: 1600, height: 1200, alt: "Block – Typographic Heritage in the Assembly System — photo 13 of 16" },
  { src: `${DIR}/14.jpg`, width: 1200, height: 1600, alt: "Block – Typographic Heritage in the Assembly System — photo 14 of 16" },
  { src: `${DIR}/15.jpg`, width: 1200, height: 1600, alt: "Block – Typographic Heritage in the Assembly System — photo 15 of 16" },
  { src: `${DIR}/16.jpg`, width: 1600, height: 1078, alt: "Block – Typographic Heritage in the Assembly System — photo 16 of 16" },
];

export const blockTypographicHeritage = {
  slug: "block-typographic-heritage",
  href: "/exhibitions/block-typographic-heritage",
  eyebrow: "Light installation",
  title: "Block – Typographic Heritage in the Assembly System",
  lede: "Luminous art installation, created in collaboration with typographer Biljana Stankovic.",
  meta: [
    { label: "Type", value: "Luminous art installation" },
    { label: "Collaboration", value: "Biljana Stankovic, typographer" },
  ],
  // Card on /exhibitions
  card: {
    client: "With Biljana Stankovic",
    year: null,
    summary: "Luminous art installation, created in collaboration with typographer Biljana Stankovic.",
    coverImage: `${DIR}/04.jpg`,
  },
  explore: ["miniature-books", "exhibition-mix"],
  sections: [
    {
      id: "photos",
      label: "Photos",
      title: "Photos",
      blocks: [{ type: "gallery", layout: "stack", items: images }],
    },
  ],
};
