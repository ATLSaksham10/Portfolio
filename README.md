# Saksham — engineering portfolio

Static site (HTML, CSS, vanilla JS). No build step. Hosted on GitHub Pages.

## Run locally

Open `index.html` in a browser (double-click is fine). Paths are relative, so `file://` works.

Optional: from this folder,

```bash
python3 -m http.server 8080
```

then visit `http://localhost:8080`.

## Deploy to GitHub Pages

1. Push this repo to GitHub.
2. Repo **Settings → Pages**.
3. Source: **Deploy from a branch**.
4. Branch: `main` (or `master`), folder: `/ (root)`.
5. Save. The site will be at `https://<user>.github.io/<repo>/`.

`.nojekyll` is included so GitHub does not process files through Jekyll.

Add `assets/docs/resume.pdf` before the Resume button will resolve.

## How to update

### Site name, tagline, socials, hobbies, tools

Edit `assets/js/data/site.js` (`window.SITE`).

Email is stored as `{ user, domain }` and assembled in JavaScript (nav/footer and About). Do not paste a raw `mailto:` address into HTML.

### Home timeline

Edit `assets/js/data/timeline.js`. Newest first. `href` is from the site root (`projects/project-one.html`). Use `#` if there is no page yet.

### Projects grid

1. Copy `projects/TEMPLATE.html` to `projects/your-slug.html`.
2. Replace every `TODO:` and the header image.
3. Remove `<meta name="robots" content="noindex">` when the page should be indexed.
4. Add an object to `assets/js/data/projects-data.js` (`slug`, `title`, `year`, `tags`, `blurb`, `image`, `href`).
5. Optionally add a matching entry in `timeline.js`.

Cards 3–6 currently link to `#` on purpose.

### Research

Edit `assets/js/data/research-data.js`. `status` should be `"Published"` or `"In progress"`. Links can be `#` until the paper URL exists.

### Featured

Edit `assets/js/data/featured-data.js`. `type` is one of: `video`, `article`, `press`, `talk`, `award`. Dates as `YYYY-MM-DD` (you can keep a `TODO:` prefix while drafting).

### Drone flight log

Edit `assets/js/data/flights.js` only. At the bottom:

```js
DRONE.flights.push(
  flight("2026-03-15", "TODO: location", "TODO: purpose", 20, "approved", {
    airspace: "Class D",
    altFt: 250,
    authId: "TODO"
  })
);
```

`laanc` is `"approved"`, `"not-needed"`, or `"denied"`. Omit `drone` to use `DRONE.defaults.drone`. The table sorts newest first. Do not put certificate numbers anywhere.

### Images

See `assets/img/README.md`. Missing photos can stay as `placeholder.svg`.

## Scripts

Load order on every page (all `defer`): GSAP → ScrollTrigger → Lenis 1.1.18 → data files → `layout.js` → `main.js` → page script.

If GSAP or Lenis fail to load, or the visitor has `prefers-reduced-motion`, the site stays readable without pinned animation states.
