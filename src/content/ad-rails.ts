/**
 * Les encarts publicitaires, en une seule source pour les trois surfaces.
 *
 * `index.html` (via le plugin `injectAdRails()` de vite.config.ts), les 310
 * fiches et la page de spec (via scripts/build-exercise-pages.ts) partagent ce
 * meme bloc. Recopier ce script a la main dans chaque gabarit aurait marche
 * aussi, mais trois copies d'une regle de conformite derivent tot ou tard, et
 * la derive serait muette : c'est justement la copie oubliee qui servirait des
 * publicites la ou on a promis qu'il n'y en aurait pas.
 *
 * Ce module n'entre jamais dans le bundle client : seuls la config Vite et le
 * script de generation l'importent, tous deux cote Node.
 *
 * --- La regle qui commande tout le reste ---
 *
 * Pas de publicite sur mobile, au sens fort : sous le seuil de largeur, aucun
 * element n'est cree, aucune requete ne part, `adsbygoogle.js` n'est pas
 * telecharge. D'ou un portillon en JavaScript et non une media-query CSS :
 *
 * - une regle `display: none` masquerait un encart deja demande, ce qui compte
 *   une impression jamais vue — interdit par la politique AdSense ;
 * - et le visiteur mobile paierait quand meme les ~100 Ko d'adsbygoogle.js,
 *   pour rien, en annulant le travail des deux derniers lots PageSpeed.
 */

/** Identifiant editeur AdSense. Le meme dans public/ads.txt et dans le <head>. */
export const AD_CLIENT = 'ca-pub-2139584209201341';

/**
 * Identifiants des emplacements, tels que crees dans la console AdSense.
 *
 * Vides tant que le compte n'est pas valide : le portillon saute alors
 * l'encart, et la page se comporte exactement comme aujourd'hui. C'est
 * volontaire — livrer un `<ins>` avec un `data-ad-slot` invente afficherait un
 * trou et polluerait les rapports. Les remplir est la seule chose a faire le
 * jour de la validation.
 *
 * Quatre emplacements et non deux : c'est ce qui permet de lire dans les
 * rapports AdSense ce que rapporte l'accueil par rapport aux fiches, donc de
 * decider plus tard sur des chiffres plutot qu'a l'estime.
 */
export const AD_SLOTS = {
  homeLeft: '6618301629', // cirkali-accueil-gauche
  homeRight: '2623216294', // cirkali-accueil-droite
  pageLeft: '4135126015', // cirkali-fiche-gauche
  pageRight: '1310134623', // cirkali-fiche-droite
} as const;

/** Largeur a partir de laquelle les marges peuvent accueillir un encart. */
export const AD_MIN_WIDTH = 1200;

/**
 * Le bloc <script> a poser en fin de <body>.
 *
 * `label` est le libelle visible de l'encart, deja traduit : les pages
 * generees n'ont aucun moteur i18n a l'execution. L'attribut `data-i18n` pose
 * en plus permet a `applyStaticTranslations()` de le retraduire sur l'accueil
 * quand la langue change ; il est inerte partout ailleurs.
 */
export function adRailsScript(left: string, right: string, label: string): string {
  const json = (v: unknown) => JSON.stringify(v);

  return `<script>
      (function () {
        // Seuil de largeur, jamais un test d'agent utilisateur : c'est la place
        // disponible qui decide, et une tablette en paysage vaut un ecran de PC.
        // Evalue UNE SEULE FOIS : redimensionner la fenetre n'insere pas de
        // publicite en cours de route, et n'en retire pas non plus.
        if (!matchMedia('(min-width: ${AD_MIN_WIDTH}px)').matches) return;

        var slots = [['ad-rail-l', ${json(left)}], ['ad-rail-r', ${json(right)}]];
        var units = [];
        for (var i = 0; i < slots.length; i++) {
          if (!slots[i][1]) continue; // emplacement pas encore cree cote AdSense
          var rail = document.createElement('aside');
          rail.className = 'ad-rail ' + slots[i][0];
          var tag = document.createElement('p');
          tag.className = 'ad-rail-tag';
          tag.setAttribute('data-i18n', 'ads.label');
          tag.textContent = ${json(label)};
          var ins = document.createElement('ins');
          ins.className = 'adsbygoogle';
          ins.style.display = 'block';
          ins.setAttribute('data-ad-client', ${json(AD_CLIENT)});
          ins.setAttribute('data-ad-slot', slots[i][1]);
          // 'vertical' d'abord : l'encart occupe une marge haute et etroite,
          // c'est un gratte-ciel (160x600, 300x600) qui la remplit, pas un
          // pave. Avec 'auto', AdSense ne voit qu'une largeur de 300px sans
          // hauteur imposee et sert un 300x250 tasse en haut d'une marge vide.
          // 'rectangle' reste en repli : la demande sur les formats verticaux
          // est plus mince, et un rail vide ne rapporte rien du tout. A
          // reexaminer sur les chiffres de remplissage, pas a l'estime.
          ins.setAttribute('data-ad-format', 'vertical, rectangle');
          // Sans ce 'false', un format responsive s'elargit a toute la largeur
          // du viewport et deborderait de la marge sur le contenu.
          ins.setAttribute('data-full-width-responsive', 'false');
          rail.appendChild(tag);
          rail.appendChild(ins);
          document.body.appendChild(rail);
          units.push(ins);
        }
        if (!units.length) return;

        // Meme motif que le chargeur GA (voir le <head> de l'accueil) : 'load'
        // et non 'DOMContentLoaded', puis requestIdleCallback. adsbygoogle.js
        // pese plus de 100 Ko et monopolise le thread principal ; le charger
        // pendant le rendu reprendrait d'une main les 500 ms gagnees en
        // supprimant le CSS bloquant.
        addEventListener('load', function () {
          var start = function () {
            var s = document.createElement('script');
            s.async = true;
            s.crossOrigin = 'anonymous';
            s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + ${json(AD_CLIENT)};
            document.head.appendChild(s);
            for (var i = 0; i < units.length; i++) {
              (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
          };
          if (window.requestIdleCallback) requestIdleCallback(start, { timeout: 4000 });
          else setTimeout(start, 1500);
        });
      })();
    </script>`;
}
