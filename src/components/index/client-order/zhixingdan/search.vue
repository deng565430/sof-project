<template>
<div>
  <el-select v-model="value" clearable placeholder="请选择" style="width:120px;margin-right:10px" @change='searchChange(value)'>
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </div>
</template>

<script>
export default {
  props: ['ishistory'],
  data () {
    return {
      options: [{
        value: '0',
        label: '新执行单'
      }, {
        value: '1',
        label: '未执行'
      }, {
        value: '2',
        label: '执行中'
      }, {
        value: '3',
        label: '历史执行单'
      }],
      value: ''
    };
  },
  watch: {
    ishistory (val) {
      this.value = val;
    }
  },
  created () {
    if (this.ishistory !== undefined) {
      this.value = this.ishistory;
    } else {
      this.value = this.options[0].value;
    }
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

