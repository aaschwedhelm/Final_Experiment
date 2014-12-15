var sliderControl = null

var myGeoJSONLayers = [];

var map = L.map('map').setView([11.19059, -74.20099], 13);
var Esri_WorldTopoMap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community',
        minZoom: 0,
        maxZoom: 20
        //All polygons within 1 Layer: [geojsonLayer]
    }).addTo(map);


var numberOfJSONFiles = 6;

function getJSON (url, rgb, time) {
    $.getJSON(url, function(data) {
        // window.data = data;
        var geojsonLayer = L.geoJson(data.features, 
        {
            style: {
                fillColor: rgb,
                fillOpacity: ".6",
                color: "rgba(0,255,0,0.5)",
                weight: "0",
                opacity: ".6"
            },
            time: time
        });
        myGeoJSONLayers.push(geojsonLayer);
        receivedData();
    });
}

// Fetch all the GeoJSON files
getJSON('./js/1989.geojson', 'rgba(255,0,0,.6)', 'Year: 1989');
getJSON('./js/2000.geojson', 'rgba(255,128,0,.6)', 'Year: 2000');
getJSON('./js/2013.geojson', 'rgba(255,255,0,.6)', 'Year: 2013');
getJSON('./js/2026.geojson', 'rgba(128,255,0,.6)', 'Year: 2026');
getJSON('./js/2039.geojson', 'rgba(0,255,255,.6)', 'Year: 2039');
getJSON('./js/2078.geojson', 'rgba(0,0,255,.6)', 'Year: 2078');


function receivedData () {
    if (myGeoJSONLayers.length !== numberOfJSONFiles) {
        return;
    }
    var layerGroup = L.layerGroup(myGeoJSONLayers);
    var sliderControl = L.control.sliderControl({position: "topright", layer:layerGroup});
    //Make sure to add the slider to the map
    map.addControl(sliderControl);
    //And initialize the slider
    sliderControl.startSlider();
}

