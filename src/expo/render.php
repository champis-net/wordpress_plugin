<?php
/**
 * Bloc « Exposition champis.net » sur le site : la même cible que le code
 * court [champis-expo-N], que expo.js (le viewScript du bloc, déclaré dans
 * champis-net.php) remplit, avec en plus le nombre d'espèces affichées
 * d'abord et à chaque clic sur « Afficher plus ». Rien sans exposition
 * choisie.
 *
 * @var array $attributes Les attributs du bloc.
 *
 * @package ChampisNet
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$champis_net_exhibition_id = isset( $attributes['exhibitionId'] ) ? absint( $attributes['exhibitionId'] ) : 0;

if ( ! $champis_net_exhibition_id ) {
	return;
}

// De 5 à 200, comme le réglage de l'éditeur ; 20 par défaut, comme le code court.
$champis_net_page_size = isset( $attributes['pageSize'] ) ? max( 5, min( 200, (int) $attributes['pageSize'] ) ) : 20;
?>
<div <?php echo get_block_wrapper_attributes( array( 'class' => 'champis-expo', 'data-exhibition-id' => (string) $champis_net_exhibition_id, 'data-page-size' => (string) $champis_net_page_size ) ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- échappé par get_block_wrapper_attributes(). ?>></div>
