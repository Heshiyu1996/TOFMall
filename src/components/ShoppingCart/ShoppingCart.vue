<template>
  <div class="updateInfo-box">
    <div class="info-box">
      <div>
    <div style="margin-top:-30px;">
      <el-steps :space="100" :active="active" finish-status="success">
        <el-step title="加入购物车"></el-step>
        <el-step title="生成订单"></el-step>
        <el-step title="提交订单"></el-step>
        <el-step title="确认订单"></el-step>
        <el-step title="评论"></el-step>
      </el-steps>
    </div>
    <div style="width:860px;margin:0 auto">
      <div class="css-top">我的购物车</div>
      <div class="clearfix"></div>
      <hr>
      <section>
        <div class="css-title">
          <div class="css-title-all">
           <!-- <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange">
            </el-checkbox> -->
          </div>
          <div class="css-title-name">商品信息</div>
          <div class="css-title-price">单价</div>
          <div class="css-title-count">数量</div>
          <div class="css-title-sum">小计</div>
        </div>
      </section>
      <div class="clearfix"></div>

      <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <section v-for="esingle in goods">
          <div class="css-body">
            <div class="css-body-item">
              <div class="css-body-item-select">
                <el-checkbox :key="esingle.row"  :label="esingle.row" ></el-checkbox>
              </div>
              <div class="css-body-item-img" style="">
                <img :src="esingle.img" />
              </div>
              <!-- {{esingle.commodity.cname}} -->
              <div class="css-body-item-name">{{esingle.commodity.cname}}</div>
              <div class="css-body-item-cid">{{esingle.cid}}</div>

              <div class="css-body-item-price">{{esingle.commodity.cprice}}</div>
              <div class="css-body-item-count">
                <el-input-number size="small" v-model="esingle.csize" @change="handleChange(esingle.row)" :min="1" :max="99999999"></el-input-number>
                <div class="css-body-item-count-remain">剩余库存：<span class="css-body-item-count-remain-span" controls=false>{{esingle.commodity.cremain}}</span> 件</div>
                </div>
              <div class="css-body-item-sum">¥ {{esingle.sum}}</div>
              <div class="css-body-item-delete"><el-button type="primary" @click="deleteCart(esingle)">删除</el-button></div>
            </div>
          </div>
        </section>

      </el-checkbox-group>
      <section>
        <div class="css-footer">
          <div class="css-footer-count">已选商品 <span class="css-footer-count-num">{{itemCount}}</span>件</div>
          <div class="css-footer-sum">合计 ： <span class="css-footer-sum-num">¥ {{total}}</span></div>
          <div class="css-footer-btn"><el-button type="primary" @click="goToPay()" class="appBTN">去结算</el-button></div>
        </div>
      </section>
    </div>
</div>
    </div>
    <div style="">
      <div  class="resultList">
          <div style="text-align:left;">
            <div style="font-size:16px;font-weight:bold;padding-top:10px">猜你喜欢</div>
            <div class="clearfix"></div>
            <div style="margin:10px;margin:0 auto">
              <div style="padding:0px 80px 0px 80px;width:860px;text-align:left" >
              <!-- 猜你喜欢 开始 -->
              <div  style="padding: 0px 20px;width:180px;margin-left:10px;">
                <div style="width:1080px;ext-align:left;margin-left:-100px" >

                  <div  @mouseenter="shakes" v-for="esingle in LoveList" style="width:180px;float:left;margin:20px;">
                    <router-link :to="'/ItemInfo/' + esingle.id">
                      <transition name="el-fade-in-linear">
                        <el-card  class="box-card" :body-style="{ padding: '0px' }">
                          <div style="position:absolute;" v-if="esingle.haveGrade">
                            <span class="css-item-grade" style="position:absolute;margin-left:168px;font-size:15px;margin-top:-5px;color:white;font-weight:bold;text-shadow:0px 0px 5px yellow">{{esingle.grade}}</span>
                              <i class="el-icon-star-on" style="margin:-15px 0px 0px 160px;font-size:36px;color:#FC7500;">
                              </i>
                          </div>


                          <img :src="esingle.img" class="imgSmall" >
                          <div style="padding:10px;">
                            <div  class="omit" style="font-size:16px;line-height:30px;width:150px;height:35px;float:left">{{esingle.name}}</div>
                            <div>
                            <div style="text-align:left;float:left;font-size:12px;font-weight:bold;color:rgb(230, 94, 64)" >￥
                              <div style="text-align:left;width:50px;font-size:14px;float:right;line-height:17px;" class="omit" >{{esingle.price}}</div>
                            </div>
                            <div style="text-align:left;float:right;font-size:12px;font-weight:bold;">人气值:<span style="color:green;">{{esingle.rank}}</span>
                            </div>
                          </div>
                            <div class="clearfix"></div>
                          </div>
                        </el-card>
                        </transition>
                    </router-link>
                  </div>

                </div>
                <div class="clearfix"></div>
            </div>
              <!-- 猜你喜欢 结束 -->
            </div>
          </div>
          </div>
      </div>

    </div>
  </div>
