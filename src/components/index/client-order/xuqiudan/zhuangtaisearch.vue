<template>
  <el-form  style="text-align: left;" :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item label="">
    <el-select v-model="value" placeholder="请选择" style="width:120px">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-form-item label="">
      <el-input v-model="formInline.com" placeholder="" v-on:focus="onfocus"></el-input>
    </el-form-item>
  </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button type="text" @click="qingchu">清除</el-button>
    </el-form-item>
</el-form>
</template>

<script>
export default {
  data () {
    return {
      formInline: {
        com: ''
      },
      options: [{
        value: '1',
        label: '项目名称'
      }, {
        value: '0',
        label: '需求公司'
      }, {
        value: '3',
        label: '需求单编号'
      }],
      value: ''
    };
  },
  created () {
    // this.value = this.options[0].value;
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
      if (this.value === '' || this.formInline.com === '') {
        this.$alert('请选择搜索条件!');
        return;
      }
      this.$emit('search', this.value, this.formInline.com);
      // this.formInline.com = '';
    }
  }
};
</script>

<style>
</style>

