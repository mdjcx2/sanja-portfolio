// Case studies by slug. Add each new data/caseStudies/<name>.js here.
// sampleProject.js is a template to copy; it isn't registered.
import { logoDesigns } from "./logoDesigns.js";
import { packageDesign } from "./packageDesign.js";
import { uiDesign } from "./uiDesign.js";
import { metalacCookware } from "./metalacCookware.js";

export const caseStudies = Object.fromEntries(
  [logoDesigns, packageDesign, uiDesign, metalacCookware].map((cs) => [cs.slug, cs]),
);
