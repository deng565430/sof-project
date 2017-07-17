<template>
	<div :tab2="tabs2">
		<el-tabs type="border-card" v-model="activeName" v-if="tabsisshow"  @tab-click="handleClick">
  		  <el-tab-pane :label="i.name" :name="i.code" v-for="i in tabs">
            <el-tabs  v-model="activeName2" v-if="tabsisshow"  @tab-click="handleClick2">
                <el-tab-pane v-for="s in hangye" :label="s.name" :name="s.code" >
                    <Search @search="search" @qingchu="qingchu"></Search>
                    <!-- table -->
                    <TableList  v-loading="loading2" element-loading-text="加载中" :table="table" :zhixingbtns="zhixingbtns" @services-zhixingxiugai="servicesZhixingxiugai"  :zhiixngxiugais="zhiixngxiugais"  @services-zhixing="servicesZhixing"></TableList>
                    <!-- 分页 -->
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="currentPage4"
                      :page-sizes="[10, 20, 50]"
                      :page-size="pageSize"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="total">
                    </el-pagination>
                </el-tab-pane>
            </el-tabs>
  		  </el-tab-pane>
		</el-tabs>
    <!-- 修改需求单 -->
    <!-- <Xiugai v-if="Xiugais" :chakanxiang="chakanxiang" :xiugai="xiugai" @isshow='isshow' @isshow2="isshow2"></Xiugai> -->
    <Xinjian v-if="Xinjian" @back="back" :hanginfo="hanginfo" ></Xinjian>
	</div>
</template>

<script>
import TableList from './../tableList';
import Search from './../xuqiudan/search';
import Xinjian from './xinjian';
/* import Xiugai from './xiugai';
import Search from './search'; */

