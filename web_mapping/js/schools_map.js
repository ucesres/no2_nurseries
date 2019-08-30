// JavaScript source code for NO2 in schools project
// Initiated by Ed Sharp e.sharp@ucl.ac.uk | 26/05/2017
// colors for graduated markers
var colorList = [
	[0, '#1b9e77'],
	[30, '#d95f02'],
	[40, '#7570b3'],
	[50, '#e7298a'],
	[60, '#1a1a1a']
];
// different colorlist for polygons to remove zeros
var colorList_ploy = [
	[1, '#1b9e77'],
	[30, '#d95f02'],
	[40, '#7570b3'],
	[50, '#e7298a'],
	[60, '#1a1a1a']
];
// zoom level at which to show detailed polygons
var zoomThreshold = 8;
var zoomThresholdgrid = 10;
mapboxgl.accessToken = 'insert your token here';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/light-v9', //stylesheet location
    center: [-6, 55], // starting position
    zoom: 5 // starting zoom
});
// JavaScript source code
// load all Scottish schools
map.on('style.load', function () {
    map.addSource("markers_scotland", {
        "type": "geojson",
        "data": "data/all_schools_scotland.json"
    });
    map.addSource("markers_NI", {
        "type": "geojson",
        "data": "data/all_schools_ni.json"
    });
    map.addSource("markers_ENG", {
        "type": "geojson",
        "data": "data/all_schools_england.json"
    });
    map.addSource("markers_wales", {
        "type": "geojson",
        "data": "data/all_schools_wales.json"
    });
    map.addSource("defra_roads", {
        "type": "geojson",
        "data": "data/convert_def_raod.json"
    });
    map.addSource("markers", {
        "type": "geojson",
        "data": "data/all_150_wgs_v1.json"
    });
    map.addSource("gridded_conc", {
        "type": "geojson",
        "data": "data/no_grid_gt_0.json"
    });
    // display schools 
    map.addLayer({
        "id": "All Scottish Schools",
        "type": "circle",
        "source": "markers_scotland",
        "minzoom": zoomThreshold,
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            //Add data-driven styles for circle-color
            'circle-color': '#575757',
            //Add data-driven styles for circle radius
            // can alter circle size by zoom
            'circle-radius': {
                stops: [
					[4, 2],
					[8, 3],
					[11, 4],
					[16, 5]
                ]
            },
            'circle-opacity': 0.4
        }
    });
    
    // display schools 
    map.addLayer({
        "id": "All Northern Irish Schools",
        "type": "circle",
        "source": "markers_NI",
        "minzoom": zoomThreshold,
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            //Add data-driven styles for circle-color
            'circle-color': '#575757',
            //Add data-driven styles for circle radius
            // can alter circle size by zoom
            'circle-radius': {
                stops: [
					[4, 2],
					[8, 2],
					[11, 4],
					[16, 5]
                ]
            },
            'circle-opacity': 0.4
        }
    });

    // display schools 
    map.addLayer({
        "id": "All English Schools",
        "type": "circle",
        "source": "markers_ENG",
        "minzoom": zoomThreshold,
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            //Add data-driven styles for circle-color
            'circle-color': '#575757',
            //Add data-driven styles for circle radius
            // can alter circle size by zoom
            'circle-radius': {
                stops: [
					[4, 2],
					[8, 2],
					[11, 4],
					[16, 5]
                ]
            },
            'circle-opacity': 0.4
        }
    });

    // display schools 150
    map.addLayer({
        "id": "All Welsh Schools",
        "type": "circle",
        "source": "markers_wales",
        "minzoom": zoomThreshold,
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            //Add data-driven styles for circle-color
            'circle-color': '#575757',
            //Add data-driven styles for circle radius
            // can alter circle size by zoom
            'circle-radius': {
                stops: [
					[4, 2],
					[8, 2],
					[11, 4],
					[16, 5]
                ]
            },
            'circle-opacity': 0.4
        }
    });

    // display defra roads
    map.addLayer({
        "id": "Defra Roads",
        "type": "line",
        "source": "defra_roads",
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
            "line-color": {
                // this defines clor, 
                property: 'rno2',
                type: 'interval',
                stops: colorList
            },
            "line-width": {
                stops: [
					[4, 2],
					[8, 4],
					[11, 6],
					[16, 10]
                ]
            }
        }
    });

    // display schools 150
    map.addLayer({
        "id": "Schools within 150 m of road above 40 ug/m3 limit",
        "type": "circle",
        "source": "markers",
        'paint': {
            //Add data-driven styles for circle-color
            'circle-color': {
                // this defines clor, but expects to be passed a number
                property: 'rno2_excee',
                type: 'interval',
                stops: colorList
            },
            //Add data-driven styles for circle radius
            // can alter circle size by zoom
            'circle-radius': {
                stops: [
					[8, 4],
					[11, 6],
					[16, 10]
                ]
            },
            'circle-opacity': 0.8
        }
    });
    // display gridded concentration
    map.addLayer({
        "id": "Gridded NO2 Concentration",
        "type": "fill",
        "source": "gridded_conc",
        "minzoom": zoomThresholdgrid,
        'layout': {
            'visibility': 'none'
        },
        'paint': {
            'fill-color': {
                property: 'Total_NO2_',
                type: 'interval',
                stops: colorList_ploy
            },
            'fill-opacity': 0.6
        }
    });
});

