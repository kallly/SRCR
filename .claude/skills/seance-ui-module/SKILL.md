---
name: seance-ui-module
description: >
  Checklist for adding or changing an interactive UI module in Séance
  (src/ui/*.ts) — the Context pattern, the two render tiers, transient text
  vs. static HTML duplication, and the persisted-schema migration rule. Use
  before writing a new ui/*.ts module, adding a field to Context, or changing
  what happens on click/change in the planner, library, or runner.
---

# Adding or changing a UI module in Séance

Read `CLAUDE.md` in full first — it documents the non-obvious rules this
skill assumes. This is a checklist for applying them correctly, distilled
from implementing the multi-plan / drag-reorder / undo-toast / light-theme
changes.

## The `Context` object (`src/ui/app.ts`)

Every `ui/*.ts` module receives the same `Context`: shared state, `save()`,
and the two render tiers. When a new module needs a new capability (create a
plan, show a toast, open an inline form), **add it as a method on
`Context`** rather than reaching into `ctx.state` directly from the new
module and duplicating logic that belongs in `app.ts`. Keep `ctx.state` as
the raw persisted shape; give call sites a real accessor (e.g.
`ctx.activePlan()`) instead of repeating `state.plans.find(...)` everywhere
— one place to get the "current thing" right (including the invariant that
it's never undefined) beats N call sites each doing their own lookup.

## Two render tiers — pick correctly

- `renderAll()`: after anything structural — items added/removed/reordered,
  mode changed, a different plan selected, language changed.
- `renderDerived()`: **only** for a plain numeric field edit (sets/reps/
  seconds/rest) — it must not rebuild the list, or the input loses focus
  mid-keystroke. If you're not sure which tier a new interaction needs, ask:
  "does this change which DOM nodes should exist, or just a value already on
  screen?" The former is `renderAll()`.

## Transient / generic UI text: build it in JS, don't touch `index.html`

CLAUDE.md's `data-i18n` duplication rule (hardcode French text in
`index.html` too) applies to **static chrome** — anything a crawler or a
CLS measurement sees before `main.ts` runs. It does **not** apply to text
that only ever exists after a JS interaction: a toast, a loading/error
state inside an already-closed `<dialog>`, an inline form. For that kind of
text, build the element with `el({ text: t('...') })` at the moment you need
it, and skip `index.html` entirely — one less place to keep in sync, and no
new CLS-reservation math to redo. Reuse `src/ui/dom.ts`'s `el()`/`byId()`
rather than raw DOM calls.

If a new **always-visible** section is added to `index.html` (e.g. a new
`<div id="foo"></div>` filled by JS on every load, not just after a click),
treat it like `#plan`/`#library`: it needs an `#foo:empty { min-height: ... }`
reservation sized to its real rendered height, or it reintroduces the CLS
regression documented in CLAUDE.md ("Réservation de hauteur et CLS"). Measure
under network throttling with `wait_until="load"`, not `"networkidle"` — an
estimate here is a stopgap, flag it in a comment if you can't measure for
real, and say so out loud rather than reporting it as done.

## A form/prompt for user text: don't use `window.prompt()`

Use `src/ui/inline-input.ts`'s `createInlineInput(trigger, options)` instead
of a native blocking dialog — it's already wired for translatable labels
(functions, not strings, so it re-reads `t()` at open time and stays correct
after a language switch) and matches the app's visual language. Add a new
call site rather than a new prompt-like component.

## Changing what's persisted → bump the schema, don't skip the migration

If a change touches the shape of anything written to `localStorage`
(`src/core/storage.ts`'s `State`, `SavedPlan`, or any nested type): bump the
version suffix on the affected key(s), write a lenient parser for the new
shape, and **never delete or stop writing an older key** — read the current
`KEYS`/legacy-fallback chain in `storage.ts` first and extend the same
pattern (each version's loader falls back to the previous version's raw
keys, one level at a time). Write a throwaway Node script with a mocked
`localStorage` (a `Map`-backed class is enough) to exercise "fresh install",
"migrate from previous version", and "reload after migration" before calling
it done — there is no test suite to catch a migration bug for you.

## TypeScript gotcha: `noUncheckedIndexedAccess` + closures

This repo has `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes` on.
Two things that bite:

- `array[0]` is `T | undefined` even right after checking `array.length > 0`
  — narrow it into a `const x = array[0] as T` (with a comment on *why* it's
  safe) rather than sprinkling `!` everywhere.
- A `const` narrowed by `if (!x) return` **does not** reliably stay narrowed
  inside a nested `function onFoo() { ... }` defined later in the same scope
  (encountered this while wiring up a `pointerdown`/`pointermove`/`pointerup`
  sequence with `element.closest(...)` results — don't rely on it holding).
  Fix: assign the narrowed value to a new `const` with an explicit
  non-nullable type annotation (`const el: HTMLElement = maybeNull;`) right
  after the check, and reference that one from the closures.
