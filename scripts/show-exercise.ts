/**
 * Localise le contenu long d'UN exercice dans les cinq langues.
 *
 *     npm run exo catCow
 *
 * Pourquoi ce script existe : `src/content/exercise-details/<locale>.ts` fait
 * ~1 100 lignes par langue. Ouvrir les cinq fichiers en entier pour modifier
 * un seul exercice coute enormement pour un contenu qu'on connait deja — et
 * c'est la tache la plus multi-fichiers du depot (voir la skill
 * `add-exercise`). Ce script imprime les bornes de lignes exactes de l'entree
 * dans chaque langue, ce qui permet d'aller lire uniquement ces lignes.
 *
 * Il signale aussi les champs manquants ou vides. Le contrat de ce contenu est
 * volontairement `Partial<Record<ExerciseKey, ExerciseDetail>>` (une langue
 * peut legitimement ne pas l'avoir encore traduit), donc `npm run typecheck`
 * ne verifie rien ici : c'est le seul controle possible.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { DETAILS_BY_LOCALE, type ExerciseDetail } from '../src/content/exercise-details';
import { LIBRARY } from '../src/data/library';
import { LOCALES } from '../src/i18n/index';
import { fr as frText } from '../src/i18n/locales/fr';
import type { ExerciseKey, Locale } from '../src/core/types';

const DIR = join(process.cwd(), 'src/content/exercise-details');

/** Champs obligatoires d'`ExerciseDetail` ; `progression`/`precautions` sont
 *  optionnels par conception (une mobilite n'a pas de progression au sens d'un
 *  exercice de force) et ne sont donc jamais signales comme manquants. */
const REQUIRED = [
  'slug',
  'muscles',
  'steps',
  'mistakes',
  'sensation',
  'rangeOfMotion',
  'tempo',
  'anatomy',
  'mechanics',
  'benefits',
] as const satisfies readonly (keyof ExerciseDetail)[];

/**
 * Bornes de l'entree `<key>: { ... }` dans le source d'une langue, comptees
 * par accolades depuis la ligne de declaration. Lu dans le fichier plutot que
 * deduit de l'objet importe : le but est justement de donner des numeros de
 * ligne a ouvrir.
 */
function locate(file: string, key: ExerciseKey): { from: number; to: number } | null {
  const lines = readFileSync(file, 'utf8').split('\n');
  const start = lines.findIndex((l) => new RegExp(`^\\s{2}${key}:\\s*\\{`).test(l));
  if (start === -1) return null;

  let depth = 0;
  for (let i = start; i < lines.length; i++) {
    for (const ch of lines[i] ?? '') {
      if (ch === '{') depth++;
      else if (ch === '}') depth--;
    }
    if (depth === 0) return { from: start + 1, to: i + 1 };
  }
  return null;
}

function missingFields(detail: ExerciseDetail): string[] {
  return REQUIRED.filter((f) => {
    const v = detail[f] as unknown;
    if (v === undefined || v === null) return true;
    if (typeof v === 'string') return v.trim() === '';
    if (Array.isArray(v)) return v.length === 0;
    return false;
  });
}

const raw = process.argv[2];
if (!raw) {
  console.error('Usage : npm run exo <cle>   (ex. npm run exo catCow)');
  process.exit(2);
}

// Rapprochement insensible a la casse : on tape rarement `wallSlides` juste.
const key = LIBRARY.find((e) => e.key.toLowerCase() === raw.toLowerCase())?.key;
if (!key) {
  const near = LIBRARY.map((e) => e.key)
    .filter((k) => k.toLowerCase().includes(raw.toLowerCase()))
    .slice(0, 8);
  console.error(`Cle inconnue : "${raw}".`);
  console.error(
    near.length ? `Peut-etre : ${near.join(', ')}` : `Les ${LIBRARY.length} cles : ${LIBRARY.map((e) => e.key).join(', ')}`,
  );
  process.exit(1);
}

const entry = LIBRARY.find((e) => e.key === key)!;
const text = frText.exercise[key];
console.log(
  `\n${key} — « ${text?.name ?? key} »   groupe ${entry.group} · ${entry.mode} · ` +
    `${entry.sets}x${entry.mode === 'reps' ? `${entry.reps} reps` : `${entry.seconds}s`} · repos ${entry.rest}s\n`,
);

let incomplete = 0;
for (const locale of LOCALES as readonly Locale[]) {
  const detail = DETAILS_BY_LOCALE[locale]?.[key];
  const file = join(DIR, `${locale}.ts`);
  if (!detail) {
    console.log(`  ${locale}.ts   ABSENT — repli sur le francais a l'affichage`);
    incomplete++;
    continue;
  }
  const at = locate(file, key);
  const where = at ? `L${at.from}-${at.to}`.padEnd(12) : '(introuvable)'.padEnd(12);
  const gaps = missingFields(detail);
  if (gaps.length) incomplete++;
  console.log(
    `  ${locale}.ts   ${where} slug: ${detail.slug.padEnd(32)}` +
      (gaps.length ? `INCOMPLET — manque ${gaps.join(', ')}` : 'complet'),
  );
}

console.log(
  `\nsrc/content/exercise-details/<locale>.ts — lis uniquement les lignes ci-dessus.` +
    (incomplete ? `\n${incomplete} langue(s) a completer.\n` : '\n'),
);
