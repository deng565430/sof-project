<template>
<div id="sofLogin" ref="sofLoginBg">
  <div class="login">
    <div class="top">
      <p>SOF订阅</p>
    </div>
    <div class="btm">
      <div class="user">
        <i class="el-icon-upload"></i> &nbsp;
         <input ref="query" v-model="user" placeholder="用户名:"/>
      </div>
      <div class="user">
        <i class="el-icon-upload"></i> &nbsp;
         <input ref="query" type="password" v-model="password" placeholder="密码:"/>
      </div>
      <div class="checkbox">
        <input type="checkbox" v-model="selected" id="checkbox"> &nbsp;
        <label for="checkbox">下次免登陆</label>
      </div>
      <div class="btn" @click="loginIn">
        <input type="button" name="" value="登 录">
      </div>
    </div>
  </div>

</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {

  name: 'login',

  data () {
    return {
      bgImg: require('assets/img/login_bg.jpg'),
      user: '', // admin.sof operation.sof
      password: '',
      selected: ''
    };
  },
  created () {
    if (this.isLogin().msg) {
      this.$router.push('/index');
    }
  },
  mounted () {
    this.$refs.sofLoginBg.style.background = `url(${this.bgImg}) no-repeat fixed top`;
  },
  methods: {
    loginIn () {
      if (this.user === '') {
        this.$alert('用户名不能为空', '提示信息');
        return;
      }
      if (this.password === '') {
        this.$alert('密码不能为空', '提示信息');
        return;
      }
      const url = '/api/user/login';
      const postData = {
        name: this.user,
        pwd: this.password
      };
      this.$api.post(url, postData).then(res => {
        if (res.data.code === 3) {
          this.$alert(res.data.msg, '提示信息');
          return;
        }
        if (res.data.code === 4) {
          this.$alert(res.data.msg, '提示信息');
          return;
        }
        if (res.data.code === 0) {
          const nickName = res.data.data.nickName;
          const menu = res.data.data.menu;
          this.userIsLogin(true);
          this.userName(nickName);
          this.unMenu(menu);
          if (this.selected) {
            if (window.localStorage) {
              window.localStorage.setItem('userName', nickName);
              window.localStorage.setItem('isLogin', true);
            }
          }
          this.$router.push('/index');
        };
      });
    },
    ...mapGetters([
      'isLogin'
    ]),
    ...mapMutations({
      userName: 'USER_NAME',
      userIsLogin: 'IS_LOGIN',
      unMenu: 'MENU'
    })
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
#sofLogin
  min-width: 1000px
  position: fixed
  top: 0
  z-index: 99
  bottom: 0
  left: 0
  right: 0
  width: 100%
  height: 100%
  .login
    width: 500px
    height: 450px
    margin: 12% auto
    background: #27a378
    border-radius: 5px
    .top
      padding-top: 40px
      p
        font-size: 50px
        color: #fff
        font-weight: 100
        line-height: 70px
    .btm
      height: 300px    
      width: 430px
      background: #fff
      border-radius: 5px
      margin: 5% auto
      box-sizing: border-box
      padding: 30px
      .user
        text-align: left
        background: #eef0f4
        height: 40px
        border-left: 5px solid #208bd3
        box-sizing: border-box
        padding-left: 15px
        margin: 20px 0
        color: #999
        i
          line-height: 40px
          font-size: 20px 
        input
          height: 100%
          background #eef0f4
          width: 80%
          transition: all .3s
          box-sizing: border-box
          border-radius: 4px
          &::placeholder
            font-size: 16px
          &:hover
            border: 1px solid #ccc
      .checkbox
        text-align: left
        input
          vertical-align:middle
      .btn
        height: 50px
        margin-top: 30px
        input
          width: 100%
          height: 100%
          background: #208bd3
          color: white
          border-radius: 5px
          &:hover
            cursor:pointer
</style>
