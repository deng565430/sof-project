<template>
<div class="formcontain">
  <div style="text-align:left">
  <el-button type="text" icon="arrow-left" @click="quxiao">返回</el-button>
  </div><!-- 
    <el-steps :space="200" :active="active" class='lines' style="margin-bottom:40px">
      <el-step style="width:22.33%" title="基础信息" description=""></el-step>
      <el-step style="width:22.33%" title="数据规则" description=""></el-step>
      <el-step style="width:10.33%" title="修改成功" description=""></el-step>
    </el-steps> -->
    <ul :model="ruleForm">
      <li style="width:15%"><span>公司名称:</span><span>{{ruleForm.cname}}</span></li>
      <li style="width:15%"><span>项目名称:</span><span>{{ruleForm.name}}</span></li>
      <li style="width:15%"><span>需求数量:</span><span>{{ruleForm.num}}</span></li>
      <li style="width:15%"><span>项目描述:</span><span>{{ruleForm.desc}}</span></li>
      <li style="width:40%"><span>订阅周期:</span><span>{{ruleForm.value}}-{{ruleForm.value1}}</span></li>
      <li style="width:15%"><span>所属区域:</span><span v-for="val in areas">{{val}}</span></li>
      <li style="width:15%"><span>物业类型:</span><span v-for="val in wtype">{{val}}</span></li>
      <li style="width:15%"><span>项目竞品:</span><span>{{ruleForm.desc}}</span></li>
      <li style="width:15%"><span>扩展方式:</span><span v-for="val in region">{{val}}</span></li>
      <li style="width:15%"><span>所需数据类型:</span><span v-for="val in numtype">{{val}}</span></li>
    </ul>
  
</div>
</template>

<script>
export default {
  data () {
    return {
      state1: '',
      active: 1,
      loading: false,
      show: false,
      show2: true,
      competag: [{
        'id': '',
        'value': ''
      }],
      ruleForm: {
        cname: '',
        name: '',
        num: '',
        desc: '',
        value: '',
        value1: '',
        kw: '',
        ad: '',
        zTitle: ''
      },
      region: [],
      numtype: [],
      campaign: '',
      options: [{
        value: '',
        label: ''
      }],
      briefid: '',
      tags: [],
      areas: [],
      areatype: [],
      wtypes: [],
      wtype: [],
      formLabelWidth: '120px',
      id: ''
    };
  },
  created () {
    this.id = this.$parent.rowid;
    this.console2();
  },
  methods: {
    quxiao () {
      this.$emit('listizhi2');
    },
    console2 () {
      var _this = this;
      this.$ajax({
        method: 'get',
        url: '/api/campaign/getCampaignInfo?id=' + this.id
      }).then(function (res) {
        if (res.status === 200) {
          console.log(res);
          _this.areatype = res.data.data.districts;
          _this.wtype = res.data.data.types;
          if (res.data.data.projects !== []) {
            _this.competag = res.data.data.projects;
          }
          _this.ruleForm.cname = res.data.data.demand_side;
          _this.ruleForm.name = res.data.data.project_name;
          _this.ruleForm.desc = res.data.data.project_description;
          _this.ruleForm.num = res.data.data.phone_demand;
          _this.ruleForm.value = res.data.data.start_date;
          _this.ruleForm.value1 = res.data.data.end_date;
          _this.briefid = res.data.data.briefid;
          _this.areas = res.data.data.districts;
          _this.wtype = res.data.data.types;
          if (res.data.data.address_expand === true && res.data.data.floorname_expand === true) {
            _this.region = ['按楼盘名称扩展', '按地区扩展'];
          } else if (res.data.data.address_expand === true && res.data.data.floorname_expand === false) {
            _this.region = ['按地区扩展'];
          } else if (res.data.data.address_expand === false && res.data.data.floorname_expand === true) {
            _this.region = ['按楼盘名称扩展'];
          };
          if (res.data.data.ad === true && res.data.data.kw === true) {
            _this.numtype = ['浏览数据', '搜索数据'];
          } else if (res.data.data.ad === true && res.data.data.kw === false) {
            _this.numtype = ['浏览数据'];
          } else if (res.data.data.ad === false && res.data.data.kw === true) {
            _this.numtype = ['搜索数据'];
          };
        }
      });
    }
  },
  prop: ['linstizhi']
};
</script>

<style lang="css" scoped>
.formcontain{
  width:100%;
  margin: 0 auto
}
.formcontain a{
    display: inline-block;
    color: #fff
}
.form1{
  padding:0 110px;
}
.addmore{
  position: absolute;
  top: 0;
  right: -100px
}
.dataselect{
  width:80%;
}
.tip{
  height: 100px;
  width: 400px;
  border: 1px dashed #ccc;
  font-size: 14px;
  padding: 10px;
  box-sizing:border-box;
}
.formtitle{
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  font-family:"PingFang SC";
}
.caozuo button:nth-child(2){
  background: #ccc;
  border: 1px solid #ccc
}
.caozuo button a{
  color: #fff;
  display: inline-block;
}
.el-button--default a{
  color: #ccc
}
.el-button--default a:hover{
  color: #20a0ff
}
ul {
  margin:20px;
  min-height: 30px;
  background: hsla(206, 100%, 56%, 0.07);
  margin: 10px 122px;
  border-top: 1px solid #20a0ff;
  padding: 20px;
}
ul li{
  margin-bottom: 10px;
  width: 100% !important;
  text-align: left;
}
ul li span{
  margin-right: 8px;
}
.aa{
      padding: 10px 0;
    border-bottom: 1px solid #ccc;/*
    border-top: 1px solid #ccc;*/
}
.el-checkbox-button__inner{
  border:0px;
}
.forms2{
  /*width: 280px;*/
}
.form5 .el-form-item{
  margin-bottom: 20px !important;
}
.forms3{
  /*width: 320px;*/
  padding-left: 14px;
}
.tags{
  text-align: left;
  margin-left: 80px
  /*position: absolute;
    top: 44px;*/
}
.tags span{
  margin-right: 10px;
  margin-bottom: 10px;
}
.form4{
  /*width: 400px;*/
  padding: 0 13px;
  padding-right: 60%;
  position: relative;
  margin-bottom: 30px
}
</style>
