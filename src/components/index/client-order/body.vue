<template>
<div id="orderIndex">
  <com-LeftMenu></com-LeftMenu>
  <div id="contain">
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
#orderIndex{
	height: 100%;
	display: flex;
}
#contain{
	width: 90%;
	height: 100%;
}
</style>
