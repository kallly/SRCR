---
name: add-salle
description: >
  Ajouter une salle de sport a CIRKALI — une variante du site servie sur son
  propre sous-domaine (<salle>.cirkali.fr), avec ses machines dans la
  bibliotheque et ses seances toutes faites. A charger des qu'il est question
  d'ajouter une salle, un club, un partenaire, un sous-domaine, un tenant,
  une variante white-label, ou de toucher a src/data/tenants.ts.
---

# Ajouter une salle de sport

Une salle est une variante servie par **le meme deploiement, le meme
`index.html` et le meme bundle** que cirkali.fr. Rien n'est forke, rien n'est
reconstruit : `main.ts` lit le premier libelle de l'hote, le cherche dans
`TENANTS` (`src/data/tenants.ts`), et seules des **donnees** changent.

Le cas courant tient donc en **un objet et deux gestes hors depot**. Commence
par verifier que c'est bien ce cas-la.

## 1. Donnees seules, ou page generee ?

| La salle veut… | Suffit-il d'une entree dans `TENANTS` ? |
|---|---|
| ses machines dans la bibliotheque | oui |
| ses seances toutes faites | oui |
| son logo, ses couleurs, un texte d'accueil | **non** |
| pas de publicite sur son sous-domaine | **non** |
| plus d'une vingtaine d'exercices en plus | **non** |

Les trois « non » ont la meme cause : ce qui doit etre **dans les octets
servis**. Un theme applique en JavaScript clignote, un texte pose apres coup
est invisible aux robots, un encart publicitaire retire en JS a deja ete
demande, et la reservation de hauteur `--lib-rows` est calculee au build
depuis `LIBRARY.length` (vite.config.ts) — elle ignore les exercices d'une
salle, qui decalent donc la page au premier rendu.

Ce jour-la il faut une **page generee au build par salle** : ce travail n'est
pas fait, et il commence par relire la section « Variantes par sous-domaine »
de CLAUDE.md avant d'ecrire quoi que ce soit. Ne pas le bricoler a l'execution.

## 2. Le descripteur — `src/data/tenants.ts`

Un objet dans `TENANTS`, dont le `slug` est **exactement** le premier libelle
du sous-domaine :

```ts
export const TENANTS: readonly Tenant[] = [
  {
    slug: 'basicfit',                       // basicfit.cirkali.fr
    exercises: [
      {
        key: 'presseTechnogym',             // identifiant LOCAL, voir plus bas
        name: 'Presse a cuisses Technogym', // texte de la salle, jamais traduit
        group: 'legs',                      // un GroupId existant
        category: 'machine',                // filtre materiel de la bibliotheque
        mode: 'reps',
        sets: 4, reps: 12, seconds: 30, rest: 120,
      },
    ],
    presets: [
      {
        id: 'jambesLundi',
        name: 'Jambes du lundi',            // en clair, jamais une cle i18n
        config: { mode: 'classic', pause: 60, trans: 0 },
        items: [{ key: 'squat', sets: 5, reps: 5 }],
      },
    ],
  },
];
```

**`key` n'est qu'un identifiant local**, celui du `data-add` de la carte. Il
n'est jamais persiste ni mis dans un lien : ce qui est enregistre, c'est une
ligne **perso** portant `name` (voir §5).

**`name` est du texte de la salle**, pas une cle de traduction — meme statut
que le `customName` d'un exercice saisi par un utilisateur (regle n°2 de
CLAUDE.md). Une salle qui voudrait son catalogue en cinq langues releve de
`LIBRARY`, pas d'ici.

**Les lignes d'une seance de salle ne peuvent citer que des exercices de
`LIBRARY`** : `PresetLine` est typee sur les cles publiques, volontairement,
pour qu'une faute de frappe dans nos propres modeles reste une erreur de
compilation. Si une salle veut ses machines dans ses seances, c'est ce type
qu'il faut elargir — pas le contourner avec un `as`.

## 3. Hors depot : deux gestes, dont un qui echoue en silence

