<template>
<div class="formcontain">
		<div class="formtitle">需求单</div>
		<el-form ref="form" :model="form" label-width="80px">
			    <el-form-item label="项目名称" :label-width="formLabelWidth">
			      <el-input v-model="form.name" auto-complete="off"></el-input>
		      </el-form-item>
			   <el-form-item label="项目描述">
			    <el-input type="textarea" v-model="form.desc" placeholder="描述项目特点,范围及竞品"></el-input>
			  </el-form-item>
			   <el-form-item label="需求数量">
			    <el-input v-model="form.num" placeholder="每日电话需求量"></el-input>
			  </el-form-item>
			  <el-form-item label="订阅周期">
			    <el-date-picker 
			      v-model="form.value6"
			      type="daterange"
			      placeholder="选择日期范围" calss="dataselect">
			    </el-date-picker>
			  </el-form-item>
			   <el-form-item>
			    <el-button @click="dialogForm = false"><router-link to="/client/orderIndex">取 消</router-link></el-button>
			    <el-button type="primary" @click="dialogForm = false"><router-link to="/client/orderIndex">确 定</router-link></el-button>
			  </el-form-item>
		</el-form>
</div>
</template>

<script>
export default {
  data () {
    return {
      dialogForm: true,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        value6: ''
      },
      formLabelWidth: '120px'
    };
  },
  methods: {
    doThis () {
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
