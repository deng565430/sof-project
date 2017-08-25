<template>
  <div id='leftMenu'>
  <el-menu  class="el-menu-vertical-demo"  theme="dark" @select="handleSelect"  style="width: 200px">
      
        <template slot="title"></template>
        <el-menu-item-group title="">
          <router-link to="order"><el-menu-item index="1-1">概览</el-menu-item></router-link>
          <router-link to="neworder"><el-menu-item index="1-2">新建需求单</el-menu-item></router-link>
          <router-link to="orders"><el-menu-item index="1-3">需求单</el-menu-item></router-link>
          <router-link to="campaign"><el-menu-item index="1-4">执行单</el-menu-item></router-link>
        </el-menu-item-group>
    </el-menu>
    <!-- <el-menu mode="vertical" :default-active="index" class="el-menu-vertical-demo" style="width: 200px" @select="handleSelect"   theme="dark" >
    
        <el-menu-item-group  v-for="i in indexs">
          <router-link :to="{ path: i.path }"><el-menu-item :index="i.name">{{i.name}}</el-menu-item></router-link>
        </el-menu-item-group>
    </el-menu> -->
  </div>
</template>

<script>
const menue = [{path: 'neworder', name: '新建需求单'}, {path: 'orders', name: '需求单'}, {path: 'campaign', name: '执行单'}];
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
#leftMenu a{
  color:#bfcbd9;
}
#leftMenu a:active{
  color:#20a0ff;
}
ul {
  height: 100%;
  background-color: #ecedee
}
.el-menu--dark .el-menu-item, .el-menu--dark .el-submenu__title{
  color: #333;
  border-left: 5px solid #007bf8;
}
.el-menu--dark .el-menu-item:hover, .el-menu--dark .el-submenu__title:hover{
  color: #fff;
  background:url(./bgk_03.png) no-repeat center center;
  background-size: cover;
}
.el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active, .el-menu-item.is-active{
  color: #fff;
  background:url(./bgk_03.png) no-repeat center center;
  background-size: cover;
}
#leftMenu a[data-v-29a176ca]{
  display: block;
  border-bottom: 1px solid #cbcbcb;
}
</style>
