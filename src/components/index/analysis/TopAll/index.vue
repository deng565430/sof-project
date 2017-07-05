<template>
<div>
  <Charts :id="'r-bazaar-charts'" :projectType="rBazaarCharts[0]" :chartStyle="{height: '400px'}" />
</div>
</template>

<script>
import Charts from '../../../Charts';
import data from './data.json';
export default {

  name: 'index',
  components: {
    Charts
  },
  data () {
    return {
      rBazaarCharts: []
    };
  },
  mounted () {
    this.line(data, null, 'large');
  },
  methods: {
    line (pie, tit, size) {
      let k = [];
      let c = [];
      let b = [];
      let d = [];
      let i = 0;
      pie.forEach(function (item) {
        k[i] = item['date'];
        b[i] = item['indname'];
        c[i] = item['typename'];
        d[i] = Number(item['total_view_count']);
        i = i + 1;
      });
      let title = pie[0]['typename'];
      let markLineOpt = {
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
      let option = {
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
          data: [title]
        },
        xAxis: {
          axisLabel: {
            rotate: 45,
            interval: 2
          },
          type: 'category',
          boundaryGap: false,
          data: k
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: title,
          type: 'line',
          data: d,
          markLine: markLineOpt
        }]
      };
      this.rBazaarCharts.push(option);
    }
  }
};
</script>

<style lang="css" scoped>
</style>
