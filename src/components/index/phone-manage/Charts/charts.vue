<template>
<div>
  <div v-loading="loading" element-loading-text="拼命加载中" :id="id" :style="chartStyle ? chartStyle : {width: '1400px', height: '500px'}"></div>
</div>
</template>

<script>
import echarts from 'echarts';
export default {

  name: 'phoneResultCharts',

  data () {
    return {
      chart: null,
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
      if (!id || !data) {
        return;
      }
      this.chart = echarts.init(document.getElementById(id));
      this.chart.setOption(data);
    }
  },
  props: ['id', 'projectType', 'chartStyle'],
  ready () {}
};
</script>

<style lang="css" scoped>
</style>
