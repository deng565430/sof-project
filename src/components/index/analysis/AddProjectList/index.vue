<template>
<div id="analysis">
  <AddReport />
  <ProjectList/>
</div>
</template>

<script>
import AddReport from '../AddReport';
import ProjectList from '../ProjectList';
export default {

  name: 'index',
  components: {
    AddReport,
    ProjectList
  },
  data () {
    return {

    };
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
#analysis
  width: 900px
  margin: 0 auto
</style>
