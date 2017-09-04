<template>
  <div style="margin-left:30px;" class="xiugaixuqiu">
  <h2 v-if="ishistory !== '3'">修改需求单</h2>
  <h2 v-if="ishistory === '3'">历史需求单</h2>
  
    <!-- 表单内容 -->
   <el-form v-loading.body="loading" element-loading-text="拼命加载中" class="xuqiuform" :label-position="labelPosition" :rules="rules"  ref="form" :id='form.id' :c="xiugai"  :model="form" label-width="100px">
        <!-- 行业选择 区域选择 -->
        <el-row :gutter="20" style="background:#f2f3f4">
          <el-col :span="6">
            <el-form-item label="行业选择" prop="region">
              <el-select :disabled="true" v-model="form.region" placeholder="请选择行业">
                <el-option v-for="i in form.regions" :label="i.name" :value="i.code"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="区域选择" prop="area">
              <el-select :disabled="true" v-model="form.area" placeholder="请选择区域">
                <el-option v-for="i in form.areas" :label="i.name" :value="i.code"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="制单人" prop="zbname">
              <el-input  :disabled="true" v-model="form.zbname" placeholder="请输入制单人"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 项目名称 -->
        <el-row :gutter="20" style="margin-top:20px;background:#f2f3f4">
          <el-col :span="8">
            <el-form-item label="项目名称" prop="name">
              <el-input :disabled="true" v-model="form.name" placeholder="请输入项目名称"></el-input>
            </el-form-item>
         </el-col>
        </el-row>
        <!-- 策略类型 -->
        <el-row :gutter="20" style="margin-top:20px;background:#f2f3f4">
          <el-col :span="24">
             <el-form-item label="需求单类型" prop="type">
              <el-radio-group   v-model="form.type"> <!-- :disabled="true" -->
                <el-radio-button v-for="i in form.types" :label="i.code" :name="i.name">{{i.name}}</el-radio-button>
              </el-radio-group>
            </el-form-item>
         </el-col>
        </el-row>
        <!-- 需求公司 --> <!-- :disabled="!(chakanxiangs in chakanxiang2)"  -->
        <el-row :gutter="20" style="margin-top:20px;background:#f2f3f4">
          <el-col :span="8">
            <el-form-item  label="需求公司" prop="compan">  
              <el-input :disabled="true" v-model="form.compan" placeholder=""></el-input>
            </el-form-item> 
         </el-col>
        </el-row>
        <!-- 所需电话量 --> <!-- :disabled="!(chakanxiangs in chakanxiang2)"  -->
        <el-row :gutter="20" style="margin-top:20px;background:#f2f3f4">
          <el-col :span="8">
            <el-form-item  label="所需电话量" prop="phonenum">
              <el-input v-model="form.phonenum" placeholder=""></el-input>
            </el-form-item>
         </el-col>
        </el-row>
        <!-- 所需周期 -->
        <el-row :gutter="20" style="margin-top:20px;background:#f2f3f4">
          <el-col :span="16">
            <el-form-item label="所需周期" required>
              <Timess  :dates="form.dates" v-model='form.data' @dataEvent="dataEvent"></Timess>
            </el-form-item >
          </el-col >
        </el-row >
        <!-- 项目描述 --> <!-- :disabled="!(chakanxiangs in chakanxiang2)" -->
        <el-row :gutter="20" style="margin-top:20px;background:#f2f3f4">
          <el-col :span="16">
            <el-form-item label="项目描述" prop="miaoshu">
              <el-input   type="textarea" v-model="form.miaoshu" placeholder="请输入项目描述" style="min-height:140px"></el-input>
            </el-form-item>
         </el-col>
        </el-row>
        <!-- 操作 -->
        <el-form-item style="margin-top:20px;">
          <el-button  type="primary" @click="onSubmit('form')" v-if="ishistory !== '3'">提交</el-button> <!-- v-if="chakanxiangs in chakanxiang2" -->
          <!-- <el-button>取消</el-button> -->
          <el-button v-if="chakanxiangs in chakanxiang2" @click="resetForm('form')">重置</el-button>
          <el-button @click="fanhui">返回</el-button>
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
import Timess from '../../../timeSelect/ordertime';

