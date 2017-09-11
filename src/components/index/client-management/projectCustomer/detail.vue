<template>
<div >
<div style="text-align:left">
	<el-button type="text" @click="fanhui"><span class="el-icon-arrow-left"></span>返回</el-button>
</div>
<div class="tongji">
<h2><span>{{hanginfo.name}}</span>概览</h2>
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
<h2 ><span>{{hanginfo.name}}</span>统计表</h2>
  <el-tabs v-model="activeName"  >
    <el-tab-pane label="立即跟进" name="first">
    	<Tables :tabledata="tabledata" @shuaxinlist="shuaxinlist"></Tables>
      <Page :pagenum="pagenum"  @handleCurrentChanges="handleCurrentChanges"></Page>
    </el-tab-pane>
    <el-tab-pane label="及时关注" name="second"><Tables></Tables></el-tab-pane>
    <el-tab-pane label="时常关注" name="third"><Tables></Tables></el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
import Tables from './../table/protable';
import Page from './../table/page';
export default {
  props: ['tabledata', 'pagenum', 'hanginfo'],
  components: {
    Tables,
    Page
  },
  data () {
    return {
      activeName: 'first',
      tables: [],
      start: 0,
      pagenum: 0,
      currentPage: 0
    };
  },
  created () {
  },
  methods: {
    handleCurrentChanges (val) {
      this.currentPage = val + 1;
      this.start = val;
      this.$emit('handleCurrentChanges', val);
    },
    shuaxinlist () {
      this.$emit('shuaxinlist');
    },
    fanhui () {
      this.$emit('fanhui');
    }
  }
};
</script>

<style lang="css" scoped>
.tongji{
	border:1px solid #ccc;
	/* box-shadow: 0px 5px 5px #888888; */
	margin: 20px 0;
  margin-bottom: 40px;
  border-radius: 5px 5px 0 0;
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
	background:#20a0ff;
	color:#fff;
	padding-left: 10px;
  border-radius: 5px 5px 0 0;
}
h2 span{
	font-size: 20px;
	margin-right:5px;
}
</style>
