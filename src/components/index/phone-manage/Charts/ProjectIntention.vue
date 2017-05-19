<template>
<div>
  <div  style="text-align: left">
     <div class="block">
        <div class="block">
            <span class="demonstration">选择批次：</span>
            <el-date-picker v-model="value7" type="daterange" align="left" placeholder="选择日期范围" :picker-options="pickerOptions2">
            </el-date-picker>
        </div>
        <div id="btn">
          <div class="block">
            <span class="wrapper">
            <el-button type="warning" id="btnWidth" @click="search">搜索</el-button>
            </span>
          </div>
        </div>          
      </div>
  </div>  
  <div id="echarts">
    <Charts :data="{data}"></Charts>
  </div>
</div>
</template>

<script>
import Charts from './Charts/phoneResultCharts';
export default {

  name: 'ProjectIntention',
  components: {
    Charts
  },
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
      timeValue: ''
    };
  }
};
</script>

<style lang="css" scoped>
</style>
