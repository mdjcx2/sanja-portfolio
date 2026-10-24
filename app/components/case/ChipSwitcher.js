"use client";

import { useId, useRef, useState } from "react";
import styles from "./case.module.css";
import { Icon } from "./icons";
import Button from "../Button";

// Tabs that switch the media below: tonal buttons, the selected one filled.
// ←/→ move, Home/End jump.
export default function ChipSwitcher({ items }) {
  const [index, setIndex] = useState(0);
  const tabs = useRef([]);
  const id = useId();

  const select = (i) => {
    const next = (i + items.length) % items.length;
    setIndex(next);
    tabs.current[next]?.focus();
  };

  const onKeyDown = (e) => {
    const moves = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: items.length - 1 };
    if (e.key in moves) {
      e.preventDefault();
      select(moves[e.key]);
    }
  };

  const current = items[index];

  return (
    <div className={styles.figure}>
      <div role="tablist" aria-label="Screens" className={styles.chips} onKeyDown={onKeyDown}>
        {items.map((item, i) => (
          <Button key={item.label} role="tab" id={`${id}-tab-${i}`}
            ref={(el) => { tabs.current[i] = el; }}
            aria-selected={i === index} aria-controls={`${id}-panel`} tabIndex={i === index ? 0 : -1}
            variant={i === index ? "filled" : "tonal"} size="sm" onClick={() => setIndex(i)}
            iconLeft={<Icon name={item.icon} />}>
            {item.label}
          </Button>
        ))}
      </div>
      <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${index}`}>
        <div className={styles.frame}>
          {items.map((item, i) => (
            <img key={item.src} src={item.src} width={item.width} height={item.height} loading="lazy"
              alt={i === index ? item.caption : ""} aria-hidden={i === index ? undefined : true}
              className={styles.chipMedia} data-active={i === index} />
          ))}
        </div>
        <p className={styles.caption}>{current.caption}</p>
      </div>
    </div>
  );
}
