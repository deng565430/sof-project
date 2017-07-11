<template>
<div>
  {{data}}
  <div v-for="val in data">
    <div>{{val}}
      <div v-for="sval in val">
        {{sval}}
        <div v-for="tval in sval">
          {{tval}}
          <div v-for="fval in tval">
            {{fval}}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {

  name: 'showDataList',
  watch: {
    'alldata': {
      handler: function (val, oldValue) {
        this.data = val;
      },
      deep: true
    }
  },
  create () {
    console.log(this.alldata);
  },
  mounted () {
    console.log(this.alldata);
  },
  data () {
    return {
      data: this.alldata
    };
  },
  props: ['alldata']
};
</script>

<style lang="css" scoped>
</style>
