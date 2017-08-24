<template>
  <div id='leftMenu'>
    <el-menu mode="vertical" :default-active="index" class="el-menu-vertical-demo" style="width: 200px" @select="handleSelect"   theme="dark" >
        <el-menu-item-group  v-for="i in indexs">
          <router-link :to="{ path: i.path }"><el-menu-item :index="i.name">{{i.name}}</el-menu-item></router-link>
        </el-menu-item-group>
    </el-menu>
  </div>
</template>

<script>
const menue = [{path: 'neworder', name: '新建需求单'}, {path: 'orders', name: '需求单'}, {path: 'campaign', name: '执行单'}];
export default {
  data () {
    return {
      indexs: menue,
      index: ''
    };
  },
  methods: {
    handleSelect (key, keyPath) {
      this.$emit('childEventIsShow', key);
      this.$emit('changechild', key);
    }
  }
};
</script>

<style lang="css" scoped>
#leftMenu a{
  color:#bfcbd9;
}
#leftMenu a:active{
  color:#20a0ff;
}
</style>
