var data = 
[
    {pcode:"MMR017",value: 56},
    {pcode:"MMR111",value: 51},
    {pcode:"MMR004",value: 14},
    {pcode:"MMR001",value: 5},
    {pcode:"MMR002",value: 5},
    {pcode:"MMR003",value: 75},
    {pcode:"MMR009",value: 27},
    {pcode:"MMR010",value: 87},
    {pcode:"MMR011",value: 80},
    {pcode:"MMR018",value: 92},
    {pcode:"MMR012",value: 35},
    {pcode:"MMR005",value: 77},
    {pcode:"MMR222",value: 84},
    {pcode:"MMR006",value: 34},
    {pcode:"MMR013",value: 51}
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
//config.layer.data
var config = {
    layer : 
        {
            Name : "Heat Map 1",
            data : data,
            range : 8,
            colors : colorrange,
            ranks : "equalinterval"
        }
    ,
    tilelayer : {
        isOn : true,
        layer : "mapbox/light-v9"
    }
}



