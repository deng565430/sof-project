<template>
<div>
  <div class="btns">
    <el-button type="primary" @click="add">新建分组</el-button>
    <span class="notice">（注意：您最多只能添加五个分组！）</span>
  </div>
	<el-dialog title="创建新分组" :visible.sync="dialogFormVisible">
	  <el-form :model="form">
	    <el-form-item label="分组名称" >
	      <el-input v-model="name" auto-complete="off"></el-input>
	    </el-form-item>
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="dialogFormVisible = false">取 消</el-button>
	    <el-button type="primary" @click="surebtn">确 定</el-button>
	  </div>
	</el-dialog>
</div>
</template>
<script>
export default {
  props: ['tablelength'],
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
      if (this.tablelength >= 5) {
        this.$alert('最多只能添加5个分组！');
      } else {
        this.dialogFormVisible = true;
      }
    },
    surebtn () {
      this.$api.post('/api/clientbehavior/addlabel/' + this.name).then((res) => {
        console.log(res);
        this.dialogFormVisible = false;
        this.name = '';
        this.$emit('shuaxinlist');
      });
    }
  }
};
</script>
<style>
.btns .notice{
  color:#ababab;
  font-size: 13px;
}
</style>
