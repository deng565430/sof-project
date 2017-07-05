<template>
 <div>
    <!-- 需求方信息 -->
    <!-- <el-collapse >
      <el-collapse-item title="需求方信息" >
        <ul >
          <li style="width:15%"><span>需求单号:</span><span></span></li>
          <li style="width:15%"><span>下单日期:</span><span></span></li>
          <li style="width:15%"><span>制单人:</span><span></span></li>
          <li style="width:15%"><span>所属行业:</span><span></span></li>
          <li style="width:15%"><span>需求单类型:</span><span></span></li>
          <li style="width:40%"><span>需求公司:</span><span></span></li>
          <li style="width:40%"><span>项目名称:</span><span></span></li>
          <li style="width:40%"><span>所需电话量/天:</span><span></span></li>
          <li style="width:40%"><span>所需周期:</span><span></span></li>
          <li style="width:40%"><span>项目描述:</span><span></span></li>
        </ul>
      </el-collapse-item>
    </el-collapse> -->
    <!-- 策略分类 -->
    <!-- <el-radio-group v-model="radio3">
      <el-radio-button  label="策略1"></el-radio-button>
      <el-radio-button  label="策略2"></el-radio-button>
      <el-radio-button  label="策略3"></el-radio-button>
    </el-radio-group> -->

    <!-- 筛选条件 -->
    <div>
      <!-- <div style="margin-top:40px;text-align:left" v-if="classes.class1s">
        <el-checkbox-group v-model="classes.class1.class1" size="small" fill="#f7ba2a" text-color="#fff" @change="class1change">
          <el-checkbox-button  v-for="i in classes.class1s" :label="i" >{{i.name}}</el-checkbox-button>
        </el-checkbox-group>
       </div> -->
     <!--  <div style="margin-top:40px;text-align:left" v-if="classes.class1s">
        <el-checkbox-group v-model="classes.class1.class1" size="small" fill="#f7ba2a" text-color="#fff" @change="class1change">
          <el-checkbox-button  v-for="i in classes.class1s" :label="i" >{{i.name}}</el-checkbox-button>
        </el-checkbox-group>
       </div>
      <div style="margin-top:10px;text-align:left" v-if="classes.class2s">
        <el-checkbox-group v-model="classes.class2" size="small" fill="#f7ba2a" text-color="#fff"  @change="class2change">
          <el-checkbox-button v-for="i in classes.class2s" :label="i" >{{i.name}}</el-checkbox-button>
        </el-checkbox-group>
      </div>
      <div style="margin-top:10px;text-align:left" v-if="classes.class3s">
        <el-checkbox-group v-model="classes.class3" size="small" fill="#f7ba2a" text-color="#fff" @change="class3change">
          <el-checkbox-button v-for="i in classes.class3s" :label="i" >{{i.name}}</el-checkbox-button>
        </el-checkbox-group>
      </div> -->
    </div>
    <!-- el-tabs type="border-card" v-if="classes.class1s">
      <el-tab-pane v-for="i in classes.class1s" :label="i.name">
        <el-tabs   >
          <el-tab-pane v-for="i in classes.class2s" :label="i.name"></el-tab-pane>
        </el-tabs>
      </el-tab-pane>
    </el-tabs> -->


    <!-- 方法二 -->
    <el-tree
      style="text-align:left"
      show-checkbox
      :data="regions"
      :props="props"
      :load="loadNode"
      @node-click="handleNodeClick"
      @check-change="handleCheckChange"
      lazy
      accordion
      > 
    </el-tree>
    <div  style="border:1px solid #ccc;text-align:left;padding:10px"><span v-for="i in textData" style=" margin-right:10px">{{i.name}}</span></div>
    <!-- 方法三 -->
    <!-- <el-tabs  @tab-click="handleClick">
      <el-tab-pane v-for="i in classes.class1s" :label="i.name" :name="i.code">
          <el-tabs  @tab-click="handleClick2" >
            <el-tab-pane v-for="s in classes.class2s" :label="s.name" :name="s.code">
              <el-tabs  > 
                <el-checkbox-group v-model="checkboxGroup1">
                  <el-checkbox-button v-for="(n, i) in classes.class3s" :label="n.name" :key="i" />
                </el-checkbox-group>
              </el-tabs>
            </el-tab-pane>
          </el-tabs>
      </el-tab-pane>
    </el-tabs> -->

    <!-- 方法四 -->
    <!-- <div style="margin-top:20px;text-align:left;display:flex">
      <div v-for="(i,index) in classes.class1s" style="margin-right:10px;">
        <label :class="{'active':flag === index}" @mouseenter="enter(index)" @mouseleave="leave(index)" :code="i.code" @click="zhanshi(i, index)" >{{i.name}}</label>
        <input @change="c1change(i, index)"  type="checkbox" value="" />
      </div>
    </div> -->
    <!-- <div style="margin-top:20px;text-align:left;display:flex" >
      <div v-for="(i,index) in classes.class2s" style="margin-right:10px;">
        <label :class="{'active2':flag2 === index}" @mouseenter="enter2(index)" @mouseleave="leave2(index)" :code="i.code" @click="zhanshi2(i, index)" >{{i.name}}</label>
        <input  type="checkbox" value="" />
      </div>
    </div> -->
    <!-- <div style="margin-top:20px;text-align:left;display:flex" v-if="class3Ishow">
      <div v-for="(i,index) in classes.class3s" style="margin-right:10px;">
        <label :class="{'active3':flag3 === index}" @mouseenter="enter3(index)" @mouseleave="leave3(index)" :code="i.code" @click="zhanshi3(i, index)" >{{i.name}}</label>
        <input  type="checkbox" value="" />
      </div>
    </div> -->
    <!-- <div style="margin-top:20px;text-align:left;display:flex"  >
        <el-checkbox-group v-for="(i, index) in classes.class1s" v-model="classes.class1.class1" size="small" fill="#f7ba2a" text-color="#fff" @change="class1change(i, index)">
          <label :class="{'active':flag === index}" @mouseenter="enter(index)" @mouseleave="leave(index)" :code="i.code" @click="zhanshi(i, index)" >{{i.name}}</label>
          <el-checkbox  :label="i" >{{i.name}}
          </el-checkbox>
        </el-checkbox-group>
     </div>


     <div style="margin-top:20px;text-align:left;display:flex"   v-if="c2isShow">
          <el-checkbox-group v-for="(i, index) in classes.class2s" v-model="classes.class2" size="small" fill="#f7ba2a" text-color="#fff" >
             <label :class="{'active2':flag2 === index}" @mouseenter="enter2(index)" @mouseleave="leave2(index)" :code="i.code" @click="zhanshi2(i, index)" >{{i.name}}</label>
            <el-checkbox  :label="i" :parent="parentLabel1" :parent-code="parentCode1" ref="c2" @change="class2change(i, index)">{{i.name}}
            </el-checkbox>
          </el-checkbox-group>
     </div>


     <div style="margin-top:20px;text-align:left;display:flex"  v-if="c3isShow">
          <el-checkbox-group v-for="(i, index) in classes.class3s" v-model="classes.class3" size="small" fill="#f7ba2a" text-color="#fff" @change="class3change(i, index)">
            
            <label :class="{'active3':flag3 === index}" @mouseenter="enter3(index)" @mouseleave="leave3(index)" :code="i.code" @click="zhanshi3(i, index)" >{{i.name}}</label>
            <el-checkbox  :parent="parentLabel2" :parent-code="parentCode2" :label="i" >{{i.name}}
            </el-checkbox>
            
          </el-checkbox-group>
     </div> -->

     <!-- 方法五 -->
     <!-- <div style="margin-top:20px">
         <div style="display:flex;">
            <div v-for="(i, indexs) in classes.class1s" style="margin-right:10px">
                <label :class="{'active':flag === indexs}" :code="i.code" :name="i.name" @click="zhanshi(i, indexs)" >{{i.name}}</label>
                <input ref='c1'  :code="i.code" :name="i.name" type="checkbox" @change="onechange(i,indexs)"/>
            </div>
         </div>
         <div style="display:flex;margin-top:10px" >
             <div v-for="(i, index) in classes.class2s" style="margin-right:10px">
                  <label :code="i.code" :name="i.name">{{i.name}}</label>
                  <input :code="i.code" :name="i.name" type="checkbox" @change="twochange(i,index)"/>
              </div>
          </div>
     </div> -->



    <!-- 筛选条件展示 -->
    <!-- <div style="text-align:left" ref="tags">
      <div class="tagstyle" v-for="(tag, i) in allTags" v-if="allTags.length !== 0">
        <div style="width:80%">
            <el-tag
              v-for="item in tag"
              :key="item.name"
              :code="item.code"
              type="primary"
              style="margin-right:5px;"
            >{{item.name}}
          </el-tag>
        </div>
        <div style="width:20%;text-align:right">
           <el-button size="small" type="success" @click="surebtn(i)">确定</el-button>
           <el-button size="small" type="warning" @click="xiugai(i)">修改</el-button>
           <el-button size="small" type="danger" @click="shanchubtn(i)">删除</el-button>
        </div>
      </div>

      <el-button type="primary" size="small" style="margin-top:10px" @click="addnewtag">添加新组</el-button>
    </div> -->
    <div style="text-align:left" ref="tags" > 
      <div class="tagstyle" v-for="(tag, i) in allTags" v-if="allTags.length !== 0" ref="tagnum">
        <div style="width:80%;">
            <ul  >
              <li  v-for="item in tag">
                <span v-if="parentLabel1 !== ''" :code="parentCode1" >{{parentLabel1}}/</span>
                <span v-if="parentLabel2 !== ''&& parentLabel1 !== parentLabel2" :code="parentCode2" >{{parentLabel2}}/</span>
                <span v-if="parentLabel1 !== parentLabel3 " :code="item.code" :name="item.name" >{{parentLabel3}}</span>
              </li>
            </ul>
        </div>
        <!-- <div style="width:80%">
            <el-tag
              v-for="item in tag"
              :key="item.name"
              :code="item.code"
              type="primary"
              style="margin-right:5px;"
            >{{item.name}}
          </el-tag>
        </div> -->
        {{i}}
        <div style="width:20%;text-align:right">
           <el-button size="small" type="success" @click="surebtn(i)">确定</el-button>
           <el-button size="small" type="warning" @click="xiugai(i)">修改</el-button>
           <el-button size="small" type="danger" @click="shanchubtn(i)">删除</el-button>
        </div>
      </div>

      <el-button type="primary" size="small" style="margin-top:10px" @click="addnewtag">添加新组</el-button>
    </div>

   <div class="text"></div>
 </div>
