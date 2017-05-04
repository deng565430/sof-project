<template>
  <div id="header">
     <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1"><router-link to="/demo">跳转页面</router-link></el-menu-item>
        <el-menu-item index="2-2"><router-link to="/">原始页面</router-link></el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-submenu>
      <el-menu-item index="3"><a href="javascript:;" target="_blank">订单管理</a></el-menu-item>
      <el-menu-item index="4"><a href="javascript:;"  target="_blank" @click="submitForm">订单管理</a></el-menu-item>
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
        url: '/api/api/data',
        data: {
          name: 'wise',
          info: 'wrong'
        }
      }).then(function (res) {
        console.log(res);
      }).bind(this);
    }
  }
};

</script>

<style lang="css" scoped>

</style>
