<template>
  <div id='leftMenu'>
  <div class="menu-list">
    <ul>
      <li v-for="(item, index) in menuList" :class="[menuActive === index ? 'active': '']" @click="goUrl(item.path, index)">{{item.name}}</li>
    </ul>
  </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '/phone/phoneList',
      menuList: [{
        path: '/phone',
        name: '电话清单'
      },
      {
        path: '/phoneResult',
        name: '电话效果分析'
      },
      {
        path: '/quality',
        name: '电话质量分析'
      }],
      menuActive: 0
    };
  },
  methods: {
    goUrl (path, index) {
      this.menuActive = index;
      this.$router.push(path);
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
#leftMenu
  .menu-list
    height: 100%
    ul
      background: #ecedef
      li
        height: 50px
        line-height: 50px
        transition: all, .3s
        &:hover
          cursor:pointer
          background: linear-gradient(to right, #0078e6 0%,#02c9dc 100%)
      .active
        color: #fff
        background: linear-gradient(to right, #0078e6 0%,#02c9dc 100%)
</style>
