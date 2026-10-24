import { notFound } from "next/navigation";
import CaseStudyPage from "../../components/case/CaseStudyPage";
import ExploreCarousel from "../../components/case/ExploreCarousel";
import CaseSectionNav from "../../components/case/CaseSectionNav";
import { exhibitions, exhibitionBySlug, exhibitionCard } from "../../../data/exhibitions/index.js";
import { siteConfig } from "../../../data/siteConfig.js";

export function generateStaticParams() {
  return exhibitions.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }) {
  const e = exhibitionBySlug[params.slug];
  return e ? { title: `${e.title}, ${siteConfig.name}` } : {};
}

export default function Exhibition({ params }) {
  const e = exhibitionBySlug[params.slug];
  if (!e) notFound();
  const toc = e.sections.map(({ id, label }) => ({ id, label }));
  return (
    <CaseStudyPage
      cs={e}
      toc={<CaseSectionNav sections={toc} />}
      explore={<ExploreCarousel slugs={e.explore} pool={exhibitions.map(exhibitionCard)} />}
    />
  );
}
