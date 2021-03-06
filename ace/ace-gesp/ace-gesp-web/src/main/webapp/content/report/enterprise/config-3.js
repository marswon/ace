var option3 = {
	title : {
		text : '',
		subtext : ''
	},
	tooltip : {
		trigger : 'axis'
	},
	legend : {
		data : [ '会员企业数量(家)', '行业企业数量(家)' ]
	},
	toolbox : {
		show : true,
		feature : {
			mark : {
				show : true
			},
			dataView : {
				show : true,
				readOnly : false
			},
			magicType : {
				show : true,
				type : [ 'line', 'bar' ]
			},
			restore : {
				show : true
			},
			saveAsImage : {
				show : true
			}
		}
	},
	calculable : true,
	xAxis : [ {
		type : 'category',
		data : [],

		splitLine : {
			show : false,
			lineStyle : {
				color : [ '#000000' ],
				width : 1,
				type : 'solid'
			}
		},
		axisLabel : {
			show : true,
			rotate : -15,
			margin : 2,
			textStyle : {
				color : '#00000',
				fontSize : 12
			}

		}
	} ],
	yAxis : [ {
		type : 'value'
	}, {
		type : 'value'
	} ],
	series : [ {
		name : '会员企业数量(家)',
		type : 'bar',
		data : [],
        markPoint : {
            data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                ]
        },
        markLine : {
            data : [
                {type : 'average', name: '平均值'}
            ]
        }
        /*,itemStyle: {
            normal: {
                label: {
                    show: true,
                    position: 'top',
                    formatter: '{c}'
                }
            }
        }*/
	}, {
		name : '行业企业数量(家)',
		type : 'bar',
		data : [],
        markPoint : {
            data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                ]
        },
        markLine : {
            data : [
                {type : 'average', name: '平均值'}
            ]
        }
        /*,itemStyle: {
            normal: {
                label: {
                    show: true,
                    position: 'top',
                    formatter: '{c}'
                }
            }
        }*/
	} ]
};
