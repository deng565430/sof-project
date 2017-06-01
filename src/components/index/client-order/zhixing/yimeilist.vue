<template>
	<div id="yimeilist">
		<el-table
            :data="show.show"
            style="width: 100%;" align='center' @click="" >
            <el-table-column
              prop="cname"
              label="公司名称"
              width="180">
            </el-table-column>
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
              <el-button type="text" size="small" @click="handleEdit2(scope.$index, scope.row)" >执行</el-button>
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
            :page-sizes="pageSizes"
            :page-size="pageSize"
            :current-page="currentPage"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount">
          </el-pagination>
  <!-- <div>
    {{show.show[0].recordsFiltered}}
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
      currentPage: 0,
      pageSizes: [10, 20, 30, 50],
      totalCount: 100,
      pageSize: 10,
      shows: false,
      numdatas: [],
      numdatas2: [],
      tieba: [],
      web: []
    };
  },
  created () {
     // 组件创建完后获取数据，
     // 此时 data 已经被 observed 了
    console.log(this.$store.state.yimei.totalcont);
    this.tableData = this.show.show;
    this.totalCount = this.$store.state.yimei.totalcont;
  },
  methods: {
    ...mapMutations([
      'setBrieid' // 映射 this.increment() 为 this.$store.commit('increment')
    ], 10),
    numtype () {
      var _this = this;
      this.$ajax({
        method: 'get',
        url: '/api/beauty/getBeautyType'
      }).then((res) => {
        if (res.status === 200) {
          for (var key in res.data.data.parts) {
            // console.log('属性：' + key + ',值:' + res.data.data.parts[key]);
            _this.numdatas.push(key);
            var obj = {};
            obj = res.data.data.parts[key];
            _this.numdatas2.push(obj);
          }
          this.tieba.push(res.data.data.forum);
          this.web.push(res.data.data.website);
        }
      });
    },
    handleEdit2 (index, row) {
      this.numtype();
      this.$store.state.brieid = row.id;
      this.$store.state.yimei.cname = row.id;
      this.$store.state.yimei.proname = row.projiect;
      this.$store.state.yimei.num = row.phonenum;
      this.$store.state.yimei.stratime = row.starttime;
      this.$store.state.yimei.endtime = row.endtime;
      this.$emit('listenToChildEvent', [this.shows, row.id, this.numdatas, this.numdatas2, this.tieba, this.web]);
    },
    handleSizeChange (val) {
      this.pageSize = val;
      // this.console(this.currentPage - 1, val);
      this.$emit('listionPage', [this.currentPage, val]);
    },
    handleCurrentChange (val) {
      console.log(this.pageSize);
      this.currentPage = val;
      // this.console(val - 1, this.pageSize);
      this.$emit('listionPage', [this.currentPage, this.pageSize]);
    }
  },
  props: ['show', 'again']
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
