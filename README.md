# Tackry Landing

Marketing landing page for Tackry, built as a standalone site inside the main Tackstack workspace.

## Stack

- `preact`
- `vite`
- plain CSS in `src/styles.css`

## Project Structure

- `index.html`: app entry
- `src/main.js`: page structure, sample content, interactions
- `src/styles.css`: layout, theming, animation
- `public/media/`: static assets used by the page
- `media/`: fallback media copies for simple static serving

## Local Development

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

## Static Preview

If you just want to preview the current files without the Vite dev server:

```bash
cd landing
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Build

```bash
npm run build
```

## Notes

- The page supports both light and dark preview modes.
- Most product examples on the page are web-built components instead of screenshots.
- App-store screenshots and related marketing source assets live in the main Tackstack workspace.
