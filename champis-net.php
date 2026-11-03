<?php
/**
 * Champis.net
 *
 * @package           PluginPackage
 * @author            Félicien Corbat
 * @copyright         2021 Champis.net
 * @license           GPL-2.0-or-later
 *
 * @wordpress-plugin
 * Plugin Name:       Champis.net
 * Plugin URI:        https://champis.net/d/1025454-plugin-wordpress
 * Description:       Affiche les prochains événements mycologiques et la liste des espèces d'une exposition publiés sur le forum champis.net.
 * Version:           3.2.1
 * Requires at least: 6.6
 * Requires PHP:      7.2
 * Author:            Félicien Corbat
 * Author URI:        https://champis.net
 * License:           GPL v2 or later
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 */

/*
Champis.net is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 2 of the License, or
any later version.
 
Champis.net is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.
*/

// Les scripts React ne sont que déclarés ici (wp_register_script) : chaque
// filtre the_content ci-dessous ne les met en file (wp_enqueue_script) que
// s'il trouve son shortcode, pour que les pages sans widget ne les
// téléchargent pas. Ça marche parce qu'ils sont chargés en pied de page,
// imprimé après le contenu.

// Le forum champis.net (Flarum depuis le 10 octobre 2026), lu directement
// par le navigateur du visiteur : CORS y est ouvert pour les expositions
// et les événements (AllowCorsForPublicExhibitions et
// AllowCorsForUpcomingEvents côté champis-flarum). Pour tester avec une
// autre instance, par exemple une copie locale du forum, définir cette
// constante dans wp-config.php.
if (! defined('CHAMPIS_FLARUM_API_BASE')) {
    define('CHAMPIS_FLARUM_API_BASE', 'https://champis.net');
}

// --- Expositions ---

// Injecte les div cibles à la place des shortcodes [champis-expo-N]. Seul
// sur sa ligne, le shortcode a déjà été entouré d'un <p> par wpautop
// (priorité 10, ce filtre-ci est à 20) : le <p> est remplacé avec lui, un
// <div> dans un <p> n'étant pas du HTML valide (le navigateur coupe le
// paragraphe et laisse des marges vides autour du widget).
function champis_net_add_expo_react($content) {
    return preg_replace_callback(
        '#<p>\s*\[champis-expo-(\d+)\]\s*</p>|\[champis-expo-(\d+)\]#',
        function ($matches) {
            $id = $matches[1] !== '' ? $matches[1] : $matches[2];
            wp_enqueue_script('champis-expo');
            return '<div class="champis-expo" data-exhibition-id="' . esc_attr($id) . '"></div>';
        },
        $content
    );
}
add_filter('the_content', 'champis_net_add_expo_react', 20);

// Déclare le script React compilé, avec l'URL de base de l'API Flarum
// injectée en JS (window.champisExpoConfig.apiBase) plutôt que codée en
// dur dans le bundle - un changement de domaine (dev -> prod) ne demande
// alors qu'un changement de la constante ci-dessus, pas une recompilation.
// React vient de WordPress (voir build.mjs) ; les fichiers Excel et PDF,
// de champis.net.
function champis_register_expo_react() {
    wp_register_script(
        'champis-expo',
        plugin_dir_url(__FILE__) . 'assets/dist/expo.js',
        ['react', 'react-dom', 'react-jsx-runtime'],
        filemtime(plugin_dir_path(__FILE__) . 'assets/dist/expo.js'),
        true
    );
    wp_localize_script('champis-expo', 'champisExpoConfig', [
        'apiBase' => CHAMPIS_FLARUM_API_BASE,
    ]);
}
add_action('wp_enqueue_scripts', 'champis_register_expo_react');

// --- Prochains événements ---
//
// Pas de paramètre de nombre d'événements dans le shortcode pour l'instant
// (data-limit fixé à 10, même défaut que côté Flarum) - à ajouter si
// besoin plus tard.
//
// Le <p> que wpautop a mis autour du shortcode seul sur sa ligne est
// remplacé avec lui - voir champis_net_add_expo_react().
function champis_net_add_events_react($content) {
    return preg_replace_callback(
        '#<p>\s*\[champis-evenements\]\s*</p>|\[champis-evenements\]#',
        function () {
            wp_enqueue_script('champis-events-flarum');
            return '<div class="champis-events-flarum" data-limit="10"></div>';
        },
        $content
    );
}
add_filter('the_content', 'champis_net_add_events_react', 20);

function champis_register_events_react() {
    wp_register_script(
        'champis-events-flarum',
        plugin_dir_url(__FILE__) . 'assets/dist/events.js',
        ['react', 'react-dom', 'react-jsx-runtime'],
        filemtime(plugin_dir_path(__FILE__) . 'assets/dist/events.js'),
        true
    );
    wp_localize_script('champis-events-flarum', 'champisEventsConfig', [
        'apiBase' => CHAMPIS_FLARUM_API_BASE,
    ]);
}
add_action('wp_enqueue_scripts', 'champis_register_events_react');

