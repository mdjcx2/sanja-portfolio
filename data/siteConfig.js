// Site-wide copy: name, bio, links, experience. Everything personal lives here;
// the pages only lay it out.
//
// Deliberately its own module, separate from `data/projects.js`, so client
// components (home, /about, /contact) don't pull case study content into their
// bundle.
//
// About copy is from sanjadevic.com/about. TODO(Sanja): email and site url are
// still placeholders.

export const siteConfig = {
  name: "Sanja Devic",
  // Two-to-six character wordmark shown in the nav.
  wordmark: "SD",
  url: "https://example.com",
  role: "Graphic Designer & Lecturer",
  tagline: "Graphic designer.",
  heroLine: "Graphic designer, artist and lecturer at the Faculty of Arts Niš.",
  bio: "Graphic designer, artist and lecturer at the Faculty of Arts Niš, Serbia, working with clients around the world.",
  email: "hello@example.com",
  // Shown in the footer, on /contact and on the home page.
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/sanja-devic-12318850/" },
    { label: "Instagram", href: "https://www.instagram.com/sanja__devic/" },
    { label: "Pinterest", href: "https://www.pinterest.com/sanjadevic/" },
  ],
  // Drop a PDF in public/ and point to it, or set to null to hide the button.
  cvUrl: null,

  aboutIntro: "I'm a graphic designer, an artist and a lecturer at the Faculty of Arts Niš in Serbia.",
  aboutLocation: "Based in Niš, Serbia. Working with clients worldwide.",
  aboutBio: [
    "Hello, my name is Sanja Devic. I teach basics of graphic design, package design and illustration. I love teaching, as I get to work with young creatives who inspire me very much, and I do feel we are always making progress together.",
    "I've done a large number of projects for clients around the world in all areas of graphic design. I've also had many solo and group exhibitions, where I mostly like to show my work in visual and applied arts. I hold a few awards for my designs and am featured in a number of books and magazines at home and abroad.",
    "When I'm not teaching, I spend my free time crafting miniature books, sketching, creating new designs for clients or learning new skills. I'm constantly learning about design-related topics and love to read in general.",
  ],
  philosophy: "I love my job because of the variety of work I do and the fields I cover.",

  // Three headline facts under the About hero.
  proof: [
    { value: "Teaching", label: "Faculty of Arts Niš", sub: "Graphic design · Package design · Illustration" },
    { value: "Exhibitions", label: "Solo and group shows", sub: "Visual and applied arts" },
    { value: "Clients", label: "Around the world", sub: "All areas of graphic design" },
  ],

  // Optional highlight cards; set to [] to hide the section.
  highlights: [],

  pillars: [
    { title: "Graphic design", body: "Projects for clients around the world, across all areas of graphic design." },
    { title: "Teaching", body: "Basics of graphic design, package design and illustration at the Faculty of Arts Niš." },
    { title: "Art", body: "Solo and group exhibitions in visual and applied arts, and handmade miniature books." },
  ],

  experience: [
    {
      company: "Faculty of Arts Niš",
      role: "Lecturer",
      period: "Present",
      meta: "Niš, Serbia",
      pts: ["Teaches basics of graphic design, package design and illustration."],
      clients: null,
    },
    {
      company: "Independent practice",
      role: "Graphic designer",
      period: "Present",
      meta: "Clients worldwide",
      pts: ["Logo, identity, package and print design for clients around the world."],
      clients: null,
    },
  ],
  earlier: null, // e.g. "Earlier: Studio X · Agency Y"

  // Photo-and-text section on /about; set to null to hide it.
  away: {
    label: "How I work",
    title: "Pencil first",
    photos: [{ src: "/images/about-sanja.jpg", alt: "Sanja working at a laptop covered in design stickers" }],
    paragraphs: [
      "My design process always starts with a bit of research, and then a pencil and paper: sketching ideas and concepts, thinking about the problem and the solution.",
      "Once I have an idea of what I want to achieve, I sit down at my computer and start drawing.",
    ],
    stats: [],
  },

  // Home page "What I do" section: cards, then labelled name rows. Wording
  // from her About, Portfolio and Exhibitions pages on sanjadevic.com.
  // icon: a key of SCALE_ICONS in app/page.js.
  scale: {
    title: "What I do",
    cards: [
      { icon: "pen", title: "Graphic design", desc: "Projects for clients around the world, in all areas of graphic design." },
      { icon: "package", title: "Logo, package & UI design", desc: "Logos, packaging and interfaces. Selected work includes Metalac cookware." },
      { icon: "teach", title: "Teaching", desc: "Basics of graphic design, package design and illustration at the Faculty of Arts Niš." },
      { icon: "frame", title: "Exhibitions & workshops", desc: "Solo and group exhibitions in visual and applied arts, workshops and handmade miniature books." },
    ],
    rows: [
      {
        label: "Exhibitions and workshops",
        items: [
          "Posterra Project",
          "Catalyst of Perception: Luminescent Duality",
          "Disorderly Dimensions: A Chaotic Journey",
          "Fluid Workshop",
          "Block – Typographic Heritage in the Assembly System",
          "Miniature Books",
          "Exhibition Mix",
          "Chapter Zero",
        ],
      },
      { label: "Teaching and press", items: ["Faculty of Arts Niš", "Aperto Magazine"] },
    ],
  },

  // Home page contact section.
  contactLine: "For projects in all areas of graphic design, for clients around the world.",

  skills: ["Graphic design", "Logo design", "Package design", "Illustration", "Teaching"],
};
