<template>
<div class="content">
  <el-form ref="form" :model="form" label-width="100px">
  <div style="display:flex">
    <el-form-item label="行业选择">
    <el-select v-model="form.region"  placeholder="请选行业">
      <el-option 
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
      {{item.label}}
      </el-option>
    </el-select>
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
              <Time  :dates="form.dates" v-model='form.data' ></Time>
            </el-form-item>
          </el-col>
        </el-row>

  </div>
  
  <el-form-item label="客户源">
    <el-radio-group v-model="form.resource" @change="qiehuan(form.resource)">
      <el-radio label="按阶段分类"></el-radio>
      <el-radio label="按属性分类"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="QQ号" v-if="phone">
    <el-input v-model="form.phone" placeholder="格式:电话号码 / QQ号"></el-input>
    <span>（格式：如您需要多个搜索,号码之间请用"/"隔开）</span>
  </el-form-item>
  <el-form-item label="手机号" v-if="phone">
    <el-input v-model="form.phones" placeholder="格式:电话号码 / QQ号"></el-input>
    <span>（格式：如您需要多个搜索,号码之间请用"/"隔开）</span>
  </el-form-item>
  <el-form-item label="" v-if="kehuyuan">
    <el-radio-group v-model="form.kehuyuan">
      <el-radio label="动机"></el-radio>
      <el-radio label="意向"></el-radio>
      <el-radio label="行动"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item >
    <div style="text-align:center">
    <el-button type="primary" @click="onSubmit">搜索</el-button>
    <el-button>取消</el-button>
    </div>
  </el-form-item>
</el-form>
</div>
</template>

<script>
import Time from '../../timeSelect/ordertime';
export default {
  components: {
    Time
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
        kehuyuan: ''
      },
      phone: false,
      kehuyuan: false,
      options: [],
      projectname: [],
      loading: false
    };
  },
  created () {
    this.gethangye();
    this.getprojectname();
  },
  methods: {
    // 搜索查询
    search (val, val2) {
      // this.getTable(this.tabs3, this.currentPage4 - 1, this.pageSize, this.tabName, val, val2);
    },
    qiehuan (val) {
      if (val === '按阶段分类') {
        this.phone = false;
        this.kehuyuan = true;
      } else {
        this.kehuyuan = false;
        this.phone = false;
      }
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
.content{
	width:90%;
	margin:0 auto;
  margin-top: 30px
}
.el-form-item__content{
  text-align:center
}
</style>
