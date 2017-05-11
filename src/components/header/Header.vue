<template>
  <div id="header">
     <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1"><router-link class="itemWdith" to="/">SOF</router-link></el-menu-item>
      <el-menu-item index="2"><router-link class="itemWdith" to="/index">主页</router-link></el-menu-item>
      <el-menu-item index="3"><router-link class="itemWdith" to="/client">客户下单系统</router-link></el-menu-item>
      <el-menu-item index="4"><router-link class="itemWdith" to="/phone">电话管理</router-link></el-menu-item>
      <el-menu-item index="5"><router-link class="itemWdith" to="/analysis">分析报告</router-link></el-menu-item>
      <el-menu-item index="6"><router-link class="itemWdith" to="/management">客户管理</router-link></el-menu-item>
      <el-menu-item index="7"><a href="javascript:;"  target="_blank" @click="submitForm">客户管理</a></el-menu-item>
      <el-menu-item index="8" v-if="isLogin.msg" style="float:right"><router-link to="">欢迎你：{{isLogin.name}}</router-link></el-menu-item>
      <el-menu-item index="8"  v-else style="float:right" @click="login"><router-link to="">登录</router-link></el-menu-item>
    </el-menu>
    <com-login></com-login>
    <div class="line"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data () {
    return {
      activeIndex: '1'
    };
  },
  computed: {...mapGetters(['isLogin'])},
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath);
    },
    submitForm () {
      this.$ajax({
        method: 'get',
        url: '/api/brief/getBriefListCount',
        data: {msg: 1}
      }).then(function (res) {
        console.log(res);
      });
    },
    login () {
      this.$store.state.dialogVisible = true;
      console.log(mapGetters(['isLogin']));
    }
  }
};

</script>

<style lang="stylus" rel="stylesheet/stylus">
  .itemWdith
    display: inline-block
    width: 100%
    height: 100%
</style>
