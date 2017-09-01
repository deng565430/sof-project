<template>
<div style="display:flex">
  <LeftMenu></LeftMenu>
  <div class="content">
  <router-view></router-view>
  </div>
</div>
</template>

<script>
import {isLoginMixin} from 'assets/js/mixin';
import LeftMenu from './../../leftMenu/managementMenu';
import Tables from './../../table/managementTable';
import Waterfall from './waterfall';
import Search from './search';
import searchkehu from './searchkehu';
import {scrollBarInit} from 'assets/js/dataslider';
export default {
  mixins: [isLoginMixin],
  name: 'clientManagement',
  components: {
    LeftMenu,
    Tables,
    Waterfall,
    Search,
    searchkehu
  },
  data () {
    return {
      searchValue: [],
      value4: 1,
      max: 31,
      min: 1
    };
  },
  methods: {
    formatTooltip (val) {
      val = this.value4;
      var datas = scrollBarInit();
      if (val < 10) {
        val = '0' + val;
      }
      val = datas + val;
      console.log(val);
      return val;
    },
    // 搜索查询
    search (val, val2) {
      // this.getTable(this.tabs3, this.currentPage4 - 1, this.pageSize, this.tabName, val, val2);
    }
  }
};
</script>

<style lang="css" scoped>
body{
	position: relative;
}
.content{
	width:80%;
	margin:0 auto;
  margin: 20px 
}
</style>
