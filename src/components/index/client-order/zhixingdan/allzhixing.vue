<template>
	<div :tab2="tabs2">
		<el-tabs type="border-card" v-model="activeName" v-if="tabsisshow"  @tab-click="handleClick">
  		  <el-tab-pane :label="i.name" :name="i.code" v-for="i in tabs">
            <el-tabs  v-model="activeName2" v-if="tabsisshow"  @tab-click="handleClick2">
                <el-tab-pane v-for="s in hangye" :label="s.name" :name="s.code" >
                    <Search @search="search" @qingchu="qingchu"></Search>
                    <!-- table -->
                    <TableList  v-loading="loading2" element-loading-text="加载中" :table="table" :zhixingbtns="zhixingbtns" @services-zhixingxiugai="servicesZhixingxiugai"  :zhiixngxiugais="zhiixngxiugais"  @services-zhixing="servicesZhixing" @services-zhixingchakan="servicesZhixingchakan"></TableList>
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
    <!-- 新建需求单 -->
    <Xinjian v-if="Xinjian" @back="back" :hanginfo="hanginfo" :tabtoggle="tabtoggle"></Xinjian>
    <!-- 修改需求单 -->
    <Xiugai v-if="zhixiugai" @back="back" :hanginfo="hanginfo" :histroy="histroy" :getxginfo="getxginfo" :tabtoggle="tabtoggle"></Xiugai>
	</div>
</template>

<script>
import TableList from './../tableList';
import Search from './../xuqiudan/search';
import Xinjian from './xinjian';
import Xiugai from './xiugai';
// import { line } from 'assets/js/charts';

