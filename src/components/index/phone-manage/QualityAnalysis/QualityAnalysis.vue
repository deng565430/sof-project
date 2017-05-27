<template>
<div>
  <div id="title">
      <el-tabs v-model="activeName" @tab-click="">
        <el-tab-pane label="本周通话统计" name="first">
          <div>
           <ThisWeek />
          </div>
        </el-tab-pane>
        <el-tab-pane label="通话分析" name="second">
          <div>
            <Phonalyzr />
          </div>
        </el-tab-pane>
        <el-tab-pane label="语音分析" name="third">
         <div>
            <SpeechAnalysis />
          </div>
        </el-tab-pane>
        <el-tab-pane label="音频文件上传" name="fourthly">
         <div>
            <AudioUpload />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
</div>
</template>

<script>
import AudioUpload from './subpage/audioUpload';
import Phonalyzr from './subpage/phonalyzr';
import SpeechAnalysis from './subpage/speechAnalysis';
import ThisWeek from './subpage/thisWeek';
export default {

  name: 'quality',
  components: {
    AudioUpload,
    Phonalyzr,
    SpeechAnalysis,
    ThisWeek
  },
  data () {
    return {
      activeName: 'first'
    };
  }
};
</script>

<style lang="css" scoped>
</style>
