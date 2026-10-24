// UI Design: from sanjadevic.com/portfolio_page/ui-design, images in the same
// order. TODO(Sanja): the numbered alt texts could name each piece.

const DIR = "/images/ui-design";

const images = [
  { src: `${DIR}/01.jpg`, width: 1400, height: 1242, alt: "WeatherOnline app splash screens on two phones" },
  { src: `${DIR}/02.jpg`, width: 1400, height: 1242, alt: "App design 2 of 24" },
  { src: `${DIR}/03.jpg`, width: 1400, height: 921, alt: "App design 3 of 24" },
  { src: `${DIR}/04.jpg`, width: 1400, height: 921, alt: "App design 4 of 24" },
  { src: `${DIR}/05.jpg`, width: 1599, height: 1080, alt: "App design 5 of 24" },
  { src: `${DIR}/06.jpg`, width: 1599, height: 1080, alt: "App design 6 of 24" },
  { src: `${DIR}/07.jpg`, width: 1200, height: 867, alt: "App design 7 of 24" },
  { src: `${DIR}/08.jpg`, width: 588, height: 666, alt: "App design 8 of 24" },
  { src: `${DIR}/09.jpg`, width: 800, height: 600, alt: "App design 9 of 24" },
  { src: `${DIR}/10.jpg`, width: 1400, height: 1050, alt: "App design 10 of 24" },
  { src: `${DIR}/11.jpg`, width: 1400, height: 569, alt: "App design 11 of 24" },
  { src: `${DIR}/12.jpg`, width: 800, height: 600, alt: "App design 12 of 24" },
  { src: `${DIR}/13.jpg`, width: 1400, height: 1242, alt: "App design 13 of 24" },
  { src: `${DIR}/14.jpg`, width: 1400, height: 1230, alt: "App design 14 of 24" },
  { src: `${DIR}/15.jpg`, width: 1400, height: 891, alt: "App design 15 of 24" },
  { src: `${DIR}/16.jpg`, width: 1400, height: 913, alt: "App design 16 of 24" },
  { src: `${DIR}/17.jpg`, width: 1920, height: 1681, alt: "App design 17 of 24" },
  { src: `${DIR}/18.jpg`, width: 1920, height: 1681, alt: "App design 18 of 24" },
  { src: `${DIR}/19.jpg`, width: 1920, height: 1681, alt: "App design 19 of 24" },
  { src: `${DIR}/20.jpg`, width: 1920, height: 1440, alt: "App design 20 of 24" },
  { src: `${DIR}/21.jpg`, width: 1920, height: 1440, alt: "App design 21 of 24" },
  { src: `${DIR}/22.jpg`, width: 1920, height: 1440, alt: "App design 22 of 24" },
  { src: `${DIR}/23.jpg`, width: 1200, height: 1202, alt: "App design 23 of 24" },
  { src: `${DIR}/24.jpg`, width: 1200, height: 824, alt: "App design 24 of 24" },
];

export const uiDesign = {
  slug: "ui-design",
  eyebrow: "Interface",
  title: "UI Design",
  lede: "A selection of app designs, created for clients all over the world.",
  meta: [
    { label: "Role", value: "UI designer" },
    { label: "Clients", value: "Around the world" },
    { label: "Screens", value: "24 images" },
  ],
  explore: ["logo-designs", "package-design"],
  sections: [
    {
      id: "work",
      label: "Selected app designs",
      title: "Selected app designs",
      blocks: [{ type: "gallery", layout: "stack", items: images }],
    },
  ],
};
