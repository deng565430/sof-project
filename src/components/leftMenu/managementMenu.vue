<template>
  <div id='leftMenu'><!-- 
    <el-menu mode="vertical" :default-active="index" class="el-menu-vertical-demo" style="width: 200px" @select="handleSelect"   theme="dark" >
        <el-menu-item-group  v-for="i in indexs">
          <el-menu-item :index="i.name"><router-link :to="{ path: i.path }">{{i.name}}</router-link></el-menu-item>
        </el-menu-item-group>
    </el-menu> -->
    <el-menu  class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" theme="dark">
      <el-submenu index="1">
        <template slot="title">我的客户</template>
        <el-menu-item-group title="">
          <router-link to="allcustomer"><el-menu-item index="1-1">我的所有客户</el-menu-item></router-link>
          <router-link to="VIPcustomer"><el-menu-item index="1-2">我的VIP客户</el-menu-item></router-link>
          <router-link to="projectcustomer"><el-menu-item index="1-3">我的项目客户</el-menu-item></router-link>
        </el-menu-item-group>
      </el-submenu>
      <router-link to="personas"><el-menu-item index="2">客户画像</el-menu-item></router-link>
    </el-menu>
  </div>
</template>

<script>
const menue = [{path: 'personas', name: '客户画像'}];
export default {
  data () {
    return {
      indexs: menue,
      index: ''
    };
  },
  methods: {
    handleSelect (key, keyPath) {
      this.$emit('childEventIsShow', key);
      this.$emit('changechild', key);
    }
  }
};
</script>

<style lang="css" scoped>
#leftMenu{
  width: 15%
}
#leftMenu a{
  color:#bfcbd9;
}
#leftMenu a:active{
  color:#20a0ff;
}
</style>
