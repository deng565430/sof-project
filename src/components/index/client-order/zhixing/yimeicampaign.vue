<template>
<div class="formcontain">
    <ul :model="ruleForm">
      <li ><span>公司名称:</span><span>{{ruleForm.cname}}</span></li>
      <li ><span>项目名称:</span><span>{{ruleForm.name}}</span></li>
      <li ><span>需求数量:</span><span>{{ruleForm.num}}</span></li>
      <li ><span>订阅周期:</span><span>{{ruleForm.value}}-{{ruleForm.value1}}</span></li>
    </ul>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px" v-show='show2'>
          <el-form-item label="所属数据类型">
              <el-checkbox-group v-model="numtype">
                <el-checkbox label="线上数据" ></el-checkbox>
                <el-checkbox label="线下数据"></el-checkbox>
              </el-checkbox-group>
          </el-form-item>
          <el-form-item label="" label-width="100px">
              <el-checkbox-group v-model="numtype1">
                <el-checkbox label="论坛社区" ></el-checkbox>
                <el-checkbox label="医美网站" ></el-checkbox>
                <el-checkbox label="搜索词" @change='onselect'></el-checkbox>
              </el-checkbox-group>
          </el-form-item>
         <el-form-item label="" label-width="100px">
              <el-checkbox-group v-model="numtype1">
                <el-checkbox label="娱乐场所" ></el-checkbox>
                <el-checkbox label="生活场所" ></el-checkbox>
              </el-checkbox-group>
          </el-form-item>
         <el-form-item label="" label-width="100px">
              <el-checkbox-group v-model="numtype3">
                <el-checkbox label="搜索量" ></el-checkbox>
                <el-checkbox label="竞价" ></el-checkbox>
                <el-checkbox label="转化率" ></el-checkbox>
                <el-checkbox label="综合排名" ></el-checkbox>
              </el-checkbox-group>
          </el-form-item>
         <el-form-item>
          <el-button ><router-link to="/client/dinging">取 消</router-link></el-button>
          <el-button type="primary" :loading="false" @click="submitForm()">下一步</el-button>
        </el-form-item>
    </el-form>
    <el-form label-width="80px" v-show='show'>
      <!-- <el-form-item label="文件名称" prop="zTitle">
            <el-input v-model="ruleForm.zTitle"></el-input>
      </el-form-item> -->
      <el-form-item label="社区论坛" :model="ruleForm" ref="ruleForm">
        <el-input v-model="ruleForm.zTitle1" placeholder="请输入社区论坛名"></el-input>
        <el-input type="textarea" v-model="ruleForm.note"></el-input>
      </el-form-item>
      <el-form-item label="医美网站" :model="ruleForm" ref="ruleForm">
        <el-input v-model="ruleForm.zTitle2" placeholder="请输入医美网站文件名"></el-input>
        <el-input type="textarea" v-model="ruleForm.ind" ></el-input>
      </el-form-item>
      <el-form-item label="搜索词" :model="ruleForm" ref="ruleForm">
        <el-input v-model="ruleForm.zTitle3" placeholder="请输入搜索词文件名"></el-input>
        <el-input type="textarea" v-model="ruleForm.kw"></el-input>
      </el-form-item>
      <el-form-item label="娱乐场所" :model="ruleForm" ref="ruleForm">
        <el-input v-model="ruleForm.zTitle4" placeholder="请输入娱乐场所文件名"></el-input>
        <el-input type="textarea" v-model="ruleForm.fun"></el-input>
      </el-form-item>
      <el-form-item label="生活场所" :model="ruleForm" ref="ruleForm">
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
      loading: false,
      show: false,
      show2: true,
      ruleForm: {
        cname: '',
        name: '',
        num: '',
        desc: '',
        value: '',
        value1: '',
        note: '',
        ind: '',
        fun: '',
        kw: '',
        life: '',
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
      this.show = false;
    },
    onselect () {
      console.log(111);
    },
    submitForm2 () {
      var id = decodeURI(window.location.href.split('=')[1]).replace(/\s/g, '');
      var beauty = {
        'briefid': id,
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
      this.$ajax({
        method: 'post',
        url: '/api/beauty/addBeautyCampaign',
        data: data
      }).then(function (res) {
        if (res.status === 200) {
          console.log(res.data);
          window.location.href = 'http://localhost:8080/#/client/Newzhi';
        }
      });
    },
    submitForm () {
      var _this = this;
      for (var i = 0; i < _this.numtype1.length; i++) {
        if (_this.numtype1[i] === '论坛社区') {
          _this.numtype1[i] = 'note';
        } else if (_this.numtype1[i] === '医美网站') {
          _this.numtype1[i] = 'ind';
        } else if (_this.numtype1[i] === '搜索词') {
          _this.numtype1[i] = 'kw';
        }
      }
      console.log(this.numtype1);
      var data = {
        'kw': this.numtype3,
        'option': false,
        'type': this.numtype1
      };
      this.$ajax({
        method: 'post',
        url: '/api/beauty/getBeautyData',
        data: data
      }).then(function (res) {
        if (res.status === 200) {
          console.log(res.data.data);
          _this.ruleForm.note = res.data.data.note.data;
          _this.ruleForm.ind = res.data.data.ind.data;
          _this.ruleForm.kw = res.data.data.kw.data;
          _this.ruleForm.life = res.data.data.life.data;
          _this.ruleForm.fun = res.data.data.fun.data;
          _this.show2 = false;
          _this.show = true;
        }
      });
    }
  }
};
</script>

<style lang="css" scoped>
.formcontain{
  width:400px;
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
ul {
  display: flex
}


.el-checkbox-button__inner{
  border:0px;
}

</style>
