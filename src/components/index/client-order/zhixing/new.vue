<template>
<div>
  <div v-if='show3'  >
    <el-tabs v-model="activeName" @tab-click="handleClick">
       <el-tab-pane label="房产" name="first" id='1'>
        <el-table
            :data="tableData"
            style="width: 100%;" align='center' @click="" >
            <el-table-column
              prop="cname"
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
              <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)" >执行</el-button>
            </template>
            </el-table-column><!-- 
             <el-table-column
              label="上传">
             <template scope="scope">
              <el-button type="text" size="small" @click="handleUp(scope.$index, scope.row)" >上传</el-button>
            </template>
            </el-table-column> -->
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
       <el-tab-pane label="医美" name="second" id='2' >
           <Yimeilist :show='{show}' v-show='show4' :again='{again}'  @listenToChildEvent="listenToChildEvent"></Yimeilist>
      </el-tab-pane>
    </el-tabs>
  </div>
  <div v-if="Yimeicampaign">
     <Yimeicampaign  v-if='yimei' :showxiangqing='showxiangqing' @childrenEventIsShow="childrenEventIsShow" @childrenEventIsShow2="childrenEventIsShow2"></Yimeicampaign>
     <Zhichange v-if='zhi' :zhidan="zhidan" @linstizhi="linstizhi" @listizhi2='listizhi2'></Zhichange>
  </div>
</div>
</template>

<script>
import Yimeilist from './yimeilist';
import Yimeicampaign from './yimeicampaign';
import Zhichange from './zhichange';
export default {
  name: 'pnoneManage',
  components: {
    Yimeilist,
    Yimeicampaign,
    Zhichange
  },
  data () {
    return {
      activeName: 'first',
      industryId: '',
      tableData: [{
        cname: '',
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
      pageSize: 10,
      show: [],
      again: [],
      show2: false,
      show4: true,
      show3: true,
      showxiangqing: true,
      Yimeicampaign: false,
      yimei: false,
      zhi: false,
      rowid: '',
      totlanum: ''
    };
  },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.console();
    console.log(this.show);
    this.lists(2, '/api/campaign/getNewCampaign?start=0&length=10&industryId=2');
  },
  methods: {
    lists (id, url) {
      this.show = [];
      let _this = this;
      this.$ajax({
        method: 'get',
        url: url
      }).then(function (res) {
        if (res.status === 200 && res.data.recordsFiltered > 0) {
          console.log(res.data.data);
          for (let i = 0; i < res.data.data.length; i++) {
            var obj = {};
            obj.cname = res.data.data[i].demand_side;
            obj.projiect = res.data.data[i].project_name;
            obj.phonenum = res.data.data[i].phone_demand;
            obj.starttime = res.data.data[i].start_date;
            obj.endtime = res.data.data[i].end_date;
            obj.changetime = res.data.data[i].create_time;
            obj.id = res.data.data[i].id;
            obj.recordsFiltered = res.data.recordsFiltered;
            _this.show[i] = obj;
            _this.totlanum = res.data.recordsFiltered;
            _this.$store.state.yimei.totalcont = res.data.recordsFiltered;
          };
          console.log(_this.show);
        }
      });
    },
    listizhi2 () {
      this.Yimeicampaign = false;
      this.zhi = false;
      this.show3 = true;
    },
    linstizhi () {
      this.Yimeicampaign = false;
      this.show3 = true;
      this.console();
    },
    listenToChildEvent (val) {
      this.Yimeicampaign = true;
      this.yimei = true;
      this.show3 = false;
    },
    childrenEventIsShow2 (val) {
      this.Yimeicampaign = false;
      this.activeName = 'second';
      this.show3 = true;
    },
    childrenEventIsShow (val) {
      this.show = [];
      let _this = this;
      this.$ajax({
        method: 'get',
        url: '/api/campaign/getNewCampaign?start=0&length=10&industryId=2'
      }).then(function (res) {
        if (res.status === 200 && res.data.recordsFiltered > 0) {
          console.log(res.data.data);
          for (let i = 0; i < res.data.data.length; i++) {
            var obj = {};
            obj.cname = res.data.data[i].demand_side;
            obj.projiect = res.data.data[i].project_name;
            obj.phonenum = res.data.data[i].phone_demand;
            obj.starttime = res.data.data[i].start_date;
            obj.endtime = res.data.data[i].end_date;
            obj.changetime = res.data.data[i].create_time;
            obj.id = res.data.data[i].id;
            obj.recordsFiltered = res.data.recordsFiltered;
            _this.show[i] = obj;
            _this.totlanum = res.data.recordsFiltered;
          };
          console.log(_this.show);
        }
      });
      this.Yimeicampaign = false;
      this.activeName = 'second';
      this.show3 = true;
    },
    handleClick (tab, event) {
      this.industryId = tab.$el.id;
      var data = [];
      var datas = [];
      let _this = this;
      this.$ajax({
        method: 'get',
        url: '/api/campaign/getNewCampaign?industryId=' + this.industryId + '&start=0&length=' + _this.pageSize
      }).then(function (res) {
        if (res.status === 200) {
          for (let i = 0; i < res.data.data.length; i++) {
            var obj = {};
            var objs = {};
            obj.cname = res.data.data[i].demand_side;
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
        if (res.status === 200) {
          console.log(res);
          for (let i = 0; i < res.data.data.length; i++) {
            var obj = {};
            var objs = {};
            obj.cname = res.data.data[i].demand_side;
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
      this.show3 = false;
      this.Yimeicampaign = true;
      this.zhi = true;
      this.rowid = row.id;
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
