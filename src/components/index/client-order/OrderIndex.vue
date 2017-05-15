<template>
  <div id="">
    <div class="selectarea" >
      <div class="title"><span>选择行业</span></div>
      <ul class="select">
          <li ><router-link to="/client/estateOrder">房地产</router-link></li>
          <li><router-link :to="{path:value.url}">{{value.val}}</router-link></li>
      </ul>
    </div>
    <div >
    </div>    
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogform: false,
      value: [{
        url: '',
        val: ''
      }]
    };
  },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.loading();
  },
  methods: {
    loading () {
      var _this = this;
      this.$ajax({
        method: 'get',
        url: '/api/industry/getindustryList'
      }).then(function (res) {
        if (res.status === 200) {
          console.log(res.data.data);
          _this.value.val = res.data.data[1].name;
          console.log(_this.value.val);
        }
      });
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
