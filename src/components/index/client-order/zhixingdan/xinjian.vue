<template>
  <div>
    <div v-if="first">
      <!-- 返回 -->
      <div style="text-align:left;margin-bottom:30px">
        <span  class="el-icon-arrow-left" style="font-size:14px;color:#20A0FF"></span>
        <el-button type="text" @click="back">返回</el-button>
      </div>
      <!-- 需求单信息 -->
      <el-collapse style="width:100%;margin-bottom:20px">
        <el-collapse-item title="需求单信息" name="1" style="padding:10px 10px 0 10px">
          <div >
            <div class="xuqiutitle" style="display:flex">
              <p><span>需求单编号:</span><span>{{hanginfo.order_num}}</span></p>
              <p><span>制单人:</span><span>{{hanginfo.tabulator}}</span></p>
              <p><span>制单时间:</span><span>{{hanginfo.create_time}}</span></p>
            </div>
            <ul class="tanchu">
              <li><div>所属行业</div><div>{{hanginfo.ind_name}}</div></li>
              <li><div>所属区域</div><div>{{hanginfo.prov_name}}<b v-if="hanginfo.city_name">/{{hanginfo.city_name}}</b></div></li>
              <li><div>项目名称</div><div>{{hanginfo.phone_demand}}</div></li>
              <li><div>策略类型</div><div>{{hanginfo.strategy}}</div></li>
              <li><div>需求公司</div><div>{{hanginfo.demand_side}}</div></li>
              <li><div>所需电话量/天</div><div>{{hanginfo.phone_demand}}</div></li>
              <li><div>所需周期</div><div>{{hanginfo.start_date}}<b style="margin:0 10px;back">-</b>{{hanginfo.end_date}}</div></li>
              <li><div>项目描述</div><div>{{hanginfo.project_description}}</div></li>
            </ul>
          </div>
        </el-collapse-item>
      </el-collapse>
      <!-- 数据选择 -->
      <el-radio-group v-model="radio2"    @change="handleChecked"     style="text-align:left;width:100%">
        <el-radio v-for="i in radio" :label="i.code">{{i.name}}</el-radio>
      </el-radio-group>
      <!-- 分单 -->
      <div style="margin-top:30px;display:flex">
        <el-card v-for="(i,index) in radio" class="box-card" v-if="i.fendan.length > 0">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">{{i.name}}分单</span>
          </div>

          <div v-for="(index,o) in i.fendan" ref="tagss"   :code="o"  :key="o" class="text item">
            <!-- {{i.fendan}} -->{{o}}
            <span class="el-icon-circle-close" style="float:left;color:#E5E9F2" @click="delet(i,o)"></span>
            <span>{{ index.file_name}}</span>
            <el-button style="float: right;padding:0;margin:0" type="text" size="small" @click="seeBtn(i,o)" >查看</el-button>
          </div>
        </el-card>
      </div>
      <!-- 提交 -->
      <div style="text-align:left;margin-top:30px">
        <el-button type="primary" @click="sureBtn">提交</el-button></div>
      </div>
    <!-- 筛选条件 -->
    <Shaixuan v-if="Shaixuan" :getZXinfo="getZXinfo"  :getcode="getcode" @fendans="fendans" @back="back2" :showselected="showselected" :title="title" :btnfalse="btnfalse"></Shaixuan><!--  -->
  </div>
</template>

<script>
import Shaixuan from './shaixuan';
export default {
  name: 'zhixingdan',
  props: ['hanginfo'],
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
      fendan: [],
      fendan1: '',
      fendan2: '',
      fendan3: '',
      fendanone: [],
      fendantwo: [],
      fendanthree: [],
      fen1: false,
      fen2: false,
      fen3: false,
      title: '',
      getZXinfo: {},
      btnfalse: ''
    };
  },
  created () {
    this.getlabel();
    console.log(this.hanginfo);
  },
  methods: {
    getlabel () {
      this.$api.get('/api/campaign/getdatatype').then((res) => {
        console.log(res);
        this.radio = res.data.data;
        for (var i = 0; i < this.radio.length; i++) {
          var data = [];
          this.radio[i].fendan = data;
          this.fendan = this.radio[i].fendan;
        }
      });
    },
    handleChecked (val) {
      this.getZXinfo = this.hanginfo;
      this.btnfalse = '0';
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
      this.radio2 = '';
      this.Shaixuan = false;
      this.first = true;
    },
    fendans (val) {
      console.log(val);
      this.radio2 = '';
      this.Shaixuan = false;
      this.first = true;
      for (var i = 0; i < this.radio.length; i++) {
        if (val.tac_code === this.radio[i].code) {
          // this.fen1 = true;
          delete val.tac_code;
          this.radio[i].fendan.push(val);
        }
      }
      console.log(this.radio);
    },
    // 提交执行单
    sureBtn () {
      var obj = {};
      obj.order_num = this.hanginfo.order_num;
      obj.city = this.hanginfo.city;
      obj.ind_code = this.hanginfo.industryId;
      obj.prov = this.hanginfo.area;
      obj.subunit = [];
      for (var i = 0; i < this.radio.length; i++) {
        var obj2 = {};
        obj2.tac_code = this.radio[i].code;
        obj2.fendan = this.radio[i].fendan;
        obj.subunit.push(obj2);
      }
      console.log(obj);
      // this.$api.post('/api/campaign/addCampaign', obj).then((res) => {
      //   console.log(res);
      // });
    },
    // 查看
    seeBtn (i, o) {
      this.first = false;
      this.Shaixuan = true;
      this.btnfalse = '1';
      console.log(i, o);
      console.log(i.fendan[o]);
      this.showselected = i.fendan[o].tags;

      // this.title = this.fendanone[o].title;
    },
    // 删除分单
    delet (i, o) {
      console.log(i, o);
      console.log(i.fendan);
      console.log(this.radio[o]);
      // this.radio[o].fendan.splice(this.radio[o].fendan.indexOf(this.radio[o].fendan), 1);
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
  .xuqiutitle{
  text-align: left;
}
.xuqiutitle p{
  margin-bottom: 10px;
  margin-right: 20px;
  margin-top: 15px;
}
.tanchu{
  text-align: left;
  border: 1px solid #ccc
}
.tanchu li{
  /*line-height: 30px;*/
  min-height: 30px;
  border-bottom: 1px solid #ccc;
  display: flex;
}
.tanchu li:last-child{
  border-bottom:0;
}
.tanchu li div:first-child{
  color: #333;
  line-height: 30px;
  height: 100%;
  width:100px;
  background: #eee;
  /*display: inline-block;*/
  text-align: center;
}
.tanchu li div:nth-child(2){
  padding-left: 8px;
  word-wrap: break-word;
  overflow: hidden;
}
</style>
