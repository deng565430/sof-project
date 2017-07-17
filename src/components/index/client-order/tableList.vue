<template>
	<div>
		<el-table
	    :data="table"
	    border
	    style="width:100%;margin-bottom:20px"
    	max-height="350"
	    :default-sort = "{prop: 'date', order: 'descending'}"
	    > 
        <el-table-column
          v-if="single_num"
          prop="single_num"
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
		        <el-button v-if="xiugaibtns in xiugaibtn" type="text" size="small"  @click.native.prevent="handleClick(scope.$index, table)" >修改</el-button>
		         <el-button v-if="shanchuque == isshanchum" type="text" size="small"  @click.native.prevent="deleteRow(scope.$index, table)" >删除</el-button>
		         <el-button v-if="chakan == chakanm" type="text" size="small"  @click="chakanxiqngiqng" >查看</el-button>
	     		<el-button v-if="zhiixngbtn == zhiixngxiugais" type="text" size="small"  @click.native.prevent="zhiixng(scope.$index, table)" >执行</el-button>
        <el-button  v-if="zhiixngxiugai == zhiixngxiugais" type="text" size="small"  @click.native.prevent="zhiixng2(scope.$index, table)" >修改</el-button>
		      </template> 
		    </el-table-column>
	  </el-table>
	  
	</div>
</template>

<script>
export default {
  props: ['table', 'isshanchum', 'chakanm', 'xiugaibtns', 'zhixingbtns', 'zhiixngxiugais'],
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
      id: this.table.id,
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
    zhiixng (val) {
      // console.log(val);
    },
    zhiixngxiugais () {
      console.log(this.zhiixngxiugais);
      console.log(this.zhiixngbtn);
      console.log(this.zhiixngxiugai);
    }
  },
  created () {
    console.log(this.zhiixngxiugais);
    console.log(this.zhiixngbtn);
    console.log(this.zhiixngxiugai);
    // console.log(this.chakanm);
    // console.log(this.shachuzhiling);
  },
  methods: {
    // 跳转执行
    zhiixng (index, rows) {
      console.log(rows[index].id);
      this.$emit('services-zhixing', rows[index]);
    },
    // 跳转执行单修改
    zhiixng2 (index, rows) {
      console.log(rows[index].id);
      this.$emit('services-zhixingxiugai', rows[index]);
    },
    // 跳转到查看
    chakanxiqngiqng (val) {
      console.log(this.table[0].id);
      this.$emit('services-chakan', this.table[0].id);
    },
    handleClick (index, rows) {
      console.log(rows[index].id);
      this.$emit('services-change', rows[index].id);
    },
    // 删除行
    deleteRow (index, rows) {
      console.log(rows[index].id);
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
	
</style>
