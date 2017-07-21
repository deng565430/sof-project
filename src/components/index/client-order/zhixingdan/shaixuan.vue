<template>
<div>
  <!-- 返回 -->
  <div style="text-align:left;margin-bottom:30px">
    <span  class="el-icon-arrow-left" style="font-size:14px;color:#20A0FF"></span>
    <el-button type="text" @click="back">返回</el-button>
  </div>

  <!-- 筛选 -->
  <el-dialog title="已有项目" :visible.sync="dialogVisible" size="tiny" :close-on-press-escape="false" :before-close="handleClose">
    <div v-if="showTab">
      <ShowTag :tabTitle="tabTitle" @clickActive="clickActive" :ifHideActive="true" :flag="true"></ShowTag>
    </div>
    <div style="height: 50px; overflow: auto">
      <div v-if="showSelectDataAll.name" class="active-show-tag">
        <span>已选择：</span><span style="color: blue;"> {{showSelectDataAll.name}} </span>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" :disabled="showSelectDataAll.name == null" @click="selectDataList">确 定</el-button>
    </span>
  </el-dialog>


  <!-- 筛选条件 -->
    <el-dialog
      title="已选择项目"
      :visible.sync="showDialogVisible"
      size="tiny"
      :close-on-press-escape="false"
      :before-close="handleClose">
      <div v-if="showSelectTag">
        <div style="height: 50px; overflow: auto;margin-bottom: 10px">
          <div class="active-show-tag">
            <span>已选择：</span><span style="color: blue;"> {{activeShowTag.name}} </span>
          </div>
        </div>
        <ShowTag :tabTitle="tabTitle" :childShowTag="childShowTag"></ShowTag>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 已选tag -->
    <div style="font-size:16px;text-align:left">筛选条件</div>
    <div v-loading="loading2" class="tiaojian"  element-loading-text="拼命加载中">
        <div class="show-tag" ref="showtag"  v-for="(parentTag, parentIndex) in showSelectData" style="margin-top:10px;height:100px;width:100%">
          <span class="el-icon-close" @click="deletezu(parentIndex,parentTag)"></span>
          <div>
            <el-tag
              v-for="(tag, index) in parentTag"
              :key="tag.name"
              :closable="true"
              :type="'danger'"
              @close.stop="removeClose(tag,parentTag, parentIndex, index)"
              @click.native="showTag(tag)"
            >
            {{tag.name}}
            </el-tag>
            <!-- <div class="add-data-list">
                <el-button type="text" @click="addZhixing(parentTag, parentIndex)">添加执行单</el-button> 
            </div> -->
            <div v-if="" style="text-align: center; padding: 10px 0">
              <el-button type="text" @click="addZhixing(parentTag, parentIndex)">添加执行单</el-button> 
              <el-button type="primary"   @click="submitF(parentIndex,parentTag)">搜索</el-button>
            </div>
          </div>
        </div>
        <!-- <div class="add-data-list">
          <el-button  @click="addzu">添加新组</el-button> 
        </div> -->
        
        <!-- 筛选条件提交 -->
        <div style="text-align: center; padding-top: 20px">
          <el-button  @click="addzu">添加新组</el-button> 
          <el-button type="primary"    @click="submit">多组搜素</el-button>
        </div>
    </div>

    <div class="jieguo">
    <div>结果展示</div>
    <!-- 搜索结果表格展示 -->
        <el-table
          :data="table"
          height="250"
          border
          v-if="table.length > 1"
          style="width: 100%;margin-top:20px">
          <el-table-column
            prop="name"
            label="name"
            width="180">
          </el-table-column>
          <el-table-column
            prop="code"
            label="code"
            width="180">
          </el-table-column>
        </el-table>
        <div v-if="table.length > 1" style="margin-top:10px;font-size:12px">共<span style="color:#FF4949;font-size:16px;margin:0 8px;">{{table.length}}</span>条</div>
        <!-- 执行单名称 -->
        <el-form  style="width:300px;margin-top:20px"  label-width="100px"><!-- v-if="table.length > 1 " -->
          <el-form-item label="执行单名称">
            <el-input v-model="zname" ref="tiele"  :disabled="title !== ''"></el-input>
          </el-form-item>
        </el-form>

        <!-- 执行单提交 -->
        <div style="text-align: left; padding: 20px 0">
          <el-button type="primary"  @click="submit2">确认</el-button><!-- v-if="zname !== '' " -->
        </div>
  </div>

</div>
</template>

<script>
import ShowTag from './showTag';
const num = 0;

