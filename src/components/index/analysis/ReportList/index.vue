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
       <h2> —— 市场分析 —— </h2>
       <div class="r-bazaar-title">
         <div >
           <h3>{{zongguanzhuqushi.dimension}}</h3>
           <div class="r-bazaar-charts" v-if="item != null" v-for="item in zongguanzhuqushi.detail"> 
              <ItemCharts :chartData="cItem" v-if="cItem != null " v-for="cItem in item" :chartStyle="{width: `${1000 / item.length}` + 'px', height: '500px'}"></ItemCharts>
           </div>
         </div>
         <el-collapse v-model="activeNames" @change="zhuyaoquyuHandleChange" class="r-bazzaar-collapse" style="">
          <el-collapse-item ref="collapseItem" class="collapse-item" :title="moreShichangguanzhu.dimension" name="zhuyaoquyu">
            <div>
              <div class="select-item" v-if="item != null" v-for="item in moreShichangguanzhu.detail">
                <div v-for="chItem in item" v-if="chItem != null">
                  <div class="title">
                    <span>{{chItem.title}}</span>
                    <span></span>
                  </div>
                  <ItemCharts :chartData="chItem" :proid="id" :chartStyle="chartStyle"></ItemCharts>
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
                 <ItemCharts v-if="renqunpianhaoqushi.detail" :chartData="chItem" :chartStyle="{width: `${1000 / item.length}` + 'px', height: '300px'}"></ItemCharts> 
                </div>
              </div>
           </div>
          </div>
         <el-collapse v-model="activeNames" @change="gengduopianhaoChange" class="r-bazzaar-collapse" style="">
          <el-collapse-item style="color: #fff !import" :title="gengduorenqunpianhao.dimension" name="2" >
            <div>
              <div class="select-item" v-for="item in gengduorenqunpianhao.detail">
                <div>
                  <div class="title">
                    <span>{{item[0].title}}</span>
                    <span></span>
                  </div>
                  <div class="r-bazaar-charts-child">
                     <div v-if="childItem != null" v-for="childItem in item">
                        <ItemCharts :chartData="childItem" :chartStyle="{width: `${1000 / item.length}` + 'px', height: '300px'}"></ItemCharts>
                     </div>
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
         <div class="r-bazaar-charts" style="height: 490px" v-if="item != null" v-for="item in yewupingguData.detail">
            <div class="title">
                <span>{{item[0].title}}</span>
                <span></span>
            </div>
            <div class="r-bazaar-charts-child">
                <div v-if="childItem != null" v-for="childItem in item">
                  <ItemCharts :chartData="childItem" :chartStyle="{width: `${1000 / item.length}` + 'px', height: '400px'}"></ItemCharts>
                </div>
            </div>
           <!-- <Charts :id="'yewupinggu'" :projectType="yewupinggu[0]" :chartStyle="chartStyle"></Charts> -->
         </div>
       </div>
       <div class="r-bazaar-title">
         <h3>业务剖析</h3>
         <div class="r-bazaar-charts" style="height: 490px" v-if="item != null" v-for="item in yewupouxiData.detail">
            <div class="title">
                <span>{{item[0].title}}</span>
                <span></span>
            </div>
            <div class="r-bazaar-charts-child">
                <div v-if="childItem != null" v-for="childItem in item">
                  <ItemCharts :chartData="childItem" :chartStyle="{width: `${1000 / item.length}` + 'px', height: '400px'}"></ItemCharts>
                </div>
            </div>
         </div>
         <el-collapse v-model="activeNames" @change="Top8HandleChange" class="r-bazzaar-collapse" style="">
          <el-collapse-item :title="benanrenqunpianhaopaiming.dimension" name="3" style="color: #fff">
            <div>
              <div class="select-item" v-for="item in benanrenqunpianhaopaiming.detail">
                <div>
                  <div class="title">
                    <span>{{item[0].title}}</span>
                    <span></span>
                  </div>
                  <div class="r-bazaar-charts-child">
                     <div v-if="childItem != null" v-for="childItem in item">
                        <ItemCharts :chartData="childItem" :chartStyle="{width: `${1000 / item.length}` + 'px', height: '400px'}"></ItemCharts>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
        <el-collapse v-model="activeNames" @change="renqunpianhaoHandleChange" class="r-bazzaar-collapse" style="">
          <el-collapse-item :title="benanrenqunpianhaopinggu.dimension" name="4" style="color: #fff">
            <div>
              <div class="select-item" v-for="item in benanrenqunpianhaopinggu.detail">
                <div>
                  <div class="title">
                    <span>{{item[0].title}}</span>
                    <span></span>
                  </div>
                  <div class="r-bazaar-charts-child">
                     <div v-if="childItem != null" v-for="childItem in item">
                        <ItemCharts :chartData="childItem" :chartStyle="{width: `${1000 / item.length}` + 'px', height: '400px'}"></ItemCharts>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
       </div>
       <div class="r-bazaar-title">
         <h3>营销概况</h3>
         <div class="r-bazaar-charts" style="height: 900px">
           <div class="r-bazaar-charts" style="height: 490px" v-if="item != null" v-for="item in yingxiaogaikuang.detail">
              <div class="title">
                  <span>{{item[0].title}}</span>
                  <span></span>
              </div>
              <div class="r-bazaar-charts-child">
                  <div v-if="childItem != null" v-for="childItem in item">
                    <ItemCharts :chartData="childItem" :chartStyle="{width: `${1000 / item.length}` + 'px', height: '400px'}"></ItemCharts>
                  </div>
              </div>
           </div>
          <div class="r-bazaar-charts" style="height: 490px; border-bottom: none" v-if="yewupingguTitle !== ''" v-for="item in yingxiaogaikuang.detail">
          {{item}}
              <div class="title">
                  <span>{{item[0].title}}</span>
                  <span></span>
              </div>
             <Charts :id="'guanzhuqushi'" :projectType="guanzhuqushiProject[0]" :chartStyle="chartStyle"></Charts>
             <div class="title">
                  <span>{{guanzhuzhangfubiTitle}}</span>
                  <span></span>
              </div>
             <Charts :id="'guanzhuzhangfubi'" :projectType="guanzhuzhangfubiProject[0]" :chartStyle="chartStyle"></Charts>
           </div>
         </div>
         <div class="r-bazaar-charts" style="height: 660px; padding-top: 20px">
           <Charts :id="'quyuguanzhuliang'" :projectType="quyuguanzhuliangProject[0]" :chartStyle="{width: '1000px', height: '700px'}"></Charts>
         </div>
       </div>

      </div>
    </div>
  </div>
  <HotMap v-if="HotMapList.length" :id="id" :projectType="HotMapList"/>
