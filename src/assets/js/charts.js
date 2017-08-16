export function line(data, name, title) {
    switch (name) {
        case 'line':
            return lines(data);
            break;
        case 'mutilLine':
            return mutilLine(data);
            break;
        case 'radar':
            return radar(data);
            break;
        case 'bing':
            return pie(data, null, 'large');
            break;
        case 'boston':
            return bosd(data);
            break
        case 'customizedPie':
            return customizedPie(data);
            break
        case 'bar':
            return barStack(data);
            // return mutilLine(data, null, 'bar', true);
            break
        case 'matrix':
            return BCGMatrix(data);
            break
        default:
            // statements_def
            break;
    }
};

// 处理折线图
function lines(data) {
    for (var i = 0; i < data.result.length; i++) {
        data.result[i].type = 'line'
    }
    var option = {
        title: {
            top: '3%',
            text: data.title,
            show: false
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            top: '3%',
            data: data.legend
        },
        xAxis: {
            axisLabel: {
                rotate: 45,
                interval: 2
            },
            type: 'category',
            boundaryGap: false,
            data: data.date
        },
        yAxis: {
            type: 'value'
        },
        series: data.result
    };
    return option;
}
// 处理 人群偏好 总价 折线图
function mutilLine (data, title, type, zoom) {
    var legendData = [];
    var legendDataList = [];
    var xAxisData = [];
    var xAxisDataList = [];
    var seriesData = [];
    data.forEach(function (item, index) {
        legendData.push(item.name);
        xAxisData.push(item.classes);
    })
    new Set(legendData).forEach(function(item){
        legendDataList.push(item);
    });
    new Set(xAxisData).forEach(function(item){
        xAxisDataList.push(item);
    });
    for (var i = 0; i < legendDataList.length; i++) {
        var datas = [];
        data.forEach(function(item, index) {
            if (item.name === legendDataList[i]) {
                datas.push(item.value);
            }
        })
        seriesData.push({
            name: legendDataList[i],
            type: !!type ? type : 'line',
            data: datas
        })
    }
    return {
        title: {
            show: true,
            text: '',
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: legendDataList
        },
        grid: {
            bottom: 80
        },
        dataZoom: !!zoom ? null : [{
            show: true,
            realtime: true,
            start: 65,
            end: 100
        }, {
            type: 'inside',
            labelPrecision: 'auto',
            realtime: true,
            start: 65,
            end: 100
        }],
        toolbox: {
            show: false,
            feature: {
                dataView: {
                    show: false,
                    readOnly: false
                },
                magicType: {
                    show: false,
                    type: ['line', 'bar']
                },
                restore: {
                    show: false
                },
                saveAsImage: {
                    show: false
                }
            }
        },
        calculable: true,
        xAxis: [{
            type: 'category',
            data: xAxisDataList
        }],
        yAxis: [{
            type: 'value'
        }],
        series: seriesData
    };
}

// 处理 人群偏好 雷达图
function radar (radar, title, size) {
    var showTitle = !!title ? true : false;
    title = !!title ? title : '';
    var max = 0;
    var datas = [];
    var total = 0;
    radar.forEach(function(v) {
        total += parseInt(v.value);
    });
    var seriesData = [];
    radar.forEach(function(v) {
        var p = (parseInt(v.value) / parseInt(total) * 100).toFixed(2)
        max = parseInt(max) > parseInt(p) ? parseInt(max) : parseInt(p);
        seriesData.push(p);
    })
    var radarIndicator = [];
    radar.forEach(function(v) {
        radarIndicator.push({
            name: v.name,
            max: parseInt(max) + 5
        })
    })
    return {
        title: {
            show: showTitle,
            text: title
        },
        tooltip: {},
        legend: {
            data: title
        },
        radar: {
            radius: '50%',
            indicator: radarIndicator
        },
        series: [{
            name: title,
            type: 'radar',
            data: [{
                value: seriesData,
                name: title
            }]
        }]
    };
}

