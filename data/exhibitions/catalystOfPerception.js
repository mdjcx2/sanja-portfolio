// Catalyst of Perception: Luminescent Duality: from sanjadevic.com/exhibitions, photos in the same order
// (resized to 1600px on the long edge).

const DIR = "/images/exhibitions/catalyst-of-perception";

const images = [
  { src: `${DIR}/01.jpg`, width: 900, height: 1600, alt: "Catalyst of Perception: Luminescent Duality — photo 1 of 16" },
  { src: `${DIR}/02.jpg`, width: 1600, height: 1200, alt: "Catalyst of Perception: Luminescent Duality — photo 2 of 16" },
  { src: `${DIR}/03.jpg`, width: 1600, height: 900, alt: "Catalyst of Perception: Luminescent Duality — photo 3 of 16" },
  { src: `${DIR}/04.jpg`, width: 900, height: 1600, alt: "Catalyst of Perception: Luminescent Duality — photo 4 of 16" },
  { src: `${DIR}/05.jpg`, width: 1600, height: 900, alt: "Catalyst of Perception: Luminescent Duality — photo 5 of 16" },
  { src: `${DIR}/06.jpg`, width: 1200, height: 1600, alt: "Catalyst of Perception: Luminescent Duality — photo 6 of 16" },
  { src: `${DIR}/07.jpg`, width: 1600, height: 900, alt: "Catalyst of Perception: Luminescent Duality — photo 7 of 16" },
  { src: `${DIR}/08.jpg`, width: 1600, height: 900, alt: "Catalyst of Perception: Luminescent Duality — photo 8 of 16" },
  { src: `${DIR}/09.jpg`, width: 1600, height: 900, alt: "Catalyst of Perception: Luminescent Duality — photo 9 of 16" },
  { src: `${DIR}/10.jpg`, width: 1200, height: 1600, alt: "Catalyst of Perception: Luminescent Duality — photo 10 of 16" },
  { src: `${DIR}/11.jpg`, width: 1200, height: 1600, alt: "Catalyst of Perception: Luminescent Duality — photo 11 of 16" },
  { src: `${DIR}/12.jpg`, width: 1600, height: 900, alt: "Catalyst of Perception: Luminescent Duality — photo 12 of 16" },
  { src: `${DIR}/13.jpg`, width: 1600, height: 900, alt: "Catalyst of Perception: Luminescent Duality — photo 13 of 16" },
  { src: `${DIR}/14.jpg`, width: 900, height: 1600, alt: "Catalyst of Perception: Luminescent Duality — photo 14 of 16" },
  { src: `${DIR}/15.jpg`, width: 900, height: 1600, alt: "Catalyst of Perception: Luminescent Duality — photo 15 of 16" },
  { src: `${DIR}/16.jpg`, width: 900, height: 1600, alt: "Catalyst of Perception: Luminescent Duality — photo 16 of 16" },
];

export const catalystOfPerception = {
  slug: "catalyst-of-perception",
  href: "/exhibitions/catalyst-of-perception",
  eyebrow: "Artist in residence",
  title: "Catalyst of Perception: Luminescent Duality",
  lede: "Artist in residence at Institut für Alles Mögliche, Atelier Zentrale, Berlin.",
  meta: [
    { label: "Role", value: "Artist in residence" },
    { label: "Venue", value: "Institut für Alles Mögliche, Atelier Zentrale, Berlin" },
    { label: "Dates", value: "15–28 January 2024" },
  ],
  // Card on /exhibitions
  card: {
    client: "Berlin",
    year: "2024",
    summary: "Artist in residence at Institut für Alles Mögliche, Atelier Zentrale, Berlin.",
    coverImage: `${DIR}/01.jpg`,
  },
  explore: ["disorderly-dimensions", "fluid-workshop"],
  sections: [
    {
      id: "about",
      label: "About",
      title: "About the exhibition",
      blocks: [{ type: "text", body: "“Catalyst of Perception: Luminescent Duality” delves into the enigmatic realm of art, where existence is not solely defined by tangible presence. Inspired by the paradoxical nature of Schrödinger’s cat, the exhibition challenges the perception of artistic creation and its manifestation in the absence of an observer. Much like the hypothetical cat sealed in a box, simultaneously alive and dead until observed, the artworks in “Catalyst of Perception” exist in a state of suspended animation within the gallery’s walls. Once the doors open and visitors step into the space, they become the catalysts that bring these artworks to life.\n\nThe exhibition employs luminescent paint, a material that remains invisible under ordinary lighting conditions, to create a mesmerizing visual experience. As visitors activate black lights, the paint illuminates, revealing intricate patterns, images, and text that were previously concealed. This transformative effect mirrors the concept of quantum superposition, where particles exist in multiple states until their state is measured or observed. The luminescent paint, visible only under specific conditions, serves as a metaphor for the ephemeral and context-dependent nature of art. It exists in a perpetual dance of potentiality, its form and meaning shifting based on the observer’s presence and perspective.\n\nThe exhibition’s title, “Catalyst of Perception,” aptly captures its essence, as it is the act of observation that brings the artworks to life. It challenges preconceived notions of artistic existence, suggesting that art’s true form is not static but rather fluid and ever-evolving, shaped by the individual perceptions of those who encounter it.\n\nIn the heart of the gallery, a profound dialogue unfolds, where the concepts of life and death, VOICE and SILENCE, intertwine in a mesmerizing dance of light and shadow. On one side, the word “VOICE” reigns supreme, etched in bold, vibrant letters that echo with the essence of life’s vibrant stream. Its forceful presence symbolizes the boundless energy and expressive power that define our existence.\n\nAcross the gallery, a stark contrast emerges – the ominous whisper of “SILENCE,” delicately inscribed in a smaller font, leaving behind a vast, blank expanse. This wordless void represents the stillness and emptiness that accompany death’s inevitable embrace. In this electrifying journey, the gallery becomes a catalyst for introspection, challenging visitors to confront their own understanding of reality and the inherent paradoxes of existence. It invites us to embrace the complexities of life, to find our voice in the depths of silence, and to dance with uncertainty towards the horizon of our own mortality. Also, it is a thought-provoking journey into the realms of visibility and invisibility, perception and creation, where art finds its true essence in the shared experience of observation." }],
    },
    {
      id: "photos",
      label: "Photos",
      title: "Photos",
      blocks: [{ type: "gallery", layout: "stack", items: images }],
    },
  ],
};
