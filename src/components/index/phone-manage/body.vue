<template>
<div id="orderOne">
  <com-LeftMenu :dataValue="data"></com-LeftMenu>
  <div id="contain">
    <router-view></router-view>
  </div>
</div>
</template>

<script>
import LeftMenu from './../../leftMenu/LeftMenu';

export default {
  components: {
    comLeftMenu: LeftMenu
  },
  data () {
    return {
      data: [
        {'value': '电话查看', 'name': {'url': '/phone/orderIndex', 'val': '项目跟进'}, 'now': {'url': '/client/dingyue ', 'val': '正在订阅的'}, 'hoistory': {'url': '/client/historyding', 'val': '历史订阅'}},
        {'value': '执行单', 'name': {'url': '/client/orderIndex', 'val': '下订单'}, 'now': {'url': '/client/orderIndex', 'val': '正在订阅的'}, 'hoistory': {'url': '/client/orderIndex', 'val': '历史订阅'}}
      ]
    };
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #orderOne
    height: 100%
    display: flex
    #contain
      width: 90%
      height: 100%
      padding: 20px
      box-sizing: border-box
</style>
