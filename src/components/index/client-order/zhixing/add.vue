<template>
<div class="formcontain">
	<div class="formtitle">执行单</div>
  <el-form ref="form" :model="form" label-width="100px" class="formcontains" v-show="show">
	  <el-form-item label="项目名称">
	    <el-input v-model="form.name" placeholder=""></el-input>
	  </el-form-item>
	   <el-form-item label="所属区域">
	    <el-checkbox-group v-model="form.type">
	      <el-checkbox label="松江区" name="type"></el-checkbox>
	      <el-checkbox label="青浦区" name="type"></el-checkbox>
	    </el-checkbox-group>
	  </el-form-item>
	   <el-form-item label="物业类型">
	    <el-checkbox-group v-model="form.type">
	      <el-checkbox label="商铺" name="type"></el-checkbox>
	      <el-checkbox label="住宅" name="type"></el-checkbox>
	    </el-checkbox-group>
	  </el-form-item>
	  <el-form-item label="扩展方式">
	    <el-checkbox-group v-model="form.type">
	      <el-checkbox label="按项目扩展" name="type"></el-checkbox>
	      <el-checkbox label="按区域扩展" name="type"></el-checkbox>
	    </el-checkbox-group>
	  </el-form-item>
	   <el-form-item label="竞品选择">
		  <el-select v-model="form.value8" filterable placeholder="请选择">
		    <el-option
		      v-for="item in form.options"
		      :label="item.label"
		      :value="item.value">
		    </el-option>
	  </el-select>
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
      form: {
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
</style>
