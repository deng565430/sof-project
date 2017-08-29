<template>
<div id="indexMiddle">
	<div class="title">
		<div class="top"><p>PRODUCT CENTER</p></div>
		<div><p>_______________________</p></div>
		<div class="bottom"><p>服 务 项 目</p></div>
	</div>
	<div class="middle-img">
		<router-link to="/order" class="top" :style="viewStyleHeight">
			<div class="left">
				<div>
					<img :src="imgTopLeft" alt="">
				</div>
				<h2>观象</h2>
				<p>客若繁星，天运无穷。</p>
				<p>寻观象之秒理，得应时之能成。</p>
				<p>摘星奉之，行运千里。</p>
				<h2>拓客营销</h2>
			</div>
			<div class="right">
				<img :src="imgTopRight" alt="">
			</div>
		</router-link>
		<router-link to="/analysis" class="middle" :style="viewStyleHeight">
			<div class="left">
				<img :src="imgMiddleLeft" alt="">
			</div>
			<div class="right">
				<div>
					<img :src="imgMiddleRight" alt="">
				</div>
				<h2>问道</h2>
				<p>问道者更正，闻道者更容。</p>
				<p>问天运知道，解行事之惑。</p>
				<h2>分析报告</h2>
			</div>
		</router-link>
		<router-link to="/allcustomer" class="bottom" :style="viewStyleHeight">
			<div class="left">
				<div>
					<img :src="imgBottomLeft" alt="">
				</div>
				<h2>循迹</h2>
				<p>客迹无常，探网而寻。</p>
				<p>亦步亦趋，常伴左右。</p>
				<p>洞若观火，无微不至。</p>
				<h2>客户线索</h2>
			</div>
			<div class="right">
				<img :src="imgBottomRight" alt="">
			</div>
		</router-link>
	</div>
	<div class="bottom-msg">
		<div class="top">
			<p>为开发者提供专业、易用、可信赖的大数据产品</p>
		</div>
		<div class="bottom">
			<a>了解更多 	&gt;&gt;</a>	
		</div>
	</div>
</div>
</template>

<script>
export default {

  name: 'middle',

  data () {
    return {
      imgTopRight: require('assets/img/index_top_right.jpg'),
      imgMiddleLeft: require('assets/img/index_middle_left.jpg'),
      imgBottomRight: require('assets/img/index_bottom_right.jpg'),
      imgTopLeft: require('assets/img/index_top.png'),
      imgMiddleRight: require('assets/img/index_middle.png'),
      imgBottomLeft: require('assets/img/index__bottom.png'),
      viewStyleHeight: {
        height: window.innerHeight + 'px'
      }
    };
  },
  created () {
    console.log(window.innerHeight);
  },
  mounted () {}
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
#indexMiddle
  .title
  	min-width: 1000px
  	padding: 50px 0
  	div
  		margin: 0 auto
  		color: #0042ab	
  	.top
  		p
  			font-size: 40px
	  		line-height: 70px
	  		font-weight: 100
  	.bottom
  		p
  			line-height: 100px
  			font-size: 30px
  .middle-img
  	min-width: 1000px
  	.top, .middle, .bottom
  		height: 750px
  	.top
  		display: flex
  		.left
  			width: 47%
  			background: linear-gradient(to right, #ff8201 , #ff3f00)
  			color: #fff
  			div
  				height: 300px
  				padding-top: 80px
  				box-sizing: border-box
  				img
  					width: 23%
  			h2
  				font-size: 50px
  				line-height: 100px
  			p
  				font-size: 20px
  				line-height: 30px
  		.right
  			width: 53%
  			overflow: hidden
  			img
  				width: 100%
  				height: 100%
  	.middle
  		display: flex
  		.left
  			width: 53%
  			overflow: hidden
  			img
  				width: 100%
  				height: 100%
  		.right
  			width: 47%
  			background: linear-gradient(to right, #1749fe , #0592fe)
  			color: #fff
  			div
  				height: 300px
  				padding-top: 80px
  				box-sizing: border-box
  				img
  					width: 23%
  			h2
  				font-size: 50px
  				line-height: 100px
  			p
  				font-size: 20px
  				line-height: 30px
  	.bottom
  		display: flex
  		.left
  			width: 47%
  			background: linear-gradient(to right, #00f974 , #01d3a2)
  			color: #fff
  			div
  				height: 300px
  				padding-top: 80px
  				box-sizing: border-box
  				img
  					width: 23%
  			h2
  				font-size: 50px
  				line-height: 100px
  			p
  				font-size: 20px
  				line-height: 30px
  		.right
  			width: 53%
  			overflow: hidden
  			img
  				width: 100%
  				height: 100%
  .bottom-msg
  	.top
  		p
  			line-height: 100px
	  		font-size: 20px
	  		font-weight:500
	  		color: black
	  .bottom
	  	height: 200px
	  	a
	  		background: #fff
	  		padding: 10px 40px
	  		border: 1px solid #999
	  		transition: all .3s
	  		&:hover
	  			cursor:pointer
	  			color:  #0042ab
	  			border: 1px solid #0042ab
</style>