// 处理 总价偏好 饼图
function pie (pie, title, size) {
    var showTitle = !!title ? true : false;
    var title = pie[0].classes;
    var legendData = [];
    var legendDataList = [];
    pie.forEach(function(item, index) {
        legendData.push(item.name);
    })
    new Set(legendData).forEach(function(item){
        legendDataList.push(item);
    });
    return {
        title: {
            show: true,
            text: title,
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            confine: true,
            formatter: '{a} <br/>{b} : {c} ({d}%)',
        },

        legend: {
            show: false,
            orient: 'horizontal',
            left: 'left',
            data: legendDataList
        },
        series: [{
            name: title,
            type: 'pie',
            radius: size == 'large' ? '50%' : '20%',
            center: ['50%', '50%'],
            data: pie,
            label: {
                normal: {
                    formatter: '{b}\n{d}' + '%'
                }
            },
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };
}

// 处理 波士顿矩阵
function bosd (data) {
    var echart1Name = [];
    var beginPoint = [];
    var endPoint = [];
    data.businessChartOnes.forEach(function(r) {
        echart1Name.push(r.name);
    });
    data.businessChartOnes.forEach(function(r) {
        beginPoint.push(r.point);
    });
    data.businessChartOnes.forEach(function(r) {
        endPoint.push(r.coord);
    });
    var option1 = {
        title: {
            text: '楼盘业务评估',
            show: true
        },
        tooltip: {},
        legend: {
            left: '20%',
            right: '4%',
            data: echart1Name, ////显示/隐藏的btn名称，需要与下列属性相同才能显示
            containLabel: true
        },
        xAxis: [{
            'min': -150,
            'max': 150
        }],
        yAxis: [{
            'min': -150,
            'max': 150
        }],
        series: [{
            'name': '\u5353\u8d8a\u65f6\u4ee3\u5e7f\u573a\u5546\u4f4f',
            'type': 'scatter', //显示/隐藏的btn样式
            'label': {
                'normal': {
                    'show': true,
                    'position': 'top',
                    'formatter': '{a}'
                }
            },
            'data': [
                ['0.00', null]
            ],
            'markLine': {
                'silent': true,
                'data': [
                    [{
                        'symbol': 'none',
                        'coord': [0, 0]
                    }, { //coord由外一点向原点划线
                        'symbol': 'none', //两点话线
                        'coord': [0, 0], //coord由原点向外一点划线
                        'lineStyle': {
                            'normal': {
                                'color': '#8B008B'
                            }
                        },
                        'label': {
                            'normal': {
                                'show': true,
                                'formatter': '0',
                                'position': 'middle'
                            }
                        } //formatter原点中间的内容“0”
                    }], {
                        'yAxis': data.businessChartOnes[0].z_line, //Y为0花一条平行于x轴的线
                        'label': {
                            'normal': {
                                'show': true,
                                'position': 'end', //end随着线的生成至结尾处
                                'formatter': '\u8f6c\u5316\u8d28\u91cf\u57fa\u51c6\u7ebf' //这条线上内容
                            }
                        }
                    }, {
                        'xAxis': data.businessChartOnes[0].g_line, //过该点垂直于Y轴直线
                        'label': {
                            'normal': {
                                'show': true,
                                'position': 'start',
                                'formatter': '\u4f9b\u7ed9\u91cf\u57fa\u51c6\u7ebf'
                            }
                        }
                    },
                    [{
                        'symbol': 'none',
                        'coord': [-150, 150]
                    }, { //同上，两点之间划线
                        'symbol': 'none',
                        'coord': [150, -150], //同上，两点之间划线
                        'lineStyle': {
                            'normal': {
                                'color': 'red',
                                'type': 'solid'
                            }
                        },
                        'label': {
                            'normal': {
                                'show': true,
                                'formatter': '\u4e1a\u52a1\u8868\u73b0\u57fa\u51c6\u7ebf'
                            }
                        }
                    }]
                ],
                'symbol': 'none'
            }
        }]

    };
    for (var i = 0; i < echart1Name.length; i++) {
        option1.series[0].markLine.data.push(
            [{
                "symbol": "none",
                "coord": beginPoint[i]
            }, { //划虚线
                "symbol": "none",
                "coord": endPoint[i],
                "lineStyle": {
                    "normal": {
                        "color": "#800000"
                    }
                },
                "label": {
                    "normal": {
                        "show": true,
                        "formatter": data.businessChartOnes[i].line,
                        "position": "middle"
                    }
                }
            }]
        )
    }
    for (var i = 0; i < echart1Name.length; i++) {
        option1.series.push({ //加入点
            name: echart1Name[i],
            type: 'scatter',
            data: [beginPoint[i]]
        })
    }
    var option3 = {
        title: {
            text: '波士顿矩阵',
            show: true
        },
        tooltip: {
            //
        },
        legend: {
            left: '20%',
            right: '4%',
            data: data.businessChartThree.name,
            containLabel: true
        },
        xAxis: [data.businessChartThree.xA],
        yAxis: [data.businessChartThree.yA],
        series: [{
            'type': 'scatter',
            'label': {
                'normal': {
                    'show': true,
                    'position': 'top',
                    'formatter': '{a}'
                }
            },
            'markLine': {
                'data': [{
                    'xAxis': data.businessChartThree.x, //垂直虚线
                    'label': {
                        'normal': {
                            'show': true,
                            'position': 'start',
                            'formatter': ''
                        }
                    },
                    'lineStyle': {
                        'normal': {
                            'color': 'red'
                        }
                    }
                }, {
                    'yAxis': data.businessChartThree.y, //平行虚线
                    'label': {
                        'normal': {
                            'show': true,
                            'position': 'start',
                            'formatter': ''
                        }
                    },
                    'lineStyle': {
                        'normal': {
                            'color': 'red'
                        }
                    }
                }],
                'symbol': 'none',
                'silent': true
            }
        }]
    };
    for (var i = 0; i < data.businessChartThree.name.length; i++) {
        option3.series.push({
            "name": data.businessChartThree.name[i],
            "type": "scatter",
            "label": {
                "normal": {
                    "show": true,
                    "position": "top",
                    "formatter": "{a}"
                }
            },
            "data": [data.businessChartThree.ponit[i]],
        })
    }
    var option2 = {
        color: ['#d53a35'], //柱状图颜色or总体颜色
        tooltip: {
            formatter: '{c}',
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        xAxis: [{
            axisLabel: {
                rotate: 20,
                interval: 0
            },
            data: data.businessChartTwo.name //柱状图x轴横坐标名称
        }],
        yAxis: [{
            type: 'value'
        }],
        series: [{
            name: '销量',
            type: 'bar',
            //                                  color:['#d53a35'],  //柱状图颜色
            data: data.businessChartTwo.data
        }, {
            silent: true,
            type: 'bar',
            data: [{
                'label': {
                    'normal': {
                        'show': false,
                        'position': 'top',
                        'formatter': '{a}'
                    }
                },
                'name': '\u5353\u8d8a\u65f6\u4ee3\u5e7f\u573a\u5546\u4f4f',
                'value': 0 //鼠标悬停显示内容
            }],
            markLine: {
                symbol: 'none',
                label: {
                    normal: {
                        show: true,
                        position: 'middle',
                        formatter: '市场成长性基准线'
                    }

                },
                lineStyle: {
                    normal: {
                        color: 'orange'
                    }
                },
                data: [{
                    yAxis: 1
                }]
            }
        }]
    };
    return {
        option1: option1,
        option2: option2,
        option3: option3
    }
}

// 处理 自定义饼图
function customizedPie(data) {
    var markLineOpt = {
        animation: false,
        lineStyle: {
            normal: {
                type: 'dashed'
            }
        },
        tooltip: {},
        data: [
            {
                name: '平均线',
                type: 'average',
                symbol: 'none'
            }
        ]
    };
    var option = {
        title: {
            text: '区域关注量分布'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            left: '20%',
            right: '4%',
            data: data['tagname'],
            containLabel: true
        },
        toolbox: {
            show: true,
            feature: {
                saveAsImage: {
                    show: true,
                    title: '保存为图片'
                }
            }
        },
        calculable: true,
        series: {
            name: '半径模式',
            type: 'pie',
            roseType: 'radius',
            label: {
                normal: {
                    show: true,
                    formatter: '{b}:{d}' + '%'
                }

            },
            lableLine: {
                normal: {
                    show: false
                },
                normal: {
                    show: true
                }
            },
            data: data['result']
        }
    };
    return option
}

// 处理 柱状图
function barStack(data) {
    var title = data[0].classes;
    var xAxisData = [];
    var xAxisDataList = [];
    var seriesData = [];
    var legendData = [];
    var seriesDataList = [];
    var legendDataList = [];
    data.forEach(function(item) {
        xAxisData.push(item.name);
        seriesData.push(item.value);
        legendData.push(item.classes);
    })
    new Set(legendData).forEach(function(item){
        legendDataList.push(item);
    });
    new Set(xAxisData).forEach(function(item){
        xAxisDataList.push(item);
    });
    for (var i = 0; i < legendDataList.length; i++) {
        var datas = [];
        data.forEach(function(item, index) {
            if (item.classes === legendDataList[i]) {
                datas.push(item.value);
            }
        })
        seriesDataList.push({
            name: legendDataList[i],
            type: 'bar',
            data: datas
        })
    }
    return {
        title: {
            show: false,
            text: title + '关注量',
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: legendDataList
        },
        toolbox: {
            show: true,
            feature: {
                dataView: {
                    show: false,
                    readOnly: false
                },
                magicType: {
                    show: true,
                    type: ['line', 'bar']
                },
                restore: {
                    show: true
                },
                saveAsImage: {
                    show: true
                }
            }
        },
        calculable: true,
        xAxis: [{
            type: 'category',
            axisLabel: {
                rotate: 27,
                interval: 0
            },
            data: xAxisDataList
        }],
        yAxis: [{
            type: 'value'
        }],
        series: seriesDataList
    };
}

// 处理矩阵图
function BCGMatrix(bos, mutil) {
    if (bos.length < 1) {
        return;
    }
    var xAxis = [];
    var data = [];
    var legend = [];
    var xmin = 0,
        xmax = 0,
        ymin = 0,
        ymax = 0,
        symbol = ['circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'];
    if (mutil) {
        legend = [bos[0].classes];
        var tmpPoint = [];
        bos.forEach(function(v, k) {
            var x = parseFloat(v.classcode);
            var y = parseFloat(v.value);
            xmin > x ? xmin = x : xmin;
            xmax < x ? xmax = x : xmax;
            ymin > y ? ymin = y : ymin;
            ymax < y ? ymax = y : ymax;
            tmpPoint.push([v.classcode, v.value, 100, v.name, legend[0]]);
        })
        data.push({
            name: legend[0],
            type: 'scatter',
            data: tmpPoint,
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    formatter: function(a) {
                        return a.data[3] + ''
                    }
                }
            }
        });
        data.forEach(function(v, k) {
            v['markLine'] = {
                animation: false,
                label: {
                    normal: {
                        formatter: "评判线"
                    }
                },
                lineStyle: {
                    normal: {
                        type: 'solid',
                        color: "#f00"
                    }
                },
                tooltip: {
                    formatter: '评判线'
                },
                data: [
                    [{
                        coord: [10, (ymin - 10).toFixed(2)],
                        symbol: 'none'
                    }, {
                        coord: [10, (ymax + 10).toFixed(2)],
                        symbol: 'none'
                    }],
                    [{
                        coord: [(xmin - 10).toFixed(2), ((ymax + ymin) / 2).toFixed(2)],
                        symbol: 'none'
                    }, {
                        coord: [(xmax + 10).toFixed(2), ((ymax + ymin) / 2).toFixed(2)],
                        symbol: 'none'
                    }]
                ]
            };
            v["symbol"] = k > 6 ? symbol[k - 6] : symbol[k];
        })
    } else {
        bos.forEach(function(attr) {
            var x = parseFloat(attr.classcode);
            var y = parseFloat(attr.value);
            xmin > x ? xmin = x : xmin;
            xmax < x ? xmax = x : xmax;
            ymin > y ? ymin = y : ymin;
            ymax < y ? ymax = y : ymax;
            legend.push(attr.name);
            data.push({
                    name: attr.name,
                    type: 'scatter',
                    data: [
                        [attr.classcode, attr.value]
                    ],
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            formatter: "{a}"
                        }
                    }
                }

            );
        });
        data[0]['markLine'] = {
            animation: false,
            label: {
                normal: {
                    formatter: "评判线"
                }
            },
            lineStyle: {
                normal: {
                    formatter: "评判线",
                    type: 'solid',
                    color: "#f00"
                }
            },
            tooltip: {
                formatter: '评判线'
            },
            data: [
                [{
                    coord: [10, (ymin - 10).toFixed(2)],
                    symbol: 'none'
                }, {
                    coord: [10, (ymax + 10).toFixed(2)],
                    symbol: 'none'
                }],
                [{
                    coord: [(xmin - 10).toFixed(2), ((ymax + ymin) / 2).toFixed(2)],
                    symbol: 'none'
                }, {
                    coord: [(xmax + 10).toFixed(2), ((ymax + ymin) / 2).toFixed(2)],
                    symbol: 'none'
                }]
            ]
        };
    }
    return {
        title: {
            text: '',
            x: 'center',
            y: 0
        },
        legend: {
            show: true,
            data: legend,
            top: "20",
        },
        grid: {
            top: '80'
        },
        tooltip: {
            formatter: "{a}<br/>占比,涨幅:{c}",
        },
        toolbox: {
            feature: {
                dataZoom: {},
                brush: {
                    type: ['rect', 'polygon', 'clear']
                }
            }
        },
        xAxis: [{
            gridIndex: 0,
            min: (xmin - 10).toFixed(2),
            max: (xmax + 10).toFixed(2),
            axisLine: {
                lineStyle: {
                    color: "#ddd"
                }
            },
            axisTick: {
                show: false
            }
        }],
        yAxis: [{
            gridIndex: 0,
            min: (ymin - 10).toFixed(2),
            max: (ymax + 10).toFixed(2),
            axisLine: {
                lineStyle: {
                    color: "#ddd"
                }
            },
            axisTick: {
                show: false
            }
        }],
        series: data
    };
}
