<template>
<div>
  <div>
    <Search :projectOptions="{projectOptions}" :searchIsShow="{searchIsShow}" @listenToChildEvent="listenToChildEvent"></Search>
  </div>
  <div id="echarts">
    <Charts :id="id" :projectType="projectType"></Charts>
  </div>
</div>
</template>

<script>
import Search from '../../ConditionSearch/search';
import Charts from '../../Charts/charts';
export default {

  name: 'ProjectIntention',
  components: {
    Search,
    Charts
  },
  data () {
    return {
      id: 'projectIntention',
      projectOptions: [],
      SearchData: '',
      projectType: {},
      searchIsShow: true
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
    this.getTelByPB('上海青浦万达茂', '2017-2-19', '2017-5-19');
  },
  methods: {
    getProject (url, list, val) {
      this.$ajax({
        method: 'post',
        url: url,
        data: list
      }).then((res) => {
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
      this.$ajax({
        method: 'post',
        url: '/api/rate/getTelByPB',
        data: {
          project: project,
          maxbatch: maxbatch,
          minbatch: minbatch
        }
      }).then((res) => {
        if (res.data && res.data.data.length > 0) {
          let v = '';
          let xAxisData = [];
          let totalData = [];
          let seriesData = [];
          for (v of res.data.data) {
            xAxisData.push(v.batch);
            totalData.push(v.total);
            seriesData.push(v.intentionrate);
          }
          let titleText = res.data.data[0].project ? res.data.data[0].project : '';
          this.projectType = {
            title: {
              text: titleText
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {
              data: ['意向量', '意向率']
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
              data: xAxisData,
              position: 'bottom'
            },
            yAxis: {
              type: 'value'
            },
            series: [{
              name: '意向量',
              type: 'bar',
              data: totalData
            }, {
              name: '意向率',
              type: 'line',
              data: seriesData
            }]
          };
        } else {
          this.$alert('没有展示项目', '提示信息');
        }
        console.log(this.projectType);
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
