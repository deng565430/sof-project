<template>
  <div id="header">
     <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1"><router-link to="/">SOF</router-link></el-menu-item>
      <el-menu-item index="2"><router-link to="/index">主页</router-link></el-menu-item>
      <el-menu-item index="3"><router-link to="/client">客户下单系统</router-link></el-menu-item>
      <el-menu-item index="4"><router-link to="/phone">电话管理</router-link></el-menu-item>
      <el-menu-item index="5"><router-link to="/analysis">分析报告</router-link></el-menu-item>
      <el-menu-item index="6"><router-link to="/management">客户管理</router-link></el-menu-item>
      <el-menu-item index="7"><a href="javascript:;"  target="_blank" @click="submitForm">客户管理</a></el-menu-item>
    </el-menu>
    <div class="line"></div>
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
    },
    submitForm () {
      this.$ajax({
        method: 'get',
        url: '/brief/getBriefListCount',
        data: {msg: 1}
      }).then(function (res) {
        console.log(res);
      })
    }
  }
};

</script>

<style lang="css" scoped>

</style>