export default {

  name: 'shaixuan',
  props: ['getcode', 'showselected', 'title', 'getZXinfo', 'btnfalse'],
  components: {
    ShowTag
  },
  data () {
    return {
      tabTitle: [],
      dialogVisible: false,
      showDialogVisible: false,
      showTab: false,
      showSelectTag: false,
      showSelectData: [],
      showSelectDataAll: {},
      fourthArrName: [],
      fourthArrCode: [],
      loading: false,
      childShowTag: '',
      activeShowTag: '',
      lastVal: '',
      zname: '',
      table: [{
        name: '',
        code: ''
      }],
      loading2: false,
      parentTags: [num],
      num1: 0,
      datas: [],
      surnum: 0
    };
  },
  created () {
    // 获取展示数据
    this.getTab();
    console.log(this.showselected);
    this.showSelectData = this.showselected;
    console.log(this.showSelectData);
    this.zname = this.title;
  },
  methods: {
    addzu () {
      // this.num1 ++;
      // this.showSelectData[this.num1] = [];
      // console.log(this.showSelectData);
      console.log(this.$refs);
      if (this.num1 === 0) {
        this.num1 ++;
        this.showSelectData[this.num1] = [];
        var _this = this;
        _this.showSelectData = _this.showSelectData.filter(function (item) {
          console.log(_this.showSelectData);
          return item;
        });
      } else {
        this.num1 = this.$refs.showtag.length;
        this.showSelectData[this.num1] = [];
        console.log(this.showSelectData);
        var that = this;
        that.showSelectData = that.showSelectData.filter(function (item) {
          console.log(that.showSelectData);
          return item;
        });
      }
    },
    // 删除组
    deletezu (parentIndex, parentTag) {
      console.log(parentIndex, parentTag);
      this.showSelectData.splice(parentIndex, 1);
    },
    getTab () {
      this.$api.get('/api/campaign/getCampaignOption?page=0&prov=' + this.getZXinfo.area + '&city=' + this.getZXinfo.city + '&ind_code=' + this.getZXinfo.industryId + '&code=' + this.getcode).then((res) => {
        const data = res.data.data;
        this.tabTitle = data;
        for (let i in this.tabTitle) {
          this.$api.get(`api/campaign/getCampaignOption2?page=1&ind_code=` + this.getZXinfo.industryId + `&prov=` + this.getZXinfo.area + `&city=` + this.getZXinfo.city + `&code=${this.tabTitle[i].code}`)
          .then(res => {
            if (res.data.data) {
              const data = res.data.data;
              if (!this.tabTitle[i].child) {
                this.tabTitle[i].child = data;
              }
            }
          });
        }
      });
    },
    // 获取所有数据并更新数组
    addZhixing (parentTag, parentIndex) {
      console.log(parentTag, parentIndex);
      this.surnum = parentIndex;
      this.fourthArrName = [];
      this.fourthArrCode = [];
      this.showSelectDataAll = {};
      setTimeout(() => {
        this.dialogVisible = true;
        this.showTab = true;
      }, 200);
    },
    // 选择项目
    clickActive (data) {
      this._selectActive(data.val, data.num, data.checked, data.lastVal, data.firstVal, data.secondVal);
    },
    // 提交
    submit () {
      this.loading2 = true;
      var data = {};
      data.prov = this.getZXinfo.area;
      data.city = this.getZXinfo.city;
      data.ind_code = this.getZXinfo.industryId;
      data.selects = this.showSelectData;
      console.log(data);
      this.datas = data;
      this.$api.post('/api/campaign/getCampaignToView', data)
      .then(res => {
        if (res.data.code === 0) {
          this.loading2 = false;
          if (res.data.data.length === 0) {
            this.$confirm('没有找到对应数据!');
          } else {
            this.table = res.data.data;
          }
          console.log(res);
        } else {
          this.$confirm('请求出错!');
        }
      });
    },
    // 分单提交
    submit2 () {
      // console.log(this.$refs.tiele);
      if (this.zname === '') {
        this.$confirm('执行单名称不能为空!');
      } else {
        if (this.$refs.tiele.disabled === false) {
          var data = {};
          data.selects = this.showSelectData;
          this.datas = data;
          var obj = {};
          obj.tac_code = this.getcode;
          obj.file_name = this.zname;
          // obj.tags = this.showSelectData;
          obj.tags = this.showSelectData;
          this.$emit('fendans', obj);
        } else {
          this.$emit('fendans', this.zname);
        }
      }
    },
    // 组搜索
    submitF (parentIndex, parentTag) {
      console.log(parentIndex, parentTag);
      this.loading2 = true;
      var data = {};
      data.prov = this.getZXinfo.area;
      data.city = this.getZXinfo.city;
      data.ind_code = this.getZXinfo.industryId;
      data.selects = [parentTag];
      console.log(data);
      this.datas = data;
      this.$api.post('/api/campaign/getCampaignToView', data)
      .then(res => {
        if (res.data.code === 0) {
          this.loading2 = false;
          if (res.data.data.length === 0) {
            this.$confirm('没有找到对应数据!');
          } else {
            this.table = res.data.data;
          }
          console.log(res);
        } else {
          this.$confirm('请求出错!');
        }
      });
    },
    // 确定添加选择项目
    selectDataList () {
      //  console.log(this.showSelectData[this.num1]);
      //  this.showTab = false;
      //  if (!this.showSelectData[this.num1]) {
      //    this.showSelectData[this.num1] = [];
      //  }
      //  this.showSelectData[this.num1].push(this.showSelectDataAll);
      //  this.dialogVisible = false;
      this.showTab = false;
      this.showSelectData[this.surnum].push(this.showSelectDataAll);
      this.dialogVisible = false;
    },
    cancel () {
      this.showTab = false;
      this.dialogVisible = false;
    },
    confirm () {
      this.showDialogVisible = false;
      this.showSelectTag = false;
    },
    // 打开以选择项目
    showTag (tag) {
      this.activeShowTag = tag;
      this.showSelectTag = true;
      this.childShowTag = tag;
      this.showDialogVisible = true;
      console.log(tag);
    },
    removeClose (tag, parentTag, parentIndex, index) {
      // this.showSelectData = this.showSelectData[parentIndex].filter((item, i) => {
      //   if (item.code === tag.code) {
      //     console.log(i);
      //     this.showSelectData[parentIndex].splice(i, 1);
      //   };
      //   return item;
      // });
      var _this = this;
      for (var i = 0; i < _this.showSelectData.length; i++) {
        for (var s = 0; s < _this.showSelectData[i].length; s++) {
          if (tag.code === _this.showSelectData[i][s].code) {
            console.log(1);
            _this.showSelectData[i].splice(index, 1);
            _this.showSelectData = _this.showSelectData.filter(function (item) {
              console.log(_this.showSelectData);
              return item;
            });
            return;
          } else {
            console.log(2);
          }
        }
      }
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.showTab = false;
          this.showSelectTag = false;
          done();
        })
        .catch(_ => {});
    },
    // 对子组件传递的参数做过滤并且生成需要的属性
    _selectActive (val, num, checked, lastVal, firstVal, secondVal) {
      if (checked) {
        switch (num) {
          case 2:
            this.fourthArrName = [];
            this.fourthArrCode = [];
            let firstSel = `${firstVal ? firstVal.name + ' -> ' : ''} ${secondVal ? (secondVal.father ? secondVal.father.name + ' -> ' : '') : ''} ${lastVal ? lastVal.name + ' -> ' : ''} ${val.father.name}`;
            let firstCode = `${firstVal ? firstVal.code + ' -> ' : ''} ${secondVal ? (secondVal.father ? secondVal.father.code + ' -> ' : '') : ''} ${lastVal ? lastVal.code + ' -> ' : ''} ${val.father.code}`;
            let firstData = {
              name: firstSel,
              code: firstCode
            };
            this.showSelectDataAll = firstData;
            break;
          case 3:
            this.fourthArrName = [];
            this.fourthArrCode = [];
            let secondSel = `${firstVal ? firstVal.name + ' -> ' : ''} ${secondVal ? (secondVal.father ? secondVal.father.name + ' -> ' : '') : ''} ${lastVal ? (lastVal.father ? lastVal.father.name + ' -> ' : '') : ''} ${val.father.name}`;
            let secondCode = `${firstVal ? firstVal.code + ' -> ' : ''} ${secondVal ? (secondVal.father ? secondVal.father.code + ' -> ' : '') : ''} ${lastVal ? (lastVal.father ? lastVal.father.code + ' -> ' : '') : ''} ${val.father.code}`;
            let secondData = {
              name: secondSel,
              code: secondCode
            };
            this.showSelectDataAll = secondData;
            break;
          case 4:
            if (!val['active']) {
              val.active = 'active';
            } else {
              delete val.active;
            }
            if (lastVal.father.code !== this.lastVal.code) {
              this.fourthArrName = [];
              this.fourthArrCode = [];
            }
            this.lastVal = lastVal.father;
            let forthSel = `${firstVal ? firstVal.name + ' -> ' : ''} ${secondVal ? (secondVal.father ? secondVal.father.name + ' -> ' : '') : ''} ${lastVal ? (lastVal.father ? lastVal.father.name : '') : ''}`;
            let forthCode = `${firstVal ? firstVal.code + ' -> ' : ''} ${secondVal ? (secondVal.father ? secondVal.father.code + ' -> ' : '') : ''} ${lastVal ? (lastVal.father ? lastVal.father.code : '') : ''}`;
            if (val.active) {
              this.fourthArrName.push(val.name);
              this.fourthArrCode.push(val.code);
            } else {
              this._remove(this.fourthArrName, val.name);
              this._remove(this.fourthArrCode, val.code);
              if (this.fourthArrName.length <= 0) {
                this.showSelectDataAll = {};
                return;
              }
            }
            this.showSelectDataAll = {
              name: `${forthSel} ${this.fourthArrName.length ? ' -> ' + this.fourthArrName : ''}`,
              code: `${forthCode} ${this.fourthArrCode.length ? ' -> ' + this.fourthArrCode : ''}`
            };
            break;
          default:
            this.fourthArrName = [];
            this.fourthArrCode = [];
            let sel = `${firstVal ? firstVal.name + ' -> ' : ''} ${secondVal ? (secondVal.father ? secondVal.father.name + ' -> ' : '') : ''} ${lastVal ? (lastVal.father ? lastVal.father.name + ' -> ' : '') : ''} ${val.name}`;
            let code = `${firstVal ? firstVal.code + ' -> ' : ''} ${secondVal ? (secondVal.father ? secondVal.father.code + ' -> ' : '') : ''} ${lastVal ? (lastVal.father ? lastVal.father.code + ' -> ' : '') : ''} ${val.code}`;
            let data = {
              name: sel,
              code: code
            };
            this.showSelectDataAll = data;
            break;
        }
      } else {
        this.fourthArrName = [];
        this.fourthArrCode = [];
        switch (num) {
          case 2:
            let firstSel = `${firstVal ? firstVal.name + ' -> ' : ''} ${secondVal ? (secondVal.father ? secondVal.father.name + ' -> ' : '') : ''} ${lastVal ? lastVal.name : ''}`;
            let firstCode = `${firstVal ? firstVal.code + ' -> ' : ''} ${secondVal ? (secondVal.father ? secondVal.father.code + ' -> ' : '') : ''} ${lastVal ? lastVal.code : ''}`;
            let firstData = {
              name: firstSel,
              code: firstCode
            };
            this.showSelectDataAll = firstData;
            break;
          case 3:
            let secondSel = `${firstVal ? firstVal.name + ' -> ' : ''} ${secondVal ? (secondVal.father ? secondVal.father.name + ' -> ' : '') : ''} ${lastVal ? (lastVal.father ? lastVal.father.name : '') : ''}`;
            let secondCode = `${firstVal ? firstVal.code + ' -> ' : ''} ${secondVal ? (secondVal.father ? secondVal.father.code + ' -> ' : '') : ''} ${lastVal ? (lastVal.father ? lastVal.father.code : '') : ''}`;
            let secondData = {
              name: secondSel,
              code: secondCode
            };
            this.showSelectDataAll = secondData;
            break;
          default:
            this.showSelectDataAll = {};
            break;
        }
      }
    },
    _remove (str, val) {
      for (let i in str) {
        if (str[i] === val) {
          str.splice(i, 1);
        }
      }
    },
    back () {
      this.$emit('back', 'back');
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.tiaojian
  padding:0 10px 10px 10px
  border: 1px solid #d1dbe5
  border-radius: 4px
  background-color: #fff
  overflow: hidden
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04)
  .show-tag
    border: 1px solid #ccc
    text-align: left
    overflow: auto
    span
      margin: 10px
      font-size: 15px
    .el-icon-close
      display: block
      text-align:right
      cursor:pointer
      font-size:14px
    .add-data-list
      height: 100px
      border: 1px dashed #ccc
      width: 100px
      text-algin: center
      margin: 20px
      button
        display: inline-block
        width: 50px
        margin: 35px 15px
  .active-show-tag
    color: red
    text-align: left
    span
      display: inline-block
      line-height: 20px
    span:first-child
      width: 70px
      vertical-align: center
.jieguo
  margin-top:15px
</style>
