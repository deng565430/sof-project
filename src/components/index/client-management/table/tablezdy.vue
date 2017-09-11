<template>
<div style="margin:20px">
  <el-table
    :data="tables"
    style="">
    <el-table-column
      prop="name"
      label="分组名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="num"
      label="客户量">
    </el-table-column>
    <el-table-column label="操作" >
      <template scope="scope" style="display:flex">
       <el-button
          size="small"
          @click="handleEdit(scope.$index, scope.row)">修改分组名</el-button>
          <el-button
          size="small"
          @click="handleEdit2(scope.$index, scope.row)">查看客户</el-button>
          <el-button
          size="small"
          @click="handleEditdele(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog title="修改分组名称" :visible.sync="dialogFormVisible">
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
  props: ['tables'],
  data () {
    return {
      currentRow: null,
      dialogFormVisible: false,
      name: '',
      form: {},
      code: ''
    };
  },
  methods: {
    handleEdit (index, row) {
      this.dialogFormVisible = true;
      this.name = row.name;
      this.code = row.code;
    },
    handleEdit2 (index, row) {
      this.$emit('detailtable', row);
    },
    handleEditdele (index, row) {
      var that = this;
      that.$api.post('/api/clientbehavior/dellabel/' + row.code).then(function (res) {
        if (res.data.code === 0) {
          that.$emit('shuaxinlist');
        } else {
          that.$alert('删除失败！');
        }
      });
    },
    surebtn () {
      this.$api.post('/api/clientbehavior/modifylabel?code=' + this.code + '&label=' + this.name).then((res) => {
        this.$emit('listen');
      });
      this.dialogFormVisible = false;
    }
  }
};
</script>

<style lang="css" scoped>
</style>
