<template>
<div>
	<el-dialog title="已有的分组" :visible.sync="dialogFormVisible">
	   <el-table
     :data="table"
    :row-click="rowclick"
    tooltip-effect="dark"
    style="width: 100%">
      </el-table-column>
     <el-table-column
      prop="value"
      label="客户">
    </el-table-column>
    </el-table>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="dialogFormVisible = false">取 消</el-button>
	    <el-button type="primary" @click="surebtn">确 定</el-button>
	  </div>
	</el-dialog>
</div>
</template>
<script>
export default {
  data () {
    return {
      form: {},
      name: '',
      dialogFormVisible: false
    };
  },
  created () {
  },
  methods: {
    add () {
      this.dialogFormVisible = true;
    },
    surebtn () {
      this.$api.post('/api/clientbehavior/addlabel/' + this.name).then((res) => {
        this.dialogFormVisible = false;
      });
    }
  }
};
</script>
<style>
</style>
