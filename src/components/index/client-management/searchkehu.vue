<template>
<div class="content">
  <el-form ref="form" :model="form" label-width="100px">
  <el-form-item label="行业选择">
    <el-select v-model="form.region" placeholder="请选行业">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="项目名称">
    <el-input v-model="form.name" placeholder="请填写您所要搜索的项目"></el-input>
  </el-form-item>
  
  <el-form-item label="选择时间">
    <el-select v-model="form.region" placeholder="请选择时间">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
    <span>（默认为最近一批时间）</span>
  </el-form-item>
  <el-form-item label="客户源">
    <el-radio-group v-model="form.resource" @change="qiehuan(form.resource)">
      <el-radio label="根据号码搜索"></el-radio>
      <el-radio label="根据分类搜索"></el-radio>
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
      <el-radio label="A类"></el-radio>
      <el-radio label="B类"></el-radio>
      <el-radio label="C类"></el-radio>
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
export default {

  name: 'clientManagement',
  data () {
    return {
      form: {
        name: '',
        phone: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        kehuyuan: ''
      },
      phone: false,
      kehuyuan: false
    };
  },
  methods: {
    // 搜索查询
    search (val, val2) {
      // this.getTable(this.tabs3, this.currentPage4 - 1, this.pageSize, this.tabName, val, val2);
    },
    qiehuan (val) {
      console.log(val);
      if (val === '根据号码搜索') {
        this.phone = true;
        this.kehuyuan = false;
      } else {
        this.kehuyuan = true;
        this.phone = false;
      }
    }
  }
};
</script>

<style lang="css" scoped>
body{
	position: relative;
}
.content{
	width:80%;
	margin:0 auto;
}
.el-form-item__content{
  text-align:center
}
</style>
