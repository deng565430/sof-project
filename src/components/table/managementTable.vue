<template>
  <div>
    <el-table
      :data="tableData" :stripe="true"
      @current-change="handleCurrentChange"
      style="width: 100%;">
      <el-table-column
        prop="usertag"
        label="用户标识"
        width="180">
      </el-table-column>
      <el-table-column
        prop="pnum"
        label="电话编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话">
      </el-table-column>
       <el-table-column
        prop="shebei"
        label="设备">
      </el-table-column>
      <el-table-column
        prop="result"
        label="评估结果">
      </el-table-column>
    </el-table>
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="1">
    </el-pagination>
    <div>
    {{this.searchValue.start}}
    </div>
  </div>
</template>

<script>
  export default {
    props: ['searchValue'],
    data () {
      return {
        tableData: [{
          usertag: '71f8e7976e4cbc4561c9d62fb283e7f788202acb',
          pnum: '189****1490',
          phone: '18917011490',
          shebei: 'Tapclient',
          result: '最近一周关注 : 区域 : 松江区、虹口区;地铁 : 6号线'
        }],
        searchValueData: this.$store.state.searchValue,
        currentRow: null
      };
    },
    created () {
      // this.getData();
    },
    methods: {
      handleCurrentChange (val) {
        this.currentRow = val;
        console.log(val);
      },
      posttabinfo () {
        // 传数据 this.currentRow 获取后台传来的img图片，做瀑布流展示
      }
    }
  };
</script>

<style lang="css" scoped>
</style>
