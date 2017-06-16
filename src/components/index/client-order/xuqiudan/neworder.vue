<template>
  <div @click="" id="">
    <!-- 表单内容 -->
    <el-form :rules="rules" ref="form"   :model="form" label-width="100px">
        <!-- 行业选择 区域选择 -->
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="行业选择" prop="region">
              <el-select v-model="form.region" placeholder="请选择行业">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="区域选择" prop="area">
              <el-select v-model="form.area" placeholder="请选择区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 项目名称 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="项目名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入项目名称"></el-input>
            </el-form-item>
         </el-col>
        </el-row>
        <!-- 策略类型 -->
        <el-row :gutter="20">
          <el-col :span="24">
             <el-form-item label="策略类型" prop="type">
              <el-checkbox-group v-model="form.type">
                <el-checkbox-button v-for="i in form.types" :label="i.label" :name="i.id">{{i.label}}</el-checkbox-button>
              </el-checkbox-group>
            </el-form-item>
         </el-col>
        </el-row>
        <!-- 需求公司 -->
        <el-row :gutter="20">
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
          <el-col :span="10">
            <el-form-item label="所需周期" required>
              <el-col :span="11">
                <el-form-item prop="stratime">
                  <el-date-picker type="date" placeholder="选择日期" v-model="form.stratime" :picker-options="form.pickerOptions1" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-form-item prop="endtime">
                  <el-date-picker type="date" placeholder="选择日期" v-model="form.endtime" :picker-options="form.pickerOptions1" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 项目描述 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="项目描述" prop="miaoshu">
              <el-input type="textarea" v-model="form.miaoshu" placeholder=""></el-input>
            </el-form-item>
         </el-col>
        </el-row>
        <!-- 操作 -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">提交</el-button>
          <el-button>取消</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
const typess = [{'label': '电销需求单', 'id': 'dianxiao'}, {'label': '投放订单', 'id': 'rou'}];
export default {
  data () {
    return {
      form: {
        region: '',
        area: '',
        name: '',
        type: [],
        types: typess,
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
          { required: true, message: '请选择区域', trigger: 'blur' },
          { min: 1, message: '请输入项目名称', trigger: 'blur' }
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
          { type: 'array', required: true, message: '请至少选择一个策略', trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style>

</style>
