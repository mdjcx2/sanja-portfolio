"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ListBullets, X } from "@phosphor-icons/react";
import Button from "../Button";
import styles from "./case.module.css";

// Fixed "contents" button that opens a left drawer of section links.
// Scroll tracking lives in CaseSectionNav; this is the button and drawer.
// sections: { id, label }[] · active: current id · visible: show the button
export default function TocDrawer({ sections, active, visible, onGo }) {
  const [open, setOpen] = useState(false);
  const button = useRef(null);
  const drawer = useRef(null);

  const close = useCallback(() => {
    setOpen(false);
    button.current?.focus();
  }, []);

  // While open: focus the first link, trap Tab inside, Esc closes.
  useEffect(() => {
    if (!open) return;
    const focusables = () => [...drawer.current.querySelectorAll("button, a[href]")];
    focusables()[1]?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") return close();
      if (e.key !== "Tab") return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  const go = (e, id) => {
    e.preventDefault();
    setOpen(false);
    onGo(id);
  };

  const shown = visible || open;

  return (
    <>
      <div className={styles.tocButton} data-visible={shown}>
        <Button ref={button} variant="tonal" size="lg" iconLeft={<ListBullets weight="bold" />}
          aria-label="Open table of contents" aria-expanded={open} aria-controls="case-toc"
          onClick={() => setOpen(true)} tabIndex={shown ? 0 : -1} />
      </div>

      <div className={styles.tocBackdrop} data-open={open} onClick={close} aria-hidden="true" />
      <nav ref={drawer} id="case-toc" className={styles.toc} data-open={open} aria-label="On this page"
        aria-hidden={!open} inert={open ? undefined : ""}>
        <div className={styles.tocHead}>
          <span className={styles.label}>On this page</span>
          <Button variant="ghost" size="sm" iconLeft={<X weight="bold" />} onClick={close}
            aria-label="Close table of contents" />
        </div>
        <ul className={styles.tocList}>
          {sections.map(({ id, label }) => (
            <li key={id}>
              <a href={`#${id}`} onClick={(e) => go(e, id)} className={styles.tocLink}
                aria-current={active === id ? "location" : undefined}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
