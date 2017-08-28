<template>
<div id="indexSwitch">
	<div class="switch"  @mouseover="mouseover" @mouseout="mouseout">
		<div class="img">
			<ul ref="switch">
				<li v-for="(item, i) in data" @click="selectImg(i)">
					<img :src="item.url" alt="">
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
      height: 650,
      time: 5000,
      timer: null,
      data: [{
        img: '1'
      }, {
        img: '1'
      }, {
        img: '1'
      }]
    };
  },
  created () {},
  mounted () {
    this.timeOut();
  },
  methods: {
    timeOut () {
      this.timer = setTimeout(() => {
        const num = this.$refs.switch.children.length;
        this.index ++;
        if (this.index > num - 1) {
          this.index = 0;
        }
        this.$refs.switch.style.top = `-${this.index * this.height}px`;
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
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
#indexSwitch
	margin-bottom: 50px
	min-width: 1000px
	.switch
		height: 650px
		border: 1px solid red
		overflow: hidden
		position: relative
		.img
			ul
				position: relative
				transition: top .3s
				li
					height: 650px
		.bar
			position: absolute
			z-index: 999
			top: 160px
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
