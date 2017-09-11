<template>
<div style="margin:20px" id="tableone">
  <div style='text-align:left;margin-bottom:20px'>
    <el-button size="small" @click="handleEditzdyP">批量添加到自定义</el-button>
    <el-button size="small" type="danger" @click="handleEditdeletP">批量删除</el-button>
   </div>
  <el-table
    max-height="400"
    ref="multipleTable"
    :data="viptable"
    :row-click="rowclick"
    border
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
      <el-table-column
      type="selection"
      width="40">
      </el-table-column>
    <el-table-column
      prop="value"
      label="姓名">
    </el-table-column>
    <el-table-column
      prop="type"
      label="联系方式">
    </el-table-column>
    <el-table-column
      label="标签状态">
      <template scope="scope" style="display:flex">
        <el-popover trigger="hover" placement="top">
          <p>分组名称：{{scope.row.label_name}}</p>
          <div slot="reference" class="name-wrapper">
          <el-tag type="primary" v-if="scope.row.label_code">自定义</el-tag>
          </div>
        </el-popover>
        <el-popover trigger="hover" placement="top">
          <p>项目名称：{{scope.row.project}}</p>
          <div slot="reference" class="name-wrapper">
          <el-tag type="warning" v-if="scope.row.project">项目</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template scope="scope">
      <el-button
          size="small"
          @click="handleEditzdy(scope.$index, scope.row)">自定义</el-button>
        <el-button
          size="small"
          @click="handleDelete1(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  
   <el-dialog title="已有的分组" :visible.sync="dialogFormVisible">
     <el-table
       :data="tabledialog"
      :row-click="rowclick"
      tooltip-effect="dark"
      style="width: 100%">
      </el-table-column>
     <el-table-column
      prop="name"
      label="分组名称">
    </el-table-column>
     <el-table-column
      label="操作">
      <template scope="scope" style="display:flex">
      <el-button
          size="small"
          @click="handleEditadd(scope.$index, scope.row)">添加</el-button>
      </template>
    </el-table-column>
    </el-table>
    <!-- <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="surebtn">确 定</el-button>
    </div> -->
  </el-dialog>

</div>
</template>

<script>
export default {
  props: ['viptable'],
  data () {
    return {
      tableData2: [{
        name: '王小虎',
        phone: '18544574458'
      }, {
        name: '王小虎',
        phone: '18544574458'
      }],
      multipleSelection: [],
      tabledialog: [],
      dialogFormVisible: false,
      zdy: '',
      pVIP: ''
    };
  },
  methods: {
    rowclick (row) {
    },
    handleEdit (index, row) {
    },
    handleEdit2 () {
    },
    handleEditzdyP () {
      if (this.multipleSelection.length < 1) {
        this.$alert('请先选择客户！');
      } else if (this.zdy !== '') {
        this.$alert('不能重复添加自定义分组！');
      } else {
        this.dialogFormVisible = true;
        var that = this;
        that.$api.get('/api/clientbehavior/getlabel').then(function (res) {
          if (res.data.code === 0) {
            that.tabledialog = res.data.data.label;
          } else {
            that.$alert('未登录！');
          }
        }).catch(() => {
          that.$alert('服务出错！');
        });
      }
    },
    handleEditdeletP () {
      var that = this;
      var data = this.multipleSelection;
      that.$api.post('/api/clientbehavior/delvip', data).then(function (res) {
        if (res.data.code === 0) {
          that.$emit('shuaxinlist');
        } else {
          that.$alert('未登录！');
        }
      }).catch(() => {
        that.$alert('服务出错！');
      });
    },
    handleEditzdy (index, row) {
      if (row.label_code === null) {
        this.dialogFormVisible = true;
        this.multipleSelection = [];
        this.multipleSelection.push(row.id);
        var that = this;
        that.$api.get('/api/clientbehavior/getlabel').then(function (res) {
          that.tabledialog = res.data.data.label;
        });
      } else {
        this.$alert('已存在自定义分组！');
      }
    },
    handleEditadd (index, row) {
      var that = this;
      var data = this.multipleSelection;
      that.$api.post('/api/clientbehavior/addlabelclient/' + row.code, data).then(function (res) {
        that.dialogFormVisible = false;
        that.$emit('shuaxinlist');
      });
    },
    handleDelete (index, row) {
    },
    handleDelete1 (index, row) {
      var that = this;
      var data = [row.id];
      that.$api.post('/api/clientbehavior/delvip', data).then(function (res) {
        that.$emit('shuaxinlist');
      });
    },
    handleSelectionChange (val) {
      var data = [];
      var zdy = '';
      var pVIP = '';
      for (var i = 0; i < val.length; i++) {
        data[i] = val[i].id;
        if (val[i].label_code !== null) {
          zdy = val[i].label_code;
        }
        if (val[i].vip !== null) {
          pVIP = val[i].vip;
        }
      }
      this.zdy = zdy;
      this.pVIP = pVIP;
      this.multipleSelection = data;
    }
  }
};
</script>

<style lang="css" scoped>
#tableone th.el-table-column--selection .cell .el-checkbox .el-checkbox__inner{
  display: block;
}
</style>
