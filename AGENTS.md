<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Code Style Source of Truth

`CODESTYLE.md` is the highest-priority convention document for this repository.

- If any rule in this file conflicts with `CODESTYLE.md`, follow `CODESTYLE.md`.
- Keep naming, exports, file boundaries, and function styles compliant with `CODESTYLE.md`.
- Do not introduce patterns forbidden by `CODESTYLE.md` (for example invalid entry files or forbidden barrel usage in app code).

# Project Architecture Guide

Use this structure as the default for all new product-detail related work.

## Root Structure (inside `src/`)

- `styles/`
- `methods/`
- `app/`
- `features/`
- `components/`
- `hooks/`
- `interfaces/`
- `types/`
- `enums/`
- `classes/`
- `ui/` (shadcn/ui)
- `e2e/`

Folder names must use `camelCase`.

## App Routing

Pages are route entry points and should focus on composition.

```txt
app/
  product/
    [id]/
      page.tsx
```

`page.tsx` responsibilities:

- Layouting
- Component usage/composition
- Initial data fetching if necessary

## Feature Modules

Each feature owns one vertical slice and may receive data from its parent or fetch data by itself.

```txt
features/
  homeHero/
  header/
  homePostPreview/
```

Each feature follows this internal layout:

```txt
features/<featureName>/
  index.tsx # entry component to the feature
  docs/
    homeHeroSpec.md
    homeHeroTodo.md
  components/ # flat list only (no nested component folders)
  hooks/ # flat list only
  methods/ # flat list only
  constants/ # flat list only
  actions/ # flat list only
  tests/ # flat list only
  i18n/
```

Feature folder names and nested folders must use `camelCase`.

Feature entrypoint export convention:

- Use default export for the feature component
- Consumers must import feature APIs via default import (for example `import HomeHero from '@/features/homeHero'`).

## Feature Isolation (No Cross-Feature References)

Features are independent vertical slices. They must not know about each other at the code level. This rule is enforced
to keep feature boundaries clean, to make features independently testable and replaceable, and to keep the dependency
graph a directed acyclic graph with `app/*` at the top and `features/*` as leaves.

- Features must not import from other features. A file under `src/features/<featureA>/**` must not reference anything from `src/features/<featureB>/**`. This includes components, hooks, types, models, server actions, i18n keys, and test utilities.
- When two features need to interact, do the composition at the page/layout level under `src/app/*`. The composing page/layout is the only place that is allowed to import from multiple features and wire them together.
- Use slot/prop injection when one feature needs to render UI that conceptually belongs to another. The receiving feature exposes a named slot prop (for example `cartSlot?: ReactNode`) on its entrypoint and renders the injected node as-is without introspecting it. The composing page/layout fetches any data the injected node needs and passes a fully-formed node (for example `<CartDropdown initial={...} />`) into the slot.
- Cross-feature end-to-end flows are covered by tests in `src/e2e/`, not by one feature importing another feature's components to test them together.
- If a piece of code is genuinely needed by more than one feature, it does not belong inside a feature. Lift it to:
  - `src/ui/` for shared shadcn UI primitives,
  - `src/components/` for other shared UI components,
  - `src/methods/` for pure helper methods,
  - `src/hooks/` for helper hooks,
  - `src/constants/` for shared constants,
  - `src/interfaces/` for shared interfaces,
  - `src/types/` for shared utility or union types,

How to recognize a violation:

- Any `import ... from '@/features/<otherFeature>'` inside a file under `src/features/<thisFeature>/**`.
- A feature reading another feature's i18n namespace directly.
- A feature importing a hook, server action, or type that physically lives inside another feature folder.

All of the above require refactoring: either move the shared concern up a layer (components/methods/hooks/types) or move the composition up to the page/layout and inject via props.

## UI

- `src/ui/` contains shared shadcn-based UI primitives.
- Features should use the shadcn-based components from `src/ui/` for consistent styling and behavior.
- If a feature needs a component which another feature also needs, the component can be extracted to the global `src/components` folder

## Code Entity Rules (must match `CODESTYLE.md`)

- Components: one component per file, filename matches component name, default export, and use named `function` declarations (no component arrow-function exports).
- Component props: define a local `Props` interface at the top of the file unless shared via `src/interfaces/`.
- Methods outside components: one method per file, default export, named `function` declaration.
- Methods inside components: arrow functions are allowed and preferred.
- Custom hooks: one hook per file, filename matches hook name, default export, named `function` declaration, and hook names start with `use`.
- Interfaces: one interface per file, PascalCase name, default export, and no `I` prefixes.
- Enums: define enum first, then `export default <EnumName>`.

## i18n

