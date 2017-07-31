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
                   <Charts :id="'gengduorenqunpianhao02Left'" :projectType="gengduorenqunpianhao02ProjectLeft[0]" :chartStyle="{width: '330px', height: '380px'}"></Charts>
                 </div>
                 <div>
                   <Charts :id="'gengduorenqunpianhao02Middle'" :projectType="gengduorenqunpianhao02ProjectMiddle[0]" :chartStyle="{width: '330px', height: '380px'}"></Charts>
                 </div>
                 <div>
                   <Charts :id="'gengduorenqunpianhao02Right'" :projectType="gengduorenqunpianhao02ProjectRight[0]" :chartStyle="{width: '330px', height: '380px'}"></Charts>
                 </div>
               </div>
              </div>
              <div class="select-item" v-if="selectData !== ''">
                <div class="title">
                  <span>{{gengduorenqunpianhao03}}</span>
                  <span></span>
                </div>
                <div class="r-bazaar-charts-l">
                  <Charts :id="'gengduorenqunpianhao03Left'" :projectType="gengduorenqunpianhao03LeftProject[0]" :chartStyle="{width: '400px', height: '400px'}"></Charts>
                </div>
                <div class="r-bazaar-charts-r"> 
                  <Charts :id="'gengduorenqunpianhao03Right'" :projectType="gengduorenqunpianhao03RightProject[0]" :chartStyle="{width: '600px', height: '400px'}"></Charts>
                </div>
              </div>
              <div class="select-item" v-if="selectType !== ''">
                <div class="title">
                  <span>{{gengduorenqunpianhao04}}</span>
                  <span></span>
                </div>
                <div class="r-bazaar-charts-child">
                 <div>
                   <Charts :id="'gengduorenqunpianhao04Left'" :projectType="gengduorenqunpianhao04ProjectLeft[0]" :chartStyle="{width: '330px', height: '380px'}"></Charts>
                 </div>
                 <div>
                   <Charts :id="'gengduorenqunpianhao04Middle'" :projectType="gengduorenqunpianhao04ProjectMiddle[0]" :chartStyle="{width: '330px', height: '380px'}"></Charts>
                 </div>
                 <div>
                   <Charts :id="'gengduorenqunpianhao04Right'" :projectType="gengduorenqunpianhao04ProjectRight[0]" :chartStyle="{width: '330px', height: '380px'}"></Charts>
                 </div>
                </div>
              </div>
              <div class="select-item" v-if="selectData !== ''">
                <div class="title">
                  <span>{{gengduorenqunpianhao05}}</span>
                  <span></span>
                </div>
                <div class="r-bazaar-charts-l">
                  <Charts :id="'gengduorenqunpianhao05Left'" :projectType="gengduorenqunpianhao05LeftProject[0]" :chartStyle="{width: '400px', height: '400px'}"></Charts>
                </div>
                <div class="r-bazaar-charts-r"> 
                  <Charts :id="'gengduorenqunpianhao05Right'" :projectType="gengduorenqunpianhao05RightProject[0]" :chartStyle="{width: '600px', height: '400px'}"></Charts>
                </div>
              </div>
              <div class="select-item" v-if="selectType !== ''">
                <div class="title">
                  <span>{{gengduorenqunpianhao06}}</span>
                  <span></span>
                </div>
                <div class="r-bazaar-charts-child">
                 <div>
                   <Charts :id="'gengduorenqunpianhao06Left'" :projectType="gengduorenqunpianhao06ProjectLeft[0]" :chartStyle="{width: '330px', height: '380px'}"></Charts>
                 </div>
                 <div>
                   <Charts :id="'gengduorenqunpianhao06Middle'" :projectType="gengduorenqunpianhao06ProjectMiddle[0]" :chartStyle="{width: '330px', height: '380px'}"></Charts>
                 </div>
                 <div>
                   <Charts :id="'gengduorenqunpianhao06Right'" :projectType="gengduorenqunpianhao06ProjectRight[0]" :chartStyle="{width: '330px', height: '380px'}"></Charts>
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
         <div class="r-bazaar-charts" style="height: 490px">
            <div class="title">
                <span>{{zonghepingguTitle}}</span>
                <span></span>
            </div>
           <Charts :id="'zonghepinggu'" :projectType="zonghepinggu[0]" :chartStyle="chartStyle"></Charts>
         </div>
         <div class="r-bazaar-charts" style="height: 1070px">
          <div class="r-bazaar-charts" style="height: 490px; border-bottom: none;" v-if="yewupingguTitle !== ''">
              <div class="title">
                  <span>{{chengzhangxingpingguTitle}}</span>
                  <span></span>
              </div>
             <Charts style="margin-left: 200px" :id="'chengzhangxingpingguTop'" :projectType="chengzhangxingpingguTopProject[0]" :chartStyle="{width: '615px', height: '590px'}"></Charts>
             <Charts :id="'chengzhangxingpingguBottom'" :projectType="chengzhangxingpingguBottomProject[0]" :chartStyle="chartStyle"></Charts>
           </div>
         </div>
       </div>
       <div class="r-bazaar-title">
         <h3>业务剖析</h3>
         <div class="r-bazaar-charts" style="height: 490px">
            <div class="title">
                <span>{{yewupouxiTitle}}</span>
                <span></span>
            </div>
           <Charts :id="'yewupouxi'" :projectType="yewupouxiProject[0]" :chartStyle="chartStyle"></Charts>
         </div>
         <el-collapse v-model="activeNames" @change="Top8HandleChange" class="r-bazzaar-collapse" style="">
          <el-collapse-item title="本案人群偏好排名TOP8" name="3" style="color: #fff">
            <div>
                <div class="select-item" v-if="selectData !== ''" v-for="item in top8List">
                  <div class="title">
                    <span>{{item.benanTop}}</span>
                    <span></span>
                  </div>
                  <div class="r-bazaar-charts-l">
                    <Charts :id="item.leftId" :projectType="item.benanTopLeftProject[0]" :chartStyle="{width: '400px', height: '500px'}"></Charts>
                  </div>
                  <div class="r-bazaar-charts-r"> 
                    <Charts :id="item.rightId" :projectType="item.benanTopRightProject[0]" :chartStyle="{width: '600px', height: '500px'}"></Charts>
                  </div>
                </div>
            </div>
          </el-collapse-item>
        </el-collapse>
        <el-collapse v-model="activeNames" @change="renqunpianhaoHandleChange" class="r-bazzaar-collapse" style="">
          <el-collapse-item title="本案人群偏好评估" name="4" style="color: #fff">
            <div>
                <div class="select-item" v-if="selectData !== ''" v-for="item in renqunpianhaoList">
                  <div class="title">
                    <span>{{item.name}}</span>
                    <span></span>
                    </div>
                    <Charts :id="item.id" :projectType="item.projectList[0]" :chartStyle="chartStyle"></Charts>
                  </div>
            </div>
          </el-collapse-item>
        </el-collapse>
       </div>
       <div class="r-bazaar-title">
         <h3>营销概况</h3>
         <div class="r-bazaar-charts" style="height: 900px">
          <div class="r-bazaar-charts" style="height: 490px; border-bottom: none" v-if="yewupingguTitle !== ''">
              <div class="title">
                  <span>{{guanzhuqushiTitle}}</span>
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
      }]
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
      // 更多人群偏好 面积及趋势
      this._getCharts(this.id, 'mianj', 'total', 'gengduorenqunpianhao01Left', this.gengduorenqunpianhao01LeftProject);
      this._getCharts(this.id, 'mianj', 'dateinfo', 'shichangfenxiTitle', this.gengduorenqunpianhao01RightProject);
      // 面积偏好，主要区域
      this._getCharts(this.id, 'mianj', 'dfb_area&top=1', 'renqunpianhaozhuyaoquyuProject', this.gengduorenqunpianhao02ProjectLeft);
      this._getCharts(this.id, 'mianj', 'dfb_area&top=2', 'renqunpianhaozhuyaoquyuProject', this.gengduorenqunpianhao02ProjectMiddle);
      this._getCharts(this.id, 'mianj', 'dfb_area&top=3', 'renqunpianhaozhuyaoquyuProject', this.gengduorenqunpianhao02ProjectRight);
      // 户型偏好及趋势
      this._getCharts(this.id, 'hux', 'total', 'gengduorenqunpianhao01Left', this.gengduorenqunpianhao03LeftProject);
      this._getCharts(this.id, 'hux', 'dateinfo', 'shichangfenxiTitle', this.gengduorenqunpianhao03RightProject);
      // 户型偏好主要区域
      this._getCharts(this.id, 'hux', 'dfb_area&top=1', 'renqunpianhaozhuyaoquyuProject', this.gengduorenqunpianhao04ProjectLeft);
      this._getCharts(this.id, 'hux', 'dfb_area&top=2', 'renqunpianhaozhuyaoquyuProject', this.gengduorenqunpianhao04ProjectMiddle);
      this._getCharts(this.id, 'hux', 'dfb_area&top=3', 'renqunpianhaozhuyaoquyuProject', this.gengduorenqunpianhao04ProjectRight);
      // 地铁偏好及趋势
      this._getCharts(this.id, 'dit', 'total', 'gengduorenqunpianhao01Left', this.gengduorenqunpianhao05LeftProject);
      this._getCharts(this.id, 'dit', 'dateinfo', 'shichangfenxiTitle', this.gengduorenqunpianhao05RightProject);
      // 地铁偏好主要区域
      this._getCharts(this.id, 'dit', 'dfb_area&top=1', 'renqunpianhaozhuyaoquyuProject', this.gengduorenqunpianhao06ProjectLeft);
      this._getCharts(this.id, 'dit', 'dfb_area&top=2', 'renqunpianhaozhuyaoquyuProject', this.gengduorenqunpianhao06ProjectMiddle);
      this._getCharts(this.id, 'dit', 'dfb_area&top=3', 'renqunpianhaozhuyaoquyuProject', this.gengduorenqunpianhao06ProjectRight);
    },
    Top8HandleChange (arr) {
      if (arr.length <= 1) {
        return;
      }
      if (this.top8List[0].benanTopLeftProject.length > 0) {
        return;
      }
      for (let i = 0; i < this.top8List.length; i++) {
        this._getDataList(`/api/apis/charts/getReport/attr?id=${this.id}&style=bar&top=${i + 1}`, this.top8List[i].benanTopLeftProject, 'renqunpianhaozhuyaoquyuProject', 'barStack', this.top8List[i].benanTopRightProject, this.top8List[i].benanTop);
      }
    },
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
    }
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
    >div
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
