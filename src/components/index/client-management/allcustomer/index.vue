<template>
<div >
<div class="tongji">
<h2>概览</h2>
	<ul>
		<li>
			<div>总计</div>
			<div>90个</div>
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
  <h2>统计表</h2>
  <el-tabs v-model="activeName" >
    <el-tab-pane label="立即跟进" name="first">
    	<Tables :table="table" @shuaxinlist="shuaxinlist"></Tables>
    	<Page :pagenum="pagenum" @handleSizeChanges="handleSizeChanges" @handleCurrentChanges="handleCurrentChanges"  ></Page>
    </el-tab-pane>
    <el-tab-pane label="及时关注" name="second"><Tables></Tables></el-tab-pane>
    <el-tab-pane label="时常关注" name="third"><Tables></Tables></el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
import Tables from './../table/tableone';
import Page from './../table/page';
export default {
  components: {
    Tables,
    Page
  },
  data () {
    return {
      activeName: 'first',
      table: [],
      pagenum: 0,
      start: 0,
      length: 100,
      start2: 0,
      currentPage: 1
    };
  },
  created () {
    this.getall(0, 100);
  },
  methods: {
    getall (start, length) {
      var that = this;
      that.$api.get('/api/clientbehavior/getuserclient?start=' + start + '&length=' + length).then(function (res) {
        if (res.data.code === 0) {
          that.table = res.data.data;
          that.pagenum = res.data.recordsFiltered;
        } else {
          that.$alert('请先登录！');
        }
      }).catch(() => {
        that.$alert('服务出错！');
      });
    },
    shuaxinlist () {
      this.getall(0, 100);
    },
    handleSizeChanges (val) {
      this.currentPage = 1;
      this.length = val;
      // this.changetable(this.start, this.length);
    },
    handleCurrentChanges (val) {
      this.currentPage = val + 1;
      this.start = val;
      this.changetable(this.start, 100);
    },
    changetable (start, length) {
      var that = this;
      that.$api.get('/api/clientbehavior/getuserclient?start=' + start + '&length=' + length).then(function (res) {
        if (res.data.code === 0) {
          that.table = res.data.data;
          that.pagenum = res.data.recordsFiltered;
        } else {
          that.$alert('请先登录！');
        }
      }).catch(() => {
        that.$alert('服务出错！');
      });
    }
  }
};
</script>

<style lang="css" scoped>
.tongji{
	border:1px solid #ccc;
	/* box-shadow: 0px 5px 5px #888888; */
	margin: 20px 0;
  border-radius: 5px;
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
	line-height: 35px;
	background: #20a0ff;
	color:#fff;
	padding-left: 10px;
  border-radius: 5px 5px 0 0;
}
h2 span{
	font-size: 20px;
	margin-right:5px;
}
</style>
