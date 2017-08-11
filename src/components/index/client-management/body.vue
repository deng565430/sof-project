<template>
<div class="content">
  <Search @search="search" ></Search>
  <Tables :searchValue="searchValue"></Tables>
  <Waterfall></Waterfall>
</div>
</template>

<script>
import Tables from './../../table/managementTable';
import Waterfall from './waterfall';
import Search from './search';
export default {

  name: 'clientManagement',
  components: {
    Tables,
    Waterfall,
    Search
  },
  data () {
    return {
      searchValue: []
    };
  },
  methods: {
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
}
</style>
