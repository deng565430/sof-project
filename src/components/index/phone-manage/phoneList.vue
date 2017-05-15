<template>
  <div id="">
    <div class="selectarea" >
      <div class="title"><span>电话清单</span></div>
      <div id="selectData">
        <div>
          <span>选择项目名称:</span>
          <el-select v-model="projectValue" placeholder="请选择名称">
            <el-option
              v-for="item in projectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select>
        </div>
        <div>
          <div class="block">
            <span class="demonstration">选择项目批次:</span>
            <el-date-picker
              v-model="starTimeValue"
              type="daterange"
              align="right"
              placeholder="选择日期范围"
              :picker-options="pickerOptions2">
            </el-date-picker>
          </div>
        </div>
        <div>
          <span>请选择项目类型:</span>
          <el-select v-model="typeValue" placeholder="请选择项目类型">
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </div>
      </div>
      <div id="btn">
        <div class="block">
          <span class="wrapper">
            <el-button type="warning" id="btnWidth" @click="search(0,200)">搜索</el-button>
          </span>
        </div>
      </div>
      <div id="table" v-if="listShow">
        <el-table
          :data="tableData" stripe
          height="450"
          style="width: 100%"
          stripe
          highlight-current-row>
          <el-table-column
            prop="project"
            label="名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="date"
            label="批次"
            width="180">
          </el-table-column>
          <el-table-column
            prop="type"
            label="类型"
            width="180">
          </el-table-column>
           <el-table-column
            prop="phone"
            label="电话">
          </el-table-column>
        </el-table>
        <div class="block" v-if="pageShow">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="200"
            :total="recordsTotal">
          </el-pagination>
        </div>
        <div  style="text-align: right">
          <div class="block">
            <span class="wrapper">
              <el-button type="success" @click="clickupdata">点击下载</el-button>
            </span>
          </div>
        </div>
        
      </div>
      <div>
      </div>
    </div>
    <div >
    </div>    
  </div>
</template>

<script>
export default {
  data () {
    return {
      projectOptions: [],
      projectValue: '',
      typeOptions: [],
      typeValue: '',
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      starTimeValue: '',
      searchValue: {},
      listShow: false,
      tableData: [],
      recordsFiltered: 0,
      currentPage: 1,
      pageShow: true
    };
  },
  created () {
    this.getData('/api/tel/getALLproject', '', this.projectOptions);
    this.getData('/api/tel/getALLtype', '', this.typeOptions);
  },
  methods: {
    getData (url, data, val) {
      this.$ajax({
        method: 'post',
        url: url,
        data: data
      }).then((res) => {
        if (res.data && res.data.data && res.data.data.length > 0) {
          let list = res.data.data;
          for (var i = 0; i < list.length; i++) {
            let data = {};
            data.value = list[i];
            data.label = list[i];
            val.push(data);
          }
        }
      });
    },
    search (val, num) {
      var datas = {};
      this.tableData = [];
      datas.project = this.projectValue;
      datas.type = this.typeValue;
      datas.minbatch = new Date(this.starTimeValue[0]).toLocaleDateString();
      datas.maxbatch = new Date(this.starTimeValue[1]).toLocaleDateString();
      datas.start = val;
      datas.length = num;
      this.listShow = true;
      var that = this;
      this.$ajax({
        method: 'post',
        url: '/api/tel/getTelByCondition',
        data: datas
      }).then(function (res) {
        console.log(res.data);
        if (res.data && res.data.data && res.data.data.length > 0) {
          that.recordsFiltered = res.data.recordsFiltered;
          that.recordsTotal = res.data.recordsTotal;
          that.pageShow = true;
          let list = res.data.data;
          for (var i = 0; i < list.length; i++) {
            let data = {};
            data.project = list[i].project;
            data.date = list[i].batch;
            data.type = list[i].type;
            data.phone = list[i].phone;
            that.tableData.push(data);
          }
        }
      });
    },
    handleSizeChange (num) {
    },
    handleCurrentChange (val, num) {
      this.search(val - 1, 200);
    },
    clickupdata () {
      var url = `http://192.168.1.106/api/tel/exportTel?project=${this.projectValue}&maxbatch=${new Date(this.starTimeValue[1]).toLocaleDateString()}&minbatch=${new Date(this.starTimeValue[0]).toLocaleDateString()}&type=${this.typeValue}`;
      location.href = url;
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.title
  text-align: left
  font-size: 24px
  height: 45px
  border-bottom: 1px solid #e9e9fa
  span
    display: inline-block
    height: 45px
    border-bottom: 1px solid #2495d4
#selectData
  padding-top: 30px
  padding-bottom: 30px
  display: flex
  >div
    display: inline-block
    width: 350px
    span
      display: inline-block
      width:120px
#btn
  padding-bottom: 30px
  text-align: left
  #btnWidth
    width: 120px
#table
  width: 70%   
  .block
    padding: 10px 0   
</style>
