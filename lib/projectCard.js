// The fields ProjectCard needs from a data/projects.js entry. Kept out of the
// "use client" component so server components (ExploreCarousel) can call it,
// and so only these fields, never case study prose, reach the client.
export function cardProps(p, href) {
  return {
    slug: p.slug,
    href: href ?? p.href ?? `/work/${p.slug}`,
    title: p.homeTitle ?? p.title,
    client: p.client ?? null,
    year: p.year ?? null,
    summary: p.homeSummary ?? p.summary ?? null,
    outcome: p.outcome ?? null,
    coverImage: p.coverImage ?? null,
    coverGradient: p.coverGradient ?? null,
  };
}
