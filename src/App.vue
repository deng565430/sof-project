<template>
  <div id="app">
    <com-header></com-header>
    <com-login v-if="this.$store.state.dialogVisible"></com-login>
    <router-view></router-view>
    <com-Alert></com-Alert>
    <com-footer></com-footer>
  </div>
</template>

<script>
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Login from './components/login/login';
import Alert from './components/alert/alert';

export default {
  components: {
    comHeader: Header,
    comFooter: Footer,
    comLogin: Login,
    comAlert: Alert
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
