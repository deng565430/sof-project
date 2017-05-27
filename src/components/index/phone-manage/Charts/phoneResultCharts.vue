<template>
<div>
  <div :id="id.id ? id.id : id.compareThisWeekId" :style="chartStyle ? chartStyle : {width: '1400px', height: '500px'}"></div>
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
      loading: true
    };
  },
  mounted () {
    require('echarts/lib/chart/bar');
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    this.$nextTick(() => {
      this.charts(this.id, this.projectType);
    });
  },
  watch: {
    'projectType': {
      handler: function (val, oldValue) {
        this.charts(this.id, val);
      },
      deep: true
    }
  },
  created () {},
  methods: {
    charts (id, data) {
      console.log(id);
      console.log(data);
      if (id.compareThisWeekId === 'compareThisWeekId') {
        this.chart = echarts.init(document.getElementById(id.compareThisWeekId));
      }
      this.chart = echarts.init(document.getElementById(id.id));
      if (data.thisWeek) {
        this.chart.setOption(data.thisWeek);
      }
      this.chart.setOption(data.projectType);
    }
  },
  props: ['id', 'projectType', 'chartStyle'],
  ready () {}
};
</script>

<style lang="css" scoped>
</style>
