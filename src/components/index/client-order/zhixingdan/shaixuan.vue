<template>
<div>
  <el-dialog
    title="请选择类型"
    :visible.sync="dialogVisible"
    size="tiny"
    :before-close="hideClose">
    <div class="select">
      <ul class="all-tab">
        <li v-for="(val, index) in tabTitle">
          <div class="top-last" :class="[topFlag === val.name ? hover : hoverOut, val.active ? 'active' : '']"  @mouseover="hovers(val, index)" @click="topClick(val, index)">
            {{val.name}}
          </div>
          <div class="top-item"  v-loading="loading" element-loading-text="拼命加载中" v-if="firstAllData[val.code]" :class="topFlag === val.name ? topItemIsShow : topItemIsHide">
            <ul class="second-tab">
              <li  v-for="(secondVal, secondIndex) in firstAllData[val.code]">
                <div class="second-last" :class="[secondFlag === secondVal.father.name ? hover : hoverOut, secondVal.active ? 'active' : '']"  @mouseover="secondHovers(index, secondVal, secondIndex)" @click="secondClick(secondVal, secondIndex, val)">
                  {{secondVal.father.name}}
                </div>
                <div class="second-item" :class="secondFlag === secondVal.father.name ? topItemIsShow : topItemIsHide">
                  <ul class="third-tab">
                    <li v-for="(thirdVal, thirdIndex) in secondVal.child">
                      <div class="third-list" :class="[thirdFlag === thirdVal.father.name ? hover : hoverOut, thirdVal.active ? 'active' : '']"  @mouseover="thirdHovers(thirdVal, thirdIndex)" @click="thirdClick(thirdVal, thirdIndex, val, secondVal)">
                        {{thirdVal.father.name}}
                      </div>
                      <div class="third-item" :class="thirdFlag === thirdVal.father.name ? topItemIsShow : topItemIsHide">
                        <ul class="fourth-tab" v-if="thirdVal.child">
                          <li v-for="(fourthVal, fourthIndex) in thirdVal.child">
                            <div  class="fourth-list" :class="[fourthFlag === fourthVal.name ? hover : hoverOut, fourthVal.active ? 'active' : '']" @mouseover="fourthHovers(fourthVal, fourthIndex)" @click="fourthClick(fourthVal, fourthIndex, val, secondVal, thirdVal)">
                              <span>{{fourthVal.name}}</span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="selectDataList">确 定</el-button>
    </span>
  </el-dialog>
    <div class="show-tag">
      <div>
        <el-tag
          v-for="tag in showSelectData"
          :key="tag.name"
          :closable="true"
          :type="'danger'"
          @close="handleClose(tag)"
        >
        {{tag.name}}
        </el-tag>
      </div>
      <div class="add-data-list">
        <el-button type="text" @click="dialogVisible = true">添加执行单</el-button> 
      </div>
    </div>
    <div>
      
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
</div>
</template>

