<template>
<div>
	<switchs :flag="flag"></switchs>
	<middle></middle>
	<sof-footer></sof-footer>
</div>
</template>

<script>
import Switchs from './switch/switch';
import Middle from './middle/middle';
import SofFooter from '../../footer/footer';
export default {
  components: {
    Switchs,
    Middle,
    SofFooter
  },
  name: 'index',
  beforeRouteUpdate (to, from, next) {
    this.flag = true;
    next();
  },
  beforeRouteLeave (to, from, next) {
    this.flag = false;
    next();
  },
  data () {
    return {
      flag: true
    };
  }
};
</script>

<style lang="css" scoped>
</style>
