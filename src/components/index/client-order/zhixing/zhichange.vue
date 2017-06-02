<template>
<div class="formcontain">
  <div style="text-align:left">
  <el-button type="text" icon="arrow-left" @click="quxiao">返回</el-button>
  </div>
    <el-steps :space="200" :active="active" class='lines' style="margin-bottom:40px">
      <el-step style="width:22.33%" title="基础信息" description=""></el-step>
      <el-step style="width:22.33%" title="数据规则" description=""></el-step>
      <el-step style="width:10.33%" title="生成执行单" description=""></el-step>
    </el-steps>
    <el-collapse accordion>
      <el-collapse-item>
        <template slot="title">
          项目需求<!-- <i class="header-icon el-icon-information"> --></i>
        </template>
        <ul :model="ruleForm">
      <li style="width:15%"><span>公司名称:</span><span>{{ruleForm.cname}}</span></li>
      <li style="width:15%"><span>项目名称:</span><span>{{ruleForm.name}}</span></li>
      <li style="width:15%"><span>需求数量:</span><span>{{ruleForm.num}}</span></li>
      <li style="width:15%"><span>项目描述:</span><span>{{ruleForm.desc}}</span></li>
      <li style="width:40%"><span>订阅周期:</span><span>{{ruleForm.value}}-{{ruleForm.value1}}</span></li>
    </ul>
      </el-collapse-item>
    </el-collapse>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px" v-show='show2' class="form1" >
        <el-form-item label="所属区域" style="margin-bottom:0">
            <el-checkbox-group v-model="areatype" class="aa">
              <el-checkbox v-for="type in areas"  :label="type" :key="type">{{type}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="物业类型" >
            <el-checkbox-group v-model="wtype" class="aa">
              <el-checkbox v-for="type in wtypes"  :label="type" :key="type">{{type}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>


          <el-form class="demo-form-inline form4" style="margin:10px 0;">
          <el-form-item label="项目竞品" style="margin-bottom:8px;" @click="blur">
            <el-autocomplete
              id='state1.id'
              class="inline-input"
              v-model="state1"
              icon="close"
              :on-icon-click="blur"
              :fetch-suggestions="querySearch"
              @select="handleSelect"
              placeholder="请输入内容"
              style="width:300px"
            ></el-autocomplete>
          </el-form-item>
        </el-form>
          <div class="tags">
            <el-tag
              v-for="tag in competag"
              :closable="true"
              :key="tag.value"
              :id="tag.id"
              @close="handleClose3(tag)"
            >
            {{tag.value}}
            </el-tag>
          </div>
        <el-form class="forms3" label-position='right'>
          <el-form-item label="扩展方式" style="margin-bottom:8px;">
              <el-checkbox-group v-model="region">
                <el-checkbox label="按楼盘名称扩展" ></el-checkbox>
                <el-checkbox label="按地区扩展"></el-checkbox>
              </el-checkbox-group>
          </el-form-item>
        </el-form>
        <el-form class="forms2" label-position='right'>
          <el-form-item label="所需数据类型" label-width="100px" > 
              <el-checkbox-group v-model="numtype">
                <el-checkbox label="浏览数据" ></el-checkbox>
                <el-checkbox label="搜索数据" ></el-checkbox>
              </el-checkbox-group>
          </el-form-item>
        </el-form>
         <el-form-item>
          <el-button @click="quxiao">取 消</el-button>
          <el-button type="primary" :loading="false" @click="submitForm()">下一步</el-button>
        </el-form-item>
    </el-form>
    <el-form label-width="80px" v-show='show' style="padding: 0 10%;" class="form5">
      <el-form-item label="文件名称" prop="zTitle">
            <el-input v-model="ruleForm.zTitle" placeholder="请输入文件名"></el-input>
          </el-form-item>
      <el-form-item label="搜索数据" :model="ruleForm" ref="ruleForm">
        <el-input type="textarea" v-model="ruleForm.ad"></el-input>
      </el-form-item>
      <el-form-item label="浏览数据" :model="ruleForm" ref="ruleForm">
        <el-input type="textarea" v-model="ruleForm.kw"></el-input>
      </el-form-item>
      <el-form-item>
          <el-button  @click="before()">上一步</el-button>
          <el-button type="primary" :loading="false" @click="submitForm2()">提交</el-button>
        </el-form-item>
    </el-form>
  
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
      competag: [],
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
      rules: {
        cname: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入项目描述', trigger: 'blur' }
        ],
        num: [
          { required: true, message: '请输入需求数量', trigger: 'change' }
        ]
      },
      formLabelWidth: '120px',
      id: ''
    };
  },
  created () {
    console.log(this.$parent.rowid);
    this.id = this.$parent.rowid;
    this.console();
    this.onloda();
    this.onloda2();
  },
  methods: {
    blur () {
      this.state1 = '';
    },
    quxiao () {
      this.$emit('listizhi2');
    },
    next () {
      if (this.active++ > 2) this.active = 0;
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
    },
    before () {
      this.show2 = true;
      this.show = false;
      if (this.active-- < 0) this.active = 2;
    },
    changes () {
      var _this = this;
      var data = [];
      var datas = [];
      this.$ajax({
        method: 'get',
        url: '/api/campaign/getTypeDistrict'
      }).then(function (res) {
        for (var i = 0; i < res.data.data.district.length; i++) {
          var obj = {};
          obj.value = res.data.data.district[i];
          data[i] = obj;
        };
        for (var s = 0; s < res.data.data.types.length; s++) {
          var objs = {};
          objs.value = res.data.data.types[s];
          datas[s] = objs;
        };
        _this.shs = data;
        _this.wuye = datas;
      });
    },
    change2 () {
      var data = this.areatype2;
      if (data !== '') {
        this.areatags.push(data);
      }
    },
    change3 () {
      var data = this.wuyetypes;
      if (data !== '') {
        this.wuyetages.push(data);
      }
    },
    handleClose (tag) {
      this.areatags.splice(this.areatags.indexOf(tag), 1);
    },
    handleClose2 (tag) {
      this.wuyetages.splice(this.wuyetages.indexOf(tag), 1);
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.indexOf(queryString.toLowerCase()) === 0);
      };
    },
    loadAll () {
      var datas = [];
      var _this = this;
      this.$ajax({
        method: 'get',
        url: '/api/campaign/getProjectName'
      }).then(function (res) {
        if (res.status === 200) {
          for (var i = 0; i < res.data.length; i++) {
            var obj = {};
            obj.value = res.data[i].value;
            obj.id = res.data[i].id;
            datas[i] = obj;
          }
          _this.restaurants = datas;
          return _this.restaurants;
        }
      });
    },
    handleClose3 (tag) {
      this.competag.splice(this.competag.indexOf(tag), 1);
    },
    handleSelect (item) {
      var data = item;
      if (data !== '' && this.competag !== []) {
        this.competag.push(data);
      }
      console.log(data);
      console.log(this.competag);
      this.state1 = '';
    },
    querySearch (queryString, cb) {
      var _this = this;
      var restaurants = _this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    changefang () {
      console.log(this.$el.id);
    },
    onloda2 () {
      var datas = [];
      var _this = this;
      this.$ajax({
        method: 'get',
        url: '/api/campaign/getProjectName'
      }).then(function (res) {
        if (res.status === 200) {
          for (let i = 0; i < res.data.length; i++) {
            var objs = {};
            objs.label = res.data[i].data;
            objs.value = res.data[i];
            datas[i] = objs;
          };
          _this.options = datas;
        }
      });
    },
    onloda () {
      var _this = this;
      var data = [];
      var datas = [];
      this.$ajax({
        method: 'get',
        url: '/api/campaign/getTypeDistrict'
      }).then(function (res) {
        for (var i = 0; i < res.data.data.district.length; i++) {
          var obj = {};
          obj = res.data.data.district[i];
          data[i] = obj;
        };
        for (var s = 0; s < res.data.data.types.length; s++) {
          var objs = {};
          objs = res.data.data.types[s];
          datas[s] = objs;
        };
        _this.areas = data;
        _this.wtypes = datas;
      });
    },
    submitForm2 () {
      var floorname = this.region;
      var address = this.region;
      var code = this.ruleForm.kw;
      var keyword = this.ruleForm.ad;
      var zTitle = this.ruleForm.zTitle;
      var nameid = [];
      var ad = this.numtype;
      var kw = this.numtype;
      floorname = false;
      address = false;
      ad = false;
      kw = false;
      for (var i = 0; i < this.region.length; i++) {
        if (this.region[i] === '按项目扩展') {
          floorname = true;
        } else if (this.region[i] === '按区域扩展') {
          address = true;
        }
      };
      for (var m = 0; m < this.competag.length; m++) {
        nameid[m] = this.competag[m].id;
      }
      for (var s = 0; s < this.numtype.length; s++) {
        if (this.numtype[s] === '浏览数据') {
          ad = true;
        } else if (this.numtype[s] === '搜索数据') {
          kw = true;
        }
      };
      var data = {
        'address_expand': address,
        'floorname_expand': floorname,
        'districts': this.areatype,
        'competing': nameid,
        'project_name': this.ruleForm.name,
        'types': this.wtype,
        'briefid': this.id,
        'ad': ad,
        'kw': kw,
        'code': code,
        'keyword': keyword,
        'zTitle': zTitle
      };
      var _this = this;
      this.$ajax({
        method: 'post',
        url: '/api/campaign/addCampaignRegularly',
        data: data
      }).then(function (res) {
        if (res.status === 200) {
          _this.show = true;
          _this.show2 = false;
          _this.$emit('linstizhi');
          if (res.data.data.codes === null) {
            console.log('空');
          } else if (res.data.data.urls === null) {
            console.log('空2');
          }
        }
      });
    },
    focus () {
      console.log('dffsafs');
    },
    submitForm () {
      var floorname = this.region;
      var address = this.region;
      var ad = this.numtype;
      var nameid = [];
      var kw = this.numtype;
      floorname = false;
      address = false;
      ad = false;
      kw = false;
      for (var i = 0; i < this.region.length; i++) {
        if (this.region[i] === '按项目扩展') {
          floorname = true;
        } else if (this.region[i] === '按区域扩展') {
          address = true;
        }
      };
      for (var m = 0; m < this.competag.length; m++) {
        nameid[m] = this.competag[m].id;
      }
      for (var s = 0; s < this.numtype.length; s++) {
        if (this.numtype[s] === '浏览数据') {
          ad = true;
        } else if (this.numtype[s] === '搜索数据') {
          kw = true;
        }
      };
      var data = {
        'ad': ad,
        'address_expand': address,
        'floorname_expand': floorname,
        'kw': kw,
        'district': this.areatype,
        'name': nameid,
        'project_name': this.ruleForm.name,
        'type': this.wtype
      };
      var _this = this;
      this.$ajax({
        method: 'post',
        url: '/api/campaign/ToView2',
        data: data
      }).then(function (res) {
        if (res.status === 200) {
          _this.show = true;
          _this.show2 = false;
          _this.ruleForm.kw = res.data.data.codes;
          _this.ruleForm.ad = res.data.data.urls;
          if (_this.active++ > 2) this.active = 0;
          console.log(_this.campaign.id);
        }
      });
    }
  },
  mounted () {
    this.restaurants = this.loadAll();
  },
  prop: ['linstizhi']
};
</script>

<style lang="css" scoped>
.formcontain{
  width:100%;
  margin: 0 auto;
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
  /*margin:20px;
  min-height: 30px;*/
  background: hsla(206, 100%, 56%, 0.07);
  /*margin: 10px 122px;*/
  /*border-top: 1px solid #20a0ff;*/
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
