<template>
<div>
  <div id="searchIpt">
  <Search @searchValue="searchValue" :placeholder="'点击搜索,如：楼盘名称'"/>
  </div>
  <div id="projectList">
    <div class="border">
       <el-tag class="borderData">订阅列表</el-tag>
     </div>
    <div v-for="item in project">
      <h3 style="text-align: right; color: #4272e3; line-height: 30px">{{item.title}}</h3>
      <div class="project-list-clild" v-for="desc in item.desc">
        <div>
          <span>订阅开始日期： {{desc.start}}</span>
          <span>订阅时长： {{desc.duration}}</span>
          <span>订阅截至日期： {{desc.end}}</span>
        </div>
        <div>
          <div class="project-list-left">
            <div>
              <p class="list-color">行业</p>
              <p>{{desc.industry}}</p>
            </div>
            <div>
              <p class="list-color">类型</p>
              <p>{{desc.type}}</p>
            </div>
            <div>
              <p class="list-color">标签</p>
              <p>{{desc.tag}}</p>
            </div>
            <div>
              <p class="list-color">订阅类型</p>
              <p>{{desc.dingyueType}}</p>
            </div>
          </div>
          <div  class="project-list-right">
            <div>
              <p>本期报告 <span> {{desc.nowReport}}</span></p>
              <p>下期报告 <span> {{desc.nextReport}}</span></p>
            </div>
            <div class="show-btn" @click="showReportList">
              <router-link :to="'/analysis/report/'+ desc.id"><el-button type="primary" >查看订阅 ></el-button></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Search from '../Search';
export default {

  name: 'index',
  components: {
    Search
  },
  data () {
    return {
      list: [
        {
          title: '国贸天悦佘山住宅',
          id: 10,
          desc: [
            {
              start: '2015/05/03',
              duration: '1年',
              end: '2016/05/02',
              industry: '房产 - 新房',
              type: '上海楼盘',
              tag: '南山雨果 - 住宅',
              dingyueType: '楼盘分析',
              nowReport: '已完成',
              nextReport: '未完成'
            },
            {
              start: '2015/05/03',
              duration: '1年',
              end: '2016/05/02',
              industry: '房产 - 新房',
              type: '上海楼盘',
              tag: '南山雨果 - 住宅',
              dingyueType: '楼盘分析',
              nowReport: '已完成',
              nextReport: '未完成'
            }
          ]
        },
        {
          title: '天山国际',
          id: 11,
          desc: [
            {
              start: '2015/05/03',
              duration: '1年',
              end: '2016/05/02',
              industry: '房产 - 新房',
              type: '上海楼盘',
              tag: '南山雨果 - 住宅',
              dingyueType: '楼盘分析',
              nowReport: '已完成',
              nextReport: '未完成'
            }
          ]
        }
      ],
      project: [
        {
          title: '国贸天悦佘山住宅',
          desc: [
            {
              start: '2015/05/03',
              id: 10,
              duration: '1年',
              end: '2016/05/02',
              industry: '房产 - 新房',
              type: '上海楼盘',
              tag: '南山雨果 - 住宅',
              dingyueType: '楼盘分析',
              nowReport: '已完成',
              nextReport: '未完成'
            },
            {
              start: '2015/05/03',
              duration: '1年',
              id: 11,
              end: '2016/05/02',
              industry: '房产 - 新房',
              type: '上海楼盘',
              tag: '南山雨果 - 住宅',
              dingyueType: '楼盘分析',
              nowReport: '已完成',
              nextReport: '未完成'
            }
          ]
        },
        {
          title: '天山国际',
          desc: [
            {
              start: '2015/05/03',
              id: 12,
              duration: '1年',
              end: '2016/05/02',
              industry: '房产 - 新房',
              type: '上海楼盘',
              tag: '南山雨果 - 住宅',
              dingyueType: '楼盘分析',
              nowReport: '已完成',
              nextReport: '未完成'
            }
          ]
        }
      ]
    };
  },
  methods: {
    searchValue (data) {
      this.project = [];
      this.list.filter(item => {
        if (item.title.indexOf(data) !== -1) {
          return this.project.push(item);
        };
      });
    },
    showReportList () {
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
#searchIpt
  width: 400px
  margin: 0 auto
  position: relative
  top: -35px
  right: -250px
#projectList
  width: 900px
  margin: 0 auto
  text-align: left
  .border
    border: 1px solid #e3e3e3
    padding: 4px
    text-align: left
    overflow: hidden
    margin: 10px 0
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
  h1
    font-size: 20px
    font-weight: 900
  h3
    font-size: 15px
    font-weight: 900
  .project-list-clild
    border-left: 5px solid #2ca8e3
    >div:first-child
      border: 1px solid #ccc
      height: 40px
      span
        display: inline-block
        width: 220px
        font-size: 15px
        text-align: center
        line-height: 40px
    >div:last-child
      border: 1px solid #ccc
      border-top: none
      height: 100px
      display: flex
      .project-list-left
        display: flex
        width: 800px
        div
          width: 25%
          padding-top: 20px
        p
          text-align: center
          line-height: 30px
        .list-color
          color: #6b6b6b
      .project-list-right
        height: 100%
        border-left: 1px solid #ccc
        display: flex
        >div:first-child
          padding-top: 30px
          width: 150px
          p
            font-size: 14px
            line-height: 20px
            text-indent: 1rem
            span
              color: #397748
      .show-btn
        width: 100px
        height: 100%
        float: right
        button
          width: 100%
          height: 100%
</style>
