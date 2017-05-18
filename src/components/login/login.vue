<template>
<div id="login">

  <el-dialog title="登录" :visible.sync="dialogVisible" size="tiny" :before-close="handleClose">
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
    <el-form-item label="用户名" prop="user" >
      <el-input v-model.number="ruleForm2.user"></el-input>
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
    var checkUser = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入用户名'));
      }
      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      }
      callback();
    };
    return {
      dialogVisible: this.$store.state.dialogVisible,
      ruleForm2: {
        user: 'admin.sof',
        pass: '123456'
      },
      rules2: {
        user: [
          { validator: checkUser, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
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
      var that = this;
      console.log(that.$store.state.isLogin);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.state.isLogin = true;
          this.$ajax({
            method: 'post',
            url: '/api/user/login',
            data: {
              name: this.ruleForm2.user,
              pwd: this.ruleForm2.pass
            }
          }).then(function (res) {
            if (!res.data.data) {
              alert('返回错误');
              return false;
            }
            if (res.status === 200) {
              console.log(res.data.data[0]);
              that.$store.state.isLogin = true;
              that.$store.state.userName = res.data.data[0].nickName;
              window.sessionStorage.username = res.data.data[0].nickName;
              this.$store.state.dialogVisible = false;
            };
          });
          this.dialogVisible = this.$store.state.dialogVisible = !this.$store.state.dialogVisible;
        } else {
          console.log('登录错误!!');
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
