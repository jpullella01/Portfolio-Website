# Julianne Designs

A tiny static MVP for **Julianne Designs** with an elegant, minimal, futuristic glassmorphism style.

## Structure

- `public/index.html` — single-page static HTML.
- `public/styles.css` — visual system, responsive layout, glass effects, and animation.
- `public/script.js` — lightweight pointer state for future interactive polish.
- `public/assets/lens-orb.svg` — generated vector backdrop inspired by soft metallic lens forms.
- `wrangler.toml` — Cloudflare Workers static assets configuration.

## Local development

```bash
npm install
npm run dev
```

## Deploy

Workers static assets:

```bash
npm run deploy:workers
```

Cloudflare Pages direct upload:

```bash
npm run deploy:pages
```
