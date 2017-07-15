<template>
  <div style="width:100%">
123dsadasds
  </div>
</template>

<script>
// import loginBox from './../components/loginBox'

export default {
  components:{
  },
  data () {
    return {
      imgSource:[	//轮播图
		  	//  require('./../assets/img/car7.jpg'),
		  	//  require('./../assets/img/car9.jpg'),
		  	//  require('./../assets/img/car8.jpg'),
		  ],
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.el-carousel{
}
.el-carousel-item{
}
.el-carousel__item h3 {
	color: #475669;
	font-size: 18px;
	opacity: 0.75;
	line-height: 300px;
	margin: 0;
}
.el-carousel__item:nth-child(2n) {
	background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n+1) {
	background-color: #d3dce6;
}
</style>
