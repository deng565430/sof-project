<template>
<div>
  <div>
    <Search :projectOptions="{projectOptions}" :searchIsShow="{searchIsShow}" @listenToChildEvent="listenToChildEvent"></Search>
  </div>
  <div id="echarts">
    <Charts :id="{id}" :projectType="{projectType}"></Charts>
  </div>
</div>
</template>

<script>
import Search from './../ConditionSearch/search';
import Charts from './Charts/phoneResultCharts';
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
      projectType: [],
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
    this.getTelByPB('上海青浦万达茂', '2017-4-19', '2017-5-19');
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
        url: '/api/rate/getTelByProject',
        data: {
          project: project,
          maxbatch: maxbatch,
          minbatch: minbatch
        }
      }).then((res) => {
        if (res.data && res.data.data.length > 0) {
          this.projectType = res.data.data;
        } else {
          this.$alert('没有展示项目', '提示信息');
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
