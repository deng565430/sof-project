<template>
<div class="dataSearch">
  <div id="search">
      <div class="block">
          <span class="demonstration">时间:</span>
          <TimeSelect @dataEvent="dataEvent" />
        </div>
        <div class="block">
          <span class="demonstration">部门:</span>
          <el-select v-model="sectionValue" clearable  @change="remoteMethod" placeholder="请选择">
            <el-option
              v-for="item in sectionOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>  
        <div class="block">
          <span class="demonstration">业务员:</span>
          <el-select v-model="salesmanValue" placeholder="请选择">
            <el-option
              v-for="item in optionData"
              :key="item.value"
              :label="item.label"
              :value="item">
            </el-option>
          </el-select>
        </div>
        <div class="block">
          <span class="demonstration phoneSpan"> 电话:</span>
          <el-input v-model="phoneInput" placeholder="请输入客户电话"></el-input>
        </div>
      
  <div class="block searchSeek" style="">
    <el-button type="warning" icon="search" @click="dataSearch">搜索</el-button>
  </div>
  </div>
</div>
  
</template>

<script>
import TimeSelect from '../../../TimeSelect';
export default {
  components: {
    TimeSelect
  },
  data () {
    return {
      sectionValue: '',
      salesmanValue: '',
      phoneInput: '',
      timeValue: {},
      optionData: []
    };
  },
  created () {
    this.remoteMethod('');
  },
  methods: {
    remoteMethod (val) {
      this.optionData = [];
      this.salesmanValue = '';
      this.salesmanOptions.filter(item => {
        if (item.depart === val) {
          this.optionData.push(item);
        } else if (val === '') {
          this.optionData.push(item);
        }
      });
    },
    dataSearch () {
      if (this.timeValue.minbatch == null || this.timeValue.maxbatch == null) {
        this.$alert('请选择时间范围', '提示消息');
        return;
      }
      let data = {};
      data.sectionValue = this.sectionValue || '';
      data.salesmanValue = this.salesmanValue;
      data.minbatch = this.timeValue.minbatch;
      data.maxbatch = this.timeValue.maxbatch;
      data.phoneInput = this.phoneInput || '';
      this.$emit('addChildEvent', data);
    },
    dataEvent (data) {
      this.timeValue = data;
    }
  },
  props: ['salesmanOptions', 'sectionOptions']
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.dataSearch
  background-color: white
#search
  border: 1px solid  #ccc
  border-top: 0
  box-shadow: 1px 2px 10px #888
  margin-bottom: 10px
  width: 350px
  padding: 20px
  .block
    display: flex
    width: 300px
    span
      width: 70px
      line-height: 40px
    .phoneSpan
      width: 92px
  .searchSeek
    padding-top: 10px
    margin: 0 auto
</style>
