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

    info.update(layer.feature.properties);
}

var geojson;

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
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


// control that shows state info on hover
var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

function get_value(_pcode){
    var result = ranks.filter(obj => {
        return obj.pcode === _pcode
    });
    return result[0].value;
}
function get_rank(_pcode){
    var result = ranks.filter(obj => {
        return obj.pcode === _pcode
    });
    return result[0].rank;
}
info.update = function (props) {
    var v = props;
    console.log(v);
    this._div.innerHTML = "<h4>Excel Heat Mapping</h4>"+(props ? 
        "State/Region " + props.ST + "<br>" +
        "State/Region PCode : " + props.ST_PCODE + "<br>" +
        "Value : " + get_value(props.ST_PCODE) + "<br>" +
        "Rank : " + get_rank(props.ST_PCODE) + "<br>"
        : "Hover over a state");
};

info.addTo(map);