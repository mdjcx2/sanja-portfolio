// Case studies by slug. Add each new data/caseStudies/<name>.js here.
import { sampleProject } from "./sampleProject.js";

// TODO(Sanja): project-two and project-three reuse the sample until they get
// their own files, so every card on the site opens a page.
const placeholder = (slug, title, explore) => ({ ...sampleProject, slug, title, explore });

export const caseStudies = Object.fromEntries(
  [
    sampleProject,
    placeholder("project-two", "Project Two", ["sample-project", "project-three"]),
    placeholder("project-three", "Project Three", ["sample-project", "project-two"]),
  ].map((cs) => [cs.slug, cs]),
);
