// Metalac Cookware: from sanjadevic.com/portfolio_page/metalac-cookware, images in the same
// order. TODO(Sanja): the numbered alt texts could name each piece.

const DIR = "/images/metalac-cookware";

const images = [
  { src: `${DIR}/01.jpg`, width: 2560, height: 2520, alt: "Black Metalac pot with a hand-drawn food pattern, lid open" },
  { src: `${DIR}/02.jpg`, width: 960, height: 960, alt: "Metalac cookware 2 of 12" },
  { src: `${DIR}/03.jpg`, width: 960, height: 960, alt: "Metalac cookware 3 of 12" },
  { src: `${DIR}/04.jpg`, width: 1407, height: 384, alt: "Metalac cookware 4 of 12" },
  { src: `${DIR}/05.jpg`, width: 2560, height: 1707, alt: "Patterned Metalac cookware with pasta and mushrooms on a slate board" },
  { src: `${DIR}/06.jpg`, width: 847, height: 1200, alt: "Metalac cookware 6 of 12" },
  { src: `${DIR}/07.jpg`, width: 1063, height: 276, alt: "Metalac cookware 7 of 12" },
  { src: `${DIR}/08.jpg`, width: 1920, height: 1439, alt: "Metalac cookware 8 of 12" },
  { src: `${DIR}/09.jpg`, width: 898, height: 1200, alt: "Metalac cookware 9 of 12" },
  { src: `${DIR}/10.jpg`, width: 1200, height: 310, alt: "Metalac cookware 10 of 12" },
  { src: `${DIR}/11.jpg`, width: 1920, height: 1440, alt: "Metalac cookware 11 of 12" },
  { src: `${DIR}/12.jpg`, width: 1713, height: 591, alt: "Metalac cookware 12 of 12" },
];

export const metalacCookware = {
  slug: "metalac-cookware",
  eyebrow: "Product design",
  title: "Metalac Cookware",
  lede: "Design for Metalac d.o.o. cookware. Exhibited at Ambiente, the world exhibition of consumer goods, in Frankfurt, Germany.",
  cover: { src: `${DIR}/05.jpg`, width: 2560, height: 1707, alt: "Patterned Metalac cookware with pasta and mushrooms on a slate board", position: "center" },
  meta: [
    { label: "Client", value: "Metalac d.o.o." },
    { label: "Exhibited", value: "Ambiente, Frankfurt" },
    { label: "Pieces", value: "12 images" },
  ],
  explore: ["package-design", "logo-designs"],
  sections: [
    {
      id: "work",
      label: "The collection",
      title: "The collection",
      blocks: [{ type: "gallery", layout: "stack", items: images }],
    },
  ],
};
