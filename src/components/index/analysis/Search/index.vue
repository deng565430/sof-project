<template>

  <el-input
    :placeholder="placeholder"
    icon="search"
    v-model="searchIpt"
    @focus="focus"
    :on-icon-click="handleIconClick"
    @keyup.enter.native="handleInputConfirm">
    </el-input>

</template>

<script>
export default {

  name: 'index',

  data () {
    return {
      searchIpt: ''
    };
  },
  methods: {
    handleIconClick () {
      this.$emit('searchValue', this.searchIpt);
    },
    handleInputConfirm () {
      this.$emit('searchValue', this.searchIpt);
    },
    focus () {
      this.searchIpt = '';
    },
    trim (str) {
      return str.replace(/(^\s*)|(\s*$)/g, '');
    }
  },
  props: ['placeholder']
};
</script>

<style lang="css" scoped>
</style>
