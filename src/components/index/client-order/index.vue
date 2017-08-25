<template>
<div style="display:flex">
  <LeftMenu></LeftMenu>
  <router-view style="width:85%"></router-view>  
</div>
</template>

<script>
import LeftMenu from './../../leftMenu/orderMenu';
export default {
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
