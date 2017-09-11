<template>
<div >
<div v-if="tableishow">
	<!-- <div class="btns">
    <el-button type="primary"  @click="addPj">新建</el-button>
  </div> -->
	<div  class="tables">
	<h2>我的项目</h2>
	  <Tables :table="table"  @zhanshi="zhanshi"></Tables>
	  </div>
  </div>
  <div v-if="addPs">
    <addP  @addV="addV"></addP>
  </div>
  <div v-if="detail">
	  <detail @fanhui="fanhui" :tabledata="tabledata" :currentPage="currentPage" @shuaxinlist="shuaxinlist" :hanginfo="hanginfo" :pagenum="pagenum" @handleCurrentChanges="handleCurrentChanges"></detail>
  </div>
</div>

</template>

<script>

import Tables from './../table/tabletwo';
import Detail from './detail';
import addP from './addproject';

export default {
  components: {
    Tables,
    Detail,
    addP
  },
  data () {
    return {
      detail: false,
      tableishow: true,
      addPs: false,
      tabledata: [],
      table: [],
      pagenum: 0,
      start: 0,
      projectname: '',
      hanginfo: {},
      currentPage: 1
    };
  },
  created () {
    this.getall();
  },
  methods: {
    getall () {
      var that = this;
      that.$api.get('/api/clientbehavior/getallprocount').then(function (res) {
        that.table = res.data.data;
      });
    },
    zhanshi (val) {
      var that = this;
      var start = 0;
      var length = 100;
      var pro = val.name;
      that.projectname = val.name;
      that.hanginfo = val;
      that.$api.get('/api/clientbehavior/getuserclient?start=' + start + '&length=' + length + '&pro=' + pro).then(function (res) {
        that.tabledata = res.data.data;
        that.pagenum = res.data.recordsFiltered;
      });
      that.detail = true;
      that.tableishow = false;
    },
    addPj () {
      this.tableishow = false;
      this.addPs = true;
    },
    addV (val) {
      this.addPs = false;
      this.tableishow = true;
    },
    shuaxinlist () {
      var that = this;
      that.$api.get('/api/clientbehavior/getuserclient?start=' + that.start + '&length=' + 100 + '&pro=' + that.projectname).then(function (res) {
        that.tabledata = res.data.data;
        that.pagenum = res.data.recordsFiltered;
      });
    },
    handleCurrentChanges (val) {
      var that = this;
      that.start = val;
      that.$api.get('/api/clientbehavior/getuserclient?start=' + val + '&length=' + 100 + '&pro=' + that.projectname).then(function (res) {
        that.tabledata = res.data.data;
        that.pagenum = res.data.recordsFiltered;
      });
    },
    fanhui () {
      this.tableishow = true;
      this.detail = false;
    }
  }
};
</script>

<style lang="css" scoped>
.tables{
	border: 1px solid #ccc;
  border-radius: 5px 5px 0 0;
}
h2{
	text-align: left;
	line-height: 35px;
	background: #20a0ff;
	color:#fff;
	padding-left: 10px;
  border-radius: 5px 5px 0 0; 
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
