<template>
<div>
  <Charts :id="'r-bazaar-charts'" :projectType="rBazaarCharts[0]" :chartStyle="{height: '400px'}" />
</div>
</template>

<script>
import Charts from '../../../Charts';
import { line } from 'assets/js/charts';
export default {

  name: 'index',
  components: {
    Charts
  },
  data () {
    return {
      rBazaarCharts: [],
      data: ''
    };
  },
  mounted () {
    this.$nextTick(() => {
      this.line(this.data, null, 'large');
    });
  },
  methods: {
    line (pie, tit, size) {
      this.$api.get(`/api/apis/subscribe/type_day?keywords=${encodeURI(this.topName)}`)
      .then(res => {
        if (res.data.code === 0) {
          const data = res.data.data;
          let option = line(data, 'topAll');
          this.rBazaarCharts.push(option);
        }
      });
    }
  },
  props: {
    topName: {
      type: String,
      default: '上海楼盘'
    }
  }
};
</script>

<style lang="css" scoped>
</style>
