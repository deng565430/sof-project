<template>
<div>
  <div :id="id.id" :style="{width: '1000px', height: '500px'}"></div>
</div>
</template>

<script>
import echarts from 'echarts';
export default {

  name: 'phoneResultCharts',

  data () {
    return {
      chart: null,
      datas: this.data,
      projectTypes: this.projectType
    };
  },
  mounted () {
    require('echarts/lib/chart/bar');
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    this.$nextTick(() => {
      this.charts(this.id.id, this.projectType);
    });
  },
  watch: {
    'projectType': {
      handler: function (val, oldValue) {
        this.charts(this.id.id, val);
      },
      deep: true
    }
  },
  created () {},
  methods: {
    charts (id, data) {
      this.chart = echarts.init(document.getElementById(id));
      if (id === 'projectIntention') {
        console.log('projectIntention');
        let v = '';
        let xAxisData = [];
        let totalData = [];
        let seriesData = [];
        for (v of data.projectType) {
          xAxisData.push(v.batch);
          totalData.push(v.total);
          seriesData.push(v.intentionrate);
        }
        let titleText = data.projectType[0].project;
        var option = {
          title: {
            text: titleText
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['总量', '意向率']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xAxisData
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name: '总量',
            type: 'bar',
            data: totalData
          }, {
            name: '意向率',
            type: 'line',
            data: seriesData
          }]
        };
        this.chart.setOption(option);
      } else if (id === 'projectType') {
        console.log('projectType');
        let xAxisData = [];
        let totalData = [];
        let seriesData = [];
        let legendData = [];
        let tooltipData = [];
        let adData = [];
        let ADData = [];
        let adKwData = [];
        let uidData = [];
        let uidKwData = [];
        let yiLeiKwData = [];
        let cdmaData = [];
        let imeiData = [];
        let proData = [];
        for (let v of data.projectType) {
          tooltipData.push(v.source);
          xAxisData.push(v.batch);
          totalData.push(v.total);
          legendData.push(v.source);
          seriesData.push(v.intentionrate);
        }
        tooltipData = Array.from(new Set(tooltipData));
        xAxisData = Array.from(new Set(xAxisData));
        for (var i = 0; i < data.projectType.length; i++) {
          for (var j = 0; j < tooltipData.length; j++) {
            console.log(1);
          }
        }
        for (let v of data.projectType) {
          adData.push(v.source === tooltipData[0] ? v.intentionrate : -1);
          ADData.push(v.source === tooltipData[1] ? v.intentionrate : -1);
          adKwData.push(v.source === tooltipData[2] ? v.intentionrate : -1);
          uidData.push(v.source === tooltipData[3] ? v.intentionrate : -1);
          uidKwData.push(v.source === tooltipData[4] ? v.intentionrate : -1);
          yiLeiKwData.push(v.source === tooltipData[5] ? v.intentionrate : -1);
          cdmaData.push(v.source === tooltipData[6] ? v.intentionrate : -1);
          imeiData.push(v.source === tooltipData[7] ? v.intentionrate : -1);
          proData.push(v.source === tooltipData[8] ? v.intentionrate : -1);
        }

        let ad = adData.filter((x, i, item) => {
          return x !== -1;
        });
        let ADD = ADData.filter((x) => {
          return x !== -1;
        });
        let adKw = adKwData.filter((x) => {
          return x !== -1;
        });
        let uid = uidData.filter((x) => {
          return x !== -1;
        });
        let uidKw = uidKwData.filter((x) => {
          return x !== -1;
        });
        let yiLei = yiLeiKwData.filter((x) => {
          return x !== -1;
        });
        let cdma = cdmaData.filter((x) => {
          return x !== -1;
        });
        let imei = imeiData.filter((x) => {
          return x !== -1;
        });
        let pro = proData.filter((x) => {
          return x !== -1;
        });
        let titleText = data.projectType[0].project;
        let seriesDatas = [];
        tooltipData.forEach((v, i) => {
          let data = {};
          data.name = v;
          data.type = 'type';
          data.data = ad;
          seriesDatas.push(data);
        });
        var projectTypeOption = {
          title: {
            text: titleText
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: tooltipData
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xAxisData
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name: tooltipData[0],
            type: 'line',
            data: ad
          }, {
            name: tooltipData[1],
            type: 'line',
            data: ADD
          }, {
            name: tooltipData[2],
            type: 'line',
            data: adKw
          }, {
            name: tooltipData[3],
            type: 'line',
            data: uid
          }, {
            name: tooltipData[4],
            type: 'line',
            data: uidKw
          }, {
            name: tooltipData[5],
            type: 'line',
            data: yiLei
          }, {
            name: tooltipData[6],
            type: 'line',
            data: cdma
          }, {
            name: tooltipData[7],
            type: 'line',
            data: imei
          }, {
            name: tooltipData[8],
            type: 'line',
            data: pro
          }]
        };
        this.chart.setOption(projectTypeOption);
      }
    }
  },
  props: ['id', 'projectType'],
  ready () {}
};
</script>

<style lang="css" scoped>
</style>
