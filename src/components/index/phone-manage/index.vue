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
import { isLoginMixin } from 'assets/js/mixin';
export default {
  mixins: [isLoginMixin],
  components: {
    LeftMenu
  },
  computed: {},
  data () {
    return {};
  },
  mounted () {},
  created () {},
  methods: {}
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #orderOne
    height: 100%
    display: flex
    margin-bottom: 200px
    #contain
      width: 100%
      height: 100%
      box-sizing: border-box
    #leftMenu
      width: 200px  
</style>
