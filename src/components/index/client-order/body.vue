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
        {'value': '需求单', 'name': {'url': '/client/orderIndex', 'val': '新建需求单'}, 'ing': {'url': '/client/dinging ', 'val': '未开始'}, 'now': {'url': '/client/dingyue ', 'val': '进行中'}, 'hoistory': {'url': '/client/historyding', 'val': '已完成'}},
        {'value': '执行单', 'name': {'url': '/client/Newzhi', 'val': '新执行单'}, 'ing': {'url': '/client/Campaigning ', 'val': '正在执行的'}, 'now': {'url': '/client/orderIndex', 'val': '正在订阅的'}, 'hoistory': {'url': '/client/orderIndex', 'val': '历史订阅'}}
      ]
    };
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
