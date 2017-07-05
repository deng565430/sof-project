<template>
<div>
  <el-checkbox v-model="checked" v-for="(val, index) in data" @change="change" :label="val.code" :name="val.name">{{val.name}}</el-checkbox>
</div>
</template>

<script>
export default {

  name: 'checkBox',

  data () {
    return {
      checked: []
    };
  },
  props: ['data'],
  methods: {
    change (e) {
      const checked = e.target.checked;
      const value = e.target.value;
      this.$emit('selectData', {checked, value});
    }
  }
};
</script>

<style lang="css" scoped>
</style>
