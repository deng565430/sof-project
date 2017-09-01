<template>
<div id="reportList">
  <div id="report-all">
    <div id="report-title">
      <div class="r-title">
        <h1>{{project}}</h1>
      </div>
    </div>
    <div id="report-time">
      <p>数据更新时间： {{updataTime}}</p>
    </div>
    <div v-if="!zongguanzhuqushi.detail" class="text-msg">
         <p>正在获取数据，请稍后！</p>
    </div>
    <div v-else>
      <div class="r-bazaar">
        
       <div>
         <h2> —— 市场分析 —— </h2>
       <div class="r-bazaar-title">
         <div >
           <h3>{{zongguanzhuqushi.dimension}}</h3>
           <div class="r-bazaar-charts" v-if="item != null" v-for="item in zongguanzhuqushi.detail"> 
              <ItemCharts :chartData="cItem" v-if="cItem != null " :projId="id" :projectName="project" v-for="cItem in item" :chartStyle="{width: `${1000 / item.length}` + 'px', height: '500px'}"></ItemCharts>
           </div>
         </div>
         <el-collapse v-model="activeNames" @change="zhuyaoquyuHandleChange" class="r-bazzaar-collapse" style="">
          <el-collapse-item ref="collapseItem" class="collapse-item" :title="moreShichangguanzhu.dimension" name="zhuyaoquyu">
            <div v-if="Moreguanzhuqushi">
              <div class="select-item" v-if="item != null" v-for="item in moreShichangguanzhu.detail">
                <div v-for="chItem in item" v-if="chItem != null">
                  <div class="title">
                    <span>{{chItem.title}}</span>
                    <span></span>
                  </div>
                  <ItemCharts :chartData="chItem" :proid="id" :projectName="project" :chartStyle="{width: `${1000 / item.length}` + 'px', height: '500px'}"></ItemCharts>
                </div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
       </div>
       <div class="r-bazaar-title">
          <h3>{{renqunpianhaoqushi.dimension}}</h3>
          <div v-if="item != null" v-for="item in renqunpianhaoqushi.detail">
           <div class="r-bazaar-charts">
              <h3>{{item[0].title}}</h3>
              <div class="r-bazaar-charts-child">
                <div class="r-bazaar-charts-l" v-if="chItem != null" v-for="chItem in item">
                 <ItemCharts v-if="renqunpianhaoqushi.detail" :projId="id" :projectName="project" :chartData="chItem" :chartStyle="{width: `${1000 / item.length}` + 'px', height: '300px'}"></ItemCharts> 
                </div>
              </div>
           </div>
          </div>
         <el-collapse v-model="activeNames" @change="gengduopianhaoChange" class="r-bazzaar-collapse" style="">
          <el-collapse-item style="color: #fff !import" :title="gengduorenqunpianhao.dimension" name="2" >
            <div v-if="gengduopianhao">
              <div class="select-item" v-for="item in gengduorenqunpianhao.detail">
                <div>
                  <div class="title">
                    <span>{{item[0].title}}</span>
                    <span></span>
                  </div>
                  <div class="r-bazaar-charts-child">
                     <div v-if="childItem != null" v-for="childItem in item">
                        <ItemCharts :chartData="childItem" :projId="id" :projectName="project" :chartStyle="{width: `${1000 / item.length}` + 'px', height: '300px'}"></ItemCharts>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
       </div>
       </div>
       <h2> —— 项目分析 ——</h2>
       <div class="r-bazaar-title" v-if="showTempateFirst">
         <h3>业务评估</h3>
         <div class="r-bazaar-charts" v-if="item != null" v-for="item in yewupingguData.detail">
            <div class="title">
                <span>{{item[0].title}}</span>
                <span></span>
            </div>
            <div class="r-bazaar-charts-child">
                <div v-if="childItem != null" v-for="childItem in item">
                  <ItemCharts :chartData="childItem" :projId="id" :projectName="project" :chartStyle="{width: `${1000 / item.length}` + 'px', height: '400px'}"></ItemCharts>
                </div>
            </div>
         </div>
       </div>
       <div class="r-bazaar-title" v-if="showTempateSecond">
         <h3>业务剖析</h3>
         <div class="r-bazaar-charts" style="height: 490px" v-if="item != null" v-for="item in yewupouxiData.detail">
            <div class="title">
                <span>{{item[0].title}}</span>
                <span></span>
            </div>
            <div class="r-bazaar-charts-child">
                <div v-if="childItem != null" v-for="childItem in item">
                  <ItemCharts :chartData="childItem" :projId="id" :projectName="project" :chartStyle="{width: `${1000 / item.length}` + 'px', height: '400px'}"></ItemCharts>
                </div>
            </div>
         </div>
         <el-collapse v-model="activeNames" @change="Top8HandleChange" class="r-bazzaar-collapse" style="">
          <el-collapse-item :title="benanrenqunpianhaopaiming.dimension" name="3" style="color: #fff">
            <div v-if="Top8Handle">
              <div class="select-item" v-for="item in benanrenqunpianhaopaiming.detail">
                <div>
                  <div class="title">
                    <span>{{item[0].title}}</span>
                    <span></span>
                  </div>
                  <div class="r-bazaar-charts-child">
                     <div v-if="childItem != null" v-for="childItem in item">
                        <ItemCharts :chartData="childItem" :projId="id" :projectName="project" :chartStyle="{width: `${1000 / item.length}` + 'px', height: '400px'}"></ItemCharts>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
        <el-collapse v-model="activeNames" @change="renqunpianhaoHandleChange" class="r-bazzaar-collapse" style="">
          <el-collapse-item :title="benanrenqunpianhaopinggu.dimension" name="4" style="color: #fff">
            <div v-if="renqunpianhao">
              <div class="select-item" v-for="item in benanrenqunpianhaopinggu.detail">
                <div>
                  <div class="title">
                    <span>{{item[0].title}}</span>
                    <span></span>
                  </div>
                  <div class="r-bazaar-charts-child">
                     <div v-if="childItem != null" v-for="childItem in item">
                        <ItemCharts :chartData="childItem" :projId="id" :projectName="project" :chartStyle="{width: `${1000 / item.length}` + 'px', height: '400px'}"></ItemCharts>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
       </div>
       <div class="r-bazaar-title" v-if="showTempateThirdly">
         <h3>营销概况</h3>
         <div>
           <div class="r-bazaar-charts" v-if="item != null" v-for="item in yingxiaogaikuang.detail">
              <div class="title">
                  <span>{{item[0].title}}</span>
                  <span></span>
              </div>
              <div class="r-bazaar-charts-child">
                  <div v-if="childItem != null" v-for="childItem in item">
                    <ItemCharts :chartData="childItem" :projId="id" :projectName="project" :chartStyle="{width: `${1000 / item.length}` + 'px', height: '500px'}"></ItemCharts>
                  </div>
              </div>
           </div>
         </div>
       </div>

      </div>
    </div>
  </div>
  <div v-if="item != null" v-for="item in hotMaps.detail">
    <div v-if="childItem != null" v-for="childItem in item">
      <HotMap :id="id" :projectType="childItem"/>
    </div>
  </div>
