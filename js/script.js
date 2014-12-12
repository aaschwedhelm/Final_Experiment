var sliderControl = null

var map = L.map('map').setView([11.19059, -74.20099], 13);
var Esri_WorldTopoMap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community',
        minZoom: 0,
        maxZoom: 20
        //All polygons within 1 Layer: [geojsonLayer]
    }).addTo(map);

 //Fetch all the GeoJSON files
$.getJSON('./js/1989.geojson', function(data) {
    window.data = data;
    var geojsonLayer = L.geoJson(data.features, {
        style: {
            fillColor: "rgba(255,0,0,.6)",
            fillOpacity: ".6",
            color: "rgba(255,0,0,0)",
            weight: "0",
            opacity: ".6",
        }
        },
        {time: "2013-01-22 08:42:26+01"
    })
});

$.getJSON('./js/2000.geojson', function(data) {
    window.data = data;
    var geojsonLayer2 = L.geoJson(data.features, {
        style: {
            fillColor: "rgba(255,0,0,.6)",
            fillOpacity: ".6",
            color: "rgba(255,0,0,0)",
            weight: "0",
            opacity: ".6",
        }
        },
        {time: "2013-01-22 10:00:26+01"
    })
});

$.getJSON('./js/2013.geojson', function(data) {
    window.data = data;
    var geojsonLayer3 = L.geoJson(data.features, {
        style: {
            fillColor: "rgba(255,0,0,.6)",
            fillOpacity: ".6",
            color: "rgba(255,0,0,0)",
            weight: "0",
            opacity: ".6",
        }
        },
        {time: "2013-01-22 10:03:29+01"
    })
});

$.getJSON('./js/2026.geojson', function(data) {
    window.data = data;
    var geojsonLayer4 = L.geoJson(data.features, {
        style: {
            fillColor: "rgba(255,0,0,.6)",
            fillOpacity: ".6",
            color: "rgba(255,0,0,0)",
            weight: "0",
            opacity: ".6",
        }
        })
});

$.getJSON('./js/2039.geojson', function(data) {
    window.data = data;
    var geojsonLayer5 = L.geoJson(data.features, {
        style: {
            fillColor: "rgba(255,0,0,.6)",
            fillOpacity: ".6",
            color: "rgba(255,0,0,0)",
            weight: "0",
            opacity: ".6",
        }
        })
});

$.getJSON('./js/2078.geojson', function(data) {
    window.data = data;
    var geojsonLayer6 = L.geoJson(data.features, {
        style: {
            fillColor: "rgba(255,0,0,.6)",
            fillOpacity: ".6",
            color: "rgba(255,0,0,0)",
            weight: "0",
            opacity: ".6",
        }
        })
});

layerGroup = L.layerGroup(['geojsonLayer', 'geojsonLayer2', 'geojsonLayer3', 'geojsonLayer4','geojsonLayer5', 'geojsonLayer6' ]);
var sliderControl = L.control.sliderControl({position: "topright", layer:layerGroup, range: true});
        //Make sure to add the slider to the map
        map.addControl(sliderControl);
        //And initialize the slider
        sliderControl.startSlider();





