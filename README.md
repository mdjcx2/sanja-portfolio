# Sanja Devic, portfolio

Next.js 14 (App Router, plain JS) portfolio. Started from Vlada's portfolio as a
template: same layout, tokens, Syne font and Three.js blob, with his content,
the password gate and old experiments removed.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm test        # vitest
```

## Where the content lives

| What | File |
|---|---|
| Name, role, bio, links, About page, home client rows | `data/siteConfig.js` |
| Project cards (home "Selected work", `/portfolio`) | `data/projects.js` |
| Case study pages (`/work/<slug>`) | `data/caseStudies/*.js`, registered in `data/caseStudies/index.js` |
| Images, CV PDF, og-image | `public/` |
| Process page steps | `app/process/DarkProcessDiamond.js` |
| Home "Scale" and "Process" section copy | `app/page.js` |

Everything is placeholder text for now. Search the repo for `Placeholder` and
`TODO(Sanja)` to find what still needs real content.

### Adding a case study

1. Copy `data/caseStudies/sampleProject.js` to `data/caseStudies/<name>.js`
   and change `slug`, text and blocks. Block types are listed in
   `lib/caseStudy/blocks.js` (text, list, figure, video, cards, process,
   compare, results, hotspot, chips, shortcuts, metrics).
2. Register it in `data/caseStudies/index.js`.
3. Add a matching entry to `data/projects.js` so it gets a card.
4. Put images in `public/images/<slug>/`. Every image needs `width` and `height`.

## Contact form

`/api/contact` sends mail through Resend. It needs two env vars (in
`.env.local` locally, and in the Vercel project settings):

```
RESEND_API_KEY=...
CONTACT_TO=sanja@example.com
```

Without them the form shows an error with the email address instead.
