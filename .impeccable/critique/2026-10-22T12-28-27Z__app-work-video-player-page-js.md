---
target: Movingimage Player case study
total_score: 15
max_score: 28
na_heuristics: 7,9,10
p0_count: 1
p1_count: 3
target_identity: "file:/Users/vladadevic/Projects/Portfolio/app/work/video-player/page.js"
target_fingerprint: "sha256:933a0e3e50fd39f2ed3961a6ae8c15f021833cf4d5d32cd5f850728f60ffc887"
target_path: /Users/vladadevic/Projects/Portfolio/app/work/video-player/page.js
timestamp: 2026-10-22T12-28-27Z
slug: app-work-video-player-page-js
---
Method: dual-agent (A: design review · B: detector + browser overlay). Target: /work/video-player (Movingimage Player case study).

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 2 | ~10,850px page with no progress/section indicator; lightbox has no n of N |
| 2 | Match System / Real World | 3 | Clear language; H1 "Mi Player" vs card title "Movingimage Player Design" |
| 3 | User Control and Freedom | 2 | No next case study; phone footer link hidden under bottom nav |
| 4 | Consistency and Standards | 2 | Same "100%" labelled differently (L160 vs L436); zoomable vs non-zoomable images |
| 5 | Error Prevention | 2 | Lightbox has no focus trap; image buttons show no focus ring |
| 6 | Recognition Rather Than Recall | 2 | Six near-identical chapter thumbnails; captions 11px at 1.7:1 |
| 7 | Flexibility and Efficiency | n/a | Linear reading page |
| 8 | Aesthetic and Minimalist Design | 2 | ~4,300px of near-identical dark frames; metric strip repeated at the end |
| 9 | Error Recovery | n/a | No error-prone input |
| 10 | Help and Documentation | n/a | Not applicable to a case study |
| Total | | 15/28 | Acceptable (54%) |

## Design Specificity Verdict
Copy is partly authored (strong stance headlines, business-impact problem cards, token tiers); structure is a repeated H2 + 2 paragraphs + card stack template. No role/team/timeline/tools on page though data has "UX Design Lead, 13 weeks, Figma/FigJam/Lookback/Hotjar"; no research, trade-offs or reflection; "we" throughout. Detector: CLI clean (inline styles); browser 41–45 desktop / 79 phone findings, mostly low contrast: --dp-text-faint (0.2 alpha) 1.7–1.8:1 on 19 labels, captions, "← Portfolio", tier numbers; --dp-text-subtle (0.35) ~3.1:1 on metric labels and card descriptions; 2 captions white-on-white 1.0:1; nav labels 9px. Mobile cream-palette/~60 low-contrast hits are false positives (body is #F7F4F0 under a fixed dark backdrop).

## Priority Issues
1. [P0] No authorship, process or trade-offs: add role strip from data, one decision block, "what I'd do differently", "I" where the decision was theirs. (/impeccable clarify, /impeccable layout)
2. [P1] Outcomes thin/duplicated/inconsistent; best result (theming weeks → two days) missing; +22 NPS unsourced. Fix: lead with the theming result, 3–4 distinct sourced before→after metrics, drop duplicate strip. (/impeccable clarify)
3. [P1] Imagery doesn't carry the argument: 162% crop hack (L63–65), dark repetitive frames, unreadable chapter grid (3 cols on phone), unused keyboard-*.png, ~7.5MB PNGs no lazy load. (/impeccable layout, /impeccable optimize)
4. [P1] Accessibility regressions on an accessibility case study: all:"unset" kills focus rings (L57, L352); lightbox doesn't take/trap focus; faint/subtle tokens fail contrast; shortcut list not a list. (/impeccable harden, /impeccable typeset)
5. [P2] Dead-end ending: no next case study or contact CTA, faint exits, footer under phone bottom nav, generic document title. (/impeccable layout)

## Persona Red Flags
Jordan: no role/timeline; same three metrics at start and end; biggest win absent; long dark gallery. Casey: 13px-tall "← Portfolio" tap target; footer link under bottom nav; 106px chapter thumbnails. Sam: invisible focus on 14 image buttons; Tab escapes lightbox; 1.7:1 captions; flat headings; caption read twice.

## Minor Observations
15px body copy; !important overrides from inline styles; unused .sr-only; Label ignores style prop (L209); "Shipped in Q4" without year; hero-bg.jpg 449KB stock-like photo.

## Questions
What would a hiring manager lose if the 14-frame gallery became three annotated close-ups? Whose idea was keyboard-first, and what did it cost? Why is a compliance badge the headline instead of weeks → two days?
