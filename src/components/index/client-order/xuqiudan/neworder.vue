<template>
  <div style="margin-left:30px;">
  <h2>新建需求单</h2>
    <!-- 表单内容 -->
    <el-form v-loading.body="loading" element-loading-text="加载中,请稍后..." class="xuqiuform" :label-position="labelPosition" :rules="rules" ref="form"   :model="form" label-width="110px">
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
            <el-form-item label="区域选择" >
              <el-cascader
                expand-trigger="hover"
                :options="form.options"
                v-model="form.selectedOptions2"
                @change="handleChange">
              </el-cascader>

              <!-- <el-select v-model="form.area" placeholder="请选择区域">
                <el-option v-for="i in form.areas" :label="i.name" :value="i.code"></el-option>
              </el-select> -->
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="制单人" prop="zbname">
              <el-input v-model="form.zbname" :disabled="true" placeholder="请输入制单人"></el-input>
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
             <el-form-item label="需求单类型" prop="type">
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
        <el-row :gutter="20" style="margin-top:20px">
          <el-col :span="8">
            <el-form-item label="所需电话量/天" prop="phonenum">
              <el-input v-model="form.phonenum" placeholder=""></el-input>
              
            </el-form-item>
         </el-col>
        </el-row>
        <!-- 所需周期 -->
        <el-row :gutter="20" style="margin-top:20px">
          <el-col :span="16">
            <el-form-item label="所需周期"  required>
              <Time  :dates="form.dates" v-model='form.data' @dataEvent="dataEvent"></Time>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 项目描述 -->
        <el-row :gutter="20" style="margin-top:20px;min-height:64px;margin-bottom:26px;">
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
          <li><div>所属行业</div><div>{{industryId1}}</div></li>
          <li><div>所属区域</div><div>{{area1}}</div></li>
          <li><div>项目名称</div><div>{{queren.phone_demand}}</div></li>
          <li><div>策略类型</div><div>{{strategy1}}</div></li>
          <li><div>需求公司</div><div>{{queren.demand_side}}</div></li>
          <li><div>所需电话量/天</div><div>{{queren.phone_demand}}</div></li>
          <li><div>所需周期</div><div>{{queren.start_date}}-{{queren.end_date}}</div></li>
          <li><div>项目描述</div><div>{{queren.project_description}}</div></li>
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
import Time from '../../../timeSelect/ordertime';
export default {
  components: {
    Time
  },
  data () {
    return {
      labelPosition: 'right',
      form: {
        data: '',
        dates: [],
        region: '',
        regions: [],
        options: [{
          value: '',
          label: '',
          children: []
        }],
        selectedOptions2: [],
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
        endtime: ''
      },
      rules: {
        region: [
          { required: true, message: '请选择行业', trigger: 'change' }
        ],
        selectedOptions2: [
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
        data: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        /* endtime: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ], */
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
      queren: {},
      city: [],
      industry: [],
      strategy: [],
      city1: '',
      area1: '',
      industry1: '',
      industryId1: '',
      strategy1: ''
    };
  },
  created () {
    this.getbriefinfo();// 获取需求单信息
    this.form.zbname = this.$store.state.userName;
  },
  methods: {
    // 区域选择
    handleChange (value) {
      // console.log(value);
    },
    dataEvent (val) {
      this.form.stratime = val.minbatch;
      this.form.endtime = val.maxbatch;
    },
    // 提交需求单
    onSubmit (formName) {
      console.log(this.form.selectedOptions2.length);
      var city;
      if (this.form.selectedOptions2.length < 2) {
        city = '';
      } else {
        city = this.form.selectedOptions2[1];
      };
      var b = {
        'industryId': this.form.region,
        'area': this.form.selectedOptions2[0],
        'city': city,
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
            for (var i = 0; i < this.form.options.length; i++) {
              if (res.data.data.area === this.form.options[i].value) {
                if (res.data.data.city === '') {
                  this.area1 = this.form.options[i].label;
                } else {
                  for (var q = 0; q < this.form.options[i].children.length; q++) {
                    if (res.data.data.city === this.form.options[i].children[q].value) {
                      this.area1 = this.form.options[i].label + '/' + this.form.options[i].children[q].label;
                    }
                  }
                }
              }
            };
            for (var s = 0; s < this.industry.length; s++) {
              if (res.data.data.industryId === this.industry[s].code) {
                this.industryId1 = this.industry[s].name;
              }
            };
            for (var n = 0; n < this.strategy.length; n++) {
              if (res.data.data.strategy === this.strategy[n].code) {
                this.strategy1 = this.strategy[n].name;
              }
            };
            this.$confirm('恭喜你添加成功!', '提示', {
              confirmButtonText: '确定',
              showCancelButton: false,
              type: 'success'
            }).then(() => {
              // this.dialogVisible = true;
              location.reload();
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
      // this.form.data = ''; // 清空数据
      this.$refs[formName].resetFields(); // 清空数据
      this.$emit('tiaozhuan');
      this.form.selectedOptions2 = [];
      location.reload();
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
          // this.options = res.data.data.city;
          var data = [];
          for (var i = 0; i < res.data.data.city.length; i++) {
            var obj = {};
            obj.children = [];
            obj.value = res.data.data.city[i].prov.code;
            obj.label = res.data.data.city[i].prov.name;
            for (var s = 0; s < res.data.data.city[i].city.length; s++) {
              var obj2 = {};
              obj2.value = res.data.data.city[i].city[s].code;
              obj2.label = res.data.data.city[i].city[s].name;
              obj.children[s] = obj2;
            }
            data[i] = obj;
            if (data[i].children.length < 1) {
              delete data[i].children;
            }
          }
          this.form.options = data;
          this.industry = res.data.data.industry;
          this.strategy = res.data.data.strategy;
          this.form.regions = res.data.data.industry;
          // this.form.areas = res.data.data.city;
          this.form.types = res.data.data.strategy;
        }
      });
    }
  }
};
</script>

<style lang="css" scoped>
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
  /*line-height: 30px;*/
  min-height: 30px;
  border-bottom: 1px solid #ccc;
  display: flex;
}
.tanchu li:last-child{
  border-bottom:0;
}
.tanchu li div:first-child{
  color: #333;
  line-height: 30px;
  height: 100%;
  width:100px;
  background: #eee;
  /*display: inline-block;*/
  text-align: center;
}
.tanchu li div:nth-child(2){
  padding-left: 8px;
  word-wrap: break-word;
  overflow: hidden;
}
h2{
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
/* .el-row{
  height: 46px;
  background: #f2f3f4
}
.el-button--primary{
  background-color: #007bf8;
    border-color: #007bf8;
}
.el-button{
  border-color: #007bf8;
}
.el-tabs__nav div:nth-child(1){
  margin-left: 30px;
} */
</style>
