<template>
	<div >
		<el-tabs type="border-card" v-model="activeName" v-if="tabsisshow"  @tab-click="handleClick">
  		  <el-tab-pane :label="i.name" :name="i.code" v-for="i in tabs">
            <el-tabs  v-model="activeName2" v-if="tabsisshow"  @tab-click="handleClick2">
                <el-tab-pane v-for="s in hangye" :label="s.name" :name="s.code" >
                    <div style="display:flex">

                      <el-select v-model="value" clearable placeholder="请选择" style="width:120px;margin-right:10px" @change='searchChange(value)'>
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                    </el-select>
                      <Search @search="search" @qingchu="qingchu"></Search>
                    </div>
                    <!-- table -->
                    <TableList  v-loading="loading2" element-loading-text="加载中，请稍后.." :table="table" :zhixingbtns="zhixingbtns" @services-zhixingxiugai="servicesZhixingxiugai"  :zhiixngxiugais="zhiixngxiugais"  @services-zhixing="servicesZhixing" @services-zhixingchakan="servicesZhixingchakan"></TableList>
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
    <Xinjian v-if="Xinjian" @addnewcampaign="addnewcampaign" :hanginfo="hanginfo" :tabtoggle="tabtoggle" @xinajianback="xinajianback"></Xinjian>
    <!-- 修改需求单 -->
    <Xiugai v-if="zhixiugai" @back="back" :hanginfo="hanginfo" @xiugaichenggong="xiugaichenggong"  :getxginfo="getxginfo" :tabtoggle="tabtoggle" :ishistory="ishistory"></Xiugai>
	</div>
</template>

<script>
import TableList from './zhixingList';
import Search from './../xuqiudan/zhuangtaisearch';
import Xinjian from './xinjian';
import Xiugai from './xiugai';

export default {
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
      tabs: [],
      table: [],
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
      zhixingbtns: '',
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
      ishistory: 0
    };
  },
  created () {
    this.tabs2 = 0;
    this.tabs3 = 0;
    this.zhixingbtns = this.tabs3;
    this.tabName = 1;
    this.activeName = 'pol01';
    this.activeName2 = 'i01';
    this.value = this.options[0].value;
    this.hanyetab = 1;
    this.getcelue();// 获取策略类型
    this.getHangyeList();// 获取行业
    this.getNewList(this.tabs2, this.activeName2, '0', '10', this.activeName, '', ''); // 获取新建  所有
  },
  methods: {
    searchChange (val) {
      if (val !== '') {
        this.tabs3 = val;
        this.zhixingbtns = this.tabs3;
        this.getNewList(this.tabs3, this.activeName2, 0, 10, this.activeName, '');
        return;
      }
      return;
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
      console.log(val, val1);
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
      // console.log(val);
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
      console.log(val, val2);
      this.getNewList(this.tabs3, this.activeName2, this.currentPage4 - 1, this.pageSize, this.activeName, val, val2);
      // this.getNewList(0, this.hanyetab, 0, 10, '', val, val2);
      /* if (this.tabName === 1 && this.hanyetab === 1) {
        this.getNewList(this.tabs2, '', '0', 10, '', val, val2);
      } else if (this.tabName !== 1 && this.hanyetab === 1) {
        this.getNewList(this.tabs2, '', '0', 10, this.tabName, val, val2);
      } else if (this.tabName !== 1 && this.hanyetab !== 1) {
        this.getNewList(this.tabs2, this.hanyetab, '0', 10, this.tabName, val, val2);
      } else if (this.tabName === 1 && this.hanyetab !== 1) {
        this.getNewList(this.tabs2, '', '0', 10, this.tabName, val, val2);
      } */
    },
    // 清除查询
    qingchu (val) {
      console.log(val);
      this.getNewList(this.tabs3, this.activeName2, this.currentPage4 - 1, this.pageSize, this.activeName, '', '');
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
      this.pageSize = val;
      this.getNewList(this.tabs3, this.activeName2, this.currentPage4 - 1, this.pageSize, this.activeName, '');
    },
    // 第几页
    handleCurrentChange (val) {
      this.currentPage4 = val;
      this.getNewList(this.tabs3, this.activeName2, this.currentPage4 - 1, this.pageSize, this.activeName, '');
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
      this.addlisn = this.addlisn;
      this.pageSize = 10;
      this.currentPage4 = 1;
      this.activeName = tab.name;
      this.getNewList(this.tabs3, this.activeName2, 0, 10, this.activeName, '');
    },
    // 切换行业列表
    handleClick2 (tab, event) {
      this.pageSize = 10;
      this.currentPage4 = 1;
      this.activeName2 = tab.name;
      this.getNewList(this.tabs3, this.activeName2, 0, 10, this.activeName, '');
    },
    // 返回
    back (val) {
      this.ishistory = 0;
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

<style>
	
</style>
