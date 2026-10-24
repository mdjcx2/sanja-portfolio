// Site-wide copy: name, bio, links, experience. Everything personal lives here;
// the pages only lay it out.
//
// Deliberately its own module, separate from `data/projects.js`, so client
// components (home, /about, /contact) don't pull case study content into their
// bundle.
//
// TODO(Sanja): every value below is a placeholder. Replace with real content.

export const siteConfig = {
  name: "Sanja Devic",
  // Two-to-six character wordmark shown in the nav.
  wordmark: "SD",
  url: "https://example.com",
  role: "Designer",
  tagline: "Designer.",
  heroLine: "Placeholder one-liner about how Sanja works.",
  bio: "Placeholder: one sentence on the kind of work Sanja does.",
  email: "hello@example.com",
  linkedin: "https://www.linkedin.com/",
  dribbble: "https://dribbble.com/",
  behance: "https://www.behance.net/",
  // Drop a PDF in public/ and point to it, or set to null to hide the button.
  cvUrl: null,

  aboutIntro: "Placeholder intro: what Sanja designs and why.",
  aboutLocation: "Based in Niš, Serbia. Working globally.",
  aboutBio: [
    "Placeholder paragraph one: background and years of practice.",
    "Placeholder paragraph two: industries, places and teams.",
    "Placeholder paragraph three: what drives the work.",
  ],
  philosophy: "Placeholder: a short line Sanja believes about design.",

  // Three headline facts under the About hero.
  proof: [
    { value: "00+", label: "Years of practice", sub: "Industry · industry" },
    { value: "Award", label: "Placeholder award", sub: "Company" },
    { value: "Clients", label: "Client · Client · Client", sub: "Client · Client" },
  ],

  // Optional highlight cards; set to [] to hide the section.
  highlights: [
    { stat: "00", label: "Placeholder highlight", body: "One or two sentences about this highlight." },
    { stat: "00", label: "Placeholder highlight", body: "One or two sentences about this highlight." },
    { stat: "00", label: "Placeholder highlight", body: "One or two sentences about this highlight." },
    { stat: "00", label: "Placeholder highlight", body: "One or two sentences about this highlight." },
  ],

  pillars: [
    { title: "Placeholder skill", body: "What this means in Sanja's work." },
    { title: "Placeholder skill", body: "What this means in Sanja's work." },
    { title: "Placeholder skill", body: "What this means in Sanja's work." },
  ],

  experience: [
    {
      company: "Company A",
      role: "Role title",
      period: "2022 – Present",
      meta: "Remote · City, Country",
      pts: ["What Sanja did here.", "A result worth mentioning."],
      clients: "Client · Client",
    },
    {
      company: "Company B",
      role: "Role title",
      period: "2018 – 2022",
      meta: "Hybrid · City, Country",
      pts: ["What Sanja did here.", "A result worth mentioning."],
      clients: null,
    },
  ],
  earlier: null, // e.g. "Earlier: Studio X · Agency Y"

  // "Away from the screen" section on /about; set to null to hide it.
  away: {
    title: "Placeholder hobby",
    photos: [], // e.g. [{ src: "/images/about-1.jpg", alt: "…" }]
    paragraphs: [
      "Placeholder: what Sanja does away from the screen.",
      "Placeholder: how it connects to the way Sanja designs.",
    ],
    stats: [
      { value: "00", label: "Placeholder", sub: "Year" },
      { value: "00", label: "Placeholder" },
    ],
  },

  // Name rows in the home "Scale" section.
  clients: ["Client A", "Client B", "Client C"],
  employers: ["Company A", "Company B"],

  skills: ["Skill", "Skill", "Skill", "Skill"],
};
