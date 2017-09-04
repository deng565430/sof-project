<template>
<div>
 	<el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="11">
  </el-pagination>
</div>
</template>

<script>
export default {
  data () {
    return {
      currentPage4: 0
    };
  },
  methods: {
    handleSizeChange (val) {
    },
    handleCurrentChange (val) {
      this.$emit('currentchange', val);
    }
  }
};
</script>

<style lang="css" scoped>
</style>
