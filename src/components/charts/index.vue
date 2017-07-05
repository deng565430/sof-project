<template>
<div style="text-align: left">
  <div v-loading="loading" element-loading-text="拼命加载中" :id="id" :style="chartStyle ? chartStyle : {width: '900px', height: '500px'}"></div>
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
      const self = this;
      if (!id || !data) {
        return;
      }
      this.chart = echarts.init(document.getElementById(id));
      this.chart.on('click', function (param) {
        self.$emit('clickEvent', param);
      });
      this.chart.setOption(data);
    }
  },
  props: ['id', 'projectType', 'chartStyle'],
  ready () {}
};
</script>

<style lang="css" scoped>
</style>