</template>

<script>
// const cityOptions = ;

import axios from 'axios'
import config from './../../publicAPI/config'
import { Message } from 'element-ui';//信息提示框
import { Notification } from 'element-ui';

export default {
  components: {
    // myFooter,
  },
  data () {
    return {
      active: 1,
      rootURL: config.JXURL,
      checked: false,

      goods: [],

      checkedCities: [],
      checkAll: false,
      isIndeterminate: false,

      itemCount :0,
      row: 0,
      total: 0,
      cityOptions: [],
      LoveList:[],
    }
  },

  watch: {
    'goods': {
      handler: function(val,oldVal){
        let that = this;
        that.updateTotal()
        // console.log(val)
      },
      deep:true
    }
  },
  computed: {
    // total: function(){
    //   let tot = 0;
    //   let that = this;
    //   that.goods.forEach(function (item){
    //     tot += item.sum
    //   })
    //   return tot;
    // }
  },
  methods: {
    getRecommendByUser(){
      let that=this
      var url=that.rootURL+'/getRecommendByUser.do';
      var tmpList = {

      };
      var count=1;
      that.LoveList = [];
      axios.get(url)
      .then(function(res){
        for( that.idx of res.data ){
          if(count>4){
            break;
          }
          count=count+1;

          console.log('推荐商品');
            tmpList = [];
            tmpList.img = that.rootURL+'/'+that.idx.commodity.miniPic,
            tmpList.id = that.idx.cid;
            tmpList.name = that.idx.commodity.cname;
            tmpList.price = that.idx.commodity.cprice;
            tmpList.remain = that.idx.commodity.cremain;
            tmpList.rank = that.idx.rank;
            if(that.idx.commodity.grade!=null){
              tmpList.grade = that.idx.commodity.grade.toFixed(1);
              tmpList.haveGrade=true;
            }else {
              tmpList.haveGrade=true;
              tmpList.grade ='5.0';
            }
            that.LoveList.push(tmpList);
        }
      })
      .catch(function(error){
        console.error(error)
      })
    },
    deleteCart(esingle){
      let that=this;
      axios.get(that.rootURL+'/deleteCart.do?cid=' + esingle.cid).then(function(res){
        if(res.data.status){
          Notification.success({
                  title: '移除成功',
                  message: res.data.msg,
                  offset: 65,
                  duration:2000
                })
          that.getCartList();
          // window.location.reload();
          // getCartList();
        }
      }).catch(function(error){
        console.error(error)
      })

    },
    goToPay(){
      let that = this;
      var domList = document.getElementsByClassName("el-checkbox__inner");
      var count = 0;
      var rowIdx = [];
      for(var i=0 ; i<domList.length;i++){
        // console.log(domList[i].offsetParent.className)
        if(domList[i].offsetParent.className=='el-checkbox__input is-checked'){
          count ++;
          // console.log(domList[i].offsetParent.lastChild.value)
          rowIdx.push(domList[i].offsetParent.lastChild.value);
        }
      }

      var myCids = '';
      var myCsizes = '';
      for(var i=0 ; i<rowIdx.length -1;i++){
        var temp = document.getElementsByClassName("css-body-item-cid")[rowIdx[i]].innerText +'_';
        myCids = myCids  + temp;
        var temp2 = document.getElementsByClassName("css-body-item-count")[rowIdx[i]];
        var temp3 = temp2.firstChild.lastChild.getElementsByTagName('input')[0].value +'_';
        myCsizes = myCsizes  + temp3;
      }
      myCids = myCids + document.getElementsByClassName("css-body-item-cid")[rowIdx[rowIdx.length-1]].innerText
      myCsizes = myCsizes + document.getElementsByClassName("css-body-item-count")[rowIdx[rowIdx.length-1]].firstChild.lastChild.getElementsByTagName('input')[0].value

      // console.log(myCids)
      // console.log(myCsizes)
      localStorage.removeItem('myUrl')

      localStorage.setItem('myUrl',that.rootURL+'/account.do?cids=' + myCids +'&csizes='+ myCsizes)
      var myUrl=localStorage.getItem('myUrl');
      axios.get(myUrl)
      .then(function(res){
        if(res.data.status){
          that.$router.push({path:'/order'})
        }
        else {
          if(res.data.msg === '未登录'){
          Notification.error({
                  title: '下单失败',
                  message: res.data.msg,
                  offset: 65,
                  duration:2000
                })
          that.$router.push({path:'/login'})
        }
      }
      })
      .catch(function(error){
        console.error(error)
      })
    },
    getCartList(){
      let that = this;
      that.idx = '';
      that.row = 0 ;
      that.goods = [];
      that.checkedCities = [];
      that.cityOptions = [];
      axios.get(that.rootURL+'/queryCart.do')
      .then(function(res){
        for( that.idx of res.data ){
          var bt = {
            img:'',
            row : 0,
            cid : '',
            uid : '',
            csize : '',
            sum : 0,
            commodity : {},
          };
          bt.img=that.rootURL+'/'+that.idx.commodity.miniPic;
          bt.row = that.row;
          bt.cid = that.idx.cid;
          bt.uid = that.idx.uid;
          bt.csize = that.idx.csize;

          if(that.idx.commodity!=null){
              var st = {
                cname : '',
                cprice : 1,
                cremain :'',
              };
              st.cname = that.idx.commodity.cname;
              st.cprice = that.idx.commodity.cprice;
              st.cremain = that.idx.commodity.cremain;
              bt.sum = bt.csize * st.cprice;
              bt.commodity =(st);
          }
          that.row +=1;
          // that.checkedCities.push(bt.row);
          that.cityOptions.push(bt.row);
          that.goods.push(bt);
        }
        // console.log(that.checkedCities);
      })
      .catch(function(error){
        console.error(error)
      })

    },
    handleChange(row) {
      setTimeout(() => {
      let that = this;
      var myRow = document.getElementsByClassName("css-body-item-select")[row].innerText;
      var myCid = document.getElementsByClassName("css-body-item-cid")[row].innerText;
      var myPrice = document.getElementsByClassName("css-body-item-price")[row].innerText;
      var myCsize = document.getElementsByClassName("el-input__inner")[row].value;
      that.goods[row].sum = myPrice * myCsize;
      var querystring = require('querystring');//Json数据查询器
      axios.post(that.rootURL +'/updateCart.do',
         querystring.stringify({
           cid : myCid,
           csize : myCsize,
         })
        )
        .then(function(res){

        })
        .catch(function(error){
          Message.error('不成功！');
        });

      }, 100);
    },
    handleCheckAllChange(event) {
      let that = this;
      this.checkedCities = event.target.checked ?  that.cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      //读取勾选的cid
      let that = this;
      that.itemCount = value.length;
      var tempTotal = 0;
      for( var i=0; i<value.length; i++ ){
        var my = document.getElementsByClassName("css-body-item-sum")[value[i]].innerText;
         tempTotal += Number(my.substr(2,my.length));
      }
      that.total = tempTotal;

    let checkedCount = value.length;
    this.checkAll = checkedCount === this.goods.length;
    this.isIndeterminate = checkedCount > 0 && checkedCount < this.goods.length;
    },
    shakes(e){
      e = (e.targetclassName= 'imgSmall')? e.target :null;
      if (!time) var time=650;
      if (!distance) var distance=4;
      var originalStyle=e.style.cssText;
      e.style.position='relative';
      var start=(new Date()).getTime();
      animate();
      function animate(){
        var now=(new Date()).getTime();
        var elapsed=now-start;
        var fraction=elapsed/time; //按下按钮后经过长度为time的时间后 还原，也就是说动画执行的时间
        if (fraction<1)
        {
         var x=distance*Math.sin(fraction*4*Math.PI);
          e.style.left=x+'px';
          setTimeout(animate,Math.min(25,time-elapsed));
        }
        else
        {
          e.style.cssText=originalStyle;
        }
      }
    },
    updateTotal(){
      setTimeout(() => {
      let that = this;
            var domList = document.getElementsByClassName("el-checkbox__inner");
            var count = 0;
            var rowIdx = [];
            for(var i=0 ; i<domList.length;i++){
              if(domList[i].offsetParent.className=='el-checkbox__input is-checked'){
                rowIdx.push(domList[i].offsetParent.lastChild.value);
              }
            }
            var tempTotal = 0;
            for( var i=0; i<rowIdx.length; i++ ){
              var my = document.getElementsByClassName("css-body-item-sum")[rowIdx[i]].innerText;
               tempTotal += Number(my.substr(2,my.length));
            }
            that.total = tempTotal;
          }, 100);
    }
  },
    created(){
      this.getCartList();
      this.getRecommendByUser();
    },

}
</script>

