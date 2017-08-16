<template>
<div>
    <Charts id="bosd1" v-if="bods1.length > 0" :projectType="bods1[0]" :chartStyle="chartStyle"/>
    <Charts id="bosd2" v-if="bods2.length > 0" :projectType="bods2[0]" :chartStyle="chartStyle"/>
    <Charts id="bosd3" v-if="bods3.length > 0" :projectType="bods3[0]" :chartStyle="chartStyle"/>
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
      data: '',
      flag: false,
      bods1: [],
      bods2: [],
      bods3: []
    };
  },
  mounted () {
    this.$nextTick(() => {
      this.charts(this.data, null, 'large');
    });
  },
  methods: {
    charts (pie, tit, size) {
      if (this.chartData.method === 'post') {
        this._getDataList(this.chartData.url);
        return;
      }
      const fuhao = this.chartData.url.indexOf('?') > -1 ? '&' : '?';
      const param1 = this.chartData.param1 != null ? `${this.chartData.param1}=${encodeURI(this.chartData.value1)}` : '';
      const param2 = this.chartData.param2 != null ? `${'&' + this.chartData.param2}=${this.projId}` : '';
      const param3 = this.chartData.param3 != null ? `${'&' + this.chartData.param3}=${encodeURI(this.projectName)}` : '';
      const selectDataUrl = `${this.chartData.url}${fuhao}${param1}${param2}${param3}`;
      console.log(selectDataUrl, this.chartData.title, this.chartData.chart, this.chartData);
      this._getDataList(selectDataUrl, this.rBazaarCharts, this.chartData.chart, this.chartData.method);
    },
    _getDataList (url, dataList, name, methods) {
      if (this.chartData.method === 'post') {
        const data = {
          keywords: this.projectName,
          type: 'scatter'
        };
        console.log(this.chartData);
        this.$api.post(this.chartData.url, data)
          .then(res => {
            if (res.data.code === 0) {
              const datas = res.data.data;
              const option = line(datas, this.chartData.chart);
              console.log(this.chartData.chart);
              this.bods1.push(option.option3);
              this.bods2.push(option.option1);
              this.bods3.push(option.option2);
              console.log(option);
            }
          });
        return;
      }
      this.$api.get(url)
        .then(res => {
          if (res.data.code === 0) {
            const data = res.data.data;
            const option = line(data, name);
            dataList.push(option);
          }
        });
    }
  },
  props: {
    projId: {
      type: String,
      default: '10409'
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
      type: Object
    },
    projectName: {
      type: String,
      default: '上海青浦万达茂商住'
    }
  }
};
</script>

<style lang="css" scoped>
</style>