1. **DNS** : `<salle>.cirkali.fr` vers le meme Worker (un enregistrement joker
   `*.cirkali.fr` couvre toutes les salles d'un coup).
2. **Firebase Auth → domaines autorises** : ajouter le sous-domaine. **Sans
   ca, `signInWithPopup` echoue** et la sauvegarde en ligne est morte sur cette
   salle, sans message utile. C'est le seul reglage qui ne se voit pas depuis
   le code.

Rien d'autre : pas de build separe, pas de deploiement dedie, pas de
`wrangler.jsonc` a toucher.

## 4. Verifier

Il n'y a pas de suite de tests : un script jetable est le controle.

```bash
npm run typecheck
npm run check      # doit rester a 67 assertions vertes
```

Puis, pour eprouver la salle elle-meme (tsx, fichier `.mts` dans le
scratchpad — `TENANTS` est `readonly`, on y pousse par un cast au runtime) :

```ts
(globalThis as any).document = { documentElement: {}, title: '' };
const { TENANTS, setActiveTenant, activeTenant, tenantSlugFromHost } =
  await import('/chemin/src/data/tenants.ts');
setActiveTenant(tenantSlugFromHost('basicfit.cirkali.fr'));
// -> activeTenant()?.slug === 'basicfit'
// -> activePresets() rend celles de la salle, presetName() son nom en clair
// -> createFromTenant(exo) rend { key: 'custom', customName: '…' } aux bons reglages
```

Verifier au minimum : la salle s'active sur son hote et **pas** sur
`cirkali.fr`, ses modeles remplacent bien les six de CIRKALI, le nom d'une
seance de salle ne change pas quand on bascule l'app en allemand, et un
exercice de salle produit une ligne perso portant son nom.

## 5. Ce qui se passe reellement quand on ajoute un exercice de salle

Il devient une **ligne perso** (`key: 'custom'` + son nom), pas une nouvelle
cle de bibliotheque. C'est le choix qui rend tout le mecanisme sans risque :

- la seance traverse le `localStorage`, un lien `?s=`, un QR et le document
  Firestore **sans qu'aucun format ne bouge** — aucune migration, aucun
  elargissement d'`ExerciseKey` ;
- elle reste lisible sur cirkali.fr, ou cette salle n'existe pas : le nom
  voyage avec la ligne ;
- contrepartie assumee : pas de bouton fiche (il n'y a pas de contenu long a
  montrer), figure generique, et le selecteur de groupe musculaire reste
  modifiable sur la carte, comme pour tout exercice perso.

**Ne jamais ajouter un exercice de salle a `LIBRARY`** pour « faire mieux » :
il y gagnerait 5 pages generees, 5 entrees de sitemap, une place dans la spec
IA et l'obligation d'avoir un contenu long en cinq langues et une figure —
et `npm run check` le reclamerait aussitot.

## 6. Promouvoir un exercice de salle vers CIRKALI

C'est un chemin prevu, pas un accident : deplacer l'entree de `tenants.ts`
vers `LIBRARY`, puis lui donner ce que le catalogue public exige — une cle
dans `ExerciseKey`, nom et conseil dans les 5 langues, une figure, du contenu
long. **Charge la skill `add-exercise`** a ce moment-la : c'est elle qui liste
les six fichiers a toucher.

## 7. Les pieges, une fois la salle en ligne

- **La sauvegarde en ligne est commune.** Un compte Google porte UN document
  Firestore quel que soit le sous-domaine : les seances faites a la salle et
  celles faites chez soi arrivent dans la meme liste. C'est voulu — elles
  suivent la personne, pas le lieu. Ne pas « corriger » ca sans decision
  explicite : cloisonner par salle demande de changer les regles Firestore et
  la fusion.
- **Le `localStorage` est par origine.** Quelqu'un qui connait deja cirkali.fr
  arrive sur le sous-domaine avec une liste vide, donc sur le modele d'accueil
  de la salle. Ses seances ne sont pas perdues, elles sont sur l'autre origine
  — et un compte les rapatrie.
- **Le canonical absolu d'`index.html` designe cirkali.fr.** Un sous-domaine
  se declare donc lui-meme canonique vers le site principal : pas de contenu
  duplique. Ne pas y toucher en croyant bien faire.
- **Les encarts publicitaires s'affichent aussi sur le sous-domaine** (meme
  HTML). Si la salle n'en veut pas, on est dans le cas « page generee » du §1.
- **WebMCP et la page de spec `?plan=` listent `LIBRARY`**, pas le catalogue
  actif : une IA pilotant le site depuis un sous-domaine ne connait pas les
  machines de la salle. Manque assume, a traiter si on le demande.
