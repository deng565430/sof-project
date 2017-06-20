<template>
<div>
  <div  id="hotCharts" :style="style"></div>
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
      style: {width: window.innerWidth + 'px', height: '500px'}
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
    charts (id, data) {
      var map = new BMap.Map(document.getElementById('hotCharts'), {});
      map.centerAndZoom(new BMap.Point(121.474488, 31.238034), 11);
      map.enableScrollWheelZoom();
      map.addControl(new BMap.ScaleControl({
        anchor: 'BMAP_ANCHOR_TOP_LEFT'
      }));
      map.addControl(new BMap.NavigationControl());
      const heatmapOverlay = new BMapLib.HeatmapOverlay({
        'radius': 20
      });
      var points = [];
      var dataPoints = [];
      for (var i = 0; i < data[0].length; i++) {
        points.push(new BMap.Point(data[0][i].coord[0], data[0][i].coord[1]));
        dataPoints.push({count: '18', lat: data[0][i].coord[1], lng: data[0][i].coord[0]});
      }
      map.addOverlay(heatmapOverlay);
      heatmapOverlay.setDataSet({
        data: dataPoints,
        max: 100
      });
      var options = {
        size: 'BMAP_POINT_SIZE_BIG',
        shape: 'BMAP_POINT_SHAPE_CIRCLE',
        color: 'rgba(255,0,0,0.7)'
      };
      var pointCollection = new BMap.PointCollection(points, options);
      map.addOverlay(pointCollection);
    }
  },
  props: ['id', 'projectType', 'chartStyle']
};
</script>

<style lang="css" scoped>

</style>
