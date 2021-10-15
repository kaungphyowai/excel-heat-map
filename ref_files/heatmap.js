/*
    Script Name : heatmap.js
    Creation Date : April 25, 2020
    Purpose : This script is written by Phyo Kyi for Excel Heat Mapping Project...
*/

var rankmethod = config.layer.ranks;
var layerdata = config.layer.data;
var cgl = geolevel[config.geolevel];
var nrange = config.advanced.map.range;
var geocode = cgl.geocode;
var geoname = cgl.geoname;
var geosrc = cgl.src;

layerdata.forEach(function (value, index) {
    value.value = parseInt(value.value);
    if (value.value === parseInt(value.value, 10))
        {}
    else
        {layerdata[index].value=0}
});
console.log(layerdata);

var excludelist = layerdata.filter(obj => {
    return obj.exclude === true
});



var exlist = [];
excludelist.forEach(function (value, index) {
    exlist.push(value.pcode);
});

var layerdata = layerdata.filter(obj => {
    return obj.exclude === false
});
//console.log(layerdata);

var len = layerdata.length;
array = []
layerdata.forEach(function (value, index) {
    array.push(value.value);
});
dmax = Math.max(...array);
dmin = Math.min(...array);


var script = document.createElement('script');
script.onload = function () {

    var map = L.map('map').setView([19.438278, 96.020508], 6);

    

    if (config.advanced.tilelayer.isOn) {
        var tilemap = leaflet_tilelayeradd(tilelayer[config.advanced.tilelayer.layer]);
        tilemap.addTo(map);
    }

    if (rankmethod == "Quantiles") {
        var ranks = rank_quantiles(layerdata, nrange);
    } else if (rankmethod == "Custom") {
        var ranks = rank_custom(layerdata, nrange, config.advanced.customranks);
    } else if (rankmethod == "Equal Interval") {
        var ranks = rank_equalinterval(layerdata, nrange);
    } else {
        var ranks = rank_equalinterval(layerdata, nrange);
    }

    function getColor(value) {

        var result = ranks.filter(obj => {
            return obj.pcode === value
        });

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
        //console.log(feature);
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature
        });
    }

    function mapFilter(feature) {
        if (!exlist.includes(feature.properties[geocode])) return true
    }

    geojson = L.geoJson(geoData, {
        style: style,
        onEachFeature: onEachFeature,
        filter: mapFilter
    });

    geojson.addTo(map);


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
        this._div.innerHTML = `<h4>${config.layer.Name}</h4>` + (props ?
            `Location Name ${props[geoname]}<br>
        Location PCode : ${props[geocode]}<br>
        Value : ${get_value(props[geocode])}<br>
        Rank : ${get_rank(props[geocode])}<br>` :
            "Hover over a state");
    };

    info.addTo(map);

    document.getElementById("map").style.backgroundColor = config.advanced.map.background_color;

    function legend_equalinterval() {
        var legend = L.control({
            position: 'bottomright'
        });

        legend.onAdd = function (map) {

            var div = L.DomUtil.create('div', 'info legend');
            var labels = [];
            var from, to, istyle, itext;

            //console.log(dmax);
            //console.log(dmin);
            diff = (dmax - dmin) / nrange;


            dmin = dmin;
            for (var i = nrange; i > 0; i--) {
                from = Math.round(dmin * 100) / 100;
                to = Math.round((dmin + diff) * 100) / 100;

                istyle = '<i style="background:' + colorrange[i] + ';font-size:16px;"></i>';
                itext = from + (to ? '&ndash;' + to : '+');

                labels.push(istyle + itext);
                dmin = dmin + diff;
            }

            div.innerHTML = labels.join('<br>');
            return div;
        };

        legend.addTo(map);
    }

    function legend_quantiles() {
        //console.log(ranks);
        var legend = L.control({
            position: 'bottomright'
        });

        legend.onAdd = function (map) {

            var div = L.DomUtil.create('div', 'info legend');
            var labels = [];
            var from, to, istyle, itext;


            for (var i = nrange; i > 0; i--) {

                var qranks = ranks.filter(obj => {
                    return obj.rank === i
                });
                //console.log(qranks);
                var len = qranks.length;
                array = []
                qranks.forEach(function (value, index) {
                    array.push(value.value);
                });
                to = Math.max(...array);
                from = Math.min(...array);


                istyle = '<i style="background:' + colorrange[i] + ';font-size:16px;"></i>';
                itext = from + (to ? '&ndash;' + to : '+');

                labels.push(istyle + itext);

            }

            div.innerHTML = labels.join('<br>');
            return div;
        };

        legend.addTo(map);
    }

    function legend_custom() {
        //console.log(ranks);
        var legend = L.control({
            position: 'bottomright'
        });

        legend.onAdd = function (map) {

            var div = L.DomUtil.create('div', 'info legend');
            var labels = [];
            var from, to, istyle, itext;


            for (var i = nrange; i > 0; i--) {


                var cranks = config.advanced.customranks.filter(obj => {
                    return obj.rank === i
                });

                to = cranks[0].lt;
                from = cranks[0].gte;


                istyle = '<i style="background:' + colorrange[i] + ';font-size:16px;"></i>';
                itext = from + (to ? '&ndash;' + to : '+');

                labels.push(istyle + itext);

            }

            div.innerHTML = labels.join('<br>');
            return div;
        };

        legend.addTo(map);
    }

    if (rankmethod == "Quantiles") {
        legend_quantiles();
    } else if (rankmethod == "Custom") {
        legend_custom();
    } else if (rankmethod == "Equal Interval") {
        legend_equalinterval();
    } else {
        legend_equalinterval();
    }

    L.control.browserPrint().addTo(map);
    map.attributionControl.addAttribution('Developed by <a href="https://themimu.info", >Myanmar Information Management Unit (MIMU)</a>');

};

script.src = cgl.src;
document.head.appendChild(script);