"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { activeSectionId } from "../../../lib/caseStudy/geometry.js";
import SectionPager from "./SectionPager";
import TocDrawer from "./TocDrawer";

const SHOW_AFTER = 480; // px scrolled before the contents button appears

// Section navigation for every case study page: the contents button and
// drawer (bottom left) and the paginator (bottom right), sharing one idea of
// the current section. Pass sections ({ id, label }[]) or leave it out and
// mark sections in the page with data-toc="Label"; they're found on mount.
// Works whether the page scrolls the window or its own container.
export default function CaseSectionNav({ sections: given }) {
  const [sections, setSections] = useState(given || []);
  const [active, setActive] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [footerInView, setFooterInView] = useState(false);
  const scroller = useRef(null);

  // Find the sections (if not given) and the element that scrolls them.
  useEffect(() => {
    let list = given;
    if (!list) {
      list = [...document.querySelectorAll("[data-toc]")].map((el, i) => {
        if (!el.id) el.id = `section-${i + 1}`;
        return { id: el.id, label: el.dataset.toc };
      });
      setSections(list);
    }
    const first = list[0] && document.getElementById(list[0].id);
    let box = null;
    for (let el = first?.parentElement; el && el !== document.body; el = el.parentElement) {
      if (/(auto|scroll)/.test(getComputedStyle(el).overflowY) && el.scrollHeight > el.clientHeight) { box = el; break; }
    }
    scroller.current = box;
  }, [given]);

  useEffect(() => {
    if (!sections.length) return;
    const box = scroller.current;
    const target = box || window;
    let raf = 0;
    const update = () => {
      raf = 0;
      const top = box ? box.scrollTop : window.scrollY;
      const viewH = box ? box.clientHeight : window.innerHeight;
      const docH = box ? box.scrollHeight : document.documentElement.scrollHeight;
      const offset = box ? box.getBoundingClientRect().top - box.scrollTop : -window.scrollY;
      setScrolled(top > SHOW_AFTER);
      const tops = sections
        .map(({ id }) => document.getElementById(id))
        .filter(Boolean)
        .map((el) => ({ id: el.id, top: el.getBoundingClientRect().top - offset }));
      setActive(activeSectionId(tops, top, viewH, docH));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    target.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      target.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [sections]);

  // Step aside while the site footer is on screen.
  useEffect(() => {
    const footer = document.querySelector("[data-site-footer]");
    if (!footer) return;
    const io = new IntersectionObserver(([entry]) => setFooterInView(entry.isIntersecting));
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  const behavior = () => (window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth");

  const go = useCallback((id) => {
    const section = document.getElementById(id);
    if (!section) return;
    // "instant", not "auto": auto would inherit html { scroll-behavior: smooth }
    section.scrollIntoView({ behavior: behavior() });
    // Move focus to the section too, so keyboard users continue from there.
    if (!section.hasAttribute("tabindex")) section.setAttribute("tabindex", "-1");
    section.focus({ preventScroll: true });
    history.replaceState(null, "", `#${id}`);
  }, []);

  const toTop = useCallback(() => {
    (scroller.current || window).scrollTo({ top: 0, behavior: behavior() });
    document.querySelector('header [data-tour="logo"]')?.focus({ preventScroll: true });
  }, []);

  if (!sections.length) return null;

  return (
    <>
      <TocDrawer sections={sections} active={active} visible={scrolled && !footerInView} onGo={go} />
      <SectionPager sections={sections} active={active} hidden={footerInView} onGo={go} onTop={toTop} />
    </>
  );
}
