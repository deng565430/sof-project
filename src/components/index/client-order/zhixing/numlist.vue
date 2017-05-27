<template>
<div>
  <div  >
        <el-table
            :data="tableData"
            style="width: 100%;max-height:200px" align='center' @click="" >
            <el-table-column
              prop="d"
              label="1"
              width="180">
            </el-table-column>
            <el-table-column
              prop="m"
              label="2"
              width="180">
            </el-table-column>
             <el-table-column
              prop="c"
              label="3"
              width="180">
            </el-table-column>
      </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            :current-page="currentPage"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount">
          </el-pagination>
       </el-tab-pane>
      
  </div>
  
</div>
</template>

<script>
export default {
  name: 'pnoneManage',
  data () {
    return {
      tableData: this.numlist,
      pageSizes: [10, 20],
      pageSize: 10,
      currentPage: 0,
      totalCount: 100
    };
  },
  created () {
    console.log(this.numlist);
  },
  methods: {
  },
  props: ['numlist']
};
</script>

<style lang="css" scoped>
 .title{
  text-align: left;
  font-size: 20px;
  height: 38px;
  border-bottom: 1px solid #e9e9fa;
  margin-bottom: 20px;
}
.title span{
  display: inline-block;
  height: 38px;
  line-height: 34px;
  border-left: 1px solid #2495d4;
  padding-left: 10px
}
</style>
