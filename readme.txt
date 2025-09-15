=== Champis.net ===

Tested up to: 5.9
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Cette extension ajoute une la liste des prochains événements mycologiques.

== Description ==

Cette extension ajoute une la liste des prochains événements mycologiques provenant du site https://champis.net (la même liste que celle présente en bas de la page d'accueil du site).

Ce site utilise l'API de champis.net et renvoie des données. Des liens renvoient également vers le site champis.net avec le détail des informations des événements. La documentation de l'API et les règles d'usage sont présentes à l'adresse https://api.champis.net

== Installation ==

1. Charger l'extension dans votre site Wordpress.
2. Activer l'extension en vous rendant dans le menu Extensions
3. Créer une page ou un article avec un titre (par exemple Evénements mycologiques)
4. Dans le corps de l'article ou de la page, ajouter [champis-events] pour ajouter les événements ou [champis-exhibition-id] (remplacer id par le numéro) pour récupérer les espèces de l'exposition.

== FAQ ==

Si vous souhaitez plus d'informations, avez des questions ou des demandes particulières, rendez-vous ici:  https://champis.net/viewtopic.php?f=12&t=25454

== Développement ==

npm install --save-dev esbuild react react-dom
npx esbuild assets/js/exhibition.jsx --bundle --outfile=assets/dist/exhibition.js --minify --loader:.js=jsx
