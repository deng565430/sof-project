<template>
  <div v-loading="loading2">
    <div v-if="first">
      <!-- 返回 -->
      <div style="text-align:left;margin-bottom:30px;height:50px;line-height:50px">
        <span  class="el-icon-arrow-left" style="font-size:14px;color:#20A0FF"></span>
        <el-button type="text" @click="xinajianback">返回</el-button>
      </div>
      <!-- 需求单信息 -->
      <el-collapse style="width:100%;margin-bottom:20px">
        <el-collapse-item title="需求单信息" name="1" style="background:#ccc">
          <div >
            <div class="xuqiutitle" style="display:flex">
              <p><span>需求单编号:</span><span>{{hanginfo.order_num}}</span></p>
              <p><span>制单人:</span><span>{{hanginfo.tabulator}}</span></p>
              <p><span>制单时间:</span><span>{{hanginfo.create_time}}</span></p>
            </div>
            <ul class="tanchu">
              <li><div>所属行业:</div><div>{{hanginfo.ind_name}}</div></li>
              <li><div>所属区域:</div><div>{{hanginfo.prov_name}}<b v-if="hanginfo.city_name">/{{hanginfo.city_name}}</b></div></li>
              <li><div>项目名称:</div><div>{{hanginfo.project_name}}</div></li>
              <li><div>策略类型:</div><div>{{hanginfo.strategy}}</div></li>
              <li><div>需求公司:</div><div>{{hanginfo.demand_side}}</div></li>
              <li><div>所需电话量/天:</div><div>{{hanginfo.phone_demand}}</div></li>
              <li><div>所需周期:</div><div>{{hanginfo.start_date}}<b style="margin:0 10px;back">-</b>{{hanginfo.end_date}}</div></li>
              <li><div>项目描述:</div><div>{{hanginfo.project_description}}</div></li>
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
            <span class="el-icon-circle-close" style="float:left;color:#E5E9F2" @click="delet(i,o)"></span>
            <span>分单{{ o + 1}}</span>
            <el-button style="float: right;padding:0;margin:0" type="text" size="small" @click="seeBtn(i,o, index)" >查看</el-button>
          </div>
        </el-card>
      </div>
      <!-- 提交 -->
      <div style="text-align:left;margin-top:30px">
        <el-button type="primary" @click="sureBtn">提交</el-button></div>
      </div>
    <!-- 筛选条件 -->
    <Shaixuan :cdtab="cdtab" v-if="Shaixuan" :getnum="getnum" :getZXinfo="getZXinfo" @fendans="fendans" :index="indexNum"  :getcode="getcode" :getfendaninfo="getfendaninfo"  @back="back2" :showselected="showselected" :title="title" :btnfalse="btnfalse"></Shaixuan> <!--  -->
  </div>
</template>

<script>
import Shaixuan from './newshaixuan';
export default {
  name: 'zhixingdan',
  props: ['hanginfo', 'tabtoggle'],
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
      btnfalse: '',
      cdtab: this.tabtoggle,
      getnum: {},
      loading2: false,
      indexNum: 0,
      getfendaninfo: {}
    };
  },
  watch: {
    tabtoggle (val) {
      this.cdtab = val;
      this.radio2 = '';
      this.Shaixuan = false;
      this.first = true;
    }
  },
  created () {
    this.getlabel();
  },
  methods: {
    getlabel () {
      var code = this.hanginfo.industryId;
      this.$api.get('/api/campaign/getdatatype/' + code).then((res) => {
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
      var obj = {};
      obj.code = val;
      obj.value = this.radio;
      this.getnum = obj;
      this.getcode = val;
      this.first = false;
      this.Shaixuan = true;
      this.showselected = [];
      // this.title = '';
      // this.showselected2 = [];
      // this.title2 = '';
      // this.showselected3 = [];
      // this.title3 = '';
    },
    // 返回
    xinajianback () {
      this.$emit('xinajianback');
    },
    back2 (val) {
      this.radio2 = '';
      this.getfendaninfo = {};
      this.Shaixuan = false;
      this.first = true;
    },
    fendans (val) {
      this.radio2 = '';
      this.Shaixuan = false;
      this.first = true;
      for (var i = 0; i < this.radio.length; i++) {
        if (val.tac_code === this.radio[i].code) {
          // this.fen1 = true;
          delete val.tac_code;
          delete val.child_single_num;
          for (var s = 0; s < this.radio[i].fendan.length; s++) {
            if (val.file_name === this.radio[i].fendan[s].file_name) {
              this.chongfu = 'chongfu';
            }
          }
          this.radio[i].fendan.push(val);
        }
      }
    },
    // 提交执行单
    sureBtn () {
      this.loading2 = true;
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
      this.$api.post('/api/campaign/addCampaign', obj).then((res) => {
        this.loading2 = false;
        if (res.status === 200) {
          if (res.data.code === 0) {
            this.$confirm('添加成功！')
              .then(_ => {
                this.$emit('addnewcampaign');
              });
          } else {
            this.$confirm('添加失败！');
          }
        } else {
          this.$confirm('服务器出错,请重试！');
        }
      });
    },
    // 查看
    seeBtn (i, o, index) {
      // this.first = false;
      // this.Shaixuan = true;
      // this.btnfalse = '1';
      // this.getcode = i.tac_code;
      // console.log(i, o);
      // console.log(i.fendan[o]);
      // this.showselected = i.fendan[o].tags;
      // this.title = i.fendan[o].file_name;
      this.getZXinfo = this.hanginfo;
      this.getcode = i.code;
      this.indexNum = {
        index,
        o
      };
      this.first = false;
      this.Shaixuan = true;
      this.btnfalse = '1';
      this.getfendaninfo = i;
      this.showselected = i.fendan[o].tags;
      this.title = i.fendan[o].file_name;
    },
    // 删除分单
    delet (index, o) {
      index.fendan.splice(o, 1);
      var that = this;
      that.radio = that.radio.filter(function (item) {
        return that.radio;
      });
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
  padding: 0 40px 0 40px;
  border-bottom: 1px solid #dfe6ec
}
.xuqiutitle p{
  margin-bottom: 10px;
  margin-right: 20px;
  margin-top: 15px;
  flex:1;
  color: #333333;
}
.xuqiutitle p span:first-child{
  margin-right: 10px
}
.tanchu{
  text-align: left;
  color:#666666;
  margin: 10px 0  
}
.tanchu li{
  /*line-height: 30px;*/
  min-height: 30px;
  line-height: 30px;
  display: flex;
  padding: 0 40px;
}
.tanchu li div:first-child{
margin-right: 10px
}
/* .tanchu li:last-child{
  border-bottom:0;
}
.tanchu li div:first-child{
  color: #333;
  line-height: 30px;
  height: 100%;
  width:100px;
  background: #eee;
  display: inline-block;
  text-align: center;
}
.tanchu li div:nth-child(2){
  padding-left: 8px;
  word-wrap: break-word;
  overflow: hidden;
} */
</style>
