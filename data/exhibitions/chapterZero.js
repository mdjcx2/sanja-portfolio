// Chapter Zero: from sanjadevic.com/exhibitions, photos in the same order
// (resized to 1600px on the long edge).

const DIR = "/images/exhibitions/chapter-zero";

const images = [
  { src: `${DIR}/01.jpg`, width: 1600, height: 1068, alt: "Chapter Zero — photo 1 of 27" },
  { src: `${DIR}/02.jpg`, width: 1066, height: 1600, alt: "Chapter Zero — photo 2 of 27" },
  { src: `${DIR}/03.jpg`, width: 1600, height: 1068, alt: "Chapter Zero — photo 3 of 27" },
  { src: `${DIR}/04.jpg`, width: 1600, height: 1068, alt: "Chapter Zero — photo 4 of 27" },
  { src: `${DIR}/05.jpg`, width: 1066, height: 1600, alt: "Chapter Zero — photo 5 of 27" },
  { src: `${DIR}/06.jpg`, width: 1066, height: 1600, alt: "Chapter Zero — photo 6 of 27" },
  { src: `${DIR}/07.jpg`, width: 1600, height: 1068, alt: "Chapter Zero — photo 7 of 27" },
  { src: `${DIR}/08.jpg`, width: 1600, height: 1068, alt: "Chapter Zero — photo 8 of 27" },
  { src: `${DIR}/09.jpg`, width: 1600, height: 1068, alt: "Chapter Zero — photo 9 of 27" },
  { src: `${DIR}/10.jpg`, width: 1130, height: 1600, alt: "Chapter Zero — photo 10 of 27" },
  { src: `${DIR}/11.jpg`, width: 1600, height: 1068, alt: "Chapter Zero — photo 11 of 27" },
  { src: `${DIR}/12.jpg`, width: 1600, height: 1068, alt: "Chapter Zero — photo 12 of 27" },
  { src: `${DIR}/13.jpg`, width: 1600, height: 1068, alt: "Chapter Zero — photo 13 of 27" },
  { src: `${DIR}/14.jpg`, width: 1066, height: 1600, alt: "Chapter Zero — photo 14 of 27" },
  { src: `${DIR}/15.jpg`, width: 1600, height: 1068, alt: "Chapter Zero — photo 15 of 27" },
  { src: `${DIR}/16.jpg`, width: 1066, height: 1600, alt: "Chapter Zero — photo 16 of 27" },
  { src: `${DIR}/17.jpg`, width: 1600, height: 1068, alt: "Chapter Zero — photo 17 of 27" },
  { src: `${DIR}/18.jpg`, width: 1600, height: 1068, alt: "Chapter Zero — photo 18 of 27" },
  { src: `${DIR}/19.jpg`, width: 1600, height: 1068, alt: "Chapter Zero — photo 19 of 27" },
  { src: `${DIR}/20.jpg`, width: 1066, height: 1600, alt: "Chapter Zero — photo 20 of 27" },
  { src: `${DIR}/21.jpg`, width: 1066, height: 1600, alt: "Chapter Zero — photo 21 of 27" },
  { src: `${DIR}/22.jpg`, width: 1066, height: 1600, alt: "Chapter Zero — photo 22 of 27" },
  { src: `${DIR}/23.jpg`, width: 1600, height: 1068, alt: "Chapter Zero — photo 23 of 27" },
  { src: `${DIR}/24.jpg`, width: 1600, height: 1213, alt: "Chapter Zero — photo 24 of 27" },
  { src: `${DIR}/25.jpg`, width: 1600, height: 1213, alt: "Chapter Zero — photo 25 of 27" },
  { src: `${DIR}/26.jpg`, width: 1066, height: 1600, alt: "Chapter Zero — photo 26 of 27" },
  { src: `${DIR}/27.jpg`, width: 1600, height: 1068, alt: "Chapter Zero — photo 27 of 27" },
];

export const chapterZero = {
  slug: "chapter-zero",
  href: "/exhibitions/chapter-zero",
  eyebrow: "Art installation",
  title: "Chapter Zero",
  lede: "Art installation project realized in collaboration with Vladimir Devic, graphic and UI/UX designer. Luminous objects were created from plexiglass.",
  meta: [
    { label: "Type", value: "Art installation" },
    { label: "Collaboration", value: "Vladimir Devic, graphic and UI/UX designer" },
    { label: "Material", value: "Plexiglass" },
  ],
  // Card on /exhibitions
  card: {
    client: "With Vladimir Devic",
    year: null,
    summary: "Art installation project realized in collaboration with Vladimir Devic, graphic and UI/UX designer. Luminous objects were created from plexiglass.",
    coverImage: `${DIR}/01.jpg`,
  },
  explore: ["posterra-project", "catalyst-of-perception"],
  sections: [
    {
      id: "photos",
      label: "Photos",
      title: "Photos",
      blocks: [{ type: "gallery", layout: "stack", items: images }],
    },
  ],
};
