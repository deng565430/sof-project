<template>
<div id="phoneTable">
  <el-table
    :data="tableData"
    style="width: 100%"
    >
    <el-table-column
      v-for="item in phonalyzrChild"
      :label="item.name"
      width="100"
      align="left"
      >
      <template scope="scope">
        {{item.value}}
      </template>
    </el-table-column>
  </el-table>
  <Charts :id="id" :projectType="phonalyzrChildCharts" :chartStyle="chartStyle" />
</div>
</template>

<script>
import Charts from '../../../../../Charts';
export default {

  name: 'phonalyzrChild',
  components: {
    Charts
  },
  created () {

  },
  data () {
    return {
      tableData: [{
        date: '',
        name: ''
      }],
      chartsData: [],
      id: 'pnonalyzrChild',
      chartStyle: {width: '700px', height: '400px', display: 'inline-block'}
    };
  },
  methods: {},
  props: ['phonalyzrChild', 'phonalyzrChildCharts']
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
#phoneTable
  position: absolute
  width: 700px
  border: 1px solid #d2ffea
  height: 450px
  left: 500px
  top: 200px;
  padding: 3px
  z-index: 10002
  background: white
</style>
