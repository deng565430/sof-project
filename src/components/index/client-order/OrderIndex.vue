<template>
  <div id="">
    <div class="selectarea" v-if='turn'>
      <div class="title"><span>选择行业</span></div>
      <ul class="select">
          <li @click="doThis"><router-link to="/client/orderIndex/estateOrder">房地产</router-link></li>
          <li>医美</li>
      </ul>
    </div>
    <div>
         <router-view></router-view>
    </div>    
  </div>
</template>

<script>
export default {
  data () {
    return {
      turn: true
    };
  },
  methods: {
    doThis () {
      this.turn = false;
    }
  }
};
</script>

<style lang="css" scoped>
.title{
  text-align: left;
  font-size: 24px;
  height: 45px;
  border-bottom: 1px solid #e9e9fa;
}
.title span{
  display: inline-block;
  height: 45px;
  border-bottom: 1px solid #2495d4;
}
.select li{
  height: 140px;
  width: 190px;
  border: 1px solid #e9e9fa;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 30px;
}
.select{
  padding: 35px 30px;
  box-sizing:border-box;
  display: flex;
}
.select li:hover{
  border: 1px solid #2495d4;
}
.select li a{
  display: inline-block;
  height: 100%;
  width: 100%
}
</style>
