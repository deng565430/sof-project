<template>
<div id="orderOne">
  
  <div id="contain" style="width:85%">
    <!-- <Gailan v-if="Gailan"></Gailan>
    <OrderIndex v-if="OrderIndex" @tiaozhuan="tiaozhuan"></OrderIndex>
    <Dinging :tabs2="tabs2" v-if="show"></Dinging>
    <Xinjian v-if="Xinjian"></Xinjian>
    <New :tabs2="tabs2" v-if="New"></New>
     <router-view></router-view> -->
  </div>
</div>
</template>

<script>
import LeftMenu from './../../leftMenu/orderMenu';
import Gailan from './xuqiudan/gailan';
import Dinging from './xuqiudan/daishenhe';
import OrderIndex from './xuqiudan/neworder';
import Xinjian from './zhixingdan/shaixuan';
import New from './zhixingdan/allzhixing';

export default {
  components: {
    comLeftMenu: LeftMenu,
    Dinging,
    OrderIndex,
    Gailan,
    Xinjian,
    New
  },
  data () {
    return {
      show: false,
      Gailan: false,
      Xinjian: false,
      OrderIndex: false,
      Dingyue: false,
      Historyding: false,
      New: false,
      Weizhi: false,
      Historycampaign: false,
      Campaigning: false,
      childIsShow: true,
      tabs2: 0
    };
  },
  methods: {
    tiaozhuan () {
      this.tabs2 = 0;
      console.log(this.tabs2);
    },
    changechild (data) {
      switch (data) {
        case '需求单':
          this.OrderIndex = false;
          this.show = false;
          this.Gailan = true;
          this.Xinjian = false;
          this.New = false;
          break;
        case '新建需求单':
          this.OrderIndex = true;
          this.show = false;
          this.Gailan = false;
          this.Xinjian = false;
          this.New = false;
          break;
        case '待审核':
          this.show = true;
          this.OrderIndex = false;
          this.Gailan = false;
          this.tabs2 = 0;
          this.Xinjian = false;
          this.New = false;
          break;
        case '待执行':
          this.show = true;
          this.tabs2 = 1;
          this.Gailan = false;
          this.Xinjian = false;
          // this.Dingyue = true;
          this.OrderIndex = false;
          // this.show = false;
          this.Historyding = false;
          this.New = false;
          break;
        case '执行中':
          this.show = true;
          this.tabs2 = 2;
          this.Gailan = false;
          this.Xinjian = false;
          // this.Historyding = true;
          this.OrderIndex = false;
          // this.show = false;
          this.Dingyue = false;
          this.New = false;
          break;
        case '已完成':
          this.show = true;
          this.tabs2 = 3;
          this.Gailan = false;
          this.Xinjian = false;
          this.OrderIndex = false;
          this.Dingyue = false;
          this.New = false;
          break;
        case '执行单':
          this.OrderIndex = false;
          this.show = false;
          this.Gailan = true;
          this.Xinjian = false;
          this.New = false;
          break;
        case '新执行单':
          this.Gailan = false;
          this.tabs2 = 0;
          this.Xinjian = false;
          this.New = true;
          this.OrderIndex = false;
          this.show = false;
          this.Dingyue = false;
          this.Historyding = false;
          break;
        case '未执行的':
          this.Gailan = false;
          this.Xinjian = false;
          this.tabs2 = 1;
          // this.Weizhi = true;
          this.OrderIndex = false;
          this.show = false;
          this.Dingyue = false;
          this.New = true;
          this.Historyding = false;
          break;
        case '正在执行的':
          this.Gailan = false;
          this.Xinjian = false;
          this.tabs2 = 2;
          // this.Campaigning = true;
          this.OrderIndex = false;
          this.show = false;
          this.Dingyue = false;
          this.New = true;
          break;
        case '历史执行单':
          this.Gailan = false;
          this.Xinjian = false;
          this.tabs2 = 3;
          this.OrderIndex = false;
          this.show = false;
          this.Dingyue = false;
          this.New = true;
          break;
      }
    }
  }
};
</script>


<style lang="css" scoped>
#orderOne{
	height: 100%;
	display: flex;
}
#contain{
	width: 85%;
	height: 100%;
  padding: 20px;
  box-sizing:border-box;
}
#leftMenu{
  width: 200px;
}
</style>
