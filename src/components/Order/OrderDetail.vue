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
        <section>
          <div class="css-body">
            <div class="css-body-item">
              <div class="css-body-item-select">
              </div>
              <div class="css-body-item-img" style="">
                <img src="./../../assets/img/car9.jpg" />
              </div>
              <div class="css-body-item-name">汽车</div>
              <div class="css-body-item-price">汽车</div>
              <div class="css-body-item-count">
                2
              </div>
              <div class="css-body-item-sum">¥ 29.99</div>
            </div>
          </div>
        </section>
    </div>




    <section>
      <div class="css-footer">
        <div class="css-footer-back">

            <router-link to="/ShoppingCart">
            <el-button type="primary" icon="arrow-left" >返回购物车</el-button>
          </router-link>
        </div>
        <div class="css-footer-sum">合计 ： <span class="css-footer-sum-num">¥ 99999.00</span></div>
        <div class="css-footer-btn"><el-button type="primary">确认订单</el-button></div>
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
      count: 2,
      count2: 3,
    }
  },
  methods: {
    getOrderInfo(){
      // console.log(localStorage.getItem('myUrl'));
      axios.get(that.rootURL+'/queryCart.do')
      .then(function(res){

      })
      .catch(function(error){
        console.error(error)
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleSelect(item) {
      console.log(item);
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleChange(value) {
      console.log(value);
    }
  },
  created(){
    this.getOrderInfo();
  },
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


</style>
