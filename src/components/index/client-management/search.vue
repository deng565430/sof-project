<template>
  <el-form  style="text-align: left;" :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item label="">
    <el-form-item label="">
      <el-input v-model="formInline.com" placeholder="请输入查询的电话" v-on:focus="onfocus"></el-input>
    </el-form-item>
  </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
</el-form>
</template>

<script>
export default {
  data () {
    return {
      formInline: {
        com: ''
      }
    };
  },
  created () {
    this.value = this.options[0].value;
  },
  methods: {
    qingchu () {
      this.formInline.com = '';
      // this.value = '';
      this.$emit('qingchu', this.value);
    },
    onfocus () {
      if (this.value === '') {
        this.$alert('请先选择搜索类型!');
      }
    },
    onSubmit () {
      if (this.formInline.com === '') {
        this.$alert('请选择搜索条件!');
        return;
      }
      this.$emit('search', this.formInline.com);
      // this.formInline.com = '';
    }
  }
};
</script>

<style>
</style>

