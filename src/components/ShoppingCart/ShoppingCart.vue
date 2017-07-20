<template>
  <div class="updateInfo-box">
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
          <div class="css-title-sum">小计&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
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
                <img src="./../../assets/img/car9.jpg" />
              </div>
              <!-- {{esingle.commodity.cname}} -->
              <div class="css-body-item-name">{{esingle.commodity.cname}}</div>
              <div class="css-body-item-cid">{{esingle.cid}}</div>

              <div class="css-body-item-price">{{esingle.commodity.cprice}}</div>
              <div class="css-body-item-count">
                <el-input-number size="small" v-model="esingle.csize" @change="handleChange(esingle.row)" :min="1" :max="999"></el-input-number>
                <div class="css-body-item-count-remain">剩余库存：<span class="css-body-item-count-remain-span" controls=false>{{esingle.commodity.cremain}}</span> 件</div>
                </div>
              <div class="css-body-item-sum">¥ {{esingle.sum}}</div>
            </div>
          </div>
        </section>

      </el-checkbox-group>
      <section>
        <div class="css-footer">
          <div class="css-footer-count">已选商品 <span class="css-footer-count-num">{{itemCount}}</span>件</div>
          <div class="css-footer-sum">合计 ： <span class="css-footer-sum-num">¥ {{total}}</span></div>
          <div class="css-footer-btn"><el-button type="primary" @click="goToPay()">去结算</el-button></div>
        </div>
      </section>
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

      that.$router.push({path:'/order'})


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
        // instance.confirmButtonLoading = false;
      console.log(123213)
      let that = this;
      var myRow = document.getElementsByClassName("css-body-item-select")[row].innerText;
      var myCid = document.getElementsByClassName("css-body-item-cid")[row].innerText;
      var myPrice = document.getElementsByClassName("css-body-item-price")[row].innerText;
      var myCsize = document.getElementsByClassName("el-input__inner")[row].value;
      // document.getElementsByClassName("css-body-item-sum")[row].innerText = myPrice * myCsize;
      that.goods[row].sum = myPrice * myCsize;
      // console.log(myCsize);
      var querystring = require('querystring');//Json数据查询器
      axios.post(that.rootURL +'/updateCart.do',
         querystring.stringify({
           cid : myCid,
           csize : myCsize,
         })//将参数放到查询器的查询函数里，这样传过去的json形式的参数才能被发现然后提取
        )
        .then(function(res){

        })
        .catch(function(error){
          Message.error('不成功！');
        });

      }, 100);
    },
    handleCheckAllChange(event) {
      // console.log(document.getElementsByClassName("css-body-item-select").length);
      // console.log(event)
      let that = this;
      this.checkedCities = event.target.checked ?  that.cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      //读取勾选的cid
      // console.log(value)
      console.log(232323232323)
      let that = this;
      that.itemCount = value.length;
      // console.log(value.length)
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
    updateTotal(){
      setTimeout(() => {
      let that = this;
            var domList = document.getElementsByClassName("el-checkbox__inner");
            var count = 0;
            var rowIdx = [];
            for(var i=0 ; i<domList.length;i++){
              // console.log(domList[i].offsetParent.className)
              if(domList[i].offsetParent.className=='el-checkbox__input is-checked'){
                // console.log(domList[i].offsetParent.lastChild.value)
                rowIdx.push(domList[i].offsetParent.lastChild.value);
              }
            }
            var tempTotal = 0;
            for( var i=0; i<rowIdx.length; i++ ){
              var my = document.getElementsByClassName("css-body-item-sum")[rowIdx[i]].innerText;
               tempTotal += Number(my.substr(2,my.length));
            }
            that.total = tempTotal;
            console.log(tempTotal)

          }, 100);
    }
  },
    created(){
      this.getCartList()
    },

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
      .css-body-item-cid {
        display: none
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
     	background:rgba(255, 255, 255,0.7);
       position:relative;
       left:150px;
     	padding:50px;
      margin-left:-100px;
      margin-top:100px;
     	box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);
     }
</style>
