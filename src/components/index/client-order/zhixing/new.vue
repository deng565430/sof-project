<template>
<div>
  <div class="title"><span>房地产</span></div>
  <el-table
      :data="tableData"
      style="width: 100%;" align='center' @click="" >
      <el-table-column
        prop="date"
        label="项目名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="starttime"
        label="订阅起始时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="endtime"
        label="订阅结束时间">
      </el-table-column>
      <el-table-column
        label="操作">
       <template scope="scope">
        <el-button type="text" size="small">导入执行单</el-button>
      </template>
      </el-table-column>
       <el-table-column
        label="操作">
       <template scope="scope">
        <el-button type="text" size="small"><router-link to="/client/Addzhi">执行</router-link></el-button>
      </template>
      </el-table-column>
    </el-table>
</div>
</template>

<script>
export default {

  name: 'pnoneManage',

  data () {
    return {
      tableData: [{
        date: '国贸天悦',
        starttime: '2017-4-1',
        endtime: '2017-4-30',
        zhuang: '可下载',
        changetime: '2017-4-5'
      }, {
        date: '佘山天地',
        starttime: '2017-4-1',
        endtime: '2017-4-30',
        zhuang: '未更新',
        changetime: ''
      }, {
        date: '金地积木',
        starttime: '2017-4-1',
        endtime: '2017-4-30',
        zhuang: '未更新',
        changetime: '2017-4-5'
      }, {
        date: '海伦堡ME',
        starttime: '2017-4-1',
        endtime: '2017-4-30',
        zhuang: '未更新',
        changetime: '2017-4-5'
      }],
      input: ''
    };
  }
};
</script>

<style lang="css" scoped>
 .title{
  text-align: left;
  font-size: 20px;
  height: 38px;
  border-bottom: 1px solid #e9e9fa;
  margin-bottom: 20px;
}
.title span{
  display: inline-block;
  height: 38px;
  line-height: 34px;
  border-left: 1px solid #2495d4;
  padding-left: 10px
}
</style>
