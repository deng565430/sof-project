<template>
<div id="login">

  <el-dialog title="登录" :visible.sync="flag" size="tiny" :before-close="handleClose">
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
import { mapGetters, mapMutations } from 'vuex';
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
      flag: this.dialogVisible(),
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
  mounted () {},
  methods: {
    unLogin () {
      this.dialogVisibles(false);
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
          this.dialogVisibles(false);
        })
        .catch(_ => {});
    },
    submitForm (formName) {
      var that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          that.isLogin(true);
          const url = '/api/user/login';
          const postData = {
            name: this.ruleForm2.user,
            pwd: this.ruleForm2.pass
          };
          this.$api.post(url, postData).then(function (res) {
            if (res.data.code === 3) {
              that.$alert(res.data.msg, '提示信息');
              that.dialogVisibles(true);
              return false;
            }
            if (res.data.code === 0) {
              const nickName = res.data.data[0].nickName;
              that.isLogin(true);
              that.userName(nickName);
              that.dialogVisibles(false);
              if (window.localStorage) {
                window.localStorage.setItem('userName', nickName);
                window.localStorage.setItem('isLogin', true);
              }
            };
          });
        } else {
          console.log('登录错误!!');
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    ...mapGetters([
      'dialogVisible'
    ]),
    ...mapMutations({
      dialogVisibles: 'DIOLOG_VISIBLE',
      userName: 'USER_NAME',
      isLogin: 'IS_LOGIN'
    })
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
