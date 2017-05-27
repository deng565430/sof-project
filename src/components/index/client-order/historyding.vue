<template>
<div>
  <!-- <div class="seleinput">
    <el-select v-model="type" placeholder="项目名称" v-on:change="handleSelect()">
    <el-option
      v-for="item in typeoptions"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    <el-select v-model="projectName" filterable placeholder="项目名称" >
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    <el-button type="primary" @click='search' >搜索</el-button>
  </div> -->
  <div v-if='table'>
  <el-table
      :data="tableData"
      style="width: 100%;" align='center' @click="" >
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
        <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)" >查看</el-button>
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
      :page-sizes="pageSizes"
      :page-size="pageSize"
      :current-page="currentPage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>
    </div>
    <div v-if="Changeorder">
      <Changeorder  :giveid='giveid'   @listinchild='listinchild' @lischeng='lischeng'></Changeorder>
    </div>
</div>
</template>

<script>
import Changeorder from './orders/chakanhistory';
export default {

  name: 'dingyue',
  components: {
    Changeorder
  },
  data () {
    return {
      rowid: '',
      giveid: '',
      tableData: [{
        projiect: '',
        phonenum: '',
        starttime: '',
        endtime: '',
        changetime: '',
        id: ''
      }],
      typeoptions: [{
        value: '1',
        label: '项目名称'
      }, {
        value: '2',
        label: '需求量'
      }, {
        value: '3',
        label: '订阅起始时间'
      }],
      options: [{
        value: '',
        label: ''
      }],
      type: '',
      projectName: '',
      input: '',
      loading: false,
      post: null,
      error: null,
      currentPage: 0,
      pageSizes: [10, 20, 30, 50],
      totalCount: 100,
      pageSize: 10,
      Changeorder: false,
      table: true
    };
  },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.console(0, 10);
  },
  methods: {
    lischeng () {
      this.table = true;
      this.Changeorder = false;
      var data = [];
      var datas = [];
      let _this = this;
      this.$ajax({
        method: 'get',
        url: '/api/brief/getBriefListByStatus?status=2&start=0&length=' + _this.pageSize
      }).then(function (res) {
        if (res.status === 200) {
          for (let i = 0; i < res.data.data.length; i++) {
            var obj = {};
            var objs = {};
            obj.projiect = res.data.data[i].project_name;
            obj.phonenum = res.data.data[i].phone_demand;
            obj.starttime = res.data.data[i].start_date;
            obj.endtime = res.data.data[i].end_date;
            obj.changetime = res.data.data[i].create_time;
            obj.id = res.data.data[i].id;
            data[i] = obj;
            objs.label = res.data.data[i].project_name;
            objs.value = res.data.data[i];
            datas[i] = objs;
          };
          _this.tableData = data;
          _this.options = datas;
          _this.totalCount = res.data.recordsFiltered;
        }
      });
    },
    listinchild () {
      this.table = true;
      this.Changeorder = false;
    },
    console (currentPage, pageSize) {
      var data = [];
      var datas = [];
      let _this = this;
      this.$ajax({
        method: 'get',
        url: '/api/brief/getBriefListByStatus?status=2&start=' + currentPage + '&length=' + pageSize
      }).then(function (res) {
        if (res.status === 200) {
          for (let i = 0; i < res.data.data.length; i++) {
            var obj = {};
            var objs = {};
            obj.projiect = res.data.data[i].project_name;
            obj.phonenum = res.data.data[i].phone_demand;
            obj.starttime = res.data.data[i].start_date;
            obj.endtime = res.data.data[i].end_date;
            obj.changetime = res.data.data[i].create_time;
            obj.id = res.data.data[i].id;
            data[i] = obj;
            objs.label = res.data.data[i].project_name;
            objs.value = res.data.data[i];
            datas[i] = objs;
          };
          _this.tableData = data;
          _this.options = datas;
          _this.totalCount = res.data.recordsFiltered;
        }
      });
    },
    handleSizeChange (val) {
      this.pageSize = val;
      this.console(this.currentPage - 1, val);
    },
    handleCurrentChange (val) {
      this.currentPage = val;
      this.console(val - 1, this.pageSize);
    },
    handleEdit (index, row) {
      this.table = false;
      this.Changeorder = true;
      this.rowid = row.id;
    },
    search () {
      var _this = this;
      var data = [];
      console.log(this.projectName.project_name);
      var flag = this.projectName.project_name;
      this.$ajax({
        method: 'get',
        url: '/api/brief/getBriefListByStatus?status=2&start=0&length=' + _this.pageSize + '&kw_flag=' + 1 + '&kw=' + flag
      }).then(function (res) {
        console.log(res);
        if (res.status === 200) {
          for (let i = 0; i < res.data.data.length; i++) {
            var obj = {};
            obj.compant = res.data.data[i].demand_side;
            obj.projiect = res.data.data[i].project_name;
            obj.phonenum = res.data.data[i].phone_demand;
            obj.starttime = res.data.data[i].start_date;
            obj.endtime = res.data.data[i].end_date;
            obj.changetime = res.data.data[i].create_time;
            obj.dec = res.data.data[i].project_description;
            data[i] = obj;
          };
          _this.tableData = data;
          _this.totalCount = res.data.recordsFiltered;
        }
      });
    },
    handleSelect () {}
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
