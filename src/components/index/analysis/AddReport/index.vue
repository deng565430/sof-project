<template>
  <div>
    <div class="add-project">
      <el-button type="danger" @click="addProject">添加订阅</el-button>
    </div>
    <div id="addProjectList">
      <el-dialog
      title="添加订阅"
      :visible.sync="dialogVisible"
      size="tiny"
      :before-close="handleClose">
      <div class="add-type">
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
      <div class="add-type add-type-bottom">
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
              :label="item.value"
              :value="item.label">
            </el-option>
          </el-select>  
          <div v-if="showCheckList" style="margin-left: 10px">
            <el-radio class="radio" v-model="checkRadio" label="周报">周报</el-radio>
            <el-radio class="radio" v-model="checkRadio" label="月报">月报</el-radio>
          </div>
         </div>
      </div>
      <div id="addProject">
        <div v-if="isShowSearch">
          <div class="add-search">
          <Search @searchValue="searchValue" :placeholder="'搜索关键字,如: 楼盘名称'"/>
          </div>
          <div class="project-list">
            <h3>楼盘列表： <el-button type="danger" @click="cancelRadio" size="small"> 重新选择</el-button></h3>
            <div class="project-list-clild" v-if="radioShow.length">
              <el-radio-group v-model="radio">
                <el-radio-button style="padding: 2px;" v-for="(item, index) in radioShow" :key="index"  :label="item">{{item.tagname}}</el-radio-button>
              </el-radio-group>
            </div>
            <div v-else style="text-align:center">
              暂无楼盘列表
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="success" :disabled="radio === ''" @click="nextPostProject">下一步</el-button>
          </span>
        </div>
        <div v-if="!isShowSearch">
          <div class="project-select">
            <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
              <el-tab-pane label="默认项目" name="first" style="text-alignc:center;">
                <ul v-if="defaultData.length" class="project-defalut">
                  <li v-for="(item, index) in defaultData" :key="index">{{item.name}}</li>
                </ul>
                <div v-else>
                  暂无默认选择项目
                </div>
              </el-tab-pane>
              <el-tab-pane label="所需选择项目" name="second">
                <FilterSelect :filterSelectData="filterSelectData" @childProjectSelect="childProjectSelect"/>
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
        label: '1'
      }, {
        value: '三个月',
        label: '3'
      }, {
        value: '半年',
        label: '6'
      }, {
        value: '一年',
        label: '12'
      }],
      timeValue: '实时',
      optionsValue: '上海',
      projectValue: '楼盘分析',
      checked: false,
      isShow: false,
      checkRadio: '月报',
      showCheckList: false,
      searchInput: '',
      isShowSearch: true,
      activeName: 'first',
      radio: '',
      radioList: [],
      radioShow: [],
      defaultData: [],
      filterSelectData: [],
      filterData: '',
      childfilterData: [],
      startTime: ''
    };
  },
  mounted () {},
  methods: {
    getProjectData () {
      this.$api.get('/api/getTags?indcode=fangc-xf')
      .then(res => {
        console.log(res);
        if (res.data) {
          const data = res.data;
          this.radioList = data;
          this.radioShow = data;
        }
      });
    },
    nextPostProject () {
      console.log(this.filterSelectData.length);
      if (!this.radio) {
        this.$alert('请选择楼盘', '提示信息');
        return;
      }
      this.$api.post('/api/getJingp', this.radio)
      .then(res => {
        this.defaultData = res.data.data;
      });
      if (this.filterSelectData.length === 0) {
        this.$api.post('/api/getAllloupan', this.radio)
        .then(res => {
          this.filterSelectData = res.data.data;
        });
      }
      this.isShowSearch = false;
      this.activeName = 'first';
    },
    addProject () {
      this.dialogVisible = true;
      this.isShowSearch = true;
      if (this.radioList.length > 0) {
        return;
      }
      this.getProjectData();
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
      if (this.startTime === '') {
        this.$alert('请选择订阅开始时间');
        return;
      }
      if (!this.checked) {
        this.$alert('请选择订阅周期');
        return;
      }
      this.childfilterData.filter((item, index) => {
        this.childfilterData[index] = JSON.parse(item);
      });
      const data = {
        region: this.optionsValue,
        startTime: this.startTime,
        type: this.projectValue,
        duration: this.timeValue,
        week: this.timeValue === '实时' ? '实时' : this.checkRadio,
        jingp: this.childfilterData,
        dimension: [],
        rdto: this.radio
      };
      const self = this;
      this.$api.post('/api/subscribe/0', data)
      .then(res => {
        console.log(res);
        if (res.data.code === 0) {
          self.dialogVisible = false;
          self.childfilterData = [];
          this.$alert(res.data.msg, '提示信息', {
            confirmButtonText: '确定',
            callback: action => {
              // window.location.reload();
            }
          });
        } else {
          this.$alert(res.data.msg, '提示信息', {
            confirmButtonText: '确定',
            callback: action => {
              // window.location.reload();
            }
          });
        }
      });
    },
    dataEvent (data) {
      this.startTime = data;
    },
    handleClick () {
    },
    childProjectSelect (data) {
      this.childfilterData = data;
    },
    searchValue (data) {
      if (data === '') {
        this.radioShow = this.radioList;
        return;
      }
      this.radioShow = [];
      this.radioList.filter(item => {
        if (item.tagname.indexOf(data) > -1) {
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
.add-project
  position:relative
  width: 100%
  top: 60px
  right: 30px
  text-align: right
.add-type
  display: flex
  height: 50px
  box-shadow: border-box
  margin-bottom: 20px
  border-bottom: 1px solid #fff
  >div
    line-height: 2.5
    display: flex
.add-type-bottom
  border-bottom: 1px solid #ccc
#addProjectList
  .el-dialog__header
    height: 40px
    background: linear-gradient(to right, #007bf7 0%,#63c652 100%)
    span
      float: left
      font-size: 20px
      color: #fff
      font-weight: 100
    .el-dialog__headerbtn
      i
        color #fff !important
        font-weight: 900
        font-size: 15px
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
    .project-list-clild
      height: 270px
      overflow:auto
      span
        border: none
    h3
      height: 40px
      text-align: 40px
      font-size: 17px
      font-weight: 900
  .project-select
    width: 490px
    margin: 0 auto
    .project-defalut
      height: 300px
      overflow: auto
      li
        height: 40px
        line-height: 30px
        border-bottom: 1px solid #ccc
.dialog-footer
  position: absolute
  right: 20px
  bottom: 10px
</style>
