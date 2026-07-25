# jackwa.ng Design QA

## Target and implementation

- Selected source: `references/selected-broadcast-split.png`
- Combined comparison: `qa/source-vs-implementation.png`
- Desktop dark implementation: `qa/desktop-dark-1440x1000.png`
- Desktop light implementation: `qa/desktop-light-1440x1000.png`
- Lightweight opening-motion frame: `qa/opening-motion-desktop-1440x1000.png`
- iPhone 17 / 17 Pro implementation: `qa/iphone-17-402x874.png`
- iPhone 17 Pro Max implementation: `qa/iphone-17-pro-max-440x956.png`
- Marketing collaborations desktop: `qa/marketing-collaborations-1440x1000.png`
- Marketing collaborations mobile: `qa/marketing-mobile-402x874.png`
- BetterDisplay contribution desktop: `qa/contribution-desktop-1440x1000.png`
- BetterDisplay contribution mobile: `qa/contribution-mobile-440x956.png`

The implementation preserves the selected source's editorial broadcast split, sticky identity panel, condensed display typography, coral/cyan signal colors, numbered chapters, timecodes, and dark control-room atmosphere. Content is allowed to flow vertically instead of being compressed into one desktop frame so the real screenshots and Chinese copy remain readable, especially on mobile.

## Comparison passes

### Pass 1 — desktop fidelity

- Compared the selected visual and the 1440 × 1000 dark implementation in one side-by-side input.
- Confirmed the 31.5% identity rail, right-hand chapter grid, typographic hierarchy, numbered section language, fine borders, restrained radii, and coral/cyan accents.
- Finding: `精选项目` wrapped one character per line because its desktop heading scale exceeded the copy column.
- Fix: reduced the desktop chapter heading scale while preserving the larger mobile heading treatment.
- Result: the four-character title now reads on one line at 1440px and the hierarchy is closer to the source.

### Pass 2 — theme and asset fidelity

- Verified the complete dark and light token sets at 1440 × 1000.
- Dark theme retains the selected midnight/aubergine broadcast feel.
- Light theme uses warm paper, ink, dark coral, and cobalt rather than the reference sites' yellow-green palette.
- Increased the light-theme coral contrast for small labels and buttons.
- Confirmed all three project cards use 1800px-wide live webpage renders.
- Confirmed the media section uses source imagery from the user's media résumé.
- Confirmed the product-contribution section uses the official high-resolution BetterDisplay application screenshot.
- Confirmed interface icons come from one Phosphor icon family; no handmade SVG or placeholder artwork is used.

### Pass 3 — responsiveness and reading

- Verified viewport widths at 360, 402, 440, 768, 900, 1280, and 1440 CSS pixels.
- iPhone 17 / 17 Pro: `innerWidth 402`, `document scrollWidth 402`.
- iPhone 17 Pro Max: `innerWidth 440`, `document scrollWidth 440`.
- No horizontal overflow, clipping, collapsed grids, or unusable controls was found.
- Increased mobile supporting text in project cards, media statistics, social links, and the BetterDisplay credit card.
- Mobile safe-area padding uses `env(safe-area-inset-*)`; tap targets are at least 44px.

### Pass 4 — factual and content revision

- Removed the marketing image and replaced it with a text-only creator collaboration board.
- Verified the collaboration board names Mrwhosetheboss, Linus Tech Tips, and Beebom, and remains fully contained at 402px.
- Removed every visible description of BetterDisplay as an open-source project.
- Renamed the fourth chapter to `CONTRIBUTION / 产品贡献` and describes Jack specifically as a Simplified Chinese localization contributor.
- Kept the official BetterDisplay interface screenshot and GitHub localization record as evidence without implying that the commercial application is open source.

### Pass 5 — opening motion simplification

- Removed the blocking full-screen identity sequence and its skip control.
- Removed the former third identity label from the page identity, metadata, profile label, and footer.
- The identity area now contains one text slot: it begins as `jackwa.ng`, briefly blurs and shifts, then resolves to `jack wang`.
- The final state contains only `jack wang`; the two labels are never stacked or simultaneously displayed.
- The motion runs once on page load, resolves in about one second, and remains disabled by `prefers-reduced-motion`.
- Browser verification found exactly one `.identity-line` element in both states: `jackwa.ng` at the start and `jack wang` after completion.

## Functionality

- The single-slot `jackwa.ng → jack wang` identity morph runs once without blocking access to the page.
- `prefers-reduced-motion` skips directly to the final `jack wang` state and suppresses other nonessential motion.
- Day/night mode switches successfully and persists through `localStorage`.
- Both “了解我的自媒体” buttons resolve to `https://resume1.jacktechstudio.com/`.
- Project cards resolve to the three requested live project URLs.
- BetterDisplay links resolve to the user's localization fork.
- Keyboard focus indicators, semantic link/button roles, labels, and descriptive image alt text are present.
- Browser console: 0 errors, 0 warnings.

## Build verification

- `npm run build`: passed.
- `npm run test:sites`: 4 tests passed.
- Sites-ready artifacts are present in `dist/`, but no deployment was performed.

### Pass 6 — code, copy, UI, and motion review (2026-07-26)

- Fixed a build-breaking duplicate header in `src/App.jsx`: the imports and the `externalProps` / `projects` / `socialLinks` / `ThemeToggle` / `SectionHeading` / `Timecode` declarations were present twice, which halted the Vite build. The dead copy-handle state (`copiedLink`, `handleCopyHandle`) and the unused `Check` / `Copy` icon imports were removed.
- Added the CSS that the markup already referenced but that had no styles: the broadcast ticker marquee (`.ticker-track` now animates `ticker-marquee`, pause-on-hover), the project `.project-card__tag` chip and `.project-card__shine` hover sweep, the chapter navigation chips, the role tuner bar, the collaboration board's `.signal-pill` / `.pulse-dot` / `.country-badge`, and per-brand social-card icon tints.
- Redesigned the chapter navigation as numbered "channel" chips (`01`–`04`) because the previous text nav had no styling and overflowed the rail header at every viewport width; chips carry full `aria-label` / `title` and an active coral state, and hide below 820px where the mobile layout is linear.
- Added scroll-reveal entrances (using the CSS `translate` property so card hover transforms stay independent) and a brief global color crossfade when toggling day/night; both are suppressed under `prefers-reduced-motion`, and the reduced-motion path reveals all blocks immediately. A faint scanline texture was added to the identity panel for broadcast atmosphere.
- Copy revisions: the identity role now reads "软件本地化贡献者 / Localization & UI contributor" (no open-source claim, per project rules); the two résumé CTAs now read "查看媒体简历"; project, marketing, and media section copy was tightened into the broadcast "same channel" motif ("让好产品…调到同一个频道", "多平台同步放送"); the ticker is bilingual.
- Verified: `npm run build` passes, `npm run test:sites` 4/4 pass, browser console 0 errors / 0 warnings. Desktop 1440×1000 dark + light, iPhone 17 / 17 Pro 402px, and iPhone 17 Pro Max 440px all show zero horizontal overflow (`scrollWidth === innerWidth`), the single-slot `jackwa.ng → jack wang` morph resolves, the channel nav active state tracks the section in view, the role tuner bar lights the active role, and the ticker / pulse dot / reveal animations run.

final result: passed
