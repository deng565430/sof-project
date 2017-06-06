<template>
<div class="formcontain" v-show="show3">
  <div style="text-align:left">
  <el-button type="text" icon="arrow-left" @click="quxiao">返回</el-button>
</div>
     <el-steps :space="200" :active="active" class='lines'>
      <el-step title="基础信息" description=""></el-step>
      <el-step title="数据规则" description=""></el-step>
      <el-step title="生成执行单" description=""></el-step>
    </el-steps>
    <div v-show='show2' v-loading.body="loading">
    <ul :model="ruleForm">
      <li ><span>公司名称:</span><span>{{ruleForm.cname}}</span></li>
      <li ><span>项目名称:</span><span>{{ruleForm.name}}</span></li>
      <li ><span>需求数量:</span><span>{{ruleForm.num}}</span></li>
      <li ><span>项目描述:</span><span>{{ruleForm.desc}}</span></li>
      <li style="width: 40%;"><span>订阅周期:</span><span>{{ruleForm.value}}-{{ruleForm.value1}}</span></li>
    </ul>
    <el-form ref="ruleForm" :model="ruleForm" label-width="80px" class="form1">
          <el-form-item label="部位：" label-width="100px" style="margin-bottom:0px">
              <el-radio-group v-model="checkboxGroup1"  @change="handleCheckedCitiesChange">
                <el-radio-button  v-for="numdata in numdatas"  :label="numdata" :key="numdata" >{{numdata}}</el-radio-button>
              </el-radio-group>
          </el-form-item >
          <div  v-if="numdataisshow" style="margin-bottom:0px;margin-left:100px" class="c1">
              <el-checkbox-button :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox-button>
              <el-checkbox-group v-model="checkboxGroup2" @change="handleCheckedCitiesChange3">
                <el-checkbox-button  v-for="numdata in numdatas2" :label="numdata" :key="numdata" >{{numdata}}</el-checkbox-button>
              </el-checkbox-group>
          </div>
          <el-form-item label="数据类型：" label-width="100px" style="margin-bottom:0px" >
              <el-radio-group v-model="numtype1"  @change="handleCheckedCitiesChange2">
              <el-radio-button  v-for="numdata in numtypes"  :label="numdata.id" :key="numdata.value" >{{numdata.value}}</el-radio-button>
                <!-- <el-radio-button label="note" >论坛社区</el-radio-button>
                <el-radio-button label="ind" >医美网站</el-radio-button>
                <el-radio-button label="kw">搜索词</el-radio-button>
                <el-radio-button label="fun" >娱乐场所</el-radio-button>
                <el-radio-button label="life" >生活场所</el-radio-button> -->
              </el-radio-group>
          </el-form-item>
          <div  v-if="numtype1isshow" style="margin-bottom:0px;margin-left:100px" class="c1">
              <el-checkbox-button :indeterminate="isIndeterminate1" v-model="checkAll1" @change="handleCheckAllChange1">全选</el-checkbox-button>
              <el-checkbox-group v-model="checkboxGroup3" @change="handleCheckedCitiesChange4">
                <el-checkbox-button  v-for="numdata in numdatas3" :label="numdata" :key="numdata" >{{numdata}}</el-checkbox-button>
              </el-checkbox-group>
          </div>
          <div  v-if="numtype1isshow2" style="margin-bottom:0px;margin-left:100px" class="c2">
              <el-checkbox-group v-model="checkboxGroup4" @change="handleCheckedCitiesChange5">
                <el-checkbox-button  v-for="area in area" :label="area" :key="area" >{{area}}</el-checkbox-button>
              </el-checkbox-group>
              <el-form-item label="搜索场所" v-if="sousuo">
              <el-autocomplete
                class="inline-input"
                v-model="state1"
                :icon="close"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                @select="handleSelect"
              ></el-autocomplete>
              </el-form-item>
          </div>
          <el-form-item label="已选条件">
               <div class="onselect">
                   <el-tag
                    v-for="tag in onselect"
                    :closable="closable"
                    :key="tag.value"
                    :id="tag.id"
                    :type="typecolor"
                    @close="handleClose3(tag)"
                  >
                  {{tag.value}}
                  </el-tag>
                  <el-button type="text" @click="qingkong">清空</el-button>
               </div>
         </el-form-item>
         <el-form-item>
          <el-button  @click="quxiao">取 消</el-button>
          <el-button type="primary" :loading="false" @click="submitForm()">下一步</el-button>
        </el-form-item>
    </el-form>
  </div>
    <el-form label-width="80px" v-show='showxiang' class='form2'>
      <el-form-item :label="ruleForm.numname" :model="ruleForm" ref="ruleForm" >
        <el-input v-model="ruleForm.zTitle1" placeholder="请输入文件名"></el-input>
        <el-input type="textarea" v-model="ruleForm.note"></el-input>
      </el-form-item>
      <el-form-item>
          <el-button  @click="before()">上一步</el-button>
          <el-button type="primary" :loading="false" @click="submitForm2()">提交</el-button>
        </el-form-item>
    </el-form>

  
