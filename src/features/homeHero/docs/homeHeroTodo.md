---
name: <featureName>
status: open
linked_spec: <featureName>
---

# <Feature Title>

## Phase 1: Setup / Composition

- [ ] Create feature entry component (`src/features/<featureName>/index.tsx`)
- [ ] Compose feature in the correct app/layout entrypoint
- [ ] Implement responsive layout skeleton (mobile + desktop)
- [ ] Create only the needed feature folders following `AGENTS.md` structure (`components/`, `models/`, `hooks/`, `tests/`, etc.)
- [ ] Add and register feature i18n (`src/features/<featureName>/i18n/de.json` and `src/i18n/request.ts`) with messages namespaced under the feature key

## Phase 2: Data / Contracts

- [ ] Keep feature config/static content centralized in one typed source of truth
- [ ] Decide the data entrypoint (`api/*`, parent composition, static config, or `serverActions/`) and keep DTO-to-view-model mapping out of UI components
- [ ] Ensure feature code does not call external APIs directly
- [ ] Define feature config + view-model types
- [ ] Define required vs optional data contracts
- [ ] Handle optional/empty groups without crashes
- [ ] Ensure no contract violations against `AGENTS.md` data rules
- [ ] Document data ownership in the spec

## Phase 3: UX / Accessibility

- [ ] Implement required mobile and desktop behavior, including interaction state for interactive controls and touch-target sizing on mobile
- [ ] Use semantic structure and accessible names for non-text UI
- [ ] Validate keyboard access, focus order, contrast, and readable text sizing

## Phase 4: Testing

- [ ] Cover the main rendering contract, key interactions, and missing/empty optional data
- [ ] Add an accessibility smoke test
- [ ] Add `e2e` coverage if the feature changes a cross-feature user flow

## Phase 5: Docs / Closure

- [ ] Update spec to match implementation
- [ ] Keep this TODO aligned with completed work and mark finished items as checked for traceability
- [ ] Confirm Definition of Done from `AGENTS.md`
