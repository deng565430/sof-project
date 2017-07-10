<template>
<div>
  {{data}}
  <div v-for="val in data">
    <div>{{val}}
      <div v-for="sval in val">
        {{sval}}
        <div v-for="tval in sval">
          {{tval}}
          <div v-for="fval in tval">
            {{fval}}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {

  name: 'showDataList',
  watch: {
    'alldata': {
      handler: function (val, oldValue) {
        this.data = val;
      },
      deep: true
    }
  },
  create () {
    console.log(this.alldata);
  },
  mounted () {
    console.log(this.alldata);
  },
  data () {
    return {
      data: this.alldata
    };
  },
  props: ['alldata']
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
