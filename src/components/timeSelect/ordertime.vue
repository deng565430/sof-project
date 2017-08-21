<template>
<div>
    <el-date-picker
      v-model="dataValue"
      type="daterange"
      align="left"
      @change="remoteMethod"
      placeholder="选择日期范围"
      :editable="false">
    </el-date-picker>
</div>
</template>

<script>
export default {
  props: ['dates'],
  name: 'TimeSelect',

  data () {
    return {
      dataValue: this.dates ? this.dates : ''
    };
  },
  created () {},
  methods: {
    remoteMethod () {
      if (!this.dataValue) {
        return;
      };
      let minbatch = this.format('yyyy-MM-dd', new Date(this.dataValue[0]));
      let maxbatch = this.format('yyyy-MM-dd', new Date(this.dataValue[1]));
      this.$emit('dataEvent', {minbatch: minbatch, maxbatch: maxbatch});
    },
    format (fmt, time) {
      var o = {
        'M+': time.getMonth() + 1,
        'd+': time.getDate(),
        'h+': time.getHours(),
        'm+': time.getMinutes(),
        's+': time.getSeconds(),
        'q+': Math.floor((time.getMonth() + 3) / 3),
        'S': time.getMilliseconds()
      };
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
      }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
      }
      return fmt;
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>
