<template>
<el-transfer
    style="text-align: left"
    filterable
    :titles="['所有竞品',` 可选竞品： ${10 - value.length}`]"
    :filter-method="filterMethod"
    filter-placeholder="输入项目名称"
    v-model="value"
    @change="changeSelect"
    :data="data">
  </el-transfer>
</template>

<script>
export default {

  name: 'index',
  props: ['filterSelectData'],
  data () {
    return {
      data: [],
      value: [],
      filterMethod (query, item) {
        return item.jingp.indexOf(query) > -1;
      },
      valueLength: 0
    };
  },
  watch: {
    'filterSelectData': {
      handler: function (val, oldValue) {
        this.generateData(val);
      },
      deep: true
    }
  },
  mounted () {
    this.generateData(this.filterSelectData);
  },
  methods: {
    changeSelect (data) {
      if (data.length < 11) {
        this.valueLength = data.length;
      } else {
        this.$alert('选择数量过多');
        data.length = this.valueLength;
      }
      this.$emit('childProjectSelect', data);
    },
    generateData (val) {
      const data = [];
      val.forEach((item, index) => {
        data.push({
          label: item.tagname,
          key: JSON.stringify({
            name: item.tagname,
            value: ''
          }),
          jingp: this.filterSelectData[index].tagname
        });
      });
      this.data = data;
    }
  }
};
</script>

<style lang="css" scoped>
</style>
