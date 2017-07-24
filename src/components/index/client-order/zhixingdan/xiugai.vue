<template>
  <div>
    <div v-if="first"  v-loading="loading2">
      <!-- 返回 -->
      <div style="text-align:left;margin-bottom:30px">
        <span  class="el-icon-arrow-left" style="font-size:14px;color:#20A0FF"></span>
        <el-button type="text" @click="backs">返回</el-button>
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
        <el-radio v-for="i in radios" :label="i.code">{{i.name}}</el-radio>
      </el-radio-group>
      <!-- 分单 -->
     <div style="margin-top:30px;display:flex">
        <el-card v-for="(i,index) in radio" class="box-card" v-if="i.fendan.length > 0">
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">{{i.tac_name}}分单</span>
          </div>

          <div v-for="(index,o) in i.fendan" ref="tagss"   :code="o"  :key="o" class="text item">
            <span class="el-icon-circle-close" style="float:left;color:#E5E9F2" @click="delet(i,o)"></span>
            <span>{{ index.file_name}}</span>
            <el-button style="float: right;padding:0;margin:0" type="text" size="small" @click="seeBtn(i,o)" >查看</el-button>
          </div>
        </el-card>
      </div>
      <!-- 提交 -->
      <div style="text-align:left;margin-top:30px">
        <el-button type="primary" v-if="histroy !== 3" @click="sureBtn">修改</el-button></div>
      </div>
    <!-- 筛选条件 -->
    <Shaixuan v-if="Shaixuan" :getZXinfo="getZXinfo"  :getcode="getcode" @fendans="fendans" @back="back2" :showselected="showselected" :title="title" :btnfalse="btnfalse" :histroy2='histroy2'></Shaixuan><!--  -->
  </div>
</template>

<script>
import Shaixuan from './shaixuan';
export default {
  name: 'zhixingdan',
  props: ['hanginfo', 'getxginfo', 'tabtoggle', 'histroy'],
  components: {
    Shaixuan
  },
  data () {
    return {
      Shaixuan: false,
      first: true,
      radio2: '',
      radio: [],
      radios: [],
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
      loading2: false,
      histroy2: this.histroy
    };
  },
  watch: {
    getxginfo (val) {
      console.log(val);
      this.radio = val;
    },
    tabtoggle (val) {
      console.log(val);
      this.cdtab = val;
      this.radio2 = '';
      this.Shaixuan = false;
      this.first = true;
    },
    histroy (val) {
      console.log(val);
    }
  },
  created () {
    this.getlabel();
    console.log(this.histroy);
    // this.radio = this.getxginfo.subunit;
  },
  methods: {
    getlabel () {
      this.loading2 = true;
      this.$api.get('/api/campaign/getdatatype').then((res) => {
        this.loading2 = false;
        this.radios = res.data.data;
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
    backs () {
      this.$emit('back', 'back');
    },
    back2 () {
      this.radio2 = '';
      this.Shaixuan = false;
      this.first = true;
    },
    fendans (val) {
      console.log(val);
      if (typeof val === 'number') {
        this.Shaixuan = false;
        this.first = true;
      } else {
        this.radio2 = '';
        this.Shaixuan = false;
        this.first = true;
        for (var i = 0; i < this.radio.length; i++) {
          if (val.tac_code === this.radio[i].tac_code) {
            console.log(1);
            delete val.tac_code;
            delete val.child_single_num;
            console.log(this.radio[i]);
            for (var s = 0; s < this.radio[i].fendan.length; s++) {
              console.log(this.radio[i].fendan[s].file_name);
              if (val.file_name === this.radio[i].fendan[s].file_name) {
                this.chongfu = 'chongfu';
              }
            }
            this.radio[i].fendan.push(val);
          } else {
            console.log(333);
            for (var q = 0; q < this.radios.length; q++) {
              console.log(this.radios[q]);
              if (val.tac_code === this.radios[q].code) {
                var obj = {};
                obj.fendan = [];
                obj.tac_code = this.radios[q].code;
                obj.tac_name = this.radios[q].name;
                delete val.tac_code;
                obj.fendan.push(val);
                console.log(obj);
                this.radio.push(obj);
              }
            }
          }
        }
        console.log(this.radio);
      }
    },
    // 提交执行单
    sureBtn () {
      this.loading2 = true;
      console.log(this.radio);
      var obj = {};
      obj.order_num = this.hanginfo.order_num;
      obj.single_num = this.getxginfo.single_num;
      obj.city = this.hanginfo.city;
      obj.ind_code = this.hanginfo.industryId;
      obj.prov = this.hanginfo.area;
      obj.subunit = [];
      for (var i = 0; i < this.radio.length; i++) {
        var obj2 = {};
        obj2.tac_code = this.radio[i].tac_code;
        obj2.tac_name = this.radio[i].tac_name;
        for (var s = 0; s < this.radio[i].fendan.length; s++) {
          this.radio[i].fendan[s].child_single_num = '';
        }
        obj2.fendan = this.radio[i].fendan;
        obj.subunit.push(obj2);
      }
      console.log(obj);
      this.$confirm('修改后将无法撤回,确认修改?')
        .then(_ => {
          this.$api.post('/api/campaign/modifyCampaign', obj).then((res) => {
            this.loading2 = false;
            console.log(res);
          });
        })
        .catch(_ => {});
    },
    // 查看
    seeBtn (i, o) {
      this.getZXinfo = this.hanginfo;
      this.getcode = i.tac_code;
      this.first = false;
      this.Shaixuan = true;
      this.btnfalse = '1';
      console.log(i, o);
      console.log(i.fendan[o]);
      this.showselected = i.fendan[o].tags;
      this.title = i.fendan[o].file_name;
    },
    // 删除分单
    delet (index, o) {
      console.log(i, o);
      for (var i = 0; i < index.fendan.length; i++) {
        index.fendan.splice(o, 1);
      }
      console.log(this.radio);
      var that = this;
      that.radio = that.radio.filter(function (item) {
        console.log(that.radio);
        return item;
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
