<template>
  <div id='leftMenu'>
    <el-menu mode="vertical" :default-active="index" class="el-menu-vertical-demo" style="width: 200px" @select="handleSelect"   theme="dark" >
        <el-menu-item-group title="" v-for="value in dataValue">
            <el-menu-item v-if="value.all" :index="value.all.val">
             {{value.all.val}}
            </el-menu-item>
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
            <el-menu-item v-if="value.hoistory2" :index="value.hoistory2.val">
               {{value.hoistory2.val}}
            </el-menu-item>
        </el-menu-item-group>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      index: this.dataValue[0].all ? this.dataValue[0].all.val : this.dataValue[0].name.val
    };
  },
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
#leftMenu a{
  display: inline-block;
  color:#bfcbd9;
}
#leftMenu a:active{
  color:#20a0ff;
}
</style>
