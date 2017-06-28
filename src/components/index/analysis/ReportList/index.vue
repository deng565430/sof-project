<template>
<div>
  <div id="report-all">
    <div id="report-title">
      <div class="r-xian"></div>
      <div class="r-yuan"></div>
      <div class="r-title">
        <h1>国贸天悦住宅国贸天悦住宅</h1>
      </div>
      <div class="r-yuan"></div>
      <div class="r-xian"></div>
    </div>
    <div id="report-time">
      <p>数据时间截至： 2017/03/24</p>
    </div>
    <div>
      <div class="r-bazaar">
       <h2> —— 市场分析 ——</h2>
       <div class="r-bazaar-title">
         <h3>总关注趋势</h3>
         <div class="r-bazaar-charts">
           <TopAll />
         </div>
         <el-collapse v-model="activeNames" @change="handleChange" class="r-bazzaar-collapse" style="">
          <el-collapse-item title="更多市场关注趋势" name="1" style="color: #fff">
            <div>
              charts
            </div>
          </el-collapse-item>
        </el-collapse>
       </div>
       <div class="r-bazaar-title">
         <h3>房产人群偏好 - 总价偏好及趋势</h3>
         <div class="r-bazaar-charts">
           charts
         </div>
         <div class="r-bazaar-charts">
          <h3>总价偏好（主要区域）</h3>
           charts
         </div>
         <el-collapse v-model="activeNames" @change="handleChange" class="r-bazzaar-collapse" style="">
          <el-collapse-item style="color: #fff !import" title="更多房产人群偏好" name="1" >
            <div>
              charts
            </div>
          </el-collapse-item>
        </el-collapse>
       </div>
       <h2> —— 项目分析 ——</h2>
       <div class="r-bazaar-title">
         <h3>业务评估</h3>
         <div class="r-bazaar-charts">
           charts
         </div>
         <div class="r-bazaar-charts">
          <h3>综合评估</h3>
           charts
         </div>
         <div class="r-bazaar-charts">
          <h3>成长性评估</h3>
           charts
         </div>
       </div>
       <div class="r-bazaar-title">
         <h3>业务剖析</h3>
         <div class="r-bazaar-charts">
            <h3>本案人群偏好分布</h3>
           charts
         </div>
         <div class="r-bazaar-charts">
          <h3>综合评估</h3>
           charts
         </div>
         <el-collapse v-model="activeNames" @change="handleChange" class="r-bazzaar-collapse" style="">
          <el-collapse-item title="本案人群偏好排名TOP8" name="1" style="color: #fff">
            <div>
              charts
            </div>
          </el-collapse-item>
        </el-collapse>
        <el-collapse v-model="activeNames" @change="handleChange" class="r-bazzaar-collapse" style="">
          <el-collapse-item title="本案人群偏好评估" name="1" style="color: #fff">
            <div>
              charts
            </div>
          </el-collapse-item>
        </el-collapse>
       </div>
       <div class="r-bazaar-title">
         <h3>营销概况</h3>
         <div class="r-bazaar-charts">
            <h3>关注趋势</h3>
           charts
         </div>
         <div class="r-bazaar-charts">
          <h3>关注涨跌幅环比</h3>
           charts
         </div>
          <div class="r-bazaar-charts">
          <h3>区域关注量分布</h3>
           charts
         </div>
       </div>

      </div>
    </div>
  </div>
  <HotMap />
</div>
</template>

<script>
import Charts from '../../../Charts';
import HotMap from '../HotMap';
import TopAll from '../TopAll';
export default {
  name: 'index',
  components: {
    HotMap,
    Charts,
    TopAll
  },
  data () {
    return {
      id: this.$route.params.id,
      activeNames: '',
      scrolled: false,
      num: 1,
      rBazaarCharts: []
    };
  },
  mounted () {
    this.getData();
    window.addEventListener('scroll', this.handleScroll);
  },
  ready () {
  },
  methods: {
    handleChange (arr) {
      if (arr.length <= 1) {
        return;
      }
      console.log(arr.length);
    },
    getData () {
      this.$api.get('')
      .then(res => {
        console.log(res);
      });
    },
    handleScroll () {
      const scrollY = window.scrollY;
      const innerHeight = window.innerHeight;
      let timeoutId;
      this.scrolled = scrollY > 0;
      const self = this;
      function callback () {
        if (innerHeight * self.num - scrollY < 100) {
          const num = Number(innerHeight - scrollY);
          if (num > 0) {
            console.log(num);
          }
          self.num++;
        }
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(callback, 50);
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
#report-all
  width: 1000px
  margin: 30px auto
  #report-title
    display: flex
    margin: 20px 0
    .r-yuan
      height: 10px
      width: 10px
      background: #ff6600
      border-radius: 50%
      margin: 20px 2px
    .r-xian
      border-top: 2px solid #ff6600  
      width: 27%
      margin: 24px 3px
    .r-title
      background: #ff6600
      height: 50px
      border-radius: 50px
      padding:0 30px
      margin:0 18px
      h1
        font-size: 28px
        color: white
        font-weight: 900
        line-height: 45px
  #report-time
    color: #ff6600
    height: 70px
    border-bottom: 1px solid #ccc
  .r-bazaar
    margin: 20px 0
    h2
      color: #1497e1
      font-size: 27px
      height: 50px 
    .r-bazaar-title
      border-top-left-radius: 20px
      border-top-right-radius: 20px
      overflow: hidden
      h3
        font-size: 22px
        color: white
        background: #1497e1
        height: 40px
        line-height: 40px
        text-align: left
        border-top-left-radius: 20px
        border-top-right-radius: 20px
        border: 1px solid #1497e1
        padding-left: 30px
      .r-bazzaar-collapse
          width: 100%; 
          background: #e25657
          font-size: 18px
          border-radius: 10px
          margin: 30px 0
      .r-bazaar-charts
        border: 1px solid #ccc
        border-top: 2px solid #1497e1
        margin-bottom: 40px
        height: 400px
        h3
          color: black
          background: white
          border: none
</style>
