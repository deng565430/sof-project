<template>
<div class="formcontain" v-show="show3">
     <el-steps :space="200" :active="active" class='lines'>
      <el-step title="基础信息" description=""></el-step>
      <el-step title="数据规则" description=""></el-step>
      <el-step title="生成执行单" description=""></el-step>
    </el-steps>
    <div v-show='show2' v-loading.body="loading">
    <ul :model="ruleForm">
      <li ><span>公司名称:</span><span>{{11}}</span></li>
      <li ><span>项目名称:</span><span>{{$store.state.yimei.cname}}</span></li>
      <li ><span>需求数量:</span><span>{{$store.state.yimei.num}}</span></li>
      <li ><span>订阅周期:</span><span>{{$store.state.yimei.stratime}}-{{$store.state.yimei.endtime}}</span></li>
    </ul>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px" class="form1">
          <el-form-item label="线上数据" label-width="100px">
              <el-checkbox-group v-model="numtype1">
                <el-checkbox label="note" >论坛社区</el-checkbox>
                <el-checkbox label="ind" >医美网站</el-checkbox>
                <el-checkbox label="kw"   @change='onselect'>搜索词</el-checkbox>
              </el-checkbox-group>
          </el-form-item>
          <el-form-item label="搜索词" label-width="100px" v-show="isshow">
              <el-checkbox-group v-model="numtype3">
                <el-checkbox label="搜索量" ></el-checkbox>
                <el-checkbox label="竞价" ></el-checkbox>
                <el-checkbox label="转化率" ></el-checkbox>
                <el-checkbox label="综合排名" ></el-checkbox>
              </el-checkbox-group>
          </el-form-item>
         <el-form-item label="线下数据" label-width="100px">
              <el-checkbox-group v-model="numtype2">
                <el-checkbox label="娱乐场所" >娱乐场所</el-checkbox>
                <el-checkbox label="生活场所" >生活场所</el-checkbox>
              </el-checkbox-group>
          </el-form-item>
         
         <el-form-item>
          <el-button ><router-link to="/client/Newzhi">取 消</router-link></el-button>
          <el-button type="primary" :loading="false" @click="submitForm()">下一步</el-button>
        </el-form-item>
    </el-form>
  </div>
    <el-form label-width="80px" v-show='showxiang' class='form2'>
      <!-- <el-form-item label="文件名称" prop="zTitle">
            <el-input v-model="ruleForm.zTitle"></el-input>
      </el-form-item> -->
      <el-form-item label="社区论坛" :model="ruleForm" ref="ruleForm" v-show='lshow'>
        <el-input v-model="ruleForm.zTitle1" placeholder="请输入社区论坛名"></el-input>
        <el-input type="textarea" v-model="ruleForm.note"></el-input>
      </el-form-item>
      <el-form-item label="医美网站" :model="ruleForm" ref="ruleForm" v-show='yshow'>
        <el-input v-model="ruleForm.zTitle2" placeholder="请输入医美网站文件名"></el-input>
        <el-input type="textarea" v-model="ruleForm.ind" ></el-input>
      </el-form-item>
      <el-form-item label="搜索词" :model="ruleForm" ref="ruleForm" v-show='sshow'>
        <el-input v-model="ruleForm.zTitle3" placeholder="请输入搜索词文件名"></el-input>
        <el-input type="textarea" v-model="ruleForm.kw"></el-input>
      </el-form-item>
      <el-form-item label="娱乐场所" :model="ruleForm" ref="ruleForm" v-show='ylshow'>
        <el-input v-model="ruleForm.zTitle4" placeholder="请输入娱乐场所文件名"></el-input>
        <el-input type="textarea" v-model="ruleForm.fun"></el-input>
      </el-form-item>
      <el-form-item label="生活场所" :model="ruleForm" ref="ruleForm" v-show='shshow'>
        <el-input v-model="ruleForm.zTitle5" placeholder="请输入生活场所文件名"></el-input>
        <el-input type="textarea" v-model="ruleForm.life"></el-input>
      </el-form-item>
      <el-form-item>
          <el-button  @click="before()">上一步</el-button>
          <el-button type="primary" :loading="false" @click="submitForm2()">提交</el-button>
        </el-form-item>
    </el-form>

  
