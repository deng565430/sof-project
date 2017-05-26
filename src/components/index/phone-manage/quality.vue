<template>
<div>
  <div id="title">
      <el-tabs v-model="activeName" @tab-click="">
        <el-tab-pane label="项目分析" name="first">
          <div>
            11
          </div>
        </el-tab-pane>
        <el-tab-pane label="电话类型分析" name="second">
          <div>
            22
          </div>
        </el-tab-pane>
        <el-tab-pane label="电话类型分析" name="third">
         <div>
            33
          </div>
        </el-tab-pane>
        <el-tab-pane label="电话类型分析" name="fourthly">
         <div>
            44
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
</div>
</template>

<script>
export default {

  name: 'quality',

  data () {
    return {
      activeName: 'first'
    };
  }
};
</script>

<style lang="css" scoped>
</style>
