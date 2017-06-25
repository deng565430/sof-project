<template>
<el-transfer
    style="text-align: left"
    filterable
    :titles="['所有的项目','选择的项目']"
    :filter-method="filterMethod"
    filter-placeholder="请输入城市拼音"
    :footer-format="{ noChecked: '共 ${total} 项', hasChecked: '已选 ${checked}/${total} 项' }"
    v-model="value2"
    @change="changeSelect"
    :data="data2">
  </el-transfer>
</template>

<script>
export default {

  name: 'index',

  data () {
    const generateData2 = _ => {
      const data = [];
      const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都', '11', '22', '33', '44'];
      const pinyin = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都', '11', '22', '33', '44'];
      cities.forEach((city, index) => {
        data.push({
          label: city,
          key: index,
          pinyin: pinyin[index]
        });
      });
      return data;
    };
    return {
      data2: generateData2(),
      value2: [],
      filterMethod (query, item) {
        return item.pinyin.indexOf(query) > -1;
      }
    };
  },
  methods: {
    changeSelect (data) {
      if (data.length > 9) {
        this.$alert('选择数量过多');
        data.length = 9;
      }
      console.log(data);
    }
  }
};
</script>

<style lang="css" scoped>
</style>
