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
          :row-key="getRowKeys"
          :expand-row-keys="expands"
          empty-text="正在获取。。。"
          max-height=450
          tooltip-effect="dark"
          style="width: 100%;"
          @expand="toggleRowSelection" >
          <el-table-column type="expand">
            <template scope="props">
              <el-form label-position="left" inline class="">
              <el-form-item v-for="item in props.row.types" label="类型">
                <span>{{item.type}} 总数：{{item.count}}</span>
              </el-form-item>
            </el-form>
            </template>
          </el-table-column>
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column 
            prop="project"
            label="名称"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="batch"
            label="批次"
            show-overflow-tooltip>
            <template scope="scope">{{ scope.row.batch }}</template>
          </el-table-column>
          <el-table-column
            prop="type"
            label="类型"
            show-overflow-tooltip>
          <template scope="scope">所有类型</template>
          </el-table-column>
          <el-table-column
            prop="phone"
            label="总量"
            show-overflow-tooltip>
            <template scope="scope">{{ scope.row.phone }}</template>
          </el-table-column>
        </el-table>
        <div class="block" id="tablePage" v-if="pageShow">
          <span class="wrapper">
            <el-button @click="toggleSelection()" type="danger">取消选择</el-button>
          </span>
          <span v-if="recordsFiltered!=0">电话总量：{{recordsFiltered}} 条 </span>
          <el-pagination style="display: inline-block; vertical-align: top"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="200"
            :total="tableData.length">
          </el-pagination>
          <span class="wrapper">
              <el-button type="success" @click="update(tableData)">导出电话</el-button>
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
      inTableData: [],
      recordsFiltered: 0,
      currentPage: 1,
      pageShow: true,
      pullDownDate: [],
      getRowKeys (row) {
        return row;
      },
      expands: []
    };
  },
  mounted () {
    this.expands.push(this.tableData[1].project);
    console.log(this.expands);
  },
  created () {
    this.getProject('/api/tel/getALLproject', '', this.projectOptions);
    this.getData('/api/tel/getTelCountByCondition', {project: null, minbatch: null, maxbatch: null}, this.tableData);
  },
  methods: {
    getProject (url, list, val) {
      this.$ajax({
        method: 'post',
        url: url,
        data: list
      }).then((res) => {
        console.log(res);
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
    getData (url, list, val) {
      let that = this;
      this.$ajax({
        method: 'post',
        url: url,
        data: list
      }).then((res) => {
        console.log(res);
        if (res.data && res.data.data && res.data.data.length > 0) {
          let list = res.data.data;
          let v = '';
          for (v of list) {
            that.recordsFiltered += v.count;
            let d = {};
            d.project = v.project;
            d.batch = v.batch;
            d.phone = v.count;
            d.type = v.type;
            val.push(d);
          }
        }
      });
    },
    search (val, num) {
      this.tableData.length = [];
      this.recordsFiltered = 0;
      let project = this.projectValue;
      let minbatch = new Date(this.starTimeValue[0]).toLocaleDateString();
      let maxbatch = new Date(this.starTimeValue[1]).toLocaleDateString();
      let that = this;
      this.listShow = true;
      this.$ajax({
        method: 'post',
        url: '/api/tel/getTelCountByCondition',
        data: {
          project: project,
          minbatch: minbatch,
          maxbatch: maxbatch
        }
      }).then(function (res) {
        console.log(res.data);
        if (res.data.data) {
          var v = '';
          for (v of res.data.data) {
            that.getData('/api/tel/getTypeCountByCondition', {project: project, maxbatch: v.batch}, that.pullDownDate);
            that.recordsFiltered += v.count;
            console.log(v);
            let data = {};
            data.project = project;
            data.batch = v.batch;
            data.type = that.typeOptions;
            data.phone = v.count;
            data.types = [];
            that.tableData.push(data);
          }
        }
      });
      this.pageShow = true;
      console.log(this.tableData);
      console.log(this.pullDownDate);
    },
    pullDown (num) {},
    handleCurrentChange (val, num) {
      this.search(val - 1, 200);
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    toggleRowSelection (rows) {
      console.log(this.tableData);
      this.$ajax({
        method: 'post',
        url: '/api/tel/getTypeCountByCondition',
        data: {
          project: rows.project,
          maxbatch: rows.batch
        }
      }).then((res) => {
        console.log(res.data.data);
        let v = '';
        for (v of res.data.data) {
          let count = {};
          count.type = v.type;
          count.count = v.count;
          rows.types.push(count);
        }
      });
      console.log(rows);
    },
    update (rows) {
      var v = '';
      for (v of this.multipleSelection) {
        var url = `http://192.168.1.106/api/tel/exportTel?project=${v.project}&maxbatch=${v.date}&minbatch=${v.date}&type=${v.type}`;
        console.log(url);
      }
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
