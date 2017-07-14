<template>
<div>
  <div id="report-all">
    <div id="report-title">
      <div class="r-xian"></div>
      <div class="r-yuan"></div>
      <div class="r-title">
        <h1>{{project}}</h1>
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
           <TopAll :topName="topName"/>
         </div>
         <el-collapse v-model="activeNames" @change="zhuyaoquyuHandleChange" class="r-bazzaar-collapse" style="">
          <el-collapse-item ref="collapseItem" class="collapse-item" title="更多市场关注趋势" name="zhuyaoquyu">
            <div>
              <div class="select-item" v-if="selectData !== ''">
                <div class="title">
                  <span>关注趋势（{{selectData}}）</span>
                  <span></span>
                </div>
                <Charts :id="'selectData'" :projectType="selectDataProject[0]" :chartStyle="chartStyle"></Charts>
              </div>
              <div class="select-item" v-if="selectType !== ''">
                <div class="title">
                <span>物业类型（{{selectType}}）</span>
                <span></span>
                </div>
                <Charts :id="'selectType'" :projectType="selectTypeProject[0]" :chartStyle="chartStyle"></Charts>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
       </div>
       <div class="r-bazaar-title">
         <h3>{{shichangfenxiTitle}}</h3>
         <div class="r-bazaar-charts">
            <div class="r-bazaar-charts-l">
              <Charts :id="'shichangfenxiTitleLeft'" :projectType="shichangfenxiTitleLeftProject[0]" :chartStyle="{width: '400px', height: '400px'}"></Charts>
            </div>
            <div class="r-bazaar-charts-r"> 
              <Charts :id="'shichangfenxiTitleRight'" :projectType="shichangfenxiTitleProject[0]" :chartStyle="{width: '600px', height: '400px'}"></Charts>
            </div>
         </div>
         <div class="r-bazaar-charts">
          <h3>{{renqunpianhaozhuyaoquyu}}</h3>
           <div class="r-bazaar-charts-child">
             <div>
               <Charts :id="'renqunpianhaozhuyaoquyuLeft'" :projectType="renqunpianhaozhuyaoquyuProjectLeft[0]" :chartStyle="{width: '330px', height: '380px'}"></Charts>
             </div>
             <div>
               <Charts :id="'renqunpianhaozhuyaoquyuMiddle'" :projectType="renqunpianhaozhuyaoquyuProjectMiddle[0]" :chartStyle="{width: '330px', height: '380px'}"></Charts>
             </div>
             <div>
               <Charts :id="'renqunpianhaozhuyaoquyuRight'" :projectType="renqunpianhaozhuyaoquyuProjectRight[0]" :chartStyle="{width: '330px', height: '380px'}"></Charts>
             </div>
           </div>
         </div>
         <el-collapse v-model="activeNames" @change="gengduopianhaoChange" class="r-bazzaar-collapse" style="">
          <el-collapse-item style="color: #fff !import" :title="gengduorenqunpianhaoTitle" name="2" >
            <div>
              <div class="select-item" v-if="selectData !== ''">
                <div class="title">
                  <span>{{gengduorenqunpianhao01}}</span>
                  <span></span>
                </div>
                <div class="r-bazaar-charts-l">
                  <Charts :id="'gengduorenqunpianhao01Left'" :projectType="gengduorenqunpianhao01LeftProject[0]" :chartStyle="{width: '400px', height: '400px'}"></Charts>
                </div>
                <div class="r-bazaar-charts-r"> 
                  <Charts :id="'gengduorenqunpianhao01Right'" :projectType="gengduorenqunpianhao01RightProject[0]" :chartStyle="{width: '600px', height: '400px'}"></Charts>
                </div>
              </div>
              <div class="select-item" v-if="selectType !== ''">
                <div class="title">
                <span>{{gengduorenqunpianhao02}}</span>
                <span></span>
                </div>
                <div class="r-bazaar-charts-child">
                 <div>
                   <Charts :id="'gengduorenqunpianhao02Left'" :projectType="renqunpianhaozhuyaoquyuProjectLeft[0]" :chartStyle="{width: '330px', height: '380px'}"></Charts>
                 </div>
                 <div>
                   <Charts :id="'gengduorenqunpianhao02Middle'" :projectType="renqunpianhaozhuyaoquyuProjectMiddle[0]" :chartStyle="{width: '330px', height: '380px'}"></Charts>
                 </div>
                 <div>
                   <Charts :id="'gengduorenqunpianhao02Right'" :projectType="renqunpianhaozhuyaoquyuProjectRight[0]" :chartStyle="{width: '330px', height: '380px'}"></Charts>
                 </div>
               </div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
       </div>
       <h2> —— 项目分析 ——</h2>
       <div class="r-bazaar-title">
         <h3>业务评估</h3>
         <div class="r-bazaar-charts" style="height: 490px" v-if="yewupingguTitle !== ''">
            <div class="title">
                <span>{{yewupingguTitle}}</span>
                <span></span>
            </div>
           <Charts :id="'yewupinggu'" :projectType="yewupinggu[0]" :chartStyle="chartStyle"></Charts>
         </div>
         <div class="r-bazaar-charts" v-if="zonghepinggu !== ''">
          <h3>综合评估</h3>
           charts
         </div>
         <div class="r-bazaar-charts" v-if="chengzhangxingpinggu !== ''">
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
          <el-collapse-item title="本案人群偏好排名TOP8" name="3" style="color: #fff">
            <div>
              charts
            </div>
          </el-collapse-item>
        </el-collapse>
        <el-collapse v-model="activeNames" @change="handleChange" class="r-bazzaar-collapse" style="">
          <el-collapse-item title="本案人群偏好评估" name="4" style="color: #fff">
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
import { line } from 'assets/js/charts';
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
      proid: this.$route.params.proid,
      project: this.$route.params.project,
      activeNames: '',
      scrolled: false,
      num: 1,
      chartStyle: {width: '1000px', height: '400px'},
      rBazaarCharts: [],
      selectDataProject: [],
      selectTypeProject: [],
      shichangfenxiTitleProject: [],
      shichangfenxiTitleLeftProject: [],
      renqunpianhaozhuyaoquyuProjectLeft: [],
      renqunpianhaozhuyaoquyuProjectMiddle: [],
      renqunpianhaozhuyaoquyuProjectRight: [],
      yewupinggu: [],
      yewupingguTitle: '三级人群关注变化趋势',
      topName: '上海楼盘',
      selectData: '区域',
      selectType: '物业类型',
      shichangfenxiTitle: '房产人群偏好 - 总价偏好及趋势',
      renqunpianhaozhuyaoquyu: '总价偏好（主要区域）',
      gengduorenqunpianhaoTitle: '更多房产人群偏好',
      gengduorenqunpianhao01: '面积偏好及趋势',
      gengduorenqunpianhao01LeftProject: [],
      gengduorenqunpianhao01RightProject: [],
      gengduorenqunpianhao02: '面积偏好（主要区域）',
      zonghepinggu: '',
      chengzhangxingpinggu: ''
    };
  },
  mounted () {
    window.scrollTo(0, 0);
    this.getData();
    window.addEventListener('scroll', this.handleScroll);
  },
  ready () {
  },
  created () {
  },
  methods: {
    zhuyaoquyuHandleChange (arr) {
      if (arr.length <= 1) {
        return;
      }
      if (this.selectDataProject.length > 0) {
        return;
      }
      if (this.selectData !== '') {
        const selectDataUrl = `/api/apis/subscribe/top5_tag_day_port?keywords=${this.selectData}&projectId=${this.id}`;
        const selectDataName = 'selectData';
        this._getDataList(selectDataUrl, this.selectDataProject, selectDataName);
      };
      if (this.selectTypeProject !== '') {
        const selectTypeProjectUrl = `/api/apis/subscribe/wy_day_port?keywords=${this.selectType}&type=line&projectId=${this.id}`;
        const selectTypeProjectName = 'selectTypeProject';
        this._getDataList(selectTypeProjectUrl, this.selectTypeProject, selectTypeProjectName);
      };
    },
    gengduopianhaoChange (arr) {
      // 更多人群偏好
      const gengduorenqunpianhao01Url = `/api/apis/charts/getReport/areaType?id=${this.id}&type=mianj&style=total`;
      const gengduorenqunpianhao01Name = 'gengduorenqunpianhao01Left';
      this._getDataList(gengduorenqunpianhao01Url, this.gengduorenqunpianhao01LeftProject, gengduorenqunpianhao01Name);
      const gengduorenqunpianhao01RightUrl = `/api/apis/charts/getReport/areaType?id=${this.id}&type=mianj&style=dateinfo`;
      const gengduorenqunpianhao01RightName = 'shichangfenxiTitle';
      this._getDataList(gengduorenqunpianhao01RightUrl, this.gengduorenqunpianhao01RightProject, gengduorenqunpianhao01RightName);
    },
    handleChange () {},
    getData () {
      const shichangfenxiTitleUrl = `/api/apis/charts/getReport/areaType?id=${this.id}&type=zongj&style=dateinfo`;
      const shichangfenxiTitleName = 'shichangfenxiTitle';
      this._getDataList(shichangfenxiTitleUrl, this.shichangfenxiTitleProject, shichangfenxiTitleName);
      // 市场分析
      const shichangfenxiTitleLeftUrl = `/api/apis/charts/getReport/areaType?id=${this.id}&type=zongj&style=total`;
      const shichangfenxiTitleLeftName = 'shichangfenxiTitleLeft';
      this._getDataList(shichangfenxiTitleLeftUrl, this.shichangfenxiTitleLeftProject, shichangfenxiTitleLeftName);
      // 人群偏好
      const renqunpianhaozhuyaoquyuLeftUrl = `/api/apis/charts/getReport/areaType?id=${this.id}&type=zongj&style=dfb_area&top=1`;
      const renqunpianhaozhuyaoquyuName = 'renqunpianhaozhuyaoquyuProject';
      this._getDataList(renqunpianhaozhuyaoquyuLeftUrl, this.renqunpianhaozhuyaoquyuProjectLeft, renqunpianhaozhuyaoquyuName);
      // 人群偏好主要区域
      const renqunpianhaozhuyaoquyuMiddleUrl = `/api/apis/charts/getReport/areaType?id=${this.id}&type=zongj&style=dfb_area&top=2`;
      this._getDataList(renqunpianhaozhuyaoquyuMiddleUrl, this.renqunpianhaozhuyaoquyuProjectMiddle, renqunpianhaozhuyaoquyuName);
      // 人群偏好
      const renqunpianhaozhuyaoquyuRightUrl = `/api/apis/charts/getReport/areaType?id=${this.id}&type=zongj&style=dfb_area&top=3`;
      this._getDataList(renqunpianhaozhuyaoquyuRightUrl, this.renqunpianhaozhuyaoquyuProjectRight, renqunpianhaozhuyaoquyuName);
    },
    handleScroll () {
      const scrollY = window.scrollY;
      const innerHeight = window.innerHeight;
      let timeoutId;
      this.scrolled = scrollY > 0;
      const self = this;
      function callback () {
        if (innerHeight * self.num - scrollY < 100) {
          const num = Number(innerHeight * self.num - scrollY);
          console.log(self.num);
          switch (self.num) {
            case 1:
              const yewupingguUrl = `/api/apis/subscribe/three_lev_people_port?keywords=${encodeURI(self.project)}&type=line`;
              const yewupingguName = 'yewupinggu';
              self._getDataList(yewupingguUrl, self.yewupinggu, yewupingguName);
              break;
            default:
              // statements_def
              break;
          }
          if (num > 0) {
          }
          self.num++;
        }
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(callback, 50);
    },
    _getDataList (url, dataList, name) {
      this.$api.get(url)
      .then(res => {
        if (res.data.code === 0) {
          const data = res.data.data;
          const option = line(data, name);
          dataList.push(option);
        }
      });
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
    justify-content: space-around
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
      color: #1D8CE0
      font-size: 27px
      height: 50px 
    .r-bazaar-title
      border-top-left-radius: 20px
      border-top-right-radius: 20px
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
          font-size: 18px
          border-radius: 10px
          margin: 30px 0
      .r-bazaar-charts
        border: 1px solid #ccc
        border-top: 2px solid #20A0FF
        margin-bottom: 40px
        width: 1000px
        height: 400px
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
    height: 360px
    div
      width: 33%
.r-bazaar-charts-l
  display: inline-block
  box-sizing: border-box
  width: 398px
  height: 400px
.r-bazaar-charts-r
  width: 597px
  display: inline-block      
</style>
