/**
 * L'origine canonique du site, en un seul endroit.
 *
 * Elle vivait en trois copies : ce litteral dans
 * `scripts/build-exercise-pages.ts` (tout ce qui est genere), un autre dans
 * les balises SEO d'`index.html` (que `fillStaticTranslations()` ne voit pas,
 * faute de `data-i18n`), et rien du tout cote application — qui n'en avait pas
 * besoin tant qu'elle n'etait servie que depuis cette origine-la.
 *
 * Le portage mobile a change ca : dans le WebView natif, `location.origin`
 * vaut `https://localhost`, et une adresse construite a partir de lui ne
 * designe plus rien pour personne (voir `platform/native.ts`). L'application a
 * donc besoin de connaitre sa propre origine, et une quatrieme copie etait
 * exclue — au passage a cirkali.fr, aucune des deux existantes n'avait suivi
 * et le site a longtemps declare a Google que sa version de reference etait
 * github.io.
 *
 * Ce module est du **texte-donnee sans DOM**, importable des deux cotes : le
 * bundle navigateur comme les scripts Node du build. Ne rien y ajouter qui
 * touche a `window`.
 *
 * `index.html` garde ses litteraux — une balise `<meta>` ne s'execute pas —
 * mais `check-build.ts` verifie desormais qu'ils disent la meme chose que
 * cette constante.
 */
export const SITE_URL = 'https://cirkali.fr';