</div>
</template>
<script>
const numtypes = [{id: 'note', value: '论坛社区'}, {id: 'ind', value: '医美网站'}, {id: 'kw', value: '搜索词'}, {id: 'fun', value: '娱乐场所'}, {id: 'life', value: '生活场所'}];
const area = ['闸北区', '闵行区', '宝山区', '嘉定区', '普陀区', '杨浦区', '静安区', '浦东新区', '虹口区', '徐汇区', '黄浦区', '卢湾区', '长宁区', '昆山市', '青浦区', '松江区', '奉贤区', '金山区', '崇明区', '嘉兴市', '川沙区', '吴江区', '莘庄区'];
export default {
  data () {
    return {
      sousuo: false,
      isIndeterminate: false,
      checkAll: false,
      isIndeterminate1: false,
      checkAll1: false,
      close: 'close',
      state1: '',
      typecolor: 'danger',
      closable: true,
      onselect: [{
        value: '',
        id: ''
      }],
      area: area,
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
        numname: '',
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
      numtype1: '',
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
      formLabelWidth: '120px',
      id: '',
      numtypes: numtypes,
      numdatas: [],
      numdatas2: [],
      numdatas3: [],
      checkboxGroup1: '',
      checkboxGroup2: [],
      checkboxGroup3: [''],
      checkboxGroup4: [''],
      numdataisshow: false,
      numtype1isshow: false,
      numtype1isshow2: false,
      restaurants: [],
      bcheckboxGroup2: []
    };
  },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    // this.numdatas = this.$parent.numdatas;
    this.numtypess();
    this.console();
  },
  methods: {
    numtypess () {
      var _this = this;
      this.$ajax({
        method: 'get',
        url: '/api/beauty/getBeautyType'
      }).then((res) => {
        if (res.status === 200) {
          var arr = [];
          var arr2 = [];
          console.log(res.data.data);
          for (var key in res.data.data.parts) {
            // console.log('属性：' + key + ',值:' + res.data.data.parts[key]);
            _this.numdatas.push(key);
            _this.numdataisshow = false;
            arr.push(...res.data.data.parts[key]);
          }
          arr2.push(...res.data.data.forum, ...res.data.data.website);
          // _this.numdataisshow = true;
          this.console();
          /* if (this.numtype1 === 'note' || this.numtype1 === 'ind') {
            _this.numtype1isshow = true;
            _this.numtype1isshow2 = false;
          } else if (this.numtype1 === 'fun' || this.numtype1 === 'life') {
            _this.numtype1isshow2 = true;
            _this.numtype1isshow = false;
          } */
        }
      });
    },
    console () {
      var _this = this;
      this.$ajax({
        method: 'get',
        url: '/api/beauty/getBeautyById?id=' + this.$store.state.brieid
      }).then((res) => {
        if (res.status === 200) {
          this.numdataisshow = true;
          console.log(res.data.data);
          this.ruleForm.cname = res.data.data.demand_side;
          this.ruleForm.name = res.data.data.project_name;
          this.ruleForm.desc = res.data.data.project_description;
          this.ruleForm.num = res.data.data.phone_demand;
          this.ruleForm.value = res.data.data.start_date;
          this.ruleForm.value1 = res.data.data.end_date;
          this.checkboxGroup1 = res.data.data.parts[0].key;
          this.numtype1 = res.data.data.data_type[0].key;
          this.checkboxGroup2 = res.data.data.parts[0].value.split(',');
          if (this.checkboxGroup2.length !== '') {
            for (var i = 0; i < this.checkboxGroup2.length; i++) {
              var obj = {};
              obj.id = 'class2';
              obj.value = this.checkboxGroup2[i];
              if (this.onselect !== this.checkboxGroup2[i]) {
                this.onselect.push(obj);
              }
            };
          }
          if (this.numtype1 === 'note' || this.numtype1 === 'ind') {
            this.checkboxGroup3 = res.data.data.data_type[0].value.split(',');
            for (var s = 0; s < this.checkboxGroup3.length; s++) {
              var objs = {};
              objs.id = 'class3';
              objs.value = this.checkboxGroup3[s];
              if (this.onselect !== this.checkboxGroup3[s]) {
                this.onselect.push(objs);
              }
            };
          }
          _this.numdataisshow = true;
          if (this.numtype1 === 'note' || this.numtype1 === 'ind') {
            _this.numtype1isshow = true;
            _this.numtype1isshow2 = false;
          } else if (this.numtype1 === 'fun' || this.numtype1 === 'life') {
            _this.numtype1isshow2 = true;
            _this.numtype1isshow = false;
          }
        }
      });
    },
    handleCheckAllChange (event) {
      var _this = this;
      this.checkboxGroup2 = event.target.checked ? this.numdatas2 : [];
      this.isIndeterminate = false;
      console.log(this.checkboxGroup2);
      // Array.prototype.push.apply(this.onselect, this.checkboxGroup2);
      if (this.checkboxGroup2.length !== 0) {
        for (var i = 0; i < this.checkboxGroup2.length; i++) {
          var obj = {};
          obj.id = 'class2';
          obj.value = this.checkboxGroup2[i];
          this.onselect.push(obj);
        }
      } else {
        for (var s = 0; s < this.onselect.length; s++) {
          if (this.onselect[s].id === 'class2') {
            // console.log(this.onselect[s].id);
            _this.onselect.splice(s);
          }
        }
      }
      console.log(this.onselect);
    },
    handleCheckAllChange1 (event) {
      var _this = this;
      this.checkboxGroup3 = event.target.checked ? this.numdatas3 : [];
      this.isIndeterminate1 = false;
      console.log(this.checkboxGroup3);
      // Array.prototype.push.apply(this.onselect, this.checkboxGroup2);
      if (this.checkboxGroup3.length !== 0) {
        for (var i = 0; i < this.checkboxGroup3.length; i++) {
          var obj = {};
          obj.id = 'class3';
          obj.value = this.checkboxGroup3[i];
          this.onselect.push(obj);
        }
      } else {
        for (var s = 0; s < this.onselect.length; s++) {
          if (this.onselect[s].id === 'class3') {
            // console.log(this.onselect[s].id);
            _this.onselect.splice(s);
          }
        }
      }
      console.log(this.onselect);
    },
    handleIconClick (ev) {
      this.state1 = '';
    },
    handleSelect (item) {
      this.onselect.push(item);
      this.state1 = '';
    },
    querySearch (queryString, cb) {
      var _this = this;
      var restaurants = _this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.indexOf(queryString.toLowerCase()) === 0);
      };
    },
    loadAll (district, kw, type) {
      var datas = [];
      var _this = this;
      this.$ajax({
        method: 'post',
        url: '/api/beauty/getBeautyPlace',
        data: {
          'district': district,
          'kw': kw,
          'type': type
        }
      }).then(function (res) {
        for (var i = 0; i < res.data.data.length; i++) {
          var obj = {};
          obj.value = res.data.data[i];
          obj.id = 1;
          datas[i] = obj;
        }
        _this.restaurants = datas;
        return _this.restaurants;
      });
    },
    qingkong () {
      for (var s = 0; s < this.onselect.length; s++) {
        if (this.onselect[s] !== 0) {
          this.onselect.splice(s);
          this.checkboxGroup1 = '';
          this.checkboxGroup2 = [''];
        }
      }
    },
    handleCheckedCitiesChange2 (value) {
      console.log(this.numtype1);
      for (var s = 0; s < this.onselect.length; s++) {
        if (this.onselect[s].id === 'cc') {
          this.onselect.splice(s);
        }
      }
      if (this.checkboxGroup1 === '') {
        this.$message({
          showClose: true,
          message: '请先选择部位！',
          type: 'warning'
        });
        // this.numtype1 = '';
      } else {
        this.checkboxGroup3 = [''];
        this.numtype1isshow = true;
        this.numtype1isshow2 = false;
        this.sousuo = false;
        var a = '';
        if (value === 'note') {
          this.numdatas3 = this.$parent.tieba[0];
          a = '社区论坛';
        }
        if (value === 'ind') {
          this.numdatas3 = this.$parent.web[0];
          a = '医美网站';
        }
        if (value === 'kw') {
          this.numtype1isshow = false;
          a = '搜索词';
        }
        if (value === 'fun') {
          this.numtype1isshow = false;
          this.numtype1isshow2 = true;
          this.checkboxGroup4 = [];
          a = '娱乐场所';
          //  this.restaurants = this.loadAll(area, '', a);
        }
        if (value === 'life') {
          this.numtype1isshow = false;
          this.numtype1isshow2 = true;
          this.checkboxGroup4 = [];
          a = '生活场所';
          // this.restaurants = this.loadAll(area, '', a);
        }
        var obj = {};
        obj.value = a;
        obj.id = 'cc';
        if (value !== '') {
          this.onselect.push(obj);
        }
      }
    },
    handleCheckedCitiesChange3 (value) {
      console.log(this.numdatas2);
      console.log(this.checkboxGroup2);
      var obj = {};
      for (var i = 0; i < value.length; i++) {
        obj.value = value[i];
        obj.id = 'class2';
      }
      if (value.length !== 0) {
        this.onselect.push(obj);
      }
    },
    handleCheckedCitiesChange5 (value) {
      this.sousuo = true;
      for (var i = 0; i < value.length; i++) {
        if (value[i] === '') {
          value.splice(i);
        }
      }
      var a = '';
      if (this.numtype1 === 'fun') {
        a = '娱乐场所';
      }
      if (this.numtype1 === 'life') {
        a = '生活场所';
      }
      this.loadAll(this.checkboxGroup4, this.state1, a);
    },
    handleCheckedCitiesChange4 (value) {
      var obj = {};
      for (var i = 0; i < value.length; i++) {
        obj.value = value[i];
        obj.id = 'class3';
      }
      if (value.length !== 0) {
        this.onselect.push(obj);
      }
    },
    handleCheckedCitiesChange (value) {
      this.numdataisshow = true;
      for (var s = 0; s < this.onselect.length; s++) {
        if (this.onselect[s] !== 0) {
          this.onselect.splice(s);
        }
      }
      this.checkboxGroup2 = [''];
      if (value === '面目轮廓') {
        this.numdatas2 = this.$parent.numdatas2[0];
      } else if (value === '胸部整形') {
        this.numdatas2 = this.$parent.numdatas2[1];
      } else if (value === '鼻部整形') {
        this.numdatas2 = this.$parent.numdatas2[4];
      } else if (value === '长久脱毛') {
        this.numdatas2 = this.$parent.numdatas2[8];
      } else if (value === '私密整形') {
        this.numdatas2 = this.$parent.numdatas2[11];
      } else if (value === '眼部整形') {
        this.numdatas2 = this.$parent.numdatas2[7];
      } else if (value === '皮肤美容') {
        this.numdatas2 = this.$parent.numdatas2[3];
      } else if (value === '瘦身纤体') {
        this.numdatas2 = this.$parent.numdatas2[6];
      } else if (value === '毛发种植') {
        this.numdatas2 = this.$parent.numdatas2[5];
      } else if (value === '口腔美容') {
        this.numdatas2 = this.$parent.numdatas2[10];
      } else if (value === '医美综合') {
        this.numdatas2 = this.$parent.numdatas2[9];
      } else if (value === '医美产品') {
        this.numdatas2 = this.$parent.numdatas2[2];
      }
      var obj = {};
      obj.value = value;
      obj.id = value;
      if (value.length !== 0) {
        this.onselect.push(obj);
      }
    },
    handleClose3 (tag) {
      // this.checkboxGroup1 = '';
      this.onselect.splice(this.onselect.indexOf(tag), 1);
      // this.checkboxGroup2.splice(this.checkboxGroup2.indexOf(tag.id), 1);
      if (tag.id === 'cc') {
        for (var m = 0; m < this.onselect.length; m++) {
          this.numtype1 = '';
          if (this.onselect[m].id === 'class3') {
            this.onselect.splice(m);
            this.numtype1 = '';
            this.checkboxGroup3 = [];
          }
        }
      }
      if (tag.id === this.checkboxGroup1) {
        this.checkboxGroup1 = '';
        for (var s = 0; s < this.onselect.length; s++) {
          if (this.onselect[s].id === 'class2') {
            this.onselect.splice(s);
            this.checkboxGroup1 = '';
            this.checkboxGroup2 = '';
          }
        }
      }
      for (var q = 0; q < this.onselect.length; q++) {
        if (this.onselect[q].value === 'class2') {
          this.onselect.splice(q);
          this.checkboxGroup2 = '';
        }
      }
      for (var a = 0; a < this.checkboxGroup2.length; a++) {
        if (this.checkboxGroup2[a] === tag.value) {
          this.checkboxGroup2.splice(a, 1);
          break;
        }
      }
      for (var b = 0; b < this.checkboxGroup3.length; b++) {
        if (this.checkboxGroup3[b] === tag.value) {
          this.checkboxGroup3.splice(b, 1);
          break;
        }
      }
    },
    quxiao () {
      this.$emit('childrenEventIsShow2');
    },
    before () {
      this.show2 = true;
      this.showxiang = false;
      if (this.active-- < 0) this.active = 2;
    },
    onselect () {
      if (this.numtype1isshow === true) {
        this.numtype1isshow = false;
      }
    },
    submitForm2 () {
      var funcs = [];
      for (var i = 0; i < this.onselect.length; i++) {
        if (this.onselect[i].id === 1) {
          funcs.push(this.onselect[i].value);
        }
      }
      for (var s = 0; s < this.checkboxGroup2.length; s++) {
        var datatype = [];
        if (this.checkboxGroup2[s] === '') {
          this.checkboxGroup2.splice(s, 1);
        }
        datatype = this.checkboxGroup2;
      }
      for (var n = 0; n < this.checkboxGroup3.length; n++) {
        var parts = [];
        if (this.checkboxGroup3[n] === '') {
          this.checkboxGroup3.splice(n, 1);
        }
        parts = this.checkboxGroup3;
      }
      var a = {};
      var b = {};
      b[this.checkboxGroup1] = datatype;
      if (this.numtype1 === 'fun' || this.numtype1 === 'life') {
        a[this.numtype1] = funcs;
      }
      if (this.numtype1 === 'ind' || this.numtype1 === 'note' || this.numtype1 === 'kw') {
        a[this.numtype1] = parts;
      }
      var brieid = this.$store.state.brieid;
      console.log(brieid);
      console.log(this.id);
      var beauty = {
        'briefid': brieid,
        'project_name': this.$store.state.yimei.cname,
        'id': '',
        'datatype': a,
        'parts': b
      };
      var fun = {
        'data': this.ruleForm.note,
        'file_name': this.ruleForm.zTitle1
      };
      var sa = {
        'data': [],
        'file_name': ''
      };
      var data = {
        'beauty': beauty,
        'fun': sa,
        'ind': sa,
        'kw': sa,
        'life': sa,
        'note': fun
      };
      var _this = this;
      this.$ajax({
        method: 'post',
        url: '/api/beauty/updateBeautyCampaign',
        data: data
      }).then((res) => {
        if (res.status === 200) {
          _this.$emit('childrenEventIsShow');
        }
      });
    },
    submitForm () {
      // this.loading = true;
      /* console.log(this.checkboxGroup1);
      console.log(this.checkboxGroup2);
      console.log(this.checkboxGroup3);
      console.log(this.numtype1); */
      var funcs = [];
      for (var i = 0; i < this.onselect.length; i++) {
        if (this.onselect[i].id === 1) {
          funcs.push(this.onselect[i].value);
        }
      }
      for (var s = 0; s < this.checkboxGroup2.length; s++) {
        var datatype = [];
        if (this.checkboxGroup2[s] === '') {
          this.checkboxGroup2.splice(s, 1);
        }
        datatype = this.checkboxGroup2;
      }
      for (var n = 0; n < this.checkboxGroup3.length; n++) {
        var parts = [];
        if (this.checkboxGroup3[n] === '') {
          this.checkboxGroup3.splice(n, 1);
        }
        parts = this.checkboxGroup3;
      }
      var a = {};
      var b = {};
      b[this.checkboxGroup1] = datatype;
      if (this.numtype1 === 'fun' || this.numtype1 === 'life') {
        a[this.numtype1] = funcs;
      }
      if (this.numtype1 === 'ind' || this.numtype1 === 'note' || this.numtype1 === 'kw') {
        a[this.numtype1] = parts;
      }
      // var a = {ss: parts};
      var data = {
        'datatype': a,
        'parts': b
      };
      this.$ajax({
        method: 'post',
        url: '/api/beauty/getBeautyData',
        data: data
      }).then((res) => {
        if (res.status === 200) {
          this.showxiang = true;
          this.show2 = false;
          if (this.numtype1 === 'note') {
            this.ruleForm.numname = '论坛社区';
            this.ruleForm.note = res.data.data.note.data;
          }
          if (this.numtype1 === 'kw') {
            this.ruleForm.numname = '搜索词';
            this.ruleForm.note = res.data.data.kw.data;
          }
          if (this.numtype1 === 'ind') {
            this.ruleForm.numname = '医美网站';
            this.ruleForm.note = res.data.data.ind.data;
          }
          if (this.numtype1 === 'fun') {
            this.ruleForm.numname = '娱乐场所';
            this.ruleForm.note = res.data.data.fun.data;
          }
          if (this.numtype1 === 'life') {
            this.ruleForm.numname = '生活场所';
            this.ruleForm.note = res.data.data.life.data;
          }
        }
      });
    }
  },
  mounted () {
    this.$on('a-msg', function (a) {
      this.briefid = a;
    });
  },
  props: ['showxiangqing', 'linsten']
};
</script>

<style lang="css" scoped>
.formcontain{
  width:100%;
  margin: 0 auto;
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
ul {
  margin:20px;
  min-height: 30px;
  background: hsla(206, 100%, 56%, 0.07);
  margin: 10px 122px;
  border-top: 1px solid #20a0ff;
  padding: 20px;
}
ul li{
  margin-bottom: 10px;/*
  width: 100% !important;*/
  text-align: left;
}
ul li span:nth-child(1){
  margin-right: 8px;
}
.form2{
  padding: 0 150px
}
.form1{
      /*width: 500px;*/
    margin: 0 auto;
   margin-left: 94px;
}

.el-checkbox-button__inner{
  border:0px;
}

ul li span:nth-child(1){
  margin-right: 8px;
}
.lines{
  margin-bottom: 40px;
}
.c1{
  border: 1px solid #ccc;
  text-align: left;
  margin-left: 100px;
  display: flex;
}
.c2{
  border: 1px solid #ccc;
  text-align: left;
  margin-left: 100px;
}
.onselect{
  text-align: left;
}
.el-form-item__content{
  margin-left: 0px !important
}
</style>
