<template>
  <div id="app">
    <div>
      <myHeader></myHeader>
      <div class="clearfix"></div>
      <div class="css-body">
        <div class="css-body-bigPics">
          <el-carousel indicator-position="outside" height="362px">
            <el-carousel-item v-for="(item,key) in pics" :key="key">
    		      <img :src="item" height="100%"  style="border-radius:8px"/>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="css-body-content">
          <div class="css-body-content-type">
          </div>
        </div>
      </div>
    </div>
  </div>

</div>
  </div>
</template>

<script>

import myHeader from './components/Public/Header/Header'

export default {
  components:{
    myHeader
  },
  data () {
    return {
      pics: [
  		   require('./assets/img/index3.png'),
		  	 require('./assets/img/index1.png'),
		  	 require('./assets/img/index2.png'),
		  	 require('./assets/img/index0.png'),
      ]
    }
  }
}
</script>

<style lang="scss">
  .css-body {
    width:1210px;
    margin:0 auto;
    .css-body-bigPics {
      margin:0 auto;
      padding:20px;
      height: 385px;
    }
    .css-body-content {
      margin-top: 15px;
      background-color: red;

      .css-body-content-type {
        width: 400px;
      }
      .css-body-content-search {
        width: 400px;
      }
    }
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
