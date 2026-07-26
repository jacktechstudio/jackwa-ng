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
- Selected visual update (2026-07-26): option 3 from the visual exploration — cool white paper, deep indigo typography, cobalt signal accents, and a cherry-red live indicator. Use the official BetterDisplay application screenshot at `public/assets/betterdisplay-official.webp` for the contribution card.
- Accent-color rule (2026-07-26): keep the visual system restrained. Use cobalt blue for interactive and chapter signals; reserve cherry red only for live/status semantics. Do not reintroduce separate green or purple chapter accents.
- Desktop rail rule (2026-07-26): hide the identity marquee above 820px. The frozen desktop rail keeps one bottom-pinned bilingual scroll cue; the marquee remains mobile-only so the avatar, marquee, and cue never collide or clip.
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
- BetterDisplay official GitHub page: `https://github.com/waydabber/BetterDisplay`

## Implementation conventions

- React + Vite with CSS in `src/styles.css`.
- Use Phosphor Icons for interface icons.
- Keep real screenshots crisp, preserve meaningful crops, and lazy-load below-the-fold images.
- External project and profile links open in a new tab with `rel="noreferrer"`.
- Interactive controls must support keyboard focus and at least 44px mobile touch targets.
- Chapter navigation renders as numbered channel chips (`01`–`04`) with `aria-label` / `title`, hidden below 820px; do not reintroduce a full-text top nav (it overflows the rail header).
- Scroll-reveal entrances use the CSS `translate` property (not `transform`) so card hover transforms stay independent; the reduced-motion path reveals all `.reveal` blocks immediately. Never describe BetterDisplay or this contribution as open source in any visible copy.
- The scroll prompt must be bilingual and animated (`向下滚动 / CONTINUE THE BROADCAST`); never ship an English-only "scroll to explore". Keep the mobile first screen information-dense (live status strip + identity marquee + ambient layer) yet resolved within one viewport at 402px and 440px.
- Each chapter carries a signal tint via `data-section` on `<html>` (work coral / marketing cyan / media violet / contribution green); the frozen rail's `NOW SHOWING` board, role tuner bar and header channel chips read from `--tint`. The `NOW SHOWING` board is desktop-only — hide it on mobile (`≤820px`), because the rail scrolls away there so the board can never give context; the identity marquee stays on mobile. The theme toggle wipes via the View Transitions API (circle from the button) with an instant + reduced-motion fallback.
- Cascade order: review-pass base rules sit after the main `@media (max-width: 820px)` block, so mobile overrides of them (`.now-showing`, `.identity-stack`, `.identity-note`, …) must go in a trailing `@media (max-width: 820px)` block at the end of `styles.css`, or the later base rule silently wins.
