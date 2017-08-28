<template>
  <div id="app">
    <sof-header/>
    <sof-login v-if="this.$store.state.dialogVisible" />
    <div class="sof-alert">
      <sof-alert/>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import SofHeader from './components/header/Header';
import SofLogin from './components/login/login';
import SofAlert from './components/alert/alert';

export default {
  components: {
    SofHeader,
    SofLogin,
    SofAlert
  },
  data () {
    return {
    };
  }
};

</script>

<style lang="stylus" rel="stylesheet/stylus">
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  height: 100%
  .sof-alert
    height: 0
    overflow: hidden
</style>