// When a click event occurs on a feature in the places layer, open a popup at the
// location of the feature, with description HTML from its properties.
// use b tage for ease, replace with css if problems
var clickayers = ['All Scottish Schools', 'All Welsh Schools', 'All Northern Irish Schools', 'All English Schools', 'Schools within 150 m of road above 40 ug/m3 limit'];
for (var i = 0; i < clickayers.length; i++) {
    var cid = clickayers[i];
    map.on('click', cid, function (e) {
        new mapboxgl.Popup()
            .setLngLat(e.features[0].geometry.coordinates)
            .setHTML('<b>Name: </b>' + e.features[0].properties.CENTRE_NAM + '<br>'
            + '<b>Address: </b>' + e.features[0].properties.ADDRESS + '<br>'
            + '<b>Postcode: </b>' + e.features[0].properties.POSTCODE + '<br>'
            + '<b>NO<sub>2</sub> Background: </b>' + Math.round(e.features[0].properties.no2_conc_2) + '<h> &#181;g/m<sup>3</sup></h>' + '<br>'
            + '<b>Detail of nearest roadside exceeding limit value: </b>' + '<br>'
            + '<b>NO<sub>2</sub> and distance: </b>' + Math.round(e.features[0].properties.rno2_excee) + '<h> &#181;g/m<sup>3</sup> @ </h>' + e.features[0].properties.schools_to + '<h> m</h>' + '<br>'
            + '<b>Road Name: </b>' + e.features[0].properties.ROAD_NAME_ + '<br>'
            + 'Do you think that there is a problem with this point? : <a href="mailto:name@email.com">Contact Us</a>' + '<br/>')
            .addTo(map);
    });
    map.on('mouseenter', cid, function () {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', cid, function () {
        map.getCanvas().style.cursor = '';
    });
}
// allow the layers to be toggled on and off
var toggleableLayerIds = ['Schools within 150 m of road above 40 ug/m3 limit', 'Defra Roads'];
for (var i = 0; i < toggleableLayerIds.length; i++) {
    var id = toggleableLayerIds[i];
    var link = document.createElement('a');
    link.href = '#';
    // define the link as active
    link.textContent = id;
    link.className = 'active';
    // when the menu is clicked turn the layer off
    link.onclick = function (e) {
        var clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();
        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');
        if (visibility === 'visible') {
            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            this.className = '';
        } else {
            this.className = 'active';
            map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        }
    };
    var layers = document.getElementById('menu');
    layers.appendChild(link);
}

var toggleableLayerIds = ['Gridded NO2 Concentration', 'All Welsh Schools', 'All Scottish Schools', 'All Northern Irish Schools', 'All English Schools'];
for (var i = 0; i < toggleableLayerIds.length; i++) {
    var id = toggleableLayerIds[i];
    var link = document.createElement('a');
    link.href = '#';
    // define the link as active
    link.textContent = id;
    link.className = ' ';
    // when the menu is clicked turn the layer off
    link.onclick = function (e) {
        var clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();
        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');
        if (visibility === 'visible') {
            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            this.className = '';
        } else {
            this.className = 'active';
            map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        }
    };
    var layers = document.getElementById('menu');
    layers.appendChild(link);
}