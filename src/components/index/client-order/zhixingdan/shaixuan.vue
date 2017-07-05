<template>  
  <div>
     <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane v-for="i in tabTitle" :label="i.name" :name="i.code">
       
      </el-tab-pane>
      </el-tabs>

      <div style="text-align:left">
            <div >
              
              <div class="selects" v-for="(i, indexs) in secthree" style="margin-top:10px">

                <!-- class2 -->
                <div class="selects-class2" ref="selectClass2">
                  <div :code="i.class2.code">{{i.class2.name}}</div>
                  <!-- class3不限 全部 -->
                  <div>
                    <!-- class3 不限lable -->
                    <label 
                    :data-name="i.class2.name" 
                    :data-code="i.class2.code">不限</label>
                    <!-- class3 不限选框 -->
                    <input 
                    :code="i.class2.code" 
                    :name="i.class2.name" 
                    :data-name="i.class2.name" 
                    :data-code="i.class2.code"  
                    type="checkbox"/>
                  </div>
                  <!-- class3 其他 -->
                    <div v-for="(s,index) in i.class3" :code="s.code">
                      <!-- class3 lable -->
                      <span v-if="s.count">{{s.count}}</span>
                      <label 
                      :data-name="i.class2.name" 
                      :data-code="i.class2.code" 
                      :code="s.code"
                      @click="iszhanshi(s, i.class2, index, indexs)">{{s.name}}</label>
                      <!-- class3 选框 -->
                      <input 
                      :code="s.code" 
                      :name="s.name" 
                      :data-name="i.class2.name" 
                      :data-code="i.class2.code" 
                      type="checkbox" 
                      :checked="s.isNo"
                      @click="ischecked(s, i.class2, index, indexs)"/>
                      <!-- class4 -->
                      <div :code="s.code" class="selects-class4" v-show="s.class4isshow" ref="selectsClass4">
                        <div v-for="x in s.ars">
                          <!-- class4 lable -->
                          <label 
                          :code="x.code">{{x.name}}</label>
                          <!-- class4 选框 -->
                          <input 
                          :code="x.code" 
                          :name="x.name"
                          :data-namet="s.name" 
                          :data-codet="s.code"
                          :data-name="i.class2.name" 
                          :data-code="i.class2.code" 
                          type="checkbox" 
                          :checked="x.isNos"
                          @click="c4ischecked(i.class2, s, x)"/>
                        </div>  
                      </div>

                  </div>

              </div>
                

              </div>
            </div>
            
          </div>
       <div style="display:flex;border:1px solid #ccc; padding:10px;margin-top:15px"><div v-for="s in tag" style="margin-right:10px">{{s}}</div></div>
      <div style="display:flex;border:1px solid #ccc; padding:10px;margin-top:15px" v-for="(tag, i) in allTags"><div v-for="s in tag" style="margin-right:10px">{{s}}</div></div>
      <el-button type="primary" size="small" style="margin-top:10px" @click="addnewtag">添加新组</el-button>
    </div>
  </div>
</template>
<script >
import axios from 'axios';
// import { mapActions, mapGetters } from 'vuex';
export default {
  data () {
    return {
      activeName: '1',
      tabTitle: [],
      secthree: {},
      secthreekey: [],
      secthrees: [],
      class4: [],
      tag: [],
      checkedtrue: [],
      num: 0,
      allTags: [],
      chek: [],
      maxArr: []
    };
  },
  created () {
    this.getTab();
    axios.get('./static/a.json').then((res) => {
      // console.log(res.data.data);
      this.secthree = res.data.data;
    });
  },
  methods: {
    c4ischecked (val, val1, val2) {
      this.maxArr.push({name: this.tag});
      console.log(this.maxArr);
      val2.isNos = !val2.isNos;
      if (val2.isNos) {
        this.chek.push(val2);
        val1.count++;
        // sessionStorage.setitem['c4'] = val2.isNos;
        for (var s = 0; s < this.tag.length; s++) {
          console.log(this.tag[s].split('/'));
          if (this.tag[s].split('/')[1] === val1.name) {
            if (this.tag[s].split('/').length < 3) {
              val1.isNo = false;
              this.tag.splice(s, 1);
            }
          }
        }
        this.tag.push(val.name + '/' + val1.name + '/' + val2.name);
      } else {
        val1.count--;
        for (var n = 0; n < this.chek.length; n++) {
          if (this.chek[n].name === val2.name) {
            this.chek.splice(n, 1);
          }
        }
        for (var i = 0; i < this.tag.length; i++) {
          console.log(this.tag[i].split('/'));
          if (this.tag[i].split('/')[2] === val2.name) {
            this.tag.splice(i, 1);
          }
        }
      }
    },
    c4allcheck (val, val1) {
      // console.log(val, val1);
      val1.isNoall = !val1.isNoall;
      if (val1.isNoall) {
        this.tag.push(val.name + '/' + val1.name);
      } else {
        for (var i = 0; i < this.tag.length; i++) {
          if (this.tag[i].split('/')[1] === val.name) {
            this.tag.splice(i, 1);
          }
        }
      }
    },
    iszhanshi (index, val, val1, indexs) {
      console.log(index.class6);
      index.class4isshow = !index.class4isshow;
      // console.log(index, val, val1, indexs);
      // console.log(this.$refs.selectsClass4);
      for (var i = 0; i < this.$refs.selectsClass4.length; i++) {
        var nodevalue = this.$refs.selectsClass4[i].attributes[0].nodeValue;
        this.$refs.selectsClass4[i].style.display = 'none';
        if (nodevalue === index.code) {
          // console.log(this.$refs.selectsClass4[i]);
          this.$refs.selectsClass4[i].style.display = 'flex';
        }
      }
      axios.get('./static/b.json').then((res) => {
        // console.log(res.data.data);
        this.class4 = res.data.data;
        this.$nextTick(function () {
          for (var d = 0; d < this.secthree.length; d++) {
            console.log(this.secthree[d]);
            for (var h = 0; h < this.secthree[d].class3.length; h++) {
              console.log(this.secthree[d].class3[h]);
              this.secthree[d].class3[h].ars = this.class4;
              console.log(this.secthree[d].class3[h].ars);
            }
          }
        });
        console.log(this.secthree);
        if (this.chek.length > 0) {
          for (var i = 0; i < this.chek.length; i++) {
            for (var j = 0; j < this.class4.length; j++) {
              if (this.chek[i].name === this.class4[j].name) {
                this.class4[j].isNos = true;
              }
            }
          }
        }
      });
      // console.log(this.$refs.selectClass2[indexs]);
    },
    ischecked (val, val1, index, indexs) {
      // console.log(val, val1);
      val.isNo = !val.isNo;
      if (val.isNo) {
        this.tag.push(val1.name + '/' + val.name);
      } else {
        for (var i = 0; i < this.tag.length; i++) {
          if (this.tag[i].split('/')[1] === val.name) {
            this.tag.splice(i, 1);
          }
        }
      }
    },
    getTab () {
      this.$api.get('/api/campaign/getCampaignOption?page=0&ind_code=i01&code=').then((res) => {
        this.tabTitle = res.data.data;
        this.activeName = res.data.data[0].code;
      });
    },
    handleClick (tab, event) {},
    // 添加新组
    addnewtag () {
      this.num ++;
      this.allTags.push(this.tags);
    }
  }
};
</script>
<style >
.selects div{
  margin-right: 10px;
}
.selects-class4, .selects-class2{
  display: flex;
  margin-top: 10px
}
.selects-class4{
  padding:10px;
  border: 1px solid #ccc;
}
</style>
