<template>
<div id="orderOne">
  <com-LeftMenu></com-LeftMenu>
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
