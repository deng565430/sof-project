<template>
<div style="padding-right: 20px">
  <el-table :data="contrastTableData" stripe border align="center" height="450" style="width: 100%;">
    <el-table-column fixed prop="username" label="业务员" align="left" width="150">
    </el-table-column>
    <el-table-column prop="call_time" label="拨打时间" align="left" width="200">
    </el-table-column>
    <el-table-column prop="phone" label="拨打电话" align="left" width="150">
    </el-table-column>
    <el-table-column prop="duration" label="音频时长" align="left" width="130">
    </el-table-column>
    <el-table-column prop="path" label="音频" align="left" width="347">
      <template scope="props">
        <audio height="100" width="50" controls>
          <source :src="path + props.row.path" type="audio/mpeg"/>
        </audio>
      </template>
    </el-table-column>
  </el-table>
  <div class="block">
    <el-pagination
       @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="recordsTotal">
    </el-pagination>
  </div>
</div>
</template>

<script>
import { baseUrl } from '../../../../config/env';
export default {
  data () {
    return {
      currentPage: 1,
      pageSize: 10,
      page: 1,
      path: baseUrl
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
