<template>
  <div>
    <div v-if="first"  v-loading="loading2" element-loading-text="加载中，请稍后..">
      <!-- 返回 -->
      <div style="text-align:left;margin-bottom:30px">
        <span  class="el-icon-arrow-left" style="font-size:14px;color:#20A0FF"></span>
        <el-button type="text" @click="backs">返回</el-button>
      </div>
      <!-- 需求单信息 -->
      <el-collapse style="width:100%;margin-bottom:20px">
        <el-collapse-item title="需求单信息" name="1" style="background:#ccc">
          <div >
            <div class="xuqiutitle" style="display:flex">
              <p><span>需求单编号:</span><span>{{hanginfo.order_num}}</span></p>
              <p><span>执行单编号:</span><span>{{hanginfo.single_num}}</span></p>
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
              <li><div>项目描述:</div><div style="overflow: hidden; word-wrap: break-word;">{{hanginfo.project_description}}</div></li>
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
        <el-card v-for="(i,index) in radio" class="box-card" > <!-- v-if="i.fendan.length > 0" -->
          <div slot="header" class="clearfix">
            <span style="line-height: 36px;">{{i.tac_name}}分单</span>
          </div>

          <div v-for="(indexs,o) in i.fendan" ref="tagss"   :code="o"  :key="o" class="text item">
            <span class="el-icon-circle-close" style="float:left;color:#E5E9F2" @click="delet(i,o)"></span>
            <span>分单{{ o+1}}</span>
            <el-button style="float: right;padding:0;margin:0" type="text" size="small" @click="seeBtn(i,o, index)" >查看</el-button>
          </div>
        </el-card>
    </div>
      <!-- 提交 -->
      <div style="text-align:left;margin-top:30px" v-if="ishistory !== 3">
        <el-button type="primary"  @click="sureBtn">修改</el-button></div>
      </div>
    <!-- 筛选条件 -->
    <Shaixuan v-if="Shaixuan" :getZXinfo="getZXinfo" :getnum="getnum" :getfendaninfo="getfendaninfo"  :getcode="getcode" @fendans="fendans" @back="back2" :index="indexNum" :showselected="showselected" :title="title" :btnfalse="btnfalse" ></Shaixuan>
  </div>
</template>

<script>
import Shaixuan from './shaixuan';
export default {
  name: 'zhixingdan',
  props: ['hanginfo', 'getxginfo', 'tabtoggle', 'ishistory'],
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
      indexNum: 0,
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
      histroy2: this.histroy,
      getnum: {},
      getfendaninfo: {}
    };
  },
  watch: {
    getxginfo (val, old) {
      this.radio = val;
    },
    tabtoggle (val) {
      this.cdtab = val;
      this.radio2 = '';
      this.Shaixuan = false;
      this.first = true;
    },
    radio (val) {
      console.log('radio', val);
    },
    histroy (val) {
      console.log(val);
    }
  },
  created () {
    // this.getlabel();
    this.radio = this.getxginfo.subunit;
  },
  methods: {
    getlabel () {
      this.loading2 = true;
      var code = this.hanginfo.single_num;
      this.$api.get('/api/campaign/getchildalltaccode/' + code).then((res) => {
        this.loading2 = false;
        this.radios = res.data.data;
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
    },
    // 返回
    backs () {
      this.$emit('back', 'back');
    },
    back2 (val) {
      this.getfendaninfo = {};
      this.radio2 = '';
      this.Shaixuan = false;
      this.first = true;
    },
    fendans (val) {
      if (typeof val === 'number') {
        this.Shaixuan = false;
        this.first = true;
      } else {
        this.radio2 = '';
        this.Shaixuan = false;
        this.first = true;
        for (var i = 0; i < this.radio.length; i++) {
          if (val.tac_code === this.radio[i].tac_code) {
            delete val.tac_code;
            delete val.child_single_num;
            this.radio[i].fendan.push(val);
            return;
          }/* else {
            for (var q = 0; q < this.radios.length; q++) {
              if (val.tac_code === this.radios[q].code) {
                var obj = {};
                obj.fendan = [];
                obj.tac_code = this.radios[q].code;
                obj.tac_name = this.radios[q].name;
                delete val.tac_code;
                obj.fendan.push(val);
                this.radio.push(obj);
                console.log('this.radio[i].tac_code', this.radio);
              }
            }
          } */
        }
      }
    },
    // 提交执行单
    sureBtn () {
      var obj = {};
      obj.order_num = this.hanginfo.order_num;
      obj.single_num = this.hanginfo.single_num;
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
      this.$confirm('修改后将无法撤回,确认修改?')
        .then(_ => {
          this.loading2 = true;
          this.$api.post('/api/campaign/modifyCampaign', obj).then((res) => {
            this.loading2 = false;
            if (res.status === 200) {
              if (res.data.code === 0) {
                this.$confirm('修改成功！')
                  .then(_ => {
                    this.$emit('xiugaichenggong');
                  });
              } else {
                this.$confirm('修改失败！');
              }
            } else {
              this.$confirm('服务器出错,请重试！');
            }
          });
        })
        .catch(_ => {
          this.loading2 = false;
        });
    },
    // 查看
    seeBtn (i, o, index) {
      this.getZXinfo = this.hanginfo;
      this.getcode = i.tac_code;
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
      for (var i = 0; i < index.fendan.length; i++) {
        index.fendan.splice(o, 1);
      }
      var that = this;
      that.radio = that.radio.filter(function (item) {
        return item;
      });
    }
  }
};
</script>

<style lang="css" scoped>
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
.el-collapse-item__header{
  background-color: #007bf7;
  background:  #007bf7;
}
</style>
