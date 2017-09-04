<template>
<div>
  <div v-if="tableishow">
	<div class="btns">
		<el-button type="primary" @click="addVip">增加VIP客户</el-button>
	</div>
	<div  class="tables">
		<h2>我的VIP客户表</h2>
	  	<Tables @zhanshi="zhanshi"></Tables>
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

import Tables from './../table/tableone';
import Detail from './detail';
import AddVip from './addVip';

export default {
  components: {
    Tables,
    Detail,
    AddVip
  },
  data () {
    return {
      detail: false,
      tableishow: true,
      activeName: 'first',
      addvip: false
    };
  },
  methods: {
    addV (val) {
      console.log(val);
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
	line-height: 35px;
	background: #00b52f;
	color:#fff;
	padding-left: 10px;
}
h2 span{
	font-size: 20px;
	margin-right:5px;
}
.el-tabs__content{
	padding: 15px
}
</style>
