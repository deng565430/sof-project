<template>
<div>
  <div>
    <DataSearch :salesmanOptions="salesmanOptions" :sectionOptions="sectionOptions" @childEvent="childEvent"/>
  </div>
  <div class="weekCharts">
   <Charts :id="id" :projectType="projectType[0]"></Charts>
 </div>
   <div v-if="isShow" class="isShow"> 
      <div>
        <el-button type="text" style="line-height: 300px" @click="addContrast">+ 添加对比项目</el-button>
      </div>
      <div v-if="addContrastShow" id="addContrastShow">
        <DataSearchContrast :salesmanOptions="dataSalesmanOptions" :sectionOptions="dataSectionOptions" @addChildEvent="addChildEvent"/>
      </div>
   </div> 
    <div v-else>
      <Charts :id="addSpeechAnalysisId" :projectType="addSpeechAnalysis[0]"></Charts>
      <div style="text-align: left">
        <el-button type="danger" style="line-height: 10px; margin-bottom: 100px" @click="rmContrast">取消选择</el-button>
      </div>
    </div>
</div>
</template>

<script>
import DataSearch from '../../DataSearch/DataSearch';
import Charts from '../../Charts/charts';
import DataSearchContrast from '../../DataSearch/DataSearchContrast';
export default {

  name: 'speechAnalysis',
  components: {
    DataSearch,
    Charts,
    DataSearchContrast
  },
  data () {
    return {
      salesmanOptions: [],
      dataSalesmanOptions: [],
      sectionOptions: [],
      dataSectionOptions: [],
      isShow: true,
      id: 'speechAnalysis',
      addSpeechAnalysisId: 'addSpeechAnalysis',
      projectType: [],
      sectionValue: '',
      addSectionValue: '',
      salesmanValue: '',
      addSalesmanValue: '',
      salesmanLabel: '',
      addSalesmanLabel: '',
      phoneInput: '',
      addPhoneInput: '',
      time: '',
      addTime: '',
      addContrastShow: false,
      role: 0,
      addSpeechAnalysis: []
    };
  },
  created () {
    this.getDate('/api/audior/getAudioCallSales', this.salesmanOptions, this.dataSalesmanOptions, this.sectionOptions, this.dataSectionOptions);
    this.getAllJSONByNameOrder(0, '', '', '', '2017-02-23%20-%202017-05-31', this.salesmanLabel, this.projectType);
  },
  methods: {
    getDate (url, salesmanOptions, dataSalesmanOptions, sectionOptions, dataSectionOptions) {
      this.$api.get(url).then(res => {
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
      this.sectionValue = data.sectionValue;
      this.salesmanValue = data.salesmanValue ? data.salesmanValue.value : '';
      this.salesmanLabel = data.salesmanValue ? data.salesmanValue.label : '';
      this.phoneInput = data.phoneInput;
      this.time = `${data.minbatch}%20-%20${data.maxbatch}`;
      this.getAllJSONByNameOrder(this.role, this.phoneInput, this.salesmanValue, this.sectionValue, this.time, this.salesmanLabel, this.projectType);
    },
    addChildEvent (data) {
      this.addSpeechAnalysis = [];
      this.addContrastTableData = [];
      this.addRecordsTotal = [];
      this.addSectionValue = data.sectionValue;
      this.addSalesmanValue = data.salesmanValue ? data.salesmanValue.value : '';
      this.addSalesmanLabel = data.salesmanValue ? data.salesmanValue.label : '';
      this.addPhoneInput = data.phoneInput;
      this.addTime = `${data.minbatch}%20-%20${data.maxbatch}`;
      this.getAllJSONByNameOrder(this.role, this.addPhoneInput, this.addSalesmanValue, this.addSectionValue, this.addTime, this.addSalesmanLabel, this.addSpeechAnalysis, true);
      this.isShow = false;
    },
    addContrast () {
      this.addContrastShow = true;
    },
    rmContrast () {
      this.isShow = true;
      this.addContrastShow = false;
    },
    getAllJSONByNameOrder (role, phone, searchValue, depart, dataTime, salesmanLabel, projectTypes, flag) {
      const _this = this;
      const url = `/api/kwords/getAllJSONByName_order?role=${role}&phone=${phone}&search[value]=${searchValue}&depart=${depart}&data_time=${dataTime}`;
      this.$api.get(url).then(res => {
        if (res.data) {
          let projectType = {};
          let kwName = [];
          console.log(kwName);
          if (res.data.code === 1) {
            _this.$alert(res.data.msg + ', 暂时没有数据', '提示消息');
            if (flag) {
              _this.isShow = true;
              _this.addContrastShow = false;
            }
            return;
          }
          let data = res.data.data;
          for (let v of data) {
            kwName.push(v.order_num);
          }
          const legendData = ['面积', '客户态度', '位置', '价格', '项目及反馈'];
          let seriesData = [];
          for (let i in legendData) {
            let obj = {};
            obj.name = legendData[i];
            obj.type = 'bar';
            obj.stack = '总量';
            obj.label = {
              normal: {
                show: true,
                position: 'insideRight'
              }
            };
            obj.data = (function () {
              let objData = [];
              switch (i) {
                case 0:
                  return names('area');
                case 1:
                  return names('attitude');
                case 2:
                  return names('position');
                case 3:
                  return names('price');
                default:
                  return names('proj_props');
              }

              function names (name) {
                for (let j of data) {
                  objData.push(j[name]);
                }
                return objData;
              }
            })();
            seriesData.push(obj);
          }
          projectType = {
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: legendData
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
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [{
              type: 'category',
              data: kwName
            }],
            yAxis: [{
              type: 'value'
            }],
            series: seriesData
          };
          projectTypes.push(projectType);
        }
      });
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.isShow
  width: 300px
  height: 300px
  border: 1px solid #d3ddf4
  margin: 30px 300px
  margin-bottom: 90px
  p
    line-height: 200px
</style>
