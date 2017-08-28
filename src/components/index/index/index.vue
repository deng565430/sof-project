<template>
<div>
	<switchs></switchs>
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

  data () {
    return {

    };
  }
};
</script>

<style lang="css" scoped>
</style>
