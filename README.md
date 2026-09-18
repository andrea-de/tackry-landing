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