</div>
</template>

<script>
import HotMap from '../HotMap';
import { mapGetters } from 'vuex';
import ItemCharts from './itemCharts';
export default {
  name: 'index',
  components: {
    HotMap,
    ItemCharts
  },
  data () {
    return {
      id: this.$route.params.id,
      updataTime: this.$route.params.updatatime,
      project: decodeURI(this.$route.params.project),
      activeNames: '',
      scrolled: false,
      num: 1,
      peportList: [],
      zongguanzhuqushi: {},
      moreShichangguanzhu: {},
      renqunpianhaoqushi: {},
      gengduorenqunpianhao: {},
      yewupingguData: {},
      yewupouxiData: {},
      benanrenqunpianhaopaiming: {},
      benanrenqunpianhaopinggu: {},
      yingxiaogaikuang: {},
      hotMaps: {},
      Moreguanzhuqushi: false,
      gengduopianhao: false,
      Top8Handle: false,
      renqunpianhao: false,
      showTempateFirst: false,
      showTempateSecond: false,
      showTempateThirdly: false
    };
  },
  mounted () {
    window.scrollTo(0, 0);
    window.addEventListener('scroll', this.handleScroll);
    this._getReproList();
  },
  created () {
  },
  methods: {
    zhuyaoquyuHandleChange (arr) {
      if (arr.length > 1) {
        if (this.Moreguanzhuqushi) {
          return;
        }
        this.Moreguanzhuqushi = true;
      }
    },
    gengduopianhaoChange (arr) {
      if (arr.length > 1) {
        if (this.gengduopianhao) {
          return;
        }
        this.gengduopianhao = true;
      }
    },
    Top8HandleChange (arr) {
      if (arr.length > 1) {
        if (this.Top8Handle) {
          return;
        }
        this.Top8Handle = true;
      }
    },
    renqunpianhaoHandleChange (arr) {
      if (arr.length > 1) {
        if (this.renqunpianhao) {
          return;
        }
        this.renqunpianhao = true;
      }
    },
    handleScroll () {
      const scrollY = window.scrollY;
      const innerHeight = window.innerHeight;
      let timeoutId;
      this.scrolled = scrollY > 0;
      const self = this;
      function callback () {
        if (innerHeight * self.num - scrollY < 100) {
          switch (self.num) {
            case 1:
              if (!self.showTempateFirst) {
                self.showTempateFirst = true;
              }
              break;
            case 2:
              if (!self.showTempateSecond) {
                self.showTempateSecond = true;
              }
              break;
            case 3:
              if (!self.showTempateThirdly) {
                self.showTempateThirdly = true;
              }
              break;
            default:
              // statements_def
              break;
          }
          self.num++;
        }
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(callback, 50);
    },
    _getReproList () {
      if (!this.userName()) {
        this.$alert('请先登录', '提示信息');
        this.$router.push('/index');
        return;
      }
      this.$api.get(`/api/config/getUrl?user=${this.userName()}`)
      .then(res => {
        if (res.data.code === 0) {
          this.peportList = res.data.data;
          this._getJsonData();
        } else {
          this.$alert('参数错误', '提示信息');
          this.$router.go(-1);
        }
      });
    },
    _getJsonData () {
      for (let item of this.peportList) {
        switch (item.public_title) {
          case '总关注趋势':
            this.zongguanzhuqushi = item;
            break;
          case '更多市场关注趋势':
            this.moreShichangguanzhu = item;
            break;
          case '人群偏好趋势':
            this.renqunpianhaoqushi = item;
            break;
          case '更多人群偏好':
            this.gengduorenqunpianhao = item;
            break;
          case '业务评估':
            this.yewupingguData = item;
            break;
          case '业务剖析':
            this.yewupouxiData = item;
            break;
          case '本案人群偏好排名':
            this.benanrenqunpianhaopaiming = item;
            break;
          case '本案人群偏好评估':
            this.benanrenqunpianhaopinggu = item;
            break;
          case '营销概况':
            this.yingxiaogaikuang = item;
            break;
          case '热力图':
            this.hotMaps = item;
            break;
        }
      }
    },
    ...mapGetters([
      'userName'
    ])
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
#reportList
  margin-bottom: 0px
#report-all
  width: 1002px
  margin: 30px auto
  #report-title
    display: flex
    margin: 20px 0
    justify-content: space-around
    .r-title
      background: linear-gradient(to right, #027df6 0%,#62c45d 100%);
      height: 50px
      border-radius: 7px
      padding:5px 40px
      margin:0 18px
      transform: skew(-8deg);
      box-shadow: 5px 5px 3px #ccc
      h1
        font-size: 28px
        color: white
        font-weight: 900
        line-height: 45px
        transform: skew(8deg);
  #report-time
    color: black
    height: 70px
    p
      line-height: 40px
  .text-msg
    p
      line-height: 100px
      font-size: 20px  
  .r-bazaar
    margin: 20px 0
    h2
      color: #1D8CE0
      font-size: 27px
      height: 50px
      font-weight: 900
    .r-bazaar-title
      border-top-left-radius: 20px
      border-top-right-radius: 20px
      margin-bottom: 20px
      overflow: hidden
      .title
        margin: 0
        width: 297px
        height: 46px
        line-height: 46px
        font-size: 15px
        text-align: center
        background: #1D8CE0
        margin: 10px
        color: #fff
        z-index: 9
        display: flex
        justify-content: space-around
        span:first-child
          flex-grow: 1
        span:last-child
          display: inline-block
          height: 79px
          width: 40px
          background: #fbfdff
          position: relative
          right: -10px
          transform: rotate(40deg);
      h3
        font-size: 22px
        color: white
        background: #20A0FF
        height: 40px
        line-height: 40px
        text-align: left
        border-top-left-radius: 20px
        border-top-right-radius: 20px
        border: 1px solid #20A0FF
        padding-left: 30px
      .r-bazzaar-collapse
          width: 100%; 
          background: #FF4949
          box-sizing: border-box
          font-size: 18px
          border-radius: 10px
          margin: 30px 0
      .r-bazaar-charts
        border: 1px solid #ccc
        border-top: 2px solid #20A0FF
        padding-bottom: 20px
        h3
          color: black
          background: white
          border: none
      .select-item
        border-bottom: 1px solid #20A0FF
  .collapse-item
    color: white
  .r-bazaar-charts-child
    display: flex
    widht: 1000px
    >div
      width: 100%
.r-bazaar-charts-l
  display: inline-block
  box-sizing: border-box
  width: 398px
.r-bazaar-charts-r
  width: 597px
  display: inline-block      
</style>
