<template>
<div>
	<div class="seleinput">
		<el-input v-model="input" placeholder="项目名称"></el-input>
		<el-button type="primary">搜索</el-button>
	</div>
  <el-table
      :data="tableData"
      style="width: 100%;" align='center' @click="" >
      <el-table-column
        prop="compant"
        label="公司名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="projiect"
        label="项目名称"
        width="180">
      </el-table-column>
       <el-table-column
        prop="phonenum"
        label="需求量(日)"
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
        <el-button type="text" size="small">修改</el-button>
      </template>
      </el-table-column>
       <el-table-column
        prop="changetime"
        label="修改时间">
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
        compant: '',
        projiect: '',
        phonenum: '',
        starttime: '',
        endtime: '',
        changetime: ''
      }],
      input: '',
      loading: false,
      post: null,
      error: null
    };
  },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData();
  },
  methods: {
    fetchData () {
      this.error = this.post = null;
      this.loading = true;
      // replace getPost with your data fetching util / API wrapper
    }
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
