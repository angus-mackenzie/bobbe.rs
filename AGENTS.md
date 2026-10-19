# Working on Beach Bobbers

- Use a Git worktree, npm and the committed lockfile. Keep conventional commits focused, generally below 500 changed lines.
- Preserve Astro static output, strict TypeScript and Tailwind’s Vite integration. Keep components, layout, configuration, gallery data and styling separate.
- Keep production free of application JavaScript. Do not add React, authentication, databases, R2 or unnecessary dependencies.
- Preserve the hero text “Start Cool. Leave Cooler” and the confirmed Monday/Thursday 7AM schedule. Exact meeting locations are shared through the join form.
- Keep original photos ignored. Commit only metadata-stripped copies at or below 2,560 pixels; use the existing preparation script and Astro image pipeline. Preserve aspect ratios, responsive sources and intrinsic dimensions.
- Run `npm run check` and `npm run build`. Keep the 10 MB generated-photo budget enforced.
- UI changes require Playwright validation against the production build through local Wrangler. Inspect full-page screenshots at 320, 390, 768, 1024 and 1440 pixels, plus 200% text at 320 and 390. Check navigation, keyboard focus, reduced motion, lazy images, overflow, console errors and requests. Fix defects before handoff; report a blocker if browser validation cannot run.
- Store browser artifacts in `output/playwright/` and the README screenshot in `docs/website.webp`. Do not include review screenshots in deployed assets.
- Keep README concise and human-facing. Update contribution instructions when workflows change.
- Do not provision Cloudflare services, deploy, alter domain configuration or add automatic deployment without explicit user authorization.
