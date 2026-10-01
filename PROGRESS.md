# Portfolio build progress

Track every phase here. Tick boxes as work lands. Note deviations or leftovers after each phase.

## Phase 0 — Skeleton

- [x] Complete folder structure
- [x] `.nojekyll`
- [x] Shared CSS (`base.css`, `components.css`, `pages.css`)
- [x] Data files (`site.js`, `timeline.js`, `projects-data.js`, `research-data.js`, `featured-data.js`, `flights.js`)
- [x] `layout.js` injects nav + footer from `SITE`
- [x] `main.js` motion shell (GSAP/Lenis/reduced-motion safe)
- [x] Every HTML page loads with skip link, nav, footer, consistent head/scripts
- [x] Placeholder image + img/docs READMEs
- [x] Page stubs navigable (`file://` relative paths)

**Phase 0 notes:** Skeleton and later phases were built in one pass so pages are not empty stubs. Added `assets/js/about.js` (not in the original file list) to render hobbies, tools, JS email, and a small lightbox. Resume PDF is not in the repo; `assets/docs/README.md` explains where to put it.

## Phase 1 — Home

- [x] Pinned Apple-style hero
- [x] Intro + tools strip
- [x] Auto-computed stats counters (needs flights, projects, research data)
- [x] Timeline from `TIMELINE`
- [x] Closing CTA

**Phase 1 notes:** Hero visual is a CSS/blueprint layer via `--hero-visual` (no photo). Motion init waits for `DOMContentLoaded` so `home.js` can inject the timeline and `data-count` values first.

## Phase 2 — Drone

- [x] Part 107 / LAANC explainer
- [x] Stats strip
- [x] Year filter, search, sortable table
- [x] Status chips; mobile stacked cards
- [x] Empty / missing-field handling (em dash); no certificate numbers

**Phase 2 notes:** Total flight time is `h:mm` text (not a `data-count` animation). Denied LAANC uses a muted red chip as specified. Five placeholder flights in `flights.js`.

## Phase 3 — Projects

- [x] Grid + tag filter chips
- [x] `projects/TEMPLATE.html` (noindex)
- [x] `project-one.html` and `project-two.html` from template
- [x] At least 6 `PROJECTS` entries (only first two have real pages)

**Phase 3 notes:** Filter uses a short fade on the grid then re-render. Sample pages keep all unknown copy as `TODO:`.

## Phase 4 — Research

- [x] Paper cards from `RESEARCH`
- [x] Expandable abstracts, status chips, published first

**Phase 4 notes:** Abstracts use a disclosure button (`aria-expanded` + `hidden` panel).

## Phase 5 — Featured

- [x] Type filter chips
- [x] Card grid, video play badge, newest first, external links

**Phase 5 notes:** Dates are still `TODO: YYYY-MM-DD` strings; sort is string compare, which still orders those placeholders newest-first.

## Phase 6 — About

- [x] Intro + portrait
- [x] Photo grid (6 placeholders)
- [x] Hobbies + tools from `SITE`
- [x] Contact (JS-assembled email)

**Phase 6 notes:** Lightbox is a simple full-screen overlay (Close, Esc, click backdrop). Keyboard focus trap is not implemented.

## Phase 7 — Polish

- [x] SEO/OG, unique titles, `lang="en"`
- [x] Accessibility pass
- [x] Responsive pass (360 / 768 / 1280)
- [x] Root `README.md` (local run, GitHub Pages, how to update)
- [x] Image guidelines

**Phase 7 notes:** OG image points at `placeholder.svg` (relative; social crawlers may not like SVG). Contrast is silver on near-black. Resume link 404s until a PDF is added. Browser visual QA of the three breakpoints was not run in this pass if a live browser tab was unavailable.
