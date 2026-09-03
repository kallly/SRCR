import { defineConfig, type Plugin } from 'vite';

/**
 * Remplace __BUILD_DATE__ (JSON-LD, dateModified) par la date reelle de
 * build, au format YYYY-MM-DD. Tourne aussi bien en dev qu'en prod : jamais
 * de valeur figee a maintenir a la main, jamais de placeholder visible.
 * Signal de fraicheur documente pour la citabilite par les moteurs IA — voir
 * CLAUDE.md, section « SEO & partage social ».
 */
function stampBuildDate(): Plugin {
  return {
    name: 'stamp-build-date',
    transformIndexHtml(html) {
      const today = new Date().toISOString().slice(0, 10);
      return html.replace('__BUILD_DATE__', today);
    },
  };
}

export default defineConfig({
  // Chemins relatifs : le build fonctionne sur user.github.io/<depot>/
  // sans avoir a coder le nom du depot en dur.
  base: './',
  plugins: [stampBuildDate()],
  // `host: true` expose le serveur sur le reseau local : la seance se teste
  // depuis le telephone, qui est l'appareil vise.
  server: { port: 8000, host: true, strictPort: true },
  preview: { port: 8000, host: true, strictPort: true },
  build: {
    target: 'es2022',
    outDir: 'dist',
  },
});
