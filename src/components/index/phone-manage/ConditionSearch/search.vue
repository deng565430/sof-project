<template>
<div id="selectData">
        <div v-if="searchIsShow.searchIsShow">
        <div class="block">
          <span class="projectName">项目名称:</span>
          <el-select v-model="projectValue" placeholder="请选择名称">
            <el-option
              v-for="item in projectOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </div>
        </div>
        <div>
          <div class="block">
            <span class="demonstration projectName">批次:</span>
            <TimeSelect @dataEvent="dataEvent"/>
          </div>
        </div>
        <div>
          <div id="btn">
            <div class="block">
              <span class="wrapper">
                <el-button type="warning" id="btnWidth" v-on:click="search">搜索</el-button>
            </span>
            </div>
          </div>
        </div>
        
  </div>
</template>

<script>
import TimeSelect from '../../../timeSelect';
export default {

  name: ' ',
  components: {
    TimeSelect
  },
  data () {
    return {
      timeValue: '',
      projectOption: this.projectOptions.projectOptions,
      projectValue: '',
      starTimeValue: '',
      minbatch: '',
      maxbatch: ''
    };
  },
  mounted () {
    this.$nextTick(() => {});
  },
  created () {},
  methods: {
    search () {
      this.recordsFiltered = 0;
      let project = this.projectValue;
      let data = {};
      data.project = project;
      data.minbatch = this.minbatch;
      data.maxbatch = this.maxbatch;
      this.$emit('listenToChildEvent', [data]);
    },
    dataEvent (data) {
      this.maxbatch = data.maxbatch;
      this.minbatch = data.minbatch;
    }
  },
  props: ['searchIsShow', 'projectOptions'],
  ready () {}
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
#selectData
  padding-top: 30px
  padding-bottom: 30px
  width: 1000px
  display: flex
  >div
    display: inline-block
    width: 310px
    height:50px
    >div
      .projectName
        display: inline-block
        width:70px
        height:100%
        line-height:40px
        vertical-align: top
  #btn
    padding-bottom: 30px
    text-align: left
    #btnWidth
      vertical-align: top
      width: 120px
  .block
    display:flex    
</style>
