<template>
<div>
  <router-view></router-view>
</div>
</template>

<script>
export default {

  name: 'analysis',
  data () {
    return {
      analysis: true
    };
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
#analysis
  width: 900px
  margin: 0 auto
</style>
