<template>
<div>
  <el-dialog
    title="请选择类型"
    :visible.sync="dialogVisible"
    size="tiny"
    :before-close="hideClose">
    <div v-if="showTab">
      <ShowTag :tabTitle="tabTitle" @clickActive="clickActive" :flag="true"></ShowTag>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="selectDataList">确 定</el-button>
    </span>
  </el-dialog>
    <div class="show-tag">
      <div>
        <el-tag
          v-for="tag in showSelectData"
          :key="tag.name"
          :closable="true"
          :type="'success'"
          hit
          @close.stop="handleClose(tag)"
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
  title="提示"
  :visible.sync="showDialogVisible"
  size="tiny"
  :before-close="hideClose">
  <div v-if="showSelectTag">
    <ShowTag :tabTitle="tabTitle" :childShowTag="childShowTag"></ShowTag>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="confirm">确 定</el-button>
  </span>
</el-dialog>
    <div>
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
</div>
</template>

<script>
import CheckBox from './checkBox';
import ShowDataList from './showDataList';
import ShowTag from './showTag';
export default {

  name: 'shaixuan',
  components: {
    CheckBox,
    ShowDataList,
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
      childShowTag: ''
    };
  },
  created () {
    // 获取展示数据
    this.getTab();
  },
  methods: {
    getTab () {
      this.$api.get('/api/campaign/getCampaignOption?page=0&prov=zj&city=hz&ind_code=i01&code=').then((res) => {
        const data = res.data.data;
        this.tabTitle = data;
      });
    },
    // 获取所有数据并更新数组
    addZhixing () {
      this.fourthArrName = [];
      this.fourthArrCode = [];
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
      setTimeout(() => {
        this.dialogVisible = true;
        this.showTab = true;
      }, 20);
    },
    // 选择项目
    clickActive (data) {
      console.log(data);
      this._selectActive(data.val, data.num, data.lastVal, data.firstVal, data.secondVal);
    },
    // 提交
    submit () {
      this.$api.post('/api/campaign/getCampaignToView', this.showSelectData)
      .then(res => {
        console.log(res);
      });
    },
    // 确定添加选择项目
    selectDataList () {
      this.showSelectData.push(this.showSelectDataAll);
      this.dialogVisible = false;
      this.showTab = false;
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
      this.showSelectTag = true;
      this.childShowTag = tag;
      this.showDialogVisible = true;
      console.log(tag);
    },
    handleClose (tag) {
      this.showSelectData.splice(this.showSelectData.indexOf(tag), 1);
    },
    hideClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.showTab = false;
          this.showSelectTag = false;
          done();
        })
        .catch(_ => {});
    },
    _selectActive (val, num, lastVal, firstVal, secondVal) {
      switch (num) {
        case 2:
          let firstSel = `${firstVal ? firstVal.name + ' -> ' : ''} ${secondVal ? (secondVal.father ? secondVal.father.name + ' -> ' : '') : ''} ${lastVal ? lastVal.name + ' -> ' : ''} ${val.father.name}`;
          let firstCode = `${firstVal ? firstVal.code + ' -> ' : ''} ${secondVal ? (secondVal.father ? secondVal.father.code + ' -> ' : '') : ''} ${lastVal ? lastVal.code + ' -> ' : ''} ${val.father.code}`;
          const firstData = {
            name: firstSel,
            code: firstCode
          };
          this.showSelectDataAll = firstData;
          break;
        case 3:
          let secondSel = `${firstVal ? firstVal.name + ' -> ' : ''} ${secondVal ? (secondVal.father ? secondVal.father.name + ' -> ' : '') : ''} ${lastVal ? (lastVal.father ? lastVal.father.name + ' -> ' : '') : ''} ${val.father.name}`;
          let secondCode = `${firstVal ? firstVal.code + ' -> ' : ''} ${secondVal ? (secondVal.father ? secondVal.father.code + ' -> ' : '') : ''} ${lastVal ? (lastVal.father ? lastVal.father.code + ' -> ' : '') : ''} ${val.father.code}`;
          const secondData = {
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
          let forthSel = `${firstVal ? firstVal.name + ' -> ' : ''} ${secondVal ? (secondVal.father ? secondVal.father.name + ' -> ' : '') : ''} ${lastVal ? (lastVal.father ? lastVal.father.name + ' -> ' : '') : ''}`;
          let forthCode = `${firstVal ? firstVal.code + ' -> ' : ''} ${secondVal ? (secondVal.father ? secondVal.father.code + ' -> ' : '') : ''} ${lastVal ? (lastVal.father ? lastVal.father.code + ' -> ' : '') : ''}`;
          this.fourthArrName.push(val.name);
          this.fourthArrCode.push(val.code);
          this.showSelectDataAll = {
            name: `${forthSel} ${this.fourthArrName}`,
            code: `${forthCode} ${this.fourthArrCode}`
          };
          break;
        default:
          let sel = `${firstVal ? firstVal.name + ' -> ' : ''} ${secondVal ? (secondVal.father ? secondVal.father.name + ' -> ' : '') : ''} ${lastVal ? (lastVal.father ? lastVal.father.name + ' -> ' : '') : ''} ${val.name}`;
          let code = `${firstVal ? firstVal.code + ' -> ' : ''} ${secondVal ? (secondVal.father ? secondVal.father.code + ' -> ' : '') : ''} ${lastVal ? (lastVal.father ? lastVal.father.code + ' -> ' : '') : ''} ${val.code}`;
          const data = {
            name: sel,
            code: code
          };
          this.showSelectDataAll = data;
          break;
      }
      console.log(this.showSelectDataAll);
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.select
  height: 400px
  width: 860px
.all-tab
  display: flex
  width: 860px
  font-size: 15px
  box-sizing: border-box
  >li
    height: 50px
    line-height: 50px
    box-sizing: border-box
  .top-item
    box-sizing: border-box
    height: 320px
    margin-top: 5px
    overflow: auto
    width: 860px
    position: absolute
    left: 20px
    .second-tab
      display: flex
      flex-wrap: wrap
      width: 850px
    .third-tab
      display: flex
      flex-wrap: wrap
    .fourth-tab
      display: flex
      flex-wrap: wrap
    .second-item
      box-sizing: border-box
      width: 100%
      position: absolute
      left: 0
    .third-item
      width: 800px
      box-sizing: border-box
      overflow: auto
      position: absolute
      left: 0
  .top-last, .third-list, .second-last, .fourth-list
    padding: 0 10px
    border: 1px solid #bfcbd9
    box-sizing: border-box
    border-radius: 2px
  .hover-out
    color: black
  .top-item-is-hide
    display: none
  .top-item-is-show
    display: block
  .active
    background: #20a0ff
    border: 1px solid #20a0ff
    color: white
  .hover
    color: red
.show-tag
  border: 1px solid #ccc
  text-align: left
  span
    display: block
    margin: 10px
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
</style>
