=== Champis.net ===
Contributors: feliciencorbat
Tags: champignons, mycologie, événements, exposition, société
Requires at least: 6.6
Tested up to: 7.1
Requires PHP: 7.2
Stable tag: 3.2.1
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Affiche sur votre site les prochains événements mycologiques et la liste des espèces de vos expositions, depuis le forum champis.net.

== Description ==

[Champis.net](https://champis.net) est le forum francophone de mycologie. Cette extension permet aux sociétés de mycologie d'afficher sur leur site, avec de simples codes courts, des informations publiées sur champis.net :

* **les prochains événements mycologiques** (expositions, sorties, journées d'étude...) annoncés sur le forum ;
* **la liste des espèces d'une exposition** saisie par votre société sur champis.net.

L'affichage reprend la police, les couleurs et les boutons de votre thème, et s'adapte aux petits écrans.

= Liste des espèces d'une exposition =

Le code court `[champis-expo-N]`, où N est le numéro de l'exposition, affiche :

* les dates de l'exposition, son lieu et son nombre d'espèces ;
* pour chaque espèce, son nom scientifique (avec un lien vers sa page sur champis.net) et son nom vernaculaire, son numéro si l'exposition numérote ses espèces, et une miniature de ses photos ;
* une recherche par nom ou numéro, qui ne tient pas compte des accents ;
* un menu « Trier par » : numéro (par défaut si l'exposition numérote ses espèces), nom scientifique (sinon), nom vernaculaire, derniers ou premiers ajouts ;
* les 20 premières espèces, puis 20 de plus à chaque clic sur « Afficher plus » ;
* un diaporama de toutes les photos de la liste, à partir de la première ou de celle d'une espèce (flèches de l'écran ou du clavier, glissement du doigt), légendées de leur numéro, nom scientifique et nom vernaculaire ;
* des liens pour télécharger la liste complète au format Excel ou PDF, préparée par champis.net.

= Prochains événements =

Le code court `[champis-evenements]` affiche les 10 prochains événements : dates, titre (avec un lien vers l'annonce sur champis.net), lieu et lien vers le site de l'événement.

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

`[champis-expo-N]` et `[champis-evenements]` lisent des données publiques sur le forum champis.net, directement depuis le navigateur du visiteur. Aucune donnée des visiteurs du site n'y est envoyée, hormis ce que contient toute requête web (adresse IP, navigateur). Les noms d'espèces renvoient vers les pages espèces de champis.net.

Conditions d'utilisation et confidentialité : https://champis.net

== Changelog ==

= 3.2.1 =
* Expositions : la liste reste lisible quel que soit le thème (taille du texte, champs, boutons et tableau), par exemple avec Divi.
* Retrait des anciens codes courts `[champis-events]` et `[champis-exhibition-N]`, dont les services (api.champis.net et intranet.champis.net) n'existent plus. Utilisez `[champis-evenements]` et `[champis-expo-N]`.

= 3.2.0 =
* Expositions : un script environ 15 fois plus léger (16 Ko au lieu de 236), sans bibliothèque d'interface ; la liste prend le style des champs, listes et boutons du thème.
* Expositions : une colonne « Espèce » réunit le nom scientifique et le nom vernaculaire, la colonne Famille est retirée ; le tri se fait par un menu « Trier par », qui propose aussi les derniers et les premiers ajouts.
* Expositions : « Afficher plus » (20 espèces de plus à chaque clic) remplace la pagination par pages.
* Expositions : un diaporama de toutes les photos de la liste ; une miniature l'ouvre à la photo de son espèce.
* Expositions : les fichiers Excel et PDF sont ceux de champis.net (la bibliothèque Excel n'est plus chargée), et le PDF est nouveau.

= 3.1.0 =
* Expositions : si l'exposition numérote ses espèces, une colonne N° (triable) s'affiche en premier et la liste est d'abord dans l'ordre des numéros (« 2a » avant « 10a »), y compris dans l'export Excel. Sans numéros, rien ne change : pas de colonne N° et ordre alphabétique par nom scientifique.

= 3.0.3 =
* Expositions : le texte de la liste n'est plus affiché en tout petit avec les thèmes qui réduisent la taille de base de la page (par exemple html { font-size: 62.5% }).

= 3.0.2 =
* Expositions : le nom de l'exposition n'est plus affiché au-dessus de la liste, il faisait doublon avec le titre de l'article ou de la page.

= 3.0.1 =
* Expositions : la colonne Photos n'apparaît que si l'exposition a des photos.

= 3.0.0 =
* Nouveau code court `[champis-expo-N]` : liste des espèces d'une exposition, lue depuis le nouveau forum champis.net.
* Nouveau code court `[champis-evenements]` : prochains événements, lus depuis le nouveau forum champis.net.
* Expositions : recherche par nom vernaculaire et famille sans tenir compte des accents, tri par colonne, colonne Famille, miniatures des photos, visionneuse avec légende, flèches du clavier et glissement du doigt, dates et nombre d'espèces, liens vers les pages espèces de champis.net, export Excel complet (numéro, auteur, famille), messages d'erreur, adaptation aux petits écrans.
* Événements : les adresses e-mail deviennent des liens, les liens affichent le nom du site plutôt que l'adresse complète, message en cas de panne.
* L'affichage reprend la police et la couleur des liens du thème.
* Les scripts ne sont chargés que sur les pages qui les utilisent, utilisent la version de React fournie par WordPress, et la bibliothèque Excel n'est chargée qu'au clic sur « Télécharger ».
* Nécessite WordPress 6.6 ou plus récent.

== Upgrade Notice ==

= 3.2.1 =
Les anciens codes courts `[champis-events]` et `[champis-exhibition-N]` sont retirés : remplacez-les par `[champis-evenements]` et `[champis-expo-N]`.

= 3.0.0 =
Nécessite WordPress 6.6. Nouveaux codes courts `[champis-expo-N]` et `[champis-evenements]` ; les anciens fonctionnent toujours.

== Développement ==

Les sources sont dans `assets/js/` et sont compilées dans `assets/dist/` :

    npm install
    npm run build

Voir `build.mjs` : `expo.js` et `events.js` utilisent le React fourni par WordPress. Les styles de `expo.js` (`assets/js/expo.css`) y sont embarqués.

Pour tester avec une autre instance du forum, définissez la constante `CHAMPIS_FLARUM_API_BASE` (par exemple dans `wp-config.php`) avant le chargement de l'extension.
