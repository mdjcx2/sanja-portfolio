// Exhibition Mix: from sanjadevic.com/exhibitions, photos in the same order
// (resized to 1600px on the long edge).
// TODO(Sanja): her site's text for this page is theme filler, so the lede is
// a placeholder. Add a real description.

const DIR = "/images/exhibitions/exhibition-mix";

const images = [
  { src: `${DIR}/01.jpg`, width: 1600, height: 1200, alt: "Exhibition Mix — photo 1 of 14" },
  { src: `${DIR}/02.jpg`, width: 1600, height: 1245, alt: "Exhibition Mix — photo 2 of 14" },
  { src: `${DIR}/03.jpg`, width: 1600, height: 1159, alt: "Exhibition Mix — photo 3 of 14" },
  { src: `${DIR}/04.jpg`, width: 1600, height: 1111, alt: "Exhibition Mix — photo 4 of 14" },
  { src: `${DIR}/05.jpg`, width: 1600, height: 1226, alt: "Exhibition Mix — photo 5 of 14" },
  { src: `${DIR}/06.jpg`, width: 1600, height: 1200, alt: "Exhibition Mix — photo 6 of 14" },
  { src: `${DIR}/07.jpg`, width: 1600, height: 1005, alt: "Exhibition Mix — photo 7 of 14" },
  { src: `${DIR}/08.jpg`, width: 1600, height: 1352, alt: "Exhibition Mix — photo 8 of 14" },
  { src: `${DIR}/09.jpg`, width: 1200, height: 1600, alt: "Exhibition Mix — photo 9 of 14" },
  { src: `${DIR}/10.jpg`, width: 1200, height: 1600, alt: "Exhibition Mix — photo 10 of 14" },
  { src: `${DIR}/11.jpg`, width: 1094, height: 1600, alt: "Exhibition Mix — photo 11 of 14" },
  { src: `${DIR}/12.jpg`, width: 1600, height: 1263, alt: "Exhibition Mix — photo 12 of 14" },
  { src: `${DIR}/13.jpg`, width: 1600, height: 1200, alt: "Exhibition Mix — photo 13 of 14" },
  { src: `${DIR}/14.jpg`, width: 1600, height: 897, alt: "Exhibition Mix — photo 14 of 14" },
];

export const exhibitionMix = {
  slug: "exhibition-mix",
  href: "/exhibitions/exhibition-mix",
  eyebrow: "Exhibitions",
  title: "Exhibition Mix",
  lede: "Photos from exhibitions.",
  meta: [
    { label: "Type", value: "Exhibitions" },
  ],
  // Card on /exhibitions
  card: {
    client: "Exhibitions",
    year: null,
    summary: "Photos from exhibitions.",
    coverImage: `${DIR}/01.jpg`,
  },
  explore: ["chapter-zero", "posterra-project"],
  sections: [
    {
      id: "photos",
      label: "Photos",
      title: "Photos",
      blocks: [{ type: "gallery", layout: "stack", items: images }],
    },
  ],
};
