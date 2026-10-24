# Sanja Devic portfolio

Portfolio site for Sanja Devic. Next.js 14 (App Router, JS), custom CSS tokens in `app/globals.css` (no Tailwind), Syne font, Three.js blob background. Forked as a template from Vlada's portfolio (`~/Projects/Portfolio`), with fresh git history; the two repos do not share code after the fork.

## Commands

- `npm run dev`: dev server on port 3000
- `npm test`: vitest (case study blocks, scramble, contact form, cards)

## Structure

- Personal copy: `data/siteConfig.js`. Pages read from it; don't hard-code names, links or bio in components.
- Project cards: `data/projects.js`. Case studies: `data/caseStudies/*.js` (block-based, rendered by `app/work/[slug]` via `CaseStudyPage`).
- Routes: `/` home, `/portfolio` work grid, `/work/[slug]` case study, `/process`, `/about`, `/contact`. No password gate.
- `app/experiment/ui.js` holds the blob controls used by the home page's dev panel; `/api/save-blob-states` writes `data/blobStates.js` in dev.

## Status

Placeholder content throughout (`grep -rn "Placeholder\|TODO(Sanja)"`). Not on GitHub or Vercel yet.
