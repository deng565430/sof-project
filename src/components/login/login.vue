<template>
<div>

  <el-dialog title="提示" v-model="unLogin" size="tiny">
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="unLogin ">取 消</el-button>
      <el-button type="primary" @click="unLogin">确 定</el-button>
    </span>
  </el-dialog>

</div>
</template>

<script>
export default {

  name: 'login',

  data () {
    return {
      dialogVisible: this.$store.state.dialogVisible
    };
  },
  methods: {
    unLogin () {
      this.$store.state.dialogVisible = !this.$store.state.dialogVisible;
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
