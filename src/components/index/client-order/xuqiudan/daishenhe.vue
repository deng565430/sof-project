<template>
	<div :tab2="tabs2" >
		<el-tabs  class="xuqiudan"  v-model="activeName" v-if="tabsisshow"  @tab-click="handleClick" style="margin-top:28px">
		  <el-tab-pane :label="i.name" :name="i.code" v-for="i in tabs">
        <div style="display:flex;margin-top:15px">
          <Search @zhuangtai="zhuangtai" :ishistory="ishistory"></Search>
          <SearchTwo @search="search" @qingchu="qingchu"></SearchTwo>
        </div>
        <!-- table -->
		  	<TableList v-loading="loading2" element-loading-text="加载中" :table="table" :ishistory="ishistory"  @services-change="servicesChange" @services-chakan="servicesChakan"></TableList>
        
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
    <!-- 修改需求单 -->
    <Xiugai v-if="Xiugais" :chakanxiang="chakanxiang" :xiugai="xiugai" @isshow='isshow' @isshow2="isshow2" :ishistory="ishistory"></Xiugai>
	</div>
</template>

<script>
import TableList from './../tableList';
import Xiugai from './xiugai';
import Search from './search';
import SearchTwo from './zhuangtaisearch';

export default {
  components: {
    TableList,
    Xiugai,
    Search,
    SearchTwo
  },
  data () {
    return {
      activeName: 'pol01',
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
      tabs2: 0,
      tabs3: this.tabs2,
      isshanchum: this.tabs2,
      chakanm: this.tabs2,
      xiugaibtns: this.tabs2,
      shanchuque: true,
      shanchusuccess: '',
      chakanxiang: this.tabs2,
      ishistory: '0'
    };
  },
  watch: {
    tabs2 (val) {
      this.tabs3 = val;
      this.isshanchum = this.tabs3;
      this.chakanm = this.tabs3;
      this.xiugaibtns = this.tabs3;
      this.chakanxiang = this.tabs3;
      this.activeName = '1';
      this.currentPage4 = 1;
      this.pageSize = 10;
      this.getTable(this.tabs3, 0, 10, this.tabName, '', '');// 新增xiugai的watch，监听变更并同步到c上
    }
  },
  created () {
    if (this.$route.params.num !== undefined) {
      this.tabName = 'pol01';
      this.tabs3 = this.$route.params.num;
      this.ishistory = this.$route.params.num;
      this.getTable(this.ishistory, 0, 10, this.tabName, '', '');
    } else {
      this.tabName = 'pol01';
      this.tabs3 = 0;
      this.getTable(this.tabs2, 0, 10, this.tabName, '', ''); // 获取列表
    }
    this.getcelue();// 获取策略类型
  },
  methods: {
    zhuangtai (val) {
      if (val !== '') {
        this.tabs3 = val;
        this.ishistory = val;
        this.getTable(val, 0, 10, this.tabName, '', ''); // 获取列表
      }
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
    // 确认删除窗
    servicesQurrenshanchu (val) {
      var url = '/api/brief/delBrief/' + val;
      this.$api.get(url).then((res) => {
        if (res.status === 200) {
          if (res.data.code === 1) {
            this.$alert('未登录!');
          } else if (res.data.code === 0) {
            this.$alert(res.data.msg);
            this.getTable(0, this.currentPage4 - 1, this.pageSize, '', '', '');
          }
        } else {
          this.$alert('删除失败!');
        }
      });
    },
    // 搜索查询
    search (val, val2) {
      this.getTable(this.tabs3, this.currentPage4 - 1, this.pageSize, this.tabName, val, val2);
    },
    // 清除查询
    qingchu () {
      this.getTable(this.tabs3, this.currentPage4 - 1, this.pageSize, this.tabName, '', '');
    },
    // 修改提交
    isshow () {
      this.Xiugais = false;
      this.tabsisshow = true;
      this.getTable(this.tabs3, 0, 10, '', '', '');
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
        // var all = this.tabs.concat(res.data.data);
        this.tabs = res.data.data;
      });
    },
    // 获取列表
    getTable (status, start, pagesize, strategy, kwflag, kw) {
      this.loading2 = true;
      var url = '/api/brief/getBriefListByStatus?status=' + status + '&start=' + start + '&length=' + pagesize + '&strategy=' + strategy + '&kw_flag=' + kwflag + '&kw=' + kw;
      this.$api.get(url)
      .then((res) => {
        this.loading2 = false;
        if (res.data.data === '用户未登录!') {
          this.$alert(res.data.data);
        } else if (res.data.code === 0) {
          this.table = res.data.data;
          this.total = res.data.recordsFiltered;
        }
        this.table = res.data.data;
        this.total = res.data.recordsFiltered;
      })
      .catch(() => {
        this.loading2 = false;
        this.$alert('服务出错!');
      });
    },
    // 每页条数
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`);
      this.currentPage4 = 1;
      this.pageSize = val;
      this.getTable(this.tabs3, 0, val, this.tabName, '', '');
    },
    // 第几页
    handleCurrentChange (val) {
      this.currentPage4 = val;
      this.getTable(this.tabs3, val - 1, 10, this.tabName, '', '');
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
    // 切换列表
    handleClick (tab, event) {
      this.pageSize = 10;
      this.currentPage4 = 1;
      this.tabName = tab.name;
      this.getTable(this.tabs3, 0, 10, tab.name, '', '');
    }
  }
};
</script>

<style lang="css" scoped>
.xuqiudan{
  background: #fff;
  padding:0 30px;
}
</style>
