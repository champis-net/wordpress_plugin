/**
 * Bloc « Événements champis.net » : les prochains événements, comme le code
 * court [champis-evenements], avec leur nombre en réglage.
 *
 * Bloc dynamique : rien n'est enregistré dans la page à part ce nombre,
 * render.php écrit la même cible que le code court.
 */
import { registerBlockType } from '@wordpress/blocks';

import Edit from './edit';
import metadata from './block.json';

registerBlockType( metadata.name, {
	edit: Edit,
} );
