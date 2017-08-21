<template>
<div>
  <div id="title">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="本周通话统计" name="first">
          <div>
           <ThisWeek />
          </div>
        </el-tab-pane>
        <el-tab-pane label="话题分析" name="second">
          <div v-if="secondFlag">
            <Phonalyzr />
          </div>
        </el-tab-pane>
        <el-tab-pane label="时序分析" name="third">
         <div v-if="thirdFlag">
            <SpeechAnalysis />
          </div>
        </el-tab-pane>
        <el-tab-pane label="音频文件上传" name="fourthly">
         <div v-if="fourthlyFlag">
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
  components: {
    AudioUpload,
    Phonalyzr,
    SpeechAnalysis,
    ThisWeek
  },
  data () {
    return {
      activeName: 'first',
      secondFlag: false,
      thirdFlag: false,
      fourthlyFlag: false
    };
  },
  methods: {
    handleClick (e) {
      if (e.name === 'second') {
        if (!this.secondFlag) {
          this.secondFlag = true;
        }
      } else if (e.name === 'third') {
        if (!this.thirdFlag) {
          this.thirdFlag = true;
        }
      } else if (e.name === 'fourthly') {
        if (!this.fourthlyFlag) {
          this.fourthlyFlag = true;
        }
      }
    }
  }
};
</script>

<style lang="css" scoped>
</style>
