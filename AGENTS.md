# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Project context

- Project: `jackwa.ng`, a bilingual personal project and identity page for Jack Wang.
- Primary role: global hardware product marketing / 出海硬件产品营销.
- Secondary identity: technology content creator and music/web experimenter.
- Selected visual source: `references/selected-broadcast-split.png`.
- Visual direction: editorial broadcast split-screen, condensed headline typography, aubergine/midnight/ivory/coral/cyan palette. Do not copy beetya.ng's fonts or yellow-green treatment.
- Required opening motion: show one `jackwa.ng` label on load, morph that same slot into `jack wang`, and leave only `jack wang` visible after the transition.
- Do not stack or simultaneously display multiple identity labels, and do not use a full-screen intro.
- Required themes: day and night, with an accessible persistent toggle.
- Required mobile targets: 402 CSS px (iPhone 17 and 17 Pro) and 440 CSS px (iPhone 17 Pro Max), including safe areas and zero horizontal overflow.
- Use real project and creator imagery from `public/assets/`; do not substitute visible images with CSS or handmade SVG artwork.
- The global hardware marketing section is intentionally text-only and names creator collaborations with Mrwhosetheboss, Linus Tech Tips, and Beebom.
- BetterDisplay is proprietary software. Describe Jack only as a Simplified Chinese localization contributor; never label BetterDisplay or this contribution as open source.

## Source links

- K-Pop Release Radar: `https://kpop.jacktechstudio.com/`
- Jack Music: `https://i.jackwa.ng/`
- Aqua Web: `https://macosaqua.jacktechstudio.com/`
- Media résumé: `https://resume1.jacktechstudio.com/`
- GitHub profile: `https://github.com/jacktechstudio`
- BetterDisplay localization fork: `https://github.com/jacktechstudio/BetterDisplay-localization`

## Implementation conventions

- React + Vite with CSS in `src/styles.css`.
- Use Phosphor Icons for interface icons.
- Keep real screenshots crisp, preserve meaningful crops, and lazy-load below-the-fold images.
- External project and profile links open in a new tab with `rel="noreferrer"`.
- Interactive controls must support keyboard focus and at least 44px mobile touch targets.
