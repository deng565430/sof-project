<template>
<div>
    <div v-if="flag">
      <div  v-if="chartData.title !== '综合评估'">
        <Charts :id="chartData.id_" :projectType="rBazaarCharts[0]" :chartStyle="chartStyle"/>
      </div>
      <div v-else>
        <Charts id="bosd1" :projectType="bods1[0]" :chartStyle="chartStyle"/>
        <div>
          <div class="title">
              <span>成长性评估</span>
              <span></span>
          </div>
          <div class="">
            <Charts id="bosd2" :projectType="bods2[0]" :chartStyle="{height: '880px', width: '1000px'}"/>
            <Charts id="bosd3" :projectType="bods3[0]" :chartStyle="chartStyle"/>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-msg">
      <p>暂无数据</p>
    </div>
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
      flag: true,
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
      this._getDataList(selectDataUrl, this.rBazaarCharts, this.chartData.chart, this.chartData.method);
    },
    _getDataList (url, dataList, name, methods) {
      if (this.chartData.method === 'post') {
        const data = {
          keywords: this.projectName,
          type: 'scatter'
        };
        this.$api.post(this.chartData.url, data)
          .then(res => {
            if (res.data.code === 1) {
              this.flag = false;
              return;
            }
            if (res.data.code === 0) {
              if (res.data.data.length <= 1 || res.data.data == null) {
                this.flag = false;
                return;
              }
              const datas = res.data.data;
              const option = line(datas, this.chartData.chart);
              this.bods1.push(option.option3);
              this.bods2.push(option.option1);
              this.bods3.push(option.option2);
            }
          });
        return;
      }
      this.$api.get(url)
        .then(res => {
          if (res.data.code === 1) {
            this.flag = false;
            return;
          }
          if (res.data.code === 0) {
            const data = res.data.data;
            if (res.data.data.length <= 1 || res.data.data == null) {
              this.flag = false;
              return;
            }
            if (res.data.data.result && res.data.data.result.length <= 1 && res.data.data.tagname && res.data.data.tagname.length <= 1) {
              this.flag = false;
              return;
            }
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

<style lang="stylus" rel="stylesheet/stylus">
.text-msg
  width: 100%
  height: 200px
  p
    line-height: 100px
    text-align: center
</style>
