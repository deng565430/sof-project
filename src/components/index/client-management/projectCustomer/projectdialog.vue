<template>
<div>
	<el-dialog title="我的项目" v-model="dialogFormVisible">
		<div>
			<!-- <el-button
			         size="small"
			         @click="handleEdit">添加到项目</el-button>
			         <el-button
			         size="small"
			         @click="handleEdit2">添加到VIP</el-button>
			         <el-button
			         size="small"
			         @click="handleEdit3">添加到自定义</el-button> -->
		</div>
	  <el-form :model="form">
	    <el-form-item label="项目名称" :label-width="formLabelWidth">
	      <el-input v-model="form.name" auto-complete="off"></el-input>
	    </el-form-item>
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="dialogFormVisible = false">取 消</el-button>
	    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
	  </div>
	</el-dialog>
</div>
</template>
<script>
export default {
  data () {
    return {
      form: [{
        name: '王小虎',
        phone: '18544574458'
      }, {
        name: '王小虎',
        phone: '18544574458'
      }],
      dialogFormVisible: []
    };
  }
};
</script>
<style>
</style>
