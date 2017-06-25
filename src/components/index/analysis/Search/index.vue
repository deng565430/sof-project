<template>

  <el-input
    :placeholder="placeholder"
    icon="search"
    v-model="searchIpt"
    :on-icon-click="handleIconClick">
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
    trim (str) {
      return str.replace(/(^\s*)|(\s*$)/g, '');
    }
  },
  props: ['placeholder']
};
</script>

<style lang="css" scoped>
</style>
