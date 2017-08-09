<template>
<div>
  <Charts :id="chartData.id_" :projectType="rBazaarCharts[0]" :chartStyle="chartStyle"/>
</div>
</template>

<script>
import Charts from '../../../Charts';
import { line } from 'assets/js/charts';
export default {

  name: 'index',
  components: {
    Charts
  },
  data () {
    return {
      rBazaarCharts: [],
      data: ''
    };
  },
  mounted () {
    this.$nextTick(() => {
      this.line(this.data, null, 'large');
    });
  },
  methods: {
    line (pie, tit, size) {
      const fuhao = this.chartData.url.indexOf('?') > -1 ? '&' : '?';
      const param1 = this.chartData.param1 != null ? `${this.chartData.param1}=${encodeURI(this.chartData.value1)}` : '';
      const param2 = this.chartData.param2 != null ? `${this.chartData.param2}=${encodeURI(this.chartData.value2)}` : '';
      const param3 = this.chartData.param3 != null ? `${this.chartData.param3}=${encodeURI(this.chartData.value3)}` : '';
      console.log(param1, param2, param3);
      const selectDataUrl = `${this.chartData.url}${fuhao}${this.chartData.param1}=${encodeURI(this.chartData.value1)}&id=${this.projId}`;
      console.log(selectDataUrl, this.rBazaarCharts, this.chartData.chart);
      this._getDataList(selectDataUrl, this.rBazaarCharts, this.chartData.chart);
    },
    _getDataList (url, dataList, name, name2, dataList2, titleName) {
      this.$api.get(url)
      .then(res => {
        if (res.data.code === 0) {
          const data = res.data.data;
          const option = line(data, name);
          dataList.push(option);
          if (name2) {
            const option = line(data, name2);
            dataList2.push(option);
          }
          if (titleName) {
            titleName += data[0].classes;
          }
        }
      });
    }
  },
  props: {
    id: {
      type: String,
      default: new Date().getTime()
    },
    projId: {
      type: String,
      default: '10424'
    },
    chartData: {
      type: Object,
      default: {}
    },
    name: {
      type: String,
      default: ''
    },
    chartStyle: {
      type: Object,
      default: {height: '400px'}
    }
  }
};
</script>

<style lang="css" scoped>
</style>
