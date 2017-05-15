<template>
  <div id="">
    <div class="selectarea" >
      <div class="title"><span>电话清单</span></div>
      <div id="selectData">
        <div>
          <span>名称:</span>
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
            <span class="demonstration">批次:</span>
            <el-date-picker
              v-model="starTimeValue"
              type="daterange"
              placeholder="选择日期范围"
              :picker-options="pickerOptions2">
            </el-date-picker>
          </div>
        </div>
        <div>
          <span>类型:</span>
          <el-select v-model="typeValue" multiple placeholder="请选择项目类型">
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
            <el-button type="warning" id="btnWidth" @click="search">搜索</el-button>
          </span>
        </div>
      </div>
      <div id="table" v-if="listShow">
        <el-table
          ref="multipleTable"
          :data="tableData"
          border
          stripe
          empty-text="正在获取。。。"
          max-height=300
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="project"
            label="名称"
            width="120">
            <template scope="scope">{{ scope.row.project }}</template>
          </el-table-column>
          <el-table-column
            prop="date"
            label="批次"
            width="120">
          </el-table-column>
          <el-table-column
            prop="type"
            label="类型"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="phone"
            label="总量"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <div class="block" id="tablePage" v-if="pageShow">
          <span class="wrapper">
            <el-button @click="toggleSelection(tableData)" type="danger">取消选择</el-button>
          </span>
          <span v-if="recordsFiltered!=0">电话总量有：{{recordsFiltered}} 条 </span>
          <el-pagination style="display: inline-block; vertical-align: top"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="200"
            :total="tableData.length">
          </el-pagination>
          <span class="wrapper">
              <el-button type="success" @click="toggleSelection(tableData)">点击下载</el-button>
            </span>
        </div>
        <div  style="text-align: right">
          <div class="block">
            
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
      listShow: true,
      tableData: [],
      recordsFiltered: 0,
      currentPage: 1,
      pageShow: false
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
      this.tableData = [];
      this.recordsFiltered = 0;
      let project = this.projectValue;
      let minbatch = new Date(this.starTimeValue[0]).toLocaleDateString();
      let maxbatch = new Date(this.starTimeValue[1]).toLocaleDateString();
      let that = this;
      this.listShow = true;
      for (var i = 0; i < this.typeValue.length; i++) {
        let ajax = this.$ajax({
          method: 'post',
          url: '/api/tel/getTelByCont',
          data: {
            project: project,
            minbatch: minbatch,
            maxbatch: maxbatch,
            type: this.typeValue[i]
          }
        });
        (function (i) {
          ajax.then(function (res) {
            that.recordsFiltered += res.data.data;
            let data = {};
            data.project = project;
            data.date = minbatch;
            data.type = that.typeValue[i];
            data.phone = res.data.data;
            that.tableData.push(data);
          });
        })(i);
      }
      this.pageShow = true;
    },
    handleSizeChange (num) {
    },
    handleCurrentChange (val, num) {
      this.search(val - 1, 200);
    },
    toggleSelection (rows) {
      console.log(this.multipleSelection);
      var v = '';
      for (v of this.multipleSelection) {
        var url = `http://192.168.1.106/api/tel/exportTel?project=${v.project}&maxbatch=${v.date}&minbatch=${v.date}&type=${v.type}`;
        console.log(url);
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
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
    width: 270px
    span
      padding-top: 10px
      vertical-align: top
      display: inline-block
      width:40px
#btn
  padding-bottom: 30px
  text-align: left
  #btnWidth
    width: 120px
#table
  width: 70%
#tablePage
  padding-top: 10px
  margin-top: 20px
</style>
