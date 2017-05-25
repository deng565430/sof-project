<template>
  <div>
     <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router>
      <el-menu-item index="/index"><router-link class="itemWdith" to="">上富科技</router-link></el-menu-item>
      <el-menu-item index="/client"><router-link class="itemWdith" to="">客户下单系统</router-link></el-menu-item>
      <el-menu-item index="/phone"><router-link class="itemWdith" to="">电话管理</router-link></el-menu-item>
      <el-menu-item index="/analysis"><router-link class="itemWdith" to="">分析报告</router-link></el-menu-item>
      <el-menu-item index="/management"><router-link class="itemWdith" to="">客户管理</router-link></el-menu-item>
      <el-menu-item v-if="isLogin.msg" @click="admin" style="float:right">欢迎你：{{isLogin.name}}</el-menu-item>
      <el-menu-item v-else style="float:right" @click="login"><router-link to="">登录</router-link></el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data () {
    return {
      activeIndex: '/index'
    };
  },
  watch: {},
  computed: {...mapGetters(['isLogin'])},
  methods: {
    login () {
      this.$store.state.dialogVisible = true;
    },
    admin () {
      alert('个人中心');
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
