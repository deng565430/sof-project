<template>
<div class="formcontain">
		<div class="formtitle">修改订单</div>
		<el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
          <el-form-item label="公司名称" prop="cname">
            <el-input v-model="ruleForm.cname"></el-input>
          </el-form-item>
			    <el-form-item label="项目名称" prop="name">
				    <el-input v-model="ruleForm.name"></el-input>
			    </el-form-item>
			   <el-form-item label="项目描述" prop="desc">
			    <el-input type="textarea" v-model="ruleForm.desc" placeholder="描述项目特点,范围及竞品"></el-input>
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
			   <el-form-item>
			    <el-button @click="quxiao">取 消</el-button>
			    <el-button type="primary" :loading="false" @click="submitForm('ruleForm')">确 定</el-button>
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
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    console.log(this.$parent.rowid);
    this.id = this.$parent.rowid;
    this.console();
  },
  methods: {
    quxiao () {
      this.$emit('listinchild');
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
          console.log(res.data.data.endTime);
          _this.ruleForm = obj;
        }
      });
    },
    submitForm (formName) {
      var _this = this;
      var b = {
        'demand_side': this.ruleForm.cname,
        'project_name': this.ruleForm.name,
        'phone_demand': this.ruleForm.num,
        'project_description': this.ruleForm.desc,
        'start_date': new Date(this.ruleForm.value).toLocaleString().substr(0, 9),
        'end_date': new Date(this.ruleForm.value1).toLocaleDateString(),
        'id': this.id
      };
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$ajax({
            method: 'post',
            url: '/api/brief/updateBrief',
            data: b
          }).then(function (res) {
            if (res.status === 200) {
              _this.$emit('lischeng');
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
  prop: ['giveid']
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
