<template>
  <div id="footer">
     <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">底部</a></el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '1'
    };
  },

  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath);
    }
  }
};

</script>

<style lang="stylus" rel="stylesheet/stylus">
  #footer
    position: fixed
    left: 0
    right: 0
    bottom: 0
</style>