</div>
</template>

<script>
import Charts from '../../../Charts';
import HotMap from '../HotMap';
import TopAll from '../TopAll';
import { line } from 'assets/js/charts';
import { mapGetters } from 'vuex';
import topData from './top5.json';
import ItemCharts from './itemCharts';
export default {
  name: 'index',
  components: {
    HotMap,
    Charts,
    TopAll,
    ItemCharts
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
      gengduorenqunpianhao02ProjectLeft: [],
      gengduorenqunpianhao02ProjectMiddle: [],
      gengduorenqunpianhao02ProjectRight: [],
      gengduorenqunpianhao03: '户型偏好及趋势',
      gengduorenqunpianhao03LeftProject: [],
      gengduorenqunpianhao03RightProject: [],
      gengduorenqunpianhao04: '户型偏好（主要区域）',
      gengduorenqunpianhao04ProjectLeft: [],
      gengduorenqunpianhao04ProjectMiddle: [],
      gengduorenqunpianhao04ProjectRight: [],
      gengduorenqunpianhao05: '地铁偏好及趋势',
      gengduorenqunpianhao05LeftProject: [],
      gengduorenqunpianhao05RightProject: [],
      gengduorenqunpianhao06: '地铁偏好（主要区域）',
      gengduorenqunpianhao06ProjectLeft: [],
      gengduorenqunpianhao06ProjectMiddle: [],
      gengduorenqunpianhao06ProjectRight: [],
      yewupinggu: [],
      yewupingguTitle: '三级人群关注变化趋势',
      zonghepinggu: [],
      zonghepingguTitle: '综合评估',
      chengzhangxingpinggu: '',
      chengzhangxingpingguTitle: '成长性评估',
      chengzhangxingpingguTopProject: [],
      chengzhangxingpingguBottomProject: [],
      yewupouxiTitle: '人群偏好分布',
      yewupouxiProject: [],
      guanzhuqushiTitle: '关注趋势',
      guanzhuqushiProject: [],
      guanzhuzhangfubiTitle: '关注涨跌幅环比',
      guanzhuzhangfubiProject: [],
      quyuguanzhuliangProject: [],
      HotMapList: [],
      top8List: [{
        benanTop: '本案人群偏好排名TOP1-户型',
        leftId: 'benanTop01Left',
        rightId: 'benanTop01right',
        benanTopLeftProject: [],
        benanTopRightProject: []
      }, {
        benanTop: '本案人群偏好排名TOP2-区域',
        leftId: 'benanTop02Left',
        rightId: 'benanTop02right',
        benanTopLeftProject: [],
        benanTopRightProject: []
      }, {
        benanTop: '本案人群偏好排名TOP3-面积',
        leftId: 'benanTop03Left',
        rightId: 'benanTop03right',
        benanTopLeftProject: [],
        benanTopRightProject: []
      }, {
        benanTop: '本案人群偏好排名TOP4-总价',
        leftId: 'benanTop04Left',
        rightId: 'benanTop04right',
        benanTopLeftProject: [],
        benanTopRightProject: []
      }, {
        benanTop: '本案人群偏好排名TOP5-地铁',
        leftId: 'benanTop05Left',
        rightId: 'benanTop05right',
        benanTopLeftProject: [],
        benanTopRightProject: []
      }, {
        benanTop: '本案人群偏好排名TOP6-朝向',
        leftId: 'benanTop06Left',
        rightId: 'benanTop06right',
        benanTopLeftProject: [],
        benanTopRightProject: []
      }, {
        benanTop: '本案人群偏好排名TOP7-装修',
        leftId: 'benanTop07Left',
        rightId: 'benanTop07right',
        benanTopLeftProject: [],
        benanTopRightProject: []
      }, {
        benanTop: '本案人群偏好排名TOP8-单价',
        leftId: 'benanTop08Left',
        rightId: 'benanTop08right',
        benanTopLeftProject: [],
        benanTopRightProject: []
      }],
      renqunpianhaoList: [{
        id: 'renqunpianhao01',
        projectList: [],
        name: '本案人群偏好评估 - 总价'
      }, {
        id: 'renqunpianhao02',
        projectList: [],
        name: '本案人群偏好评估 - 面积'
      }, {
        id: 'renqunpianhao03',
        projectList: [],
        name: '本案人群偏好评估 - 户型'
      }, {
        id: 'renqunpianhao04',
        projectList: [],
        name: '本案人群偏好评估 - 地铁'
      }, {
        id: 'renqunpianhao05',
        projectList: [],
        name: '本案人群偏好评估 - 总价'
      }, {
        id: 'renqunpianhao06',
        projectList: [],
        name: '本案人群偏好评估 - 面积'
      }, {
        id: 'renqunpianhao07',
        projectList: [],
        name: '本案人群偏好评估 - 户型'
      }, {
        id: 'renqunpianhao08',
        projectList: [],
        name: '本案人群偏好评估 - 地铁'
      }],
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
      hotMaps: {}
    };
  },
  mounted () {
    window.scrollTo(0, 0);
    console.log(topData);
    this.getData();
    window.addEventListener('scroll', this.handleScroll);
    this._getReproList();
  },
  ready () {
  },
  created () {
  },
  methods: {
    zhuyaoquyuHandleChange (arr) {
    },
    gengduopianhaoChange (arr) {},
    Top8HandleChange (arr) {},
    renqunpianhaoHandleChange (arr) {
      if (arr.length <= 1) {
        return;
      }
      if (this.renqunpianhaoList[0].projectList.length > 0) {
        return;
      }
      this._getDataList(`/api/apis/charts/getReport/areaType?id=${this.id}&type=zongj&style=bos`, this.renqunpianhaoList[0].projectList, 'matrix');
      this._getDataList(`/api/apis/charts/getReport/areaType?id=${this.id}&type=mianj&style=bos`, this.renqunpianhaoList[1].projectList, 'matrix');
      this._getDataList(`/api/apis/charts/getReport/areaType?id=${this.id}&type=hux&style=bos`, this.renqunpianhaoList[2].projectList, 'matrix');
      this._getDataList(`/api/apis/charts/getReport/areaType?id=${this.id}&type=dit&style=bos`, this.renqunpianhaoList[3].projectList, 'matrix');

      this._getDataList(`/api/apis/charts/getReport/longbos?id=${this.id}&type=zongj`, this.renqunpianhaoList[4].projectList, 'longbos');
      this._getDataList(`/api/apis/charts/getReport/longbos?id=${this.id}&type=mianj`, this.renqunpianhaoList[5].projectList, 'longbos');
      this._getDataList(`/api/apis/charts/getReport/longbos?id=${this.id}&type=hux`, this.renqunpianhaoList[6].projectList, 'longbos');
      this._getDataList(`/api/apis/charts/getReport/longbos?id=${this.id}&type=dit`, this.renqunpianhaoList[7].projectList, 'longbos');
    },
    getData () {
      this._getCharts(this.id, 'zongj', 'dateinfo', 'shichangfenxiTitle', this.shichangfenxiTitleProject);
      // 市场分析
      this._getCharts(this.id, 'zongj', 'total', 'shichangfenxiTitleLeft', this.shichangfenxiTitleLeftProject);
      // 人群偏好
      this._getCharts(this.id, 'zongj', 'dfb_area&top=1', 'renqunpianhaozhuyaoquyuProject', this.renqunpianhaozhuyaoquyuProjectLeft);
      // 人群偏好主要区域
      this._getCharts(this.id, 'zongj', 'dfb_area&top=2', 'renqunpianhaozhuyaoquyuProject', this.renqunpianhaozhuyaoquyuProjectMiddle);
      // 人群偏好
      this._getCharts(this.id, 'zongj', 'dfb_area&top=3', 'renqunpianhaozhuyaoquyuProject', this.renqunpianhaozhuyaoquyuProjectRight);
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
              const yewupingguUrl = `/api/apis/subscribe/three_lev_people_port?keywords=${encodeURI(self.project)}&type=line`;
              const yewupingguName = 'yewupinggu';
              self._getDataList(yewupingguUrl, self.yewupinggu, yewupingguName);
              break;
            case 2:
              const data = {
                keywords: self.project,
                type: 'scatter'
              };
              self.$api.post('/api/apis/report/StartBusinessEvaluation', data)
              .then(res => {
                if (res.data.code === 0) {
                  const data = res.data.data;
                  const option = line(data, 'bosd');
                  self.zonghepinggu.push(option.option3);
                  self.chengzhangxingpingguTopProject.push(option.option1);
                  self.chengzhangxingpingguBottomProject.push(option.option2);
                }
              });
              break;
            case 3:
              self._getDataList(`/api/apis/charts/getReport/topself?id=${self.id}`, self.yewupouxiProject, 'yewupouxiProject');
              break;
            case 4:
              self._getDataList(`/api/apis/subscribe/thecase_rel_top10_port?id=${self.id}&type=line`, self.guanzhuqushiProject, 'guanzhuqushi');
              break;
            case 5:
              self._getDataList(`/api/apis/charts/getReport/huanbi?id=${self.id}`, self.guanzhuzhangfubiProject, 'guanzhuzhangfubi');
              break;
            case 6:
              self._getDataList(`/api/apis/subscribe/area_rose_pie_port?id=${self.id}&type=scatter`, self.quyuguanzhuliangProject, 'quyuguanzhuliang');
              self.$api.get(`api/apis/charts/getReport/map_hot?id=${self.id}`)
              .then(res => {
                console.log(res);
                if (res.data.code === 0) {
                  res.data.data.forEach(item => {
                    let point = item.value.split('|');
                    self.HotMapList.push({
                      lng: point[0],
                      lat: point[1],
                      count: point[2]
                    });
                  });
                }
              });
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
    _getDataList (url, dataList, name, name2, dataList2, titleName) {
      this.$api.get(url)
      .then(res => {
        if (res.data.code === 0) {
          const data = res.data.data;
          const option = line(data, name);
          dataList.push(option);
          if (name2) {
            const option = line(data, name2);
            dataList2.push(option);
          }
          if (titleName) {
            titleName += data[0].classes;
          }
        }
      });
    },
    _getCharts (id, type, style, name, dataList) {
      const url = `/api/apis/charts/getReport/areaType?id=${id}&type=${type}&style=${style}`;
      this._getDataList(url, dataList, name);
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
      console.log('总关注趋势', this.zongguanzhuqushi);
      console.log('更多市场关注趋势', this.moreShichangguanzhu);
      console.log('人群偏好趋势', this.renqunpianhaoqushi);
      console.log('更多人群偏好', this.gengduorenqunpianhao);
      console.log('业务评估', this.yewupingguData);
      console.log('业务剖析', this.yewupouxiData);
      console.log('本案人群偏好排名', this.benanrenqunpianhaopaiming);
      console.log('本案人群偏好评估', this.benanrenqunpianhaopinggu);
      console.log('营销概况', this.yingxiaogaikuang);
      console.log('热力图', this.hotMaps);
    },
    ...mapGetters([
      'userName'
    ])
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
#report-all
  width: 1002px
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
          font-size: 18px
          border-radius: 10px
          margin: 30px 0
      .r-bazaar-charts
        border: 1px solid #ccc
        border-top: 2px solid #20A0FF
        h3
          color: black
          background: white
          border: none
      .select-item
        border-bottom: 1px solid #20A0FF
        height: 500px
  .collapse-item
    color: white
  .r-bazaar-charts-child
    display: flex
    widht: 1000px
    height: 360px
    >div
      width: 100%
.r-bazaar-charts-l
  display: inline-block
  box-sizing: border-box
  width: 398px
  height: 400px
.r-bazaar-charts-r
  width: 597px
  display: inline-block      
</style>
