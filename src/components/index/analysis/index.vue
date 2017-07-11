<template>
<div>
  <keep-alive>
    <router-view></router-view> 
  </keep-alive>
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
