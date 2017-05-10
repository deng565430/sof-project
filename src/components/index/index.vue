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
  </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
export default {
    data () {
      return {
        value6: '',
        value7: ''
      };
    },
    computed: {...mapGetters(['msg'])},
    methods: {
      clicks (e) {
        this.$store.state.data.push({name: document.getElementById('ipt').children[1].value});
      }
    }
  };
</script>

<style lang="css" scoped>
</style>
