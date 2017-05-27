<template>
  <div id='leftMenu'>
    <el-menu mode="vertical" class="el-menu-vertical-demo" @select="handleSelect"   theme="dark" >
        <el-menu-item-group title="" v-for="value in dataValue">
            <el-menu-item :index="value.name.val">
                {{value.name.val}}
            </el-menu-item>
            <el-menu-item :index="value.ing.val">
                {{value.ing.val}}
            </el-menu-item>
            <el-menu-item :index="value.now.val">
                {{value.now.val}}
            </el-menu-item>
            <el-menu-item :index="value.hoistory.val">
               {{value.hoistory.val}}
            </el-menu-item>
        </el-menu-item-group>
    </el-menu>
  </div>
</template>

<script>
export default {
  methods: {
    handleSelect (key, keyPath) {
      this.$emit('childEventIsShow', key);
      this.$emit('changechild', key);
    }
  },
  props: ['dataValue', 'childIsShow']
};
</script>

<style lang="css" scoped>
#leftMenu{
  width: 10%;
  height: 100%
}
.el-menu--dark{
  
}
#leftMenu a{
  display: inline-block;
  color:#bfcbd9;
}
#leftMenu a:active{
  color:#20a0ff;
}
</style>
