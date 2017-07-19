<template>
  <div style="width:860px;margin:0 auto;">
    <div class="css-top">我的购物车</div>
    <div class="clearfix"></div>
    <hr>
    <section>
      <div class="css-title">
        <div class="css-title-all">
          <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange">
          </el-checkbox>
        </div>
        <div class="css-title-name">商品信息</div>
        <div class="css-title-price">单价</div>
        <div class="css-title-count">数量</div>
        <div class="css-title-sum">小计&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
      </div>
    </section>
    <div class="clearfix"></div>

    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
      <section v-for="esingle in goods">
        <div class="css-body">
          <div class="css-body-item">
            <div class="css-body-item-select">
              <el-checkbox :key="esingle.cid"  :label="esingle.cid" ></el-checkbox>
            </div>
            <div class="css-body-item-img" style="">
              <img src="./../../assets/img/car9.jpg" />
            </div>
            <!-- {{esingle.commodity.cname}} -->
            <div class="css-body-item-name">{{esingle.row}}</div>
            <div class="css-body-item-price">{{esingle.commodity.cprice}}</div>
            <div class="css-body-item-count">
              <el-input-number size="small" v-model="esingle.csize" @change="handleChange()" :min="1" :max="99"></el-input-number>
            </div>
            <div class="css-body-item-sum">¥ {{esingle.sum}}</div>
          </div>
        </div>
      </section>

    </el-checkbox-group>
    <section>
      <div class="css-footer">
        <div class="css-footer-count">已选商品 <span class="css-footer-count-num">0</span>件</div>
        <div class="css-footer-sum">合计 ： <span class="css-footer-sum-num">¥ {{total}}</span></div>
        <div class="css-footer-btn"><el-button type="primary">去结算</el-button></div>
      </div>
    </section>
  </div>
</template>

<script>
// const cityOptions = ;

import axios from 'axios'
import config from './../../publicAPI/config'
import { Message } from 'element-ui';//信息提示框
import { Notification } from 'element-ui';

export default {
  data () {
    return {
      rootURL: config.JXURL,
      checked: false,

      goods: [],

      checkedCities: [],
      checkAll: false,
      isIndeterminate: true,

      row: 0,
      total: 0,

    }
  },
  methods: {
    getCartList(){
      let that = this;
      that.idx = '';
      that.row = 0 ;
      that.goods = [];
      axios.get(that.rootURL+'/queryCart.do')
      .then(function(res){
        for( that.idx of res.data ){
          var bt = {
            row : 0,
            cid : '',
            uid : '',
            csize : '',
            sum : 0,
            commodity : {},
          };
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
          that.goods.push(bt);
        }
        console.log(that.goods);
      })
      .catch(function(error){
        console.error(error)
      })

    },
    handleChange(value,idx) {
      // var myCid = ;
      // var myCsize = ;
      var target = document.activeElement;
      console.log(target.tagName);
      // let that = this
      // var querystring = require('querystring');//Json数据查询器
      // axios.post(that.rootURL +'/updateCart.do',
      //    querystring.stringify({
      //     //  cid : myCid,
      //     //  csize : myCsize,
      //    })//将参数放到查询器的查询函数里，这样传过去的json形式的参数才能被发现然后提取
      //   )
      //   .then(function(res){
      //   if(res.data.status){
      //     Notification.success({
      //               title: '注册成功！',
      //               message: res.data.msg,
      //               offset: 65,
      //                 duration:2000
      //             })
      //   } else {
      //     Notification.error({
      //               title: '注册失败！',
      //               message: res.data.msg,
      //               offset: 65,
      //                 duration:2000
      //             })
      //     // window.location = '#/tradeSystem/login'
      //   }
      //   })
      //   .catch(function(error){
      //     Message.error('注册不成功！');
      //   });
      // console.log(myCid,myCsize+1);
    },
    handleCheckAllChange(event) {
      this.checkedCities = event.target.checked ?  ['上海', '北京'] : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
    let checkedCount = value.length;
    this.checkAll = checkedCount === this.goods.length;
    this.isIndeterminate = checkedCount > 0 && checkedCount < this.goods.length;
    }
  },
    created(){
      this.getCartList()
    }
}
</script>

<style scoped lang="scss">

  .css-top {
    float:left;
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
      width:20%;
    }
    .css-title-count {
      float:left;
      width:20%;
    }
    .css-title-sum {
      padding-right: 90px;
      float:left;
      width:30%;
    }
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
      .css-body-item-price {
        float: left;
        width:21.6%;
        height:70px;
        text-align: center;
        padding: 20px 0px 0px 0px;
      }
      .css-body-item-count {
        float: left;
        width:21.7%;
        height:70px;
        padding: 20px 10px 0px 0px;
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
</style>
