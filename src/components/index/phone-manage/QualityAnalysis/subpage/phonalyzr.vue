<template>
<div>
  <div id="dataSearch">
    <DataSearch :salesmanOptions="salesmanOptions" :sectionOptions="sectionOptions" @childEvent="childEvent"/>
  </div>
  <div class="weekCharts">
   <Charts :id="id" :projectType="projectType[0]" :chartStyle="chartStyle"></Charts>
   <div v-if="isShow" class="isShow"> 
      <div>
        <el-button type="text" style="line-height: 300px" @click="addContrast">+ 添加对比项目</el-button>
      </div>
      <div v-if="addContrastShow" id="addContrastShow">
        <DataSearchContrast :salesmanOptions="dataSalesmanOptions" :sectionOptions="dataSectionOptions" @addChildEvent="addChildEvent"/>
      </div>
   </div> 
   <div v-else>
    <Charts :id="comparePhonalyzrId" :projectType="comparePhonalyzr[0]" :chartStyle="chartStyle"></Charts>
     <div style="text-align: left">
        <el-button type="danger" style="line-height: 10px;" @click="rmContrast">取消选择</el-button>
      </div>
   </div>
 </div>
 <div  class="contrastTableStyle">
   <div :style="ContrastTableStyle">
      <ContrastTable :contrastTableData="contrastTableData" :recordsTotal="recordsTotal[0]" @childPage="childPage"></ContrastTable> 
   </div>
    <div v-if="!isShow" :style="ContrastTableStyle">
      <ContrastTable :contrastTableData="addContrastTableData" :recordsTotal="addRecordsTotal[0]" @childPage="addChildPages"></ContrastTable>
    </div>
 </div>
</div>
</template>

