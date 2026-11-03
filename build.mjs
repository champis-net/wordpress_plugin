// Build des scripts du plugin : npm run build
//
// - expo.js et events.js utilisent le React fourni par WordPress (scripts
//   'react', 'react-dom' et 'react-jsx-runtime', WordPress 6.6+) au lieu
//   d'embarquer leur propre copie (~170 Ko de moins chacun).
// - expo.js n'a pas de bibliothèque d'interface, et ses styles
//   (assets/js/expo.css) y sont embarqués comme texte (loader "text") :
//   un seul fichier à charger.

import * as esbuild from "esbuild";

const WP_REACT_GLOBALS = {
    "react": "React",
    "react-dom": "ReactDOM",
    "react-dom/client": "ReactDOM",
    "react/jsx-runtime": "ReactJSXRuntime",
};

// Remplace chaque import de React par la variable globale correspondante de
// WordPress.
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
    loader: { ".js": "jsx", ".css": "text" },
    define: { "process.env.NODE_ENV": '"production"' },
    logLevel: "info",
};

await Promise.all([
    esbuild.build({ ...common, entryPoints: ["assets/js/expo.jsx"], outfile: "assets/dist/expo.js", plugins: [wpReact] }),
    esbuild.build({ ...common, entryPoints: ["assets/js/events.jsx"], outfile: "assets/dist/events.js", plugins: [wpReact] }),
]);
