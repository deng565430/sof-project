<template>
<div class="formcontain">
    <!-- <el-steps :space="200" :active="active" class='lines' style="margin-bottom:40px">
      <el-step style="width:22.33%" title="基础信息" description=""></el-step>
      <el-step style="width:22.33%" title="数据规则" description=""></el-step>
      <el-step style="width:10.33%" title="生成执行单" description=""></el-step>
    </el-steps> -->
    <el-button type="text" icon="arrow-left" @click="fanhui">返回</el-button>
    <ul :model="ruleForm">
      <li style="width:50%"><span>公司名称:</span><span>{{ruleForm.cname}}</span></li>
      <li style="width:50%"><span>项目名称:</span><span>{{ruleForm.name}}</span></li>
      <li style="width:50%"><span>项目描述:</span><span>{{ruleForm.desc}}</span></li>
      <li style="width:50%"><span>需求数量:</span><span>{{ruleForm.num}}</span></li>
      <li style="width:50%"><span>订阅周期:</span><span>{{ruleForm.value}}-{{ruleForm.value1}}</span></li>
    </ul>
  
</div>
</template>

<script>

export default {
  data () {
    return {
      show: false,
      show2: true,
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
      briefid: '',
      formLabelWidth: '120px',
      id: ''
    };
  },
  created () {
    console.log(this.$parent.rowid);
    this.id = this.$parent.rowid;
    this.console();
  },
  methods: {
    fanhui () {
      this.$emit('listizhi2');
    },
    console () {
      let _this = this;
      this.$ajax({
        method: 'get',
        url: '/api/brief/getBriefById?id=' + this.id
      }).then(function (res) {
        if (res.status === 200) {
          var obj = {};
          obj.cname = res.data.data.customName;
          obj.name = res.data.data.proName;
          obj.num = res.data.data.telneedNum;
          obj.desc = res.data.data.project_description;
          obj.value = res.data.data.startTime;
          obj.value1 = res.data.data.endTime;
          _this.ruleForm = obj;
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
  margin: 0 auto;
  text-align: left;
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
/*ul {
  display: flex;
  margin:20px;
  min-height: 30px;
  background: hsla(206, 100%, 56%, 0.07);
  margin: 10px 122px;
    border-top: 1px solid #20a0ff;
  padding: 20px;
}
ul li{
  width: 25%
}*/
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
ul li span:nth-child(1){
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
