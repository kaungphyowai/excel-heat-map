/*
    Script Name : library.js
    Creation Date : April 25, 2020
    Modification Date : April 25, 2020
    Purpose : This script is written by Phyo Kyi for Excel Heat Mapping Project...
*/
function getRank(value, max, diff, n) {
    max = max - diff;
    for (var x = 1; x < n; x++) {
        if (value > max) {
            return x;
        }
        max = max - diff;
    }
    return n;
}

function quantitle(dx, n) {
    var sortable = [];
    for (var x in dx) {
        sortable.push([dx[x].pcode, dx[x].value]);
    }

    sortable.sort(function (a, b) {
        return a[1] - b[1];
    });
    //console.log(sortable);
    result = [];
    sortable.forEach(function (value, index) {
        rank = (index / sortable.length) * n;
        rank = Math.round(rank);
        rank = rank + 1;
        if (rank > n) {
            rank = rank - 1;
        }
        if (rank < 0) {
            rank = rank + 1;
        }
        //console.log(value[0]+":"+value[1]+":"+rank);
        y = {};
        y.pcode = value[0];
        y.value = value[1];
        y.rank = rank;
        result.push(y);
    });
    console.log(result);
    return result;
}

function equalinterval(dx, n) {
    //keys = Object.keys(dx);
    //values = Object.values(dx);
    var len = data.length;
    array = []
    data.forEach(function (value, index) {
        array.push(value.value);
    });
    max = Math.max(...array);
    min = Math.min(...array);
    //console.log(max);
    //console.log(min);
    ranks = [];
    diff = (max - min) / n;
    //console.log(diff);
    dx.forEach(function (value, index) {
        rank = getRank(value.value, max, diff, n);
        //console.log("Value is "+value.value);
        //console.log("Rank is " + rank);
        dx[index].rank = rank;
    });
    console.log(dx);
    return dx;
}

//equalinterval(data, 15);
//quantitle(data, 15);

var tilelayer = {
    "mapbox/light-v9":{
        url : "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
        attribuition : 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery ? <a href="https://www.mapbox.com/">Mapbox</a>',
        id : "mapbox/light-v9"
    },
    "mapbox/dark-v9":{
        url : "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
        attribuition : 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery ? <a href="https://www.mapbox.com/">Mapbox</a>',
        id : "mapbox/dark-v9"
    }
}
//streets-v9
//satellite-streets-v9
//light-v9
//dark-v9
//outdoors-v9

function leaflet_tilelayeradd(tl){
    //console.log(tl);
    var tilemap=L.tileLayer(
        tl.url, {
            maxZoom: 18,
            attribution: tl.attribuition,
            id: tl.id,
            tileSize: 512,
            zoomOffset: -1
        });
    return tilemap;
}