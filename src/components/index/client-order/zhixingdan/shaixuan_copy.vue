 <template>
<div>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane v-for="(val, index) in tabTitle" :label="val.name" :name="val.code" style="text-align: left;">
        <el-checkbox v-model="startSelect" @change="change" :label="val.code" :name="val.name">{{val.name}}</el-checkbox>
        <div v-show="secondIsShow">
          <CheckBox :data="secondData" :checkedData="checkedData" @selectData="secondChange"/>
          <div v-show="thirdIsShow">
            <CheckBox :data="thirdData" :checkedData="checkedData" @selectData="thirdChange"/>
            <div v-show="fourthIsShow">
              <CheckBox :data="fourthData" :checkedData="checkedData" @selectData="fourthChange"/>
            </div>
          </div>
        </div>
        <div>
        {{showDatas}}
        </div>
    </el-tab-pane>
    <el-button type="primary" @click="selectDataList">确定选择</el-button>
  </el-tabs>
  <div>
   <div v-if="showDataListFlag">
     <show-data-list :alldata="allData" />
     {{allData}}
   </div>
   <div>
     <el-button type="primary" @click="submit">提交</el-button>
   </div>
  </div>
</div>
</template>

<script>
import CheckBox from './checkBox';
import ShowDataList from './showDataList';
export default {

  name: 'shaixuan',
  components: {
    CheckBox,
    ShowDataList
  },
  data () {
    return {
      activeName: '1',
      tabTitle: [],
      checkedData: [],
      startName: '',
      secondData: {},
      secondIsShow: false,
      secondName: '',
      thirdData: {},
      thirdName: '',
      fourthData: [],
      startSelect: [],
      secondSelect: [],
      thirdSelect: [],
      thirdIsShow: false,
      fourthSelect: [],
      fourthIsShow: false,
      secondLastValue: [],
      thirdLastValue: [],
      secondCheckedArr: [],
      thirdCheckedArr: [],
      checkedDataList: {},
      storeArr: [],
      allData: {},
      showDataListFlag: false,
      showDatas: ''
    };
  },
  created () {
    this.getTab();
  },
  methods: {
    getTab () {
      this.$api.get('/api/campaign/getCampaignOption?page=0&prov=zj&city=hz&ind_code=i01&code=').then((res) => {
        const data = res.data.data;
        this.tabTitle = data;
        this.activeName = data[0].code;
      });
    },
    selectDataList () {
      this.showDataListFlag = true;
    },
    submit () {
      this.$api.post('/api/campaign/getCampaignToView', this.allData)
      .then(res => {
        console.log(res);
      });
    },
    handleClick (tab, event) {
      this.showDatas = '暂无';
      // 判断tab是不是选中状态 是选中获取数据
      if (this.checkedDataList[tab.name]) {
        this.secondIsShow = true;
        const e = {
          target: {
            checked: true,
            value: tab.name
          }
        };
        this.change(e);
      } else {
        this.secondIsShow = false;
      }
    },
    change (e) {
      const checked = e.target.checked;
      const value = e.target.value;
      const name = e.target.name;
      console.log(this.secondCheckedArr);
      if (name) {
        this.showDatas = `${name}`;
      } else {
        this.showDatas = '暂无';
      }
      this.secondData = {};
      this.thirdIsShow = false;
      this.fourthIsShow = false;
      if (!this.checkedDataList[value]) {
        this.checkedDataList[value] = {
          checked: checked,
          data: name
        };
      }
      if (checked) {
        this.$api.get(`/api/campaign/getCampaignOption?page=1&ind_code=i01&prov=zj&city=hz&code=${value}`)
        .then(res => {
          if (res.data.code === 0) {
            const data = res.data.data;
            this.secondData = {
              data: data,
              val: name
            };
          }
        });
        // 判断二层有没有数据 有获取请求
        if (this.secondCheckedArr.length) {
          const secondVal = this.secondCheckedArr[this.secondCheckedArr.length - 1];
          this.$api.get(`/api/campaign/getCampaignOption?page=2&prov=zj&city=hz&ind_code=i01&code=${secondVal.code}`)
          .then(res => {
            if (res.data.code === 0) {
              const data = res.data.data;
              this.thirdData = {
                data: data,
                val: `${value} -> ${secondVal.name}`
              };
            }
          });
          this.thirdIsShow = true;
          // 判断三层有没有数据 有获取请求
          if (this.thirdCheckedArr.length) {
            const thirdVal = this.thirdCheckedArr[this.thirdCheckedArr.length - 1];
            this.$api.get(`/api/campaign/getCampaignOption?page=3&prov=zj&city=hz&ind_code=i01&code=${thirdVal.code}`)
            .then(res => {
              if (res.code === 0) {
                const data = res.data.data;
                this.fourthData = {
                  data: data,
                  val: `${secondVal.name} -> ${thirdVal.name}`
                };
              }
            });
          }
          this.fourthIsShow = true;
        }
        this.secondIsShow = true;
        this.startName = value;
        if (!this.allData[value]) {
          this.allData[value] = {};
        }
      } else {
        if (this.allData[value]) {
          delete this.allData[value];
        }
        this.checkedDataList[this.activeName].checked = false;
        this.secondIsShow = false;
        this.showDatas = '暂无';
      }
    },
    secondChange (data) {
      const checked = data.checked;
      const value = data.value;
      const parentValue = data.parentValue;
      const thisName = data.thisName;
      const checkedArr = data.checkedArr;
      console.log(data);
      this.showDatas = `${parentValue} -> ${checkedArr[checkedArr.length - 1] ? checkedArr[checkedArr.length - 1].name : ''}`;
      console.log(data);
      this.secondCheckedArr = data.checkedArr;
      this.thirdIsShow = true;
      this.fourthIsShow = false;
      this.thirdData = {};
      if (checked) {
        this.$api.get(`/api/campaign/getCampaignOption?page=2&prov=zj&city=hz&ind_code=i01&code=${value}`)
        .then(res => {
          if (res.data.code === 0) {
            const data = res.data.data;
            this.thirdData = {
              data: data,
              val: `${parentValue} -> ${thisName}`
            };
          }
        });
        this.secondLastValue.push(value);
        this.secondName = value;
        if (!this.allData[this.startName][value]) {
          this.allData[this.startName][value] = {};
        }
      } else {
        this.remove(this.secondLastValue, value);
        console.log(this.secondLastValue);
        if (this.allData[this.startName][value]) {
          delete this.allData[this.startName][value];
        }
        if (checkedArr[checkedArr.length - 1] === undefined) {
          this.thirdData = [];
          return;
        }
        this.$api.get(`/api/campaign/getCampaignOption?page=2&prov=zj&city=hz&ind_code=i01&code=${checkedArr[checkedArr.length - 1].code}`)
        .then(res => {
          if (res.data.code === 0) {
            const data = res.data.data;
            this.thirdData = {
              data: data,
              val: `${parentValue} -> ${checkedArr[checkedArr.length - 1] ? checkedArr[checkedArr.length - 1].name : ''}`
            };
          }
        });
      }
    },
    thirdChange (data) {
      this.fourthIsShow = true;
      const checked = data.checked;
      const value = data.value;
      const parentValue = data.parentValue;
      const thisName = data.thisName;
      const checkedArr = data.checkedArr;
      console.log(data);
      this.showDatas = `${parentValue} -> ${checkedArr[checkedArr.length - 1] ? checkedArr[checkedArr.length - 1].name : ''}`;
      this.fourthData = {};
      // const checkedArr = data.checked;
      this.thirdCheckedArr = data.checkedArr;
      let arrData = this.allData[this.startName][this.secondCheckedArr[this.secondCheckedArr.length - 1].code][value];
      if (checked) {
        this.$api.get(`/api/campaign/getCampaignOption?page=3&prov=zj&city=hz&ind_code=i01&code=${value}`)
        .then(res => {
          if (res.data.code === 0) {
            const data = res.data.data;
            this.fourthData = {
              data: data,
              val: `${parentValue} -> ${thisName}`
            };
          }
        });
        this.thirdLastValue.push(value);
        this.thirdName = value;
        if (!arrData) {
          this.allData[this.startName][this.secondCheckedArr[this.secondCheckedArr.length - 1].code][value] = [];
        }
      } else {
        this.remove(this.thirdLastValue, value);
        if (arrData) {
          delete this.allData[this.startName][this.secondCheckedArr[this.secondCheckedArr.length - 1].code][value];
        }
        if (this.thirdLastValue[this.thirdLastValue.length - 1] === undefined) {
          this.thirdLastValue = [];
          return;
        }
        this.$api.get(`/api/campaign/getCampaignOption?page=3&city=zj&ind_code=i01&code=${this.thirdLastValue[this.thirdLastValue.length - 1].code}`)
        .then(res => {
          if (res.data.code === 0) {
            const data = res.data.data;
            this.fourthData = {
              data: data,
              val: `${parentValue} -> ${checkedArr[checkedArr.length - 1] ? checkedArr[checkedArr.length - 1].name : ''}`
            };
          }
        });
      }
      console.log(this.thirdLastValue);
    },
    fourthChange (data) {
      const checked = data.checked;
      const value = data.value;
      const parentValue = data.parentValue;
      const thisName = data.thisName;
      // const checkedArr = data.checkedArr;
      console.log(data);
      const arrData = this.allData[this.startName][this.secondCheckedArr[this.secondCheckedArr.length - 1].code][this.thirdCheckedArr[this.thirdCheckedArr.length - 1].code];
      if (checked) {
        this.storeArr.push(thisName);
        this.showDatas = `${parentValue} -> ${this.storeArr}`;
        console.log(arrData);
        if (!arrData.indexOf(value) !== -1) {
          // arrData.push(value);
          this.allData[this.startName][this.secondCheckedArr[this.secondCheckedArr.length - 1].code][this.thirdCheckedArr[this.thirdCheckedArr.length - 1].code].push(value);
        }
      } else {
        this.remove(this.storeArr, thisName);
        this.showDatas = `${parentValue} -> ${this.storeArr}`;
        if (arrData.indexOf(value) !== -1) {
          this.remove(arrData, value);
        }
      }
    },
    selectData (data) {
      console.log(data);
    },
    remove (arr, val) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === val) {
          arr.splice(i, 1);
          break;
        }
      }
    }
  }
};
</script>

<style lang="css" scoped>
</style>
