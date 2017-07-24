<template>
	<div>
		 <Charts :id="id" :projectType="gailan" :chartStyle="chartStyle"></Charts> 
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
      chartStyle: {width: '500px', height: '500px', display: 'inline-block'}
    };
  },
  created () {
    this.getgl();
  },
  methods: {
    // 获取概览
    getgl () {
      var url = 'api/campaign/getBriefStatus';
      this.$api.post(url).then((res) => {
        console.log(res.data.data);
        const seriesData = [];
        for (var i in res.data.data) {
          console.log(i);
          var s = '';
          if (i === 'end') {
            s = '已完成';
          } else if (i === 'processing') {
            s = '执行中';
          } else if (i === 'waitExecution') {
            s = '待执行';
          } else if (i === 'review') {
            s = '待审核';
          }
          let thisWeekData = {};
          thisWeekData.value = res.data.data[i];
          thisWeekData.name = s;
          seriesData.push(thisWeekData);
        }
        this.gailan = {
          title: {
            text: '需求单概览',
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
      });
    }
  }
};
</script>

<style>
</style>
