<template>
<div>
 <div class="border">
   <el-tag class="borderData">数据概览</el-tag>
 </div>
 <div>
   <el-row>
    <el-col :span="4" v-for="(o, index) in phoneList" :key="o"  style="padding: 40px 0;">
      <div class="borderDataList">
        <p>{{o.title}}</p>
        <div>
          <span class="lessColor">{{o.endLess > o.less ? '↓' : '↑'}}</span>
          <span class="lessColor">{{o.per}}</span>
          <span>{{o.less}}</span>
        </div>
      </div>
    </el-col>
  </el-row>
 </div>
 <div class="border">
   <el-tag class="borderData">数据概览</el-tag>
 </div>
 <div class="weekCharts">
   <Charts :id="id" :projectType="thisWeek" :chartStyle="chartStyle"></Charts>
   <Charts :id="compareThisWeekId" :projectType="compareThisWeek" :chartStyle="chartStyle"></Charts>
 </div>
</div>
</template>

<script>
import Charts from '../../../../Charts';
export default {

  name: 'thisWeek',
  components: {
    Charts
  },
  data () {
    return {
      phoneList: [{title: '本周总数', less: 0, per: '', endLess: 0}, {title: '10s内通话数', less: 0, per: '', endLess: 0}, {title: '10s~20s内通话数', less: 0, per: '', endLess: 0}, {title: '20s~30s内通话数', less: 0, per: '', endLess: 0}, {title: '30s以上通话数', less: 0, per: '', endLess: 0}],
      id: 'thisWeek',
      compareThisWeekId: 'compareThisWeek',
      thisWeek: {},
      compareThisWeek: {},
      chartStyle: {width: '500px', height: '500px', display: 'inline-block'}
    };
  },
  created () {
    this.getData('/api/audior/getAudioInfo', '', this.phoneList);
    this.getData('/api/audior/getLastAudioInfo', true, this.phoneList);
    this.getCharts();
  },
  methods: {
    getData (url, flag, data) {
      this.$api.get(url).then((res) => {
        if (res.data && res.data.data) {
          const datas = res.data.data;
          if (flag) {
            data[0].endLess = Number(datas.sum);
            data[1].endLess = Number(datas.less10);
            data[2].endLess = Number(datas.less20);
            data[3].endLess = Number(datas.less30);
            data[4].endLess = Number(datas.gre30);
          } else {
            data[0].less = Number(datas.sum);
            data[1].less = Number(datas.less10);
            data[2].less = Number(datas.less20);
            data[3].less = Number(datas.less30);
            data[4].less = Number(datas.gre30);
            data[0].per = datas.sum_per.indexOf('-') !== -1 ? datas.sum_per.split('-')[1] : datas.sum_per.split('+')[1];
            data[1].per = datas.sum_per.indexOf('-') !== -1 ? datas.less1_per.split('-')[1] : datas.less1_per.split('+')[1];
            data[2].per = datas.sum_per.indexOf('-') !== -1 ? datas.less2_per.split('-')[1] : datas.less2_per.split('+')[1];
            data[3].per = datas.sum_per.indexOf('-') !== -1 ? datas.less3_per.split('-')[1] : datas.less3_per.split('+')[1];
            data[4].per = datas.sum_per.indexOf('-') !== -1 ? datas.gre3_per.split('-')[1] : datas.gre3_per.split('+')[1];
          }
          const legendData = [];
          const seriesData = [];
          const compareSeriesData = [];
          for (let i = 1; i < data.length; i++) {
            legendData.push(data[i].title);
            let thisWeekData = {};
            let compareData = {};
            thisWeekData.value = data[i].less;
            thisWeekData.name = data[i].title;
            compareData.value = data[i].endLess;
            compareData.name = data[i].title;
            seriesData.push(thisWeekData);
            compareSeriesData.push(compareData);
          }
          this.thisWeek = {
            title: {
              text: '本周通话时长统计',
              x: 'center',
              y: '10%'
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {},
            series: [{
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: seriesData,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }]
          };
          this.compareThisWeek = {
            title: {
              text: '上周通话时长统计',
              x: 'center',
              y: '10%'
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {},
            series: [{
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: compareSeriesData,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }]
          };
        }
      });
    },
    getCharts () {

    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.border
  border: 1px solid #e3e3e3
  padding: 4px
  text-align: left
  overflow: hidden
  .borderData
    background: #a7a7a7
    border-radius: 0
    padding: 5px 20px
    height:35px
    position: relative
  :after
    content: ''
    display: inline-block
    position: absolute
    width: 15px
    height: 15px 
    background: white
    transform: rotate(44deg)
    top:30px
    left: 35px
.borderDataList
  height: 100px
  border-right: 1px solid #ccc
  div
    margin: 0 auto
    height:100px
    text-align: center
    .lessColor
      font-size: 30px
      color: #3e8fd2
    span
      display: inline-block
      width: 45%
      line-height: 100px
    :first-child
      width: 10%
    :last-child
       width: 10%
.weekCharts
  display: flex
  padding-bottom: 90px
</style>
