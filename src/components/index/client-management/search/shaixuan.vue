<template>
<div>
	<el-dialog title="已有项目" :visible.sync="dialogVisible" size="tiny" :close-on-press-escape="false" :before-close="handleClose">
	    <div >
	      <ShowTag :tabTitle="tabTitle" @clickActive="clickActive" :ifHideActive="true" :flag="true"></ShowTag>
	    </div>
	    <div style="height: 50px; overflow: auto">
	      <div v-if="showSelectDataAll.name" class="active-show-tag">
	        <span>已选择：</span><span style="color: blue;"> {{showSelectDataAll.name}} </span>
	      </div>
	    </div>
	    <span slot="footer" class="dialog-footer">
	      <el-button @click="cancel">取 消</el-button>
	      <el-button type="primary"  @click="selectDataList">确 定</el-button>
	    </span>
  </el-dialog>

  <!-- 已选tag -->
    <div class="tiaojian">
        <div class="show-tag" ref="showtag"  style="margin-top:40px;height:100px;width:100%;" >
          <div>
            <el-tag
               v-for="(parentTag, parentIndex) in showSelectData"
              :closable="true"
              :type="'danger'"
              @close.stop="removeClose(parentTag, parentIndex)"
            >
            {{parentTag.name}}
            </el-tag>
            <div v-if="" style="position:absolute;top:5px;left:10px">
              <el-button  @click="addZhixing()">添加属性分类</el-button> 
            </div>
          </div>
        </div>     
    </div>


</div>
</template>

<script>
import ShowTag from './showTag';

