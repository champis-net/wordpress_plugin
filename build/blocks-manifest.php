<?php
// This file is generated. Do not modify it manually.
return array(
	'evenements' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'champis-net/evenements',
		'version' => '3.4.0',
		'title' => 'Événements champis.net',
		'category' => 'widgets',
		'icon' => 'calendar-alt',
		'description' => 'Les prochains événements mycologiques annoncés sur champis.net : expositions, sorties, journées d\'étude.',
		'keywords' => array(
			'champignons',
			'mycologie',
			'agenda',
			'champis'
		),
		'attributes' => array(
			'limit' => array(
				'type' => 'integer',
				'default' => 10
			)
		),
		'example' => array(
			'attributes' => array(
				'limit' => 3
			)
		),
		'supports' => array(
			'html' => false
		),
		'textdomain' => 'champis-net',
		'editorScript' => 'file:./index.js',
		'viewScript' => 'champis-events-flarum',
		'render' => 'file:./render.php'
	),
	'expo' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'champis-net/expo',
		'version' => '3.4.0',
		'title' => 'Exposition champis.net',
		'category' => 'widgets',
		'description' => 'La liste des espèces d\'une exposition de votre société sur champis.net : recherche, tri, photos, exports Excel et PDF.',
		'keywords' => array(
			'champignons',
			'mycologie',
			'espèces',
			'champis'
		),
		'attributes' => array(
			'exhibitionId' => array(
				'type' => 'integer'
			),
			'pageSize' => array(
				'type' => 'integer',
				'default' => 20
			)
		),
		'supports' => array(
			'html' => false,
			'align' => array(
				'wide',
				'full'
			)
		),
		'textdomain' => 'champis-net',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'viewScript' => 'champis-expo',
		'render' => 'file:./render.php'
	)
);
