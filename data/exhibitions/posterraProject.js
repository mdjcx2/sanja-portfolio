// Posterra Project: from sanjadevic.com/exhibitions, photos in the same order
// (resized to 1600px on the long edge).

const DIR = "/images/exhibitions/posterra-project";

const images = [
  { src: `${DIR}/01.jpg`, width: 1600, height: 1200, alt: "Posterra Project — photo 1 of 7" },
  { src: `${DIR}/02.jpg`, width: 1600, height: 1200, alt: "Posterra Project — photo 2 of 7" },
  { src: `${DIR}/03.jpg`, width: 1200, height: 1600, alt: "Posterra Project — photo 3 of 7" },
  { src: `${DIR}/04.jpg`, width: 1600, height: 1200, alt: "Posterra Project — photo 4 of 7" },
  { src: `${DIR}/05.jpg`, width: 1200, height: 1600, alt: "Posterra Project — photo 5 of 7" },
  { src: `${DIR}/06.jpg`, width: 1600, height: 1200, alt: "Posterra Project — photo 6 of 7" },
  { src: `${DIR}/07.jpg`, width: 1600, height: 1200, alt: "Posterra Project — photo 7 of 7" },
];

export const posterraProject = {
  slug: "posterra-project",
  href: "/exhibitions/posterra-project",
  eyebrow: "Solo exhibition",
  title: "Posterra Project",
  lede: "A typographic manifesto in CMYK.",
  meta: [
    { label: "Type", value: "Solo exhibition" },
    { label: "Venue", value: "Horeum Margi Museum, Ćuprija" },
    { label: "Opened", value: "25 April 2025" },
  ],
  // Card on /exhibitions
  card: {
    client: "Horeum Margi Museum",
    year: "2025",
    summary: "A typographic manifesto in CMYK.",
    coverImage: `${DIR}/02.jpg`,
  },
  explore: ["catalyst-of-perception", "disorderly-dimensions"],
  sections: [
    {
      id: "about",
      label: "About",
      title: "About the exhibition",
      blocks: [{ type: "text", body: "Posterra is a collection of contemporary, experimental posters born from the need to compress the visual noise of everyday life into a single moment — into a single form, a single letter, a single rhythm of color and whiteness. At a time when design often strives to be everything at once, Posterra consciously chooses to be less — and thus becomes more. These posters are both a visual diary and a manifesto, positioned at the intersection of typography, minimalism, and brutal honesty of form. Each piece stands as an individual graphic statement — from sharp phrases drawn from everyday speech to abstract shapes vibrating in the rhythm of the CMYK spectrum.\n\nThe CMYK palette here is not just an aesthetic choice — it is an homage to print, to the mechanics of reproduction, to the very building blocks of visual communication. In this context, typography is not merely a carrier of meaning — it is meaning. It shouts and whispers. It becomes a graphic sign, a conceptual structure, and an emotional impulse.\n\nPosterra does not aim to offer answers — it simply asks questions in capital letters. It does not seek to be understood — it seeks to be felt. It does not strive to be beautiful — it strives to be true in its form. It is a short sentence on the wall, the pulse of a fleeting moment.\n\nIn this collection, irony, nostalgia, rebellion, and the aesthetics of imperfection intertwine. The language of design appears here through mistranslations, systemic glitches, urban slang, tenderness in bold, and chaos that has been aligned, framed, and rasterized.\n\nPosterra is a visual collection of emotions — shaped, printed, and set free to speak.\n\nThe works from this cycle were premiered at a solo exhibition at the Horeum Margi Museum in Ćuprija, on April 25, 2025." }],
    },
    {
      id: "photos",
      label: "Photos",
      title: "Photos",
      blocks: [{ type: "gallery", layout: "stack", items: images }],
    },
  ],
};
