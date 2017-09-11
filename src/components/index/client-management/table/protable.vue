<template>
<div style="margin:20px" id="tableone">
  <div style='text-align:left;margin-bottom:20px'>
    <el-button size="small" @click="handleEdit2">批量添加到自定义</el-button>
    <el-button size="small" type="danger" @click="handleEdit3">批量添加到VIP</el-button>
   </div>
  <el-table
    ref="multipleTable"
    :data="tabledata"
    :row-click="rowclick"
    max-height="250"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
      <el-table-column
      type="selection"
      width="40">
      </el-table-column>
    <el-table-column
      prop="project"
      label="项目名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="type"
      label="类型">
    </el-table-column>
    <el-table-column
      prop="value"
      label="客户">
    </el-table-column>
    <el-table-column
      label="标签状态">
      <template scope="scope" style="display:flex">
        <el-popover trigger="hover" placement="top">
          <p>分组名称：{{scope.row.label_name}}</p>
          <div slot="reference" class="name-wrapper">
          <el-tag type="primary" v-if="scope.row.label_code">自定义分组</el-tag>
          </div>
        </el-popover>
        <el-tag type="danger" v-if="scope.row.vip">VIP</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作" >
      <template scope="scope" style="display:flex">
        <el-button
          size="small"
          @click="handlevip(scope.$index, scope.row)">VIP</el-button>
          <el-button
          size="small"
          @click="handleEditzdy(scope.$index, scope.row)">自定义</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div>
    <Dialogs v-if="dialogs"></Dialogs>
  </div>
  <el-dialog title="已有的分组" :visible.sync="dialogFormVisible">
     <el-table
       :data="tabledialog"
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
import Dialogs from './../projectCustomer/projectdialog';

export default {
  props: ['tabledata'],
  components: {
    Dialogs
  },
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
      dialogs: false,
      caozuo: false,
      dialogFormVisible: false,
      tabledialog: [],
      zdy: '',
      pVIP: ''
    };
  },
  created () {
  },
  methods: {
    rowclick (row) {
    },
    handleEdit (index, row) {
      this.dialogs = true;
    },
    handleEditzdy (index, row) {
      if (row.label_code === null) {
        this.dialogFormVisible = true;
        this.multipleSelection = [];
        this.multipleSelection.push(row.id);
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
    handleEdit2 () {
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
    handleEdit3 () {
      if (this.multipleSelection.length < 1) {
        this.$alert('请先选择客户！');
      } else if (this.pVIP !== '') {
        this.$alert('不能重复添加VIP！');
      } else {
        var that = this;
        var data = this.multipleSelection;
        that.$api.post('/api/clientbehavior/addvip', data).then(function (res) {
          if (res.data.code === 0) {
            that.$emit('shuaxinlist');
          } else {
            that.$alert('未登录！');
          }
        }).catch(() => {
          that.$alert('服务出错！');
        });
      }
    },
    handlevip (index, row) {
      if (row.vip === null) {
        this.multipleSelection = [];
        this.multipleSelection.push(row.id);
        var that = this;
        var data = this.multipleSelection;
        that.$api.post('/api/clientbehavior/addvip', data).then(function (res) {
          if (res.data.code === 0) {
            that.$emit('shuaxinlist');
          } else {
            that.$alert('未登录！');
          }
        }).catch(() => {
          that.$alert('服务出错！');
        });
      } else {
        this.$alert('已是VIP！');
      }
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
    },
    mouseenter (row) {
      this.caozuo = true;
    },
    mueseleave (row) {
    }
  }
};
</script>

<style lang="css">
#tableone th.el-table-column--selection .cell .el-checkbox .el-checkbox__inner{
  display: block;
}
#tableone .el-table .cell{
  display: flex
}
</style>
