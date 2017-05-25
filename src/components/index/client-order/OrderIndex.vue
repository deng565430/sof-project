<template>
  <div id="">
    <div class="selectarea" v-if='selects'>
      <div class="title"><span>选择行业</span></div>
      <ul class="select"><!-- 
          <li ><router-link to="/client/estateOrder">房地产</router-link></li> -->
          <li @click="hangye($event)" v-for='itme in value' :id='itme.id'  >{{itme.val}}</li>
      </ul>
    </div>

    <div >
      <EstateOrder v-if="EstateOrder" :selectind='selectind' @listinchild='listinchild'></EstateOrder>
    </div>    
  </div>
</template>

<script>
import EstateOrder from './orders/estateOrder';
export default {
  components: {
    EstateOrder
  },
  data () {
    return {
      dialogform: false,
      value: [{
        id: '',
        val: ''
      }],
      EstateOrder: false,
      selects: true,
      selectind: ''
    };
  },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.loading();
  },
  methods: {
    hangye ($event) {
      console.log(event.currentTarget.id);
      this.selects = false;
      this.EstateOrder = true;
      this.selectind = event.currentTarget.id;
    },
    listinchild () {
      this.EstateOrder = false;
      this.selects = true;
    },
    loading () {
      var _this = this;
      var data = [];
      this.$ajax({
        method: 'get',
        url: '/api/industry/getindustryList'
      }).then(function (res) {
        if (res.status === 200) {
          console.log(res.data.data);
          for (var i = 0; i < res.data.data.length; i++) {
            var obj = {};
            obj.val = res.data.data[i].name;
            obj.id = res.data.data[i].id;
            data[i] = obj;
          }
          _this.value = data;
          console.log(data);
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
