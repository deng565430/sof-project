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
        console.log(val.projectType);
        this.charts(this.id.id, val);
      },
      deep: true
    }
  },
  created () {
    console.log(this.projectType);
  },
  methods: {
    charts (id, data) {
      this.chart = echarts.init(document.getElementById(id));
      if (id === 'projectIntention') {
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
        let v = '';
        let xAxisData = [];
        let totalData = [];
        let seriesData = [];
        let legendData = [];
        let tooltipData = [];
        for (v of data.projectType) {
          xAxisData.push(v.batch);
          totalData.push(v.total);
          legendData.push(v.source);
          seriesData.push(v.intentionrate);
        }
        tooltipData = new Set(legendData);
        console.log(tooltipData);
        let titleText = data.projectType[0].project;
        var projectTypeOption = {
          title: {
            text: titleText
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['ad', 'uid']
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
            name: 'ad',
            type: 'bar',
            data: totalData
          }, {
            name: 'uid',
            type: 'line',
            data: seriesData
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
