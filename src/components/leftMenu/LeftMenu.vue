<template>
  <div id='leftMenu'>
    <el-menu default-active="2" class="el-menu-vertical-demo" @select="handleSelect"  v-for="value in dataValue" theme="dark" >
        <template slot="title">{{value.value}}</template>
        <el-menu-item-group title="">
            <el-menu-item :index="value.name.val">
                <router-link :to="{path:value.name.url}">{{value.name.val}}</router-link>
            </el-menu-item>
            <el-menu-item :index="value.ing.val">
                <router-link :to="{path:value.ing.url}">{{value.ing.val}}</router-link>
            </el-menu-item>
            <el-menu-item :index="value.now.val">
                <router-link :to="{path:value.now.url}">{{value.now.val}}</router-link>
            </el-menu-item>
            <el-menu-item :index="value.hoistory.val">
                <router-link :to="{path:value.hoistory.url}">{{value.hoistory.val}}</router-link>
            </el-menu-item>
        </el-menu-item-group>
    </el-menu>
  </div>
</template>

<script>
export default {
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath);
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
