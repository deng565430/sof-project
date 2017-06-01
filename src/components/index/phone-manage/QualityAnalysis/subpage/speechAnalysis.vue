<template>
<div>
  <div>
    <DataSearch :salesmanOptions="salesmanOptions" :sectionOptions="sectionOptions" @childEvent="childEvent"/>
  </div>
  <div class="weekCharts">
   <Charts :id="{id}" :projectType="projectType[0]" :chartStyle="chartStyle"></Charts>
 </div>
   <div v-if="isShow" class="isShow"> 
      <div>
        <p><span>+ </span> 添加对比项</p>
      </div>
   </div> 
    <div v-else>
      <Charts :id="{compareThisWeekId}" :projectType="{compareThisWeek}" :chartStyle="chartStyle"></Charts>
    </div>
</div>
</template>

<script>
import DataSearch from '../../DataSearch/DataSearch';
import Charts from '../../Charts/phoneResultCharts';
export default {

  name: 'speechAnalysis',
  components: {
    DataSearch,
    Charts
  },
  data () {
    return {
      salesmanOptions: [],
      sectionOptions: [],
      isShow: true,
      id: 'speechAnalysis',
      projectType: [],
      sectionValue: '',
      salesmanValue: ''
    };
  },
  created () {
    this.getDate('/api/audior/getAudioCallSales', this.salesmanOptions, this.sectionOptions);
    this.getAllJSONByName(0, '', '', '', '2017-02-23%20-%202017-05-31', this.projectType);
  },
  methods: {
    getDate (url, salesmanOptions, sectionOptions) {
      this.$ajax({
        method: 'get',
        url: url
      }).then(res => {
        if (res.data && res.data.data) {
          const data = res.data.data;
          const section = [];
          for (let v of data) {
            let salesman = {};
            salesman.value = v.num;
            salesman.depart = v.depart;
            salesman.label = v.name;
            section.push(v.depart);
            salesmanOptions.push(salesman);
          }
          const sectionData = Array.from(new Set(section));
          for (let val of sectionData) {
            let sections = {};
            sections.value = val;
            sections.label = val;
            sectionOptions.push(sections);
          }
        }
      });
    },
    childEvent (data) {
      alert(this.projectType);
      console.log(this.projectType);
      console.log(data);
      this.sectionValue = data.sectionValue;
      this.salesmanValue = data.salesmanValue.label;
      const time = `${data.minbatch}%20-%20${data.maxbatch}`;
      this.getAllJSONByName(0, data.phoneInput, data.salesmanValue.value, data.sectionValue, time);
    },
    getAllJSONByName (role, phone, searchValue, depart, dataTime, projectTypes) {
      this.$ajax({
        method: 'get',
        url: `/api/kwords/getAllJSONByName?role=${role}&phone=${phone}&search[value]=${searchValue}&depart=${depart}&data_time=${dataTime}`
      }).then(res => {
        if (res.data && res.data.data) {
          let projectType = {};
          if (res.data.code === 1) {
            projectType = {
              noDataLoadingOption: {
                text: '暂无数据',
                effect: 'bubble',
                effectOption: {
                  effect: {
                    n: 0
                  }
                }
              }
            };
          }
          let data = res.data.data;
          let xAxisData = [];
          let positiveData = [];
          let negativeData = [];
          let neutralData = [];
          for (let v of data) {
            xAxisData.push(v.dimension);
            positiveData.push(v.positive);
            negativeData.push(v.negative);
            neutralData.push(v.neutral);
          }
          const titleText = this.salesmanValue === '' ? (this.sectionValue === '' ? '所有部门' : this.sectionValue) : this.salesmanValue;
          projectType = {
            noDataLoadingOption: {
              text: '暂无数据',
              effect: 'bubble',
              effectOption: {
                effect: {
                  n: 0
                }
              }
            },
            title: {
              text: titleText + '话题热度',
              x: 'center',
              y: 'top'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {
              data: ['正面', '负面', '中性'],
              y: 'bottom'

            },
            toolbox: {
              show: true,
              feature: {
                mark: {
                  show: false
                },
                dataView: {
                  show: true,
                  readOnly: true
                },
                magicType: {
                  show: true,
                  type: ['line', 'bar']
                },
                saveAsImage: {
                  show: true
                }
              }
            },
            grid: {
              left: '3%',
              right: '2%',
              bottom: '12%',
              containLabel: true
            },
            yAxis: [{
              show: true,
              type: 'value',
              splitArea: {
                show: true
              }
            }],
            xAxis: {
              type: 'category',
              data: xAxisData
            },
            series: [{
              name: '正面',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'insideRight'
                }
              },
              barWidth: 40,
              data: positiveData,
              markPoint: {
                data: []
              }
            }, {
              name: '负面',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'insideRight'
                }
              },
              data: negativeData,
              markPoint: {
                data: []
              }
            }, {
              name: '中性',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'insideRight'
                }
              },
              data: neutralData,
              markPoint: {
                data: []
              }
            }]
          };
          projectTypes.push(projectType);
        }
      });
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.isShow
  width: 200px
  height: 200px
  border: 1px solid #d3ddf4
  margin: auto 200px
  p
    line-height: 200px
</style>
