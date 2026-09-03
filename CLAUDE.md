# Séance

Planificateur et minuteur de séance au poids du corps. Site statique, multilingue
(fr, en, es, de, it), sans backend : tout l'état vit dans le `localStorage` du
navigateur et rien ne quitte l'appareil.

L'application a deux écrans : le **planificateur** (construire le déroulé,
réordonner, régler les pauses) et le **lecteur** (`.run`, plein écran, chrono +
anneau de progression + bip).

## Commandes

| Commande | Effet |
|---|---|
| `npm run dev` | Serveur de développement sur le port 8000, exposé sur le réseau local |
| `npm run build` | `tsc --noEmit` puis build Vite vers `dist/` |
| `npm run preview` | Sert `dist/` sur le port 8000 |
| `npm run typecheck` | Le filet du projet — il n'y a pas de suite de tests |

`npm run typecheck` est ce qui tient le projet : il vérifie le code **et** le fait
que les cinq langues exposent exactement les mêmes clés.

## Architecture

```
src/
  main.ts          detecte la langue, charge l'etat, monte l'app
  core/            logique pure, sans DOM
    types.ts       PlanItem / Step / Config
    plan.ts        creation de lignes, resolution des noms traduits
    queue.ts       LE moteur : buildClassic, buildCircuit, queueDuration
    storage.ts     localStorage v4 + migration depuis la v3
  data/            donnees sans texte
    groups.ts      ids + couleurs des groupes musculaires
    library.ts     8 exercices : reglages seulement
    figures.ts     figures SVG
  i18n/
    index.ts       t(), pluriels via Intl.PluralRules, detection, formatDate
    locales/       fr (source) + en, es, de, it
  ui/              rendu et interactions, un module par zone d'ecran
    app.ts         orchestration : etat partage, sauvegarde, cycles de rendu
    dom.ts         el(), byId(), applyStaticTranslations()
  platform/        audio.ts (bip), wakelock.ts (ecran allume)
```

Les modules d'interface reçoivent un `Context` (`ui/app.ts`) qui leur donne
l'état, `save()` et les deux niveaux de rendu. Chacun expose un `render()` et
installe ses propres écouteurs par délégation.

**Deux niveaux de rendu**, à respecter : `renderAll()` reconstruit tout (après un
changement de structure, de mode ou de langue) ; `renderDerived()` ne rafraîchit
que l'aperçu et la barre de statut. Une saisie chiffrée passe par
`renderDerived()` — reconstruire la liste ferait perdre le focus du champ.

## Les trois règles non devinables à la lecture

### 1. `i18n/locales/fr.ts` est la source de vérité

`Translations` en dérive (`Mirror<typeof fr>`). On ajoute donc **toujours** une
clé dans `fr.ts` d'abord : les quatre autres langues deviennent alors des erreurs
de compilation tant qu'elles ne la fournissent pas. Une clé en trop est refusée
de la même façon.

Les entrées pluralisées sont des objets `{ one, other, … }` ; `t()` choisit la
forme avec `Intl.PluralRules` d'après `params.count`, et retombe sur `other` si la
catégorie n'est pas fournie. Ne jamais recomposer un pluriel à la main du genre
`n > 1 ? 's' : ''` : les règles diffèrent d'une langue à l'autre.

### 2. Jamais de texte traduit dans un objet persisté

C'était le défaut du monolithe d'origine : chaque ligne du déroulé stockait le nom
et le conseil, ce qui figeait la langue au moment de l'ajout. Une `ExerciseItem`
ne contient qu'une `key` ; le nom et le conseil sont résolus à l'affichage par
`exerciseName()` / `exerciseCue()` (`core/plan.ts`). Seul `customName`, saisi par
l'utilisateur, est stocké tel quel.

Corollaire : les `Step` de la file portent une référence à l'`ExerciseItem`, pas
une copie de son nom. C'est ce qui permet de changer de langue **pendant** une
séance et de voir l'écran se retraduire immédiatement.

### 3. Modifier le schéma persisté impose une migration

Les clés de stockage sont versionnées (`seance.plan.v4`, …) dans
`core/storage.ts`. Tout changement de forme des données stockées demande de
bumper la version **et** d'écrire la migration. `parseItem()` accepte aujourd'hui
les deux formes (v3 `type: 'ex'` avec nom inline, v4 `type: 'exercise'`) et ne
supprime jamais les clés v3 : la v4 est écrite à côté.

## Le moteur (`core/queue.ts`)

C'est le cœur de valeur, et il est porté à l'identique du monolithe — vérifié
sortie contre sortie sur six scénarios.

- **Classique** : toutes les séries d'un exercice, puis le suivant, avec le repos
  réglé sur chaque ligne.
- **Circuit** : à chaque tour on pioche l'exercice d'un *autre* groupe musculaire
  à qui il reste le plus de séries (à égalité, l'ordre du déroulé tranche). Une
  pause n'est imposée que lorsque plus aucun autre groupe n'a de série
  disponible. Une pause ajoutée manuellement coupe le circuit en segments
  indépendants.

En mode circuit, la pause imposée vient du réglage global `cfg.pause`, jamais du
`rest` de la ligne — c'est pourquoi le champ « repos entre séries » est masqué
dans ce mode.

## Bugs du monolithe corrigés au portage

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

## Déploiement

Push sur `main` → `.github/workflows/deploy.yml` construit et publie `dist/` sur
GitHub Pages. `base: './'` dans `vite.config.ts` : les chemins sont relatifs, le
build fonctionne donc sous `user.github.io/<dépôt>/` sans coder le nom du dépôt.
Ne pas passer `base` à un chemin absolu.
