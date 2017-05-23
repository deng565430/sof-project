<template>
<div class="formcontain">
	<div class="formtitle">执行单</div>
  <el-form ref="ruleForm" :model="ruleForm" label-width="100px" class="formcontains" v-show="show">
	  <el-form-item label="活动名称" prop="name">
	    <el-input v-model="ruleForm.name"></el-input>
	  </el-form-item>
	   <el-form-item label="所属区域">
	    <el-checkbox-group v-model="ruleForm.type">
	      <el-checkbox label="松江区" name="type"></el-checkbox>
	      <el-checkbox label="青浦区" name="type"></el-checkbox>
	    </el-checkbox-group>
	  </el-form-item>
	   <el-form-item label="物业类型">
	    <el-checkbox-group v-model="ruleForm.type">
	      <el-checkbox label="商铺" name="type"></el-checkbox>
	      <el-checkbox label="住宅" name="type"></el-checkbox>
	    </el-checkbox-group>
	  </el-form-item>
	  <el-form-item label="扩展方式">
	    <el-checkbox-group v-model="ruleForm.type">
	      <el-checkbox label="按楼盘名称扩展" name="type"></el-checkbox>
	      <el-checkbox label="按地址扩展" name="type"></el-checkbox>
	    </el-checkbox-group>
	  </el-form-item>
	   <el-form-item label="竞品选择" class="jingps">
		  <el-select v-model="ruleForm.value8" filterable placeholder="请选择" class="jvalue">
		    <el-option
		      v-for="item in ruleForm.options"
		      :label="item.label"
		      :value="item.value">
		    </el-option>
  		  </el-select>
  		  <div class="jingp" multiple ></div>
	  </el-form-item>
	  	<el-form-item label="所需数据类型">
		    <el-checkbox-group v-model="form.type">
		      <el-checkbox label="浏览数据" name="type"></el-checkbox>
		      <el-checkbox label="搜索数据" name="type"></el-checkbox>
		    </el-checkbox-group>
		  </el-form-item>
		  <el-button type="primary" @click="isshow">下一步</el-button>
	</el-form>
	<div v-show="sshow">
		zixingdan
	</div>	
</div>
</template>

<script>
export default {
  data () {
    return {
      ruleForm: {
        name: '',
        num: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        options: [{
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value8: ''
      },
      show: true,
      sshow: false
    };
  },
  methods: {
    isshow () {
      this.show = false;
      this.sshow = true;
    }
  }
};
</script>

<style lang="css" scoped>
.formcontain{
	width:400px;
	margin: 0 auto
}
.formtitle{
	font-size: 20px;
	font-weight: bold;
	margin-bottom: 20px
}
.jingps{
	position: relative;
}
.jingp{
	position: absolute;
	right: -180px;
	top:0;
	min-height: 37px;
	width: 200px;
	border: 1px dashed #ccc;
	padding: 5px;
	box-sizing:border-box;
	border-radius: 5px;
}
</style>
