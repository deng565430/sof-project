<template>
	<div>
	  <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentpage"
      :page-sizes="[10, 20, 50]"
      :page-size="pagesize"
      :total="tablenum"
      layout="total, sizes, prev, pager, next, jumper"
      >
     </el-pagination> 
	</div>
</template>

<script>
export default {
  props: ['tablenum', 'pagesize', 'currentpage'], // , 'isshanchum', 'chakanm', 'xiugaibtns', 'zhixingbtns', 'zhiixngxiugais',
  data () {
    return {
    };
  },
  watch: {
  },
  created () {
  },
  methods: {
    // 每页条数
    handleSizeChange (val) {
      this.$emit('handleSizeChanges', val);
    },
    // 第几页
    handleCurrentChange (val) {
      this.$emit('handleCurrentChanges', val);
    }
  }
};
</script>

<style>
	.el-table-filter__checkbox-group label.el-checkbox{
    margin-left: 0px;
  }
</style>
