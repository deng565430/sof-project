<template>
  <div id="app">
    <sof-header/>
    <sof-login v-if="this.$store.state.dialogVisible" />
    <router-view></router-view>
    <sof-alert/>
    <sof-footer/>
  </div>
</template>

<script>
import SofHeader from './components/header/Header';
import SofFooter from './components/footer/Footer';
import SofLogin from './components/login/login';
import SofAlert from './components/alert/alert';

export default {
  components: {
    SofHeader,
    SofFooter,
    SofLogin,
    SofAlert
  },
  data () {
    return {
    };
  }
};

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%
}
</style>
