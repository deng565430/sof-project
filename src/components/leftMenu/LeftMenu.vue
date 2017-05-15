<template>
  <div id='leftMenu'>
    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" theme="dark">
      <el-submenu index="1" v-for="value in dataValue">
        <template slot="title">{{value.value}}</template>
        <el-menu-item-group title="">
          <el-menu-item index="1-1"><router-link :to="{path:value.name.url}">{{value.name.val}}</router-link></el-menu-item>
          <el-menu-item index="1-2"><router-link :to="{path:value.ing.url}">{{value.ing.val}}</router-link></el-menu-item>
          <el-menu-item index="1-3"><router-link :to="{path:value.now.url}">{{value.now.val}}</router-link></el-menu-item>
          <el-menu-item index="1-4"><router-link :to="{path:value.hoistory.url}">{{value.hoistory.val}}</router-link></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    }
  },
  props: {
    dataValue: Array
  }
};
</script>

<style lang="css" scoped>
#leftMenu{
  width: 10%;
  height: 100%
}
.el-menu--dark{
  height: 100%;
}
#leftMenu a{
  display: inline-block;
  color:#bfcbd9;
}
#leftMenu a:active{
  color:#20a0ff;
}
</style>
