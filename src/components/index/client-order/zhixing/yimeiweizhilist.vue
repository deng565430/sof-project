<template>
	<div id="yimeilist">
		<el-table
            :data="show.show"
            style="width: 100%;" align='center' @click="" >
            <el-table-column
              prop="projiect"
              label="项目名称"
              width="180">
            </el-table-column>
             <el-table-column
              prop="phonenum"
              label="需求量(日)"
              width="180">
            </el-table-column>
            <el-table-column
              prop="starttime"
              label="订阅起始时间"
              width="180">
            </el-table-column>
            <el-table-column
              prop="endtime"
              label="订阅结束时间">
            </el-table-column>
            <el-table-column
              label="操作">
             <template scope="scope">
              <el-button type="text" size="small" @click="handleEdit2(scope.$index, scope.row)" >修改</el-button>
            </template>
            </el-table-column>
             <el-table-column
              label="上传">
             <template scope="scope">
              <el-button type="text" size="small" @click="handleUp(scope.$index, scope.row)" >上传</el-button>
            </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            :current-page="currentPage"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount">
          </el-pagination><!-- 
  <div>
    {{show}}
  </div> -->
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  name: 'fangchanlist',
  data () {
    return {
      tableData: this.show.show,
      currentPage: 1,
      totalCount: 0,
      pageSize: 10,
      shows: false
    };
  },
  created () {
     // 组件创建完后获取数据，
     // 此时 data 已经被 observed 了
    console.log(this.show);
  },
  methods: {
    ...mapMutations([
      'setBrieid' // 映射 this.increment() 为 this.$store.commit('increment')
    ], 10),
    handleEdit2 (index, row) {
      this.$emit('listenToChildEvent', [this.shows, row.id]);
      this.$store.state.brieid = row.id;
      this.$store.state.brieid = row.id;
      this.$store.state.yimeichange.cname = row.id;
      this.$store.state.yimeichange.proname = row.projiect;
      this.$store.state.yimeichange.num = row.phonenum;
      this.$store.state.yimeichange.stratime = row.starttime;
      this.$store.state.yimeichange.endtime = row.endtime;
      console.log(this.$store.state.brieid);
    },
    handleSizeChange (val) {
      this.pageSize = val;
      this.loadData(this.currentPage, this.pageSize);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.loadData(this.currentPage, this.pageSize);
    }
  },
  props: ['show']
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
