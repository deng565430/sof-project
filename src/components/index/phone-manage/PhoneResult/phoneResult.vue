<template>
<div>
    <div id="title">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="项目分析" name="first">
          <div>
            <ProjectIntention/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="电话类型分析" name="second">
          <div>
            <ProjectType/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="电话类型分析" name="third" v-if="isShow">
         <div>
            <TypeIntention/>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    
  </div>
</template>

<script>
import ProjectIntention from './subpage/ProjectIntention';
import ProjectType from './subpage/ProjectType';
import TypeIntention from './subpage/TypeIntention';
export default {

  name: 'phoneResult',
  components: {
    ProjectIntention,
    ProjectType,
    TypeIntention
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
    },
    handleClick (tab, event) {
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  #echarts
    width: 500px
    height: 500px
</style>
