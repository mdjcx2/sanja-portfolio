import DarkNav from "../components/DarkNav";
import DarkPageHero from "../components/DarkPageHero";
import CaseFooter from "../components/case/CaseFooter";
import { publications } from "../../data/publications.js";
import { siteConfig } from "../../data/siteConfig.js";

export const metadata = {
  title: `Publications, ${siteConfig.name}`,
};

const label = {
  fontFamily: "var(--font-syne), sans-serif", fontSize: "0.5625rem", letterSpacing: "0.12em",
  textTransform: "uppercase", color: "rgba(240,237,232,0.6)", margin: "0 0 12px",
};

// Injected raw: a plain <style> child gets its quotes escaped on the server,
// which no longer matches the client text and breaks hydration.
const CSS = `
        .pb-hero { padding: 140px 64px 60px; }
        .pb-list { padding: 0 64px 120px; max-width: 1200px; display: flex; flex-direction: column; gap: 96px; }
        .pb-item { display: grid; grid-template-columns: minmax(0, 340px) minmax(0, 1fr); gap: 56px; align-items: start; }
        .pb-cover { width: 100%; height: auto; display: block; border-radius: 10px; box-shadow: 0 24px 60px rgba(0,0,0,0.45); }
        .pb-spreads { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin: 48px 0 0; padding: 0; list-style: none; }
        .pb-spreads img { width: 100%; height: auto; display: block; border-radius: 8px; }
        /* Odd count: the opening spread runs full width so none is left alone */
        .pb-spreads[data-odd="true"] li:first-child { grid-column: 1 / -1; }
        @media (max-width: 768px) {
          .pb-hero { padding: 100px 24px 48px; }
          .pb-list { padding: 0 24px 80px; gap: 72px; }
          .pb-item { grid-template-columns: 1fr; gap: 32px; }
          .pb-cover { max-width: 280px; }
          .pb-spreads { grid-template-columns: 1fr; }
        }
      `;

export default function PublicationsPage() {
  return (
    <div style={{ minHeight: "100vh", color: "#F0EDE8", position: "relative", zIndex: 1, background: "linear-gradient(to bottom, transparent 20%, rgba(2,4,8,0.48) 60%, rgba(2,4,8,0.66) 100%)" }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <DarkNav />

      <DarkPageHero
        className="pb-hero"
        label={siteConfig.name}
        heading="Publications"
        sub="Interviews and features about my work as a designer and educator."
      />

      <div className="pb-list">
        {publications.map((p) => (
          <article key={p.id} aria-labelledby={`${p.id}-title`}>
            <div className="pb-item">
              <img className="pb-cover" src={p.cover.src} alt={p.cover.alt} width={p.cover.width} height={p.cover.height} />
              <div style={{ paddingTop: 8 }}>
                <p style={label}>{p.kind} · {p.issue}</p>
                <h2 id={`${p.id}-title`} style={{
                  fontFamily: "var(--font-syne), sans-serif", fontWeight: 700,
                  fontSize: "clamp(1.8rem, 3.4vw, 2.8rem)", letterSpacing: "-0.03em",
                  color: "#F0EDE8", lineHeight: 1.1, margin: "0 0 20px",
                }}>
                  {p.title}
                </h2>
                <p style={{
                  fontFamily: "var(--font-syne), sans-serif", fontSize: "1rem",
                  color: "#fff", lineHeight: 1.75, margin: "0 0 20px", maxWidth: 520,
                }}>
                  {p.description}
                </p>
                <p style={{ ...label, margin: 0 }}>{p.publisher}</p>
              </div>
            </div>

            <ul className="pb-spreads" data-odd={p.spreads.length % 2 === 1} aria-label={`${p.title} spreads`}>
              {p.spreads.map((s) => (
                <li key={s.src}>
                  <img src={s.src} alt={s.alt} width={s.width} height={s.height} loading="lazy" decoding="async" />
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <CaseFooter />
    </div>
  );
}