<style scoped lang="scss">

  .css-top {
    //float:left;
    margin-top: 10px;
    padding-left: 20px;
    font-size:20px;
    font-weight: bold;
    height:40px;
  }

  .css-title {
    width:100%;
    text-align: right;
    margin-top: 5px;
    .css-title-select {
      padding-right: 15px;
      background-color: red;
      float:left;
      width:5%;
    }
    .css-title-all {
      padding-right: 47px;
      float:left;
      width:10%;
    }
    .css-title-name {
      padding-right: 50px;
      float:left;
      width:20%;
    }
    .css-title-price {
      padding-right: 5px;
      float:left;
      width:27%;
    }
    .css-title-count {
      float:left;
      width:18%;
    }
    .css-title-sum {
      padding-right: 90px;
      float:left;
      width:27%;
    }
  }
  .el-card{
    margin: 0px;
  }
  .css-body {
    .css-body-item {
      margin-top: 5px;
      border-bottom: 1px solid black;
      width:860px;
      height:100px;
      padding: 10px 30px 10px 20px;
      text-align: right;
      .css-body-item-select {
        float: left;
        width:5%;
        height:70px;
        padding: 20px 30px 0px 0px;
      }
      .css-body-item-img {
        width: 100px;
        height: 70px;
        float: left;
        img {
          width: 100px;
          height: 70px;
        }
      }
      .css-body-item-name {
        float: left;
        width:19.7%;
        height:70px;
        text-align: center;
        padding: 20px 0px 0px 0px;
      }
      .css-body-item-cid {
        display: none
      }
      .css-body-item-price {
        float: left;
        width:15.6%;
        height:70px;
        text-align: center;
        padding: 20px 0px 0px 0px;
      }
      .css-body-item-count {
        float: left;
        width:21.7%;
        height:70px;
        padding: 20px 10px 0px 0px;
        .css-body-item-count-remain {
          font-size: 12px;
          color: rgba(#948f8f, 0.83);
          .css-body-item-count-remain-span {
            font-weight: bold;
          }
        }
      }
      .css-body-item-sum {
        overflow:hidden;
        line-height: 70px;
        float: left;
        width:15%;
        height:70px;
        color: red;
        text-align: center;
        font-weight: bold;
      }
      .css-body-item-delete {
        overflow:hidden;
        line-height: 70px;
        font-weight: bold;
      }
    }
  }

    .css-footer {
      margin-top: 10px;
      float: right;

      .css-footer-count {
        padding-top: 0px;
        line-height: 45px;
        width: 200px;
        height:35px;
        font-size: 16px;
        float:left;
        .css-footer-count-num {
          font-weight: bold;
          margin: 10px;
          color: red;
        }
      }

      .css-footer-sum {
        padding-top: 5px;
        width: 200px;
        height:35px;
        font-size: 22px;
        margin-right: 20px;
        float:left;
        .css-footer-sum-num {
          margin-left: 10px;
          font-weight: bold;
          color: red;
        }
      }
      .css-footer-btn {
        float:left;
      }
    }

     .updateInfo-box{
     	float: left;
     	border-radius: 4px;
    //  background:rgba(255, 255, 255,0.7);
       position:relative;
       left:100px;
     	padding:50px 50px 20px 50px;
      margin-left:-100px;
    //  margin-bottom: 20px;
      //box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);
     }

     .info-box{
      // float: left;
       border-radius: 4px;
       background:rgba(255, 255, 255,0.7);
       position:relative;
      //  left:150px;
        padding:50px 50px 60px 50px;
      // margin-left:-100px;
     //margin-bottom:30px;
      box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);
     }
     .resultList{
       /*border: 1px solid gray;*/
       background:rgba(255, 255, 255,0.7);
       width: 960px;
       min-height: 300px;
       margin: 0 auto;
       margin-top: 20px;
       padding: 10px 20px 10px 20px;
      //  background-color:rgba(247, 247, 247,0.2);
       -ms-filter:progid:DXImageTransform.Microsoft.Shadow(Strength=4, Direction=135, Color='#000000');  /* For IE 8 */
       filter: progid:DXImageTransform.Microsoft.Shadow(Strength=4, Direction=135, Color='#000000');  /* For IE 5.5 - 7 */
       -moz-box-shadow: -5px 0px 15px #D0D0D0,
       5px 0px 15px #D0D0D0;/* for firefox */
       -webkit-box-shadow: -5px 0px 15px #D0D0D0,
       5px 0px 15px #D0D0D0;/* for safari or chrome */
       box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);
       border-radius: 4px;
     }
     .appBTN {
       margin-left: -15px !important;
       background-color: #FC7500 !important;
         border: 0px solid #FC7500 !important;
       color:white !important;
     }
     .imgSmall {
        width: 180px;
        height:150px;
        display: block;
     }
</style>
