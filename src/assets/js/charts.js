export function line(data, name, title) {
    switch (name) {
        case 'topAll':
            var topAll = topAllData(data);
            return option(topAll.title, topAll.legendData, topAll.xAxisData, topAll.seriesData)
            break;
        case 'selectData':
            var selectData = selectDatas(data);
            return option(title, selectData.top5LegendData, selectData.xAxisData, selectData.top5seriesData);
            break
        case 'selectTypeProject':
            var selectData = selectDatas(data);
            return option(title, selectData.top5LegendData, selectData.xAxisData, selectData.top5seriesData);
            break    
        default:
            // statements_def
            break;
    }
};

// 处理 总关注趋势 数据
function topAllData (data) {
    var k = [];
    var c = [];
    var b = [];
    var d = [];
    var i = 0;
    data.forEach(function(item) {
        k[i] = item['date'];
        b[i] = item['indname'];
        c[i] = item['typename'];
        d[i] = Number(item['total_view_count']);
        i = i + 1;
    });
    var title = data[0]['typename'];
    var markLineOpt = {
        animation: false,
        lineStyle: {
            normal: {
                type: 'dashed'
            }
        },
        tooltip: {
            formatter: 'y = 0.5 * x + 3'
        },
        label: {
            normal: {
                show: true,
                formatter: '{b}: {c}'
            }
        },
        data: [{
            name: '平均线',
            type: 'average',
            symbol: 'none'
        }]
    };
    var legendData = [title];
    var seriesData = [{
        name: title,
        type: 'line',
        data: d,
        markLine: markLineOpt
    }];
    return {
        title: title,
        legendData: legendData,
        xAxisData: k,
        seriesData: seriesData
    }
}
// 处理 更多市场关注趋势 数据
function selectDatas (data) {
    var top5LegendData = data.tagname;
    var xAxisData = [];
    var seriesData0 = [];
    var seriesData1 = [];
    var seriesData2 = [];
    var seriesData3 = [];
    var seriesData4 = [];
    data.result.forEach(function(item, index) {
        item.forEach(function(childItem, childIndex) {
            switch (childItem.tagname ? childItem.tagname : childItem.name) {
                case top5LegendData[0]:
                    seriesData0.push(childItem.total_view_count ? childItem.total_view_count : childItem.value);
                    break;
                case top5LegendData[1]:
                    xAxisData.push(childItem.date);
                    seriesData1.push(childItem.total_view_count ? childItem.total_view_count : childItem.value);
                    break;
                case top5LegendData[2]:
                    seriesData2.push(childItem.total_view_count ? childItem.total_view_count : childItem.value);
                    break;
                case top5LegendData[3]:
                    seriesData3.push(childItem.total_view_count ? childItem.total_view_count : childItem.value);
                    break;
                default:
                    seriesData4.push(childItem.total_view_count ? childItem.total_view_count : childItem.value);
                    break;
            }
        });
    });
    var top5seriesData = [{
        name: top5LegendData[0],
        type: 'line',
        data: seriesData0
    }, {
        name: top5LegendData[1],
        type: 'line',
        data: seriesData1
    }, {
        name: top5LegendData[2],
        type: 'line',
        data: seriesData2
    }, {
        name: top5LegendData[3],
        type: 'line',
        data: seriesData3
    }, {
        name: top5LegendData[4],
        type: 'line',
        data: seriesData4
    }];
    return {
        top5LegendData: top5LegendData,
        xAxisData: xAxisData,
        top5seriesData: top5seriesData
    }
};

// 处理 'line' 数据option
function option (title, legendData, xAxisData, seriesData) {
    var option = {
        title: {
            top: '3%',
            text: title,
            show: false
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            top: '3%',
            data: legendData
        },
        xAxis: {
            axisLabel: {
                rotate: 45,
                interval: 2
            },
            type: 'category',
            boundaryGap: false,
            data: xAxisData
        },
        yAxis: {
            type: 'value'
        },
        series: seriesData
    };
    return option;
}


export function areaStack(pie) {
    var title = ''; // _(pie).thru(_.head).result("classs");
    var xAxis = [];
    var data = [];

    pie.forEach(function(attr) {
        xAxis.push(attr.name);
        data.push(attr.value);
    })
    return {
        title: {
            show: false,
            text: title + "关注量",
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: [title]
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
                rotate: 45,
                interval: 0
            },
            data: xAxis
        }],
        yAxis: [{
            type: 'value'
        }],
        series: [{
            name: title,
            type: 'bar',
            data: data
        }]
    };
};

export function BCGMatrix(bos, mutil) {
    var xAxis = [];
    var data = [];
    var legend = [];
    var xmin = 0,
        xmax = 0,
        ymin = 0,
        ymax = 0,
        symbol = ['circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'];
    if (mutil) {
        var tmpArr = _.groupBy(bos, "classs");
        legend = _.concat(legend, _.keys(tmpArr));
        _.each(tmpArr, function(v, k) {
            let tmpPoint = [];
            _.each(v, function(_v, _k) {
                var x = parseFloat(_v.classcode);
                var y = parseFloat(_v.value);
                xmin > x ? xmin = x : xmin;
                xmax < x ? xmax = x : xmax;
                ymin > y ? ymin = y : ymin;
                ymax < y ? ymax = y : ymax;
                tmpPoint.push([_v.classcode, _v.value, 100, _v.name, k])
            });
            data.push({
                name: k,
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
        });
        _.each(data, function(v, k) {
            v["markLine"] = {
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
        _.each(bos, function(attr) {
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
    };
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

export function mutilLine(line, title, type, zoom) {
    var xAxis = [];
    var data = [];
    const legend = [];
    var type = type || 'line'
    var series = _.groupBy(line, "name");
    _.each(line, function(attr) {
        xAxis.push(attr.classs);
    })
    xAxis = _.uniq(xAxis);
    //遍历获取到的项目， 把他拼成series 所需要格式
    _.each(series, function(val, key) {

        var v = [];
        for (var i = 0; i < val.length; i++) {
            v.push(val[i].value)
        }
        data.push({
            name: key,
            type: !!type ? type : 'line',
            data: v
        });

        legend.push(key);
    });

    return {
        title: {
            show: true,
            text: title,
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: legend
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
            data: xAxis
        }],
        yAxis: [{
            type: 'value'
        }],
        series: data
    };
}

export function pie(pie, title, size) {
    var showTitle = !!title ? true : false;
    return {
        title: {
            show: true,
            text: title,
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            confine: true,
            formatter: "{a} <br/>{b} : {c} ({d}%)",
            position: function(point, params, dom) {

                var pointX = point[0] / 2.4;
                var pointY = point[1] * 1.15;
                return [pointX, pointY];
            }
        },
        legend: {
            show: false,
            orient: 'horizontal',
            left: 'left',
            data: _.keys(_.groupBy(pie, "name"))
        },
        series: [{
            name: title,
            type: 'pie',
            radius: size == "large" ? '65%' : "20%",
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

export function pieNext(all, sin) {
    var options = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            show: false,
            orient: 'vertical',
            x: 'left',
            data: []
        },
        series: []
    }

    var seriesAll = {
        name: all.name,
        type: 'pie',
        selectedMode: 'single',
        radius: [0, '30%'],
        label: {
            normal: {
                position: 'inner'
            }
        },
        labelLine: {
            normal: {
                show: false
            }
        },
        data: all.data
    };

    var seriesSin = {
        name: sin.name,
        type: 'pie',
        radius: ['40%', '55%'],

        data: sin.data
    };

    options.series = [seriesAll, seriesSin];

    return options;
}
