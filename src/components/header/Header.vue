<template>
  <div>
    <div class="sof-nav">
      <router-link to="/index" class="nav-logo">
          <img :src="logo" alt="">
      </router-link>
      <div class="nav-menu">
        <div class="nav-all">
          <div v-for="item in menu" class="menu-list">
            <div class="menu-top">
              <div @click="goUrl(item.menuone.path ? item.menuone.path : item.menutwo[0].path, item.menuone.code)">
                <div class="menu-t">
                  <p>{{item.menuone.name}}</p>
                  <p>{{item.menuone.english}}</p>
                </div>
              </div>
              <div class="menu-bottom" v-if="item.menutwo.length">
                <div v-for="childItem in item.menutwo"  @click="goUrl(childItem.path, childItem.code)">
                  <div class="menu-child-list">
                    <p>{{childItem.name}}</p>
                    <p>{{childItem.english}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="nav-login">
        <div class="admin"  v-if="isLogin.msg">
          <div>
            欢迎你： <span @click="admin"> {{isLogin.name}}</span>
          </div>
        </div>
        <router-link to="/login" v-else>
          <button type="button" @click="login">登录</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
  data () {
    return {
      menu: [],
      logo: require('assets/img/sof_logo.png')
    };
  },
  watch: {
    // 监听用户登录数据 做权限管理。 判断有没有code 没有返回 -1
    getMenu (newVal) {
      this.menu.forEach((item, index) => {
        item.menuone.code = (newVal[index] !== undefined ? newVal[index].menuone.code : -1);
        item.menutwo.forEach((im, idx) => {
          im.code = (newVal[index].menutwo[idx] !== undefined ? newVal[index].menutwo[idx].code : -1);
        });
      });
    }
  },
  created () {
    this._getAllMenu();
  },
  computed: {
    ...mapGetters(['isLogin', 'getMenu'])
  },
  methods: {
    login () {},
    admin () {
      alert('个人中心');
    },
    goUrl (path, code) {
      if (this.isLogin.msg === false) {
        this.$alert('请先登录！', '提示信息');
        return;
      }
      if (code === -1) {
        this.$alert('对不起，权限不足！', '提示信息');
        return;
      }
      this.$router.push(path);
      // 保存权限，设置权限管理
      this.setJurisdiction({path: path, code: code});
    },
    _getAllMenu () {
      this.$api.get('/api/user/getAllMenu').then(res => {
        this.menu = res.data.data;
        console.log(res);
      });
    },
    ...mapMutations({
      setJurisdiction: 'JURISDICTION'
    })
  }
};

</script>

<style lang="stylus" rel="stylesheet/stylus">
  .itemWdith
    display: inline-block
    width: 100%
    height: 100%
  .sof-nav
    height: 98px
    width: 100%
    background: linear-gradient(to right, #007bf7 , #63c653)
    box-sizing: border-box
    display: flex
    .nav-logo
      width: 20%
      height: 98px
      min-width: 200px
      text-align: right
      padding: 20px
      box-sizing: border-box
      img
        height:100%
    .nav-menu
      width: 60%
      min-width: 600px
      .nav-all
        display: flex
        height: 98px
        .menu-list
          .menu-top
            width: 200px
            box-sizing: border-box
            .menu-t
              padding-top: 10px
              box-sizing: border-box
              height: 98px
              transition: all .3s
              p
                padding-top: 10px
                line-height: 25px
                color: white
            .menu-bottom
              position: relative
              width: 100%
              height:0px
              overflow:hidden
              z-index: 99999
              background: #fff
              box-sizing: border-box
              transition: height .3s
              .menu-child-list
                height: 90px
                padding-top: 20px
                border-bottom: 1px solid #ccc
                box-sizing: border-box
                p
                  line-height: 25px
                  color: #292929
                  &:last-child
                    color: #949494
                &:hover
                  background: #efefef    
            &:hover
              cursor:pointer
              .menu-t
                background: #027cdf
              .menu-bottom
                border: 1px solid #eee
                height: 180px
    .nav-login
      width: 20%
      padding: 30px 50px 0
      text-align: right
      box-sizing: border-box
      min-width: 200px
      .admin
        border-left: 1px solid #ccc
        >div
          color: white
          line-height: 38px
          span
            color: yellow
            &:hover
              cursor:pointer
      button
        width: 120px
        height: 40px
        border: none
        background: #108aed
        border-radius: 4px
        font-size: 15px
        line-height: 40px
        color: white
        transition: all .2s
        &:hover
          cursor:pointer
          background: #0e76ca
          color: #eee
</style>
