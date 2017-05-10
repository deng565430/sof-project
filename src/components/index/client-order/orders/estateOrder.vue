<template>
<div class="formcontain">
	<div class="formtitle">需求单</div>
  <el-form ref="form" :model="form" label-width="80px" class="formcontains">
  <el-form-item label="项目名称">
    <el-input v-model="form.name" placeholder="（必填）"></el-input>
  </el-form-item>
  <el-form-item label="项目描述">
    <el-input type="textarea" v-model="form.desc" placeholder="描述项目特点,范围及竞品"></el-input>
     <el-button type="text" class="addmore">添加更多内容</el-button>
  </el-form-item>
</el-form>
	<el-form ref="form" :model="form" label-width="80px" class="formcontains">
	  <el-form-item label="需求数量">
	    <el-input v-model="form.num" placeholder="每日电话需求量"></el-input>
	  </el-form-item>
	  <el-form-item label="订阅周期">
	    <el-date-picker 
	      v-model="value6"
	      type="daterange"
	      placeholder="选择日期范围" calss="dataselect">
	    </el-date-picker>
	  </el-form-item>
	</el-form>
	<div class="tip">
		<p>注意：订单提交后在2个工作日后返回话单，请查看反馈信息，在中导出话单。</p>
	</div>
	<div class="caozuo">
		<el-button type="primary"><router-link to="/client/orderIndex">提交</router-link></el-button>
		<el-button type="primary" :disabled="false">取消</el-button>
	</div>
</div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        name: '',
        num: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
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
	margin-bottom: 20px
}
.caozuo button:nth-child(2){
	background: #ccc;
	border: 1px solid #ccc
}
.caozuo button a{
	color: #fff;
	display: inline-block;
}
</style>
