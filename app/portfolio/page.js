"use client";

import { useState, useEffect } from "react";
import { projects, projectGroups } from "../../data/projects";
import { siteConfig } from "../../data/siteConfig.js";
import DarkNav from "../components/DarkNav";
import DarkPageHero from "../components/DarkPageHero";
import CaseFooter from "../components/case/CaseFooter";
import ProjectCard from "../components/ProjectCard";
import { cardProps } from "../../lib/projectCard.js";

const CSS = `
  .pw-hero { padding: 140px 64px 60px; }
  @media (max-width: 900px) {
    .pw-hero { padding: 100px 24px 48px !important; }
    .pf-section { padding: 0 24px 80px !important; }
  }
`;

export default function PortfolioPage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ minHeight: "100vh", color: "#fff", position: "relative", zIndex: 1 }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <DarkNav />
      <DarkPageHero
        className="pw-hero"
        label={`${siteConfig.name} · ${siteConfig.role}`}
        heading="Work"
        sub="Placeholder: one line on the kind of work below."
      />

      <section className="pf-section" style={{ padding: "0 64px 80px" }}>
        <div style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.4s ease" }}>
          {projectGroups.map(({ key, label }) => {
            const groupProjs = projects.filter(p => p.group === key);
            if (groupProjs.length === 0) return null;
            return (
              <div key={key} style={{ marginBottom: 56 }}>
                <p style={{
                  fontFamily: "var(--font-syne), sans-serif",
                  fontSize: "1rem", fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "#fff", lineHeight: 1,
                  margin: "0 0 16px",
                }}>
                  {label}
                </p>
                <div className="project-grid">
                  {groupProjs.map(p => (
                    <ProjectCard key={p.slug} {...cardProps(p)} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <CaseFooter />
    </div>
  );
}
