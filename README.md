# Séance

Planificateur et minuteur de séance, avec ou sans matériel : poids du corps,
élastique, haltères ou machine.

- **Deux modes d'enchaînement.** *Classique* : toutes les séries d'un exercice,
  puis le suivant. *Circuit* : les séries alternent les groupes musculaires, et
  une pause n'apparaît que lorsque deux efforts du même groupe doivent
  forcément se suivre — l'aperçu montre la séquence calculée avant de commencer.
- **Un lecteur plein écran** : chrono avec anneau de progression, étape
  d'armement avant les exercices en durée, bip de fin, écran maintenu allumé.
- **Cinq langues** : français, anglais, espagnol, allemand, italien. La langue du
  navigateur est détectée au premier lancement, et changer de langue retraduit
  une séance déjà enregistrée — même en pleine séance.
- **Aucun backend.** Tout est enregistré dans le navigateur, rien ne quitte
  l'appareil.

## Démarrer

```bash
npm install
npm run dev      # http://localhost:8000 — aussi exposé sur le réseau local
```

Le serveur écoute sur toutes les interfaces : l'adresse `Network:` affichée au
démarrage permet d'ouvrir l'application depuis un téléphone, qui est l'appareil
visé.

| Commande | Effet |
|---|---|
| `npm run dev` | Serveur de développement, port 8000 |
| `npm run build` | Vérification des types puis build vers `dist/` |
| `npm run preview` | Sert le build de production, port 8000 |
| `npm run typecheck` | Vérifie le code et la complétude des cinq traductions |
| `npm run check` | Build, puis vérifie ce qu'il a produit dans `dist/` |

## Publier

Un push sur `main` déclenche `.github/workflows/deploy.yml`, qui construit le
site et le publie sur GitHub Pages. À activer une fois dans les réglages du
dépôt : **Settings → Pages → Source : GitHub Actions**.

Les chemins produits sont relatifs, le site fonctionne donc sous
`https://<utilisateur>.github.io/<dépôt>/` sans configuration supplémentaire.

## Ajouter une langue

1. Ajouter le code dans `Locale` (`src/core/types.ts`) et dans `LOCALES` /
   `LOCALE_NAMES` (`src/i18n/index.ts`).
2. Copier `src/i18n/locales/fr.ts` vers le nouveau fichier et traduire.
3. `npm run typecheck` — toute clé manquante ou en trop est signalée.

Le français est la source de vérité : une nouvelle chaîne s'ajoute d'abord dans
`fr.ts`, et les autres langues deviennent alors obligatoires.

## Structure

```
src/core/      logique pure : moteur de file, plan, persistance
src/data/      exercices, groupes musculaires, figures SVG (sans texte)
src/i18n/      traductions et moteur de rendu des chaînes
src/ui/        rendu et interactions
src/platform/  bip audio, verrou d'écran
```

Les détails d'architecture et les règles à respecter sont dans
[CLAUDE.md](CLAUDE.md), qui renvoie vers `.claude/skills/` pour les règles
propres à une zone (partage par lien, SEO, pages d'exercice, modules d'interface).
