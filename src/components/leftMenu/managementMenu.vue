<template>
  <div id='leftMenus'><!-- 
    <el-menu mode="vertical" :default-active="index" class="el-menu-vertical-demo" style="width: 200px" @select="handleSelect"   theme="dark" >
        <el-menu-item-group  v-for="i in indexs">
          <el-menu-item :index="i.name"><router-link :to="{ path: i.path }">{{i.name}}</router-link></el-menu-item>
        </el-menu-item-group>
    </el-menu> -->
    <el-menu  class="el-menu-vertical-demo" :default-active="idnexname" theme="dark">
      <el-submenu index="1">
        <template slot="title">我的客户</template>
        <el-menu-item-group title="">
          <router-link to="allcustomer"><el-menu-item index="1-1">我的所有客户</el-menu-item></router-link>
          <router-link to="VIPcustomer"><el-menu-item index="1-2">我的VIP客户</el-menu-item></router-link>
          <router-link to="projectcustomer"><el-menu-item index="1-3">我的项目客户</el-menu-item></router-link>
          <router-link to="custom"><el-menu-item index="1-4">我的自定义分组</el-menu-item></router-link>
        </el-menu-item-group>
      </el-submenu>
      <router-link to="personas"><el-menu-item index="2">客户搜索</el-menu-item></router-link>
    </el-menu>
  </div>
</template>

<script>
const menue = [{path: 'personas', name: '客户画像'}];
export default {
  data () {
    return {
      indexs: menue,
      index: '',
      idnexname: ''
    };
  },
  watch: {
    '$route' (val) {
      if (val.path === '/allcustomer') {
        this.idnexname = '1-1';
      } else if (val.path === '/VIPcustomer') {
        this.idnexname = '1-2';
      } else if (val.path === '/projectcustomer') {
        this.idnexname = '1-3';
      } else if (val.path === '/custom') {
        this.idnexname = '1-4';
      } else if (val.path === '/personas') {
        this.idnexname = '2';
      }
    }
  },
  created () {
    if (this.$route.path === '/allcustomer') {
      this.idnexname = '1-1';
    } else if (this.$route.path === '/VIPcustomer') {
      this.idnexname = '1-2';
    } else if (this.$route.path === '/projectcustomer') {
      this.idnexname = '1-3';
    } else if (this.$route.path === '/personas') {
      this.idnexname = '2';
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      this.$emit('childEventIsShow', key);
      this.$emit('changechild', key);
    }
  }
};
</script>

<style lang="css" >
#leftMenus a{
  color:#bfcbd9;
}
#leftMenus a:active{
  color:#20a0ff;
}
#leftMenus ul {
  height: 100%;
  background-color: #ecedee
}
#leftMenus .menutitle > .el-menu-item-group__title{
  display: none;
  padding:0;
}
#leftMenus .el-menu--dark .el-menu-item, .el-menu--dark .el-submenu__title{
  color: #333;
  /* border-left: 5px solid #007bf8; */
}
#leftMenus .el-menu--dark .el-menu-item:hover, .el-menu--dark .el-submenu__title:hover{
  color: #fff;
  background: -webkit-linear-gradient(left, rgba(0,117,231,1),  rgba(0,208,219,1)); 
    background: -o-linear-gradient(right, rgba(0,117,231,1),   rgba(0,208,219,1)); 
    background: -moz-linear-gradient(right, rgba(0,117,231,1),   rgba(0,208,219,1));
    background: linear-gradient(to right, rgba(0,117,231,1),   rgba(0,208,219,1));
}
#leftMenus .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active, .el-menu-item.is-active{
  color: #fff !important;
  background: -webkit-linear-gradient(left, rgba(0,117,231,1),  rgba(0,208,219,1)); 
  background: -o-linear-gradient(right, rgba(0,117,231,1),   rgba(0,208,219,1)); 
  background: -moz-linear-gradient(right, rgba(0,117,231,1),   rgba(0,208,219,1));
  background: linear-gradient(to right, rgba(0,117,231,1),   rgba(0,208,219,1));
  background-size: cover;
}
#leftMenus a[data-v-29a176ca]{
  display: block;
  border-bottom: 1px solid #cbcbcb;
}
#leftMenus .el-menu--dark{
  background-color: #ecedee
}
</style>
