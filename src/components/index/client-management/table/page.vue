<template>
	<div class="pages">
	 <el-pagination
         @size-change="handleSizeChange"
         @current-change="handleCurrentChange"
         :current-page.sync="currentPage"
         :page-size="100"
         layout="total, prev, pager, next"
         :total="pagenum"
         >
        </el-pagination> 
	</div>
</template>

<script>
export default {
  props: ['pagenum', 'pagesize', 'start'],
  data () {
    return {
      currentPage: 1
    };
  },
  created () {
  },
  watch: {
    'currentPage' (val) {
    }
  },
  methods: {
    // 每页条数
    handleSizeChange (val) {
      this.currentPage = 1;
      this.$emit('handleSizeChanges', val);
    },
    // 第几页
    handleCurrentChange (val) {
      this.currentPage = val;
      this.$emit('handleCurrentChanges', val - 1);
    }
  }
};
</script>

<style>
.pages{
  margin-bottom: 20px
}
</style>
