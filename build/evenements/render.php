<?php
/**
 * Bloc « Événements champis.net » sur le site : la même cible que le code
 * court [champis-evenements], que events.js (le viewScript du bloc, déclaré
 * dans champis-net.php) remplit.
 *
 * @var array $attributes Les attributs du bloc.
 *
 * @package ChampisNet
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// De 1 à 50, comme l'accepte champis.net (UpcomingEventsResource).
$champis_net_limit = isset( $attributes['limit'] ) ? max( 1, min( 50, (int) $attributes['limit'] ) ) : 10;
?>
<div <?php echo get_block_wrapper_attributes( array( 'class' => 'champis-events-flarum', 'data-limit' => (string) $champis_net_limit ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- échappé par get_block_wrapper_attributes(). ?>></div>