<script>
import CheckBox from './checkBox';
import ShowDataList from './showDataList';
export default {

  name: 'shaixuan',
  components: {
    CheckBox,
    ShowDataList
  },
  data () {
    return {
      tabTitle: [],
      dialogVisible: false,
      topFlag: 'Amtfl',
      secondFlag: 'Amtfl',
      thirdFlag: 'Amtfl',
      fourthFlag: 'Amtfl',
      hover: 'hover',
      hoverOut: 'hover-out',
      topItemIsShow: 'top-item-is-show',
      topItemIsHide: 'top-item-is-hide',
      secondData: {},
      thirdData: {},
      fourthData: {},
      firstAllData: {},
      active: 'active',
      activeFlag: false,
      showSelectData: [],
      fourthArrName: [],
      fourthArrCode: [],
      num: 0,
      selectNum: '',
      selectIsShow: false,
      loading: false,
      getAllDataList: []
    };
  },
  created () {
    this.getTab();
  },
  methods: {
    getTab () {
      this.$api.get('/api/campaign/getCampaignOption?page=0&prov=zj&city=hz&ind_code=i01&code=').then((res) => {
        const data = res.data.data;
        this.tabTitle = data;
      });
    },
    hovers (val, index) {
      if (this.getAllDataList.length) {
        return;
      }
      this.$api.get(`api/campaign/getCampaignOption2?page=1&ind_code=i01&prov=zj&city=hz&code=${val.code}`)
      .then(res => {
        if (res.data.data) {
          const data = res.data.data;
          if (!this.firstAllData[val.code]) {
            this.firstAllData[val.code] = data;
            this.getAllDataList[val.code] = data;
          }
        }
      });
      this.topFlag = val.name;
    },
    secondHovers (lastIndex, val, index) {
      this.secondFlag = val.father.name;
    },
    thirdHovers (val, index) {
      this.thirdFlag = val.father.name;
    },
    fourthHovers (val, index) {
      this.fourthFlag = val.name;
    },
    topClick (val, index) {
      const num = 1;
      this.selectActive(val, num);
    },
    secondClick (val, index, lastVal) {
      const num = 2;
      this.selectActive(val, num, lastVal, this.showSelectData);
    },
    thirdClick (val, index, firstVal, lastVal) {
      const num = 3;
      this.selectActive(val, num, lastVal, this.showSelectData, firstVal);
    },
    fourthClick (val, index, firstVal, secondVal, lastVal) {
      const num = 4;
      this.selectActive(val, num, lastVal, this.showSelectData, firstVal, secondVal, true);
    },
    submit () {
      this.$api.post('/api/campaign/getCampaignToView', this.showSelectData)
      .then(res => {
        console.log(res);
      });
    },
    selectActive (val, num, lastVal, container, firstVal, secondVal, flag) {
      if (lastVal != null) {
        if (!lastVal['active']) {
          this.$alert('请选择上级');
          return;
        }
      }
      if (!val['active']) {
        val.active = 'active';
        if (container) {
          switch (num) {
            case 2:
              let firstSel = `${firstVal ? firstVal.name + ' -> ' : ''} ${secondVal ? (secondVal.father ? secondVal.father.name + ' -> ' : '') : ''} ${lastVal ? lastVal.name + ' -> ' : ''} ${val.father.name}`;
              let firstCode = `${firstVal ? firstVal.code + ' -> ' : ''} ${secondVal ? (secondVal.father ? secondVal.father.code + ' -> ' : '') : ''} ${lastVal ? lastVal.code + ' -> ' : ''} ${val.father.code}`;
              const firstData = {
                name: firstSel,
                code: firstCode
              };
              container[this.num] = firstData;
              break;
            case 3:
              let secondSel = `${firstVal ? firstVal.name + ' -> ' : ''} ${secondVal ? (secondVal.father ? secondVal.father.name + ' -> ' : '') : ''} ${lastVal ? (lastVal.father ? lastVal.father.name + ' -> ' : '') : ''} ${val.father.name}`;
              let secondCode = `${firstVal ? firstVal.code + ' -> ' : ''} ${secondVal ? (secondVal.father ? secondVal.father.code + ' -> ' : '') : ''} ${lastVal ? (lastVal.father ? lastVal.father.code + ' -> ' : '') : ''} ${val.father.code}`;
              const secondData = {
                name: secondSel,
                code: secondCode
              };
              container[this.num] = secondData;
              break;
            case 4:
              let forthSel = `${firstVal ? firstVal.name + ' -> ' : ''} ${secondVal ? (secondVal.father ? secondVal.father.name + ' -> ' : '') : ''} ${lastVal ? (lastVal.father ? lastVal.father.name + ' -> ' : '') : ''}`;
              let forthCode = `${firstVal ? firstVal.code + ' -> ' : ''} ${secondVal ? (secondVal.father ? secondVal.father.code + ' -> ' : '') : ''} ${lastVal ? (lastVal.father ? lastVal.father.code + ' -> ' : '') : ''}`;
              this.fourthArrName.push(val.name);
              this.fourthArrCode.push(val.code);
              container[this.num] = {
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
              container[this.num] = data;
              break;
          }
        }
      } else {
        delete val.active;
        switch (num) {
          case 2:
            let firstSel = `${firstVal ? firstVal.name + ' -> ' : ''} ${secondVal ? (secondVal.father ? secondVal.father.name + ' -> ' : '') : ''} ${lastVal ? lastVal.name : ''}`;
            let firstCode = `${firstVal ? firstVal.code + ' -> ' : ''} ${secondVal ? (secondVal.father ? secondVal.father.code + ' -> ' : '') : ''} ${lastVal ? lastVal.code : ''}`;
            let firstData = {
              name: firstSel,
              code: firstCode
            };
            container[this.num] = firstData;
            this.filterActive(lastVal.code);
            break;
          case 3:
            let secondSel = `${firstVal ? firstVal.name + ' -> ' : ''} ${secondVal ? (secondVal.father ? secondVal.father.name + ' -> ' : '') : ''} ${lastVal ? (lastVal.father ? lastVal.father.name : '') : ''}`;
            let secondCode = `${firstVal ? firstVal.code + ' -> ' : ''} ${secondVal ? (secondVal.father ? secondVal.father.code + ' -> ' : '') : ''} ${lastVal ? (lastVal.father ? lastVal.father.code : '') : ''}`;
            let secondData = {
              name: secondSel,
              code: secondCode
            };
            container[this.num] = secondData;
            this.filterActive(firstVal.code, lastVal.code);
            break;
          case 4:
            console.log(val);
            let forthSel = `${firstVal ? firstVal.name + ' -> ' : ''} ${secondVal ? (secondVal.father ? secondVal.father.name + ' -> ' : '') : ''} ${lastVal ? (lastVal.father ? lastVal.father.name : '') : ''}`;
            let forthCode = `${firstVal ? firstVal.code + ' -> ' : ''} ${secondVal ? (secondVal.father ? secondVal.father.code + ' -> ' : '') : ''} ${lastVal ? (lastVal.father ? lastVal.father.code : '') : ''}`;
            this.remove(this.fourthArrName, val.name);
            this.remove(this.fourthArrCode, val.code);
            container[this.num] = {
              name: `${forthSel} ${this.fourthArrName}`,
              code: `${forthCode} ${this.fourthArrCode}`
            };
            break;
          default:
            let data = {
              name: val.name,
              code: val.code
            };
            this.handleClose(data);
            break;
        }
      }
    },
    selectDataList () {
      this.num ++;
      this.dialogVisible = false;
      this.fourthArrName = [];
      this.fourthArrCode = [];
      if (this.tabTitle.length) {
        this.tabTitle.filter(item => {
          if (item.active) {
            delete item.active;
          }
          this.filterActive(item.code);
        });
      }
    },
    handleClose (tag) {
      console.log(tag);
      const code = tag.code.split('->');
      this.filterSelect(code);
      this.showSelectData.splice(this.showSelectData.indexOf(tag), 1);
    },
    filterSelect (code) {
      if (code[0]) {
        const code0 = this.trim(code[0]);
        this.firstAllData[code0].filter((item) => {
          if (code[1]) {
            const code1 = this.trim(code[1]);
            if (item.father.code === code1) {
              if (code[2]) {
                const code2 = this.trim(code[2]);
                item.child.filter(childItem => {
                  if (childItem.father.code === code2) {
                    if (code[3]) {
                      childItem.child.filter(item => {
                        if (item.active) {
                          delete item.active;
                        }
                        return item;
                      });
                    }
                    if (childItem.active) {
                      delete childItem.active;
                    }
                  }
                });
              }
              if (item.active) {
                delete item.active;
              }
            }
          }
          return item;
        });
      }
    },
    filterActive (code) {
      this.firstAllData[code].filter(item => {
        if (item.active) {
          delete item.active;
        }
        if (item.child) {
          item.child.filter(childItem => {
            if (childItem.active) {
              delete childItem.active;
            }
            if (childItem.child) {
              childItem.child.filter(item => {
                if (item.active) {
                  delete item.active;
                }
              });
            }
          });
        }
      });
    },
    remove (arr, val) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === val) {
          arr.splice(i, 1);
          break;
        }
      }
    },
    trim (str) {
      return str.replace(/(^\s*)|(\s*$)/g, '');
    },
    hideClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
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
  width: 500px
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
