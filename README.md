# danfirstenberg.com

Personal portfolio of Dan Firstenberg. One continuous scroll in thirteen chapters:
load, hero, intro, Alitheon, selected work, Spoor, AIVision Food, CORE Lab race car,
Halfspace, Hookd AI, social media consulting, the path, and contact.

A second page, `creators/index.html` (served at `/creators/`), holds the full creator
stats: every account, brand integration and chart. It is plain HTML with its own
inline styles and script, built alongside the main page by Vite.

## Stack

- Vite + React + TypeScript
- GSAP ScrollTrigger for the pinned and scroll-linked chapters (intro, work row, path)
- Lenis for smooth scrolling (off when `prefers-reduced-motion` is set)
- Geist and Geist Mono, self-hosted via Fontsource

## Develop

```sh
npm install
npm run dev       # local dev server
npm run build     # typecheck + production build into dist/
npm run preview   # serve the production build
```

## Editing content

All copy, numbers and image paths live in `src/content.ts`. Images are in
`public/images` as WebP. The design rules: black and white only, the photos carry
the colour, every number has a source and a date, and no em dashes.

## Deploy

`dist/` is a static site. It can go to any static host. The current domain points at
Azure Static Web Apps, so the simplest switch is to point that app's build at this repo
(app location `/`, output location `dist`).
