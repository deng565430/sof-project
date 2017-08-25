<template>
<div>
  <router-view></router-view> 
</div>
</template>

<script>
import { isLoginMixin } from 'assets/js/mixin';
export default {

  name: 'analysis',
  mixins: [isLoginMixin],
  data () {
    return {
      analysis: true
    };
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
