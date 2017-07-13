<template>
  <div>
    <div v-if="first">
      <!-- 返回 -->
      <div style="text-align:left;margin-bottom:30px">
        <span  class="el-icon-arrow-left" style="font-size:14px;color:#20A0FF"></span>
        <el-button type="text" @click="back">返回</el-button>
      </div>
      <el-radio-group v-model="radio2"    @change="handleChecked"     style="text-align:left;width:100%">
        <el-radio v-for="i in radio" :label="i.code">{{i.name}}</el-radio>
      </el-radio-group>
      <!-- 分单 -->
      <div style="margin-top:30px;display:flex">
        <el-card class="box-card" v-if="fendanone.length > 0">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">{{fendan1}}分单</span>
          </div>
          <div v-for="(index,o) in fendanone" :key="o" class="text item">
            <span class="el-icon-circle-close" style="float:left;color:#E5E9F2" @click="delet(o)"></span>
            <span>{{ index.title}}</span>
            <el-button style="float: right;padding:0;margin:0" type="text" size="small" @click="seeBtn(o)" >查看</el-button>
          </div>
        </el-card>
        <el-card class="box-card" v-if="fendantwo.length > 0">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">{{fendan2}}分单</span>
          </div>
          <div v-for="(index,o) in fendantwo" :key="o" class="text item">
            <span class="el-icon-circle-close" style="float:left;color:#E5E9F2" @click="delet2(o)"></span>
            <span>{{ index.title }}</span>
            <el-button style="float: right;padding:0;margin:0" type="text" size="small" @click="seeBtn2(o)">查看</el-button>
          </div>
        </el-card>
        <el-card class="box-card" v-if="fendanthree.length > 0">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">{{fendan3}}分单</span>
            
          </div>
          <div v-for="(index,o) in fendanthree" :key="o" class="text item">
            <span class="el-icon-circle-close" style="float:left;color:#E5E9F2" @click="delet3(o)"></span>
            <span>{{index.title}}</span>
            <el-button style="float: right;padding:0;margin:0" type="text" size="small" @click="seeBtn3(o)">查看</el-button>
          </div>
        </el-card>
      </div>
      <!-- 提交 -->
      <div style="text-align:left;margin-top:30px"><el-button type="primary" @click="sureBtn">提交</el-button></div>
    </div>
    <!-- 筛选条件 -->
    <Shaixuan v-if="Shaixuan" :getcode="getcode" @fendan="fendan" @back="back2" :showselected="showselected" :title="title" ></Shaixuan><!--  -->
  </div>
</template>

<script>
import Shaixuan from './shaixuan';
export default {
  name: 'zhixingdan',
  components: {
    Shaixuan
  },
  data () {
    return {
      Shaixuan: false,
      first: true,
      radio2: '',
      radio: [],
      getcode: '',
      showselected: [],
      fendan1: '',
      fendan2: '',
      fendan3: '',
      fendanone: [],
      fendantwo: [],
      fendanthree: [],
      fen1: false,
      fen2: false,
      fen3: false,
      title: ''
    };
  },
  created () {
    this.getlabel();
  },
  methods: {
    getlabel () {
      this.$api.get('/api/campaign/getdatatype').then((res) => {
        console.log(res);
        this.radio = res.data.data;
        this.fendan1 = res.data.data[0].name;
        this.fendan2 = res.data.data[1].name;
        this.fendan3 = res.data.data[2].name;
      });
    },
    handleChecked (val) {
      console.log(val);
      this.getcode = val;
      this.first = false;
      this.Shaixuan = true;
      this.showselected = [];
      this.title = '';
      this.showselected2 = [];
      this.title2 = '';
      this.showselected3 = [];
      this.title3 = '';
    },
    // 返回
    back () {
      this.$emit('back', 'back');
    },
    back2 () {
      this.Shaixuan = false;
      this.first = true;
    },
    fendan (val) {
      console.log(val);
      this.Shaixuan = false;
      this.first = true;
      if (this.radio2 === 'tac01') {
        this.fen1 = true;
        this.fendanone.push(val);
      }
      if (this.radio2 === 'tac02') {
        this.fen2 = true;
        this.fendantwo.push(val);
      }
      if (this.radio2 === 'tac03') {
        this.fen3 = true;
        this.fendanthree.push(val);
      }
      console.log(this.fendanone);
    },
    sureBtn () {
      console.log(this.fendanone);
      console.log(this.fendantwo);
      console.log(this.fendanthree);
    },
    // 查看
    seeBtn (o) {
      this.first = false;
      this.Shaixuan = true;
      this.showselected = this.fendanone[o].tags;
      this.title = this.fendanone[o].title;
    },
    seeBtn2 (o) {
      this.first = false;
      this.Shaixuan = true;
      this.showselected = this.fendantwo[o].tags;
      this.title = this.fendantwo[o].title;
    },
    seeBtn3 (o) {
      this.first = false;
      this.Shaixuan = true;
      this.showselected = this.fendanthree[o].tags;
      this.title = this.fendanthree[o].title;
      console.log(this.title);
    },
    // 删除分单
    delet (o) {
      this.fendanone.splice(this.fendanone.indexOf(this.fendanone[o]), 1);
    },
    delet2 (o) {
      this.fendantwo.splice(this.fendantwo.indexOf(this.fendantwo[o]), 1);
    },
    delet3 (o) {
      this.fendanthree.splice(this.fendanthree.indexOf(this.fendanthree[o]), 1);
    }
  }
};
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }

  .box-card {
    width: 180px;
  }
  .box-card{
    /*width: 33.33%;*/
    margin: 0 20px
  }
  .item{
    cursor: pointer;
  }
</style>
