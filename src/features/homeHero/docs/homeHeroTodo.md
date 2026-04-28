---
name: homeHero
status: open
linked_spec: homeHero
---

# Home Hero

## Phase 1: Setup / Composition

- [ ] Compose `HomeHero` in the homepage route entrypoint
- [ ] Confirm responsive structure for desktop and mobile (including stacked mobile CTAs)
- [ ] Add feature i18n file at `src/features/homeHero/i18n/de.json` with short German keys for headline, copy, and CTA labels
- [ ] Register `homeHero` messages in `src/i18n/request.ts`

## Phase 2: Content / Behavior Contract

- [ ] Implement headline copy as `Herzlich willkommen`
- [ ] Implement short, community-focused German supporting text
- [ ] Implement primary CTA label and destination (`Mehr erfahren` -> `/ueber-uns`)
- [ ] Implement default secondary CTA label and destination (`Gottesdienste besuchen` -> `/gottesdienste`)
- [ ] Implement Sunday replacement secondary CTA (`Livestream ansehen` -> `https://live.feg-gossau.ch`)
- [ ] Implement Sunday detection using `Europe/Zurich` for full Sunday window
- [ ] Add safe fallback behavior to default secondary CTA if day calculation is unavailable

## Phase 3: Visual / Accessibility

- [ ] Add a minimal warm church-scene illustration matching the welcoming tone
- [ ] Keep hero copy concise and readable across breakpoints
- [ ] Verify semantic heading structure and accessible names for links/buttons
- [ ] Verify keyboard focus order and visible focus styles for both CTAs
- [ ] Verify contrast/readability of text over the hero background/illustration

## Phase 4: Testing

- [ ] Add tests for non-Sunday CTA state (`Gottesdienste besuchen`)
- [ ] Add tests for Sunday CTA state (`Livestream ansehen`) with `Europe/Zurich` assumptions
- [ ] Add tests ensuring primary CTA always points to `/ueber-uns`
- [ ] Add mobile-rendering test coverage for stacked CTA behavior
- [ ] Add accessibility smoke test for hero heading and actionable links

## Phase 5: Docs / Closure

- [ ] Keep `homeHeroSpec.md` aligned with final copy and behavior
- [ ] Mark completed TODO items in this file for traceability
- [ ] Run `pnpm run lint`
- [ ] Run `pnpm run fmt`
- [ ] Run `pnpm run knip`
- [ ] Run relevant feature tests and confirm Definition of Done
