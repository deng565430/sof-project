<template>
  <div id='leftMenu'>
    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" theme="dark">
      <el-submenu index="1">
        <template slot="title">需求单</template>
        <el-menu-item-group title="">
          <el-menu-item index="1-1"><router-link to="/client/orderIndex">下订单</router-link></el-menu-item>
          <el-menu-item index="1-2"><router-link to="/client/dingyue">正在订阅的</router-link></el-menu-item>
          <el-menu-item index="1-3"><router-link to="/client/historyding">历史订阅</router-link></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
       <el-submenu index="2">
        <template slot="title">执行单</template>
        <el-menu-item-group title="">
          <el-menu-item index="2-1"><router-link to="/client/Newzhi">新执行单</router-link></el-menu-item>
          <el-menu-item index="2-2"><router-link to="/client/dingyue">正在执行的</router-link></el-menu-item>
          <el-menu-item index="2-3"><router-link to="/client/historyding">历史执行单</router-link></el-menu-item>
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
