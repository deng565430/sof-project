<template>
<div id="orderOne">
    <LeftMenu :dataValue="data" :childIsShow="childIsShow" @childEventIsShow="childEventIsShow"/>
  <div id="contain">
    <AllIndustry v-if="flag" />
    <PhoneList v-if="PhoneList" />
    <PhoneResult v-if="PhoneResult" />
    <router-view></router-view>
  </div>
</div>
</template>

<script>
import LeftMenu from './../../leftMenu/LeftMenu';
import AllIndustry from './../../allIndustry/AllIndustry';
import PhoneList from './PhoneList';
import PhoneResult from './PhoneResult';

export default {
  components: {
    LeftMenu,
    AllIndustry,
    PhoneList,
    PhoneResult
  },
  data () {
    return {
      data: [
        {'value': '电销系统', 'name': {'url': '', 'val': '电话清单'}, 'ing': {'url': '', 'val': '电话效果分析'}, 'now': {'url': '', 'val': '电话质量分析'}, 'hoistory': {'url': '', 'val': '已完成'}}
      ],
      flag: false,
      childIsShow: false,
      PhoneList: false,
      PhoneResult: false
    };
  },
  created () {
  },
  methods: {
    childEventIsShow (data) {
      switch (data) {
        case '1':
          this.PhoneList = true;
          this.PhoneResult = false;
          break;
        case '2':
          this.PhoneResult = true;
          this.PhoneList = false;
          break;
        case '3':
          break;
        case '4':
          break;
      }
    }
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
