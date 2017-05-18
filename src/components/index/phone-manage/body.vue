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
        {'value': '电销系统', 'name': {'url': '/phone/phoneList', 'val': '电话清单'}, 'ing': {'url': '/phone/result ', 'val': '电话效果分析'}, 'now': {'url': '/phone/dingyue ', 'val': '进行中'}, 'hoistory': {'url': '/phone/historyding', 'val': '已完成'}}
      ],
      flag: false
    };
  },
  created () {
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
