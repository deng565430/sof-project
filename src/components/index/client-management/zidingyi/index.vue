<template>
<div id="zdy">
  <div v-if="listshow">
    <div>
      <Zdialog @shuaxinlist="shuaxinlist" :tablelength="tablelength"></Zdialog>
    </div>
    <div class="new">
      <h2>我创建的分组</h2>
      <Ztable :tables="tables" @listen='listen' @detailtable="detailtable" @shuaxinlist="shuaxinlist"></Ztable>
    </div>
  </div>
  <div v-if="tablesisshow">
    <Tables @fanhui="fanhui" :table="table" @shuaxinlist2="shuaxinlist2"  @handleCurrentChanges="handleCurrentChanges"></Tables>
      <Page :pagenum="pagenum"  @handleCurrentChanges="handleCurrentChanges"></Page>
  </div>
</div>
</template>

<script>
import Zdialog from './../dialog/zdydialog';
import Ztable from './../table/tablezdy';
import Tables from './../table/zdydatiltable';
import Page from './../table/page';
export default {
  components: {
    Zdialog,
    Ztable,
    Tables,
    Page
  },
  data () {
    return {
      dialog: false,
      tables: [],
      tablesisshow: false,
      tablelength: 0,
      listshow: true,
      table: [],
      pagenum: 0,
      currentPage: 0,
      label_code: ''
    };
  },
  created () {
    this.gettable();
  },
  methods: {
    gettable () {
      this.$api.get('/api/clientbehavior/getlabel').then((res) => {
        this.tables = res.data.data.label;
        this.tablelength = res.data.data.label.length;
      });
    },
    listen () {
      this.gettable();
    },
    shuaxinlist () {
      this.gettable();
    },
    detailtable (val) {
      this.label_code = val.code;
      this.tablesisshow = true;
      this.listshow = false;
      this.$api.get('/api/clientbehavior/getlabelclient?start=' + this.currentPage + '&length=' + 100 + '&label=' + val.code).then((res) => {
        this.table = res.data.data;
        this.pagenum = res.data.recordsFiltered;
      });
    },
    shuaxinlist2 (val) {
      this.$api.get('/api/clientbehavior/getlabelclient?start=' + this.currentPage + '&length=' + 100 + '&label=' + val).then((res) => {
        this.table = res.data.data;
        this.pagenum = res.data.recordsFiltered;
      });
    },
    handleCurrentChanges (val) {
      this.currentPage = val;
      this.start = val;
      this.$api.get('/api/clientbehavior/getlabelclient?start=' + val + '&length=' + 2 + '&label=' + this.label_code).then((res) => {
        this.table = res.data.data;
        this.pagenum = res.data.recordsFiltered;
      });
    },
    fanhui () {
      this.tablesisshow = false;
      this.listshow = true;
    }
  }
};
</script>

<style lang="css">
.btns{
  text-align: left;
}
.new{
  margin-top: 30px;
  border: 1px solid #ccc;
  border-radius: 5px 5px 0 0;
}
#zdy h2{
  text-align: left;
  line-height: 35px;
  background: #20a0ff;
  color:#fff;
  padding-left: 10px;
  border-radius: 5px 5px 0 0;
}
#zdy h2 span{
  font-size: 20px;
  margin-right:5px;
}
</style>
