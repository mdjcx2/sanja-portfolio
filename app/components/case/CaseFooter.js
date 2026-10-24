"use client";

import { siteConfig } from "../../../data/siteConfig.js";
import ScrambleLink from "./ScrambleLink";
import styles from "./case.module.css";

// The site footer (every dark page): one quiet mono row, as on graceguo.io.
export default function CaseFooter() {
  // Back to top scrolls the page and hands focus to the nav's wordmark,
  // so keyboard users land at the start too. Works on pages without #main-content.
  const toTop = (e) => {
    e.preventDefault();
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    window.scrollTo({ top: 0, behavior });
    // Some pages scroll inside their own container instead of the window.
    for (let el = e.currentTarget.parentElement; el; el = el.parentElement) {
      if (/(auto|scroll)/.test(getComputedStyle(el).overflowY) && el.scrollHeight > el.clientHeight) el.scrollTo({ top: 0, behavior });
    }
    document.querySelector('header [data-tour="logo"]')?.focus({ preventScroll: true });
  };

  return (
    <footer data-site-footer className={`${styles.footer} ${styles.label}`}>
      <span>© {siteConfig.name} {new Date().getFullYear()}</span>
      <span className={styles.footerLinks}>
        {siteConfig.socials.map(({ label, href }) => (
          <ScrambleLink key={label} label={label} href={href} external />
        ))}
        <ScrambleLink label="Email" href={`mailto:${siteConfig.email}`} />
        {siteConfig.cvUrl && <ScrambleLink label="CV" href={siteConfig.cvUrl} download />}
      </span>
      <ScrambleLink label="Back to top ↑" href="#top" onClick={toTop} />
    </footer>
  );
}
