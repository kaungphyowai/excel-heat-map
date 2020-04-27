var data = [{
pcode:'MMR001',value:'602',exclude:false
},{
pcode:'MMR002',value:'609',exclude:false
},{
pcode:'MMR003',value:'442',exclude:false
},{
pcode:'MMR004',value:'945',exclude:false
},{
pcode:'MMR005',value:'928',exclude:false
},{
pcode:'MMR006',value:'422',exclude:false
},{
pcode:'MMR009',value:'603',exclude:false
},{
pcode:'MMR010',value:'895',exclude:false
},{
pcode:'MMR011',value:'233',exclude:false
},{
pcode:'MMR012',value:'502',exclude:false
},{
pcode:'MMR013',value:'28',exclude:false
},{
pcode:'MMR017',value:'652',exclude:false
},{
pcode:'MMR018',value:'67',exclude:false
},{
pcode:'MMR111',value:'761',exclude:false
},{
pcode:'MMR222',value:'325',exclude:false
}];
var colorrange = {
1:'#940805',2:'#BC2400',3:'#CC2700',4:'#F74521',5:'#F87642',6:'#F98957',7:'#F7A731',8:'#EEB500',9:'#FFCD2D',10:'#FFE699'};
var config = {
    geolevel : 'States',
    layer : 
        {
            Name : 'Excel Heat Mapping',
            data : data,
            colors : colorrange,
            ranks : 'Equal Interval'
        }
    ,
    advanced : {
        map : {
            background_color : '#ffffff',
            range : 10
        },
        tilelayer : {
            isOn : false,
            layer : 'openstreetmap/standard'
        },
        shape_style : {
            border_thinkness : 2,
            border_opacity : 1,
            border_color : '#000000',
            border_type : 3,
            fill_opacity : 1
        },
        highlightFeature : {
            border_thinkness : 5,
            border_opacity : 1,
            border_color : '#dddddd',
            border_type : 1,
            fill_opacity : 0.7
        },
         customranks : [{rank:1,lt:2000,gte:950}
,{rank:2,lt:950,gte:900}
,{rank:3,lt:900,gte:850}
,{rank:4,lt:850,gte:800}
,{rank:5,lt:800,gte:750}
,{rank:6,lt:750,gte:700}
,{rank:7,lt:700,gte:650}
,{rank:8,lt:650,gte:600}
,{rank:9,lt:600,gte:550}
,{rank:10,lt:550,gte:0}
]
    }
}
