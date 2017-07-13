<template>
<div>
  <!-- 返回 -->
  <div style="text-align:left;margin-bottom:30px">
    <span  class="el-icon-arrow-left" style="font-size:14px;color:#20A0FF"></span>
    <el-button type="text" @click="back">返回</el-button>
  </div>

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

    <div class="show-tag">
      <div>
        <el-tag
          v-for="(tag, index) in showSelectData"
          :key="tag.name"
          :closable="true"
          :type="'danger'"
          hit
          @close.stop="removeClose(tag)"
          @click.native="showTag(tag)"
        >
        {{tag.name}}
        </el-tag>
      </div>
      <div class="add-data-list">
        <el-button type="text" @click="addZhixing">添加执行单</el-button> 
      </div>
    </div>
    

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


    <el-form style="width:300px;margin-top:20px"  label-width="100px">
      <el-form-item label="执行单名称">
        <el-input v-model="zname" :disabled="title !== ''"></el-input>
      </el-form-item>
    </el-form>


    <div style="text-align: left; padding-top: 20px">
      <el-button type="primary" :disabled="showSelectData.length <= 0" @click="submit">提交</el-button>
    </div>
    <div style="text-align: left; padding-top: 20px">
      <el-button type="primary" :disabled="showSelectData.length <= 0" @click="submit2">提交2</el-button>
    </div>
</div>
</template>

<script>
import ShowTag from './showTag';
export default {

  name: 'shaixuan',
  props: ['getcode', 'showselected', 'title'],
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
      zname: ''
    };
  },
  created () {
    // 获取展示数据
    this.getTab();
    this.showSelectData = this.showselected;
    this.zname = this.title;
    console.log(this.zname);
  },
  methods: {
    getTab () {
      this.$api.get('/api/campaign/getCampaignOption?page=0&prov=zj&city=hz&ind_code=i01&code=' + this.getcode).then((res) => {
        const data = res.data.data;
        this.tabTitle = data;
        for (let i in this.tabTitle) {
          this.$api.get(`api/campaign/getCampaignOption2?page=1&ind_code=i01&prov=zj&city=hz&code=${this.tabTitle[i].code}`)
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
    addZhixing () {
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
      this.$api.post('/api/campaign/getCampaignToView', this.showSelectData)
      .then(res => {
        console.log(res);
      });
    },
    // 提交
    submit2 () {
      this.$api.post('/api/campaign/getCampaignToView', this.showSelectData)
      .then(res => {
        console.log(res);
        var obj = {};
        obj.title = this.zname;
        obj.tags = this.showSelectData;
        this.$emit('fendan', obj);
      });
    },
    // 确定添加选择项目
    selectDataList () {
      this.showTab = false;
      this.showSelectData.push(this.showSelectDataAll);
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
    removeClose (tag) {
      console.log(tag);
      this.showSelectData.splice(this.showSelectData.indexOf(tag), 1);
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
.show-tag
  border: 1px solid #ccc
  text-align: left
  overflow: auto
  span
    display: block
    margin: 10px
    font-size: 15px
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
</style>
