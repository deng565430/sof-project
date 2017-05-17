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
          :expand-row-keys="expands"
          max-height=450
          tooltip-effect="dark"
          style="width: 100%;"
          @selection-change="handleSelectionChange"
          @expand="toggleRowSelection" >
          <el-table-column type="expand">

            <template scope="props">
            <el-table
             :data="props.row.types"
             style="width: 60%; margin-left:18%">
             <el-table-column
               prop="type"
               label="类型">
             </el-table-column>
             <el-table-column
               prop="count"
               label="总数">
             </el-table-column>
            </el-table>
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
          <template scope="scope">
            <el-select
            v-model="scope.row.numAllType"
            multiple
            filterable
            remote
            placeholder="所有类型">
            <el-option
              v-for="item in scope.row.types"
              :key="item.count"
              :label="item.type"
              :value="item.type">
            </el-option>
          </el-select>
          </template>
          </el-table-column>
          <el-table-column
            prop="phone"
            label="总量"
            show-overflow-tooltip>
            <template scope="scope" >{{ scope.row.phone }}</template>
          </el-table-column>
        </el-table>
        <div class="block" id="tablePage" v-if="pageShow">
          <span v-if="recordsFiltered!=0">电话总量：{{recordsFiltered}} 条 </span>
          <el-pagination style="display: inline-block; vertical-align: top"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="200"
            :total="tableData.length">
          </el-pagination>
          <span class="wrapper">
            <el-button @click="toggleSelection()" type="danger">取消选择</el-button>
            <el-button @click="update()" type="success">导出电话</el-button>
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
      childMultipleSelection: '',
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
        return row.porject;
      },
      expands: []
    };
  },
  mounted () {},
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
            d.num = 0;
            d.numAllType = '';
            d.types = [];
            val.push(d);
          }
        }
      });
    },
    search (val, num) {
      this.recordsFiltered = 0;
      let project = this.projectValue;
      let minbatch = new Date(this.starTimeValue[0]).toLocaleDateString();
      let maxbatch = new Date(this.starTimeValue[1]).toLocaleDateString();
      if (project == null || project === '') {
        alert('请先选择项目');
        return;
      }
      if (this.starTimeValue == null || this.starTimeValue === '') {
        alert('请选择时间范围');
        return;
      }
      this.tableData.length = [];
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
        if (res.data.data) {
          var v = '';
          for (v of res.data.data) {
            that.getData('/api/tel/getTypeCountByCondition', {project: project, maxbatch: v.batch}, that.pullDownDate);
            that.recordsFiltered += v.count;
            let data = {};
            data.project = project;
            data.batch = v.batch;
            data.type = '';
            data.num = 0;
            data.numAllType = '';
            data.phone = v.count;
            data.types = [];
            that.tableData.push(data);
          }
        }
      });
      this.pageShow = true;
    },
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
    update (rows) {
      if (!this.multipleSelection) {
        alert('请先勾选');
        return;
      }
      if (this.multipleSelection.length > 3) {
        alert('选择项目不能超过三条');
        return;
      }
      let v = '';
      let project = [];
      for (v of this.multipleSelection) {
        let type = '';
        if (v.numAllType.length) {
          for (var i = 0; i < v.numAllType.length; i++) {
            type += `${v.numAllType[i]},`;
          }
        } else {
          type = 'all';
        }
        let data = {};
        data.project = v.project;
        data.maxbatch = v.batch;
        data.type = type;
        project.push(data);
      }
      project = encodeURIComponent(JSON.stringify(project));
      let url = `http://192.168.1.106/api/tel/exportTel?project=${project}`;
      window.location.href = url;
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    toggleRowSelection (rows) {
      if (rows.types.length > 0) {
        return;
      }
      rows.type = '';
      this.$ajax({
        method: 'post',
        url: '/api/tel/getTypeCountByCondition',
        data: {
          project: rows.project,
          maxbatch: rows.batch
        }
      }).then((res) => {
        let v = '';
        for (v of res.data.data) {
          rows.type += `${v.type} , `;
          rows.num += Number(v.count);
          let count = {};
          count.type = v.type;
          count.count = v.count;
          rows.types.push(count);
        }
      });
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
