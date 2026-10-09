// Build des scripts du plugin : npm run build
//
// - expo.js et events.js utilisent le React fourni par WordPress (scripts
//   'react', 'react-dom' et 'react-jsx-runtime', WordPress 6.6+) au lieu
//   d'embarquer leur propre copie (~170 Ko de moins chacun).
// - exhibition.js (intranet.champis.net, à retirer après la migration)
//   reste construit comme avant, React compris.
// - La bibliothèque xlsx n'est plus dans expo.js : son build prêt à
//   l'emploi est copié à côté et chargé seulement au clic sur « Télécharger
//   Excel » (voir loadXlsx() dans assets/js/expo.jsx).

import * as esbuild from "esbuild";
import { copyFile } from "node:fs/promises";

const WP_REACT_GLOBALS = {
    "react": "React",
    "react-dom": "ReactDOM",
    "react-dom/client": "ReactDOM",
    "react/jsx-runtime": "ReactJSXRuntime",
};

// Remplace chaque import de React (le nôtre comme ceux de MUI/emotion) par
// la variable globale correspondante de WordPress.
const wpReact = {
    name: "wp-react",
    setup(build) {
        build.onResolve({ filter: /^react(-dom)?(\/client|\/jsx-runtime)?$/ }, (args) => ({
            path: args.path,
            namespace: "wp-react",
        }));
        build.onLoad({ filter: /.*/, namespace: "wp-react" }, (args) => ({
            contents: `module.exports = window.${WP_REACT_GLOBALS[args.path]};`,
        }));
    },
};

const common = {
    bundle: true,
    minify: true,
    loader: { ".js": "jsx" },
    define: { "process.env.NODE_ENV": '"production"' },
    logLevel: "info",
};

await Promise.all([
    esbuild.build({ ...common, entryPoints: ["assets/js/expo.jsx"], outfile: "assets/dist/expo.js", plugins: [wpReact] }),
    esbuild.build({ ...common, entryPoints: ["assets/js/events.jsx"], outfile: "assets/dist/events.js", plugins: [wpReact] }),
    esbuild.build({ ...common, entryPoints: ["assets/js/exhibition.jsx"], outfile: "assets/dist/exhibition.js" }),
    copyFile("node_modules/xlsx/dist/xlsx.mini.min.js", "assets/dist/xlsx.mini.min.js"),
]);
