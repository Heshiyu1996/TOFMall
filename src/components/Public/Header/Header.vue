<template>
  <div class="css-top">
    <div style="width:1180px;margin:0 auto;">
      <div class="css-top-left">
        <router-link to="/">
          <img src="./../../../assets/img/logo.png" id="logo">
          <span class="css-top-left-title">TOF，你身边的电商平台</span>
        </router-link>
      </div>
      <div class="css-top-center">
        <div class="line"></div>
        <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="0">首页</el-menu-item>
          <el-menu-item index="1">商品分类</el-menu-item>
          <el-menu-item index="2"><a href="javascript:;" target="_blank">购物车</a></el-menu-item>
          <el-submenu index="3">
            <template slot="title">联系客服</template>
            <el-menu-item index="2-1">帮助中心</el-menu-item>
            <el-menu-item index="2-2">售后服务</el-menu-item>
            <el-menu-item index="2-3">意见建议</el-menu-item>
          </el-submenu>
            </el-menu>
      </div>
      <div class="css-top-right">
        <router-link to="/tradeSystem/register">
          <el-button>注册</el-button>
        </router-link>
        <router-link to="/tradeSystem/login">
        <el-button type="primary">登录</el-button>
        </router-link>
      </div>
    </div>
  </div>


</template>

<script>
import { Notification } from 'element-ui';
export default {
  data () {
    return {
      activeIndex2:'1',
    }
  },

  methods: {
  handleSelect(key, keyPath) {
    // console.log(key, keyPath);
  },


},

  created(){
  }

}


</script>

<style lang="scss">

.css-top {
  float: left;
	width: 100%;
  height:75px;
  padding: 5px 0px;
  background-color:rgb(239,242,247);
  .css-top-left {
    float: left;
    width: 30%;
    .css-top-left-title {
      padding-left: 10px;
      font-size: 18px;
      font-weight: bold;
    }
  }
  .css-top-center {
    padding-left: 100px;
    float: left;
    width: 50%;
  }
  .css-top-right {
    float: left;
    width: 20%;
    height:60px;
    padding-top: 10px;
  }
}

#logo{
  width: 60px;
  vertical-align:middle;
  border-radius: 7px;
}

.omit{
	width:500px;
	overflow: hidden;
	vertical-align: top;
	text-overflow:ellipsis;
	white-space: nowrap;/*不换行*/
}
</style>
