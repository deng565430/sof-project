<template>
<div >
<div v-if="tableishow">
	<div class="btns">
		<el-button type="primary">新增项目客户</el-button>
	</div>
	<div  class="tables">
	<h2>我的项目客户表</h2>
	  <Table @zhanshi="zhanshi"></Table>
	  </div>
  </div>
  <div v-if="detail">
	<detail></detail>
  </div>
</div>

</template>

<script>

import Table from './../table/tabletwo';
import Detail from './detail';
export default {
  components: {
    Table,
    Detail
  },
  data () {
    return {
      detail: false,
      tableishow: true
    };
  },
  methods: {
    zhanshi () {
      this.detail = true;
      this.tableishow = false;
    }
  }
};
</script>

<style lang="css" scoped>
.tables{
	border: 1px solid #ccc;
}
h2{
	text-align: left;
	line-height: 35px;
	background: #00b52f;
	color:#fff;
	padding-left: 10px;
}
.btns{
	text-align: left;
	margin-bottom: 30px
}
.el-button--primary{
	background-color: #eaa526;
	border-color:#eaa526;
}
</style>
