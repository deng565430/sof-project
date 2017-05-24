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
        for (let v of data.projectType) {
          tooltipData.push(v.source);
          xAxisData.push(v.batch);
          totalData.push(v.total);
          legendData.push(v.source);
          seriesData.push(v.intentionrate);
        }
        tooltipData = Array.from(new Set(tooltipData));
        xAxisData = Array.from(new Set(xAxisData));
        let intentionrates = [{
          intentionrate: []
        }, {
          intentionrate: []
        }, {
          intentionrate: []
        }, {
          intentionrate: []
        }, {
          intentionrate: []
        }, {
          intentionrate: []
        }, {
          intentionrate: []
        }, {
          intentionrate: []
        }, {
          intentionrate: []
        }, {
          intentionrate: []
        }];
        this.disposeData(intentionrates, data, xAxisData, tooltipData);
        console.log(intentionrates);
        let tooltipDatas = [];
        for (let i = 0; i < tooltipData.length; i++) {
          let data = {};
          data.name = tooltipData[i];
          data.type = 'line';
          data.data = intentionrates[i].intentionrate;
          tooltipDatas.push(data);
        }
        let titleText = data.projectType[0].project;
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
          series: tooltipDatas
        };
        this.chart.setOption(projectTypeOption);
      } else if (id === 'typeIntention') {
        console.log('typeIntention');
        let project = [];
        let source = [];
        let batch = [];
        for (let v of data.projectType) {
          project.push(v.project);
          source.push(v.source);
          batch.push(v.batch);
        }
        project = Array.from(new Set(project));
        source = Array.from(new Set(source));
        batch = Array.from(new Set(batch));
        console.log(project);
        console.log(source);
        console.log(batch);
        
      }
    },
    disposeData (intentionrates, data, xAxisData, tooltipData) {
      let datas = [{
        batch: []
      }, {
        batch: []
      }, {
        batch: []
      }, {
        batch: []
      }, {
        batch: []
      }, {
        batch: []
      }, {
        batch: []
      }, {
        batch: []
      }, {
        batch: []
      }, {
        batch: []
      }];
      let num = 0;
      for (var i = 0; i < tooltipData.length; i++) {
        (function (i) {
          for (let v of data.projectType) {
            if (tooltipData[i] === v.source) {
              datas[num].batch.push({
                batch: v.batch,
                source: v.source,
                intentionrate: v.intentionrate
              });
            }
          }
        })(i);
        num++;
      }
      for (let y in datas) {
        for (let x in datas[y].batch) {
          for (let z in xAxisData) {
            for (let m in tooltipData) {
              switch (datas[y].batch[x].source) {
                case tooltipData[m]:
                  if (datas[y].batch[x].batch === xAxisData[z]) {
                    intentionrates[m].intentionrate.length = xAxisData.length;
                    intentionrates[m].intentionrate[z] = datas[y].batch[x].intentionrate;
                  }
                  break;
              }
            }
          }
        }
      }
      for (let t = 0; t < intentionrates.length; t++) {
        (function (t) {
          for (let p = 0; p < intentionrates[t].intentionrate.length; p++) {
            (function (p) {
              if (typeof (intentionrates[t].intentionrate[p]) === 'undefined') {
                intentionrates[t].intentionrate[p] = 0;
              }
            })(p);
          }
        })(t);
      }
      return intentionrates;
    }
  },
  props: ['id', 'projectType'],
  ready () {}
};
</script>

<style lang="css" scoped>
</style>
