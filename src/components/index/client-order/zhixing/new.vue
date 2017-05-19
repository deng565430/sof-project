<template>
<div>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
       <el-tab-pane label="房地产" name="first" id='1'>
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
              <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)" >执行</el-button>
            </template>
            </el-table-column>
             <el-table-column
              label="上传">
             <template scope="scope">
              <el-button type="text" size="small" @click="handleUp(scope.$index, scope.row)" >上传</el-button>
            </template>
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
       </el-tab-pane>
       <el-tab-pane label="医美" name="second" id='2'>
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
              <el-button type="text" size="small" @click="handleEdit2(scope.$index, scope.row)" >执行</el-button>
            </template>
            </el-table-column>
             <el-table-column
              label="上传">
             <template scope="scope">
              <el-button type="text" size="small" @click="handleUp(scope.$index, scope.row)" >上传</el-button>
            </template>
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
        </el-tab-pane>
    </el-tabs>
  </div><!-- 
  <div class="title"><span>房地产</span></div> -->
  
</div>
</template>

<script>
export default {

  name: 'pnoneManage',

  data () {
    return {
      activeName: 'first',
      industryId: '',
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
    handleClick (tab, event) {
      console.log(tab.$el.id);
      this.industryId = tab.$el.id;
      var data = [];
      var datas = [];
      let _this = this;
      this.$ajax({
        method: 'get',
        url: '/api/campaign/getNewCampaign?industryId=' + this.industryId + '&start=0&length=' + _this.pageSize
      }).then(function (res) {
        console.log(res);
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
    loadData (pageNum, pageSize) {
      let _this = this;
      this.$ajax({
        method: 'get',
        url: '/api/campaign/getNewCampaign?start=0&length=' + _this.pageSize
      }).then(function (res) {
        if (res.status === 200) {
          _this.totalCount = res.data.data.length;
        }
      });
    },
    console () {
      var data = [];
      var datas = [];
      let _this = this;
      this.$ajax({
        method: 'get',
        url: '/api/campaign/getNewCampaign?industryId=1&start=0&length=' + _this.pageSize
      }).then(function (res) {
        console.log(res);
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
      this.loadData(this.currentPage, this.pageSize);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.loadData(this.currentPage, this.pageSize);
    },
    handleEdit (index, row) {
      window.location.href = 'http://localhost:8080/#/client/Campaignchange?id= ' + row.id;
    },
    handleEdit2 (index, row) {
      window.location.href = 'http://localhost:8080/#/client/yimeicampaign?id= ' + row.id;
    },
    handleUp (index, row) {
      window.location.href = 'http://localhost:8080/#/client/Campaignchange?id= ' + row.id;
    },
    search () {
      var _this = this;
      var data = [];
      console.log(this.projectName.project_name);
      var flag = this.projectName.project_name;
      this.$ajax({
        method: 'get',
        url: '/api/brief/getBriefListByStatus?status=0&start=0&length=' + _this.pageSize + '&kw_flag=' + 1 + '&kw=' + flag
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
