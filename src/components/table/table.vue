<template>
  <div>
    <el-table
      :data="tableData" :stripe="true"
      style="width: 100%;">
      <el-table-column
        prop="project"
        label="名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="date"
        label="批次"
        width="180">
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型">
      </el-table-column>
       <el-table-column
        prop="phone"
        label="电话">
      </el-table-column>
    </el-table>
    <div>
    {{this.searchValue.start}}
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        tableData: [],
        searchValueData: this.$store.state.searchValue
      };
    },
    props: {
      searchValue: Object
    },
    created () {
      this.getData();
    },
    watch () {
      this.searchValueData;
      this.getData();
      this.console();
    },
    methods: {
      getData () {
        var that = this;
        let datas = this.searchValueData;
        datas.start = 0;
        datas.length = 50;
        console.log(datas);
        this.$ajax({
          method: 'post',
          url: '/api/tel/getTelByCondition',
          data: datas
        }).then(function (res) {
          console.log(res.data);
          if (res.data && res.data.data && res.data.data.length > 0) {
            let list = res.data.data;
            for (var i = 0; i < list.length; i++) {
              let data = {};
              data.project = list[i].project;
              data.date = list[i].batch;
              data.type = list[i].type;
              data.phone = list[i].phone;
              that.tableData.push(data);
            }
          }
        });
      }
    },
    console () {
      console.log(this.searchValueData);
    }
  };
</script>

<style lang="css" scoped>
</style>
