"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./ProjectCard.module.css";

const DEFAULT_GRADIENT = "linear-gradient(155deg, #020a18 0%, #071830 55%, #0a2040 100%)";

// The project card used everywhere (home, /portfolio, case study "Explore
// more"). Pass only the fields below; never a whole project object, which can
// carry case study prose into the client bundle.
// compact: cover and a smaller title only (case study "Explore more").
export default function ProjectCard({ slug, href, title, client, year, coverImage, coverGradient, headingLevel = 3, compact = false }) {
  const [failed, setFailed] = useState(false);
  const Heading = `h${headingLevel}`;

  return (
    <Link href={href || `/work/${slug}`} className={compact ? `${styles.card} ${styles.compact}` : styles.card}>
      <div className={styles.cover} style={{ background: coverGradient || DEFAULT_GRADIENT }}>
        {!coverImage || failed ? (
          <span className={styles.fallback} aria-hidden="true">{title}</span>
        ) : (
          <img
            src={coverImage}
            alt={client ? `${title} – ${client}` : title}
            className={styles.coverImg}
            loading="lazy"
            onError={() => setFailed(true)}
          />
        )}
      </div>
      {!compact && (
        <p className={styles.meta}>
          <span>{client}</span>
          {year && <span className={styles.year}>{year}</span>}
        </p>
      )}
      <div className={styles.titleRow}>
        <Heading className={styles.title}>{title}</Heading>
        <span className={styles.arrow} aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="9" y1="23" x2="23" y2="9" />
            <polyline points="10 9 23 9 23 22" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

