"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { siteConfig } from "../../../data/siteConfig.js";
import LookPanel from "../LookPanel";
import FullscreenMenu from "../FullscreenMenu";
import ContactModal from "../ContactModal";
import { CONTACT_OPEN_EVENT, openContactFromClick } from "../contactModalEvent";
import styles from "./nav.module.css";
import ScrambleLink from "./ScrambleLink";

// The site nav (case pages directly, every other dark page through DarkNav).
// Desktop is modelled on graceguo.io: links that scramble on hover and a
// gradient that fades in once the page scrolls, in the site's own type, with
// the site cog on the right. Below 768px it opens the site's full-screen menu.
const LINKS = [
  { label: "Work", href: "/portfolio", also: ["/work"] },
  { label: "About", href: "/about" },
  { label: "Process", href: "/process" },
  { label: "Contact", href: "/contact", onClick: openContactFromClick },
];

// Same cog as DarkNav, so the control reads the same across the site.
function CogIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

// visible: fades the bar in (the home page waits for its loader).
// onLogoClick: the wordmark becomes a button (home scrolls to the top).
// withBottomTabs: the full-screen menu leaves room for DarkNav's phone tab bar.
export default function CaseNav({ visible = true, onLogoClick, withBottomTabs = false }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hasCover, setHasCover] = useState(false);
  const [open, setOpen] = useState(false);
  const [cogOpen, setCogOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const router = useRouter();
  const cogButton = useRef(null);
  const menuButton = useRef(null);

  useEffect(() => {
    setHasCover(!!document.querySelector("[data-case-cover]"));
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeCog = useCallback(() => {
    setCogOpen(false);
    cogButton.current?.focus();
  }, []);

  const restartTour = () => {
    setCogOpen(false);
    try { localStorage.removeItem("tour_seen"); } catch {}
    window.dispatchEvent(new Event("tour:restart"));
    if (window.location.pathname !== "/") router.push("/");
  };

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
          <button type="button" data-tour="logo" onClick={onLogoClick} className={`${styles.wordmark} ${styles.wordmarkButton}`} aria-label={`${siteConfig.name ?? "Home"}, back to top`}>{siteConfig.wordmark}</button>
        ) : (
          <Link href="/" data-tour="logo" className={styles.wordmark} aria-label={`${siteConfig.name ?? "Home"}, home`}>{siteConfig.wordmark}</Link>
        )}

        <nav aria-label="Main" className={styles.links}>
          {LINKS.map((l) => (
            <ScrambleLink key={l.label} {...l} current={!l.external && isCurrent(l)} className={styles.link} />
          ))}
        </nav>


        <button ref={cogButton} type="button" className={styles.iconButton} data-tour="gear"
          onClick={() => setCogOpen((v) => !v)} aria-label="Background settings" title="Background settings"
          aria-haspopup="dialog" aria-expanded={cogOpen}>
          <CogIcon />
        </button>

        <button ref={menuButton} type="button" className={styles.menuButton} onClick={() => setOpen((v) => !v)}
          aria-expanded={open} aria-controls="site-menu" aria-label={open ? "Close menu" : "Open menu"}>
          {open ? "Close" : "Menu"}
        </button>
      </header>

      <LookPanel open={cogOpen} onClose={closeCog} onRestartTour={restartTour} />

      <ContactModal open={contactOpen} onClose={closeContact} />

      <FullscreenMenu open={open} onClose={closeMenu} toggleRef={menuButton} withBottomTabs={withBottomTabs} />
    </>
  );
}
