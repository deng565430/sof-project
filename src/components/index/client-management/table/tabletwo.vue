<template>
<div style="margin:20px">
  <el-table
    :data="table"
    style=""
     @row-click="rowclick">
    <el-table-column
      prop="name"
      label="项目名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="code"
      label="客户量">
    </el-table-column>
  </el-table>
</div>
</template>

<script>
export default {
  props: ['table'],
  data () {
    return {
      currentRow: null
    };
  },
  methods: {
    rowclick (row) {
      this.$emit('zhanshi', row);
    }
  }
};
</script>

<style lang="css" scoped>
</style>
