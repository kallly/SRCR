---
name: add-exercise
description: >
  Add a brand-new exercise to Séance's library end to end — settings, short
  name/cue in 5 languages, SVG figure, long-form content in 5 languages, and
  the generated exercise pages. Use whenever the user asks to add a new
  exercise, movement, or workout to the library (not when editing settings or
  translations of an existing exercise — see add-i18n-key for that).
---

# Adding a new exercise to Séance

This is the single most multi-file task in the codebase: one new
`ExerciseKey` touches 1 settings entry, 5 short-text locale files, 1 SVG
figure, 5 long-content files, and (optionally) 1 image prompt. Miss one of
the 5-language steps and the app still compiles for step 2 but silently
falls back to French for step 4 (that fallback is intentional per
CLAUDE.md — the point of this skill is to not need it by mistake).

## 1. Pick the key

Add it to `ExerciseKey` in `src/core/types.ts`. Use `camelCase`, matching the
existing entries (e.g. `kneePushup`, `sidePlank`).

## 2. Settings — `src/data/library.ts` (one file, typechecked)

Add one object to the `LIBRARY` array: `{ key, group, mode, sets, reps,
seconds, rest }`. No text here — `group` must be one of the existing
`GroupId`s in `src/data/groups.ts` (adding a *new* muscle group is a bigger,
separate change: `GROUP_IDS`, `GROUP_COLORS`, and a `group.<id>` key in all 5
locales).

## 3. Short name + cue — `src/i18n/locales/*.ts` (5 files, typechecked)

Add `exercise.<key>: { name: '...', cue: '...' }` to `fr.ts` first, then
mirror to `en.ts`, `es.ts`, `de.ts`, `it.ts`. This is enforced by
`npm run typecheck` exactly like any other i18n key — see the
`add-i18n-key` skill for the mechanics. The cue is one short, concrete,
actionable sentence (a form cue, not a description).

## 4. SVG figure — `src/data/figures.ts` (one file, typechecked)

Add a `<key>: '...'` entry to the `FIGURES` record: raw SVG body (no `<svg>`
wrapper) in a `200x118` viewBox, using only the existing shared classes (`s`
= stroke/limbs, `obj` = static object like a chair or wall, `gr` = ground
line, `hd` = head circle, `ar`/`arh` = motion arrow + arrowhead) so it stays
colorable by CSS and consistent with the other 28 figures. Copy the
structure of a similar existing exercise (same equipment/pose) as a
starting point rather than drawing from scratch.

## 5. Long-form content — `src/content/exercise-details/*.ts` (5 files, **NOT typechecked** — the risky step)

Add a `<key>: { ... }` entry to **all 5** of `fr.ts`, `en.ts`, `es.ts`,
`de.ts`, `it.ts` under that directory, matching the `ExerciseDetail`
interface (documented in `fr.ts` of that directory): `slug`, `muscles`,
`steps` (4–7), `mistakes` (2–4), `sensation`, `rangeOfMotion`, `tempo`,
`anatomy`, `mechanics`, `benefits`, and optionally `progression`/
`precautions` (omit entirely rather than filling them with filler text if
they don't apply — see CLAUDE.md, "Champs optionnels = sections absentes").

**This contract is intentionally `Partial`, so a missing locale will not
fail `npm run typecheck`.** After writing the French entry, explicitly grep
for the key across the other 4 files before considering the exercise done:

```bash
for f in en es de it; do grep -q "^\s*<key>:" src/content/exercise-details/$f.ts || echo "MISSING: $f"; done
```

Writing rules (CLAUDE.md, "Règle de rédaction du contenu long"): only
verifiable, stable anatomy/biomechanics/training-principle content — never a
cited study, an EMG activation percentage, or a falsely precise number.
Precautions are practical, never a diagnosis.

`slug` must be a readable French slug (e.g. `pompes-genoux`), used in the
generated URL for every locale's page for this exercise — it does not need
to be translated per locale.

## 6. Image prompt — `src/content/image-prompts.ts` (optional, one file)

Add a `<key>: '...'` entry to `SCENES`, in English, describing only the
scene (the shared `ART_DIRECTION` prefix is applied automatically). Do
**not** reference a generated image file in `renderPage()` or anywhere else
until the image actually exists on disk — the page falls back to the SVG
figure until then (CLAUDE.md: "Image Gemini : jamais référencée avant
d'exister").

## 7. Build and verify

```bash
npm run typecheck   # catches steps 1-3 if any of the 5 locales was missed
npm run build       # regenerates dist/exercises/<locale>/<slug>.html for all 5 locales + sitemap.xml + docs/image-prompts.md
```

After building, confirm the new exercise has a generated page in all 5
locale folders under `dist/exercises/`, and that `dist/index.html` lists it
in the injected exercise index (`<!--EXERCISE_INDEX-->` in `index.html` is
replaced at build time — don't edit that list by hand).

Never hand-edit anything under `dist/exercises/` — it is regenerated wholesale
on every build.