const tab = [{'name': '所有', 'code': '1'}];
const hangye = [{'name': '所有', 'code': '1'}];
export default {
  props: ['tabs2'],
  components: {
    TableList,
    Search,
    Xinjian,
    Xiugai
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
      zhixiugai: false,
      hanginfo: {},
      getxginfo: {},
      tabtoggle: ''
    };
  },
  watch: {
    tabs2 (val) {
      this.tabs3 = val;
      this.tabtoggle = val;
      this.activeName = '1';
      this.tabName = 1;
      this.currentPage4 = 1;
      this.pageSize = 10;
      this.getNewList(val, '', '0', '10', '', '', '');// 新增xiugai的watch，监听变更并同步到c上
      this.zhiixngxiugais = val;
      this.Xinjian = false;
      this.zhixiugai = false;
      this.tabsisshow = true;
    },
    tabs (val) {
      console.log(val);
    }
  },
  created () {
    console.log(this.tabs2);
    this.tabName = 1;
    this.hanyetab = 1;
    this.getcelue();// 获取策略类型
    this.getHangyeList();// 获取行业
    this.getNewList(this.tabs2, '', '0', '10', '', '', ''); // 获取新建  所有
    this.getgl();
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
      this.zhixiugai = true;
      this.hanginfo = val;
      this.$api.post('/api/campaign/getcampaigndata/' + val.single_num + '').then((res) => {
        console.log(res);
        this.getxginfo = res.data.data;
      });
    },
    // 历史执行单查看
    servicesZhixingchakan (val) {
      console.log(val);
      this.tabsisshow = false;
      this.zhixiugai = true;
      this.hanginfo = val;
      this.$api.post('/api/campaign/getcampaigndata/' + val.single_num + '').then((res) => {
        console.log(res);
        this.getxginfo = res.data.data;
        this.histroy = this.tabs2;
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
      // this.getNewList(0, this.hanyetab, 0, 10, '', val, val2);
      if (this.tabName === 1 && this.hanyetab === 1) {
        this.getNewList(this.tabs2, '', '0', 10, '', val, val2);
      } else if (this.tabName !== 1 && this.hanyetab === 1) {
        this.getNewList(this.tabs2, '', '0', 10, this.tabName, val, val2);
      } else if (this.tabName !== 1 && this.hanyetab !== 1) {
        this.getNewList(this.tabs2, this.hanyetab, '0', 10, this.tabName, val, val2);
      } else if (this.tabName === 1 && this.hanyetab !== 1) {
        this.getNewList(this.tabs2, '', '0', 10, this.tabName, val, val2);
      }
    },
    // 清除查询
    qingchu (val) {
      if (this.tabName === 1 && this.hanyetab === 1) {
        this.getNewList(this.tabs2, '', '0', 10, '', val, '');
      } else if (this.tabName !== 1 && this.hanyetab === 1) {
        this.getNewList(this.tabs2, '', '0', 10, this.tabName, val, '');
      } else if (this.tabName !== 1 && this.hanyetab !== 1) {
        this.getNewList(this.tabs2, this.hanyetab, '0', 10, this.tabName, val, '');
      } else if (this.tabName === 1 && this.hanyetab !== 1) {
        this.getNewList(this.tabs2, '', '0', 10, this.tabName, val, '');
      }
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
    // 每页条数
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`);
      this.currentPage4 = 1;
      this.pageSize = val;
      console.log(this.tabName, this.hanyetab);
      if (this.tabName === 1 && this.hanyetab === 1) {
        this.getNewList(this.tabs2, '', '0', val, '', '', '');
      } else if (this.tabName !== 1 && this.hanyetab === 1) {
        this.getNewList(this.tabs2, '', '0', val, this.tabName, '', '');
      } else if (this.tabName !== 1 && this.hanyetab !== 1) {
        this.getNewList(this.tabs2, this.hanyetab, '0', val, this.tabName, '', '');
      } else if (this.tabName === 1 && this.hanyetab !== 1) {
        this.getNewList(this.tabs2, '', '0', val, this.tabName, '', '');
      }
    },
    // 第几页
    handleCurrentChange (val) {
      this.currentPage4 = val;
      this.pageSize = 10;
      if (this.tabName === 1 && this.hanyetab === 1) {
        console.log(1);
        this.getNewList(this.tabs2, '', val - 1, 10, '', '', '');
      } else if (this.tabName !== 1 && this.hanyetab === 1) {
        console.log(2);
        this.getNewList(this.tabs2, '', val - 1, 10, this.tabName, '', '');
      } else if (this.tabName !== 1 && this.hanyetab !== 1) {
        console.log(3);
        this.getNewList(this.tabs2, this.hanyetab, val - 1, 10, this.tabName, '', '');
      } else if (this.tabName === 1 && this.hanyetab !== 1) {
        console.log(4);
        this.getNewList(this.tabs2, '', val - 1, 10, this.tabName, '', '');
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
      console.log(typeof this.hanyetab);
      if (tab.name === 1 || tab.name === '1') {
        this.tabName = '';
        if (this.hanyetab === '1' || this.hanyetab === 1) {
          this.getNewList(this.tabs3, '', 0, 10, this.tabName, '');
        } else {
          this.getNewList(this.tabs3, this.hanyetab, 0, 10, this.tabName, '');
        }
      } else {
        if (this.hanyetab === '1' || this.hanyetab === 1) {
          this.getNewList(this.tabs3, '', 0, 10, tab.name, '');
        } else {
          this.getNewList(this.tabs3, this.hanyetab, 0, 10, tab.name, '');
        }
      };
    },
    // 切换行业列表
    handleClick2 (tab, event) {
      console.log(tab.name);
      this.pageSize = 10;
      this.currentPage4 = 1;
      this.hanyetab = tab.name;
      console.log(typeof this.hanyetab);
      if (this.tabName === 1 || this.tabName === '1') {
        if (this.hanyetab === '1' || this.hanyetab === 1) {
          this.getNewList(this.tabs3, '', 0, 10, '', '');
        } else {
          this.getNewList(this.tabs3, this.hanyetab, 0, 10, '', '');
        }
      } else {
        console.log(this.hanyetab);
        if (this.hanyetab === '1' || this.hanyetab === 1) {
          this.getNewList(this.tabs3, '', 0, 10, this.tabName, '');
        } else {
          this.getNewList(this.tabs3, this.hanyetab, 0, 10, this.tabName, '');
        }
      };
    },
    // 返回
    back (val) {
      console.log(val);
      this.Xinjian = false;
      this.zhixiugai = false;
      this.tabsisshow = true;
    }
  }
};
</script>

<style>
	
</style>
