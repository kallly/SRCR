import { App } from '@capacitor/app';

/**
 * Liens profonds : ce qui se passe quand le systeme ouvre l'application sur
 * une adresse cirkali.fr au lieu du navigateur.
 *
 * Sans ca, l'application ne peut RIEN recevoir. Toute l'importation de seance
 * passe par une URL (`?s=`, `?plan=`), et sur le web c'est le chargement de la
 * page qui la lit. Dans un binaire, la page ne navigue jamais : un lien
 * partage ouvrirait le navigateur, donc s'importerait dans le site — un autre
 * stockage, une autre liste de seances. La personne verrait le lien
 * « fonctionner » et sa seance n'arriverait nulle part.
 *
 * Ce module est charge en `import()` dynamique et SEULEMENT en natif (voir
 * ui/app.ts) : c'est la seule chose du projet qui importe reellement un
 * paquet `@capacitor/*`, et le bundle web n'a pas a le porter. Meme motif que
 * `ui/webmcp.ts`, charge apres avoir teste l'existence de l'API.
 *
 * --- Ce qui reste a faire cote domaine, et sans quoi rien ne se declenche ---
 *
 * Un lien ne s'ouvre dans l'application que si cirkali.fr le declare :
 * `/.well-known/assetlinks.json` pour Android (il faut l'empreinte SHA-256 de
 * la cle de signature) et `/.well-known/apple-app-site-association` pour iOS
 * (il faut l'identifiant d'equipe Apple). Ni l'une ni l'autre n'existe tant
 * que l'application n'a pas ete signee une premiere fois — voir
 * docs/portage-mobile.md. Jusque-la ce module s'installe et n'est jamais
 * appele, ce qui ne casse rien.
 */
export async function installDeepLinks(open: (url: string) => boolean): Promise<void> {
  // L'application etait deja lancee et passe au premier plan sur un lien.
  await App.addListener('appUrlOpen', (event) => {
    open(event.url);
  });

  // Et le cas du demarrage a froid : le systeme lance l'application PUIS
  // delivre l'URL, souvent avant que cet ecouteur existe. `getLaunchUrl()`
  // rattrape ce lien-la ; sans lui, un lien recu application fermee — le cas
  // le plus courant — serait perdu.
  const launch = await App.getLaunchUrl();
  if (launch?.url) open(launch.url);
}