const tab = [{'name': '所有', 'code': '1'}];
const hangye = [{'name': '所有', 'code': '1'}];
export default {
  props: ['tabs2'],
  components: {
    TableList,
    Search,
    Xinjian
    /* Xiugai,
    Search */
  },
  data () {
    return {
      activeName: '1',
      activeName2: '1',
      tabs: tab,
      table: [],
      currentPage4: 1,
      total: 0,
      pageSize: 10,
      Xiugais: false,
      xiugai: {},
      tabsisshow: true,
      tabName: '',
      loading2: true,
      tabs3: this.tabs2,
      hangye: hangye,
      zhiixngxiugais: this.tabs2,
      zhixingbtns: this.tabs2,
      hanyetab: '',
      Xinjian: false,
      hanginfo: {}
    };
  },
  watch: {
    tabs2 (val) {
      this.tabs3 = val;
      this.activeName = '1';
      this.tabName = 1;
      this.currentPage4 = 1;
      this.pageSize = 10;
      console.log(val);
      this.getNewList(val, '', '0', '10', '', '', '');// 新增xiugai的watch，监听变更并同步到c上
      this.zhiixngxiugais = val;
    }
  },
  created () {
    console.log(this.tabs2);
    this.tabName = 1;
    this.hanyetab = 1;
    // this.getTable(this.tabs3, 0, 10, '', '', ''); // 获取列表
    this.getcelue();// 获取策略类型
    this.getHangyeList();// 获取行业
    this.getNewList(0, '', '0', '10', '', '', ''); // 获取新建  所有
  },
  methods: {
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
      console.log(val);
      this.tabsisshow = false;
      this.Xinjian = true;
      this.$api.post('/api/campaign/getcampaigndata/' + val.single_num + '').then((res) => {
        console.log(res);
      });
    },
    // 查看行
    servicesChakan (val) {
      console.log(val);
      this.tabsisshow = false;
      this.Xiugais = true;
      this.getXgai(val);
    },
    // 删除行
    servicesShanchu (val) {
      // console.log(val);
    },
    // 新建执行单 执行
    servicesZhixing (val) {
      console.log(val);
      this.tabsisshow = false;
      this.Xinjian = true;
      this.hanginfo = val;
    },
    // 确认删除窗
    servicesQurrenshanchu (val) {
      console.log(val);
      var url = '/api/brief/delBrief/' + val;
      this.$api.get(url).then((res) => {
        console.log(res);
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
    },
    // 搜索查询
    search (val, val2) {
      console.log(val, val2);
      this.getNewList(0, this.hanyetab, 0, 10, '', val, val2);
    },
    // 清除查询
    qingchu (val) {
      this.getNewList(0, this.hanyetab, 0, 10, '', val, '');
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
      var url = '/api/brief/getStrategy';
      this.$api.get(url).then((res) => {
        var all = this.tabs.concat(res.data.data);
        this.tabs = all;
      });
    },
    // 获取新建列表
    getNewList (status, industryId, start, pagesize, strategy, kwflag, kw) {
      var url = '/api/campaign/getNewCampaign?status=' + status + '&industryId=' + industryId + '&start=' + start + '&length=' + pagesize + '&strategy=' + strategy + '&kw_flag=' + kwflag + '&kw=' + kw;
      this.$api.get(url).then((res) => {
        if (res.status === 200) {
          if (res.data.code === 1) {
            this.loading2 = false;
            this.$alert('未登录!');
          } else if (res.data.code === 0) {
            this.loading2 = false;
            this.table = res.data.data;
            this.total = res.data.recordsFiltered;
          }
        } else {
          this.loading2 = false;
          this.$alert('获取数据失败!');
        }
      });
    },
    // 获取列表
    getTable (status, start, pagesize, strategy, kwflag, kw) {
      this.loading2 = true;
      var url = '/api/brief/getBriefListByStatus?status=' + status + '&start=' + start + '&length=' + pagesize + '&strategy=' + strategy + '&kw_flag=' + kwflag + '&kw=' + kw;
      this.$api.get(url).then((res) => {
        this.loading2 = false;
        if (res.data.data === '用户未登录!') {
          this.$alert(res.data.data);
        } else if (res.data.code === 0) {
          this.table = res.data.data;
          this.total = res.data.recordsFiltered;
        }
        this.table = res.data.data;
        this.total = res.data.recordsFiltered;
      });
    },
    // 每页条数
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`);
      this.currentPage4 = 1;
      this.pageSize = val;
      console.log(this.tabName, this.hanyetab);
      if (this.tabName === 1 && this.hanyetab === 1) {
        this.getNewList(0, '', '0', val, '', '', '');
      } else if (this.tabName !== 1 && this.hanyetab === 1) {
        this.getNewList(0, '', '0', val, this.tabName, '', '');
      } else if (this.tabName !== 1 && this.hanyetab !== 1) {
        this.getNewList(0, this.hanyetab, '0', val, this.tabName, '', '');
      } else if (this.tabName === 1 && this.hanyetab !== 1) {
        this.getNewList(0, '', '0', val, this.tabName, '', '');
      }
    },
    // 第几页
    handleCurrentChange (val) {
      this.currentPage4 = val;
      this.pageSize = 10;
      if (this.tabName === 1 && this.hanyetab === 1) {
        console.log(1);
        this.getNewList(0, '', val - 1, 10, '', '', '');
      } else if (this.tabName !== 1 && this.hanyetab === 1) {
        console.log(2);
        this.getNewList(0, '', val - 1, 10, this.tabName, '', '');
      } else if (this.tabName !== 1 && this.hanyetab !== 1) {
        console.log(3);
        this.getNewList(0, this.hanyetab, val - 1, 10, this.tabName, '', '');
      } else if (this.tabName === 1 && this.hanyetab !== 1) {
        console.log(4);
        this.getNewList(0, '', val - 1, 10, this.tabName, '', '');
      }
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
    handleClick (tab, event) {
      // console.log(tab, event);
      this.pageSize = 10;
      this.currentPage4 = 1;
      this.tabName = tab.name;
      console.log(this.tabName);
      if (tab.name === '1') {
        this.tabName = '';
        this.getTable(this.tabs3, 0, 10, '', '', '');
      } else {
        this.getTable(this.tabs3, 0, 10, tab.name, '', '');
      };
    },
    // 切换行业列表
    handleClick2 (tab, event) {
      console.log(tab.name);
      this.pageSize = 10;
      this.currentPage4 = 1;
      this.hanyetab = tab.name;
      if (tab.name === '1') {
        this.getNewList(0, '', '0', '10', '', '', '');
      } else {
        this.getNewList(0, tab.name, 0, 10, '', '', '');
      };
    },
    // 返回
    back (val) {
      console.log(val);
      this.Xinjian = false;
      this.tabsisshow = true;
    }
  }
};
</script>

<style>
	
</style>
