---
name: seance-ui-module
description: >
  Checklist for adding or changing an interactive UI module in Séance
  (src/ui/*.ts) — the Context pattern, the two render tiers, transient vs.
  static text, the persisted-schema migration rule, touch-target sizing and
  card-control layout, the exercise info modal, the library search/filter, and
  the monolith bugs that must not come back (audio, wake lock, textContent).
  Use before writing or changing a ui/*.ts module, adding a field to Context,
  changing what happens on click/change in the planner, library or runner, or
  resizing/moving a button.
---

# Adding or changing a UI module in Séance

`CLAUDE.md` carries the always-loaded rules this skill assumes (the two
render tiers, the persisted-schema migration rule, `fr.ts` as the source of
truth). This is the checklist for applying them correctly, distilled from
implementing the multi-plan / drag-reorder / undo-toast / light-theme
changes, plus the interface rules that used to live in CLAUDE.md's SEO and
exercise-page sections.

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

`index.html` is for **static chrome** — anything a crawler or a CLS
measurement sees before `main.ts` runs. Its French text is filled at build
time from `fr.ts` by `fillStaticTranslations()` (`vite.config.ts`), so a
`data-i18n` element there must be written **empty**.

None of that applies to text that only ever exists after a JS interaction: a
toast, a loading/error state inside an already-closed `<dialog>`, an inline
form. For that kind of text, build the element with `el({ text: t('...') })`
at the moment you need it, and skip `index.html` entirely — no CLS-reservation
math to redo. Reuse `src/ui/dom.ts`'s `el()`/`byId()` rather than raw DOM
calls.

If a new **always-visible** section is added to `index.html` (e.g. a new
`<div id="foo"></div>` filled by JS on every load, not just after a click),
treat it like `#plan`/`#library`: it needs an `#foo:empty { min-height: ... }`
reservation sized to its real rendered height, or it reintroduces the CLS
regression documented in the `seance-seo-html` skill ("Réservation de hauteur
et CLS"). Measure
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

---

## Regles d'interface reprises de CLAUDE.md

### Cibles tactiles et repartition des commandes d'une carte

**Cibles tactiles.** Tout élément interactif vise `min-width`/`min-height:
44px` (bonne pratique Lighthouse/Apple HIG — la norme réellement opposable,
WCAG 2.5.8 AA, ne fixe que 24px). `min-height`/`min-width` plutôt que
`height`/`width` : la zone tactile est garantie quelle que soit la métrique
réelle de la police, pas déduite d'un calcul de padding. **Sur une carte du
déroulé, les commandes sont réparties par fréquence d'usage** : le rail
`.reorder` collé au bord gauche (monter / n° / descendre, `.mini` en 44×44,
sans bordure puisque le rail porte déjà fond et séparateur), la suppression
`.del` en badge du coin haut droit et l'info `.info-btn` en badge du coin bas
droit. Ces deux badges de coin font **32px, en dessous du seuil de 44px —
décision assumée** : ce sont des actions ponctuelles, contrairement aux
flèches qu'on répète pour ordonner une séance. Deux designs abandonnés avant
celui-là, pour mémoire : flèches et croix empilées à côté du nom (`.del` calé
sur `.mini` × 2 + le `gap`, soit 96px), ce qui imposait 96px de haut à la
rangée du nom et laissait un vide sous le badge de groupe ; puis les trois en
rangée horizontale, qui poussait les champs à passer à la ligne sur les
écrans étroits. Pour un lien texte
court (`.credit a`), la zone cliquable s'étend par `padding`
seul — jamais de marge négative pour « rattraper » ce padding : le `gap` du
conteneur flex mesure l'espace entre les boîtes (`border-box`), le padding
est à l'intérieur de la boîte de chaque lien et ne le grignote pas ; une
marge négative, elle, mord directement sur ce `gap` et resserre les liens
plus qu'annoncé (piège vérifié : `gap:16px` + `margin:0 -4px` de chaque
côté ramenait l'espace visible à 8px). L'indicateur de lien utilise
`text-decoration`, jamais `border-bottom` : un border colle au bord de la
boîte (donc loin du texte une fois la boîte à 44px), alors que
text-decoration reste sur la ligne de base quelle que soit la hauteur de la
zone tactile.

### Modal d'info, bouton d'info, recherche et filtre

**Modal d'info (`ui/exercise-info.ts`).** Un `<dialog>` natif (skeleton
statique dans `index.html`, jamais construit en JS) : fermeture Échap et
focus-trap gratuits. Un exercice `custom` n'a pas de bouton ⓘ —
`isLibraryKey()` l'exclut, aucun contenu n'existe pour cette clé.
`#infoName`/`#infoGroup`/`#infoMuscles`/`#infoPoints` restent vides dans le
HTML statique, volontairement (contenu par exercice, pas du chrome — même
statut que `#runName` dans le lecteur). Un `<dialog>` non ouvert est de
toute façon masqué par défaut par le navigateur
(`dialog:not([open]){display:none}`), donc invisible pour un crawler ou un
lecteur d'écran tant qu'il n'est pas ouvert.

Le repli français s'applique aussi ici, visiblement : si la langue active
n'a pas encore de contenu long pour cet exercice, la modal affiche quand
même le contenu (en français) plutôt que rien, avec la mention
`exerciseInfo.unavailable` — jamais une modal vide sous prétexte que la
traduction n'existe pas encore.

**`.info-btn` : 32px, en dessous du seuil de 44px du reste de l'app —
décision assumée**, pas un oubli. C'est une action secondaire (l'action
principale d'une carte est de l'ajouter au déroulé, celle d'une ligne est
de régler ses paramètres) dans un espace déjà dense (grille 2 colonnes,
ligne à 4-5 champs). Un seul style de base partagé (`.info-btn`), trois
contextes de positionnement (`.libcard .info-btn` en badge absolu sur la
carte de bibliothèque, `.fields .info-btn` poussé au coin bas droit de la
carte du déroulé, `.ractions .info-btn` au coin haut droit de l'encart de
l'exercice dans le lecteur). `.del` reprend le même gabarit 32px au coin haut droit —
voir « Cibles tactiles » plus haut pour la répartition complète.

**Exception dans le lecteur : 40px** (`.ractions .info-btn`,
`styles/runner.css`), ramenés à 32px sous 480px de hauteur. L'argument de
densité qui justifie les 32px ne vaut plus là — on le vise en pleine séance,
téléphone posé au sol — et il vit au coin haut droit de l'encart de
l'exercice, pas dans l'en-tête : là-haut, à côté de « Quitter » et du
compteur d'étapes, il se lisait comme une commande du lecteur et passait
inaperçu. Piège vérifié en le déplaçant : dès qu'un sélecteur de
contexte déclare un `display` sur `.info-btn`, il faut redéclarer
`[hidden] { display: none }` derrière — `.info-btn[hidden]` (planner.css) et
`.ractions .info-btn` sont à égalité de spécificité, et `runner.css` est
importé après.

**Le bouton secondaire du lecteur ramène à l'effort précédent, il ne
« passe » plus.**
Passer faisait doublon avec le bouton principal, qui avance déjà d'une étape
(« Terminé », « Série terminée ») ; revenir sur une série validée par erreur
n'avait au contraire aucun recours. Il revient à l'**effort** précédent et
jamais au repos qui le précède (`previousWorkIndex()`, `ui/runner.ts`), il
est désactivé et non masqué au premier effort (les deux boutons du bas se
partagent la largeur, en retirer un élargirait l'autre), et il garde
« +15 s » pendant un repos — la seule commande sans équivalent ailleurs.
Il affiche une flèche tracée (`BACK_ARROW`) et non le glyphe « ← », dont
l'épaisseur et l'inclinaison changent d'une police système à l'autre ; son
nom accessible passe donc par un `aria-label`, que `paintRest()` doit
retirer en repassant à « +15 s » sous peine de masquer ce texte.
Interdit sur l'écran de fin : `finish()` a déjà inscrit la séance à
l'historique, rouvrir le dernier effort permettrait de l'y compter deux
fois.

**Recherche et filtre (`ui/library.ts`).** État local au module (`search`,
`group`), volontairement **hors de `State`** — un filtre d'affichage n'a rien
à faire dans ce qui est persisté en `localStorage`, et il doit repartir de
zéro à chaque chargement de page. Il doit en revanche **survivre** aux
appels à `renderAll()` déclenchés par autre chose (changement de langue,
ajout d'un exercice au déroulé...) : `render()` réapplique l'état courant du
filtre au lieu de le réinitialiser, `renderGrid()` s'en sert directement.

Recherche insensible aux accents (`normalize()`, `\p{Diacritic}` sur une
chaîne passée par `.normalize('NFD')`) : taper « epaule » doit trouver
« Épaules ». Les options du `<select>` de groupe sont reconstruites à
chaque `render()` — leur libellé doit suivre la langue active, comme tout
le reste de l'interface.

### Bugs du monolithe corriges au portage

Trois d'entre eux sont encore des invariants vivants (1, 2 et 8) : les
defaire reintroduirait le bug d'origine.

1. `beep()` créait un `AudioContext` par appel ; les navigateurs en plafonnent le
   nombre (~6), le son devenait muet après quelques séries. → contexte unique
   dans `platform/audio.ts`.
2. Le wake lock, relâché par le système à l'extinction de l'écran, n'était jamais
   repris. → réacquisition sur `visibilitychange`.
3. Le champ « Repos si imposé (s) » n'avait aucun effet en mode circuit. → masqué.
4. `mk()` plantait sur une clé inconnue venue du stockage. → garde + migration.
5. Chaque saisie reconstruisait toute la liste. → `renderDerived()`.
6. `stop()` ne remettait pas la barre de progression à zéro.
7. L'historique grandissait sans limite. → plafonné à 200 entrées.
8. Le nom d'exercice perso passait par `innerHTML` avec un échappement
   incomplet. → tout texte utilisateur passe par `textContent` (`el({ text })`).
   `html` n'est réservé qu'aux figures SVG que nous produisons nous-mêmes.

