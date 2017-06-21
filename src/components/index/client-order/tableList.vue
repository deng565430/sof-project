<template>
	<div>
		<el-table
	    :data="table"
	    border
	    style="width:100%;margin-bottom:20px"
    	max-height="250"
	    :default-sort = "{prop: 'date', order: 'descending'}"
	    >
		    <el-table-column
		      prop="project_name"
		      fixed
		      label="项目名称"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="order_num"
		      label="需求单编号"
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
		        <el-button type="text" size="small"  @click.native.prevent="handleClick(scope.$index, table)" >修改</el-button>
		        <!-- <el-button type="text" size="small"  @click.native.prevent="deleteRow(scope.$index, table)">删除</el-button>-->
		      </template> 
		    </el-table-column>
	  </el-table>
	  
	</div>
</template>

<script>
export default {
  props: ['table'],
  data () {
    return {};
  },
  methods: {
    handleClick (index, rows) {
      console.log(rows[index].id);
      this.$emit('services-change', rows[index].id);
    }
    // 删除行
    /* deleteRow (index, rows) {
      console.log(rows[index].id);
      this.$alert('确认要删除此条?');
    } */
  }
};
</script>

<style>
	
</style>
