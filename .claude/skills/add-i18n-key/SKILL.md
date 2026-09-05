---
name: add-i18n-key
description: >
  Add or rename a translation key in Séance across all 5 locales (fr, en, es,
  de, it) correctly and verify with the type system. Use when adding new UI
  text, a new plural string, or renaming/removing an existing i18n key
  anywhere under src/i18n/locales or src/content/exercise-details.
---

# Adding an i18n key in Séance

`src/i18n/locales/fr.ts` is the single source of truth. `Translations` is
derived from it (`Mirror<typeof fr>` in `src/i18n/index.ts`), so every other
locale is forced by the compiler to expose exactly the same keys — no more,
no less.

## Procedure

1. **Edit `fr.ts` first, alone.** Add the new key (or rename/remove it) in
   the right thematic block. For a plural string, use the `{ one, other }`
   (or richer) shape — never hand-roll pluralization like `` n > 1 ? 's' : ''``,
   rules differ per language and `t()` already picks the right category via
   `Intl.PluralRules`.
2. **Run `npm run typecheck`.** It will fail on `en.ts`, `es.ts`, `de.ts`,
   `it.ts` — the compiler errors name exactly which key is missing (if you
   added one) or extra (if you removed one) in each file. This is the
   intended guardrail, not a bug to work around.
3. **Mirror the key into the 4 other locales**, at the same structural
   position, with an actually-translated value (not a copy of the French
   text). A plural entry may use different plural categories per language
   than French does — only `other` is mandatory everywhere.
4. **Re-run `npm run typecheck`** until it's clean.
5. **Nothing to mirror into `index.html`.** The French static text is filled at
   build time by `fillStaticTranslations()` (`vite.config.ts`) from `fr.ts`, in
   dev as in prod, so editing `fr.ts` is enough. If you are *adding* a new
   always-visible element to `index.html`, write it **empty** —
   `<h1 data-i18n="app.heading"></h1>`, and `aria-label=""` next to a
   `data-i18n-aria-label` — or the build fails with the key name. Never put a
   pluralized key on a `data-i18n` element: a plural has no static form and the
   build rejects it; build that text in JS with `t()`.

## Common mistakes this catches

- Forgetting one of the 4 other locales: typecheck fails immediately, can't
  be missed.
- Hand-copying the French text into `index.html` "to be safe" — don't. The
  build fills it and rejects any non-empty `data-i18n` element. Transient text
  (toasts, dialog states, per-exercise values) never belongs in `index.html`
  at all; build it in JS with `t()`.
- Using `t()` with a key that only exists in `src/content/exercise-details`
  content — that's a *separate*, intentionally partial contract
  (`Partial<Record<ExerciseKey, ExerciseDetail>>`), not part of
  `Translations`. Don't expect typecheck to catch a missing exercise-detail
  translation; see the `add-exercise` skill instead.
