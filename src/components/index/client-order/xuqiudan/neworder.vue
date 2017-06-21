<template>
  <div @click="" id="">
    <!-- 表单内容 -->
    <el-form v-loading.body="loading" element-loading-text="拼命加载中" class="xuqiuform" :label-position="labelPosition" :rules="rules" ref="form"   :model="form" label-width="100px">
        <!-- 行业选择 区域选择 -->
        <el-row :gutter="20" style="border-bottom:1px solid #f3f3f3">
          <el-col :span="6">
            <el-form-item label="行业选择" prop="region">
              <el-select v-model="form.region" placeholder="请选择行业">
                <el-option v-for="i in form.regions" :label="i.name" :value="i.code"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="区域选择" prop="area">
              <el-select v-model="form.area" placeholder="请选择区域">
                <el-option v-for="i in form.areas" :label="i.name" :value="i.code"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="制单人" prop="zbname">
              <el-input v-model="form.zbname" placeholder="请输入制单人"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 项目名称 -->
        <el-row :gutter="20" style="margin-top:20px;border-bottom:1px solid #f3f3f3">
          <el-col :span="8">
            <el-form-item label="项目名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入项目名称"></el-input>
            </el-form-item>
         </el-col>
        </el-row>
        <!-- 策略类型 -->
        <el-row :gutter="20" style="margin-top:20px;border-bottom:1px solid #f3f3f3">
          <el-col :span="24">
             <el-form-item label="策略类型" prop="type">
              <el-radio-group v-model="form.type">
                <el-radio-button v-for="i in form.types" :label="i.code" :name="i.name">{{i.name}}</el-radio-button>
              </el-radio-group>
            </el-form-item>
         </el-col>
        </el-row>
        <!-- 需求公司 -->
        <el-row :gutter="20" style="margin-top:20px">
          <el-col :span="8">
            <el-form-item label="需求公司" prop="compan">
              <el-input v-model="form.compan" placeholder=""></el-input>
            </el-form-item>
         </el-col>
        </el-row>
        <!-- 所需电话量 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="所需电话量" prop="phonenum">
              <el-input v-model="form.phonenum" placeholder=""></el-input>
            </el-form-item>
         </el-col>
        </el-row>
        <!-- 所需周期 -->
        <el-row :gutter="20">
          <el-col :span="16">
            <el-form-item label="所需周期" required>
              <el-col :span="8" style="padding-left:0px;padding-right:0px">
                <el-form-item prop="stratime" >
                  <el-date-picker type="date" placeholder="选择日期" v-model="form.stratime" :picker-options="form.pickerOptions1" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="1">-</el-col>
              <el-col :span="8" style="padding-left:0px;padding-right:0px">
                <el-form-item prop="endtime">
                  <el-date-picker type="date" placeholder="选择日期" v-model="form.endtime" :picker-options="form.pickerOptions1" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 项目描述 -->
        <el-row :gutter="20">
          <el-col :span="16">
            <el-form-item label="项目描述" prop="miaoshu">
              <el-input type="textarea" v-model="form.miaoshu" placeholder=""></el-input>
            </el-form-item>
         </el-col>
        </el-row>
        <!-- 操作 -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">提交</el-button>
          <!-- <el-button>取消</el-button> -->
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
    </el-form>

    <!-- 确认提交 -->
    <el-dialog
    title="需求单信息"
    :visible.sync="dialogVisible"
    size="tiny"
    :data="queren"
    ><!-- :before-close="handleClose" -->
    <!-- <span v-if="qr1">添加成功</span> -->
      <div >
        <div class="xuqiutitle">
          <p><span>需求单编号:</span><span>{{queren.order_num}}</span></p>
          <p><span>制单人:</span><span>{{queren.tabulator}}</span></p>
          <p><span>制单时间:</span><span>{{queren.create_time}}</span></p>
        </div>
        <ul class="tanchu">
          <li><span>所属行业</span><span>{{queren.industryId}}</span></li>
          <li><span>所属区域</span><span>{{queren.area}}</span></li>
          <li><span>项目名称</span><span>{{queren.phone_demand}}</span></li>
          <li><span>策略类型</span><span>{{queren.strategy}}</span></li>
          <li><span>需求公司</span><span>{{queren.demand_side}}</span></li>
          <li><span>所需电话量</span><span>{{queren.phone_demand}}</span></li>
          <li><span>所需周期</span><span>{{queren.start_date}}-{{queren.end_date}}</span></li>
          <li><span>项目描述</span><span>{{queren.project_description}}</span></li>
        </ul>
      </div>
       <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
          <el-button type="primary" @click="xqqr('form')">确认</el-button>
        </span>
      
    </el-dialog>

    
  </div>
