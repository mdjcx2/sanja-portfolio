import { notFound } from "next/navigation";
import CaseStudyPage from "../../components/case/CaseStudyPage";
import ExploreCarousel from "../../components/case/ExploreCarousel";
import CaseSectionNav from "../../components/case/CaseSectionNav";
import { caseStudies } from "../../../data/caseStudies/index.js";
import { siteConfig } from "../../../data/siteConfig.js";

export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const cs = caseStudies[params.slug];
  return cs ? { title: `${cs.title}, ${siteConfig.name}` } : {};
}

export default function CaseStudy({ params }) {
  const cs = caseStudies[params.slug];
  if (!cs) notFound();
  const toc = cs.sections.map(({ id, label }) => ({ id, label }));
  return (
    <CaseStudyPage cs={cs} toc={<CaseSectionNav sections={toc} />} explore={<ExploreCarousel slugs={cs.explore ?? []} />} />
  );
}
