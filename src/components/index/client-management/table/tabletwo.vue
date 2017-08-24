<template>
<div style="margin:20px">
  <el-table
    :data="tableData2"
    style=""
     @row-click="rowclick">
    <el-table-column
      prop="name"
      label="项目名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="num"
      label="客户量">
    </el-table-column>
  </el-table>
</div>
</template>

<script>
export default {
  data () {
    return {
      tableData2: [{
        name: '国贸天悦',
        num: '300'
      }, {
        name: '国贸天悦',
        num: '100'
      }],
      currentRow: null
    };
  },
  methods: {
    rowclick (row) {
      console.log(row);
      this.$emit('zhanshi', row);
    }
  }
};
</script>

<style lang="css" scoped>
</style>
