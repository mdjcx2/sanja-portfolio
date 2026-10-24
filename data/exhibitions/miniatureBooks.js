// Miniature Books: from sanjadevic.com/exhibitions, photos in the same order
// (resized to 1600px on the long edge).

const DIR = "/images/exhibitions/miniature-books";

const images = [
  { src: `${DIR}/01.jpg`, width: 1600, height: 1076, alt: "Miniature Books — photo 1 of 44" },
  { src: `${DIR}/02.jpg`, width: 1600, height: 1009, alt: "Miniature Books — photo 2 of 44" },
  { src: `${DIR}/03.jpg`, width: 1600, height: 1589, alt: "Miniature Books — photo 3 of 44" },
  { src: `${DIR}/04.jpg`, width: 1600, height: 1478, alt: "Miniature Books — photo 4 of 44" },
  { src: `${DIR}/05.jpg`, width: 1600, height: 1153, alt: "Miniature Books — photo 5 of 44" },
  { src: `${DIR}/06.jpg`, width: 1600, height: 1406, alt: "Miniature Books — photo 6 of 44" },
  { src: `${DIR}/07.jpg`, width: 1600, height: 772, alt: "Miniature Books — photo 7 of 44" },
  { src: `${DIR}/08.jpg`, width: 1600, height: 1600, alt: "Miniature Books — photo 8 of 44" },
  { src: `${DIR}/09.jpg`, width: 1600, height: 716, alt: "Miniature Books — photo 9 of 44" },
  { src: `${DIR}/10.jpg`, width: 1600, height: 1186, alt: "Miniature Books — photo 10 of 44" },
  { src: `${DIR}/11.jpg`, width: 1600, height: 1012, alt: "Miniature Books — photo 11 of 44" },
  { src: `${DIR}/12.jpg`, width: 1600, height: 806, alt: "Miniature Books — photo 12 of 44" },
  { src: `${DIR}/13.jpg`, width: 1600, height: 1134, alt: "Miniature Books — photo 13 of 44" },
  { src: `${DIR}/14.jpg`, width: 1600, height: 1085, alt: "Miniature Books — photo 14 of 44" },
  { src: `${DIR}/15.jpg`, width: 1600, height: 672, alt: "Miniature Books — photo 15 of 44" },
  { src: `${DIR}/16.jpg`, width: 1600, height: 1500, alt: "Miniature Books — photo 16 of 44" },
  { src: `${DIR}/17.jpg`, width: 1600, height: 1088, alt: "Miniature Books — photo 17 of 44" },
  { src: `${DIR}/18.jpg`, width: 1600, height: 1373, alt: "Miniature Books — photo 18 of 44" },
  { src: `${DIR}/19.jpg`, width: 1600, height: 1216, alt: "Miniature Books — photo 19 of 44" },
  { src: `${DIR}/20.jpg`, width: 1600, height: 1517, alt: "Miniature Books — photo 20 of 44" },
  { src: `${DIR}/21.jpg`, width: 1600, height: 777, alt: "Miniature Books — photo 21 of 44" },
  { src: `${DIR}/22.jpg`, width: 1600, height: 1122, alt: "Miniature Books — photo 22 of 44" },
  { src: `${DIR}/23.jpg`, width: 1402, height: 1600, alt: "Miniature Books — photo 23 of 44" },
  { src: `${DIR}/24.jpg`, width: 1600, height: 1268, alt: "Miniature Books — photo 24 of 44" },
  { src: `${DIR}/25.jpg`, width: 1600, height: 1240, alt: "Miniature Books — photo 25 of 44" },
  { src: `${DIR}/26.jpg`, width: 1600, height: 1074, alt: "Miniature Books — photo 26 of 44" },
  { src: `${DIR}/27.jpg`, width: 1600, height: 1420, alt: "Miniature Books — photo 27 of 44" },
  { src: `${DIR}/28.jpg`, width: 1600, height: 1241, alt: "Miniature Books — photo 28 of 44" },
  { src: `${DIR}/29.jpg`, width: 1600, height: 1178, alt: "Miniature Books — photo 29 of 44" },
  { src: `${DIR}/30.jpg`, width: 1380, height: 1600, alt: "Miniature Books — photo 30 of 44" },
  { src: `${DIR}/31.jpg`, width: 1600, height: 1405, alt: "Miniature Books — photo 31 of 44" },
  { src: `${DIR}/32.jpg`, width: 1600, height: 1358, alt: "Miniature Books — photo 32 of 44" },
  { src: `${DIR}/33.jpg`, width: 1537, height: 1600, alt: "Miniature Books — photo 33 of 44" },
  { src: `${DIR}/34.jpg`, width: 1600, height: 1525, alt: "Miniature Books — photo 34 of 44" },
  { src: `${DIR}/35.jpg`, width: 1600, height: 785, alt: "Miniature Books — photo 35 of 44" },
  { src: `${DIR}/36.jpg`, width: 1600, height: 1354, alt: "Miniature Books — photo 36 of 44" },
  { src: `${DIR}/37.jpg`, width: 1600, height: 1372, alt: "Miniature Books — photo 37 of 44" },
  { src: `${DIR}/38.jpg`, width: 1600, height: 1284, alt: "Miniature Books — photo 38 of 44" },
  { src: `${DIR}/39.jpg`, width: 1600, height: 1286, alt: "Miniature Books — photo 39 of 44" },
  { src: `${DIR}/40.jpg`, width: 1600, height: 1278, alt: "Miniature Books — photo 40 of 44" },
  { src: `${DIR}/41.jpg`, width: 1600, height: 1010, alt: "Miniature Books — photo 41 of 44" },
  { src: `${DIR}/42.jpg`, width: 1600, height: 1102, alt: "Miniature Books — photo 42 of 44" },
  { src: `${DIR}/43.jpg`, width: 1600, height: 1022, alt: "Miniature Books — photo 43 of 44" },
  { src: `${DIR}/44.jpg`, width: 1600, height: 1022, alt: "Miniature Books — photo 44 of 44" },
];

export const miniatureBooks = {
  slug: "miniature-books",
  href: "/exhibitions/miniature-books",
  eyebrow: "Solo exhibition",
  title: "Miniature Books",
  lede: "Series of miniature books created for a solo exhibition. Themes vary from self-motivational messages to art diary entries and experimental materials and forms.",
  meta: [
    { label: "Type", value: "Solo exhibition" },
    { label: "Work", value: "Handmade miniature books" },
  ],
  // Card on /exhibitions
  card: {
    client: "Solo exhibition",
    year: null,
    summary: "Series of miniature books created for a solo exhibition. Themes vary from self-motivational messages to art diary entries and experimental materials and forms.",
    coverImage: `${DIR}/01.jpg`,
  },
  explore: ["exhibition-mix", "chapter-zero"],
  sections: [
    {
      id: "photos",
      label: "Photos",
      title: "Photos",
      blocks: [{ type: "gallery", layout: "stack", items: images }],
    },
  ],
};
