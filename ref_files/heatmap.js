/*
    Script Name : heatmap.js
    Creation Date : April 25, 2020
    Modification Date : April 25, 2020
    Purpose : This script is written by Phyo Kyi for Excel Heat Mapping Project...
*/

var rankmethod = config.layer.ranks;
var layerdata = config.layer.data;
var cgl = geolevel[config.geolevel];
var nrange = config.layer.range;
var geocode = cgl.geocode;
var geoname = cgl.geoname;
var geosrc = cgl.src;

var script = document.createElement('script');
script.onload = function () {
    //do stuff with the script


    var map = L.map('map').setView([19.438278, 96.020508], 6);

    if (config.advanced.tilelayer.isOn) {
        var tilemap = leaflet_tilelayeradd(tilelayer[config.advanced.tilelayer.layer]);
        tilemap.addTo(map);
    }

    //quantitle
    if (rankmethod == "quantitle") {
        var ranks = rank_quantitle(layerdata, nrange);
    } else if (rankmethod == "custom") {
        var ranks = rank_custom(layerdata, nrange, config.layer.customranks);
    } else if (rankmethod == "equalinterval") {
        var ranks = rank_equalinterval(layerdata, nrange);
    } else {
        var ranks = rank_equalinterval(layerdata, nrange);
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
        var cass = config.advanced.shape_style;
        return {
            weight: cass.border_thinkness,
            opacity: cass.border_opacity,
            color: cass.border_color,
            dashArray: cass.border_type,
            fillOpacity: cass.fill_opacity,
            fillColor: getColor(feature.properties[geocode])
        };
    }

    function highlightFeature(e) {
        var layer = e.target;

        var cahf = config.advanced.highlightFeature;
        layer.setStyle({
            weight: cahf.border_thinkness,
            opacity: cahf.border_opacity,
            color: cahf.border_color,
            dashArray: cahf.border_type,
            fillOpacity: cahf.fill_opacity
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
        if (feature.properties[geocode] != "") return true
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

    function get_value(_pcode) {
        var result = ranks.filter(obj => {
            return obj.pcode === _pcode
        });
        return result[0].value;
    }

    function get_rank(_pcode) {
        var result = ranks.filter(obj => {
            return obj.pcode === _pcode
        });
        return result[0].rank;
    }
    info.update = function (props) {
        this._div.innerHTML = "<h4>Excel Heat Mapping</h4>" + (props ?
            `State/Region ${props[geoname]}<br>
        State/Region PCode : ${props[geocode]}<br>
        Value : ${get_value(props[geocode])}<br>
        Rank : ${get_rank(props[geocode])}<br>` :
            "Hover over a state");
    };

    info.addTo(map);

    document.getElementById("map").style.backgroundColor = config.advanced.map.background_color;
};

script.src = cgl.src;
document.head.appendChild(script);