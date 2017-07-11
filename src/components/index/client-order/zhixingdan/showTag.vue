<template>
<div>
  <div class="select">
      <ul class="all-tab">
        <li v-for="(val, index) in tabTitle">
          <div class="top-last" :class="[topFlag === val.name ? hover : hoverOut, topClickFlag === val.name ? 'active' : '']"  @mouseover="hovers(val, index)" @click="topClick(val, index)">
            {{val.name}}
          </div>
          <div class="top-item" v-if="loading" :class="topFlag === val.name ? topItemIsShow : topItemIsHide">
            <ul class="second-tab">
              <li  v-for="(secondVal, secondIndex) in val.child">
                <div class="second-last" :class="[secondFlag === secondVal.father.name ? hover : hoverOut, secondClickFlag === secondVal.father.name ? 'active' : '']"  @mouseover="secondHovers(index, secondVal, secondIndex)" @click="secondClick(secondVal, secondIndex, val)">
                  {{secondVal.father.name}}
                </div>
                <div class="second-item" :class="secondFlag === secondVal.father.name ? topItemIsShow : topItemIsHide">
                  <ul class="third-tab">
                    <li v-for="(thirdVal, thirdIndex) in secondVal.child">
                      <div class="third-list" :class="[thirdFlag === thirdVal.father.name ? hover : hoverOut, thirdClickFlag === thirdVal.father.name ? 'active' : '']"  @mouseover="thirdHovers(thirdVal, thirdIndex)" @click="thirdClick(thirdVal, thirdIndex, val, secondVal)">
                        {{thirdVal.father.name}}
                      </div>
                      <div class="third-item" :class="thirdFlag === thirdVal.father.name ? topItemIsShow : topItemIsHide">
                        <ul class="fourth-tab" v-if="thirdVal.child">
                          <li v-for="(fourthVal, fourthIndex) in thirdVal.child" >
                            <div  class="fourth-list" ref="fourthActive" :class="[fourthFlag === fourthVal.name ? hover : hoverOut, (ifHideActive ? '' : fourthVal.active ? 'active' : '')]" @mouseover="fourthHovers(fourthVal, fourthIndex)" @click="fourthClick($event, fourthVal, fourthIndex, val, secondVal, thirdVal)">
                              {{fourthVal.name}}
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
      <div v-if="!loading">
       请选择项目
      </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'shwoTag',
  data () {
    return {
      topFlag: '',
      loading: !this.flag,
      secondFlag: '',
      thirdFlag: '',
      fourthFlag: '',
      topClickFlag: '',
      secondClickFlag: '',
      thirdClickFlag: '',
      hover: 'hover',
      hoverOut: 'hover-out',
      topItemIsShow: 'top-item-is-show',
      topItemIsHide: 'top-item-is-hide',
      lastVal: '',
      topVal: '',
      secondVal: '',
      thirdVal: ''
    };
  },
  created () {
    this._reset();
    // 初始化 判断进来的参数是选择还是展示
    if (this.childShowTag) {
      const name = this.childShowTag.name.split('->');
      if (name[3]) {
        this._filter(name);
      }
      // 展示对应的元素
      this.topClickFlag = name[0] ? this._trim(name[0]) : '';
      this.secondClickFlag = name[1] ? this._trim(name[1]) : '';
      this.thirdClickFlag = name[2] ? this._trim(name[2]) : '';
      this.topFlag = name[0] ? this._trim(name[0]) : '';
      this.secondFlag = name[1] ? this._trim(name[1]) : '';
      this.thirdFlag = name[2] ? this._trim(name[2]) : '';
    }
  },
  methods: {
    hovers (val, index) {
      this.topFlag = val.name;
      this.loading = true;
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
      // 判断是否传入flag
      if (this.flag) {
        // 判断跟上次点击是否一致
        if (this.topVal !== val.code) {
          this.secondClickFlag = '';
          this.thirdClickFlag = '';
          // 重置样式并格式化
          this._delStyle();
        }
        const num = 1;
        const checked = true;
        // 对点击元素做取反操作 并且对应传递给父组件
        if (this.topClickFlag === val.name) {
          this.topClickFlag = '';
          this.secondClickFlag = '';
          this.thirdClickFlag = '';
          this._delStyle();
          this.$emit('clickActive', {val, index, num, checked: !checked});
        } else {
          this.topClickFlag = val.name;
          this.$emit('clickActive', {val, index, num, checked});
        }
        // 保存此次点击参数
        this.topVal = val.code;
      }
    },
    secondClick (val, index, lastVal) {
      if (this.flag) {
        this.topClickFlag = lastVal.name;
        if (this.secondVal !== val.father.code) {
          this.thirdClickFlag = '';
          this._delStyle();
        }
        const num = 2;
        const checked = true;
        if (this.secondClickFlag === val.father.name) {
          this.secondClickFlag = '';
          this.thirdClickFlag = '';
          this._delStyle();
          this.$emit('clickActive', {val, index, lastVal, num, checked: !checked});
        } else {
          this.secondClickFlag = val.father.name;
          this.$emit('clickActive', {val, index, lastVal, num, checked});
        }
        this.secondVal = val.father.code;
      }
    },
    thirdClick (val, index, firstVal, lastVal) {
      if (this.flag) {
        this.topClickFlag = firstVal.name;
        this.secondClickFlag = lastVal.father.name;
        if (this.thirdVal !== val.father.code) {
          this._delStyle();
        }
        const num = 3;
        const checked = true;
        if (this.thirdClickFlag === val.father.name) {
          this.thirdClickFlag = '';
          this._delStyle();
          this.$emit('clickActive', {val, index, firstVal, lastVal, num, checked: !checked});
          return;
        } else {
          this.thirdClickFlag = val.father.name;
          this.$emit('clickActive', {val, index, firstVal, lastVal, num, checked});
        }
        this.thirdVal = val.father.code;
      }
    },
    fourthClick (e, val, index, firstVal, secondVal, lastVal) {
      if (this.flag) {
        this.topClickFlag = firstVal.name;
        this.secondClickFlag = secondVal.father.name;
        this.thirdClickFlag = lastVal.father.name;
        const num = 4;
        const checked = true;
        // 如果之前没有保存code 则保存当前code
        if (this.lastVal === '') {
          this.lastVal = lastVal.father.code;
        }
        // 判断之前保存的code是否和现在保存的相等 清空选择
        if (lastVal.father.code !== this.lastVal) {
          this._delStyle();
        }
        // dom操作  改变样式
        if (!e.target.style.background) {
          e.target.style.background = '#20a0ff';
          e.target.style.border = '1px solid #20a0ff';
          e.target.style.color = 'white';
        } else {
          e.target.style.background = '';
          e.target.style.border = '';
          e.target.style.color = '';
        }
        this.$emit('clickActive', {val, index, firstVal, secondVal, lastVal, num, checked});
        this.lastVal = lastVal.father.code;
      }
    },
    _trim (str) {
      return str.replace(/(^\s*)|(\s*$)/g, '');
    },
    // 过滤选择出父组件传递参数的选择状态
    _filter (str) {
      this.tabTitle.filter(item => {
        if (item.name === this._trim(str[0])) {
          item.child.filter(secondItem => {
            if (secondItem.father.name === this._trim(str[1])) {
              secondItem.child.filter(thirdItem => {
                if (thirdItem.father.name === this._trim(str[2])) {
                  thirdItem.child.filter(forthItem => {
                    for (let i in str[3]) {
                      if (str[3].split(',')[i] !== undefined && forthItem.name === this._trim(str[3].split(',')[i])) {
                        if (!forthItem.active) {
                          forthItem.active = 'active';
                        }
                      }
                    }
                  });
                }
              });
            }
          });
        }
      });
    },
    // 重置
    _reset () {
      this.tabTitle.filter(item => {
        if (item.child && item.child.length > 0) {
          item.child.filter(secondItem => {
            if (secondItem.child && secondItem.child.length > 0) {
              item.child.filter(thirdItem => {
                if (thirdItem.child && thirdItem.child.length > 0) {
                  thirdItem.child.filter(forthItem => {
                    if (forthItem.child && forthItem.child.length) {
                      forthItem.child.filter(lastItem => {
                        if (lastItem.active) {
                          delete lastItem.active;
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    },
    // 清除样式
    _delStyle () {
      this._reset();
      for (let i in this.$refs.fourthActive) {
        if (this.$refs.fourthActive[i].style.background) {
          this.$refs.fourthActive[i].style.background = '';
          this.$refs.fourthActive[i].style.border = '';
          this.$refs.fourthActive[i].style.color = '';
        }
      }
    }
  },
  props: ['tabTitle', 'childShowTag', 'flag', 'ifHideActive']
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
    border: 1px solid #bfcbd9
    box-sizing: border-box
    padding: 0 10px
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
    color: #ff0000
</style>
