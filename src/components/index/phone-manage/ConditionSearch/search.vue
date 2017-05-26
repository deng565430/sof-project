<template>
<div id="selectData">
        <div v-if="searchIsShow.searchIsShow">
        <div class="block">
          <span class="projectName">项目:</span>
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
            <el-date-picker
              v-model="starTimeValue"
              type="daterange"
              placeholder="选择日期范围"
              :picker-options="pickerOptions2">
            </el-date-picker>
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
export default {

  name: ' ',

  data () {
    return {
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      timeValue: '',
      projectOption: this.projectOptions.projectOptions,
      projectValue: '',
      starTimeValue: ''
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
      let minbatch = new Date(this.starTimeValue[0]).toLocaleDateString();
      let maxbatch = new Date(this.starTimeValue[1]).toLocaleDateString();
      if (this.starTimeValue == null || this.starTimeValue === '') {
        this.$alert('请选择时间范围', '提示信息');
        return;
      }
      let data = {};
      data.project = project;
      data.minbatch = minbatch;
      data.maxbatch = maxbatch;
      this.$emit('listenToChildEvent', [data]);
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
  display: flex
  >div
    display: inline-block
    width: 280px
    height:50px
    >div
      .projectName
        display: inline-block
        width:40px
        height:100%
        line-height:40px
        vertical-align: top
  #btn
    padding-bottom: 30px
    text-align: left
    #btnWidth
      vertical-align: top
      width: 120px
</style>
