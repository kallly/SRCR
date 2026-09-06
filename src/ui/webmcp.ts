import { t } from '../i18n';
import { decodeAiPlan, encodeAiPlan } from '../core/ai-plan';
import { encodeSharedPlan } from '../core/share';
import { GROUP_IDS } from '../data/groups';
import { LIBRARY } from '../data/library';
import type { Context } from './app';
import type { Share } from './share';

/**
 * WebMCP : expose les operations de l'app comme des outils appelables par un
 * navigateur agentique (`navigator.modelContext`), plutot que de laisser
 * l'agent deviner l'interface en lisant le DOM.
 *
 * Statut assume. C'est un draft du W3C Web Machine Learning Community Group,
 * en origin trial Chrome, et aucun agent grand public ne l'appelle
 * aujourd'hui — Claude, ChatGPT et Gemini lisent toujours la page. Le canal
 * qui porte reellement la fonctionnalite reste la section « Creer une seance
 * par lien » d'index.html et la page de spec generee ; ceci est un pari, pas
 * un socle. D'ou les trois precautions :
 *
 * - module charge en `import()` dynamique et SEULEMENT si l'API existe, donc
 *   zero octet au demarrage pour tout le monde (meme raisonnement que le
 *   generateur de QR et le contenu long des exercices) ;
 * - tout est enveloppe dans un try/catch : une API instable qui change de
 *   forme ne doit jamais empecher l'app de demarrer ;
 * - `create_session` OUVRE LE DIALOGUE D'IMPORT au lieu d'ecrire. Un agent
 *   propose, la personne dispose — meme invariant que pour un lien.
 *
 * Dans `ui/` et non `platform/` : `platform/` regroupe des capacites
 * navigateur pures (bip, verrou d'ecran) sans connaissance de l'app, alors
 * que ce module recoit un `Context` et manipule le deroule, comme les autres
 * modules d'interface.
 */

/**
 * Declaration ambiante locale : TypeScript ne connait pas l'API, et le
 * getter a deja migre de `navigator` vers `document` en cours de
 * specification. On teste donc les deux et on n'appelle rien sans l'avoir
 * verifie a l'execution.
 */
interface ModelContextTool {
  name: string;
  description: string;
  inputSchema: unknown;
  execute(args: Record<string, unknown>): Promise<{ content: { type: 'text'; text: string }[] }>;
}

interface ModelContextHost {
  provideContext?(context: { tools: ModelContextTool[] }): void;
  registerTool?(tool: ModelContextTool): void;
}

function host(): ModelContextHost | null {
  const fromDocument = (document as unknown as { modelContext?: ModelContextHost }).modelContext;
  if (fromDocument) return fromDocument;
  const fromNavigator = (navigator as unknown as { modelContext?: ModelContextHost }).modelContext;
  return fromNavigator ?? null;
}

function text(value: unknown): { content: { type: 'text'; text: string }[] } {
  return { content: [{ type: 'text', text: JSON.stringify(value) }] };
}

export function installWebMcp(ctx: Context, share: Share): void {
  const target = host();
  if (!target) return;

  const tools: ModelContextTool[] = [
    {
      name: 'list_exercises',
      description:
        "Liste les exercices de la bibliotheque : cle a utiliser dans une seance, nom traduit dans la langue active, groupe musculaire, materiel requis, type d'effort et reglages par defaut.",
      inputSchema: { type: 'object', properties: {} },
      execute: async () =>
        text({
          groups: GROUP_IDS.map((id) => ({ id, name: t(`group.${id}`) })),
          exercises: LIBRARY.map((entry) => ({
            key: entry.key,
            name: t(`exercise.${entry.key}.name`),
            group: entry.group,
            // Sans ca, une IA a qui on demande une seance « avec ce que j'ai
            // sous la main » ne peut pas distinguer un exercice au poids du
            // corps d'un exercice qui suppose une machine.
            category: entry.category,
            mode: entry.mode,
            sets: entry.sets,
            reps: entry.reps,
            seconds: entry.seconds,
            rest: entry.rest,
          })),
        }),
    },
    {
      name: 'get_active_session',
      description:
        "Renvoie la seance actuellement active, en JSON lisible, plus son lien de partage. Point de depart pour la modifier : renvoyer ensuite le resultat a create_session.",
      inputSchema: { type: 'object', properties: {} },
      execute: async () => {
        const plan = ctx.activePlan();
        return text({
          session: encodeAiPlan(plan),
          shareUrl: `${location.origin}${location.pathname}?s=${encodeSharedPlan(plan)}`,
        });
      },
    },
    {
      name: 'create_session',
      description:
        "Propose une seance a l'utilisateur. Le parametre `session` est un objet JSON { name, mode: 'classic'|'circuit', pause, trans, items: [{ ex, group?, sets, reps?, seconds?, rest? } | { rest }] } ; `ex` accepte une cle de la bibliotheque ou un nom libre, qui devient un exercice personnalise. N'ecrit rien directement : ouvre une fenetre ou l'utilisateur choisit de creer une nouvelle seance, de remplacer une seance de meme nom, ou d'ajouter les exercices a la seance active.",
      inputSchema: {
        type: 'object',
        properties: {
          session: {
            type: 'string',
            description: 'La seance, serialisee en JSON.',
          },
        },
        required: ['session'],
      },
      execute: async (args) => {
        const raw = args['session'];
        // `JSON.stringify(undefined)` renvoie la valeur `undefined` (pas la
        // chaine "undefined") : un hote qui omet `session` malgre le schema
        // ferait sinon planter decodeAiPlan() sur `encoded.trim()`. `?? ''`
        // retombe sur une chaine vide, que decodeAiPlan() refuse proprement.
        const encoded = typeof raw === 'string' ? raw : (JSON.stringify(raw) ?? '');
        const shared = decodeAiPlan(encoded);
        if (!shared) return text({ ok: false, error: t('share.importInvalid') });
        share.proposeImport(shared);
        return text({ ok: true, pendingUserConfirmation: true });
      },
    },
  ];

  try {
    if (typeof target.provideContext === 'function') {
      target.provideContext({ tools });
      return;
    }
    if (typeof target.registerTool === 'function') {
      for (const tool of tools) target.registerTool(tool);
    }
  } catch {
    // Une API en origin trial peut changer de signature d'une version de
    // Chrome a l'autre : l'app doit continuer sans elle.
  }
}
