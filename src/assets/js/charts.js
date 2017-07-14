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
        case 'shichangfenxiTitle':
            return mutilLine(data);
            break
        case 'shichangfenxiTitleLeft':
            return radar(data);
            break
        case 'gengduorenqunpianhao01Left':
            return radar(data);
            break    
        case 'renqunpianhaozhuyaoquyuProject':
            return pie(data);
            break
        case 'yewupinggu':
            var selectData = selectDatas(data);
            return option(title, selectData.top5LegendData, selectData.xAxisData, selectData.top5seriesData);
            break                       
        default:
            // statements_def
            break;
    }
};

// 处理 总关注趋势 数据 折线图
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
// 处理 更多市场关注趋势 数据 折线图
function selectDatas (data) {
    var top5LegendData = data.tagname;
    var xAxisData = [];
    var seriesData0 = [];
    var seriesData1 = [];
    var seriesData2 = [];
    var seriesData3 = [];
    var seriesData4 = [];
    var seriesData5 = [];
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
                case top5LegendData[4]:
                    seriesData4.push(childItem.total_view_count ? childItem.total_view_count : childItem.value);
                    break;    
                default:
                    seriesData5.push(childItem.total_view_count ? childItem.total_view_count : childItem.value);
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
    }, {
        name: top5LegendData[5],
        type: 'line',
        data: seriesData5
    }];
    return {
        top5LegendData: top5LegendData,
        xAxisData: xAxisData,
        top5seriesData: top5seriesData
    }
};

// 处理 'line' 数据option 折线图
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

// 处理 人群偏好 总价 折线图
function mutilLine (data) {
    var legendData = [];
    var xAxisData = [];
    var seriesData = [];
    data.forEach(function (item, index) {
        legendData.push(item.name);
        xAxisData.push(item.classes);
    })
    legendData = [...new Set(legendData)];
    xAxisData = [...new Set(xAxisData)];
    for (let i in legendData) {
        let datas = [];
        data.forEach(function(item, index) {
            if (item.name === legendData[i]) {
                datas.push(item.value);
            }
        })
        seriesData.push({
            name: legendData[i],
            type: 'line',
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
            data: legendData
        },
        grid: {
            bottom: 80
        },
        dataZoom: [{
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
            data: xAxisData
        }],
        yAxis: [{
            type: 'value'
        }],
        series: seriesData
    };
}

// 处理 人群偏好 雷达图
function radar(radar, title, size) {
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
            radius: "50%",
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
function pie(pie, title, size) {
    var showTitle = !!title ? true : false;
    var title = pie[0].classes;
    var legendData = [];
    pie.forEach(function(item, index) {
        legendData.push(item.name);
    })
    legendData = [...new Set(legendData)];
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
        },

        legend: {
            show: false,
            orient: 'horizontal',
            left: 'left',
            data: legendData
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