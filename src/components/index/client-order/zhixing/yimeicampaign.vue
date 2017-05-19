<template>
<div class="formcontain">
    <!-- <ul :model="ruleForm">
      <li ><span>公司名称:</span><span>{{ruleForm.cname}}</span></li>
      <li ><span>项目名称:</span><span>{{ruleForm.name}}</span></li>
      <li ><span>需求数量:</span><span>{{ruleForm.num}}</span></li>
      <li ><span>订阅周期:</span><span>{{ruleForm.value}}-{{ruleForm.value1}}</span></li>
    </ul> -->
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px" v-show='show2'>
          <el-form-item label="所属数据类型">
              <el-checkbox-group v-model="numtype">
                <el-checkbox label="线上数据" ></el-checkbox>
                <el-checkbox label="线下数据"></el-checkbox>
              </el-checkbox-group>
          </el-form-item>
          <el-form-item label="" label-width="100px">
              <el-checkbox-group v-model="numtype1">
                <el-checkbox label="论坛社区" ></el-checkbox>
                <el-checkbox label="医美网站" ></el-checkbox>
                <el-checkbox label="搜索词" ></el-checkbox>
              </el-checkbox-group>
          </el-form-item>
         <el-form-item label="" label-width="100px">
              <el-checkbox-group v-model="numtype2">
                <el-checkbox label="娱乐场所" ></el-checkbox>
                <el-checkbox label="生活场所" ></el-checkbox>
              </el-checkbox-group>
          </el-form-item>
         <el-form-item label="" label-width="100px">
              <el-checkbox-group v-model="numtype3">
                <el-checkbox label="搜索量" ></el-checkbox>
                <el-checkbox label="竞价" ></el-checkbox>
                <el-checkbox label="转化率" ></el-checkbox>
                <el-checkbox label="综合排名" ></el-checkbox>
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
      loading: false,
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
      region: [],
      numtype: [],
      numtype1: [],
      numtype2: [],
      numtype3: [],
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
  },
  methods: {
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
    before () {
      this.show2 = true;
      this.show = false;
    },
    submitForm2 () {
      var id = decodeURI(window.location.href.split('=')[1]).replace(/\s/g, '');
      var floorname = this.region;
      var address = this.region;
      var code = this.ruleForm.kw;
      var keyword = this.ruleForm.ad;
      var zTitle = this.ruleForm.zTitle;
      var name = [];
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
      for (var m = 0; m < this.campaign.length; i++) {
        name[i] = this.campaign[i].id;
        return name;
      };
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
        'competing': [this.campaign.id],
        'project_name': this.ruleForm.name,
        'types': this.wtype,
        'briefid': this.briefid,
        'id': id,
        'ad': ad,
        'kw': kw,
        'code': code,
        'keyword': keyword,
        'zTitle': zTitle
      };
      var _this = this;
      this.$ajax({
        method: 'post',
        url: '/api/campaign/updateCampaign',
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
      var _this = this;
      for (var i = 0; i < _this.numtype1.length; i++) {
        if (_this.numtype1[i] === '论坛社区') {
          _this.numtype1[i] = 'note';
        } else if (_this.numtype1[i] === '医美网站') {
          _this.numtype1[i] = 'ind';
        } else if (_this.numtype1[i] === '搜索词') {
          _this.numtype1[i] = 'kw';
        }
      }
      console.log(this.numtype1);
      var data = {
        'kw': this.numtype3,
        'option': false,
        'type': this.numtype1
      };
      this.$ajax({
        method: 'post',
        url: '/api/beauty/getAllCampaign',
        data: data
      }).then(function (res) {
        if (res.status === 200) {}
      });
    }
  }
};
</script>

<style lang="css" scoped>
.formcontain{
  width:400px;
  margin: 0 auto
}
.formcontain a{
    display: inline-block;
    color: #fff
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
  display: flex
}


.el-checkbox-button__inner{
  border:0px;
}

</style>
