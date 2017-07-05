<template>
<div>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane v-for="(val, index) in tabTitle" :label="val.name" :name="val.code" style="text-align: left;">
        <el-checkbox v-model="startSelect" @change="change" :label="val.code" :name="val.code">{{val.name}}</el-checkbox>
        <div>
          <CheckBox :data="secondData" @selectData="SecondChange"/>
        </div>
        <div>
          <CheckBox :data="thirdData" @selectData="thirdChange"/>
        </div>
        <div>
          <CheckBox :data="fourthData" @selectData="fourthChange"/>
        </div>
    </el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
import CheckBox from './checkBox';
export default {

  name: 'shaixuan',
  components: {
    CheckBox
  },
  data () {
    return {
      activeName: '1',
      tabTitle: [],
      startName: '',
      secondData: [],
      secondName: '',
      thirdData: [],
      thirdName: '',
      fourthData: [],
      startSelect: [],
      secondSelect: [],
      thirdSelect: [],
      fourthSelect: [],
      secondLastValue: [],
      allData: {},
      select: {},
      datas: {
        tabTitle: {
          tabTitle: []
        }
      }
    };
  },
  created () {
    this.getTab();
  },
  methods: {
    getTab () {
      this.$api.get('/api/campaign/getCampaignOption?page=0&ind_code=i01&code=').then((res) => {
        const data = res.data.data;
        this.tabTitle = data;
        this.activeName = data[0].code;
      });
    },
    handleClick () {},
    change (e) {
      const checked = e.target.checked;
      const value = e.target.value;
      if (checked) {
        this.$api.get(`/api/campaign/getCampaignOption?page=1&ind_code=i01&code=${value}`)
        .then(res => {
          if (res.data.code === 0) {
            const data = res.data.data;
            this.secondData = data;
          }
        });
        this.startName = value;
        if (!this.allData[value]) {
          this.allData[value] = {};
        }
      } else {
        if (this.allData[value]) {
          delete this.allData[value];
        }
        this.secondData = [];
      }
      this.secondSelect = [];
      this.thirdData = [];
      this.thirdSelect = [];
      this.fourthData = [];
      this.fourthSelect = [];
    },
    SecondChange (data) {
      const checked = data.checked;
      const value = data.value;
      console.log(this.secondLastValue);
      // const name = this.activeName;
      if (checked) {
        this.$api.get(`/api/campaign/getCampaignOption?page=2&city=zj&ind_code=i01&code=${value}`)
        .then(res => {
          if (res.data.code === 0) {
            const data = res.data.data;
            this.thirdData = data;
          }
        });
        this.secondLastValue.push(value);
        this.secondName = value;
        if (!this.allData[this.startName][value]) {
          this.allData[this.startName][value] = {};
        }
      } else {
        this.remove(this.secondLastValue, value);
        if (this.allData[this.startName][value]) {
          delete this.allData[this.startName][value];
        }
        this.$api.get(`/api/campaign/getCampaignOption?page=2&city=zj&ind_code=i01&code=${this.secondLastValue[this.secondLastValue.length - 1]}`)
        .then(res => {
          if (res.data.code === 0) {
            const data = res.data.data;
            this.thirdData = data;
          }
        });
      }
    },
    thirdChange (data) {
      const checked = data.checked;
      const value = data.value;
      if (checked) {
        this.$api.get(`/api/campaign/getCampaignOption?page=3&city=zj&ind_code=i01&code=${value}`)
        .then(res => {
          console.log(res);
          if (res.data.code === 0) {
            const data = res.data.data;
            this.fourthData = data;
          }
        });
        this.thirdName = value;
        if (!this.allData[this.startName][this.secondName][value]) {
          this.allData[this.startName][this.secondName][value] = [];
        }
      } else {
        if (this.allData[this.startName][this.secondName][value]) {
          delete this.allData[this.startName][this.secondName][value];
        }
        this.fourthData = [];
      }
      console.log(this.allData);
    },
    fourthChange (data) {
      const checked = data.checked;
      const value = data.value;
      const arrData = this.allData[this.startName][this.secondName][this.thirdName];
      if (checked) {
        if (!arrData.indexOf(value) !== -1) {
          arrData.push(value);
        }
      } else {
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
