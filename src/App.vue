<template>
  <div id="app">
    <Header/>
    <Login v-if="this.$store.state.dialogVisible" />
    <router-view></router-view>
    <Alert/>
    <Footer/>
  </div>
</template>

<script>
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Login from './components/login/login';
import Alert from './components/alert/alert';

export default {
  components: {
    Header,
    Footer,
    Login,
    Alert
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
