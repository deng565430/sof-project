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
      <div v-if="!loading">
        {{childShowTag}}
      </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'shwoTag',
  data () {
    return {
      topFlag: '业务分类',
      loading: true,
      secondFlag: '',
      thirdFlag: '',
      fourthFlag: '',
      topClickFlag: '',
      secondClickFlag: '',
      thirdClickFlag: '',
      hover: 'hover',
      hoverOut: 'hover-out',
      topItemIsShow: 'top-item-is-show',
      topItemIsHide: 'top-item-is-hide'
    };
  },
  created () {
    this.$nextTick(() => {
      if (this.flag) {
        this.reset();
      };
    });
    if (this.childShowTag) {
      const name = this.childShowTag.name.split('->');
      if (name[3]) {
        console.log(this.tabTitle);
        this.filter(name);
      }
      console.log(name);
      this.topClickFlag = name[0] ? this.trim(name[0]) : '';
      this.secondClickFlag = name[1] ? this.trim(name[1]) : '';
      this.thirdClickFlag = name[2] ? this.trim(name[2]) : '';
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
      if (this.flag) {
        if (this.topClickFlag === val.name) {
          this.topClickFlag = '';
          return;
        } else {
          this.topClickFlag = val.name;
        }
      }
      const num = 1;
      this.$emit('clickActive', {val, index, num});
    },
    secondClick (val, index, lastVal) {
      if (this.flag) {
        if (this.secondClickFlag === val.father.name) {
          this.secondClickFlag = '';
          return;
        } else {
          this.secondClickFlag = val.father.name;
        }
      }
      const num = 2;
      this.$emit('clickActive', {val, index, lastVal, num});
    },
    thirdClick (val, index, firstVal, lastVal) {
      if (this.flag) {
        if (this.thirdClickFlag === val.father.name) {
          this.thirdClickFlag = '';
          return;
        } else {
          this.thirdClickFlag = val.father.name;
        }
      }
      const num = 3;
      this.$emit('clickActive', {val, index, firstVal, lastVal, num});
    },
    fourthClick (val, index, firstVal, secondVal, lastVal) {
      const num = 4;
      this.$emit('clickActive', {val, index, firstVal, secondVal, lastVal, num});
    },
    trim (str) {
      return str.replace(/(^\s*)|(\s*$)/g, '');
    },
    filter (str) {
      this.tabTitle.filter(item => {
        if (item.name === this.trim(str[0])) {
          item.child.filter(secondItem => {
            if (secondItem.father.name === this.trim(str[1])) {
              secondItem.child.filter(thirdItem => {
                if (thirdItem.father.name === this.trim(str[2])) {
                  thirdItem.child.filter(forthItem => {
                    // 需要重新修改
                    for (let i in str[3]) {
                      if (str[3].split(',')[i] !== undefined && forthItem.name === this.trim(str[3].split(',')[i])) {
                        if (!forthItem.active) {
                          forthItem.active = 'active';
                        }
                      } else {
                        if (forthItem.active) {
                          delete forthItem.active;
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
    reset () {
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
    }
  },
  props: ['tabTitle', 'childShowTag', 'flag']
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
</style>
