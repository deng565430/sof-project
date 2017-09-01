<template>
<div style="display:flex;width:100%">
  <LeftMenu style="width:200px;"></LeftMenu>
  <router-view style="flex:1;overflow:auto;"></router-view>  
</div>
</template>

<script>
import {isLoginMixin} from 'assets/js/mixin';
import LeftMenu from './../../leftMenu/orderMenu';
export default {
  mixins: [isLoginMixin],
  components: {
    LeftMenu
  },
  data () {
    return {};
  },
  created () {},
  computed: {},
  methods: {},
  mounted () {}
};
</script>

<style lang="css" scoped>
</style>
