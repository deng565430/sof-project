<template>
<div id="vipindex">
  <div v-if="tableishow">
	<!-- <div class="btns">
    <el-button type="primary" @click="addVip">增加VIP客户</el-button>
  </div> -->
	<div  class="tables">
		<h2>我的VIP客户表</h2>
	  	<Tables :viptable="viptable" @shuaxinlist="shuaxinlist"></Tables>
      <Page :pagenum="pagenum"  @handleCurrentChanges="handleCurrentChanges"  ></Page>
    </div>
  </div>
  <div v-if="addvip">
  	<AddVip @addV="addV"></AddVip>
  </div>
  <div v-if="detail">
	<detail></detail>
  </div>
</div>

</template>

<script>

import Tables from './../table/tablevip';
import Detail from './detail';
import AddVip from './addVip';
import Page from './../table/page';

export default {
  components: {
    Tables,
    Detail,
    AddVip,
    Page
  },
  data () {
    return {
      detail: false,
      tableishow: true,
      activeName: 'first',
      addvip: false,
      viptable: [],
      start: 0,
      pagenum: 0
    };
  },
  created () {
    this.gettable(0, 100);
  },
  methods: {
    shuaxinlist () {
      this.gettable(0, 100);
    },
    gettable (start, length) {
      var that = this;
      that.$api.get('/api/clientbehavior/getvip?start=' + start + '&length=' + length).then((res) => {
        that.viptable = res.data.data;
        that.pagenum = res.data.recordsFiltered;
      });
    },
    addV (val) {
      this.addvip = false;
      this.tableishow = true;
    },
    addVip () {
      this.tableishow = false;
      this.addvip = true;
    },
    zhanshi () {
      this.detail = true;
      this.tableishow = false;
    },
    handleCurrentChanges (val) {
      this.currentPage = val + 1;
      this.start = val;
      this.gettable(this.start, 100);
    }
  }
};
</script>

<style lang="css">
#vipindex .tables{
	border: 1px solid #ccc;
  border-radius: 5px;
}
#vipindex h2{
	text-align: left;
	line-height: 35px;
	background: #00b52f;
	color:#fff;
	padding-left: 10px;
}
#vipindex .btns{
	text-align: left;
	margin-bottom: 30px
}
#vipindex .el-button--primary{
	background-color: #eaa526;
	border-color:#eaa526;
}
#vipindex .tongji{
	border:1px solid #ccc;
	/* box-shadow: 0px 5px 5px #888888; */
	margin: 20px 0;
}
/* #vipindex ul{
  display: flex; 
  margin:10px;
}
#vipindex ul li {
  width: 25%;
  text-align: center;
}
#vipindex ul li  div{
  line-height: 30px
} */
.el-tabs{
	border: 1px solid #ccc
}
#vipindex .el-tabs__header{
	margin:0;
}
#vipindex h2{
	text-align: left;
	line-height: 35px;
	background: #20a0ff;
	color:#fff;
	padding-left: 10px;
  border-radius: 5px 5px 0 0;
}
#vipindex h2 span{
	font-size: 20px;
	margin-right:5px;
}
#vipindex .el-tabs__content{
	padding: 15px
}
</style>
