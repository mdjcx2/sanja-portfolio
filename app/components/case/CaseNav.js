"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "../../../data/siteConfig.js";
import FullscreenMenu from "../FullscreenMenu";
import ContactModal from "../ContactModal";
import { CONTACT_OPEN_EVENT, openContactFromClick } from "../contactModalEvent";
import styles from "./nav.module.css";
import ScrambleLink from "./ScrambleLink";
import Logo from "../Logo";

// The site nav (case pages directly, every other dark page through DarkNav).
// Desktop is modelled on graceguo.io: links that scramble on hover and a
// gradient that fades in once the page scrolls, in the site's own type.
// Below 768px it opens the site's full-screen menu.
const LINKS = [
  { label: "Work", href: "/portfolio", also: ["/work"] },
  { label: "Publications", href: "/publications" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact", onClick: openContactFromClick },
];

// visible: fades the bar in (the home page waits for its loader).
// onLogoClick: the wordmark becomes a button (home scrolls to the top).
// withBottomTabs: the full-screen menu leaves room for DarkNav's phone tab bar.
export default function CaseNav({ visible = true, onLogoClick, withBottomTabs = false }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hasCover, setHasCover] = useState(false);
  const [open, setOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const menuButton = useRef(null);

  useEffect(() => {
    setHasCover(!!document.querySelector("[data-case-cover]"));
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => {
    setOpen(false);
    menuButton.current?.focus();
  }, []);

  const closeContact = useCallback(() => setContactOpen(false), []);
  useEffect(() => {
    const onOpen = () => { setOpen(false); setContactOpen(true); };
    window.addEventListener(CONTACT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(CONTACT_OPEN_EVENT, onOpen);
  }, []);

  // Close the menu when the route changes (a link was followed)
  useEffect(() => setOpen(false), [pathname]);

  const under = (href) => pathname === href || pathname.startsWith(href + "/");
  const isCurrent = ({ href, also = [] }) => [href, ...also].some(under);

  return (
    <>
      {/* Over a cover photo the bar uses light ink in both themes until the page scrolls */}
      <header className={styles.bar} data-on-cover={hasCover && !scrolled && !open} data-menu-open={open} data-hidden={!visible}>
        <span aria-hidden="true" className={styles.scrim} data-on={scrolled} />
        {onLogoClick ? (
          <button type="button" data-tour="logo" onClick={onLogoClick} className={`${styles.wordmark} ${styles.wordmarkButton}`} aria-label={`${siteConfig.name ?? "Home"}, back to top`}><Logo size={28} /></button>
        ) : (
          <Link href="/" data-tour="logo" className={styles.wordmark} aria-label={`${siteConfig.name ?? "Home"}, home`}><Logo size={28} /></Link>
        )}

        <nav aria-label="Main" className={styles.links}>
          {LINKS.map((l) => (
            <ScrambleLink key={l.label} {...l} current={!l.external && isCurrent(l)} className={styles.link} />
          ))}
        </nav>

        <button ref={menuButton} type="button" className={styles.menuButton} onClick={() => setOpen((v) => !v)}
          aria-expanded={open} aria-controls="site-menu" aria-label={open ? "Close menu" : "Open menu"}>
          {open ? "Close" : "Menu"}
        </button>
      </header>

      <ContactModal open={contactOpen} onClose={closeContact} />

      <FullscreenMenu open={open} onClose={closeMenu} toggleRef={menuButton} withBottomTabs={withBottomTabs} />
    </>
  );
}
