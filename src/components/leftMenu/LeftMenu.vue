<template>
  <div id='leftMenu'>
    <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" router theme="dark">
      <el-menu-item index="/phone/phoneList">电话清单</el-menu-item>
      <el-menu-item index="/phone/phoneResult">电话效果分析</el-menu-item>
      <el-menu-item index="/phone/quality">电话质量分析</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '/phone/phoneList'
    };
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">  
</style>
