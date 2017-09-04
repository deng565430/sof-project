<template>
	<div class="gailans">
		 <!-- <Charts :id="id" :projectType="gailan" :chartStyle="chartStyle"></Charts>  -->
     <h2>需求单概览</h2>
     <div style="display:flex;margin-top:33px">
     <router-link :to="{name: 'orders', params: {num: i.value}}" class="one"  style="display:flex" v-bind:style="i.styleObject" v-for="i in itme">
           <div style='flex:1'>
               <span>{{i.title}}</span>
               <span class="title"><span>{{i.num}}</span>个</span>
           </div>
           <div class="images"><img :src="i.img" width="28px"/></div>
      </router-link>
     </div>

	</div>
</template>

<script>
import Charts from '../../../Charts';

export default {
  components: {
    Charts
  },
  data () {
    return {
      gailan: {},
      id: 'gailan',
      chartStyle: {width: '500px', height: '500px', display: 'inline-block'},
      itme: [{
        'styleObject': {
          'background': '#3285ff'
        },
        'title': '已完成',
        'value': '3',
        'num': 1,
        'img': require('assets/img/order_done.png')
      }, {
        'styleObject': {
          'background': '#eb5733'
        },
        'title': '执行中',
        'value': '2',
        'num': 2,
        'img': require('assets/img/order_zhixing.png')
      }, {
        'styleObject': {
          'background': '#3eb36f'
        },
        'title': '待执行',
        'value': '1',
        'num': 3,
        'img': require('assets/img/order_daizhixing.png')
      }, {
        'styleObject': {
          'background': '#ea9336'
        },
        'title': '待审核',
        'value': '0',
        'num': 4,
        'img': require('assets/img/order_shenhe.png')
      }]
    };
  },
  created () {
    this.getgl();
  },
  methods: {
    // 获取概览
    getgl () {
      var url = '/api/campaign/getBriefStatus';
      this.$api.post(url).then((res) => {
        for (var i = 0; i < this.itme.length; i++) {
          if (this.itme[i].title === '已完成') {
            this.itme[i].num = res.data.data.end;
          } else if (this.itme[i].title === '执行中') {
            this.itme[i].num = res.data.data.processing;
          } else if (this.itme[i].title === '待执行') {
            this.itme[i].num = res.data.data.waitExecution;
          } else if (this.itme[i].title === '待审核') {
            this.itme[i].num = res.data.data.review;
          }
        }
        // const seriesData = [];
        // for (var i in res.data.data) {
        //   var s = '';
        //   if (i === 'end') {
        //     s = '已完成';
        //   } else if (i === 'processing') {
        //     s = '执行中';
        //   } else if (i === 'waitExecution') {
        //     s = '待执行';
        //   } else if (i === 'review') {
        //     s = '待审核';
        //   }
        //   let thisWeekData = {};
        //   thisWeekData.value = res.data.data[i];
        //   thisWeekData.name = s;
        //   seriesData.push(thisWeekData);
        // }
        // this.gailan = {
        //   title: {
        //     text: '需求单概览',
        //     x: 'center',
        //     y: '10%'
        //   },
        //   tooltip: {
        //     trigger: 'item',
        //     formatter: '{a} <br/>{b} : {c} ({d}%)'
        //   },
        //   legend: {},
        //   series: [{
        //     name: '访问来源',
        //     type: 'pie',
        //     radius: '55%',
        //     center: ['50%', '60%'],
        //     data: seriesData,
        //     itemStyle: {
        //       emphasis: {
        //         shadowBlur: 10,
        //         shadowOffsetX: 0,
        //         shadowColor: 'rgba(0, 0, 0, 0.5)'
        //       }
        //     }
        //   }]
        // };
      });
    }
  }
};
</script>

<style lang="css" scoped>
.gailans h2{
  height: 28px;
  line-height: 28px;
  text-align: left;
  font-size: 18px;
  color: #007bf8;
  border-left: 4px solid #007bf8;
  padding-left: 18px;
  margin-top: 15px;
  margin-bottom: 20px;
}
.one{
  width: 156px;
  height: 80px;
  background: #3285ff;
  border-radius: 3px;
  display: flex;
  padding: 15px;
  color: #e8eef6;
  box-sizing: border-box;
  font-size: 15px;
  margin-right: 25px;
}
.one span{
  display: inline-block;
}
.title{
  display: inline-block;
  margin-top: 8px
}
.images{
  display: flex;
  flex: 1 1 0%;
  align-items: center;
  justify-content: center
}
</style>
