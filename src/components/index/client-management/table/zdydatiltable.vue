<template>
<div  id="tableone">
  <div style="text-align:left;margin-bottom:20px">
    <el-button type="text" @click="fanhui"><span class="el-icon-arrow-left"></span>返回</el-button>
  </div>
  <div style='text-align:left;margin-bottom:20px'>
    <el-button size="small" type="danger" @click="handleEditVip">批量添加到VIP</el-button>
    <el-button size="small" @click="handleEditzdyP">批量删除</el-button>
   </div>
  <el-table
    max-height="250"
    ref="multipleTable"
    :data="table"
    :row-click="rowclick"
    border
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange"
    @cell-mouse-enter="mouseenter"
    @cell-mouse-leave="mueseleave">
      <el-table-column
      type="selection"
      width="40">
      </el-table-column>
     <el-table-column
      prop="value"
      label="客户">
    </el-table-column>
    <el-table-column
      prop="type"
      label="类型">
    </el-table-column>
    <!-- <el-table-column
      prop="project"
      label="项目名称">
    </el-table-column> -->
    <el-table-column
      label="标签状态">
      <template scope="scope" style="display:flex">
        <el-popover trigger="hover" placement="top">
          <p>分组名称：{{scope.row.label_name}}</p>
          <div slot="reference" class="name-wrapper">
          <el-tag type="primary" v-if="scope.row.label_code">自定义分组</el-tag>
          </div>
        </el-popover>
        <el-popover trigger="hover" placement="top">
          <p>项目名称：{{scope.row.project}}</p>
          <div slot="reference" class="name-wrapper">
          <el-tag type="warning" v-if="scope.row.project">项目</el-tag>
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
          @click="handleEdit(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    
</div>
</template>

<script>
import Dialogs from './../dialog/zdlistdialog';

export default {
  props: ['table'],
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
      label_code: '',
      pVIP: ''
    };
  },
  created () {
  },
  methods: {
    rowclick (row) {
    },
    handleEdit (index, row) {
      var that = this;
      var data = [row.id];
      that.$api.post('/api/clientbehavior/delclientlabel/' + row.label_code, data).then(function (res) {
        that.$emit('shuaxinlist2', that.label_code);
      });
    },
    handleEditadd (index, row) {
      var data = this.multipleSelection;
      var that = this;
      that.$api.post('/api/clientbehavior/addlabelclient/' + row.code, data).then(function (res) {
        that.dialogFormVisible = false;
        that.$emit('shuaxinlist');
      });
    },
    handleEditzdyP () {
      var data = this.multipleSelection;
      var that = this;
      that.$api.post('/api/clientbehavior/delclientlabel/' + that.label_code, data).then(function (res) {
        that.$emit('shuaxinlist2', that.label_code);
      });
    },
    handleEditVip () {
      if (this.multipleSelection.length < 1) {
        this.$alert('请先选择客户！');
      } else if (this.pVIP !== '') {
        this.$alert('不能重复添加VIP！');
      } else {
        var that = this;
        var data = this.multipleSelection;
        that.$api.post('/api/clientbehavior/addvip', data).then(function (res) {
          if (res.data.code === 0) {
            that.$emit('shuaxinlist2', that.label_code);
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
            that.$emit('shuaxinlist2', row.label_code);
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
      var pVIP = '';
      for (var i = 0; i < val.length; i++) {
        data[i] = val[i].id;
        this.label_code = val[i].label_code;
        if (val[i].vip !== null) {
          pVIP = val[i].vip;
        }
      }
      this.pVIP = pVIP;
      this.multipleSelection = data;
    },
    mouseenter (row) {
      this.caozuo = true;
    },
    mueseleave (row) {
    },
    fanhui () {
      this.$emit('fanhui');
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
