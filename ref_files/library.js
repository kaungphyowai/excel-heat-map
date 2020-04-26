/*
    Script Name : library.js
    Creation Date : April 25, 2020
    Modification Date : April 26, 2020
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

function rank_quantitle(dx, n) {
    var sortable = [];
    for (var x in dx) {
        sortable.push([dx[x].pcode, dx[x].value]);
    }

    sortable.sort(function (a, b) {
        return a[1] - b[1];
    });

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

        y = {};
        y.pcode = value[0];
        y.value = value[1];
        y.rank = rank;
        result.push(y);
    });
    console.log(result);
    return result;
}

function rank_equalinterval(dx, n) {

    var len = data.length;
    array = []
    data.forEach(function (value, index) {
        array.push(value.value);
    });
    max = Math.max(...array);
    min = Math.min(...array);

    ranks = [];
    diff = (max - min) / n;

    dx.forEach(function (value, index) {
        rank = getRank(value.value, max, diff, n);
        dx[index].rank = rank;
    });
    console.log(dx);
    return dx;
}

function rank_custom(dx, n, custom) {
    dx.forEach(function (v, index) {
        var rank = 0;
        for (var x = 0; x < n; x++) {
            if (v.value >= custom[x].gte && v.value < custom[x].lt) {
                rank = custom[x].rank;
            }
        }
        dx[index].rank = rank;
    });
    return dx;
}



function leaflet_tilelayeradd(tl) {

    var tilemap = L.tileLayer(
        tl.url, {
            maxZoom: 18,
            attribution: tl.attribuition,
            id: tl.id,
            tileSize: 512,
            zoomOffset: -1
        });
    return tilemap;
}