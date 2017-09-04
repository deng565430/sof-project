<template>
	<div class="zhixingtablelist">
		<el-table
	    :data="table"
	    border
	    style="width:100%;margin-bottom:20px"
    	max-height="350"
	    :default-sort = "{prop: 'date', order: 'descending'}"
	    > 
        <el-table-column
          prop="single_num"
          v-if="zhixingbtns > 0"
          label="执行单编号"
          width="180">
        </el-table-column> 
	    	<el-table-column
		      fixed
		      prop="order_num"
		      label="需求单编号"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="project_name"
		      label="项目名称"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="demand_side"
		      label="需求公司"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="phone_demand"
		      label="所需电话量"
		      sortable
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="start_date"
		      label="订阅起始时间"
		      sortable
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="end_date"
		      label="订阅结束时间"
		      sortable
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="create_time"
		      label="下单日期"
		      sortable
		      width="180">
		    </el-table-column>
		    <el-table-column
		      fixed="right"
		      label="操作"
		      width="100"
		      >
		      <template scope="scope">
            <el-button  v-if="zhixingbtns == 0" type="text" size="small"  @click.native.prevent="handleClick(scope.$index, table)" >新建</el-button>
            <el-button v-if="zhixingbtns < 3 && zhixingbtns > 0" type="text" size="small"  @click.native.prevent="zhiixng2(scope.$index, table)" >修改</el-button>
            <el-button  v-if="zhixingbtns == 3" type="text" size="small"  @click.native.prevent="zhiixng3(scope.$index, table)" >查看</el-button>
		      </template> 
		    </el-table-column>
        
	  </el-table>
	 <!--  <el-pagination
         @size-change="handleSizeChange"
         @current-change="handleCurrentChange"
         :current-page="currentpage"
         :page-sizes="[10, 20, 50]"
         :page-size="pagesize"
         :total="tablenum"
         layout="total, sizes, prev, pager, next, jumper"
         >
        </el-pagination>  -->
	</div>
</template>

<script>
export default {
  props: ['table', 'zhixingbtns'], // , 'tablenum', 'pagesize', 'currentpage'
  data () {
    return {
      shanchuque: 0,
      isshanchum: this.isshanchum,
      rowid: '',
      chakan: 3,
      zhiixngbtn: 0,
      xiugaibtn: [0, 1, 2],
      zhiixngxiugai: 1,
      chakanm: this.chakanm,
      tables: this.table
    };
  },
  watch: {
    isshanchum (val) {
      // console.log(val);
    },
    chakanm (val) {
      // console.log(this.table);
    },
    xiugaibtns (val) {
      // console.log(val);
    },
    zhixingbtns (val) {
      // console.log(val);
    },
    zhiixngxiugais () {
      // console.log(this.zhiixngxiugais);
      // console.log(this.zhiixngbtn);
      // console.log(this.zhiixngxiugai);
    }
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
    },
    // 跳转执行
    zhiixng (index, rows) {
      this.$emit('services-zhixing', rows[index]);
    },
    // 跳转执行单修改
    zhiixng2 (index, rows) {
      this.$emit('services-zhixingxiugai', rows[index]);
    },
    // 跳转执行单查看
    zhiixng3 (index, rows) {
      this.$emit('services-zhixingchakan', rows[index], 3);
    },
    // 跳转到查看
    chakanxiqngiqng (val) {
      this.$emit('services-chakan', this.table[0].id);
    },
    handleClick (index, rows) {
      this.$emit('services-zhixing', rows[index]);
    },
    // 删除行
    deleteRow (index, rows) {
      this.rowid = rows[index].id;
      this.$emit('services-shanchu', rows[index].id);
      this.$confirm('此操作将永久删此条, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('services-qurrenshanchu', rows[index].id);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
};
</script>

<style>
	.zhixingtablelist .el-table-filter__checkbox-group label.el-checkbox{
    margin-left: 0px;
  }
</style>
