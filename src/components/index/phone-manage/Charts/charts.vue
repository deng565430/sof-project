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
      datas: this.data
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
        console.log(this.id);
        console.log(val);
        this.charts(this.id, val);
      },
      deep: true
    }
  },
  created () {},
  methods: {
    charts (id, data) {
      alert(id);
      if (!id || !data) {
        return;
      }
      if (id.compareThisWeekId) {
        this.chart = echarts.init(document.getElementById(id.compareThisWeekId));
        this.chart.setOption(data.compareThisWeek);
      }
      if (id.comparePhonalyzrId) {
        alert(id.comparePhonalyzrId);
        this.chart = echarts.init(document.getElementById(id.comparePhonalyzrId));
        this.chart.setOption(data.comparePhonalyzr);
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
