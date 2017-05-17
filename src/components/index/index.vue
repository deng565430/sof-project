<template>
 <div>
    <div style="margin-top: 15px;">
      <el-input placeholder="请输入内容"  id="ipt">
        <el-select  slot="prepend" placeholder="请选择" >
          <el-option label="餐厅名" value="1" v-for="msg in msg">{{msg.name}}</el-option>
        </el-select>
        <el-button slot="append" @click="clicks" ></el-button>
      </el-input>
    </div>
    <router-view>11</router-view>
    <router-link to="/index/login">登陆</router-link>
     <div class="block">
    <span class="demonstration">默认</span>
    <el-date-picker
      v-model="value6"
      type="daterange"
      placeholder="选择日期范围">
    </el-date-picker>

    <el-autocomplete
      class="inline-input"
      v-model="state1"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      @select="handleSelect"
    ></el-autocomplete>
  </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
export default {
    data () {
      return {
        value6: '',
        value7: '',
        restaurants: [],
        state1: ''
      };
    },
    created () {
      this.onloda();
    },
    computed: {...mapGetters(['msg'])},
    methods: {
      clicks (e) {
        this.$store.state.data.push({name: document.getElementById('ipt').children[1].value});
      },
      onloda () {
        var datas = [];
        var _this = this;
        this.$ajax({
          method: 'get',
          url: '/api/campaign/getProjectName'
        }).then(function (res) {
          if (res.status === 200) {
            for (var i = 0; i < res.data.length; i++) {
              datas[i] = res.data[i];
            }
            _this.restaurants = datas;
          }
        });
      },
      querySearch (queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter (queryString) {
        return (restaurant) => {
          return (restaurant.value.indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll () {
        var _this = this;
        console.log(_this.restaurants);
        return _this.restaurants;
      },
      handleSelect (item) {
        console.log(item);
      }
    },
    mounted () {
      this.restaurants = this.loadAll();
    }
  };
</script>

<style lang="css" scoped>
</style>
