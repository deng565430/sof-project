<template>
<div>
  <div id="hotMap">
    <div  id="hotCharts" :style="style"></div>
    <div class="btn-group">
        <el-button type="success" @click="showReli">热力</el-button>
        <el-button type="warning" @click="showMadian">麻点</el-button>
        <el-button type="danger" @click="showAll">热力&麻点</el-button>
    </div>
  </div>
</div>
</template>

<script>
import BMap from 'BMap';
import BMapLib from 'BMapLib';
export default {

  name: 'index',

  data () {
    return {
      style: {width: window.innerWidth + 'px', height: '800px'},
      map: null
    };
  },
  mounted () {
    this.$nextTick(() => {
      this.charts(this.id, this.projectType);
      this.showReli();
    });
  },
  created () {},
  methods: {
    charts (id, data) {
      this.map = new BMap.Map(document.getElementById('hotCharts'), {});
      this.map.centerAndZoom(new BMap.Point(121.474488, 31.238034), 11);
      this.map.enableScrollWheelZoom();
      this.map.addControl(new BMap.ScaleControl({
        anchor: 'BMAP_ANCHOR_TOP_LEFT'
      }));
      this.map.addControl(new BMap.NavigationControl());
      const func = this.data(data);
      this.reli(this.map, data);
      this.madian(this.map, func.points, data);
    },
    reli (map, data) {
      const heatmapOverlay = new BMapLib.HeatmapOverlay({
        'radius': 20
      });
      map.addOverlay(heatmapOverlay);
      heatmapOverlay.setDataSet({
        data: data,
        max: 100
      });
    },
    madian (map, points, options) {
      var pointCollection = new BMap.PointCollection(points, options);
      map.addOverlay(pointCollection);
    },
    data (data) {
      const points = [];
      for (let i = 0; i < data.length; i++) {
        points.push(new BMap.Point(data[i]['lng'], data[i]['lat']));
      }
      const options = {
        size: 'BMAP_POINT_SIZE_BIG',
        shape: 'BMAP_POINT_SHAPE_CIRCLE',
        color: 'rgba(255,0,0,0.7)'
      };
      return {
        options,
        points
      };
    },
    showReli () {
      this.map.clearOverlays();
      this.reli(this.map, this.projectType);
    },
    showMadian () {
      const func = this.data(this.projectType);
      this.map.clearOverlays();
      this.madian(this.map, func.points, this.projectType);
    },
    showAll () {
      const func = this.data(this.projectType);
      this.map.clearOverlays();
      this.reli(this.map, this.projectType);
      this.madian(this.map, func.points, this.projectType);
    }
  },
  props: ['id', 'projectType', 'chartStyle']
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
#hotMap
  width: 100%
  overflow: hidden
  position: relative
  height: 1000px
.btn-group
  position: absolute
  top: 0
  right: 0
</style>
