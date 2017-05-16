<template>
  <div id="footer">
    <div id="footerFirst">
      <div><h2>关于我们</h2></div>
      <div><h2>联系我们</h2></div>
      <div><h2>数据合作</h2></div>
    </div>
    <div>
      <div>
        <p>一方面为企业提供数据产品、</p>
        <p>数据输出及翔实专业的数据分析</p>
        <p>及咨询服务.另一方面为企业开</p>
        <p>发建设数据管理系统（DMS）</p>
      </div>
      <div>
        <p>service@richest007.com</p>
        <p>021-6298 5098</p>
        <p>中国上海普陀区</p>
        <p>洛川中路1158号B2 118室，名仕街</p>
      </div>
      <div>
        <p>数据共享，创造大互联网时代</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '1'
    };
  },

  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath);
    }
  }
};

</script>

<style lang="stylus" rel="stylesheet/stylus">
  #footer
    z-index:999
    position: fixed
    left: 0
    right: 0
    bottom: 0
    margin-top: 100px
    padding: 10px 150px
    color: white
    height: 40px
    background: #424242
    transition:height 1s;
    >:first-child
      display: flex
      border-bottom: 1px solid #898989
      margin: 10px 0
      height: 50px
      div
        width:33%
        margin: 0 auto
        border-bottom:2px
        h2
          text-align: center
          line-height: 30px
          font-size:20px
    >:last-child
      display: flex
      div
        width:33%
        margin: 0 auto
        border-bottom:2px
        p
          line-height:30px
          font-size: 14px
      :last-child
        p
          line-height: 100px
  #footer:hover
    height:200px
</style>
