/**
 * Bip de fin de chrono.
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

export function beep(): void {
  const ctx = audioContext();
  if (!ctx) return;
  if (ctx.state === 'suspended') void ctx.resume();
  try {
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.type = 'sine';
    oscillator.frequency.value = 880;
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.35);
  } catch {
    // Le son n'est qu'un confort : un echec ne doit jamais couper la seance.
  }
}
