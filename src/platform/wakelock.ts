// CIRKALI — Copyright (c) 2026. Tous droits réservés. Voir LICENSE.

/**
 * Empeche l'ecran de s'eteindre pendant la seance.
 *
 * Le systeme relache le verrou des que l'ecran s'eteint ou que l'onglet passe
 * en arriere-plan ; on le redemande donc au retour, sans quoi il etait perdu
 * pour le reste de la seance.
 */

interface Sentinel {
  release(): Promise<void>;
}

interface WakeLockApi {
  request(type: 'screen'): Promise<Sentinel>;
}

function api(): WakeLockApi | undefined {
  return (navigator as Navigator & { wakeLock?: WakeLockApi }).wakeLock;
}

let sentinel: Sentinel | null = null;
let wanted = false;

async function request(): Promise<void> {
  const wakeLock = api();
  if (!wakeLock || sentinel) return;
  try {
    sentinel = await wakeLock.request('screen');
  } catch {
    sentinel = null;
  }
}

export async function acquireWakeLock(): Promise<void> {
  wanted = true;
  await request();
}

export async function releaseWakeLock(): Promise<void> {
  wanted = false;
  const held = sentinel;
  sentinel = null;
  if (!held) return;
  try {
    await held.release();
  } catch {
    // Deja relache par le systeme : rien a faire.
  }
}

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState !== 'visible') {
    // Le systeme l'a relache de son cote : on oublie la reference perimee.
    sentinel = null;
    return;
  }
  if (wanted) void request();
});
