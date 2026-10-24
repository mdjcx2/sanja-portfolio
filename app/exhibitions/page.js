import DarkNav from "../components/DarkNav";
import DarkPageHero from "../components/DarkPageHero";
import CaseFooter from "../components/case/CaseFooter";
import ProjectCard from "../components/ProjectCard";
import { cardProps } from "../../lib/projectCard.js";
import { exhibitions, exhibitionCard } from "../../data/exhibitions/index.js";
import { siteConfig } from "../../data/siteConfig.js";

export const metadata = {
  title: `Exhibitions, ${siteConfig.name}`,
};

// Injected raw so the server and client render identical text.
const CSS = `
  .ex-hero { padding: 140px 64px 60px; }
  .ex-section { padding: 0 64px 80px; }
  @media (max-width: 900px) {
    .ex-hero { padding: 100px 24px 48px; }
    .ex-section { padding: 0 24px 80px; }
  }
`;

export default function ExhibitionsPage() {
  return (
    <div style={{ minHeight: "100vh", color: "#fff", position: "relative", zIndex: 1 }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <DarkNav />
      <DarkPageHero
        className="ex-hero"
        label={siteConfig.name}
        heading="Exhibitions"
        sub="Solo and group exhibitions, installations, residencies and workshops."
      />

      <section className="ex-section" aria-label="Exhibitions and workshops">
        <div className="project-grid">
          {exhibitions.map((e) => (
            <ProjectCard key={e.slug} {...cardProps(exhibitionCard(e))} />
          ))}
        </div>
      </section>

      <CaseFooter />
    </div>
  );
}
