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
      id: 'typeIntention',
      projectOptions: [],
      SearchData: '',
      projectType: {},
      searchIsShow: false
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
    this.getTelByPB('2017-5-12', '2017-5-19');
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
    getTelByPB (minbatch, maxbatch) {
      this.$ajax({
        method: 'post',
        url: '/api/rate/getTelByTime',
        data: {
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
      this.SearchData = data;
      let maxbatch = data[0].maxbatch;
      let minbatch = data[0].minbatch;
      this.getTelByPB(minbatch, maxbatch);
    }
  }
};
</script>

<style lang="css" scoped>
</style>
