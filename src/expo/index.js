/**
 * Bloc « Exposition champis.net » : la liste des espèces d'une exposition,
 * comme le code court [champis-expo-N], choisie dans un menu.
 *
 * Bloc dynamique : rien n'est enregistré dans la page à part le numéro de
 * l'exposition, render.php écrit la même cible que le code court.
 */
import { registerBlockType } from '@wordpress/blocks';

import Edit from './edit';
import icon from './icon';
import metadata from './block.json';

registerBlockType( metadata.name, {
	icon,
	edit: Edit,
} );