</div>
</template>
<script>
export default {
  data () {
    return {
      lshow: true,
      yshow: true,
      sshow: true,
      ylshow: true,
      shshow: true,
      isshow: false,
      loading: false,
      showxiang: false,
      show2: true,
      show3: true,
      shows: false,
      active: 1,
      checked: false,
      ruleForm: {
        cname: '',
        name: '',
        num: '',
        desc: '',
        value: '',
        value1: '',
        note: [],
        ind: [],
        fun: [],
        kw: [],
        life: [],
        zTitle1: '',
        zTitle2: '',
        zTitle3: '',
        zTitle4: '',
        zTitle5: ''
      },
      region: [],
      numtype: [],
      numtype1: [],
      numtype2: [],
      numtype3: [],
      campaign: '',
      options: [{
        value: '',
        label: ''
      }],
      briefid: '',
      tags: [],
      areas: [],
      areatype: [],
      wtypes: [],
      wtype: [],
      rules: {
        cname: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入项目描述', trigger: 'blur' }
        ],
        num: [
          { required: true, message: '请输入需求数量', trigger: 'change' }
        ]
      },
      formLabelWidth: '120px'
    };
  },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
  },
  methods: {
    before () {
      this.show2 = true;
      this.showxiang = false;
      if (this.active-- < 0) this.active = 2;
    },
    onselect () {
      if (this.isshow === true) {
        this.isshow = false;
      } else if (this.isshow === false) {
        this.isshow = true;
      }
    },
    submitForm2 () {
      var brieid = this.$store.state.brieid;
      console.log(brieid);
      console.log(this.$store.state.commitIs);
      var beauty = {
        'briefid': brieid,
        'project_name': this.ruleForm.name,
        'select_kw': this.numtype3.join(','),
        'select_type': this.numtype1.join(',')
      };
      var fun = {
        'data': this.ruleForm.fun,
        'file_name': this.ruleForm.zTitle4
      };
      var ind = {
        'data': this.ruleForm.ind,
        'file_name': this.ruleForm.zTitle2
      };
      var kw = {
        'data': this.ruleForm.kw,
        'file_name': this.ruleForm.zTitle3
      };
      var life = {
        'data': this.ruleForm.life,
        'file_name': this.ruleForm.zTitle4
      };
      var note = {
        'data': this.ruleForm.note,
        'file_name': this.ruleForm.zTitle1
      };
      var data = {
        'beauty': beauty,
        'fun': fun,
        'ind': ind,
        'kw': kw,
        'life': life,
        'note': note
      };
      var _this = this;
      this.$ajax({
        method: 'post',
        url: '/api/beauty/addBeautyCampaign',
        data: data
      }).then((res) => {
        if (res.status === 200) {
          _this.show3 = false;
          _this.$emit('childrenEventIsShow', [_this.show3]);
          console.log(_this.$store.state.commitIs);
        }
      });
    },
    submitForm () {
      this.loading = true;
      var _this = this;
      var type = [];
      for (var i = 0; i < _this.numtype1.length; i++) {
        type.push(_this.numtype1[i]);
      }
      for (var s = 0; s < _this.numtype2.length; s++) {
        type.push(_this.numtype2[s]);
      }
      var data = {
        'kw': this.numtype3,
        'option': false,
        'type': type
      };
      this.$ajax({
        method: 'post',
        url: '/api/beauty/getBeautyData',
        data: data
      }).then(function (res) {
        if (res.status === 200) {
          _this.loading = false;
          console.log(res.data.data.ind);
          if (res.data.data.ind !== null) {
            _this.ruleForm.ind = res.data.data.ind.data;
          }
          if (res.data.data.fun !== null) {
            _this.ruleForm.fun = res.data.data.fun.data;
          }
          if (res.data.data.kw !== null) {
            _this.ruleForm.kw = res.data.data.kw.data;
          }
          if (res.data.data.life !== null) {
            _this.ruleForm.life = res.data.data.life.data;
          }
          if (res.data.data.note !== null) {
            _this.ruleForm.note = res.data.data.note.data;
          }
          if (_this.active++ > 2) this.active = 0;
          _this.show2 = false;
          _this.showxiang = true;
        }
      });
    }
  },
  mounted () {
    this.$on('a-msg', function (a) {
      this.briefid = a;
      console.log(2222222);
    });
  },
  props: ['showxiangqing', 'linsten']
};
</script>

<style lang="css" scoped>
.formcontain{
  width:100%;
  margin: 0 auto
}
.formcontain a{
    display: inline-block;
    color: #fff
}
.addmore{
  position: absolute;
  top: 0;
  right: -100px
}
.dataselect{
  width:80%;
}
.tip{
  height: 100px;
  width: 400px;
  border: 1px dashed #ccc;
  font-size: 14px;
  padding: 10px;
  box-sizing:border-box;
}
.formtitle{
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  font-family:"PingFang SC";
}
.caozuo button:nth-child(2){
  background: #ccc;
  border: 1px solid #ccc
}
.caozuo button a{
  color: #fff;
  display: inline-block;
}
.el-button--default a{
  color: #ccc
}
.el-button--default a:hover{
  color: #20a0ff
}
ul {/*
  display: flex*/
  margin-bottom: 20px;
}
ul li{
  margin-top: 20px
}
.form2{
  padding: 0 150px
}
.form1{
      width: 500px;
    margin: 0 auto;
}

.el-checkbox-button__inner{
  border:0px;
}

</style>
