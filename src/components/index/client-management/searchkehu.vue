<template>
<div class="contents">

  <h2>条件搜索</h2>
  <el-form ref="form" :model="form" label-width="100px" class="forms">
  <div style="display:flex;margin-bottom:15px">
    <el-form-item label="行业选择">
    <el-select v-model="form.region" @change="hangyechange"  placeholder="请选行业">
      <el-option 
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
      {{item.label}}
      </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="区域选择" >
    <el-cascader
      expand-trigger="hover"
      :options="form.options"
      v-model="form.selectedOptions2"
      @change="handleChange">
    </el-cascader>
  </el-form-item>
  <el-form-item label="项目名称">
    <el-select
     v-model="form.name"
     filterable 
     placeholder="项目名称">
    <el-option
      v-for="item in projectname"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </el-form-item>
  <el-row :gutter="20">
    <el-col :span="16">
      <el-form-item label="选择时间"  required>
        <Time  :dates="form.dates" v-model='form.data'  ></Time>
      </el-form-item>
    </el-col>
  </el-row>
  </div>
  <el-form-item label="客户源">
    <el-radio-group v-model="form.resource" @change="qiehuan(form.resource)">
      <el-radio label="按阶段分类"></el-radio>
      <el-radio label="按属性分类"></el-radio>
      <el-radio label="按具体ID"></el-radio>
    </el-radio-group>
  </el-form-item>
  <div v-if="phone">
  <el-form-item label="QQ号" >
    <el-input v-model="form.phone" placeholder="格式:QQ号 / QQ号"></el-input>
    <span>（格式：如您需要多个搜索,号码之间请用"/"隔开）</span>
  </el-form-item>
  <el-form-item label="手机号">
    <el-input v-model="form.phones" placeholder="格式:电话号码 / 电话号码"></el-input>
    <span>（格式：如您需要多个搜索,号码之间请用"/"隔开）</span>
  </el-form-item>
  <el-form-item label="微信号">
    <el-input v-model="form.phones" placeholder="格式:微信号 / 微信号"></el-input>
    <span>（格式：如您需要多个搜索,号码之间请用"/"隔开）</span>
  </el-form-item>
  </div>
  <el-form-item label="" v-if="kehuyuan">
    <el-radio-group v-model="form.kehuyuan">
      <el-radio label="动机"></el-radio>
      <el-radio label="意向"></el-radio>
      <el-radio label="行动"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item >
  <div v-if="shaixuan"  style="margin-bottom:20px">
    <Saixuan @biaoqian="biaoqian"></Saixuan>
   </div>
    <div style="text-align:center">
    <el-button type="primary" @click="onSubmit">搜索</el-button>
    <el-button>取消</el-button>
    </div>
  </el-form-item>
</el-form>

<div>  
</div >


  


</div>
</template>

<script>
import Time from '../../timeSelect/ordertime';
import Saixuan from './search/shaixuan';
export default {
  components: {
    Time,
    Saixuan
  },
  name: 'clientManagement',
  data () {
    return {
      form: {
        name: '',
        phone: '',
        region: '',
        date: '',
        date2: '',
        dates: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        kehuyuan: '',
        options: [{
          value: '',
          label: '',
          children: []
        }],
        selectedOptions2: []
      },
      phone: false,
      kehuyuan: false,
      options: [],
      projectname: [],
      loading: false,
      shaixuan: false,
      biaoqians: []
    };
  },
  created () {
    this.gethangye();
    this.getprojectname();
  },
  methods: {
    biaoqian (val) {
      console.log(val);
      this.biaoqians = val;
    },
    timechange () {
      console.log(this.form.data);
    },
    // 搜索查询
    onSubmit (val, val2) {
      console.log('149', this.biaoqians);
      /* var data = {
        'prov_code': prov,
        'city_code': city,
        'ind_code': indcode,
        'codes': [],
        'project': project,
        'time': time,
        'values': {
          'phone': phone,
          'qq': qq,
          'wechat': wechat
        },
        'kw': kw,
        'start': start,
        'length': length
      } */
      var data = {
        'prov_code': 'sh',
        'city_code': 'sh',
        'ind_code': 'i01',
        'codes': this.biaoqians,
        'project': '医美',
        'start_time': '2017-03-24',
        'end_time': '2017-09-24',
        'values': {
          'phone': '',
          'qq': '',
          'wechat': ''
        },
        'kw': '',
        'start': '0',
        'length': '10'
      };
      this.getgrade(data);
    },
    getgrade (data) {
      this.$api.post('/api/clientbehavior/getgrade', data).then(function (res) {
        console.log(res.data.data);
      })
      .catch(() => {
        alert('服务出错！');
      });
    },
    qiehuan (val) {
      if (val === '按阶段分类') {
        this.phone = false;
        this.kehuyuan = true;
        this.shaixuan = false;
      } else if (val === '按具体ID') {
        this.kehuyuan = false;
        this.phone = true;
        this.shaixuan = false;
      } else {
        this.kehuyuan = false;
        this.phone = false;
        this.shaixuan = true;
      }
    },
    hangyechange () {
      console.log(this.form.region);
      this.getarea(this.form.region);
    },
    // 获取行业
    gethangye () {
      var _this = this;
      _this.$api.get('/api/clientbehavior/getindcode').then(function (res) {
        if (res.data.code === 0) {
          var datas = [];
          for (var i = 0; i < res.data.data.length; i++) {
            var obj = {};
            obj.value = res.data.data[i].code;
            obj.label = res.data.data[i].name;
            datas[i] = obj;
          }
          _this.options = datas;
        }
      });
    },
    // 获取行业对应的区域
    getarea (val) {
      var indcode = val;
      var that = this;
      that.$api.get('/api/clientbehavior/getcity/' + indcode).then(function (res) {
        if (res.data.code === 0) {
          console.log(res.data.data);
          var data = [];
          for (var i = 0; i < res.data.data.prov.length; i++) {
            var obj = {};
            obj.children = [];
            obj.value = res.data.data.prov[i].code;
            obj.label = res.data.data.prov[i].name;
            for (var s = 0; s < res.data.data.city[i].length; s++) {
              var obj2 = {};
              obj2.value = res.data.data.city[i].code;
              obj2.label = res.data.data.city[i].name;
              obj.children[s] = obj2;
            }
            data[i] = obj;
            if (data[i].children.length < 1) {
              delete data[i].children;
            }
          }
          that.form.options = data;
        }
      });
    },
    // 获取项目名称
    getprojectname () {
      var _this = this;
      _this.$api.get('/api/clientbehavior/getprojectname?kw=').then(function (res) {
        console.log(res);
        if (res.data.code === 0) {
          var datas = [];
          for (var i = 0; i < res.data.data.length; i++) {
            var obj = {};
            obj.value = res.data.data[i];
            obj.label = res.data.data[i];
            datas[i] = obj;
          }
          _this.projectname = datas;
        }
      });
    },
    remoteMethod (query) {
      /* if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.form.name = this.list.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options4 = [];
      } */
    }
  }
};
</script>

<style lang="css" scoped>
body{
	position: relative;
}
.contents{
	width:100%;
	margin:0 auto;
}
.el-form-item__content{
  text-align:center
}
.forms{
  border: 1px solid #ccc;
  padding:20px;
}
.el-form-item{
  margin-bottom: 15px
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
</style>
