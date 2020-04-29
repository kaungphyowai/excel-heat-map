var data = [{
pcode:'MMR001D001',value:'443',exclude:false
},{
pcode:'MMR001D002',value:'793',exclude:false
},{
pcode:'MMR001D003',value:'814',exclude:false
},{
pcode:'MMR001D004',value:'495',exclude:false
},{
pcode:'MMR002D001',value:'262',exclude:false
},{
pcode:'MMR002D002',value:'607',exclude:false
},{
pcode:'MMR003D001',value:'804',exclude:false
},{
pcode:'MMR003D002',value:'344',exclude:false
},{
pcode:'MMR003D003',value:'448',exclude:false
},{
pcode:'MMR003D004',value:'989',exclude:false
},{
pcode:'MMR004D001',value:'490',exclude:false
},{
pcode:'MMR004D002',value:'431',exclude:false
},{
pcode:'MMR004D003',value:'354',exclude:false
},{
pcode:'MMR004D004',value:'337',exclude:false
},{
pcode:'MMR005D001',value:'630',exclude:false
},{
pcode:'MMR005D002',value:'406',exclude:false
},{
pcode:'MMR005D003',value:'378',exclude:false
},{
pcode:'MMR005D004',value:'997',exclude:false
},{
pcode:'MMR005D005',value:'188',exclude:false
},{
pcode:'MMR005D006',value:'201',exclude:false
},{
pcode:'MMR005D007',value:'817',exclude:false
},{
pcode:'MMR005D008',value:'657',exclude:false
},{
pcode:'MMR005D009',value:'756',exclude:false
},{
pcode:'MMR005D010',value:'220',exclude:false
},{
pcode:'MMR005D011',value:'115',exclude:false
},{
pcode:'MMR005S001',value:'977',exclude:false
},{
pcode:'MMR006D001',value:'818',exclude:false
},{
pcode:'MMR006D002',value:'877',exclude:false
},{
pcode:'MMR006D003',value:'91',exclude:false
},{
pcode:'MMR007D001',value:'172',exclude:false
},{
pcode:'MMR007D002',value:'840',exclude:false
},{
pcode:'MMR008D001',value:'181',exclude:false
},{
pcode:'MMR008D002',value:'27',exclude:false
},{
pcode:'MMR009D001',value:'491',exclude:false
},{
pcode:'MMR009D002',value:'280',exclude:false
},{
pcode:'MMR009D003',value:'716',exclude:false
},{
pcode:'MMR009D004',value:'609',exclude:false
},{
pcode:'MMR009D005',value:'832',exclude:false
},{
pcode:'MMR010D001',value:'981',exclude:false
},{
pcode:'MMR010D002',value:'104',exclude:false
},{
pcode:'MMR010D003',value:'327',exclude:false
},{
pcode:'MMR010D004',value:'635',exclude:false
},{
pcode:'MMR010D005',value:'762',exclude:false
},{
pcode:'MMR010D006',value:'974',exclude:false
},{
pcode:'MMR010D007',value:'18',exclude:false
},{
pcode:'MMR011D001',value:'991',exclude:false
},{
pcode:'MMR011D002',value:'70',exclude:false
},{
pcode:'MMR012D001',value:'276',exclude:false
},{
pcode:'MMR012D002',value:'178',exclude:false
},{
pcode:'MMR012D003',value:'56',exclude:false
},{
pcode:'MMR012D004',value:'392',exclude:false
},{
pcode:'MMR012D005',value:'572',exclude:false
},{
pcode:'MMR013D001',value:'24',exclude:false
},{
pcode:'MMR013D002',value:'821',exclude:false
},{
pcode:'MMR013D003',value:'738',exclude:false
},{
pcode:'MMR013D004',value:'535',exclude:false
},{
pcode:'MMR014D001',value:'304',exclude:false
},{
pcode:'MMR014D002',value:'256',exclude:false
},{
pcode:'MMR014D003',value:'908',exclude:false
},{
pcode:'MMR014S001',value:'574',exclude:false
},{
pcode:'MMR014S002',value:'137',exclude:false
},{
pcode:'MMR015D001',value:'237',exclude:false
},{
pcode:'MMR015D002',value:'886',exclude:false
},{
pcode:'MMR015D003',value:'337',exclude:false
},{
pcode:'MMR015D006',value:'39',exclude:false
},{
pcode:'MMR015D007',value:'320',exclude:false
},{
pcode:'MMR015D008',value:'484',exclude:false
},{
pcode:'MMR015S001',value:'419',exclude:false
},{
pcode:'MMR015S002',value:'613',exclude:false
},{
pcode:'MMR016D001',value:'128',exclude:false
},{
pcode:'MMR016D002',value:'746',exclude:false
},{
pcode:'MMR016D003',value:'404',exclude:false
},{
pcode:'MMR017D001',value:'938',exclude:false
},{
pcode:'MMR017D002',value:'176',exclude:false
},{
pcode:'MMR017D003',value:'957',exclude:false
},{
pcode:'MMR017D004',value:'47',exclude:false
},{
pcode:'MMR017D005',value:'127',exclude:false
},{
pcode:'MMR017D006',value:'832',exclude:false
},{
pcode:'MMR018D001',value:'103',exclude:false
},{
pcode:'MMR018D002',value:'15',exclude:false
}];
var colorrange = {
1:'#940805',2:'#BC2400',3:'#CC2700',4:'#F74521',5:'#F87642',6:'#F98957',7:'#F7A731',8:'#EEB500',9:'#FFCD2D',10:'#FFE699'};
var config = {
    geolevel : 'District',
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
