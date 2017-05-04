<template>
 <div>
    <div style="margin-top: 15px;">
      <el-input placeholder="请输入内容" v-model="input5" id="ipt">
        <el-select v-model="select" slot="prepend" placeholder="请选择" >
          <el-option label="餐厅名" value="1" v-for="msg in msg">{{msg.name}}</el-option>
        </el-select>
        <el-button slot="append" @click="clicks" icon="search"></el-button>
      </el-input>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
export default {
    data () {
      return {};
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
