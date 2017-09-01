<template>
  <div id='leftMenu'>
  <el-menu  class="el-menu-vertical-demo"  :default-active="idnexname" theme="dark" @select="handleSelect"  style="width: 200px">
        <el-menu-item-group class="menutitle">
          <router-link to="order"><el-menu-item index="1-1">概览</el-menu-item></router-link>
          <router-link to="neworder"><el-menu-item index="1-2">新建需求单</el-menu-item></router-link>
          <router-link to="orders"><el-menu-item index="1-3">需求单</el-menu-item></router-link>
          <router-link to="campaign"><el-menu-item index="1-4">执行单</el-menu-item></router-link>
        </el-menu-item-group>
    </el-menu>
  </div>
</template>

<script>
const menue = [{path: 'neworder', name: '新建需求单'}, {path: 'orders', name: '需求单'}, {path: 'campaign', name: '执行单'}];
export default {
  data () {
    return {
      indexs: menue,
      idnexname: '1-1'
    };
  },
  watch: {
    '$route' (val) {
      if (val.path === '/order') {
        this.idnexname = '1-1';
      } else if (val.path === '/neworder') {
        this.idnexname = '1-2';
      } else if (val.path === '/orders') {
        this.idnexname = '1-3';
      } else if (val.path === '/campaign') {
        this.idnexname = '1-4';
      }
    }
  },
  created () {
    if (this.$route.path === '/order') {
      this.idnexname = '1-1';
    } else if (this.$route.path === '/neworder') {
      this.idnexname = '1-2';
    } else if (this.$route.path === '/orders') {
      this.idnexname = '1-3';
    } else if (this.$route.path === '/campaign') {
      this.idnexname = '1-4';
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
.menutitle > .el-menu-item-group__title{
  display: none;
  padding:0;
}
.el-menu--dark .el-menu-item, .el-menu--dark .el-submenu__title{
  color: #333;
  /* border-left: 5px solid #007bf8; */
}
.el-menu--dark .el-menu-item:hover, .el-menu--dark .el-submenu__title:hover{
  color: #fff;
  background: -webkit-linear-gradient(left, rgba(0,117,231,1),  rgba(0,208,219,1)); 
    background: -o-linear-gradient(right, rgba(0,117,231,1),   rgba(0,208,219,1)); 
    background: -moz-linear-gradient(right, rgba(0,117,231,1),   rgba(0,208,219,1));
    background: linear-gradient(to right, rgba(0,117,231,1),   rgba(0,208,219,1));
}
.el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active, .el-menu-item.is-active{
  color: #fff;
  background: -webkit-linear-gradient(left, rgba(0,117,231,1),  rgba(0,208,219,1)); 
    background: -o-linear-gradient(right, rgba(0,117,231,1),   rgba(0,208,219,1)); 
    background: -moz-linear-gradient(right, rgba(0,117,231,1),   rgba(0,208,219,1));
    background: linear-gradient(to right, rgba(0,117,231,1),   rgba(0,208,219,1));
  background-size: cover;
}
#leftMenu a[data-v-29a176ca]{
  display: block;
  border-bottom: 1px solid #cbcbcb;
}
.el-menu--dark{
  background-color: #ecedee
}
</style>
