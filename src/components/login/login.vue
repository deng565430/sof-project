<template>
<div id="login">

  <el-dialog title="登录" :visible.sync="dialogVisible" size="tiny" :before-close="handleClose">
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
    <el-form-item label="用户名" prop="age">
      <el-input v-model.number="ruleForm2.age"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item>
    </el-form-item>
 
    <span>
      <el-button type="primary" @click="submitForm('ruleForm2')">确 定</el-button>
      <el-button @click="resetForm('ruleForm2')">重置</el-button>
      <el-button @click="unLogin">取 消</el-button>
    </span>
   </el-form>
</el-dialog>

</div>
</template>

<script>
export default {

  name: 'login',

  data () {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'));
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass');
        }
        callback();
      }
    };
    return {
      dialogVisible: this.$store.state.dialogVisible,
      ruleForm2: {
        pass: '',
        checkPass: '',
        age: ''
      },
      rules2: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        age: [
          { validator: checkAge, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    unLogin () {
      this.dialogVisible = this.$store.state.dialogVisible = !this.$store.state.dialogVisible;
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
          this.$store.state.dialogVisible = false;
        })
        .catch(_ => {});
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
          this.dialogVisible = this.$store.state.dialogVisible = !this.$store.state.dialogVisible;
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

<style lang="stylus" rel="stylesheet/stylus">
</style>