</template>

<script >
// import axios from 'axios';
export default {
  data () {
    return {
      flag: '',
      flag2: '',
      flag3: '',
      data2: '',
      radio3: '',
      zhanshi_1: {},
      class3Ishow: false,
      c3isShow: false,
      c2isShow: false,
      checkboxGroup1: '',
      parentLabel1: '',
      parentCode1: '',
      parentLabel2: '',
      parentCode2: '',
      parentLabel3: '',
      parentCode3: '',
      classes: {
        'class1s': [],
        'class1': {
          'class1': []
        },
        'class2s': [],
        'class2': [],
        'class3s': [],
        'class3': []
      },
      regions: [],
      props: {
        label: 'name',
        children: 'zones'
      },
      // class1s: [],
      // class1: [],
      // class2s: [],
      // class2: [],
      // class3s: [],
      // class3: [],
      allTags: [], // [this.tags]
      duo: '',
      num: 0,
      textData: []
    };
  },
  created () {
    this.console();
    this.allTags[this.num] = [];
  },
  methods: {
    console () {
      this.$api.get('/api/campaign/getCampaignOption?page=0&ind_code=i02&code=').then((res) => {
        // console.log(res);
        this.classes.class1s = true;
        this.classes.class1s = res.data.data;
        this.regions = res.data.data;
      });
    },
    zhanshi (i, indexs) {
      // console.log(i, index);
      this.zhanshi_1 = i;
      this.flag = indexs;
      console.log(this.flag);
      this.parentLabel1 = i.name;
      this.parentCode1 = i.code;
      this.c2isShow = true;
      this.c3isShow = false;
      this.$api.get('/api/campaign/getCampaignOption?page=1&ind_code=i02&code=' + i.code).then((res) => {
        // console.log(res);
        this.classes.class2s = res.data.data;
      });
    },
    enter (index) {
      // console.log(index);
      // console.log(this);
      this.flag = index;
    },
    leave (index) {
      // console.log(index);
      // this.flag = '';
    },
    zhanshi2 (i, index) {
      console.log(i, index);
      this.flag2 = index;
      this.parentLabel2 = i.name;
      this.parentCode2 = i.code;
      this.$api.get('/api/campaign/getCampaignOption?page=2&ind_code=i02&code=' + i.code).then((res) => {
        // console.log(res);
        if (res.data.data[0].length === 0) {
          this.c3isShow = false;
        } else {
          this.classes.class3s = res.data.data;
          this.c3isShow = true;
        }
      });
    },
    enter2 (index) {
      // console.log(index);
      // console.log(this);
      this.flag2 = index;
    },
    leave2 (index) {
      // console.log(index);
      this.flag2 = '';
    },
    zhanshi3 (i, index) {
      this.flag3 = index;
      console.log(i, index);
    },
    enter3 (index) {
      // console.log(index);
      // console.log(this);
      this.flag3 = index;
    },
    leave3 (index) {
      // console.log(index);
      this.flag3 = '';
    },
    c1change (i, index) {
      console.log(i, index);
      var data = [];
      data.push(i);
      this.allTags[this.num] = data;
      // this.allTags[this.num].push(i);
    },
    handleClick (tab, event) {
      console.log(tab);
      if (tab.name !== null) {
        this.$api.get('/api/campaign/getCampaignOption?page=1&ind_code=i02&code=' + tab.name).then((res) => {
          // console.log(res.data.data);
          if (res.data.data[0] !== null) {
            this.classes.class2s = res.data.data;
          } else {
            this.classes.class2s = [];
          }
        });
      } else {
        return;
      }
    },
    handleClick2 (tab, event) {
      console.log(tab);
      if (tab.name !== null) {
        this.$api.get('/api/campaign/getCampaignOption?page=2&ind_code=i02&code=' + tab.name).then((res) => {
          console.log(res.data.data);
          if (res.data.data[0] !== null) {
            this.classes.class3s = res.data.data;
          } else {
            this.classes.class3s = [];
          }
        });
      } else {
        return;
      }
    },
    onechange (i, indexs) {
      console.log(i);
    },
    twochange (i, index) {
      console.log(this.$refs);
    },
    loadNode (node, resolve) {
      // console.log(node.data.code);
      if (node.level === 0) {
        return resolve(this.regions);
      }
      var hasChild, hasChild2;
      if (node.level === 1) {
        setTimeout(() => {
          var data;
          this.$api.get('/api/campaign/getCampaignOption?page=1&ind_code=i01&code=' + node.data.code).then((res) => {
            hasChild = res.data.data;
            if (hasChild.length > 0) {
              data = hasChild;
            } else {
              data = [];
            }
            resolve(data);
          });
        }, 300);
        hasChild = true;
      };
      if (node.level === 2) {
        setTimeout(() => {
          var data;
          this.$api.get('/api/campaign/getCampaignOption?page=2&ind_code=i01&code=' + node.data.code).then((res) => {
            hasChild2 = res.data.data;
            if (hasChild2.length > 0) {
              data = hasChild2;
            } else {
              data = [];
            }
            resolve(data);
          });
        }, 300);
        hasChild2 = true;
      };
      if (node.level === 3) {
        setTimeout(() => {
          var data;
          data = [];
          resolve(data);
        }, 300);
      };
    },
    handleNodeClick (data) {
      // console.log(data);
    },
    handleCheckChange (data, checked, indeterminate) {
      if (checked === true) {
        this.textData.push(data);
      } else if (checked === false) {
        console.log(this.textData);
        // this.textData.splice(data[false]);
      }
    },
    /* class1change (val) {
      // 获取选择的class1 的 code 和 name
      console.log(val);
      this.allTags[this.num] = val;
      for (var i = 0; i < val.length; i++) {
        this.$api.get('/api/campaign/getCampaignOption?page=1&ind_code=i01&code=' + val[i].code).then((res) => {
          this.classes.class2s = res.data.data;
        });
      }
    },
    class2change (val) {
      // console.log(val);
      this.allTags[this.num] = val;
      for (var i = 0; i < val.length; i++) {
        this.$api.get('/api/campaign/getCampaignOption?page=2&ind_code=i01&code=' + val[i].code).then((res) => {
          this.classes.class3s = res.data.data;
        });
      }
    },
    class3change (val) {
      this.allTags[this.num] = val;
    }, */
    class1change (i, index) {
      // 获取选择的class1 的 code 和 name
      console.log(i, index);
      this.addtagss(i);
      this.$api.get('/api/campaign/getCampaignOption?page=1&ind_code=i02&code=' + i.code).then((res) => {
        this.classes.class2s = res.data.data;
      });
    },
    class2change (i, index) {
      // console.log(val);
      console.log(this);
      this.addtagss(i);
      this.$api.get('/api/campaign/getCampaignOption?page=2&ind_code=i02&code=' + i.code).then((res) => {
        this.classes.class3s = res.data.data;
      });
    },
    addtagss (val) {
      this.allTags[this.num].push(val);
    },
    class3change (i, index) {
      this.parentLabel3 = i.name;
      this.addtagss(i);
    },
    // 获取选择的class1 的 code 和 name
    addtag (classs, val) {
      console.log(classs, val);
      const data = [];
      for (var i in classs) {
        if (classs[i].code === val) {
          // console.log(this.classes.class1s[i]);
          var obj = {};
          obj.name = classs[i].name;
          obj.code = classs[i].code;
          data.push(obj);
          this.allTags[this.num] = data;
          // console.log(this.allTags[this.num]);
          // console.log(this.allTags);
          // console.log(this.tags.length);
          /* if (this.allTags[this.num].length > 0) { // this.allTags[this.num].length
            for (var s in this.allTags[this.num]) {
              // console.log(obj.code === this.tags[s].code);
              // console.log(this.tags[s].code);
              if (obj.code === this.allTags[this.num][s].code) {
                this.duo = '';
              } else {
                this.allTags[this.num].push(obj);
              }
            }
          } else {
            this.allTags[this.num].push(obj);
          } */
        }
      }
    },
    // 确定
    surebtn (i) {
      console.log(i);
      this.classes.class1 = '';
      this.classes.class2 = '';
      this.classes.class3 = '';
      this.classes.class1s = false;
      this.classes.class2s = false;
      this.classes.class3s = false;
    },
    // 修改
    xiugai (i) {
      console.log(i);
      console.log(this.allTags[i]);
      console.log(this.classes);
    },
    // 删除
    shanchubtn (i) {
      console.log(i);
      // console.log(this.allTags);
      this.allTags.splice(i, 1);
      // console.log(this.allTags[i].length);
      // this.allTags[i].false;
      // this.tags1 = false;
    },
    // 添加新组
    addnewtag () {
      this.num ++;
      this.allTags.push(this.tags);
      this.console();
    }
  }
};
</script>

<style >
.text{
  height: 20px;
  width: 20px;
  /* background: url('./../../assets/fonts/xinzeng.svg'); */
  background-size: 20px 20px;
}
.tagstyle{
  padding:10px;
  border: 1px solid #ccc;
  margin-top: 10px;
  display: flex
}
.active, .active2, .active3{
  color: #FF4949;
  cursor: pointer;
}
.noactive{
  color: #333;
}
.el-checkbox__label{
  display: none;
}
.el-checkbox{
  margin-right: 0px;
}
.el-checkbox-group{
  margin-right: 10px;
}
</style>
