<template>
<div >
<div class="tongji">
<h2><span>国贸天悦</span>概览</h2>
	<ul>
		<li>
			<div>总计</div>
			<div>30个</div>
		</li>
		<li>
			<div>立即跟进</div>
			<div>30个</div>
		</li>
		<li>
			<div>及时关注</div>
			<div>30个</div>
		</li>
		<li>
			<div>时常关注</div>
			<div>30个</div>
		</li>
	</ul>
</div>
<h2><span>国贸天悦</span>统计表</h2>
  <el-tabs v-model="activeName"  >
    <el-tab-pane label="立即跟进" name="first">
    	<Table></Table>
    </el-tab-pane>
    <el-tab-pane label="及时关注" name="second"><Table></Table></el-tab-pane>
    <el-tab-pane label="时常关注" name="third"><Table></Table></el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
import Table from './../table/tableone';
export default {
  components: {
    Table
  },
  data () {
    return {
      activeName: 'first'
    };
  },
  methods: {
  }
};
</script>

<style lang="css" scoped>
.tongji{
	border:1px solid #ccc;
	/* box-shadow: 0px 5px 5px #888888; */
	margin: 20px 0;
}
ul{
	display: flex; 
	margin:10px;
}
ul li {
	width: 25%;
	text-align: center;
}
ul li  div{
	line-height: 30px
}
.el-tabs{
	border: 1px solid #ccc
}
.el-tabs__header{
	margin:0;
}
h2{
	text-align: left;
	line-height: 40px;
	background: #00b52f;
	color:#fff;
	padding-left: 10px;
}
h2 span{
	font-size: 20px;
	margin-right:5px;
}
</style>
