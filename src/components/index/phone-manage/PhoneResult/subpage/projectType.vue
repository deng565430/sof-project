<template>
<div>
  <div>
    <Search :projectOptions="{projectOptions}" :searchIsShow="{searchIsShow}" @listenToChildEvent="listenToChildEvent"></Search>
  </div>
  <div id="echarts" v-if="flag">
    <Charts :id="id" :projectType="projectType"></Charts>
  </div>
  <div v-else>
    暂时没有数据
  </div>
</div>
</template>

<script>
import Search from '../../ConditionSearch/search';
import Charts from '../../../../Charts';
export default {

  name: 'ProjectIntention',
  components: {
    Search,
    Charts
  },
  data () {
    return {
      id: 'projectType',
      projectOptions: [],
      SearchData: '',
      projectType: {},
      searchIsShow: true,
      flag: true
    };
  },
  watch: {
    SearchData: {
      handler: function (val, oldValue) {
      },
      deep: true
    }
  },
  mounted () {},
  created () {
    this.getProject('/api/tel/getALLproject', '', this.projectOptions);
    this.getTelByPB('上海青浦万达茂', '2017-4-19', '2017-5-19');
  },
  methods: {
    getProject (url, list, val) {
      this.$api.post(url, list).then((res) => {
        if (res.data && res.data.data && res.data.data.length > 0) {
          let list = res.data.data;
          for (var i = 0; i < list.length; i++) {
            let data = {};
            data.value = list[i];
            data.label = list[i];
            val.push(data);
          }
        }
      });
    },
    getTelByPB (project, minbatch, maxbatch) {
      this.flag = true;
      const postData = {
        project: project,
        maxbatch: maxbatch,
        minbatch: minbatch
      };
      const url = '/api/rate/getTelByProject';
      this.$api.post(url, postData).then((res) => {
        if (res.data && res.data.data.length > 0) {
          let typeData = res.data.data;
          let xAxisData = [];
          let tooltipData = [];
          for (let v of typeData) {
            tooltipData.push(v.source);
            xAxisData.push(v.batch);
          }
          for (let k in typeData) {
            if (typeData[k] === typeData[k + 1]) {
              console.log(typeData[k]);
            }
          }
          tooltipData = Array.from(new Set(tooltipData));
          xAxisData = Array.from(new Set(xAxisData));
          let tooltipDataYiXiang = tooltipData.map((item) => {
            return item + ' 意向量';
          });
          let seriesData = [];
          let seriesDataYiXiang = [];
          // 拆分找到所有需要的数据
          for (let i = 0; i < tooltipData.length; i++) {
            (function (i) {
              let datas = {
                name: tooltipData[i],
                type: 'line',
                data: []
              };
              seriesData.push(datas);
              let datasYiXiang = {
                name: tooltipDataYiXiang[i],
                type: 'bar',
                stack: '意向量',
                barGap: '30%',
                data: []
              };
              seriesDataYiXiang.push(datasYiXiang);
              for (let j = 0; j < typeData.length; j++) {
                (function (j) {
                  if (tooltipData[i] === typeData[j].source) {
                    seriesData[i].data.push(typeData[j].intentionrate);
                    seriesDataYiXiang[i].data.push(typeData[j].intention);
                  }
                })(j);
              }
            })(i);
          }
          // 对两个获取的数据进行合并
          seriesData = seriesDataYiXiang.concat(seriesData);
          tooltipData = tooltipDataYiXiang.concat(tooltipData);
          let titleText = typeData[0].project ? typeData[0].project : '';
          this.projectType = {
            title: {
              text: titleText
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: tooltipData,
              top: '10%'
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              top: '20%',
              containLabel: true
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              data: xAxisData,
              position: 'bottom',
              nameGap: 20
            },
            yAxis: {
              type: 'value'
            },
            series: seriesData
          };
        } else {
          this.flag = false;
        }
      });
    },
    listenToChildEvent (data) {
      if (data[0].project == null || data[0].project === '') {
        this.$alert('请先选择项目', '提示信息');
        return;
      }
      this.SearchData = data;
      let project = data[0].project;
      let maxbatch = data[0].maxbatch;
      let minbatch = data[0].minbatch;
      this.getTelByPB(project, minbatch, maxbatch);
    }
  }
};
</script>

<style lang="css" scoped>
</style>
