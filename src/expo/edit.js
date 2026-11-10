import { __, sprintf } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
	Button,
	Disabled,
	ExternalLink,
	Notice,
	PanelBody,
	Placeholder,
	RangeControl,
	SelectControl,
	Spinner,
} from '@wordpress/components';
import { useCallback, useEffect, useState } from '@wordpress/element';

import { Expo } from '../../assets/js/expo-widget.jsx';
// Les styles de la liste, que le code court ajoute lui-même à la page :
// compilés dans index.css, l'editorStyle du bloc, chargé dans l'éditeur.
import '../../assets/js/expo.css';
import icon from './icon';

// window.champisExpoConfig : l'adresse du forum (apiBase) et celle du site
// (siteOrigin), données par champis-net.php à l'éditeur.
function config() {
	return window.champisExpoConfig || {};
}

function apiBase() {
	return config().apiBase || 'https://champis.net';
}

function formatDate( isoDate ) {
	const [ year, month, day ] = isoDate.split( '-' );
	return `${ day }.${ month }.${ year }`;
}

function exhibitionLabel( exhibition ) {
	const { name, startDate, endDate } = exhibition;
	const dates =
		endDate && endDate !== startDate
			? `${ formatDate( startDate ) } - ${ formatDate( endDate ) }`
			: formatDate( startDate );
	return `${ name } (${ dates })`;
}

// Les expositions que ce site peut afficher, les plus récentes d'abord :
// celles des sociétés qui ont indiqué son adresse dans « Domaines autorisés
// (partage externe) » sur champis.net (ListEmbeddableExhibitionsController
// côté champis-flarum). Ce sont aussi les seules que champis.net laisse ce
// site lire ensuite.
function useExhibitions() {
	const [ exhibitions, setExhibitions ] = useState( [] );
	// loading | ready | error
	const [ status, setStatus ] = useState( 'loading' );

	const load = useCallback( () => {
		setStatus( 'loading' );
		const origin = encodeURIComponent( config().siteOrigin || '' );
		fetch(
			`${ apiBase() }/api/champis-exhibitions-embeddable?origin=${ origin }`
		)
			.then( ( res ) => {
				if ( ! res.ok ) {
					throw new Error( `HTTP ${ res.status }` );
				}
				return res.json();
			} )
			.then( ( json ) => {
				setExhibitions( json.data ?? [] );
				setStatus( 'ready' );
			} )
			.catch( () => setStatus( 'error' ) );
	}, [] );

	useEffect( () => {
		load();
	}, [ load ] );

	return { exhibitions, status, reload: load };
}

function ExhibitionOptions( { exhibitions } ) {
	return exhibitions.map( ( exhibition ) => (
		<option key={ exhibition.id } value={ String( exhibition.id ) }>
			{ exhibitionLabel( exhibition ) }
		</option>
	) );
}

// Le menu des expositions, groupées par société quand plusieurs sociétés ont
// autorisé ce site. Une exposition déjà choisie qui n'y est plus (son
// adresse retirée des domaines autorisés) reste choisie, sous son numéro.
function ExhibitionSelect( { exhibitions, value, onChange } ) {
	const societies = [
		...new Set(
			exhibitions.map( ( exhibition ) => exhibition.societyName )
		),
	];
	const isListed = exhibitions.some(
		( exhibition ) => exhibition.id === value
	);

	return (
		<SelectControl
			__next40pxDefaultSize
			__nextHasNoMarginBottom
			label={ __( 'Exposition', 'champis-net' ) }
			value={ value ? String( value ) : '' }
			onChange={ ( newValue ) =>
				onChange( newValue ? parseInt( newValue, 10 ) : undefined )
			}
		>
			<option value="">
				{ __( 'Choisir une exposition…', 'champis-net' ) }
			</option>
			{ value && ! isListed && (
				<option value={ String( value ) }>
					{ sprintf(
						/* translators: %d: numéro de l'exposition sur champis.net */
						__( 'Exposition n° %d', 'champis-net' ),
						value
					) }
				</option>
			) }
			{ societies.length > 1 ? (
				societies.map( ( society ) => (
					<optgroup key={ society } label={ society }>
						<ExhibitionOptions
							exhibitions={ exhibitions.filter(
								( exhibition ) =>
									exhibition.societyName === society
							) }
						/>
					</optgroup>
				) )
			) : (
				<ExhibitionOptions exhibitions={ exhibitions } />
			) }
		</SelectControl>
	);
}

