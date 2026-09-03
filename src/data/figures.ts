import type { ExerciseKey } from '../core/types';

/**
 * Figures des exercices : corps du <svg>, dessine dans une viewBox 200x118.
 * Les classes (`s`, `obj`, `gr`, `hd`, `ar`, `arh`) sont colorees par la CSS,
 * ce qui garde les figures lisibles quel que soit le fond.
 */
const FIGURES: Record<ExerciseKey, string> = {
  inclined: `<line class="gr" x1="10" y1="112" x2="190" y2="112"/><rect class="obj" x="18" y="64" width="52" height="48"/><path class="s" d="M56 42 L118 78 L178 110"/><path class="s" d="M170 110 L182 104"/><path class="s" d="M56 42 L62 54 L53 64"/><circle class="hd" cx="46" cy="30" r="10"/><path class="ar" d="M140 52 L140 36"/><polygon class="arh" points="140,30 136,40 144,40"/><path class="ar" d="M140 68 L140 84"/><polygon class="arh" points="140,90 136,80 144,80"/>`,
  chairsquat: `<line class="gr" x1="10" y1="112" x2="190" y2="112"/><rect class="obj" x="22" y="72" width="56" height="7"/><line class="obj" x1="28" y1="79" x2="28" y2="112"/><line class="obj" x1="72" y1="79" x2="72" y2="112"/><line class="obj" x1="24" y1="72" x2="24" y2="30"/><line class="obj" x1="24" y1="32" x2="52" y2="32"/><path class="s" d="M60 66 L72 36"/><circle class="hd" cx="76" cy="24" r="10"/><path class="s" d="M60 66 L98 70 L98 112"/><path class="s" d="M92 112 L108 112"/><path class="s" d="M70 40 L112 34"/>`,
  calf: `<line class="gr" x1="10" y1="112" x2="190" y2="112"/><circle class="hd" cx="100" cy="20" r="10"/><path class="s" d="M100 30 L100 66"/><path class="s" d="M100 40 L84 64"/><path class="s" d="M100 40 L116 64"/><path class="s" d="M100 66 L90 90 L90 104 L100 112"/><path class="s" d="M100 66 L110 90 L110 104 L120 112"/><path class="ar" d="M140 84 L140 56"/><polygon class="arh" points="140,50 136,60 144,60"/><path class="ar" d="M60 84 L60 56"/><polygon class="arh" points="60,50 56,60 64,60"/>`,
  wallsit: `<line class="gr" x1="10" y1="112" x2="190" y2="112"/><line class="obj" x1="36" y1="6" x2="36" y2="112" style="stroke-width:5"/><circle class="hd" cx="48" cy="30" r="10"/><path class="s" d="M46 40 L46 74 L100 74 L100 112"/><path class="s" d="M94 112 L110 112"/><path class="s" d="M47 50 L88 54"/><path class="ar" d="M58 92 L94 92"/>`,
  rotation: `<line class="gr" x1="10" y1="112" x2="190" y2="112"/><circle class="hd" cx="44" cy="88" r="10"/><path class="s" d="M64 92 L126 96"/><path class="s" d="M126 96 L156 86 L178 100"/><path class="s" d="M58 94 L44 104"/><path class="s" d="M66 90 L88 88 L91 58"/><rect class="obj" x="84" y="38" width="15" height="20" rx="3"/><path class="ar" d="M124 78 Q120 56 100 48" stroke-dasharray="5 4"/><polygon class="arh" points="94,45 104,44 100,53"/>`,
  deadbug: `<line class="gr" x1="10" y1="110" x2="190" y2="110"/><circle class="hd" cx="50" cy="90" r="10"/><path class="s" d="M66 96 L124 100"/><path class="s" d="M66 96 L64 78 L62 58"/><path class="s" d="M66 96 L44 100 L22 88"/><path class="s" d="M124 100 L126 68 L154 66"/><path class="s" d="M124 100 L152 104 L180 106"/>`,
  plank: `<line class="gr" x1="10" y1="110" x2="190" y2="110"/><circle class="hd" cx="62" cy="64" r="10"/><path class="s" d="M80 72 L132 90 L178 108"/><path class="s" d="M172 108 L184 100"/><path class="s" d="M80 72 L76 110 L44 110"/>`,
  walk: `<line class="gr" x1="10" y1="112" x2="190" y2="112"/><circle class="hd" cx="94" cy="18" r="10"/><path class="s" d="M94 28 L92 66"/><path class="s" d="M94 38 L106 52 L112 64"/><path class="s" d="M94 38 L80 52 L74 64"/><path class="s" d="M92 66 L74 88 L68 110 L58 112"/><path class="s" d="M92 66 L114 86 L122 110 L132 112"/>`,
  custom: `<line class="gr" x1="10" y1="112" x2="190" y2="112"/><circle class="hd" cx="100" cy="30" r="10"/><path class="s" d="M100 40 L100 74"/><path class="s" d="M100 50 L78 60"/><path class="s" d="M100 50 L122 60"/><path class="s" d="M100 74 L86 112"/><path class="s" d="M100 74 L114 112"/>`,
};

/**
 * Corps SVG complet pour une cle donnee. Accepte une chaine libre et se rabat
 * sur la figure generique : une seance restauree depuis le stockage peut
 * porter une cle inconnue.
 */
export function figureSvg(key: string): string {
  const body = FIGURES[key as ExerciseKey] ?? FIGURES.custom;
  return `<svg viewBox="0 0 200 118" aria-hidden="true">${body}</svg>`;
}