- Translations are done using the `next-intl` package with its corresponding hooks and components.
- Each feature has its own `i18n/` folder for translations specific to that feature.
- Add a `[language-key like de].json` file for each supported language (currently only de.json) for each feature.
- Import the translation file in the `src/methods/i18n/request.ts` file to make it available for the application.
- The translations which are written inside the json files need to be inside an object with the key of the feature folder name, for example:

```json
{
  "productDescription": {
    "label": "Produktbeschreibung",
    "loading": "Lädt Produktbeschreibung..."
  }
}
```

## Testing

- Keep feature tests in `features/<featureName>/tests/`.
- Use vitest for feature tests, focusing on unit and integration tests for feature components, hooks, and services.
- Use Playwright for end-to-end tests in `e2e/`.
- Keep cross-feature end-to-end coverage in `e2e/`.

### File and Folder Conventions

- Component test files use **PascalCase** matching the component name: `ProductBuyPanelClient.tsx` is tested by `tests/ProductBuyPanelClient.test.tsx`.
- Function / mapper / reducer / hook / server-action test files use **camelCase** matching the exported symbol: `mapCartToCartPageViewModel.test.ts`, `cartDropdownReducer.test.ts`, `addToCart.test.ts`, `useOptimisticCart.test.tsx`.
- Accessibility tests live in `tests/accessibility.test.tsx` (no prefix, no per-form copy). See the "Accessibility Tests" subsection below.
- Shared test utilities live in `tests/testUtils.tsx` next to the tests that consume them. See the "Shared testUtils.tsx" subsection below.
- Component-source files also use **PascalCase** (`ProductBuyPanelClient.tsx`, never `productBuyPanelClient.tsx`). Feature entrypoints stay `index.tsx`.

### Test Category Conventions

Different test categories have different conventions because they exercise different kinds of contracts.

#### Pure-Logic Tests (mappers, reducers, parsers, hooks, server actions)

Files like `mapXToY.test.ts`, `*Reducer.test.ts`, `parseHashError.test.ts`, `addToCart.test.ts`. These MUST follow the table-driven style below. The full cart-side and mapper suites already model this.

- Wrap the unit under test in a top-level `describe('<symbolName>')`.
- Inside that block, split coverage into `describe('Success Cases', ...)` and `describe('Error Cases', ...)`.
- Use `test.each([...])` from vitest for every case (not `it.each`).
- Define cases as an array of objects with `name`, `input`, and `expected` keys whenever possible. For error cases, keep `name` and `input`, and use `expectedError` only when asserting a thrown error message is clearer than wrapping it in `expected`.
- Keep each case object limited to properties relevant to that scenario.
- In `Success Cases`, assert returned values or state changes (for example `.toEqual()`, `.toMatchObject()`, or `.toBe()`).
- In `Error Cases`, assert thrown errors explicitly (`.toThrow()`, `.rejects.toThrow()`, or `{ ok: false, errorKey: ... }` result shapes).
- Keep assertions in `test.each` clean and avoid `if/else` branching in test logic.
- Use interpolated variables like `$name` or `$expected` in `test.each` descriptions for readable test runner output.

#### Component Tests

Files like `ProductBuyPanelClient.test.tsx`, `LoginForm.test.tsx`, `Header.test.tsx`. The table-driven style is still preferred wherever the assertions of multiple cases share the same shape, but UI flows with distinct setup/interaction/assertion steps are allowed to use free-form `it(...)` blocks.

- Prefer `test.each` for **data-driven** component scenarios: variant-by-state rendering, input-to-output mapping, routing-by-prop. `LoginForm.test.tsx` and `Header.test.tsx` are the reference examples.
- Use free-form `it(...)` or `test(...)` blocks when the scenario is a distinct user flow (`fireEvent` sequence, async waitFor, pending-state, multi-step interaction). Pending-state, `aria-busy`, and toast-side-effect checks typically do not fit cleanly into `test.each`.
- When a component test grows past ~5 cases of the same shape, lift them into a `test.each` even if the `describe` wrapper doesn't strictly match Success/Error.
- The Success/Error split is encouraged for component tests too when the boundary is meaningful (server-action success vs failure paths, validated vs invalid form submission), but is not strictly required.

#### Accessibility Tests

- Accessibility coverage lives in `tests/accessibility.test.tsx` inside each feature that has one.
- Structure: one top-level `describe('<feature> accessibility smoke', ...)` containing one nested `describe('<Component>', ...)` per component-under-test, each with focused `test(...)` blocks.
- NEVER consolidate multiple components into a single monolithic `it(...)` — regressions must localise to the specific component that broke.
- `cartDropdown/tests/accessibility.test.tsx` and `authentication/tests/accessibility.test.tsx` are the reference examples.

### i18n Mock Standard

Every test that renders a component using `next-intl` MUST mock `next-intl` with the **namespace-prefix variant**:

