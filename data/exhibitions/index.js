// Exhibitions and workshops, in the order of sanjadevic.com/exhibitions.
// Each renders at /exhibitions/<slug> on the case study template.
import { posterraProject } from "./posterraProject.js";
import { catalystOfPerception } from "./catalystOfPerception.js";
import { disorderlyDimensions } from "./disorderlyDimensions.js";
import { fluidWorkshop } from "./fluidWorkshop.js";
import { blockTypographicHeritage } from "./blockTypographicHeritage.js";
import { miniatureBooks } from "./miniatureBooks.js";
import { exhibitionMix } from "./exhibitionMix.js";
import { chapterZero } from "./chapterZero.js";

export const exhibitions = [
  posterraProject,
  catalystOfPerception,
  disorderlyDimensions,
  fluidWorkshop,
  blockTypographicHeritage,
  miniatureBooks,
  exhibitionMix,
  chapterZero,
];

export const exhibitionBySlug = Object.fromEntries(exhibitions.map((e) => [e.slug, e]));

// The fields a ProjectCard needs, from an exhibition (for /exhibitions and
// "Explore more").
export const exhibitionCard = (e) => ({ slug: e.slug, href: e.href, title: e.title, ...e.card });
