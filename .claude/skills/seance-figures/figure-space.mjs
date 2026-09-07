#!/usr/bin/env node
/**
 * Ou poser une fleche sans mordre le dessin, et le dire avant de l'ecrire.
 *
 *   node .claude/skills/seance-figures/figure-space.mjs squat
 *   node .claude/skills/seance-figures/figure-space.mjs            (toutes)
 *
 * Deux sorties : les colonnes libres de la figure (pour choisir un x), et la
 * distance de la fleche existante au corps (pour verifier apres coup). La
 * geometrie est faite a la main plutot qu'en rasterisant : pas de dependance,
 * et le resultat est un nombre d'unites SVG, directement comparable au dessin.
 */
import { readFileSync } from 'node:fs';

const SRC = readFileSync(new URL('../../../src/data/figures.ts', import.meta.url), 'utf8');
const FIG = Object.fromEntries(
  [...SRC.matchAll(/^ {2}([A-Za-z]+): `([^`]*)`/gm)].map((m) => [m[1], m[2]]),
);

/** Segments d'un element, en coordonnees viewBox. Les courbes Q sont echantillonnees. */
function segments(el) {
  const [, tag, at] = el.match(/<(line|rect|circle|path|polygon)\b([^>]*)>/);
  const n = (k) => Number((at.match(new RegExp(`\\b${k}="([-\\d.]+)"`)) ?? [])[1]);
  const out = [];
  const link = (pts) => { for (let i = 1; i < pts.length; i++) out.push([pts[i - 1], pts[i]]); };
  if (tag === 'line') link([[n('x1'), n('y1')], [n('x2'), n('y2')]]);
  if (tag === 'rect') {
    const [x, y, w, h] = [n('x'), n('y'), n('width'), n('height')];
    link([[x, y], [x + w, y], [x + w, y + h], [x, y + h], [x, y]]);
  }
  if (tag === 'circle') {
    const [cx, cy, r] = [n('cx'), n('cy'), n('r')];
    const pts = Array.from({ length: 17 }, (_, i) =>
      [cx + r * Math.cos((i * Math.PI) / 8), cy + r * Math.sin((i * Math.PI) / 8)]);
    link(pts);
  }
  if (tag === 'polygon') {
    const v = at.match(/points="([^"]+)"/)[1].trim().split(/\s+/).map((p) => p.split(',').map(Number));
    link([...v, v[0]]);
  }
  if (tag === 'path') {
    const d = at.match(/\sd="([^"]+)"/)[1];
    let cur = null;
    const pts = [];
    for (const seg of d.match(/[MLQ][^MLQ]*/g) ?? []) {
      const v = seg.slice(1).trim().split(/[\s,]+/).map(Number);
      if (seg[0] === 'M') { cur = [v[0], v[1]]; pts.push(cur); }
      else if (seg[0] === 'L') for (let i = 0; i < v.length; i += 2) { cur = [v[i], v[i + 1]]; pts.push(cur); }
      else if (seg[0] === 'Q') {
        const [cx, cy, x, y] = v;
        for (let i = 1; i <= 8; i++) {
          const t = i / 8;
          pts.push([(1 - t) ** 2 * cur[0] + 2 * (1 - t) * t * cx + t * t * x,
                    (1 - t) ** 2 * cur[1] + 2 * (1 - t) * t * cy + t * t * y]);
        }
        cur = [x, y];
      }
    }
    link(pts);
  }
  return out;
}

const parts = (body) => body.match(/<(?:line|rect|circle|path|polygon)\b[^>]*>/g) ?? [];
const isArrow = (el) => el.includes('class="ar"') || el.includes('class="arh"');
const isGround = (el) => el.includes('class="gr"');

function dist(a, b) {
  // distance segment-segment, echantillonnee : 12 points suffisent a 200x118
  let d = Infinity;
  for (let i = 0; i <= 12; i++) {
    const p = [a[0][0] + ((a[1][0] - a[0][0]) * i) / 12, a[0][1] + ((a[1][1] - a[0][1]) * i) / 12];
    for (let j = 0; j <= 12; j++) {
      const q = [b[0][0] + ((b[1][0] - b[0][0]) * j) / 12, b[0][1] + ((b[1][1] - b[0][1]) * j) / 12];
      d = Math.min(d, Math.hypot(p[0] - q[0], p[1] - q[1]));
    }
  }
  return d;
}

function report(key) {
  const body = FIG[key];
  if (!body) { console.log(`${key} : cle inconnue`); return; }
  const corps = parts(body).filter((e) => !isArrow(e) && !isGround(e)).flatMap(segments);
  const fleche = parts(body).filter(isArrow).flatMap(segments);
  const xs = corps.flatMap((s) => [s[0][0], s[1][0]]);
  const [min, max] = [Math.min(...xs), Math.max(...xs)];
  const libre = [];
  if (min >= 26) libre.push(`gauche x=${Math.round(min - 14)} (${Math.round(min)} u)`);
  if (200 - max >= 26) libre.push(`droite x=${Math.round(max + 14)} (${Math.round(200 - max)} u)`);
  let proche = null;
  for (const f of fleche) for (const c of corps) {
    const d = dist(f, c);
    if (proche === null || d < proche) proche = d;
  }
  console.log(
    `${key.padEnd(26)} corps x ${String(Math.round(min)).padStart(3)}→${String(Math.round(max)).padEnd(3)}` +
    `  libre: ${libre.join(', ') || 'AUCUNE colonne — poser la fleche dans une bande horizontale'}` +
    (proche === null ? '  [sans fleche]' : `  fleche a ${proche.toFixed(1)} u du corps${proche < 6 ? '  <-- TROP PRES' : ''}`),
  );
}

const arg = process.argv[2];
if (arg) report(arg);
else for (const k of Object.keys(FIG)) report(k);
