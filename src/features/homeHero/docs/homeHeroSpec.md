---
name: homeHero
domain: homepage
type: features
status: draft
---

# Home Hero

## Goal

The home hero welcomes people to the website of Freie Evangelische Gemeinde Gossau.
It should give first-time visitors a warm first impression and a clear next step.

## Users

- Primary user(s): First-time visitors
- Secondary user(s) (optional): Returning church visitors looking for service access
- Key user need: Quickly understand they are welcome and know where to go next

## Scope

- Show a short German welcome message with the headline `Herzlich willkommen`
- Show short, community-focused supporting text
- Show a primary CTA that links to `/ueber-uns`
- Show a secondary CTA that links to `/gottesdienste` on non-Sunday days
- Replace the secondary CTA with `Livestream ansehen` linking to `https://live.feg-gossau.ch` on Sundays
- Use Sunday logic based on `Europe/Zurich` for the full Sunday day window
- Include a minimal, warm church-scene illustration
- Keep copy short and fully German

## Out of Scope

- Multi-language hero content in this phase
- Dynamic sermon/service content feed inside the hero
- Livestream schedule logic by hour (only day-based Sunday logic)

## User Flows

- Flow 1: User lands on homepage on a non-Sunday day -> Hero shows welcome text + `Mehr erfahren` + `Gottesdienste besuchen` -> User can continue to church info or services
- Flow 2: User lands on homepage on Sunday (Europe/Zurich) -> Hero shows welcome text + `Mehr erfahren` + `Livestream ansehen` -> User can jump directly to livestream
- Flow 3: User scans hero visual and copy -> User gets immediate welcoming context -> User understands this is the FEG Gossau website

### Mobile

- Headline, text, and illustration remain readable on small screens.
- CTAs are stacked vertically.
- Sunday CTA replacement behavior is identical to desktop.

### Desktop

- Headline, text, and illustration are presented in a balanced hero layout.
- Primary and secondary CTA are visible in one scan area.
- Sunday CTA replacement behavior is identical to mobile.

## UI States

- Default state: Welcome content with `Mehr erfahren` and `Gottesdienste besuchen`
- Sunday state: Welcome content with `Mehr erfahren` and `Livestream ansehen`
- Empty state: Not applicable
- Error state: Not user-visible for day-based CTA switching; fallback keeps `Gottesdienste besuchen`

## Acceptance Criteria

- [ ] Hero headline is `Herzlich willkommen` and supporting copy is short, welcoming, and in German
- [ ] Primary CTA links to `/ueber-uns`
- [ ] Non-Sunday secondary CTA shows `Gottesdienste besuchen` and links to `/gottesdienste`
- [ ] Sunday secondary CTA is replaced by `Livestream ansehen` and links to `https://live.feg-gossau.ch`
- [ ] Sunday detection uses `Europe/Zurich` and applies to the full Sunday day window
- [ ] Mobile and desktop both implement the same CTA switching behavior
- [ ] Hero includes a minimal warm church-scene illustration

## Open Questions

- None at the moment
