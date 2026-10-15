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
 * Version:           3.0.3
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

add_filter( 'the_content', 'champis_net_add_events');
function champis_net_add_events( $content ) {
    
    if (strpos($content, '[champis-events]') !== false) {
        $now=time();
        $response = wp_remote_get( 'https://api.champis.net/v1/events');
        
        if ( is_wp_error( $response ) ) {
             return $content;
        } else {
            $events = json_decode(wp_remote_retrieve_body( $response ), true);
            $events = $events['hydra:member'];
        
            $addContent = "<ul>";
            foreach($events as $event) {
                $beginDate = new DateTime($event['beginDate']);
                $endDate = new DateTime($event['endDate']);
                $addContent .= "<li><div>".$beginDate->format('d.m.Y')." - ".$endDate->format('d.m.Y')."</div>";
                $addContent .= "<div><strong><a href=https://champis.net/viewtopic.php?t=".$event['topic']['id'].">".$event['topic']['title']."</a></strong></div>";
                $addContent .= "<div>".$event['place']."</div>";
                $addContent .= "<div><a href=".$event['url'].">".$event['url']."</a></div><br/>";
             }
        
            $addContent .= "</ul>";
            $number = 1;
            
            $content = str_replace('[champis-events]', $addContent, $content, $number);
            return $content;
        }
    }
    
    return $content;
        
}

// Les scripts React ne sont que déclarés ici (wp_register_script) : chaque
// filtre the_content ci-dessous ne les met en file (wp_enqueue_script) que
// s'il trouve son shortcode, pour que les pages sans widget ne les
// téléchargent pas. Ça marche parce qu'ils sont chargés en pied de page,
// imprimé après le contenu.

// Injecte les div cibles à la place des shortcodes
function champis_net_add_exhibition_react($content) {
    if (preg_match_all('/\[champis-exhibition-(\d+)\]/', $content, $matches)) {
        foreach ($matches[0] as $i => $fullTag) {
            $div = '<div class="champis-exhibition" data-exhibition-id="' . esc_attr($matches[1][$i]) . '"></div>';
            $content = str_replace($fullTag, $div, $content);
        }
        wp_enqueue_script('champis-exhibition');
    }
    return $content;
}
add_filter('the_content', 'champis_net_add_exhibition_react', 20);

// Déclare le script React compilé
function champis_register_react() {
    wp_register_script(
        'champis-exhibition',
        plugin_dir_url(__FILE__) . 'assets/dist/exhibition.js',
        ['wp-element'], // exhibition.js embarque toutefois son propre React (voir build.mjs)
        filemtime(plugin_dir_path(__FILE__) . 'assets/dist/exhibition.js'),
        true
    );
}
add_action('wp_enqueue_scripts', 'champis_register_react');

// --- Expositions provenant du nouveau forum Flarum (remplace à terme
// intranet.champis.net ci-dessus) ---
//
// Volontairement une copie parallèle des 2 fonctions ci-dessus, pas une
// factorisation avec elles : la partie intranet.champis.net sera retirée
// une fois la migration terminée, ce qui doit alors rester un simple
// "supprimer ces 2 fonctions-là et leur enqueue", sans démêler un code
// partagé avec ce qui reste. Voir aussi assets/js/expo.jsx, qui ne
// partage pas non plus de code avec exhibition.jsx pour la même raison.

// Le forum champis.net (Flarum depuis le 10 octobre 2026), lu directement
// par le navigateur du visiteur : CORS y est ouvert pour les expositions
// et les événements (AllowCorsForPublicExhibitions et
// AllowCorsForUpcomingEvents côté champis-flarum). Pour tester avec une
// autre instance, par exemple une copie locale du forum, définir cette
// constante dans wp-config.php.
if (! defined('CHAMPIS_FLARUM_API_BASE')) {
    define('CHAMPIS_FLARUM_API_BASE', 'https://champis.net');
}

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
// React vient de WordPress (voir build.mjs), et la bibliothèque xlsx n'est
// chargée qu'au clic sur « Télécharger Excel » (xlsxUrl).
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
        'xlsxUrl' => plugin_dir_url(__FILE__) . 'assets/dist/xlsx.mini.min.js?ver=' . filemtime(plugin_dir_path(__FILE__) . 'assets/dist/xlsx.mini.min.js'),
    ]);
}
add_action('wp_enqueue_scripts', 'champis_register_expo_react');

// --- Prochains événements provenant du nouveau forum Flarum (remplace à
// terme champis_net_add_events() ci-dessus, qui passe par api.champis.net)
// ---
//
// Copie parallèle, même raison que la section expo ci-dessus : la partie
// api.champis.net sera retirée une fois la migration terminée. En React
// cette fois (contrairement à champis_net_add_events(), du PHP pur) -
// demandé directement.
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