function NoExhibition() {
	return (
		<p>
			{ sprintf(
				/* translators: %s: adresse du site, par exemple https://www.exemple.ch */
				__(
					"Aucune exposition n'est encore proposée pour ce site. Sur champis.net, ouvrez la page de votre société, cliquez sur « Modifier » et ajoutez %s aux « Domaines autorisés (partage externe) ».",
					'champis-net'
				),
				config().siteOrigin || window.location.origin
			) }
		</p>
	);
}

function LoadError( { onRetry } ) {
	return (
		<>
			<p>
				{ __(
					"Les expositions n'ont pas pu être chargées depuis champis.net.",
					'champis-net'
				) }
			</p>
			<Button variant="secondary" onClick={ onRetry }>
				{ __( 'Réessayer', 'champis-net' ) }
			</Button>
		</>
	);
}

export default function Edit( { attributes, setAttributes } ) {
	const { exhibitionId, pageSize } = attributes;
	const { exhibitions, status, reload } = useExhibitions();
	const blockProps = useBlockProps();

	const onChange = ( newId ) => setAttributes( { exhibitionId: newId } );

	let choice;
	if ( status === 'loading' ) {
		choice = <Spinner />;
	} else if ( status === 'error' ) {
		choice = <LoadError onRetry={ reload } />;
	} else if ( exhibitions.length === 0 && ! exhibitionId ) {
		choice = <NoExhibition />;
	} else {
		choice = (
			<ExhibitionSelect
				exhibitions={ exhibitions }
				value={ exhibitionId }
				onChange={ onChange }
			/>
		);
	}

	if ( ! exhibitionId ) {
		return (
			<div { ...blockProps }>
				<Placeholder
					icon={ icon }
					label={ __( 'Exposition champis.net', 'champis-net' ) }
					instructions={ __(
						"Choisissez une exposition de votre société : la liste de ses espèces s'affichera ici.",
						'champis-net'
					) }
				>
					{ choice }
				</Placeholder>
			</div>
		);
	}

	const isListed =
		status !== 'ready' ||
		exhibitions.some( ( exhibition ) => exhibition.id === exhibitionId );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Réglages', 'champis-net' ) }>
					{ choice }
					<p>
						<ExternalLink
							href={ `${ apiBase() }/expo/${ exhibitionId }` }
						>
							{ __( 'Voir sur champis.net', 'champis-net' ) }
						</ExternalLink>
					</p>
					<RangeControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={ __( 'Espèces affichées', 'champis-net' ) }
						help={ __(
							'Au chargement de la page, puis à chaque clic sur « Afficher plus ».',
							'champis-net'
						) }
						value={ pageSize }
						onChange={ ( value ) =>
							setAttributes( { pageSize: value ?? 20 } )
						}
						min={ 5 }
						max={ 200 }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				{ ! isListed && (
					<Notice status="warning" isDismissible={ false }>
						{ __(
							"Cette exposition n'est pas proposée pour ce site : son adresse ne figure pas dans les « Domaines autorisés (partage externe) » de la société sur champis.net, et la liste ne s'affichera pas sur la page publiée.",
							'champis-net'
						) }
					</Notice>
				) }
				<Disabled>
					<Expo
						key={ exhibitionId }
						exhibitionId={ exhibitionId }
						pageSize={ pageSize }
					/>
				</Disabled>
			</div>
		</>
	);
}
