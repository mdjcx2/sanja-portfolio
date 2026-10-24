// Disorderly Dimensions: A Chaotic Journey: from sanjadevic.com/exhibitions, photos in the same order
// (resized to 1600px on the long edge).

const DIR = "/images/exhibitions/disorderly-dimensions";

const images = [
  { src: `${DIR}/01.jpg`, width: 1600, height: 900, alt: "Disorderly Dimensions: A Chaotic Journey — photo 1 of 12" },
  { src: `${DIR}/02.jpg`, width: 1398, height: 1600, alt: "Disorderly Dimensions: A Chaotic Journey — photo 2 of 12" },
  { src: `${DIR}/03.jpg`, width: 1600, height: 900, alt: "Disorderly Dimensions: A Chaotic Journey — photo 3 of 12" },
  { src: `${DIR}/04.jpg`, width: 1600, height: 753, alt: "Disorderly Dimensions: A Chaotic Journey — photo 4 of 12" },
  { src: `${DIR}/05.jpg`, width: 1200, height: 1600, alt: "Disorderly Dimensions: A Chaotic Journey — photo 5 of 12" },
  { src: `${DIR}/06.jpg`, width: 1200, height: 1600, alt: "Disorderly Dimensions: A Chaotic Journey — photo 6 of 12" },
  { src: `${DIR}/07.jpg`, width: 1600, height: 1200, alt: "Disorderly Dimensions: A Chaotic Journey — photo 7 of 12" },
  { src: `${DIR}/08.jpg`, width: 900, height: 1600, alt: "Disorderly Dimensions: A Chaotic Journey — photo 8 of 12" },
  { src: `${DIR}/09.jpg`, width: 1600, height: 1200, alt: "Disorderly Dimensions: A Chaotic Journey — photo 9 of 12" },
  { src: `${DIR}/10.jpg`, width: 1600, height: 1280, alt: "Disorderly Dimensions: A Chaotic Journey — photo 10 of 12" },
  { src: `${DIR}/11.jpg`, width: 1600, height: 1399, alt: "Disorderly Dimensions: A Chaotic Journey — photo 11 of 12" },
  { src: `${DIR}/12.jpg`, width: 1200, height: 1600, alt: "Disorderly Dimensions: A Chaotic Journey — photo 12 of 12" },
];

export const disorderlyDimensions = {
  slug: "disorderly-dimensions",
  href: "/exhibitions/disorderly-dimensions",
  eyebrow: "Artist in residence",
  title: "Disorderly Dimensions: A Chaotic Journey",
  lede: "Artist in residence at Institut für Alles Mögliche, Atelier Zentrale, Berlin.",
  meta: [
    { label: "Role", value: "Artist in residence" },
    { label: "Venue", value: "Institut für Alles Mögliche, Atelier Zentrale, Berlin" },
    { label: "Dates", value: "15–30 December 2023" },
  ],
  // Card on /exhibitions
  card: {
    client: "Berlin",
    year: "2023",
    summary: "Artist in residence at Institut für Alles Mögliche, Atelier Zentrale, Berlin.",
    coverImage: `${DIR}/10.jpg`,
  },
  explore: ["fluid-workshop", "block-typographic-heritage"],
  sections: [
    {
      id: "about",
      label: "About",
      title: "About the exhibition",
      blocks: [{ type: "text", body: "“Disorderly Dimensions: A Chaotic Journey” is an installation that brings the concept of “Colliding Chaos: Artistic Absurdity” to life. The installation transforms the exhibition space into a surreal environment, where visitors can explore the collision of human-created art and AI-generated art within a parallel of absurdity.\n\nBy navigating through the gallery space and witnessing the convergence of human and AI art, participants engage in an exploration of creativity and absurdity. The installation invites visitors to question the boundaries of art, perception, and the role of collaboration between humans and artificial intelligence.\n\nOn one side, you glimpse into the intricate journey within an artist’s mind, a realm marked by the complexity of her thoughts, the challenges she grapples with, and the whimsy of absurd messages. Through her creations of satirical self-help book covers, she endeavors to navigate the chaos within, striving for order both in her mind and eventually in reality. The evolving geometrical work presented here is a perpetual work in progress, ever-shifting in shape and position on the wall. While currently depicted in black and white, there’s a potential envisioning of specific colors in the future, contingent upon the artist’s clarity of thought and concept. Thus, it serves as a visual narrative of the progression of thoughts transforming into tangible creations.\n\nOn the contrasting side, clarity prevails, facilitated by the capabilities of AI to manifest thoughts into images—a process that may yield unexpected results, diverging from the artist’s original expectations. The presentation of this work, representing the artist’s thoughts, adheres meticulously to a geometrical order, emphasizing the inherent sterility of the process.\n\nA noteworthy aspect that emerges here is the diversity of styles produced by the AI in response to the same prompts. Some results prove visually satisfying, while others, especially in the realm of typographic design, fall short of expectations. For instance, the AI’s attempt at generating a logo from given words often results in unsatisfactory outcomes. This leads to the conclusion that AI faces challenges in the realm of typographic design within graphic design. Nevertheless, it remains a valuable tool for visualizing abstract concepts that may elude our own imaginations." }],
    },
    {
      id: "photos",
      label: "Photos",
      title: "Photos",
      blocks: [{ type: "gallery", layout: "stack", items: images }],
    },
  ],
};
