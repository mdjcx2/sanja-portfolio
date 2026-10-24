// Site-wide copy: name, bio, links, experience. Everything personal lives here;
// the pages only lay it out.
//
// Deliberately its own module, separate from `data/projects.js`, so client
// components (home, /about, /contact) don't pull case study content into their
// bundle.
//
// About copy is from sanjadevic.com/about and her 2025 CV
// (public/Sanja_Devic_CV_2025.pdf). TODO(Sanja): the site url is a placeholder.

export const siteConfig = {
  name: "Sanja Devic",
  // Two-to-six character wordmark shown in the nav.
  wordmark: "SD",
  url: "https://example.com",
  role: "Graphic Designer & Lecturer",
  tagline: "Graphic designer.",
  heroLine: "Graphic designer, artist and lecturer at the Faculty of Arts Niš.",
  bio: "Graphic designer, artist and lecturer at the Faculty of Arts Niš, Serbia, working with clients around the world.",
  email: "sanjadevic7@gmail.com", // as on her CV
  // Shown in the footer, on /contact and on the home page.
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/sanja-devic-12318850/" },
    { label: "Instagram", href: "https://www.instagram.com/sanja__devic/" },
    { label: "Pinterest", href: "https://www.pinterest.com/sanjadevic/" },
  ],
  // Drop a PDF in public/ and point to it, or set to null to hide the button.
  cvUrl: "/Sanja_Devic_CV_2025.pdf",

  aboutIntro: "I'm a graphic designer, an artist and a Professor of Spatial Graphics and Illustration at the Faculty of Arts Niš in Serbia.",
  aboutLocation: "Based in Niš, Serbia. Working with clients worldwide.",
  aboutBio: [
    "Hello, my name is Sanja Devic. I teach basics of graphic design, package design and illustration. I love teaching, as I get to work with young creatives who inspire me very much, and I do feel we are always making progress together.",
    "I've done a large number of projects for clients around the world in all areas of graphic design. I've also had many solo and group exhibitions, where I mostly like to show my work in visual and applied arts. I hold a few awards for my designs and am featured in a number of books and magazines at home and abroad.",
    "When I'm not teaching, I spend my free time crafting miniature books, sketching, creating new designs for clients or learning new skills. I'm constantly learning about design-related topics and love to read in general.",
  ],
  philosophy: "I love my job because of the variety of work I do and the fields I cover.",

  // Three headline facts under the About hero.
  proof: [
    { value: "Exhibitions", label: "20 solo, 60+ group", sub: "Worldwide" },
    { value: "Teaching", label: "Faculty of Arts Niš", sub: "Spatial graphics and illustration" },
    { value: "Awards", label: "Multiple design awards", sub: "Work featured in books and magazines" },
  ],

  // Optional highlight cards; set to [] to hide the section.
  highlights: [
    { stat: "MA", label: "Graphic Design", body: "M.A. from the Faculty of Fine Arts, Cetinje, University of Montenegro. Bachelor's and Master's in Design from the Faculty of Arts, Niš." },
    { stat: "Head", label: "Department of Applied Arts", body: "Chief of the Department of Applied Arts at the Faculty of Arts Niš, 2016–2021." },
    { stat: "Member", label: "ULUPUDS and IxDA Niš", body: "Member of ULUPUDS and the Interaction Design Association Niš." },
    { stat: "Best", label: "Student of the year", body: "Recognized as the best student by the University of Niš, 2006." },
  ],

  pillars: [
    { title: "Graphic design", body: "Branding and visual identity, typography and layout, editorial and print, package and interface design." },
    { title: "Teaching", body: "Spatial graphics and illustration, curriculum development, student mentorship and lecturing." },
    { title: "Art", body: "Solo and group exhibitions in visual and applied arts, installations and handmade miniature books." },
  ],

  experience: [
    {
      company: "Faculty of Arts Niš",
      role: "Full Professor of Spatial Graphics and Illustration",
      period: "2007 – Present",
      meta: "Niš, Serbia",
      pts: [
        "Full Professor since 2026; Associate Professor 2021–2026.",
        "Assistant Professor (docent) and Chief of the Department of Applied Arts, 2016–2021.",
        "Associate of Applied Arts, 2007–2016.",
      ],
      clients: null,
    },
    {
      company: "Dan Prosser Group",
      role: "Graphic designer",
      period: "2010 – 2019",
      meta: "danprosser.com",
      pts: ["Logo designs and corporate identities for companies founded by Dan Prosser Group, book cover design and website graphics."],
      clients: "todolee.com · Connecting Points · Accountability Scorecard · executionworks.com · Best Places to Work",
    },
    {
      company: "Publishing house Zograf",
      role: "Editorial designer",
      period: "2007 – 2010",
      meta: "Niš, Serbia",
      pts: ["Book design: layout, typography and covers, plus magazines and other publications."],
      clients: null,
    },
    {
      company: "Logic Center",
      role: "Art Director & Co-Founder",
      period: "2003 – 2012",
      meta: "Niš, Serbia",
      pts: ["Led creative direction, brand vision and visual identity, and drove the agency's business development."],
      clients: null,
    },
    {
      company: "Elance",
      role: "Graphic designer",
      period: "2003 – 2010",
      meta: "Remote",
      pts: ["Branding, digital and print design for clients across industries, from concept to execution."],
      clients: null,
    },
  ],
  earlier: null, // e.g. "Earlier: Studio X · Agency Y"

  // Short lists under Experience on /about.
  cvLists: [
    {
      label: "Education",
      items: [
        { title: "MA II Degree in Graphic Design", place: "Faculty of Fine Arts Cetinje, Montenegro", period: "2010 – 2013" },
        { title: "Bachelor and Master of Graphic Design", place: "Faculty of Arts Niš, Serbia", period: "2000 – 2005" },
        { title: "Department of Textile Design", place: "Art School in Niš, Serbia", period: "1994 – 1998" },
      ],
    },
    {
      label: "Selected awards",
      items: [
        { title: "Certificate of Appreciation", place: "Local Ombudsman of the City of Niš", period: "2022" },
        { title: "Certificate of Appreciation", place: "Faculty of Arts in Niš", period: "2022" },
        { title: "Award, Europe Is Here 2021", place: "Interactive installation, King Milan Square, Niš", period: "2021" },
        { title: "First Prize, Art in Miniature", place: "International competition, Majdanpek, Serbia", period: "2017" },
        { title: "Two prizes, Cook Up Your Design", place: "Metalac d.o.o.", period: "2017" },
        { title: "Second place, logo design competition", place: "American Embassy in Podgorica, Montenegro", period: "2013" },
        { title: "Student of the Year", place: "University of Niš", period: "2006" },
      ],
    },
  ],

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