```ts
vi.mock('next-intl', () => ({
  useTranslations: (namespace?: string) => (key: string) =>
          namespace ? `${namespace}.${key}` : key
}))
```

- Assertions read `getByRole('heading', { name: 'cartDropdown.title' })` — the translation key path is self-documenting at the assertion site.
- Tests do not assert German copy, so translation-string changes do not cascade into test breakage.
- Components that call `useTranslations()` without a namespace (passing a fully-qualified key to `t()`) work transparently because the factory falls through to the bare key.
- Components that do **interpolation** with `t('key', { values })` can use an extended mock that handles the second `values` argument (see `header/tests/Header.test.tsx`). This is the one sanctioned deviation.
- Do NOT load `de.json` at test time and interpolate against it. Tests must not couple to translation copy.

### Server-Action Test Pattern

Server-action tests (`addToCart.test.ts`, `resetPasswordAction.test.ts`, `cartDropdown/tests/serverActions.test.ts`) follow this pattern:

- Use `vi.hoisted(() => ({...}))` for shared mock references that are referenced inside `vi.mock` factories.
- When the action imports a repository that touches `fetcher`/env vars at module load, declare a local `FakeXRepositoryError extends Error` class and register it via `vi.mock('@/repositories/xRepository', () => ({ XRepositoryError: FakeXRepositoryError, ... }))` so the real repository module never evaluates.
- Import the action lazily inside each test via `await import('../serverActions/<action>')`. Lazy import ensures the action resolves AFTER all `vi.mock` calls have been hoisted and registered.
- Mock `next/cache` (`revalidatePath`) and `next/navigation` (`redirect`) where the action calls them. For `redirect`, use a mock that throws (`throw new Error('REDIRECT:${path}')`) and assert via `.rejects.toThrow(...)` because the real `redirect()` signals control flow by throwing.
- Keep the Success / Error split with `test.each` as for other pure-logic tests.

For route-level 404s triggered from a page, call `notFound()` from `next/navigation` instead of rendering fallback UI inline.

## Implementation Rules

- Prefer server-safe data access paths for initial page load.
- Keep page files thin; move logic to feature hooks/services.
- Do not call external APIs using a fetch directly from features, always use the available `api/*` services or add new ones as needed.
- Use the components provided inside the `ui/` folder for consistent styling; avoid ad-hoc styles as much as possible.

## Responsive Parity (Desktop AND Mobile)

Every feature change must reach both the desktop AND the mobile experience before it can be considered done. Mobile is never a follow-up.

- When you add, change, or remove functionality for a feature, explicitly verify the mobile surface (drawer, sheet, responsive variants) and update it in the same change.
- When extending a view-model contract (new data fields, new navigation types, new interactive affordances), update every component that consumes that contract — desktop AND mobile — even if only one of them is mentioned in the user request.
- When adapting data from a new or changed API response, mobile rendering must consume the same normalized/sanitized view model as desktop. Never branch mobile-specific mapping logic away from the shared data source.
- In feature docs, keep `### Desktop` and `### Mobile` behaviour sections in lockstep. If a behaviour is desktop-only or mobile-only, state that explicitly in both sections with the rationale.
- Tests for a changed feature must cover both surfaces when both surfaces are affected (e.g. `<FeatureDesktop />` and `<FeatureMobileDrawer />` tests, or viewport-specific `e2e` coverage).
- Before marking a task complete, ask yourself: "Does this change also land on the mobile view?" If the answer is no or unclear, the work is not done.

## Docs + TODO Lifecycle

- Use `features/<featureName>/docs/<featureName>Spec.md` for a concise functional specification only.
- Functional specs must focus on user outcomes and behavior (goal, scope, flows, states, acceptance criteria).
- Do not include technical implementation documentation in feature specs (folder structures, DTO/view-model shapes, API/service wiring, test strategy, commands, or code-level guardrails).
- Use `features/<featureName>/docs/<featureName>Todo.md` only for open work items that are actionable.
- Keep technical implementation notes in code, PR descriptions, or TODO items when needed.
- When a TODO is implemented, mark it as checked in `<featureName>Todo.md` and reflect the final behavior in `<featureName>Spec.md` in the same change.
- Keep completed checklist items in TODO docs as checked entries for traceability; do not delete them.

## Definition of Done

- Lint passes with the repository standard (`pnpm run lint`) (the linting is type aware so never run `tsc` on your own).
- Formatting is compliant with the repository standard (`pnpm run fmt`).
- Unused code is removed using knip (`pnpm run knip`).
- Relevant tests pass (feature-level tests and/or `e2e` coverage for changed user flows).
- Documentation is updated when behavior or architecture contracts change.
- Changes respect the architecture rules in this `AGENTS.md` (page scope, feature boundaries, api/utilities ownership).
