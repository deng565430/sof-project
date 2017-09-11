<template>
<div>
 	 <el-table
    ref="multipleTable"
    :data="tableData3"
    border
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="日期"
      width="120">
      <template scope="scope">{{ scope.row.project_name }}</template>
    </el-table-column>
    <el-table-column
      prop="id"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="demand_side"
      label="地址"
      show-overflow-tooltip>
    </el-table-column>
  </el-table>
  <div style="margin-top:20px">
  	<el-button @click="add()">添加到Vip</el-button>
  </div>
  <pages @currentchange="currentchange"></pages>
</div>
</template>

<script>
import pages from './page';
const tabless = [{
  date: '2016-05-03',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1518 弄'
}, {
  date: '2016-05-03',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1518 弄'
}, {
  date: '2016-05-03',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1518 弄'
}, {
  date: '2016-05-03',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1518 弄'
}, {
  date: '2016-05-03',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1518 弄'
}];
export default {
  components: {
    pages
  },
  data () {
    return {
      tableData3: tabless,
      multipleSelection: [],
      pageNum: 0
    };
  },
  created () {
    this.getTables();
  },
  methods: {
    getTables () {
      this.$api.get('/api/campaign/getNewCampaign?status=1&industryId=i01&start=' + 0 + '&length=' + 10 + '&strategy=pol01&kw_flag=' + '' + '&kw=' + '').then((ress) => {
        this.tableData3 = ress.data.data;
      });
    },
    handleSelectionChange (val) {
      this.multipleSelection[this.pageNum] = val;
    },
    add () {
      this.$emit('adds', this.multipleSelection);
    },
    currentchange (val) {
      this.pageNum = val;
      if (this.multipleSelection[this.pageNum] === undefined) {
        this.$api.get('/api/campaign/getNewCampaign?status=1&industryId=i01&start=' + this.pageNum + '&length=' + 10 + '&strategy=pol01&kw_flag=' + '' + '&kw=' + '').then((ress) => {
          this.tableData3 = ress.data.data;
        });
      } else {
        this.$api.get('/api/campaign/getNewCampaign?status=1&industryId=i01&start=' + this.pageNum + '&length=' + 10 + '&strategy=pol01&kw_flag=' + '' + '&kw=' + '').then((ress) => {
          this.tableData3 = ress.data.data;
        });
      }
    }
  }
};
</script>

<style lang="css" scoped>
</style>
