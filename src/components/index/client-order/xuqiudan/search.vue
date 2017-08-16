<template>
  <el-select v-model="value" clearable placeholder="请选择" style="width:120px;margin-right:10px" @change='searchChange(value)'>
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
export default {
  data () {
    return {
      options: [{
        value: '0',
        label: '待审核'
      }, {
        value: '1',
        label: '待执行'
      }, {
        value: '2',
        label: '执行中'
      }, {
        value: '3',
        label: '已完成'
      }],
      value: ''
    };
  },
  created () {
    this.value = this.options[0].value;
  },
  methods: {
    searchChange (val) {
      this.$emit('zhuangtai', val);
    }
  }
};
</script>

<style>
</style>

