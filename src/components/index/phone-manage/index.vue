<template>
<div id="orderOne">
  <div id="leftMenu">
    <left-menu/></left-menu>
  </div>
  <div id="contain">
    <router-view></router-view>
  </div>
</div>
</template>

<script>
import LeftMenu from './../../leftMenu/LeftMenu';
export default {
  components: {
    LeftMenu
  },
  data () {
    return {};
  },
  created () {},
  methods: {}
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #orderOne
    height: 100%
    display: flex
    #contain
      width: 100%
      height: 100%
      padding: 20px
      box-sizing: border-box
    #leftMenu
      width: 200px  
</style>