export default {
  name: 'zhezhao',
  components: {
    ShowTag
  },
  data () {
    return {
      dialogVisible: true,
      tabTitle: [],
      showSelectDataAll: {},
      showSelectData: [],
      surnum: 0,
      fourthArrName: [],
      fourthArrCode: []
    };
  },
  created () {
    this.getTag();
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.showTab = false;
          this.showSelectTag = false;
          done();
        })
        .catch(_ => {});
    },
    // 获取第一层数据
    getTag () {
      var prov = 'sh';
      var city = 'sh';
      var indcode = 'i03';
      this.$api.get('/api/clientbehavior/getBehaviorOption?prov=' + prov + '&city=' + city + '&ind_code=' + indcode).then((res) => {
        this.tabTitle = res.data.data;
        for (let i in this.tabTitle) {
          this.$api.get(`api/campaign/getCampaignOption2?page=1&ind_code=` + indcode + `&prov=` + prov + `&city=` + city + `&code=${this.tabTitle[i].code}`)
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
    addZhixing () {
      this.showSelectDataAll = {};
      this.fourthArrName = [];
      this.fourthArrCode = [];
      setTimeout(() => {
        this.dialogVisible = true;
        this.showTab = true;
      }, 200);
    },
    // 确定添加选择项目
    selectDataList () {
      this.showSelectData.push(this.showSelectDataAll);
      this.dialogVisible = false;
      this.$emit('biaoqian', this.showSelectData);
    },
    cancel () {
      this.dialogVisible = false;
    },
    // 选择项目
    clickActive (data) {
      this._selectActive(data.val, data.num, data.checked, data.lastVal, data.firstVal, data.secondVal);
    },
    removeClose (parentTag, parentIndex) {
      this.showSelectData.splice(parentIndex, 1);
    },
     // 对子组件传递的参数做过滤并且生成需要的属性
    _selectActive (val, num, checked, lastVal, firstVal, secondVal) {
      if (checked) {
        console.log(4444);
        switch (num) {
          case 2:
            this.fourthArrName = [];
            this.fourthArrCode = [];
            let firstSel = `${firstVal ? firstVal.name + '-' : ''}${secondVal ? (secondVal.father ? secondVal.father.name + '-' : '') : ''}${lastVal ? lastVal.name + '-' : ''}${val.father.name}`;
            let firstCode = `${firstVal ? firstVal.code + '-' : ''}${secondVal ? (secondVal.father ? secondVal.father.code + '-' : '') : ''}${lastVal ? lastVal.code + '-' : ''}${val.father.code}`;
            let firstData = {
              name: firstSel,
              code: firstCode
            };
            this.showSelectDataAll = firstData;
            console.log(22);
            break;
          case 3:
            this.fourthArrName = [];
            this.fourthArrCode = [];
            let secondSel = `${firstVal ? firstVal.name + '-' : ''}${secondVal ? (secondVal.father ? secondVal.father.name + '-' : '') : ''}${lastVal ? (lastVal.father ? lastVal.father.name + '-' : '') : ''}${val.father.name}`;
            let secondCode = `${firstVal ? firstVal.code + '-' : ''}${secondVal ? (secondVal.father ? secondVal.father.code + '-' : '') : ''}${lastVal ? (lastVal.father ? lastVal.father.code + '-' : '') : ''}${val.father.code}`;
            let secondData = {
              name: secondSel,
              code: secondCode
            };
            this.showSelectDataAll = secondData;
            console.log(33);
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
            let forthSel = `${firstVal ? firstVal.name + '-' : ''}${secondVal ? (secondVal.father ? secondVal.father.name + '-' : '') : ''}${lastVal ? (lastVal.father ? lastVal.father.name : '') : ''}`;
            let forthCode = `${firstVal ? firstVal.code + '-' : ''}${secondVal ? (secondVal.father ? secondVal.father.code + '-' : '') : ''}${lastVal ? (lastVal.father ? lastVal.father.code : '') : ''}`;
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
              name: `${forthSel}${this.fourthArrName.length ? '-' + this.fourthArrName : ''}`,
              code: `${forthCode}${this.fourthArrCode.length ? '-' + this.fourthArrCode : ''}`
            };
            console.log(44);
            break;
          default:
            this.fourthArrName = [];
            this.fourthArrCode = [];
            let sel = `${firstVal ? firstVal.name + '-' : ''}${secondVal ? (secondVal.father ? secondVal.father.name + '-' : '') : ''}${lastVal ? (lastVal.father ? lastVal.father.name + '-' : '') : ''}${val.name}`;
            let code = `${firstVal ? firstVal.code + '-' : ''}${secondVal ? (secondVal.father ? secondVal.father.code + '-' : '') : ''}${lastVal ? (lastVal.father ? lastVal.father.code + '-' : '') : ''}${val.code}`;
            let data = {
              name: sel,
              code: code
            };
            this.showSelectDataAll = data;
            console.log(this.showSelectDataAll);
            break;
        }
      } else {
        console.log(5555);
        this.fourthArrName = [];
        this.fourthArrCode = [];
        switch (num) {
          case 2:
            console.log(223);
            let firstSel = `${firstVal ? firstVal.name + '-' : ''}${secondVal ? (secondVal.father ? secondVal.father.name + '-' : '') : ''}${lastVal ? lastVal.name : ''}`;
            let firstCode = `${firstVal ? firstVal.code + '-' : ''}${secondVal ? (secondVal.father ? secondVal.father.code + '-' : '') : ''}${lastVal ? lastVal.code : ''}`;
            let firstData = {
              name: firstSel,
              code: firstCode
            };
            this.showSelectDataAll = firstData;
            break;
          case 3:
            console.log(333);
            let secondSel = `${firstVal ? firstVal.name + '-' : ''}${secondVal ? (secondVal.father ? secondVal.father.name + '-' : '') : ''}${lastVal ? (lastVal.father ? lastVal.father.name : '') : ''}`;
            let secondCode = `${firstVal ? firstVal.code + '-' : ''}${secondVal ? (secondVal.father ? secondVal.father.code + '-' : '') : ''}${lastVal ? (lastVal.father ? lastVal.father.code : '') : ''}`;
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
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.tiaojian
  position:relative
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
