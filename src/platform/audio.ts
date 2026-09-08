// CIRKALI — Copyright (c) 2026. Tous droits réservés. Voir LICENSE.

/**
 * Trois sons distincts, pour que l'oreille seule les distingue sans regarder
 * l'ecran : `beepWarning()` (deux bips brefs, plus aigu) annonce qu'il reste
 * peu de temps ; `beep()` (un bip court et grave) marque la fin de la mise en
 * place et celle d'un repos ; `beepExerciseEnd()` (le meme ton, plus long)
 * marque la fin d'un exercice chronometre — plus marquant, puisque c'est le
 * signal qui compte le plus pour relacher l'effort.
 *
 * Un seul AudioContext pour toute la session : les navigateurs en plafonnent
 * le nombre (~6), et en creer un par bip finissait par rendre le son muet au
 * bout de quelques series.
 */

type AudioContextConstructor = new () => AudioContext;

function constructor(): AudioContextConstructor | undefined {
  const scope = window as unknown as {
    AudioContext?: AudioContextConstructor;
    webkitAudioContext?: AudioContextConstructor;
  };
  return scope.AudioContext ?? scope.webkitAudioContext;
}

let context: AudioContext | null = null;

function audioContext(): AudioContext | null {
  if (context) return context;
  const Ctor = constructor();
  if (!Ctor) return null;
  try {
    context = new Ctor();
  } catch {
    context = null;
  }
  return context;
}

/**
 * A appeler depuis un geste utilisateur : sans cela, le contexte reste
 * suspendu sur mobile et le premier bip est avale.
 */
export function primeAudio(): void {
  const ctx = audioContext();
  if (ctx && ctx.state === 'suspended') void ctx.resume();
}

/** Programme un bip sur l'horloge du contexte audio, a `offset` secondes de maintenant. */
function scheduleTone(ctx: AudioContext, freq: number, offset: number, ms: number): void {
  try {
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.type = 'sine';
    oscillator.frequency.value = freq;
    const start = ctx.currentTime + offset;
    gain.gain.setValueAtTime(0.25, start);
    gain.gain.exponentialRampToValueAtTime(0.001, start + ms / 1000);
    oscillator.start(start);
    oscillator.stop(start + ms / 1000);
  } catch {
    // Le son n'est qu'un confort : un echec ne doit jamais couper la seance.
  }
}

/** Bip de fin (mise en place, repos) : un seul ton court et grave. */
export function beep(): void {
  const ctx = audioContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') void ctx.resume();
  scheduleTone(ctx, 880, 0, 350);
}

/** Bip de fin d'exercice chronometre : le meme ton que `beep()`, tenu plus longtemps. */
export function beepExerciseEnd(): void {
  const ctx = audioContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') void ctx.resume();
  scheduleTone(ctx, 880, 0, 900);
}

/**
 * Bip d'avertissement (quelques secondes avant la fin) : deux tons courts et
 * plus aigus, pour ne jamais se confondre a l'oreille avec le bip de fin.
 */
export function beepWarning(): void {
  const ctx = audioContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') void ctx.resume();
  scheduleTone(ctx, 1320, 0, 100);
  scheduleTone(ctx, 1320, 0.15, 100);
}
