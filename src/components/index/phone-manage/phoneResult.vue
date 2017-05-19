<template>
<div>
    <div id="title">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="项目意向率对比" name="first">
          <div>
            <ProjectIntention></ProjectIntention>
          </div>
        </el-tab-pane>
        <el-tab-pane label="项目类型对比" name="second">
          22
        </el-tab-pane>
        <el-tab-pane label="项目类型意向率对比" name="third">
          33
        </el-tab-pane>
      </el-tabs>
    </div>
    
  </div>
</template>

<script>
import ProjectIntention from './Charts/ProjectIntention';
export default {

  name: 'phoneResult',
  components: {
    ProjectIntention
  },
  data () {
    return {
      isShow: false,
      activeName: 'first'
    };
  },
  mounted () {},
  created () {},
  methods: {
    clicks () {
      this.data.title.text = Math.random();
    },
    handleClick (tab, event) {
      this.isShow = true;
      this.data.title.text = Math.random();
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  #echarts
    width: 500px
    height: 500px
</style>
