<template>
<div>
<div id="allProject">
      <el-button size="small">已有全部订阅</el-button>
    <div id="searchIpt">
      <Search @searchValue="searchValue" :placeholder="'点击搜索,如：楼盘名称'"/>
    </div>
  </div>
  <div id="projectList">
    <div class="border">
      <h3>订阅列表</h3>
     </div>
    <div v-for="item in project" class="project-list">
      <h3 class="list-title" style="">{{item.name}}</h3>
      <div class="project-list-clild" v-for="desc in item.dimUserSubscribeListDtos">
        <div class="list-top">
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
              <router-link :to="`/report/${encodeURI(desc.tagname)}/${desc.updatedAt.split(' ')[0]}/${desc.id}`" ><el-button type="primary" >查看订阅 ></el-button></router-link>
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
      this.$api.get('/api/report?id=2')
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
#allProject
  text-align: left
  height: 30px
  border: 1px solid #e4e4e4
  margin: 10px 0
  padding: 15px 10px
  background: #f4f4f4
#searchIpt
  width: 600px
  position: relative
  top: -30px
  right: -200px
#projectList
  width: 1000px
  margin: 0 auto
  margin-bottom: 220px
  text-align: left
  .border
    overflow: hidden
    background: #009bff
    border-radius: 8px 8px 0 0
    h3
     color: white
     line-height: 50px
     font-size: 20px
     padding-left: 50px
     font-weight: 100
  .project-list
    color: #ccc
    .list-title
      font-weight: 100
      text-align: center
      color: #139fff
      line-height: 80px
      font-size: 20px
      background:#f3f3f3
  h1
    font-size: 20px
    font-weight: 900
  .project-list-clild
    border: 1px solid #139fff
    border-radius: 8px
    box-sizing: border-box
    margin-bottom: 10px
    .list-top
      span
        color: #7e7e7e 
        display: inline-block
        width: 220px
        font-size: 13px
        text-align: center
        line-height: 40px
    >div:first-child
      border-bottom: 1px solid #139fff
      height: 40px
    >div:last-child
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
        width: 130px
        height: 100%
        padding: 30px 10px
        float: right
        box-sizing: border-box
</style>
