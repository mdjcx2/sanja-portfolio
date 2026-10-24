import { normalizeSection } from "../../../lib/caseStudy/blocks.js";
import styles from "./case.module.css";
import { renderBlock } from "./Blocks";
import CaseCover from "./CaseCover";
import CaseFooter from "./CaseFooter";
import CaseNav from "./CaseNav";
import Reveal from "./Reveal";

// Block-based case study page.
// Spec: docs/superpowers/specs/2026-10-23-case-study-template.md
export default function CaseStudyPage({ cs, toc = null, explore = null }) {
  const sections = cs.sections.map(normalizeSection);

  return (
    <>
      <CaseNav />
      <main id="main-content" className={styles.page} data-case-page>
        {cs.cover && <CaseCover {...cs.cover} />}

        <header className={`${styles.column} ${styles.header}`}>
          <p className={styles.eyebrow}>{cs.eyebrow}</p>
          <h1 className={styles.title}>{cs.title}</h1>
          <p className={styles.lede}>{cs.lede}</p>
          <hr className={styles.divider} />
          <dl className={styles.meta}>
            {cs.meta.map(({ label, value }) => (
              <div key={label}>
                <dt className={styles.label}>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </header>

        {sections.map((section) => (
          <section key={section.id} id={section.id} tabIndex={-1} className={`${styles.column} ${styles.section}`}>
            <Reveal>
              <h2 className={styles.h2}>{section.title}</h2>
            </Reveal>
            {section.blocks.map((block, i) => (
              <Reveal key={i}>{renderBlock(block, i)}</Reveal>
            ))}
          </section>
        ))}

        {explore}
      </main>
      {toc}
      <CaseFooter />
    </>
  );
}
