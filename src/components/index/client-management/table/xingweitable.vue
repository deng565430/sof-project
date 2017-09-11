<template>
<div style="margin:20px">
  <el-table
    max-height="300"
    :data="table"
    style="">
    <el-table-column
      prop="value"
      label="客户">
    </el-table-column>
    <el-table-column
      prop="type"
      label="类型">
    </el-table-column>
    <el-table-column
      prop="cycle"
      label="状态">
    </el-table-column>
    <el-table-column
      prop="often"
      label="行为">
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
  }
};
</script>

<style lang="css" scoped>
</style>
