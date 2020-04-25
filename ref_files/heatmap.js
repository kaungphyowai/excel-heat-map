/*
    Script Name : heatmap.js
    Creation Date : April 25, 2020
    Modification Date : April 25, 2020
    Purpose : This script is written by Phyo Kyi for Excel Heat Mapping Project...
*/

var map = L.map('map').setView([20.838278, 96.020508], 6);

if (config.tilelayer.isOn) {
    var tilemap = leaflet_tilelayeradd(tilelayer[config.tilelayer.layer]);
    tilemap.addTo(map);
}

//quantitle
if (config.layer.ranks == "quantitle") {
    var ranks = quantitle(config.layer.data, config.layer.range);
} else {
    var ranks = equalinterval(config.layer.data, config.layer.range);
}


// get color depending on population density value
function getColor(value) {
    //console.log(value);
    var result = ranks.filter(obj => {
        return obj.pcode === value
    });
    //console.log(result);
    if (result.length == 0) {
        return "FFFFFF";
    }

    return colorrange[result[0].rank];
}

function style(feature) {
    return {
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7,
        fillColor: getColor(feature.properties["ST_PCODE"])
    };
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

var geojson;

function resetHighlight(e) {
    geojson.resetStyle(e.target);
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

function mapFilter(feature) {
    if (feature.properties["ST_PCODE"] != "") return true
  }

geojson = L.geoJson(geoData, {
    style: style,
    onEachFeature: onEachFeature,
    filter: mapFilter
});

geojson.addTo(map);