</template>

<script>
export default {
  data () {
    return {
      labelPosition: 'right',
      form: {
        region: '',
        regions: [],
        area: '',
        areas: [],
        name: '',
        zbname: '',
        type: '',
        types: [],
        compan: '',
        phonenum: '',
        miaoshu: '',
        stratime: '',
        endtime: '',
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick (picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick (picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick (picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        }
      },
      rules: {
        region: [
          { required: true, message: '请选择行业', trigger: 'change' }
        ],
        area: [
          { required: true, message: '请选择区域', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入项目名称', trigger: 'blur' },
          { min: 1, message: '请输入项目名称', trigger: 'blur' }
        ],
        zbname: [
          { required: true, message: '请输入制表人', trigger: 'blur' },
          { min: 1, message: '请输入制表人', trigger: 'blur' }
        ],
        phonenum: [
          { required: true, message: '请输入需求数量', trigger: 'blur' },
          { min: 1, message: '请输入需求数量', trigger: 'blur' }
        ],
        stratime: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        endtime: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        miaoshu: [
          { required: true, message: '请输入项目描述', trigger: 'blur' }
        ],
        compan: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],
        type: [
          { type: 'string', required: true, message: '请选择策略', trigger: 'change' }
        ]
      },
      dialogVisible: false,
      loading: false,
      queren: {}
    };
  },
  created () {
    this.getbriefinfo();// 获取需求单信息
  },
  methods: {
    // 提交需求单
    onSubmit (formName) {
      var b = {
        'industryId': this.form.region,
        'area': this.form.area,
        'tabulator': this.form.zbname,
        'project_name': this.form.name,
        'strategy': this.form.type,
        'demand_side': this.form.compan,
        'phone_demand': this.form.phonenum,
        'start_date': new Date(this.form.stratime).toLocaleDateString(),
        'end_date': new Date(this.form.endtime).toLocaleDateString(),
        'project_description': this.form.miaoshu
      };
      var url = '/api/brief/addbrief';
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$api.post(url, b).then((res) => {
            this.loading = false;
            this.queren = res.data.data;
            this.$confirm(res.data.msg, '提示', {
              confirmButtonText: '确定',
              showCancelButton: false,
              type: 'success'
            }).then(() => {
              this.dialogVisible = true;
            });
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 确认需求单
    xqqr (formName) {
      this.dialogVisible = false;
      this.$refs[formName].resetFields();
    },
    // 重置
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    // 获取需求单信息
    getbriefinfo () {
      var url = '/api/brief/getBriefSelect';
      this.$api.get(url).then((res) => {
        console.log(res.data.code);
        if (res.data.code === 0) {
          this.form.regions = res.data.data.industry;
          this.form.areas = res.data.data.city;
          this.form.types = res.data.data.strategy;
        }
      });
    }
  }
};
</script>

<style>
.el-col el-col-11{
  padding-left: 0px !important;
  padding-right: 0px !important;
}
.xuqiuform{
  /*border: 1px solid #bfcbd9;
  padding: 20px;
  padding-left: 30px;*/
  padding-top:10px;
  padding-left: 10px;
  padding-right: 100px
}
.xuqiutitle{
  text-align: left;
}
.xuqiutitle p{
  padding-left: 10px;
  margin-bottom: 10px;
}
.tanchu{
  text-align: left;
  border: 1px solid #ccc
}
.tanchu li{
  line-height: 30px;
  height: 30px;
  border-bottom: 1px solid #ccc;
}
.tanchu li:last-child{
  border-bottom:0;
}
.tanchu li span:first-child{
  color: #333;
  line-height: 30px;
  height: 30px;
  width:100px;
  background: #eee;
  display: inline-block;
  text-align: center;
}
.tanchu li span:nth-child(2){
  padding-left: 8px;
}
</style>
