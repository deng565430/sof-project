<template>
  <div id="app">
    <com-header></com-header>
    <router-view></router-view>
    <com-footer></com-footer>
  </div>
</template>

<script>
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

export default {
  components: {
    comHeader: Header,
    comFooter: Footer
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
