<template>
<div>
	<div class="seleinput">
		<el-input v-model="input" placeholder="项目名称"></el-input>
		<el-button type="primary">搜索</el-button>
	</div>
  <el-table
      :data="tableData"
      style="width: 100%">
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
        label="今日电话">
       <template scope="scope">
        <el-button type="text" size="small">下载电话</el-button>
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
        zhuang: '已更新'
      }, {
        date: '佘山天地',
        starttime: '2017-4-1',
        endtime: '2017-4-30',
        zhuang: '未更新'
      }, {
        date: '金地积木',
        starttime: '2017-4-1',
        endtime: '2017-4-30',
        zhuang: '未更新'
      }, {
        date: '海伦堡ME',
        starttime: '2017-4-1',
        endtime: '2017-4-30',
        zhuang: '未更新'
      }],
      input: ''
    };
  }
};
</script>

<style lang="css" scoped>
.seleinput{
	margin-bottom: 30px
}
.seleinput .el-input{
	width: 200px !important;
}
</style>
