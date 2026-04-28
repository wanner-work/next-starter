---
name: <featureName>
domain: <domain>
type: features
status: draft
---

# <Feature Title>

## Goal

Describe the user and business outcome this feature should achieve.

## AGENTS.md Alignment

- Follow architecture and ownership rules from `AGENTS.md`.
- Keep route files thin and compose from feature modules.
- Prefer server-safe data access for initial page load.

- Use shared UI primitives from the project UI layer instead of ad-hoc components when possible.
- Use feature-level docs + TODO lifecycle exactly as described in `AGENTS.md`.

## Feature Module Shape

Follow the feature structure from `AGENTS.md` and create only the folders that are actually needed:

```txt
features/<featureName>/
  index.tsx
  docs/
    <featureName>.md
    <featureName>TODO.md
  components/      # flat list only (no nested component folders)
  hooks/
  models/
  i18n/
  serverActions/
  tests/
```

## Scope

- In scope item 1
- In scope item 2
- Responsive behavior (mobile/desktop) if relevant
- Placement and integration points (layout/page/feature composition)

## Out of Scope

- Explicitly list what this iteration does not include.

## Inputs

### Backend DTO

Document backend contract shape (or state "not applicable" for static/local-only features).

Also record where the data enters the feature:

- Parent page/layout composition
- `api/*` service
- feature-local static config
- server action (if applicable)

### DTO Mapping

Describe transformation from DTO to frontend view model.

- List source API/service module
- List mapping owner (`api/*`, feature model mapper, etc.)
- State what must not leak into UI directly

### View Model (Frontend)

```ts
type FeatureViewModel = {
  // fields used by UI
}

function mapDtoToFeatureViewModel(dto: unknown): FeatureViewModel {
  // mapping contract
}
```

## Behaviour

- Core rendering rules
- State transitions and interactions
- Fallback behavior for missing/partial data

### Mobile

- Mobile behavior rules

### Desktop

- Desktop behavior rules

## UI States

- Default state
- Loading state (if relevant)
- Empty state
- Error state

## Technical Guardrails

- Implement under `src/features/<featureName>/` with feature-owned modules
- Keep static content in one dedicated feature-level file when needed
- Do not scatter static content across multiple feature files
- Keep component files flat in `components/` (no nested component folders)
- Use `src/features/<featureName>/i18n/de.json` and register in `src/i18n/request.ts`
- Keep i18n messages namespaced by feature key in the JSON file, for example:

```json
{
  "<featureName>": {
    "label": "..."
  }
}
```

- Keep components reusable and configuration-driven where possible
- If the feature needs data fetching, document whether it belongs in `api/`, feature models, or `serverActions/`

## Tests

### Behaviour

- Main rendering and interaction checks
- Feature tests live in `src/features/<featureName>/tests/`
- Add `e2e` coverage in `src/e2e/` when the feature affects a cross-feature user flow

### Edge Cases

- Empty/missing data handling
- Optional group/section handling
- Accessibility smoke checks

## Definition of Done

- `pnpm run lint` passes
- `pnpm run fmt` and `pnpm run fmt:check` pass
- Relevant tests pass (`vitest` and/or `e2e`)
- Spec + TODO are updated and consistent
- Change follows all applicable rules in `AGENTS.md`