<script>
import DataSearch from '../../DataSearch/DataSearch';
import DataSearchContrast from '../../DataSearch/DataSearchContrast';
import Charts from '../../Charts/charts';
import ContrastTable from '../../contrastTable/contrastTable';
export default {

  name: 'phonalyzr',
  components: {
    DataSearch,
    Charts,
    ContrastTable,
    DataSearchContrast
  },
  data () {
    return {
      salesmanOptions: [],
      dataSalesmanOptions: [],
      sectionOptions: [],
      dataSectionOptions: [],
      chartStyle: {width: '600px', height: '400px', display: 'inline-block'},
      isShow: true,
      id: 'phonalyzr',
      comparePhonalyzrId: 'comparePhonalyzr',
      projectType: [],
      comparePhonalyzr: [],
      addProjectType: [],
      sectionValue: '',
      addSectionValue: '',
      salesmanValue: '',
      addSalesmanValue: '',
      salesmanLabel: '',
      addSalesmanLabel: '',
      contrastTableData: [],
      addContrastTableData: [],
      recordsTotal: [],
      addRecordsTotal: [],
      role: 0,
      phoneInput: '',
      addPhoneInput: '',
      time: '',
      addTime: '',
      addContrastShow: false,
      ContrastTableStyle: {width: '1000px', marginTop: '30px'}
    };
  },
  created () {
    this.getDate('/api/audior/getAudioCallSales', this.salesmanOptions, this.dataSalesmanOptions, this.sectionOptions, this.dataSectionOptions);
    this.getAllJSONByName(0, '', '', '', '2017-02-23%20-%202017-05-31', this.salesmanLabel, this.projectType);
    this.getProductorList('', '', '', '2017-02-23%20-%202017-05-31', 1, 10, this.contrastTableData, this.recordsTotal);
  },
  methods: {
    getDate (url, salesmanOptions, dataSalesmanOptions, sectionOptions, dataSectionOptions) {
      this.$ajax({
        method: 'get',
        url: url
      }).then(res => {
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
            dataSalesmanOptions.push(salesman);
          }
          const sectionData = Array.from(new Set(section));
          for (let val of sectionData) {
            let sections = {};
            sections.value = val;
            sections.label = val;
            sectionOptions.push(sections);
            dataSectionOptions.push(sections);
          }
        }
      });
    },
    childEvent (data) {
      this.projectType = [];
      this.contrastTableData = [];
      this.recordsTotal = [];
      this.sectionValue = data.sectionValue;
      this.salesmanValue = data.salesmanValue ? data.salesmanValue.value : '';
      this.salesmanLabel = data.salesmanValue ? data.salesmanValue.label : '';
      this.phoneInput = data.phoneInput;
      this.time = `${data.minbatch}%20-%20${data.maxbatch}`;
      this.getAllJSONByName(this.role, this.phoneInput, this.salesmanValue, this.sectionValue, this.time, this.salesmanLabel, this.projectType);
      this.getProductorList(this.sectionValue, this.phoneInput, this.salesmanValue, this.time, 1, 10, this.contrastTableData, this.recordsTotal);
    },
    addChildEvent (data) {
      this.comparePhonalyzr = [];
      this.addContrastTableData = [];
      this.addRecordsTotal = [];
      this.addSectionValue = data.sectionValue;
      this.addSalesmanValue = data.salesmanValue ? data.salesmanValue.value : '';
      this.addSalesmanLabel = data.salesmanValue ? data.salesmanValue.label : '';
      this.addPhoneInput = data.phoneInput;
      const innerWiteh = window.innerWidth;
      this.addTime = `${data.minbatch}%20-%20${data.maxbatch}`;
      this.ContrastTableStyle = {width: (innerWiteh - 500) / 2 + 'px', marginTop: '30px'};
      this.getAllJSONByName(this.role, this.addPhoneInput, this.addSalesmanValue, this.addSectionValue, this.addTime, this.addSalesmanLabel, this.comparePhonalyzr, true);
      this.getProductorList(this.addSectionValue, this.addPhoneInput, this.addSalesmanValue, this.addTime, 1, 10, this.addContrastTableData, this.addRecordsTotal);
      this.isShow = false;
    },
    getAllJSONByName (role, phone, searchValue, depart, dataTime, salesmanLabel, projectTypes, flag) {
      const _this = this;
      let projectType = {};
      this.$ajax({
        method: 'get',
        url: `/api/kwords/getAllJSONByName?role=${role}&phone=${phone}&search[value]=${searchValue}&depart=${depart}&data_time=${dataTime}`
      }).then(res => {
        if (res.data) {
          if (res.data.code === 1) {
            _this.$alert(res.data.msg + ', 暂时没有数据', '提示消息');
            if (flag) {
              _this.isShow = true;
              _this.addContrastShow = false;
              _this.ContrastTableStyle = {marginTop: '30px', width: '1000px'};
            }
            return;
          }
          let data = res.data.data;
          let xAxisData = [];
          let positiveData = [];
          let negativeData = [];
          let neutralData = [];
          for (let v of data) {
            xAxisData.push(v.dimension);
            positiveData.push(v.positive);
            negativeData.push(v.negative);
            neutralData.push(v.neutral);
          }
          const titleText = salesmanLabel === '' ? (depart === '' ? '所有部门' : depart) : salesmanLabel;
          projectType = {
            noDataLoadingOption: {
              text: '暂无数据',
              effect: 'bubble',
              effectOption: {
                effect: {
                  n: 0
                }
              }
            },
            title: {
              text: titleText + '话题热度',
              x: 'center',
              y: 'top'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {
              data: ['正面', '负面', '中性'],
              y: 'bottom'

            },
            toolbox: {
              show: true,
              feature: {
                mark: {
                  show: false
                },
                dataView: {
                  show: true,
                  readOnly: true
                },
                magicType: {
                  show: true,
                  type: ['line', 'bar']
                },
                saveAsImage: {
                  show: true
                }
              }
            },
            grid: {
              left: '3%',
              right: '2%',
              bottom: '12%',
              containLabel: true
            },
            yAxis: [{
              show: true,
              type: 'value',
              splitArea: {
                show: true
              }
            }],
            xAxis: {
              type: 'category',
              data: xAxisData
            },
            series: [{
              name: '正面',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'insideRight'
                }
              },
              barWidth: 40,
              data: positiveData,
              markPoint: {
                data: []
              }
            }, {
              name: '负面',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'insideRight'
                }
              },
              data: negativeData,
              markPoint: {
                data: []
              }
            }, {
              name: '中性',
              type: 'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'insideRight'
                }
              },
              data: neutralData,
              markPoint: {
                data: []
              }
            }]
          };
          projectTypes.push(projectType);
        }
      });
    },
    getProductorList (depart, phone, searchValue, dataTime, start, length, contrastTableData, recordsTotal) {
      this.$ajax({
        method: 'get',
        url: `/api/audior/getProductorList?depart=${depart}&phone=${phone}&num=${searchValue}&start=${start}&length=${length}&data_time=${dataTime}`
      }).then(res => {
        console.log(res.data);
        if (res.data) {
          recordsTotal.push(res.data.recordsTotal);
          const data = res.data.data;
          for (let v of data) {
            let list = {};
            list.username = v.username;
            list.call_time = v.call_time;
            list.phone = v.phone;
            list.duration = v.duration;
            list.path = v.path;
            contrastTableData.push(list);
          }
        }
      });
    },
    childPage (data) {
      this.contrastTableData = [];
      this.recordsTotal = [];
      this.getProductorList(this.sectionValue, this.phoneInput, this.salesmanValue, this.time, data.page, data.pageSize, this.contrastTableData, this.recordsTotal);
    },
    addChildPages (data) {
      this.addContrastTableData = [];
      this.addRecordsTotal = [];
      this.getProductorList(this.addSectionValue, this.addPhoneInput, this.addSalesmanValue, this.addTime, data.page, data.pageSize, this.addContrastTableData, this.addRecordsTotal);
    },
    addContrast () {
      this.addContrastShow = true;
    },
    rmContrast () {
      this.isShow = true;
      this.addContrastShow = false;
      this.ContrastTableStyle = {marginTop: '30px', width: '1000px'};
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
.weekCharts
  display: flex
  margin-top: 30px
#addContrastShow
  height: 200px
  width: 500px
  position: relative
  top: -290px
  left: -50px
.contrastTableStyle
  display: flex
  margin-bottom: 20px
  width: 1000px
</style>
