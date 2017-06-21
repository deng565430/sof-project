<template>
  <div id="">
    <div class="selectarea" >
      <div class="title"><span>电话清单</span></div>
      <Search :projectOptions="{projectOptions}" :searchIsShow="{searchIsShow}" @listenToChildEvent="listenToChildEvent"></Search>
      <div id="table" v-if="listShow">
        <el-table
          v-loading="loading" element-loading-text="拼命加载中"
          ref="multipleTable"
          :data="tableData"
          :expand-row-keys="expands"
          stripe
          border
          max-height=450
          highlight-current-row
          style="width: 80%;"
          @selection-change="handleSelectionChange"
          @expand="toggleRowSelection" >
          <el-table-column type="expand">
              <template scope="props">
              <el-table
               :data="props.row.types"
               border
               fixed
               style="width: 60%;">
               <el-table-column
                 prop="type"
                 align="left"
                 label="类型">
               </el-table-column>
               <el-table-column
                 prop="count"
                 align="left"
                 label="总数">
               </el-table-column>
              </el-table>
              </template>
          </el-table-column>
          <el-table-column
            type="selection"
            width="65">
          </el-table-column>
          <el-table-column 
            prop="project"
            align="left"
            label="项目名称">
          </el-table-column>
          <el-table-column
            prop="batch"
            align="left"
            label="批次">
            <template scope="scope">{{ scope.row.batch }}</template>
          </el-table-column>
          <el-table-column
            prop="type"
            label="类型"
            align="left"
            width="400">
          <template scope="scope">
            <el-select
            v-model="scope.row.numAllType"
            multiple
            @change="selectChange"
            placeholder="所有类型">
            <el-option
              v-for="item in scope.row.types"
              :key="item.count"
              :label="item.type"
              :value="item">
            </el-option>
          </el-select>
          </template>
          </el-table-column>
          <el-table-column
            prop="phone"
            align="left"
            label="总量"
            show-overflow-tooltip>
            <template scope="scope" >{{ scope.row.phone }}</template>
          </el-table-column>
        </el-table>
        <div class="block" id="tablePage" v-if="pageShow">
          <span v-if="recordsFiltered != 0">电话总量：{{recordsFiltered}} 个 </span>
          <el-pagination class="pagination" style="display: inline-block; vertical-align: middle;"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="200"
            layout="total, prev, pager, next"
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
import Search from '../ConditionSearch/search';
export default {
  components: {
    Search
  },
  data () {
    return {
      projectOptions: [],
      projectValue: '',
      typeOptions: [],
      typeValue: '',
      childMultipleSelection: '',
      activeName: 'first',
      starTimeValue: '',
      searchValue: {},
      listShow: true,
      tableData: [],
      inTableData: [],
      recordsFiltered: 0,
      currentPage: 1,
      pageShow: false,
      pullDownDate: [],
      getRowKeys (row) {
        return row.porject;
      },
      expands: [],
      searchIsShow: true,
      loading: true
    };
  },
  mounted () {},
  created () {
    this.getProject('/api/tel/getALLproject', '', this.projectOptions);
    this.getData('/api/tel/getTelCountByCondition', {project: null, minbatch: null, maxbatch: null}, this.tableData);
  },
  methods: {
    getProject (url, list, val) {
      this.$api.post(url, list).then((res) => {
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
      this.pageShow = false;
      let that = this;
      this.$api.post(url, list).then((res) => {
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
          that.loading = false;
          that.pageShow = true;
        }
      });
    },
    listenToChildEvent (data) {
      if (data[0].project == null || data[0].project === '') {
        this.$alert('请先选择项目', '提示信息');
        return;
      }
      this.loading = true;
      let project = data[0].project;
      let minbatch = data[0].minbatch;
      let maxbatch = data[0].maxbatch;
      this.tableData = [];
      this.recordsFiltered = 0;
      let that = this;
      this.listShow = true;
      const postData = {
        project: project,
        maxbatch: maxbatch,
        minbatch: minbatch
      };
      const url = '/api/tel/getTelCountByCondition';
      this.$api.post(url, postData).then(function (res) {
        if (res.data.data) {
          var v = '';
          for (v of res.data.data) {
            that.getData('/api/tel/getTypeCountByCondition', {project: project, maxbatch: v.batch}, that.pullDownDate);
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
          that.loading = false;
          that.pageShow = true;
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
        this.$alert('请先勾选项目', '提示信息');
        return;
      }
      if (this.multipleSelection.length > 3) {
        this.$alert('选择的项目最多三条', '提示信息');
        return;
      }
      console.log(this.multipleSelection);
      let project = [];
      let v = '';
      for (v of this.multipleSelection) {
        let type = '';
        if (v.numAllType.length) {
          for (var i = 0; i < v.numAllType.length; i++) {
            type += `${v.numAllType[i].type},`;
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
      let url = `/api/tel/exportTel?project=${project}`;
      window.location.href = this.$api.url(url);
      /* for (let i in project) {
        (function (i) {
          setTimeout(function () {
            let data = [];
            data.push(project[i]);
            alert(data);
            data = encodeURIComponent(JSON.stringify(data));
            let url = `/api/tel/exportTel?project=${data}`;
            window.location.href = url;
          }, i * 1000);
        })(i);
      } */
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    selectChange (key) {
      for (let i of key) {
        console.log(i);
      }
      console.log(key);
    },
    toggleRowSelection (rows) {
      if (rows.types.length > 0) {
        return;
      }
      rows.type = '';
      const url = '/api/tel/getTypeCountByCondition';
      const postData = {
        project: rows.project,
        maxbatch: rows.batch
      };
      this.$api.post(url, postData).then((res) => {
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
      display: inline-block
      width:40px
  #btn
    padding-bottom: 30px
    text-align: left
    #btnWidth
      vertical-align: top
      width: 120px
#table
  width: 100%
#tablePage
  width: 100%
  padding-top: 10px
  margin-top: 20px
</style>
