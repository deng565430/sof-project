<template>
  <div class="contain" >
  <div style="margin-bottom:10px"><img src="static/youlantitle.png" width="100%"/></div>
    <div id="waterfall">
        <div v-for="(item, index) in items" class="c"  v-on:mouseenter="hovers(index)" v-on:mouseleave="leaveHover(  index)">
          <div class="zhezhao"></div>
          <img v-bind:src="item.src" width="100%" @click="clickImg($event)">
        </div>
        <div style="clear:both"></div>
    </div>
  <BigImg v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></BigImg>
  </div>
</template>

<script>
  import BigImg from './zhezhao';
  export default {
    components: {
      BigImg
    },
    data () {
      return {
        items: [{
          src: 'static/img/1.jpg'
        }, {
          src: 'static/img/2.jpg'
        }, {
          src: 'static/img/3.jpg'
        }, {
          src: 'static/img/4.jpg'
        }, {
          src: 'static/img/5.jpg'
        }, {
          src: 'static/img/6.jpg'
        }, {
          src: 'static/img/7.jpg'
        }, {
          src: 'static/img/8.jpg'
        }, {
          src: 'static/img/9.jpg'
        }, {
          src: 'static/img/10.jpg'
        }],
        showImg: false
      };
    },
    created () {
      this.change();
    },
    watch () {
    },
    methods: {
      clickImg (e) {
        this.showImg = true;
        // 获取当前图片地址
        this.imgSrc = e.currentTarget.src;
      },
      viewImg () {
        this.showImg = false;
      },
      menu () {
        this.change();
        // 可视区高度
        var windowHeight = document.documentElement.clientHeight;
        // 滚动条的高度
        var srcollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var srcollH = document.body.scrollHeight;
        // alert(srcollH);
        if (srcollTop + windowHeight >= srcollH - 20) {
          //  加载分页数据
          this.change();
          var obj = {};
          obj.src = 'static/img/1.jpg';
          var obj2 = {};
          obj2.src = 'static/img/8.jpg';
          this.items.push(obj);
          this.items.push(obj2);
          this.change();
        };
      },
      change () {
        var aDiv = document.getElementsByClassName('c');
        // alert(aDiv.length);
        var windowCW = document.documentElement.clientWidth * 0.8;  // 窗口视口的宽度
        var n = Math.floor(windowCW / 210);                   // 一行能容纳多少个div，并向下取整
        if (n <= 0) { return; };
        // alert(n);
        var center = (windowCW - n * 210) / 2;                   // 居中
        var arrH = [];                                       // 定义一个数组存放div的高度
        for (var i = 0; i < aDiv.length; i++) {
          var j = i % n;
          if (arrH.length === n) {
            var min = findMin(arrH);
            aDiv[i].style.left = center + min * 210 + 'px';
            aDiv[i].style.top = arrH[min] + 10 + 'px';
            arrH[min] += aDiv[i].offsetHeight + 10;
            aDiv[i].style.transition = '0.7s';
            // alert(min);
          } else {
            arrH[j] = aDiv[i].offsetHeight;
            aDiv[i].style.left = center + 200 * j + 10 * j + 'px';
            aDiv[i].style.top = 0;
            aDiv[i].style.transition = '0.7s';
          }
        };
      },
      hovers (index) {
        var aDiv = document.getElementsByClassName('c');
        // var aDivs = document.getElementsByClassName('zhezhao');
        for (var i = 0; i < aDiv.length; i++) {
          // aDivs[i].style.display = 'block';
          if (index === i) {
            aDiv[i].style.transform = 'scale(1.5)';
            aDiv[i].style.cursor = 'pointer';
            aDiv[i].style.zIndex = '11';
            // aDivs[i].style.display = 'none';
          }
        }
      },
      leaveHover (index) {
        var aDiv = document.getElementsByClassName('c');
        // var aDivs = document.getElementsByClassName('zhezhao');
        for (var i = 0; i < aDiv.length; i++) {
          // aDivs[i].style.display = 'none';
          if (index === i) {
            aDiv[i].style.transform = 'scale(1)';
            aDiv[i].style.zIndex = '0';
            aDiv[i].border = '0';
          }
        }
      }
    },
    mounted () {
      this.change();
      window.addEventListener('scroll', this.menu);
      this.change();
    }
  };
  window.onload = function () {
    var aDiv = document.getElementsByClassName('c');
    var windowCW = document.documentElement.clientWidth * 0.8;  // 窗口视口的宽度
    var n = Math.floor(windowCW / 210);                   // 一行能容纳多少个div，并向下取整
    if (n <= 0) { return; };
    // alert(n);
    var center = (windowCW - n * 210) / 2;                   // 居中
    var arrH = [];                                       // 定义一个数组存放div的高度
    for (var i = 0; i < aDiv.length; i++) {
      var j = i % n;
      if (arrH.length === n) {
        var min = findMin(arrH);
        aDiv[i].style.left = center + min * 210 + 'px';
        aDiv[i].style.top = arrH[min] + 10 + 'px';
        aDiv[i].style.transition = '0.7s';
        arrH[min] += aDiv[i].offsetHeight + 10;
        // alert(min);
      } else {
        arrH[j] = aDiv[i].offsetHeight;
        aDiv[i].style.left = center + 200 * j + 10 * j + 'px';
        aDiv[i].style.top = 0;
        aDiv[i].style.transition = '0.7s';
      }
    };
  };
  function change () {
    var aDiv = document.getElementsByClassName('c');
    // alert(aDiv.length);
    var windowCW = document.documentElement.clientWidth * 0.8;  // 窗口视口的宽度
    var n = Math.floor(windowCW / 210);                   // 一行能容纳多少个div，并向下取整
    if (n <= 0) { return; };
    // alert(n);
    var center = (windowCW - n * 210) / 2;                   // 居中
    var arrH = [];                                       // 定义一个数组存放div的高度
    for (var i = 0; i < aDiv.length; i++) {
      var j = i % n;
      if (arrH.length === n) {
        var min = findMin(arrH);
        aDiv[i].style.left = center + min * 210 + 'px';
        aDiv[i].style.top = arrH[min] + 10 + 'px';
        arrH[min] += aDiv[i].offsetHeight + 10;
        aDiv[i].style.transition = '0.7s';
        // alert(min);
      } else {
        arrH[j] = aDiv[i].offsetHeight;
        aDiv[i].style.left = center + 200 * j + 10 * j + 'px';
        aDiv[i].style.top = 0;
        aDiv[i].style.transition = '0.7s';
      }
    };
  };
  function findMin (arr) {
    var m = 0;
    for (var i = 0; i < arr.length; i++) {
      m = Math.min(arr[m], arr[i]) === arr[m] ? m : i;
    }
    return m;
  };
  window.onresize = function () {
    change();
  };
</script>

<style lang="css" scoped>
.contain{
  margin-top: 100px
}
#waterfall{
        width: 100%;
        position: relative;
   background: #ccc;
    }
.c{
   width: 200px;
   transition:0.5s;
   position: absolute;
   clear:both
}
.zhezhao{
  position: absolute;
    height: 100%;
    width: 100%;
    background: rgba(0,0,0,.4);
  display:none;
   transition:0.5s;
}
</style>
