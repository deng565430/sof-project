<template>
  <div>
  <div id="allProject">
    <el-badge :value="12" class="item">
      <el-button size="small">已有全部订阅</el-button>
    </el-badge>
  </div>
    <div style="text-align: left;" >
      <el-button type="danger" @click="dialogVisible = true">添加订阅</el-button>
    </div>
    <el-dialog
      style="width: 150%;left: -25%"
      title="添加订阅"
      :visible.sync="dialogVisible"
      size="tiny"
      :before-close="handleClose">
      <div class="addType">
         <div>
         <span class="sel-span">选择区域：</span>
          <el-select v-model="optionsValue" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>  
         </div>
         <div style="margin-left: 10px">
         订阅开始时间：
          <TimeSelectOnce @dataEvent="dataEvent"/>
         </div>
      </div>
      <div class="addType">
         <div>
         <span class="sel-span">报告类型：</span>
          <el-select v-model="projectValue" placeholder="请选择">
            <el-option
              v-for="item in projectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>  
         </div>
         <div style="margin-left: 10px">
           <el-checkbox v-model="checked" @change="weekChange">周期订阅</el-checkbox>
         </div>
         <div v-if="isShow">
           时长: 

           <el-select v-model="timeValue" @change="timeChange" placeholder="请选择">
            <el-option
              v-for="item in timeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>  

          <el-checkbox-group v-if="showCheckList" v-model="checkList" style="margin-left: 10px">
            <el-checkbox label="周报"></el-checkbox>
            <el-checkbox label="月报"></el-checkbox>
          </el-checkbox-group>
         </div>
      </div>
      <div id="addProject">
        <div v-if="isShowSearch">
          <div class="add-search">
          <Search @searchValue="searchValue" :placeholder="'搜索关键字,如: 楼盘名称'"/>
          </div>
          <div class="project-list">
            <h3>楼盘列表： <el-button type="danger" @click="cancelRadio" size="small"> 重新选择</el-button></h3>
            <el-radio-group v-model="radio">
              <el-radio-button v-for="(item, index) in radioShow" :key="index" :label="item.name"></el-radio-button>
            </el-radio-group>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="success" @click="isShowSearch = false">下一步</el-button>
          </span>
        </div>
        <div v-if="!isShowSearch">
          <div class="project-select">
            <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
              <el-tab-pane label="默认项目" name="first" style="text-alignc:center;">
                
              </el-tab-pane>
              <el-tab-pane label="所需选择项目" name="second">
                <FilterSelect />
              </el-tab-pane>
            </el-tabs>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="isShowSearch = true" type="warning">上一步</el-button>
            <el-button type="success" @click="confirm">确 定</el-button>
          </span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Search from '../Search';
import FilterSelect from '../FilterSelect';
import TimeSelectOnce from '../../../TimeSelectOnce';
export default {

  name: 'index',
  components: {
    Search,
    FilterSelect,
    TimeSelectOnce
  },
  data () {
    return {
      dialogVisible: false,
      options: [{
        value: '上海',
        label: '上海'
      }, {
        value: '杭州',
        label: '杭州'
      }],
      projectOptions: [{
        value: '楼盘分析',
        label: '楼盘分析'
      }],
      timeOptions: [{
        value: '实时',
        label: '实时'
      }, {
        value: '一个月',
        label: '一个月'
      }, {
        value: '三个月',
        label: '三个月'
      }, {
        value: '半年',
        label: '半年'
      }, {
        value: '一年',
        label: '一年'
      }],
      timeValue: '实时',
      optionsValue: '上海',
      projectValue: '楼盘分析',
      checked: false,
      isShow: false,
      checkList: ['月报'],
      showCheckList: false,
      searchInput: '',
      isShowSearch: true,
      activeName: 'first',
      radio: '',
      radioList: [{
        name: '上海',
        id: '1'
      }, {
        name: '广州',
        id: '2'
      }, {
        name: '深圳',
        id: '3'
      }, {
        name: '北京',
        id: '4'
      }],
      radioShow: [{
        name: '上海',
        id: '1'
      }, {
        name: '广州',
        id: '2'
      }, {
        name: '深圳',
        id: '3'
      }, {
        name: '北京',
        id: '4'
      }]
    };
  },
  mounted () {
    this.getProjectData();
  },
  methods: {
    getProjectData () {
      this.$api.get('http://richest007.com:9001/apis/getTags?indcode=fangc-xf').then(res => {
        console.log(res);
      });
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.isShowSearch = true;
          done();
        })
        .catch(_ => {});
    },
    weekChange () {
      if (this.checked) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
    timeChange () {
      if (this.timeValue !== '实时') {
        this.showCheckList = true;
      } else {
        this.showCheckList = false;
      }
    },
    handleIconClick () {
      console.log(this.searchInput);
    },
    confirm () {
      alert('确定');
    },
    dataEvent (data) {
      console.log(data);
    },
    handleClick (v) {
      console.log(v);
    },
    searchValue (data) {
      if (data === '') {
        this.radioShow = this.radioList;
        return;
      }
      this.radioShow = [];
      this.radioList.filter(item => {
        if (item.name.indexOf(data) > -1) {
          return this.radioShow.push(item);
        }
      });
    },
    cancelRadio () {
      this.radio = '';
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
#allProject
  text-align: left
  height: 30px
  border: 1px solid #e4e4e4
  margin: 10px 0
  padding: 15px 10px
  background: #f4f4f4
.addType
  display: flex
  height: 50px
  border-bottom: 1px solid #ccc
  margin-bottom: 10px
  >div
    line-height: 2.5
    display: flex
#addProject
  width: 100%
  height: 400px
  padding-bottom: 20px
  .add-search
    width: 400px
    margin: 0 auto
    height: 70px
  .project-list
    text-align: left
    h3
      height: 40px
      text-align: 40px
      font-size: 17px
      font-weight: 900
  .project-select
    margin: 0 auto    
.dialog-footer
  position: absolute
  right: 20px
  bottom: 20px
</style>
