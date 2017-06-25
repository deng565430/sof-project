<template>
<div id="analysis">
  <div id="allProject">
    <p>已有全部订阅 <span> 20</span></p>
  </div>
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
  #allProject
    text-align: left
    height: 40px
    border: 1px solid #ccc
    margin: 10px 0
    padding: 0 10px
    p
      line-height: 40px
      font-wight: 900
      span
        color: red
</style>
