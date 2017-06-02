<template>
<div>
  <el-table :data="contrastTableData" border style="width: 100%">
    <el-table-column fixed prop="username" label="业务员" align="left" width="150">
    </el-table-column>
    <el-table-column prop="call_time" label="拨打时间" align="left" width="180">
    </el-table-column>
    <el-table-column prop="phone" label="拨打电话" align="left" width="150">
    </el-table-column>
    <el-table-column prop="duration" label="音频时长" align="left" width="100">
    </el-table-column>
    <el-table-column prop="path" label="音频" align="left" width="400">
      <template scope="props">
        <audio height="100" width="50" controls>
          <source :src="props.row.path" type="audio/mpeg"/>
        </audio>
      </template>
    </el-table-column>
  </el-table>
  <div class="block">
    <el-pagination
       @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="20"
      layout="total, sizes, prev, pager, next, jumper"
      :total="recordsTotal">
    </el-pagination>
  </div>
</div>
</template>

<script>
export default {

  name: 'contrastTable',

  data () {
    return {
      currentPage: 1,
      pageSize: 10,
      page: 1
    };
  },
  methods: {
    handleSizeChange (val) {
      this.pageSize = val;
      this.$emit('childPage', {pageSize: this.pageSize, page: this.page});
    },
    handleCurrentChange (val) {
      this.page = val;
      this.$emit('childPage', {pageSize: this.pageSize, page: this.page});
    }
  },
  props: ['contrastTableData', 'recordsTotal']
};
</script>

<style lang="css" scoped>
</style>
