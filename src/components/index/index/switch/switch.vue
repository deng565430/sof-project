<template>
<div id="indexSwitch">
	<div class="switch"  @mouseover="mouseover" @mouseout="mouseout">
		<div class="img">
			<ul ref="switch">
				<li v-for="(item, i) in data" @click="selectImg(i)">
					<img :src="item.img" alt="">
				</li>
			</ul>
		</div>
		<div class="bar">
			<ul>
				<li :class="[i === index ? 'active' : '']"  v-for="(item, i) in data" @click="selectImg(i)"></li>
			</ul>
		</div>
	</div>
</div>
</template>

<script>
export default {

  name: 'switch',

  data () {
    return {
      index: 0,
      height: 750,
      time: 5000,
      timer: null,
      num: 3,
      data: [{
        img: require('assets/img/index_switch01.jpg')
      }, {
        img: require('assets/img/index_switch01.jpg')
      }, {
        img: require('assets/img/index_switch01.jpg')
      }]
    };
  },
  created () {},
  mounted () {
    setTimeout(() => {
      this.timeOut();
    }, 20);
  },
  watch: {
    flag (val) {
      console.log(val);
      if (val) {
        this.timeOut();
      } else {
        clearTimeout(this.timer);
      }
    }
  },
  methods: {
    timeOut () {
      if (!this.$refs.switch || !this.$refs.switch.children) {
        clearTimeout(this.timer);
        return;
      }
      this.num = this.$refs.switch ? (this.$refs.switch.children ? this.$refs.switch.children.length : 3) : 3;
      this.timer = setTimeout(() => {
        this.index ++;
        if (this.index > this.num - 1) {
          this.index = 0;
        }
        if (this.$refs.switch) {
          this.$refs.switch.style.top = `-${this.index * this.height}px`;
        }
        this.timeOut();
      }, this.time);
    },
    mouseover () {
      clearTimeout(this.timer);
    },
    mouseout () {
      this.timeOut();
    },
    selectImg (index) {
      this.index = index;
      this.$refs.switch.style.top = `-${this.index * this.height}px`;
    }
  },
  props: {
    flag: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
#indexSwitch
	margin-bottom: 50px
	min-width: 1000px
	.switch
		height: 750px
		overflow: hidden
		position: relative
		.img
			ul
				position: relative
				transition: top .3s
				li
					height: 750px
					img
						width: 100%
						height: 100%
		.bar
			position: absolute
			z-index: 999
			top: 300px
			right: 50px
			ul
				li
					width: 15px
					height: 15px
					margin: 20px 0
					border-radius: 20px
					background: #ccc
					&:hover
						cursor: pointer
				.active
					background: #40bcae	
</style>
