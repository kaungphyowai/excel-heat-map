var data = 
[
    {pcode:"MMR017",value: '800', exclude:false},
    {pcode:"MMR111",value: '510', exclude:false},
    {pcode:"MMR004",value: '140', exclude:false},
    {pcode:"MMR001",value: '50', exclude:false},
    {pcode:"MMR002",value: '50', exclude:false},
    {pcode:"MMR003",value: '750', exclude:false},
    {pcode:"MMR009",value: '270', exclude:false},
    {pcode:"MMR010",value: '870', exclude:false},
    {pcode:"MMR011",value: '800', exclude:false},
    {pcode:"MMR018",value: '920', exclude:false},
    {pcode:"MMR012",value: '350', exclude:false},
    {pcode:"MMR005",value: '770', exclude:false},
    {pcode:"MMR222",value: '840', exclude:false},
    {pcode:"MMR006",value: '340', exclude:false},
    {pcode:"MMR013",value: '510', exclude:false}
]; 
var colorrange = {
    1 : '#800026',
	2 : '#BD0026',
	3 : '#E31A1C' ,
	4 : '#FC4E2A' ,
	5 : '#FD8D3C' ,
	6 : '#FEB24C' ,
	7 : '#FED976' ,
	8 : '#FFEDA0'
}

var config = {
    geolevel : "States",
    layer : 
        {
            Name : "Excel Heat Mapping",
            data : data,
            colors : colorrange,
            ranks : "quantitle"
        }
    ,
    advanced : {
        map : {
            background_color : "#ffffff",
            range : 8
        },
        tilelayer : {
            isOn : false,
            layer : "openstreetmap/standard"
        },
        shape_style : {
            border_thinkness : 2,
            border_opacity : 1,
            border_color : '#000000',
            border_type : 3,
            fill_opacity : 0.7
        },
        highlightFeature : {
            border_thinkness : 5,
            border_opacity : 1,
            border_color : "#ddd",
            border_type : 1,
            fill_opacity : 0.7
        },
        customranks : [
            {rank:1,lt:1000,gte:950},
            {rank:2,lt:950,gte:900},
            {rank:3,lt:900,gte:850},
            {rank:4,lt:850,gte:800},
            {rank:5,lt:800,gte:750},
            {rank:6,lt:750,gte:700},
            {rank:7,lt:700,gte:650},
            {rank:8,lt:650,gte:0}
        ]
    }
}