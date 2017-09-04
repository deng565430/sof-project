<template>
	<div class="allzhixings">
		<el-tabs  v-model="activeName" v-show="tabsisshow"  @tab-click="handleClick" class="tabs" >
  		  <el-tab-pane    :label="i.name" :name="i.code" v-for="(i, idx) in tree" >
            <el-tabs  v-model="activeName2"  @tab-click="handleClick2"  class="tabs2">
                <el-tab-pane   v-for="(s, childIdx) in i.child" :label="s.name" :name="s.code" >
                   <div style="display:flex;margin-top:15px"> <!--  v-for="(n, thredchildIdx) in s.zhuangtai" -->
                     <zSearch @zhuangtai="zhuangtai"></zSearch><!-- :ishistory="ishistory" -->
                     <Search @search="search" @qingchu="qingchu"></Search>
                     </div> 
                     <TableList
                      v-loading="loading2" 

                       :zhixingbtns="s.num" 
                      element-loading-text="加载中，请稍后.." 
                      :table="s.tables"
                      @services-zhixingxiugai="servicesZhixingxiugai"  
                      :zhiixngxiugais="zhiixngxiugais"  
                      @services-zhixing="servicesZhixing" 
                      @services-zhixingchakan="servicesZhixingchakan" >
                      </TableList>
                      <Page
                      v-bind:name="threeIndex" 
                      :currentpage="s.zhuangtai[threeIndex].currentpage"
                       :pagesize="s.zhuangtai[threeIndex].pagelength"
                       :tablenum="s.tablenum"  
                       @handleSizeChanges="handleSizeChange"
                       @handleCurrentChanges="handleCurrentChange" ></Page>
                     <!-- :zhixingbtns="zhixingbtns"  @services-zhixingxiugai="servicesZhixingxiugai"  :zhiixngxiugais="zhiixngxiugais"  @services-zhixing="servicesZhixing" @services-zhixingchakan="servicesZhixingchakan" -->
                      <!-- <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="s.currentpage"
                        :page-sizes="[10, 20, 50]"
                        :page-size="s.pagesize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="s.tablenum">
                       </el-pagination> -->
                </el-tab-pane>
            </el-tabs>
  		  </el-tab-pane>
		</el-tabs>
    <!-- 新建需求单 -->
    <Xinjian class="xinjian"  v-if="Xinjian" @addnewcampaign="addnewcampaign" :hanginfo="hanginfo" :tabtoggle="tabtoggle" @xinajianback="xinajianback"></Xinjian>
    <!-- 修改需求单 -->
    <Xiugai  class="xinjian" v-if="zhixiugai" @back="back" :hanginfo="hanginfo" @xiugaichenggong="xiugaichenggong"  :getxginfo="getxginfo" :tabtoggle="tabtoggle" :ishistory="ishistory"></Xiugai>
	</div>
</template>

<script>
import TableList from './zhixingList';
import Page from './pages';
import Search from './../xuqiudan/zhuangtaisearch';
import zSearch from './search';
import Xinjian from './xinjian';
import Xiugai from './xiugai';

