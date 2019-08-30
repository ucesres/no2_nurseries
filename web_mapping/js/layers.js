// JavaScript source code
// load all Scottish schools
map.on('style.load', function () {
    map.addSource("markers_scotland", {
        "type": "geojson",
        "data": "data/all_schools_scotland.json"
    });
    // display schools 150
    map.addLayer({
        "id": "All Scottish Schools",
        "type": "circle",
        "source": "markers_scotland",
        "minzoom": zoomThreshold,
        'paint': {
            //Add data-driven styles for circle-color
            'circle-color': '#575757',
            //Add data-driven styles for circle radius
            // can alter circle size by zoom
            'circle-radius': {
                stops: [[4, 2], [8, 2], [11, 4], [16, 5]]
            },
            'circle-opacity': 0.4
        }
    });
});
// load all Northern Irish schools
map.on('style.load', function () {
    map.addSource("markers_NI", {
        "type": "geojson",
        "data": "data/all_schools_ni.json"
    });
    // display schools 150
    map.addLayer({
        "id": "All Northern Irish Schools",
        "type": "circle",
        "source": "markers_NI",
        "minzoom": zoomThreshold,
        'paint': {
            //Add data-driven styles for circle-color
            'circle-color': '#575757',
            //Add data-driven styles for circle radius
            // can alter circle size by zoom
            'circle-radius': {
                stops: [[4, 2], [8, 2], [11, 4], [16, 5]]
            },
            'circle-opacity': 0.4
        }
    });
});

// load all English schools
map.on('style.load', function () {
    map.addSource("markers_ENG", {
        "type": "geojson",
        "data": "data/all_schools_england.json"
    });
    // display schools 150
    map.addLayer({
        "id": "All English Schools",
        "type": "circle",
        "source": "markers_ENG",
        "minzoom": zoomThreshold,
        'paint': {
            //Add data-driven styles for circle-color
            'circle-color': '#575757',
            //Add data-driven styles for circle radius
            // can alter circle size by zoom
            'circle-radius': {
                stops: [[4, 2], [8, 2], [11, 4], [16, 5]]
            },
            'circle-opacity': 0.4
        }
    });
});
// load all welsh schools
map.on('style.load', function () {
    map.addSource("markers_wales", {
        "type": "geojson",
        "data": "data/all_schools_wales.json"
    });
    // display schools 150
    map.addLayer({
        "id": "All Welsh Schools",
        "type": "circle",
        "source": "markers_wales",
        "minzoom": zoomThreshold,
        'paint': {
            //Add data-driven styles for circle-color
            'circle-color': '#575757',
            //Add data-driven styles for circle radius
            // can alter circle size by zoom
            'circle-radius': {
                stops: [[4, 2], [8, 2], [11, 4], [16, 5]]
            },
            'circle-opacity': 0.4
        }
    });
});
// load defra roads
map.on('style.load', function () {
    map.addSource("defra_roads", {
        "type": "geojson",
        "data": "data/convert_def_raod.json"
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
                stops: [[4, 2], [8, 4], [11, 6], [16, 10]]
            }
        }

    });
});
// load schools 150
map.on('style.load', function () {
    map.addSource("markers", {
        "type": "geojson",
        "data": "data/all_150_wgs_v1.json"
    });
    // display schools 150
    map.addLayer({
        "id": "Schools within 150 m of limit value",
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
                stops: [[8, 4], [11, 6], [16, 10]]
            },
            'circle-opacity': 0.8
        }
    });
});



// load gridded concentration
map.on('style.load', function () {
    map.addSource("gridded_conc", {
        "type": "geojson",
        "data": "data/no_grid_gt_0.json"
    });

    // display gridded concentration
    map.addLayer({
        "id": "Gridded NO2 Concentration",
        "type": "fill",
        "source": "gridded_conc",
        "minzoom": zoomThreshold,
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

