=== Champis.net ===
Contributors: feliciencorbat
Tags: champignons, mycologie, événements, exposition, société
Requires at least: 6.6
Tested up to: 7.1
Requires PHP: 7.2
Stable tag: 3.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Affiche sur votre site les prochains événements mycologiques et la liste des espèces de vos expositions, depuis le forum champis.net.

== Description ==

[Champis.net](https://champis.net) est le forum francophone de mycologie. Cette extension permet aux sociétés de mycologie d'afficher sur leur site, avec de simples codes courts, des informations publiées sur champis.net :

* **les prochains événements mycologiques** (expositions, sorties, journées d'étude...) annoncés sur le forum ;
* **la liste des espèces d'une exposition** saisie par votre société sur champis.net.

L'affichage reprend la police et la couleur des liens de votre thème, et s'adapte aux petits écrans.

= Liste des espèces d'une exposition =

Le code court `[champis-expo-N]`, où N est le numéro de l'exposition, affiche :

* le nom de l'exposition, ses dates, son lieu et son nombre d'espèces ;
* pour chaque espèce, son nom scientifique (avec un lien vers sa page sur champis.net), son nom vernaculaire, sa famille et ses photos ;
* une recherche par nom, famille ou numéro, qui ne tient pas compte des accents ;
* le tri par colonne et une pagination ;
* les photos en grand dans une visionneuse (flèches du clavier ou glissement du doigt pour passer d'une photo à l'autre) ;
* un bouton pour télécharger la liste complète au format Excel.

= Prochains événements =

Le code court `[champis-evenements]` affiche les 10 prochains événements : dates, titre (avec un lien vers l'annonce sur champis.net), lieu et lien vers le site de l'événement.

= Anciens codes courts =

`[champis-events]` (prochains événements depuis api.champis.net) et `[champis-exhibition-N]` (exposition depuis intranet.champis.net) fonctionnent toujours, mais seront retirés dans une prochaine version. Remplacez-les par `[champis-evenements]` et `[champis-expo-N]`.

== Installation ==

1. Installez l'extension depuis le menu Extensions > Ajouter une extension (recherchez « Champis.net »), puis activez-la.
2. Dans une page ou un article, ajoutez un bloc « Code court » contenant `[champis-evenements]` ou `[champis-expo-N]` (voir ci-dessous pour trouver N).
3. Enregistrez : la liste s'affiche sur la page publiée.

== Frequently Asked Questions ==

= Où trouver le numéro de mon exposition ? =

Ouvrez l'exposition sur champis.net : son numéro est à la fin de son adresse. Pour `https://champis.net/exhibitions/879`, utilisez `[champis-expo-879]`.

= Le site affiche « Cette exposition n'existe pas ou n'est pas publique » =

Vérifiez le numéro de l'exposition, puis les réglages de votre société sur champis.net : « Visible sans compte » doit être coché, et si « Domaines autorisés (partage externe) » est rempli, l'adresse de votre site doit y figurer (par exemple `https://www.exemple.ch`).

= Combien de temps faut-il pour qu'une modification apparaisse sur mon site ? =

Au plus 5 minutes : le navigateur de chaque visiteur garde la liste en mémoire pendant ce temps.

= Où obtenir de l'aide ? =

Sur le forum : [Plugin WordPress](https://champis.net/d/1025454-plugin-wordpress).

== Services externes ==

Selon les codes courts utilisés, l'extension lit des données publiques sur les services suivants. Aucune donnée des visiteurs du site n'y est envoyée, hormis ce que contient toute requête web (adresse IP, navigateur).

* champis.net (forum) : `[champis-expo-N]` et `[champis-evenements]`, lus directement par le navigateur du visiteur. Les noms d'espèces renvoient vers les pages espèces de champis.net.
* api.champis.net : `[champis-events]`, lu par le serveur du site.
* intranet.champis.net : `[champis-exhibition-N]`, lu par le navigateur du visiteur. Les noms d'espèces renvoient vers gbif.org.

Conditions d'utilisation et confidentialité : https://champis.net

== Changelog ==

= 3.0.0 =
* Nouveau code court `[champis-expo-N]` : liste des espèces d'une exposition, lue depuis le nouveau forum champis.net.
* Nouveau code court `[champis-evenements]` : prochains événements, lus depuis le nouveau forum champis.net.
* Expositions : recherche par nom vernaculaire et famille sans tenir compte des accents, tri par colonne, colonne Famille, miniatures des photos, visionneuse avec légende, flèches du clavier et glissement du doigt, dates et nombre d'espèces, liens vers les pages espèces de champis.net, export Excel complet (numéro, auteur, famille), messages d'erreur, adaptation aux petits écrans.
* Événements : les adresses e-mail deviennent des liens, les liens affichent le nom du site plutôt que l'adresse complète, message en cas de panne.
* L'affichage reprend la police et la couleur des liens du thème.
* Les scripts ne sont chargés que sur les pages qui les utilisent, utilisent la version de React fournie par WordPress, et la bibliothèque Excel n'est chargée qu'au clic sur « Télécharger ».
* Nécessite WordPress 6.6 ou plus récent.

== Upgrade Notice ==

= 3.0.0 =
Nécessite WordPress 6.6. Nouveaux codes courts `[champis-expo-N]` et `[champis-evenements]` ; les anciens fonctionnent toujours.

== Développement ==

Les sources sont dans `assets/js/` et sont compilées dans `assets/dist/` :

    npm install
    npm run build

Voir `build.mjs` : `expo.js` et `events.js` utilisent le React fourni par WordPress, `exhibition.js` embarque le sien, et la bibliothèque xlsx (`assets/dist/xlsx.mini.min.js`) n'est chargée qu'au clic sur « Télécharger la liste (Excel) ».

Pour tester avec une autre instance du forum, définissez la constante `CHAMPIS_FLARUM_API_BASE` (par exemple dans `wp-config.php`) avant le chargement de l'extension.