export default {
  props: ['xiugai', 'chakanxiang', 'ishistory'],
  components: {
    Timess
  },
  data () {
    return {
      isdisabled: true,
      chakanxiang2: [0, 1, 2],
      chakanxiangs: this.chakanxiang,
      c: {},
      labelPosition: 'right',
      form: {
        id: '',
        region: '',
        regions: [],
        area: '',
        areas: [],
        area_code: '',
        name: '',
        zbname: '',
        type: '',
        types: [],
        compan: '',
        phonenum: '',
        miaoshu: '',
        data: '',
        dates: [],
        stratime: '',
        endtime: ''
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
  watch: {
    chakanxiang (val) {
      console.log(val);
      console.log(this.ishistory);
    },
    xiugai (val) {
      this.c = val;// 新增xiugai的watch，监听变更并同步到c上
      console.log(this.c);
      this.form.region = this.c.industryId;
      this.form.region = this.c.industryId;
      this.form.area = this.c.area;
      this.form.area_code = this.c.area_code;
      this.form.zbname = this.c.tabulator;
      this.form.name = this.c.project_name;
      this.form.type = this.c.strategy;
      this.form.compan = this.c.demand_side;
      this.form.phonenum = this.c.phone_demand;
      this.form.stratime = this.c.start_date;
      this.form.endtime = this.c.end_date;
      this.form.dates.push(this.c.start_date, this.c.end_date);
      this.form.miaoshu = this.c.project_description;
      this.form.id = this.c.id;
      // console.log(this.form.dates);
    }
  },
  created () {
    this.getbriefinfo();// 获取需求单信息
  },
  methods: {
    // 返回
    fanhui () {
      this.$emit('isshow2');
    },
    dataEvent (val) {
      this.form.stratime = val.minbatch;
      this.form.endtime = val.maxbatch;
    },
    // 提交需求单
    onSubmit (formName) {
      var b = {
        'industryId': this.form.region,
        'area': this.form.area_code,
        'tabulator': this.form.zbname,
        'project_name': this.form.name,
        'strategy': this.form.type,
        'demand_side': this.form.compan,
        'phone_demand': this.form.phonenum,
        'start_date': this.form.stratime, // new Date(this.form.stratime).toLocaleDateString()
        'end_date': this.form.endtime, // new Date(this.form.endtime).toLocaleDateString()
        'project_description': this.form.miaoshu,
        'id': this.form.id
      };
      var url = '/api/brief/updateBrief';
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$api.post(url, b).then((res) => {
            this.loading = false;
            // this.queren = res.data.data;
            this.$confirm(res.data.msg, '提示', {
              confirmButtonText: '确定',
              showCancelButton: false,
              type: 'success'
            }).then(() => {
              // this.dialogVisible = true;
              this.$emit('isshow');
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
        if (res.data.code === 0) {
          this.form.regions = res.data.data.industry;
          this.form.areas = res.data.data.city;
          this.form.types = res.data.data.strategy;
          console.log(this.form.types);
        }
      });
    }
  }
};
</script>

<style lang="css" scoped>
.xiugaixuqiu .el-col el-col-11{
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
.xiugaixuqiu .el-form-item{
  height: 50px;
  margin-bottom: 0;
  padding-top: 10px;
}

.xiugaixuqiu h2{
  height: 28px;
  line-height: 28px;
  text-align: left;
  font-size: 18px;
  color: #007bf8;
  border-left: 4px solid #007bf8;
  padding-left: 18px;
  margin-top: 15px;
  margin-bottom: 20px;
}
.xiugaixuqiu .el-textarea__inner{
  min-height: 140px
}
</style>
