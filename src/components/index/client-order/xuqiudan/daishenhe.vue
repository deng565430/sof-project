<template>
	<div>
		<el-tabs  v-model="activeName" v-if="tabsisshow"  @tab-click="handleClick"><!-- type="border-card" -->
		  <el-tab-pane :label="i.name" :name="i.code" v-for="i in tabs">
        <!-- table -->
		  	<TableList :table="table"  @services-change="servicesChange"></TableList>
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
    <Xiugai v-if="Xiugais" :xiugai="xiugai"></Xiugai>
	</div>
</template>

<script>
import TableList from './../tableList';
import Xiugai from './xiugai';

const tab = [{'name': '所有', 'code': '1'}];
export default {
  components: {
    TableList,
    Xiugai
  },
  data () {
    return {
      activeName: '1',
      tabs: tab,
      table: [],
      currentPage4: 1,
      total: 15,
      pageSize: 10,
      Xiugais: false,
      xiugai: {},
      tabsisshow: true,
      tabName: ''
    };
  },
  created () {
    this.getTable(0, 10, '');
    this.getcelue();// 获取策略类型
  },
  methods: {
    // 获取策略类型
    getcelue () {
      var url = '/api/brief/getStrategy';
      this.$api.get(url).then((res) => {
        var all = this.tabs.concat(res.data.data);
        this.tabs = all;
      });
    },
    // 获取列表
    getTable (start, pagesize, strategy) {
      var url = '/api/brief/getBriefListByStatus?status=0' + '&start=' + start + '&length=' + pagesize + '&strategy=' + strategy;
      this.$api.get(url).then((res) => {
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
      this.pageSize = val;
      if (this.tabName === '1') {
        this.getTable(0, val, '');
      } else {
        this.getTable(0, val, this.tabName);
      };
    },
    // 第几页
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`);
      // this.getTable(0, val);
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
      // console.log(tab, event);
      this.pageSize = 10;
      this.tabName = tab.name;
      if (tab.name === '1') {
        this.getTable(0, 10, '');
      } else {
        this.getTable(0, 10, tab.name);
      };
    }
  }
};
</script>

<style>
	
</style>
