"use client";

import { ArrowDown, ArrowUp } from "@phosphor-icons/react";
import Button from "../Button";
import styles from "./case.module.css";

// Bottom-right paginator: one dot per section (hover or focus shows its
// name) and a next-section arrow that turns into Back to top on the last one.
// Desktop only; phones use the contents button.
export default function SectionPager({ sections, active, hidden, onGo, onTop }) {
  const index = sections.findIndex((s) => s.id === active);
  const next = sections[index + 1];

  return (
    <nav className={styles.pager} data-hidden={hidden} aria-label="Sections" inert={hidden ? "" : undefined}>
      <ol className={styles.pagerDots}>
        {sections.map(({ id, label }) => (
          <li key={id}>
            <a href={`#${id}`} className={styles.pagerDot} aria-current={active === id ? "location" : undefined}
              onClick={(e) => { e.preventDefault(); onGo(id); }}>
              <span className={styles.pagerTip}>{label}</span>
            </a>
          </li>
        ))}
      </ol>
      <span className={styles.pagerArrow} data-label={next ? next.label : "Back to top"}>
        <Button variant="tonal" size="md"
          iconLeft={next ? <ArrowDown weight="bold" /> : <ArrowUp weight="bold" />}
          aria-label={next ? `Next section: ${next.label}` : "Back to top"}
          onClick={() => (next ? onGo(next.id) : onTop())} />
      </span>
    </nav>
  );
}
