import { projects } from "../../../data/projects.js";
import { cardProps } from "../../../lib/projectCard.js";
import ProjectCard from "../ProjectCard";
import styles from "./case.module.css";

// "Explore more": a snap-scrolling row of the site's project cards.
// Only cardProps() fields cross to the client component, never case prose.
// pool: where the slugs are looked up (default: projects; exhibitions pass
// their own cards).
export default function ExploreCarousel({ slugs, pool = projects }) {
  const cards = slugs.map((slug) => pool.find((p) => p.slug === slug && !p.draft)).filter(Boolean);
  if (cards.length === 0) return null;

  return (
    <section className={`${styles.column} ${styles.section}`} aria-labelledby="explore-more">
      <h2 id="explore-more" className={styles.h2}>Explore more</h2>
      <ul className={styles.explore} tabIndex={0} aria-label="More projects">
        {cards.map((p) => (
          <li key={p.slug} className={styles.exploreItem}>
            <ProjectCard {...cardProps(p)} compact />
          </li>
        ))}
      </ul>
    </section>
  );
}
