<template>
<div class="formcontain">
    <el-steps :space="200" :active="active" class='lines'>
      <el-step style="width:33.33%" title="基础信息" description=""></el-step>
      <el-step style="width:33.33%" title="数据规则" description=""></el-step>
      <el-step style="width:10.33%" title="生成执行单" description=""></el-step>
    </el-steps>
    <ul :model="ruleForm">
      <li style="width:15%"><span>公司名称:</span><span>{{ruleForm.cname}}</span></li>
      <li style="width:15%"><span>项目名称:</span><span>{{ruleForm.name}}</span></li>
      <li style="width:15%"><span>需求数量:</span><span>{{ruleForm.num}}</span></li>
      <li style="width:40%"><span>订阅周期:</span><span>{{ruleForm.value}}-{{ruleForm.value1}}</span></li>
    </ul>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px" v-show='show2' class="form1">
        <el-form-item label="所属区域" >
            <el-checkbox-group v-model="areatype" class="aa">
              <el-checkbox v-for="type in areas"  :label="type" :key="type">{{type}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="物业类型" >
            <el-checkbox-group v-model="wtype" class="aa">
              <el-checkbox v-for="type in wtypes"  :label="type" :key="type">{{type}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>


          <el-form class="demo-form-inline forms2">
          <el-form-item label="项目竞品">
            <el-autocomplete
              id='state1.id'
              class="inline-input"
              v-model="state1"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              @select="handleSelect"
            ></el-autocomplete>
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
          </el-form-item>
        </el-form>


          <el-form-item label="扩展方式">
              <el-checkbox-group v-model="region">
                <el-checkbox label="按楼盘名称扩展" ></el-checkbox>
                <el-checkbox label="按地区扩展"></el-checkbox>
              </el-checkbox-group>
          </el-form-item>
          <el-form-item label="所需数据类型" label-width="100px">
              <el-checkbox-group v-model="numtype">
                <el-checkbox label="浏览数据" ></el-checkbox>
                <el-checkbox label="搜索数据" ></el-checkbox>
              </el-checkbox-group>
          </el-form-item>
         <el-form-item>
          <el-button ><router-link to="/client/dinging">取 消</router-link></el-button>
          <el-button type="primary" :loading="false" @click="submitForm()">下一步</el-button>
        </el-form-item>
    </el-form>
    <el-form label-width="80px" v-show='show'>
      <el-form-item label="文件名称" prop="zTitle">
            <el-input v-model="ruleForm.zTitle"></el-input>
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
      competag: [{
        'value': '',
        'id': ''
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
      formLabelWidth: '120px'
    };
  },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.console();
    this.onloda();
    this.onloda2();
  },
  methods: {

    next () {
      if (this.active++ > 2) this.active = 0;
    },
    console () {
      let _this = this;
      var id = decodeURI(window.location.href.split('=')[1]).replace(/\s/g, '');
      this.$ajax({
        method: 'get',
        url: '/api/brief/getBriefById?id=' + id
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
            obj.value = res.data[i].data;
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
      console.log(data);
      if (data !== '') {
        this.competag.push(data);
      }
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
      console.log(this.state1);
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
      var id = decodeURI(window.location.href.split('=')[1]).replace(/\s/g, '');
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
        'briefid': id,
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
          if (res.data.data.codes === null) {
            console.log('空');
          } else if (res.data.data.urls === null) {
            console.log('空2');
          }
        }
      });
    },
    submitForm () {
      var floorname = this.region;
      var address = this.region;
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
        'name': [this.campaign.id],
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
          if (res.data.data.codes === null) {
            console.log('空');
          } else if (res.data.data.urls === null) {
            console.log('空2');
          }
        }
      });
    }
  },
  mounted () {
    this.restaurants = this.loadAll();
  }
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
  padding:0 100px;
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
  display: flex;
  margin:20px
}
ul li{
  width: 25%
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
  width: 280px;
}
</style>
