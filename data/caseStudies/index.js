// Case studies by slug. Add each new data/caseStudies/<name>.js here.
import { sampleProject } from "./sampleProject.js";
import { logoDesigns } from "./logoDesigns.js";

// TODO(Sanja): project-two and project-three reuse the sample until they get
// their own files, so every card on the site opens a page.
const placeholder = (slug, title, explore) => ({ ...sampleProject, slug, title, explore });

export const caseStudies = Object.fromEntries(
  [
    logoDesigns,
    sampleProject,
    placeholder("project-two", "Project Two", ["logo-designs", "sample-project"]),
    placeholder("project-three", "Project Three", ["logo-designs", "project-two"]),
  ].map((cs) => [cs.slug, cs]),
);
