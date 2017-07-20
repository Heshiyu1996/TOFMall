<template>
  <div style="width:860px;margin:0 auto;">
    <div class="css-orderDetail">
      <div class="css-top">订单详情</div>
      <div class="clearfix"></div>
      <hr>
      <section>
        <div class="css-title">
          <div class="css-title-name">商品信息</div>
          <div class="css-title-price">单价</div>
          <div class="css-title-count">数量</div>
          <div class="css-title-sum">小计&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
        </div>
      </section>
      <div class="clearfix"></div>
        <section v-for="esingle in goods">
          <div class="css-body">
            <div class="css-body-item">
              <div class="css-body-item-select">
              </div>
              <div class="css-body-item-img" style="">
                <img src="./../../assets/img/car9.jpg" />
              </div>
              <div class="css-body-item-name">{{esingle.cname}}</div>
              <div class="css-body-item-price">{{esingle.cprice}}</div>
              <div class="css-body-item-count">
                {{esingle.csize}}
              </div>
              <div class="css-body-item-sum">¥ {{esingle.sum}}</div>
            </div>
          </div>
        </section>
    </div>
    <div class="css-address">收货地址
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="详细地址：" prop="address">
          <el-col :span="12">
            <div
               class="css-address-item"
            >{{form.address}}</div>
          </el-col>
        </el-form-item>

        <el-form-item label="邮编：" prop="ecode">
          <div  class="css-address-item">{{form.ecode}}</div>
        </el-form-item>

        <el-form-item label="收货人：" prop="name">
          <div  class="css-address-item">{{form.name}}</div>
        </el-form-item>

        <el-form-item label="联系电话：" prop="phone">
          <div  class="css-address-item">{{form.phone}}</div>
        </el-form-item>

        <el-form-item label="创建时间：" prop="stime">
          <div  class="css-address-item">{{form.stime}}</div>
        </el-form-item>

        <el-form-item label="结束时间：" prop="etime">
          <div  class="css-address-item">{{form.etime}}</div>
        </el-form-item>
      </el-form>
    </div>

    <section>
      <div class="css-footer">
        <div class="css-footer-back">

            <router-link to="/userIndex/order">
            <el-button type="primary" icon="arrow-left" >返回订单列表</el-button>
          </router-link>
        </div>
        <div class="css-footer-sum">合计 ： <span class="css-footer-sum-num">¥ {{total}}</span></div>
        <!-- <div class="css-footer-btn"><el-button type="primary">确认订单</el-button></div> -->
      </div>
    </section>
  </div>
</template>

<script>
// const cityOptions = ;

import axios from 'axios'
import config from './../../publicAPI/config'
export default {
  data () {
    return {
      rootURL: config.JXURL,
      count: 2,
      count2: 3,
      C:'',
      goods: [],
      form: {
        address: '',
        ecode: '',
        name: '',
        phone: '',
        stime: '',
        etime: '',
      },
      total:0,
      myCname : '',
      myCprice : 0,
    }
  },
  methods: {
    getOrderDetail(){
      var querystring = require('querystring');
      let that = this
      that.goods = [];
      axios.post(that.rootURL +'/queryOrderMySelf.do',
         querystring.stringify({
           oid:that.C,
         })//将参数放到查询器的查询函数里，这样传过去的json形式的参数才能被发现然后提取
        )
        .then(function(res){
        if(res.data){
          var myInfos = [];
          for(var item of res.data.infos){
              var bt = {
                cid    :  item.cid,
                cname  :  '',
                cprice :  '',
                csize  :  item.csize,
              };
            // console.log(item)
                      axios.get(that.rootURL+'/getGoodsByCid.do?cid=' + item.cid)
                      .then(function(response){
                        var ite = response.data
                        bt.cname = ite.cname;
                        bt.cprice = ite.cprice;
                        console.log(bt.cprice);
                      })
                      .catch(function(error){
                        console.error(error)
                      })

              console.log(bt);
              that.goods.push(bt);
          }

          that.form.address = res.data.oaddress ;
          that.form.ecode = res.data.opostcode ;
          that.form.name = res.data.oname ;
          that.form.phone = res.data.ophone ;
          that.form.stime = res.data.ostime ;
          that.form.etime = res.data.oetime ;
          that.total = res.data.ototalprice ;
          // console.log(that.goods)
        } else {

        }
        })
        .catch(function(error){
          Message.error('不成功！');
        });
    },
    hsytt(){
      let that = this ;
      that.C= that.$route.params.newOrderID;
      this.getOrderDetail();
    },
  },
  created(){
    let that = this ;
    that.C= that.$route.params.newID;
    that.hsytt();
  },
  watch:{
    '$route':'hsytt'
  }
}
</script>

<style scoped lang="scss">

  .css-top {
    float:left;
    font-size:20px;
    font-weight: bold;
    height:40px;
    padding-left: 15px;
  }
  .css-title {
    width:100%;
    text-align: right;
    margin-top: 5px;
    .css-title-select {
      padding-right: 15px;
      float:left;
      width:5%;
    }

    .css-title-name {
      padding-right: 5px;
      float:left;
      width:30%;
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
      width:100%;
      height:100px;
      padding: 10px 30px 10px 20px;
      text-align: right;
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
        width:24.7%;
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
        text-align: center;
        width:21.7%;
        height:70px;
        padding: 20px 0px 0px 0px;
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
      width: 100%;
      float: right;
      .css-footer-back {
        float: left;
        padding-top: 0px;
        width: 55%;
        .css-footer-back-div {
          float: left;
          margin-left: 5px;
          line-height: 15px;
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


      .css-orderDetail,.css-payMethod{

        float: left;
        width:100%;
        font-size:20px;
        font-weight: bold;
        border: 1px solid #eaeefb;
        border-radius: 4px;
        transition: .2s;
        padding: 10px 20px;
        margin: 10px 0px;
        .css-orderDetail-input {
          width:500px;
        }
      }

      .css-payMethod {
          width:25%;
          float: right;
          .css-payMethod-body {
            margin: 10px;
            padding: 30px 0px;
            .css-payMethod-body-methods {
              margin-bottom: 10px;
            }
          }
      }

            .css-address,.css-payMethod{

              float: left;
              width:74%;
              font-size:20px;
              font-weight: bold;
              border: 1px solid #eaeefb;
              border-radius: 4px;
              transition: .2s;
              padding: 10px 20px;
              margin: 10px 0px;
              .css-address-item {
                height:30px;
                border-bottom: 1px solid #cccccc;
              }
              .css-address-input {
                width:500px;
              }
            }


</style>