export default {
  components: {
    TableList,
    Search,
    Xinjian,
    Xiugai,
    zSearch,
    Page
  },
  data () {
    return {
      activeName: '1',
      activeNameIndx: '0',
      activeName2: '1',
      activeNameIndx2: '0',
      threeIndex: 0,
      tabs: [],
      table: [],
      tree: [],
      currentPage4: 1,
      total: 0,
      pageSize: 10,
      Xiugais: false,
      xiugai: {},
      tabsisshow: true,
      tabName: '',
      loading2: true,
      tabs3: '',
      addlisn: '',
      hangye: [],
      zhiixngxiugais: this.tabs2,
      zhixingbtns: '0',
      hanyetab: '',
      Xinjian: false,
      zhixiugai: false,
      hanginfo: {},
      getxginfo: {},
      tabtoggle: '',
      options: [{
        value: '0',
        label: '新执行单'
      }, {
        value: '1',
        label: '未执行'
      }, {
        value: '2',
        label: '执行中'
      }, {
        value: '3',
        label: '历史执行单'
      }],
      value: '',
      ishistory: '0'
    };
  },
  created () {
    this.tabs2 = 0;
    this.tabs3 = 0;
    // this.zhixingbtns = this.tabs3;
    this.tabName = 1;
    this.activeName = 'pol01';
    this.activeName2 = 'i01';
    this.value = this.options[0].value;
    this.hanyetab = 1;
    this.getcelue();// 获取策略类型
  },
  methods: {
    zhuangtai (val) {
      this.tree[this.activeNameIndx].child[this.activeNameIndx2].zhuangtai[this.threeIndex].num = val;
      var pages = this.tree[this.activeNameIndx].child[this.activeNameIndx2].zhuangtai[this.threeIndex].pagelength;
      // var starts = this.tree[this.activeNameIndx].child[this.activeNameIndx2].zhuangtai[this.threeIndex].currentpage - 1;
      this.$api.get('/api/campaign/getNewCampaign?status=' + val + '&industryId=' + this.activeName2 + '&start=' + 0 + '&length=' + pages + '&strategy=' + this.activeName + '&kw_flag=' + '' + '&kw=' + '').then((ress) => {
        if (ress.data.code === 1) {
          this.loading2 = false;
          this.$alert('未登录!');
        } else {
          this.loading2 = false;
          const data = ress.data.data;
          this.tree[this.activeNameIndx].child[this.activeNameIndx2].tables = data;
          this.tree[this.activeNameIndx].child[this.activeNameIndx2].num = val;
          this.tree[this.activeNameIndx].child[this.activeNameIndx2].tablenum = ress.data.recordsFiltered;
          this.tree = this.tree.filter((iten) => {
            return iten;
          });
        }
      });
      // this.threeIndex = val;
    },
    // 获取行业
    getHangyeList () {
      var url = '/api/brief/getBriefSelect';
      this.$api.get(url).then((res) => {
        if (res.data.code === 0) {
          var all = this.hangye.concat(res.data.data.industry);
          this.hangye = all;
        }
      });
    },
    servicesZhixingxiugai (val) {
      this.tabsisshow = false;
      this.Xinjian = false;
      this.zhixiugai = true;
      this.hanginfo = val;
      this.$api.post('/api/campaign/getcampaigndata/' + val.single_num + '').then((res) => {
        this.getxginfo = res.data.data;
      });
    },
    // 历史执行单查看
    servicesZhixingchakan (val, val1) {
      this.tabsisshow = false;
      this.zhixiugai = true;
      this.hanginfo = val;
      this.ishistory = val1;
      this.$api.post('/api/campaign/getcampaigndata/' + val.single_num + '').then((res) => {
        this.getxginfo = res.data.data;
        this.histroy = this.tabs2;
      });
    },
    // 查看行
    servicesChakan (val) {
      this.tabsisshow = false;
      this.Xiugais = true;
      this.getXgai(val);
    },
    // 删除行
    servicesShanchu (val) {
    },
    // 新建执行单 执行
    servicesZhixing (val) {
      this.tabsisshow = false;
      this.Xinjian = true;
      this.hanginfo = val;
    },
    // 确认删除窗
    /* servicesQurrenshanchu (val) {
      var url = '/api/brief/delBrief/' + val;
      this.$api.get(url).then((res) => {
        if (res.status === 200) {
          if (res.data.code === 1) {
            this.$alert('未登录!');
          } else if (res.data.code === 0) {
            this.$alert(res.data.msg);
            if (this.tabName === 1) {
              this.getTable(0, this.currentPage4 - 1, this.pageSize, '', '', '');
            } else {
              this.getTable(0, this.currentPage4 - 1, this.pageSize, this.tabName, '', '');
            };
          }
        } else {
          this.$alert('删除失败!');
        }
      });
    }, */
    // 搜索查询
    search (val, val2) {
      this.$api.get('/api/campaign/getNewCampaign?status=' + this.threeIndex + '&industryId=' + this.activeName2 + '&start=' + 0 + '&length=' + 10 + '&strategy=' + this.activeName + '&kw_flag=' + val + '&kw=' + val2).then((ress) => {
        if (ress.data.code === 1) {
          this.loading2 = false;
          this.$alert('未登录!');
        } else {
          this.loading2 = false;
          const data = ress.data.data;
          this.tree[this.activeNameIndx].child[this.activeNameIndx2].tables = data;
          // this.tree[this.activeNameIndx].child[this.activeNameIndx2].zhuangtai[this.threeIndex].currentpage = 0;
          // this.tree[this.activeNameIndx].child[this.activeNameIndx2].num = val;
          this.tree[this.activeNameIndx].child[this.activeNameIndx2].tablenum = ress.data.recordsFiltered;
        }
      });
    },
    // 清除查询
    qingchu (val) {
      this.$api.get('/api/campaign/getNewCampaign?status=' + this.threeIndex + '&industryId=' + this.activeName2 + '&start=' + 0 + '&length=' + 10 + '&strategy=' + this.activeName + '&kw_flag=' + '' + '&kw=' + '').then((ress) => {
        if (ress.data.code === 1) {
          this.loading2 = false;
          this.$alert('未登录!');
        } else {
          this.loading2 = false;
          const data = ress.data.data;
          this.tree[this.activeNameIndx].child[this.activeNameIndx2].tables = data;
          // this.tree[this.activeNameIndx].child[this.activeNameIndx2].num = val;
          this.tree[this.activeNameIndx].child[this.activeNameIndx2].tablenum = ress.data.recordsFiltered;
        }
      });
    },
    // 修改提交
    isshow () {
      this.Xiugais = false;
      this.tabsisshow = true;
    },
    // 修改返回
    isshow2 () {
      this.Xiugais = false;
      this.tabsisshow = true;
    },
    // 获取策略类型
    getcelue () {
      this.$api.get('/api/brief/getBriefSelect').then((res) => {
        if (res.data.data) {
          var trees = [];
          for (var s in res.data.data.strategy) {
            var obj1 = {};
            obj1.code = res.data.data.strategy[s].code;
            obj1.name = res.data.data.strategy[s].name;
            obj1.child = [];
            for (var q in res.data.data.industry) {
              var obj2 = {};
              obj2.code = res.data.data.industry[q].code;
              obj2.name = res.data.data.industry[q].name;
              obj2.zhuangtai = [0, 1, 2, 3];
              obj2.tables = [];
              obj2.num = 0;
              obj1.child[q] = obj2;
              for (var e in obj1.child[q].zhuangtai) {
                var obj3 = {};
                obj3.zT = e;
                // obj3.allpage = 1;
                obj3.currentpage = 1;
                obj3.pagelength = 10;
                obj1.child[q].zhuangtai[e] = obj3;
              }
            }
            trees[s] = obj1;
          }
          this.tree = trees;
          /* var pages = this.tree[this.activeNameIndx].child[this.activeNameIndx2].zhuangtai[this.threeIndex].pagelength;
          var starts = this.tree[this.activeNameIndx].child[this.activeNameIndx2].zhuangtai[this.threeIndex].currentpage; */
          this.$api.get('/api/campaign/getNewCampaign?status=' + this.tabs2 + '&industryId=' + this.activeName2 + '&start=' + 0 + '&length=' + 10 + '&strategy=' + this.activeName + '&kw_flag=' + '' + '&kw=' + '').then((ress) => {
            if (ress.data.code === 1) {
              this.loading2 = false;
              this.$alert('未登录!');
            } else {
              this.loading2 = false;
              const data = ress.data.data;
              this.tree[0].child[0].tables = data;
              this.threeIndex = 0;
              // this.tree[this.activeNameIndx].child[this.activeNameIndx2].num = 0;
              this.tree[this.activeNameIndx].child[this.activeNameIndx2].zhuangtai[this.threeIndex].pagelength = 10;
              // this.tree[0].child[0].zhuangtai[0].currentpage = 0;
              this.tree[this.activeNameIndx].child[this.activeNameIndx2].tablenum = ress.data.recordsFiltered;
            }
          });
        }
      });
    },
    // 获取新建列表
    getNewList (cP, pZ, kf, kw) {
      // status, industryId, start, pagesize, strategy, kwflag, kw
      console.log(22222);
      var statuss = 0;
      var indexstatus = this.tree[this.activeNameIndx].child[this.activeNameIndx2].num;
      if (indexstatus === undefined) {
        statuss = 0;
      } else {
        statuss = indexstatus;
      }
      this.$api.get('/api/campaign/getNewCampaign?status=' + statuss + '&industryId=' + this.activeName2 + '&start=' + cP + '&length=' + pZ + '&strategy=' + this.activeName + '&kw_flag=' + kf + '&kw=' + kw).then((ress) => {
        if (ress.data.code === 1) {
          this.loading2 = false;
          this.$alert('未登录!');
        } else {
          this.loading2 = false;
          const data = ress.data.data;
          this.tree[this.activeNameIndx].child[this.activeNameIndx2].tables = data;
          this.tree[this.activeNameIndx].child[this.activeNameIndx2].num = statuss;
          // this.tree[this.activeNameIndx].child[this.activeNameIndx2].currentpage = cP;
          // this.tree[this.activeNameIndx].child[this.activeNameIndx2].pagesize = pZ;
          this.tree[this.activeNameIndx].child[this.activeNameIndx2].tablenum = ress.data.recordsFiltered;
        }
      });
    },
    // 每页条数
    handleSizeChange (val) {
      this.tree[this.activeNameIndx].child[this.activeNameIndx2].zhuangtai[this.threeIndex].pagelength = val;
      this.getNewList(this.tree[this.activeNameIndx].child[this.activeNameIndx2].zhuangtai[this.threeIndex].currentpage - 1, val, '', '');
    },
    // 第几页
    handleCurrentChange (val) {
      // this.currentPage4 = val;
      console.log('val', val);
      // console.log('状态', this.threeIndex);
      // console.log('状态s', this.tree[this.activeNameIndx].child[this.activeNameIndx2].zhuangtai[this.threeIndex].zT);
      /* if (this.tree[this.activeNameIndx].child[this.activeNameIndx2].zhuangtai[this.threeIndex].currentpage) {
      } */
      this.tree[this.activeNameIndx].child[this.activeNameIndx2].zhuangtai[this.threeIndex].currentpage = val;
      this.getNewList(val - 1, this.tree[this.activeNameIndx].child[this.activeNameIndx2].zhuangtai[this.threeIndex].pagelength, '', '');
    },
    // 获取详情
    getXgai (Id) {
      var url = '/api/brief/getBriefById?id=' + Id;
      this.$api.get(url).then((res) => {
        this.xiugai = res.data.data;
      });
    },
    // 修改详情
    servicesChange (val) {
      this.tabsisshow = false;
      this.Xiugais = true;
      this.getXgai(val);
    },
    // 切换策略列表
    handleClick (val, event) {
      this.activeNameIndx = val.index;
      this.activeName = val.name;
      var statuss = 0;
      var indexstatus = this.tree[this.activeNameIndx].child[this.activeNameIndx2].num;
      if (indexstatus === undefined) {
        statuss = 0;
      } else {
        statuss = indexstatus;
      }
      if (this.tree[val.index].child[this.activeNameIndx2].tables.length > 0) {
        return;
      } else {
        this.$api.get('/api/campaign/getNewCampaign?status=' + statuss + '&industryId=' + this.activeName2 + '&start=' + 0 + '&length=' + 10 + '&strategy=' + this.activeName + '&kw_flag=' + '' + '&kw=' + '').then((ress) => {
          if (ress.data.code === 1) {
            this.loading2 = false;
            this.$alert('未登录!');
          } else {
            this.loading2 = false;
            const data = ress.data.data;
            this.tree[val.index].child[this.activeNameIndx2].tables = data;
            this.tree[this.activeNameIndx].child[this.activeNameIndx2].num = statuss;
            this.tree[this.activeNameIndx].child[this.activeNameIndx2].tablenum = ress.data.recordsFiltered;
          }
        });
      }
    },
    // 切换行业列表
    handleClick2 (val) {
      this.activeNameIndx2 = val.index;
      this.activeName2 = val.name;
      var statuss = 0;
      var indexstatus = this.tree[this.activeNameIndx].child[this.activeNameIndx2].num;
      if (indexstatus === undefined) {
        statuss = 0;
      } else {
        statuss = indexstatus;
      }
      if (this.tree[this.activeNameIndx].child[val.index].tables.length > 0) {
        return;
      } else {
        this.$api.get('/api/campaign/getNewCampaign?status=' + statuss + '&industryId=' + this.activeName2 + '&start=' + 0 + '&length=' + 10 + '&strategy=' + this.activeName + '&kw_flag=' + '' + '&kw=' + '').then((ress) => {
          if (ress.data.code === 1) {
            this.loading2 = false;
            this.$alert('未登录!');
          } else {
            this.loading2 = false;
            const data = ress.data.data;
            this.tree[this.activeNameIndx].child[val.index].tables = data;
            this.tree[this.activeNameIndx].child[this.activeNameIndx2].num = statuss;
            this.tree[this.activeNameIndx].child[this.activeNameIndx2].tablenum = ress.data.recordsFiltered;
          }
        });
      }
    },
    // 返回
    back (val) {
      // this.ishistory = 0;
      this.Xinjian = false;
      this.zhixiugai = false;
      this.tabsisshow = true;
    },
    xinajianback (val) {
      this.Xinjian = false;
      this.zhixiugai = false;
      this.tabsisshow = true;
    },
    addnewcampaign () {
      this.Xinjian = false;
      this.zhixiugai = false;
      this.tabsisshow = true;
      this.getNewList(this.tabs3, this.activeName2, 0, 10, this.activeName, '');
    },
    xiugaichenggong () {
      this.Xinjian = false;
      this.zhixiugai = false;
      this.tabsisshow = true;
      this.getNewList(this.tabs3, this.activeName2, 0, 10, this.activeName, '');
    }
  }
};
</script>

<style lang="css" scoped>
.tabs{
  padding: 0 30px;
  padding-top: 20px
}
.xinjian{
  padding:0 30px;
}
.allzhixings .el-collapse-item__header{
  background-color: #007bf7 !important
}
</style>
