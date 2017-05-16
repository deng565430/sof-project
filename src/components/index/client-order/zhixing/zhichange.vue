<template>
<div class="formcontain">
		<div class="formtitle">执行订单</div>
		<el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
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
			        <el-date-picker format type="date" placeholder="起始日期" v-model="ruleForm.value1" style="width: 100%;"></el-date-picker>
			      </el-form-item>
			    </el-col>
			  </el-form-item>
        <el-form-item label="所属区域">
            <el-checkbox-group v-model="areatype">
              <el-checkbox v-for="area in areas"  :label="area" :key="area">{{area}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="物业类型" >
            <el-checkbox-group v-model="wtype">
              <el-checkbox v-for="type in wtypes"  :label="type" :key="type">{{type}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="项目竞品">
            <el-select v-model="campaign" filterable placeholder="请选择" width=100%>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="扩展方式">
              <el-checkbox-group v-model="region">
                <el-checkbox label="按项目扩展" name="region"></el-checkbox>
                <el-checkbox label="按区域扩展" name="region"></el-checkbox>
              </el-checkbox-group>
          </el-form-item>
          <el-form-item label="所需数据类型" label-width="100px">
              <el-checkbox-group v-model="numtype">
                <el-checkbox label="浏览数据" name="numtype"></el-checkbox>
                <el-checkbox label="搜索数据" name="numtype"></el-checkbox>
              </el-checkbox-group>
          </el-form-item>
			   <el-form-item>
			    <el-button ><router-link to="/client/dinging">取 消</router-link></el-button>
			    <el-button type="primary" :loading="false" @click="submitForm()">下一步</el-button>
			  </el-form-item>
		</el-form>
</div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      ruleForm: {
        cname: '',
        name: '',
        num: '',
        desc: '',
        value: '',
        value1: ''
      },
      region: [],
      numtype: [],
      campaign: '',
      options: [{
        value: '',
        label: ''
      }],
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
    onloda2 () {
      var datas = [];
      var _this = this;
      this.$ajax({
        method: 'get',
        url: '/api/campaign/getProjectName'
      }).then(function (res) {
        if (res.status === 200) {
          console.log(res.data);
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
      let _this = this;
      var id = decodeURI(window.location.href.split('=')[1]).replace(/\s/g, '');
      this.$ajax({
        method: 'get',
        url: '/api/brief/getBriefById?id=' + id
      }).then(function (res) {
        if (res.status === 200) {
          var obj = {};
          console.log(res.data.data);
          obj.cname = res.data.data.customName;
          obj.name = res.data.data.proName;
          obj.num = res.data.data.telneedNum;
          obj.desc = res.data.data.project_description;
          obj.value = res.data.data.startTime;
          obj.value1 = res.data.data.endTime;
          console.log(res.data.data.endTime);
          _this.ruleForm = obj;
        }
      });
    },
    submitForm () {
      console.log(this.region);
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
</style>
