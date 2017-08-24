<template>
<div style="">
  <el-table
    :data="tableData2"
    style="margin:20px;margin-top:5px"
     :row-click="rowclick">
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="电话">
    </el-table-column>
  </el-table>
</div>
</template>

<script>
export default {
  data () {
    return {
      tableData2: [{
        name: '王小虎',
        phone: '18544574458'
      }]
    };
  },
  methods: {
    rowclick (row) {
      console.log(row);
    }
  }
};
</script>

<style lang="css" scoped>
</style>
