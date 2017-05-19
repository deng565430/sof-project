<template>
<div class="formcontain">
		<div class="formtitle">执行订单</div>
    <!-- <ul :model="ruleForm">
      <li ><span>公司名称:</span><span>{{ruleForm.cname}}</span></li>
      <li ><span>项目名称:</span><span>{{ruleForm.name}}</span></li>
      <li ><span>需求数量:</span><span>{{ruleForm.num}}</span></li>
      <li ><span>订阅周期:</span><span>{{ruleForm.value}}-{{ruleForm.value1}}</span></li>
    </ul> -->
		<el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px" v-show='show2'>
          <el-form-item label="公司名称" prop="cname">
            <el-input v-model="ruleForm.cname"></el-input>
          </el-form-item>
          <el-form-item label="项目名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
			   <el-form-item label="需求数量" prop="num">
			    <el-input v-model="ruleForm.num" placeholder="每日电话需求量"></el-input>
			  </el-form-item>
			  <el-form-item label="订阅周期" required>
			    <el-col :span="11">
			      <el-form-item prop="date1">
			        <el-date-picker format type="date" placeholder="起始日期" v-model="ruleForm.value" style="width: 100%;"></el-date-picker>
			      </el-form-item>
			    </el-col>
			    <el-col class="line" :span="2">-</el-col>
			    <el-col :span="11">
			       <el-form-item prop="date2">
			        <el-date-picker format type="date" placeholder="结束日期" v-model="ruleForm.value1" style="width: 100%;"></el-date-picker>
			      </el-form-item>
			    </el-col>
			  </el-form-item>
        <el-form-item label="所属区域">
            <el-checkbox-group v-model="areatype">
              <el-checkbox-button id="areas" indeterminate='true' @change='changefang'>房产</el-checkbox-button>
            </el-checkbox-group>
            <!-- <label><input type='checkbox'/>房产</label> -->
            
          </el-form-item>
          <el-form-item label="物业类型" >
            <el-checkbox-group v-model="wtype">
              <el-checkbox v-for="type in wtypes"  :label="type" :key="type">{{type}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="搜索竞品">
            <el-select v-model="campaign" filterable placeholder="请选择" width=100%>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目竞品" >
            <el-tag
              v-for="tag in tags"
              :closable="true"
            >
            {{tag}}
            </el-tag>
          </el-form-item>
          <el-form-item label="扩展方式">
              <el-checkbox-group v-model="region">
                <el-checkbox label="按项目扩展" ></el-checkbox>
                <el-checkbox label="按区域扩展"></el-checkbox>
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
    console () {
      var id = decodeURI(window.location.href.split('=')[1]).replace(/\s/g, '');
      var datas = [];
      var datas2 = [];
      var datas3 = [];
      var _this = this;
      this.$ajax({
        method: 'get',
        url: '/api/campaign/getCampaignInfo?id=' + id
      }).then(function (res) {
        if (res.status === 200) {
          for (var i = 0; i < res.data.data.districts.length; i++) {
            datas[i] = res.data.data.districts[i];
          };
          for (var s = 0; s < res.data.data.types.length; s++) {
            datas2[s] = res.data.data.types[s];
          };
          for (var m = 0; m < res.data.data.projects.length; m++) {
            datas3[m] = res.data.data.projects[m].data;
          };
          if (res.data.data.address_expand === true && res.data.data.floorname_expand === true) {
            _this.region = ['按项目扩展', '按区域扩展'];
          } else if (res.data.data.address_expand === true && res.data.data.floorname_expand === false) {
            _this.region = ['按项目扩展'];
          } else if (res.data.data.address_expand === false && res.data.data.floorname_expand === true) {
            _this.region = ['按区域扩展'];
          };
          if (res.data.data.ad === true && res.data.data.kw === true) {
            _this.numtype = ['浏览数据', '搜索数据'];
          } else if (res.data.data.ad === true && res.data.data.kw === false) {
            _this.numtype = ['浏览数据'];
          } else if (res.data.data.ad === false && res.data.data.kw === true) {
            _this.numtype = ['搜索数据'];
          };
          _this.areatype = datas;
          _this.wtype = datas2;
          _this.tags = datas3;
          _this.ruleForm.cname = res.data.data.demand_side;
          _this.ruleForm.name = res.data.data.project_name;
          _this.ruleForm.num = res.data.data.phone_demand;
          _this.ruleForm.value = res.data.data.start_date;
          _this.ruleForm.value1 = res.data.data.end_date;
          _this.briefid = res.data.data.briefid;
        }
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
          console.log(_this.campaign.id);
          if (res.data.data.codes === null) {
            console.log('空');
          } else if (res.data.data.urls === null) {
            console.log('空2');
          }
        }
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
