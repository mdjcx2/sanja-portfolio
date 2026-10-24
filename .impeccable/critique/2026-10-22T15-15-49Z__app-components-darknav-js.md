---
target: settings overlay behind the nav cog
total_score: 17
max_score: 36
na_heuristics: 9
p0_count: 1
p1_count: 3
target_identity: "file:/home/user/Portfolio/app/components/DarkNav.js"
target_fingerprint: "sha256:a37ee560a24e5d2c5b12a12194220f529f6f1f8816298bfb9afe1932dab43361"
target_path: /home/user/Portfolio/app/components/DarkNav.js
timestamp: 2026-10-22T15-15-49Z
slug: app-components-darknav-js
---
⚠️ DEGRADED: single-context (sub-agents only run on explicit request in this session; `impeccable detect` blocked by the session's permission policy, replaced by scripted browser measurements)

Target: settings overlay behind the nav cog (app/components/DarkNav.js, `gearOpen` panel). Checked live at 1440×900 and 390×844.

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 2 | Live preview is good, but "Apply" implies changes are pending; the Style choice isn't shown in the status bar |
| 2 | Match System / Real World | 1 | "Settings" opens a shader editor: Freq, Amp, Fresnel, Color A/B/C, Floyd Mono, Reference |
| 3 | User Control and Freedom | 2 | Esc closes; Reset only resets the blob, not the Style; no undo |
| 4 | Consistency and Standards | 2 | Presets and Styles look identical but change different layers; Apply is a close button |
| 5 | Error Prevention | 2 | Custom slider values silently vanish on reload; Style isn't saved at all |
| 6 | Recognition Rather Than Recall | 3 | Swatches show what each option does |
| 7 | Flexibility and Efficiency | 3 | Presets for quick picks, sliders for fine-tuning |
| 8 | Aesthetic and Minimalist Design | 1 | 23 swatches, 4 sliders, 3 hex pickers, 8–10px labels across three dense columns |
| 9 | Error Recovery | n/a | Nothing can go wrong in a way that needs recovering |
| 10 | Help and Documentation | 1 | Nothing says what the panel changes or why it's here; "Restart tour" is buried mid-column |
| Total | | 17/36 | Poor (47%) |

## Design Specificity Verdict
The idea is authored and personal: visitors retune the site's WebGL blob and dither screen, which shows a designer who builds. The execution is generic: a shader/DAW debug panel with uppercase micro-labels, grid swatches and raw parameters. It reads as a developer tool left switched on, not as part of the portfolio experience.

## Priority Issues
1. [P0] Not operable by keyboard or screen reader. The overlay has no dialog role; focus stays on the cog, and Tab moves through the hidden home page behind it (View work, cards, Request access). All 4 sliders and 3 colour inputs have no accessible name, presets/styles expose no selected state (aria-pressed), the gear has no aria-expanded, and the range inputs are opacity 0, so keyboard focus is invisible. On a portfolio whose lead case study is WCAG 2.1 AA certified, this undercuts the claim. Fix: dialog semantics, focus in/trap/return, named controls, visible focus. (/impeccable harden)
2. [P1] Controls don't do what they say. Every change applies instantly; "Apply" only closes. "Reset to Default" resets the blob but leaves the Style. Custom slider/colour values aren't persisted (only named presets are), and the Style isn't persisted, so a reload silently undoes the visitor's choices. Fix: "Done" instead of Apply, Reset resets both, persist custom values and Style. (/impeccable clarify, /impeccable harden)
3. [P1] Phone layout breaks. The three columns stack into three fixed-height scroll panes, giving nested scrolling with rows cut mid-swatch (presets, sliders and styles each show a slice). Fix: one scrolling column with section headers and a sticky bottom bar. (/impeccable adapt)
4. [P1] Wall of options and jargon. 6 presets + 17 styles + 4 shader parameters + 3 hex pickers = 30 decisions on first open. Two parallel "looks" (Presets = blob colour/motion, Styles = dither screen) are named so similarly that visitors can't tell which does what. Fix: lead with a few curated combined looks; tuck Freq/Amp/Speed/Fresnel and hex pickers behind "Fine-tune"; plain names ("Motion", "Surface", "Glow"). (/impeccable distill)
5. [P2] Micro-type throughout. Section headers 10px at about 2.2:1, preset/style names 8px at about 2.6:1, slider labels 9px, bottom bar 8–9px. Fix: 12px floor, textLow-level contrast. (/impeccable typeset)

## Persona Red Flags
Jordan (hiring manager, first visit): clicks "Settings" expecting site settings and finds a shader editor; no sentence explains it's a playground for the background. Casey (phone): nested scroll panes, cut rows, 32px cog target. Sam (keyboard/screen reader): opens the panel and keeps tabbing through the invisible page; unnamed sliders; no visible focus.

## Minor Observations
The "Dark" preset swatch is two black blocks and reads as empty. Styles grid is cut at the bottom with no scroll cue. "Restart tour" sits under Colour in Custom Controls. The gear button is 32×32. The bottom bar's "Current Preset" ignores the Style. Presets and Styles both use a 3-up square grid, so the eye can't separate them.

## Questions
Is this a visitor feature or your own tuning tool? If visitors, what should they feel after 10 seconds here? Would three or four named "moods" (blob + style together) say more about your taste than 23 swatches? Should the cog live on case-study pages at all?
