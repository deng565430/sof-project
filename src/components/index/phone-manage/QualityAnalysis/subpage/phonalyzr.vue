<template>
<div>
  <div>
    <DataSearch :salesmanOptions="salesmanOptions" :sectionOptions="sectionOptions" @childEvent="childEvent"/>
  </div>
  <div class="weekCharts">
   <Charts :id="{id}" :projectType="{thisWeek}" :chartStyle="chartStyle"></Charts>
   <div v-if="isShow" class="isShow"> 
      <div>
        <p><span>+ </span> 添加对比项</p>
      </div>
   </div> 
    <div v-else>
      <Charts :id="{compareThisWeekId}" :projectType="{compareThisWeek}" :chartStyle="chartStyle"></Charts>
    </div>
 </div>
 <div class="weekCharts">
   <ContrastTable></ContrastTable>
   <div v-if="isShow" class=""> 
      
    </div>
    <div v-else >
      <ContrastTable></ContrastTable>
    </div>
 </div>
</div>
</template>

<script>
import DataSearch from '../../DataSearch/DataSearch';
import Charts from '../../Charts/phoneResultCharts';
import ContrastTable from '../../contrastTable/contrastTable';
export default {

  name: 'phonalyzr',
  components: {
    DataSearch,
    Charts,
    ContrastTable
  },
  data () {
    return {
      salesmanOptions: [],
      sectionOptions: [],
      chartStyle: {width: '500px', height: '500px', display: 'inline-block'},
      isShow: true
    };
  },
  created () {
    this.getDate('/api/audior/getAudioCallSales', this.salesmanOptions, this.sectionOptions);
    this.getAllJSONByName();
  },
  methods: {
    getDate (url, salesmanOptions, sectionOptions) {
      this.$ajax({
        method: 'get',
        url: url
      }).then(res => {
        console.log(res);
        if (res.data && res.data.data) {
          const data = res.data.data;
          const section = [];
          for (let v of data) {
            let salesman = {};
            salesman.value = v.num;
            salesman.depart = v.depart;
            salesman.label = v.name;
            section.push(v.depart);
            salesmanOptions.push(salesman);
          }
          const sectionData = Array.from(new Set(section));
          for (let val of sectionData) {
            let sections = {};
            sections.value = val;
            sections.label = val;
            sectionOptions.push(sections);
          }
        }
      });
    },
    childEvent (data) {
      console.log(data);
      this.$ajax({
        method: 'get',
        url: '/api/kwords/getAllJSONByName',
        data: {}
      }).then(res => {
        console.log(res);
      });
    },
    getAllJSONByName () {
      this.$ajax({
        method: 'get',
        url: '/api/kwords/getAllJSONByName?role=0&phone=&search[value]=&depart=&data_time=2017-02-23%20-%202017-05-31'
      }).then(res => {
        console.log(res.data);
      });
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.isShow
  width: 200px
  height: 200px
  border: 1px solid #d3ddf4
  margin: auto 200px
  p
    line-height: 200px
</style>
