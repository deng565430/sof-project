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
      <template scope="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      show-overflow-tooltip>
    </el-table-column>
  </el-table>
  <div style="margin-top:20px">
  	<el-button @click="add()">添加到Vip</el-button>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      tableData3: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      multipleSelection: []
    };
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    add () {
      this.$emit('adds', this.multipleSelection);
    }
  }
};
</script>

<style lang="css" scoped>
</style>
