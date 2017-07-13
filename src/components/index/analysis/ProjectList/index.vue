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
      <h3 style="text-align: right; color: #4272e3; line-height: 50px; font-size: 20px;background:#f3f3f3">{{item.name}}</h3>
      <div class="project-list-clild" v-for="desc in item.dimUserSubscribeListDtos">
        <div>
          <span><i class="el-icon-time" style="color: #8dd1e2;"></i> 订阅开始日期： {{desc.date}}</span>
          <span>订阅时长： {{desc.duration === '实时' ? desc.duration : desc.duration + '个月'}}</span>
          <span><i class="el-icon-document" style="color: #8dd1e2;"></i> 订阅截止日期： {{desc.targetDate}}</span>
          <span><i class="el-icon-document" style="color: #8dd1e2;"></i> {{desc.rtype}}</span>
        </div>
        <div>
          <div class="project-list-left">
            <div>
              <p class="list-color">行业</p>
              <p>{{desc.indname}}</p>
            </div>
            <div>
              <p class="list-color">类型</p>
              <p>{{desc.typename}}</p>
            </div>
            <div>
              <p class="list-color">标签</p>
              <p>{{desc.tagname}}</p>
            </div>
            <div>
              <p class="list-color">订阅类型</p>
              <p>{{desc.subscribeType}}</p>
            </div>
          </div>
          <div  class="project-list-right">
            <div>
              <p>本期报告 <span v-html="desc.thisCycle === true ? '已完成' : '未完成'"></span><i :class="desc.thisCycle === true ? 'el-icon-check' : 'el-icon-information'" style="color: #8dd1e2;"></i> </p>
              <p>下期报告 <span v-html="desc.nextCycle === true ? '已完成' : '未完成'"></span><i :class="desc.nextCycle === true ? 'el-icon-check' : 'el-icon-information'" style="color: #8dd1e2;"></i></p>
            </div>
            <div class="show-btn">
              <router-link :to="'/analysis/report/'+ desc.tagname + '/' + desc.userid + '/' + desc.id" ><el-button type="primary" >查看订阅 ></el-button></router-link>
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
      dot: 0,
      dotTop: 0,
      rl: 0,
      rlTop: 0,
      list: [],
      project: []
    };
  },
  mounted () {
    this.getAllList();
  },
  methods: {
    searchValue (data) {
      this.project = [];
      this.list.filter(item => {
        if (item.name.indexOf(data) !== -1) {
          return this.project.push(item);
        };
      });
    },
    getAllList () {
      this.$api.get('/api/apis/report?id=2')
      .then(res => {
        console.log(res);
        if (res.data.code === 0) {
          this.dot = res.data.data.dot;
          this.dotTop = res.data.data.dotTop;
          this.rl = res.data.data.rl;
          this.rlTop = res.data.data.rlTop;
          const data = res.data.data.reportList;
          this.list = data;
          this.project = data;
        }
      });
    },
    format (fmt, time) {
      var o = {
        'M+': time.getMonth() + 1,
        'd+': time.getDate(),
        'h+': time.getHours(),
        'm+': time.getMinutes(),
        's+': time.getSeconds(),
        'q+': Math.floor((time.getMonth() + 3) / 3),
        'S': time.getMilliseconds()
      };
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
      }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
      }
      return fmt;
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
#searchIpt
  width: 500px
  position: relative
  top: -35px
  right: -500px
#projectList
  width: 1000px
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
        font-size: 13px
        text-align: center
        line-height: 40px
    >div:last-child
      border: 1px solid #ccc
      border-top: none
      height: 100px
      display: flex
      .project-list-left
        display: flex
        flex-wrap: wrap
        justify-content: space-around
        align-items: center
        width: 700px
        p
          height: 30px
          font-size: 15px
          text-align: center
          line-height: 30px
          color: black
        p:last-child
          line-height: 20px  
        .list-color
          color: #6b6b6b
      .project-list-right
        height: 100%
        border-left: 1px solid #ccc
        display: flex
        >div:first-child
          padding-top: 30px
          width: 220px
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
