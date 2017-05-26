<template>
<div id="orderOne">
  <com-LeftMenu :dataValue="data" :childIsShow="childIsShow" @changechild="changechild"></com-LeftMenu>
  <div id="contain">
    <OrderIndex v-if="OrderIndex"></OrderIndex>
    <Dinging v-if="show"></Dinging>
    <Dingyue v-if="Dingyue"></Dingyue>
    <Historyding v-if="Historyding"></Historyding>

    <New v-if="New"></New>
    <Weizhi v-if="Weizhi"></Weizhi>
    <Historycampaign v-if="Historycampaign"></Historycampaign>
    <Campaigning v-if="Campaigning"></Campaigning>


    <router-view></router-view>
  </div>
</div>
</template>

<script>
import LeftMenu from './../../leftMenu/LeftMenu';
import Dinging from './dinging';
import OrderIndex from './OrderIndex';
import Dingyue from './dingyue';
import Historyding from './historyding';

import New from './zhixing/new';
import Weizhi from './zhixing/weizhi';
import Historycampaign from './zhixing/historycampaign';
import Campaigning from './zhixing/campaigning';

export default {
  components: {
    comLeftMenu: LeftMenu,
    Dinging,
    OrderIndex,
    Dingyue,
    Historyding,
    New,
    Weizhi,
    Historycampaign,
    Campaigning
  },
  data () {
    return {
      data: [
        {'value': '需求单', 'name': {'url': '', 'val': '新建需求单'}, 'ing': {'url': '', 'val': '未开始'}, 'now': {'url': '', 'val': '进行中'}, 'hoistory': {'url': '', 'val': '已完成'}},
        {'value': '执行单', 'name': {'url': '', 'val': '新执行单'}, 'ing': {'url': '', 'val': '未执行的'}, 'now': {'url': '', 'val': '正在执行的'}, 'hoistory': {'url': '', 'val': '历史执行单'}}
      ],
      show: false,
      OrderIndex: false,
      Dingyue: false,
      Historyding: false,
      New: false,
      Weizhi: false,
      Historycampaign: false,
      Campaigning: false,
      childIsShow: false
    };
  },
  methods: {
    changechild (data) {
      switch (data) {
        case '新建需求单':
          this.OrderIndex = true;
          this.show = false;
          this.Dingyue = false;
          this.Historyding = false;
          this.New = false;
          this.Weizhi = false;
          this.Historycampaign = false;
          this.Campaigning = false;
          break;
        case '未开始':
          this.show = true;
          this.OrderIndex = false;
          this.Dingyue = false;
          this.Historyding = false;
          this.New = false;
          this.Weizhi = false;
          this.Historycampaign = false;
          this.Campaigning = false;
          break;
        case '进行中':
          this.Dingyue = true;
          this.OrderIndex = false;
          this.show = false;
          this.Historyding = false;
          this.New = false;
          this.Weizhi = false;
          this.Historycampaign = false;
          this.Campaigning = false;
          break;
        case '已完成':
          this.Historyding = true;
          this.OrderIndex = false;
          this.show = false;
          this.Dingyue = false;
          this.New = false;
          this.Weizhi = false;
          this.Historycampaign = false;
          this.Campaigning = false;
          break;
        case '新执行单':
          this.New = true;
          this.OrderIndex = false;
          this.show = false;
          this.Dingyue = false;
          this.Historyding = false;
          this.Weizhi = false;
          this.Historycampaign = false;
          this.Campaigning = false;
          break;
        case '未执行的':
          this.Weizhi = true;
          this.OrderIndex = false;
          this.show = false;
          this.Dingyue = false;
          this.New = false;
          this.Historyding = false;
          this.Historycampaign = false;
          this.Campaigning = false;
          break;
        case '正在执行的':
          this.Campaigning = true;
          this.OrderIndex = false;
          this.show = false;
          this.Dingyue = false;
          this.New = false;
          this.Weizhi = false;
          this.Historycampaign = false;
          this.Historyding = false;
          break;
        case '历史执行单':
          this.Historycampaign = true;
          this.OrderIndex = false;
          this.show = false;
          this.Dingyue = false;
          this.New = false;
          this.Weizhi = false;
          this.Historyding = false;
          this.Campaigning = false;
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
	width: 90%;
	height: 100%;
  padding: 20px;
  box-sizing:border-box;
}
</style>
