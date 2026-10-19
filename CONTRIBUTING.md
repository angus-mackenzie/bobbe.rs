# Contributing

Create a branch in a Git worktree. Keep changes focused and use conventional commits such as `feat: add a club photograph` or `fix: improve mobile spacing`. Aim for fewer than 500 changed lines per commit, apart from initial setup and lockfiles.

## Content and photographs

Club copy and links live in `src/config/site.ts`. The Google Form destination is defined in `astro.config.mjs` for development and static previews, and in `public/_redirects` for Cloudflare. Keep these destinations in sync.

Keep original photographs in the ignored `imgs/` directory. Prepare a small source copy before adding it to the gallery:

```sh
node scripts/prepare-photo.mjs imgs/original.jpg src/assets/descriptive-name.jpg
```

This preserves the original, applies orientation, strips metadata and limits the longest edge to 2,560 pixels. Add the imported copy and descriptive alt text to `src/data/gallery.ts`. Use only photographs you have permission to publish. All images needed to build must be committed; a fresh clone must not depend on `imgs/`.

Astro creates AVIF, WebP and JPEG variants during the build. The build fails if generated photographs exceed 10 MB in total, retain private photo metadata, exceed the dimension limit, or introduce application JavaScript. Keep gallery images lazy-loaded and preserve their aspect ratios and reserved dimensions.

## Before requesting review

```sh
npm ci
npm run check
npm run build
npm run preview
```

Use Playwright against the local Wrangler URL at widths of 320, 390, 768, 1024 and 1440 pixels. Scroll through every image, inspect full-page screenshots, and check for overflow, clipping, overlap, missing assets and unexpected line breaks. Also check 200% text scaling at 320 and 390 pixels, keyboard focus, the skip link, reduced motion, all links, console errors and failed network requests. Confirm that `/join` and `/join/` both return HTTP 302 to the form. Fix defects and repeat affected checks.

Store local review artifacts in `output/playwright/`. Update `docs/website.webp` from the verified desktop screenshot when the design changes; keep screenshots outside `public/` so they are not deployed.

## Hosting

The site is static: `wrangler.jsonc` serves `dist` without bindings or an SSR adapter. The CI workflow checks and builds only. After implementation review and explicit deployment approval, connect this repository to Cloudflare Workers Builds with `npm ci && npm run check && npm run build` as the build command and `npx wrangler deploy` as the deploy command. Account connection, domain configuration and credentials belong in Cloudflare, not source control.

Questions: [hello@bobbe.rs](mailto:hello@bobbe.rs).
