<template>
<div id="orderOne">
    <com-LeftMenu :dataValue="data"></com-LeftMenu>
  <div id="contain">
    <com-AllIndustry v-if="flag"></com-AllIndustry>
    <router-view></router-view>
  </div>
</div>
</template>

<script>
import LeftMenu from './../../leftMenu/LeftMenu';
import AllIndustry from './../../allIndustry/AllIndustry';

export default {
  components: {
    comLeftMenu: LeftMenu,
    comAllIndustry: AllIndustry
  },
  data () {
    return {
      data: [
        {'value': '电消系统', 'name': {'url': '/phone/phoneList', 'val': '电话清单'}, 'now': {'url': '/client/dingyue ', 'val': '正在订阅的'}, 'hoistory': {'url': '/client/historyding', 'val': '历史订阅'}},
        {'value': '执行单', 'name': {'url': '/client/orderIndex', 'val': '下订单'}, 'now': {'url': '/client/orderIndex', 'val': '正在订阅的'}, 'hoistory': {'url': '/client/orderIndex', 'val': '历史订阅'}}
      ],
      flag: false
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
