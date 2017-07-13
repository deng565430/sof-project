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
import data from './data.json';
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
      this.charts(this.id, data);
    });
  },
  watch: {
    'projectType': {
      handler: function (val, oldValue) {
        this.charts(this.id, val);
      },
      deep: true
    }
  },
  created () {},
  methods: {
    getAllData () {
      this.$api.get(``)
      .then(res => {
        return new Promise((resolve, reject) => {
          resolve(res);
        });
      });
    },
    charts (id, data) {
      this.map = new BMap.Map(document.getElementById('hotCharts'), {});
      this.map.centerAndZoom(new BMap.Point(121.474488, 31.238034), 11);
      this.map.enableScrollWheelZoom();
      this.map.addControl(new BMap.ScaleControl({
        anchor: 'BMAP_ANCHOR_TOP_LEFT'
      }));
      this.map.addControl(new BMap.NavigationControl());
      const func = this.data();
      this.reli(this.map, func.dataPoints);
      this.madian(this.map, func.points, func.options);
    },
    reli (map, dataPoints) {
      const heatmapOverlay = new BMapLib.HeatmapOverlay({
        'radius': 20
      });
      map.addOverlay(heatmapOverlay);
      heatmapOverlay.setDataSet({
        data: dataPoints,
        max: 100
      });
    },
    madian (map, points, options) {
      var pointCollection = new BMap.PointCollection(points, options);
      map.addOverlay(pointCollection);
    },
    data () {
      const points = [];
      const dataPoints = [];
      for (let i = 0; i < data[0].length; i++) {
        points.push(new BMap.Point(data[0][i].coord[0], data[0][i].coord[1]));
        dataPoints.push({count: '18', lat: data[0][i].coord[1], lng: data[0][i].coord[0]});
      }
      const options = {
        size: 'BMAP_POINT_SIZE_BIG',
        shape: 'BMAP_POINT_SHAPE_CIRCLE',
        color: 'rgba(255,0,0,0.7)'
      };
      return {
        options,
        dataPoints,
        points
      };
    },
    showReli () {
      const func = this.data();
      this.map.clearOverlays();
      this.reli(this.map, func.dataPoints);
    },
    showMadian () {
      const func = this.data();
      this.map.clearOverlays();
      this.madian(this.map, func.points, func.options);
    },
    showAll () {
      const func = this.data();
      this.map.clearOverlays();
      this.reli(this.map, func.dataPoints);
      this.madian(this.map, func.points, func.options);
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
