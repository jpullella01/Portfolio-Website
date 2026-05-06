# Project image upload plan

Each portfolio project has its own folder, keyed by the `slug` in `public/data/projects.js`:

- `brand-systems/`
- `web-direction/`
- `launch-visuals/`

When the final high-resolution project images are ready, upload them into the matching folder and update the project's `heroImage` field plus any future gallery fields in `public/data/projects.js`. The front-end reads that manifest and renders the available image automatically, so project pages can stay data-driven instead of hard-coding image tags throughout the site.

Recommended naming pattern:

```text
public/assets/projects/{project-slug}/hero.webp
public/assets/projects/{project-slug}/board-01.webp
public/assets/projects/{project-slug}/board-02.webp
```

Prefer optimized `.webp` or `.avif` exports for the live site while keeping source-quality originals outside the deployed `public/` directory if they are very large.
