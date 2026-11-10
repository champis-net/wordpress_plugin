import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { Disabled, PanelBody, RangeControl } from '@wordpress/components';

// La liste du site elle-même, en aperçu : elle lit l'adresse du forum dans
// window.champisEventsConfig, que champis-net.php donne aussi à l'éditeur.
import { Events } from '../../assets/js/events-list.jsx';

export default function Edit( { attributes, setAttributes } ) {
	const { limit } = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Réglages', 'champis-net' ) }>
					<RangeControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={ __( "Nombre d'événements", 'champis-net' ) }
						value={ limit }
						onChange={ ( value ) =>
							setAttributes( { limit: value ?? 10 } )
						}
						min={ 1 }
						max={ 50 }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps() }>
				<Disabled>
					<Events limit={ limit } />
				</Disabled>
			</div>
		</>
	);
}
