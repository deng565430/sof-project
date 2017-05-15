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
        <el-button type="text" size="small" ><router-link to="/client/Changeorder">修改</router-link></el-button>
      </template>
      </el-table-column>
       <el-table-column
        prop="changetime"
        label="修改时间">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      :current-page="currentPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>
</div>
</template>

<script>
export default {

  name: 'dingyue',

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
      error: null,
      currentPage: 1,
      totalCount: 100,
      pageSize: 10
    };
  },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.console();
  },
  methods: {
    console () {
      var data = [];
      let _this = this;
      this.$ajax({
        method: 'get',
        url: '/api/brief/getBriefListByStatus?status=1&start=0&length=' + _this.pageSize
      }).then(function (res) {
        if (res.status === 200) {
          console.log(res.data.data);
          for (let i = 0; i < res.data.data.length; i++) {
            var obj = {};
            obj.compant = res.data.data[i].demand_side;
            obj.projiect = res.data.data[i].project_name;
            obj.phonenum = res.data.data[i].phone_demand;
            obj.starttime = res.data.data[i].start_date;
            obj.endtime = res.data.data[i].end_date;
            obj.changetime = res.data.data[i].create_time;
            data[i] = obj;
          };
          _this.tableData = data;
          _this.totalCount = res.data.recordsFiltered;
        }
      });
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.loadData(this.currentPage, this.pageSize);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.loadData(this.currentPage, this.pageSize);
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
.el-table{
  margin-bottom: 20px;
}
.el-table a{
  display: inline-block;
  color: #2495d4
}
</style>
