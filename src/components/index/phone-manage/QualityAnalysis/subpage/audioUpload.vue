<template>
<div id="upload">
  <div class="block">
    <span class="projectName">文件类型:</span>
    <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </div>
   <div class="block">
      <el-upload
        class="upload-demo"
        ref="upload"
        action="/api/audior/uploadAudior"
        :on-error="iferr"
        :on-success="ifsuccess"
        :before-upload="beforeUpload"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取上传的音频文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      </el-upload>
   </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      options: [{
        value: '意向客户',
        label: '意向客户'
      }, {
        value: '非意向客户',
        label: '非意向客户'
      }],
      value: ''
    };
  },
  methods: {
    submitUpload () {
      this.$refs.upload.submit();
    },
    iferr (file) {
      this.$alert(file.msg, '提示信息');
    },
    beforeUpload (file) {
      const str = file.name.split('.');
      if (str[str.length - 1] !== 'tar' && str[str.length - 1] !== 'gz') {
        this.$alert('上传文件类型错误', '提示信息');
        return false;
      }
    },
    ifsuccess (file) {
      if (file) {
        this.$alert(file.msg, '提示信息');
      }
    }
    /* request (file) {
      const form = new FormData();
      form.append('file', file.file, file.file.name);
      this.$ajax({
        method: 'post',
        url: '/api/audior/uploadAudior',
        headers: {'Content-Type': 'multipart/form-data'},
        data: form
      }).then(res => {
        if (res.data.code === 0) {
          this.$alert(res.data.msg, '提示信息');
        } else {
          this.$alert(res.data.msg, '提示信息');
        }
      });
    } */
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
#upload
  display: flex
  .block
    width: 300px
    .upload-demo
      button
        height: 35px
</style>
