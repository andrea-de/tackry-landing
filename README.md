# Tackry Landing

The marketing site for Tackry, the local-first Android app. Static, deployed to
Vercel on push.

## Stack

- Preact + Vite, plain CSS. No UI framework, no runtime dependencies beyond Preact.
- Space Grotesk, subset from the app's own `res/font/*.ttf` and self-hosted as
  woff2 in `public/fonts/` (SIL Open Font License 1.1).

## Layout

- `index.html` — entry, meta and font preloads
- `src/main.jsx` — every section of the page and all of its copy
- `src/mark.jsx` — the Tackry mark as inline SVG, regenerated from the app's
  `com.tackry.intro.IntroGeometry` rather than screenshotted
- `src/styles.css` — layout and the two colour schemes. Light mode uses the
  app's Light palette, dark mode its Midnight palette, both copied from
  `com.tackry.ui.theme.TackryPalette`
- `public/media/` — screenshots, exported from the app's Roborazzi output
  (`app/build/outputs/roborazzi/`) and resized to webp
- `public/press/`, `public/drafts/` — tackry.com/press and /drafts: each is the ten-line loader of
  the shared Advection press app, which lists Tackry's approved media (`gs://advection-media/tackry/assets`)
  and its drafts (`…/review`) live, so they need no deploy when media changes (brain:
  `media-platform.md`; the media itself moves with the app repo's `tools/media.py`, through the
  `media` command). Both are noindex, by meta tag and by the `X-Robots-Tag` header in `vercel.json`,
  which also redirects the earlier `/press-new` and `/drafts-new` (301) to them.
- `retired/press/` — the old generated press page's copies (stills and video), kept in the repo
  until the old storage retires and no longer deployed: nothing outside `public/` is served. Don't
  add to it; new media goes to the buckets.
- `public/privacy/` — the privacy policy. **This URL is referenced from the Play
  listing and from inside the app; it must keep working.**

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # output in dist/
```

## Refreshing the screenshots

The screenshots are real renders, not mock-ups. Regenerate them in the app repo
(the Roborazzi screenshot tests), then resize the ones this page uses into
`public/media/` as webp. Keep the `width`/`height` attributes in `src/main.jsx`
matching the new files so the page does not shift while images load.
