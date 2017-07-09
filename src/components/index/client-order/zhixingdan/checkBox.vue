<template>
<div>
  <el-checkbox v-model="checked" v-for="(val, index) in data.data" @change="change" :key="val" :label="val.name" :name="val.code">{{val.name}}</el-checkbox>
</div>
</template>

<script>
export default {

  name: 'checkBox',
  create () {
    this.checked = [];
  },
  mounted () {},
  data () {
    return {
      checked: this.checkedData ? this.checkedData : [],
      checkedList: []
    };
  },
  props: ['data', 'checkedData'],
  methods: {
    change (e) {
      const checked = e.target.checked;
      const value = e.target.name;
      const thisName = e.target.value;
      if (checked) {
        this.checkedList.push({
          code: value,
          name: thisName
        });
      } else {
        this.remove(this.checkedList, value);
      }
      const checkedArr = this.checkedList;
      const parentValue = this.data.val;
      this.$emit('selectData', {checked, value, checkedArr, thisName, parentValue});
    },
    remove (arr, val) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].code === val) {
          arr.splice(i, 1);
          break;
        }
      }
    }
  }
};
</script>

<style lang="css" scoped>
</style>
