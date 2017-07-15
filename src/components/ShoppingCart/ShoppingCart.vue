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
          @change="handleCheckAllChange">全选
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
      <el-checkbox :key="cities[0]"  :label="cities[0]" ></el-checkbox>
      <el-checkbox :key="cities[1]"  :label="cities[1]" ></el-checkbox>
    </el-checkbox-group>

      <section>
        <div class="css-body">
          <div class="css-body-item">
            <div class="css-body-item-img" style="">
              <img src="./../../assets/img/car9.jpg" />
            </div>
            <div class="css-body-item-name">汽车</div>
            <div class="css-body-item-price">汽车</div>
            <div class="css-body-item-count">
              <el-input-number size="small" v-model="count" @change="handleChange" :min="1" :max="99"></el-input-number>
            </div>
            <div class="css-body-item-sum">¥ 29.99</div>
          </div>
        </div>
      </section>
      <section>
        <div class="css-body">
          <div class="css-body-item">
            <div class="css-body-item-img" style="">
                <img src="./../../assets/img/car9.jpg" />
            </div>
            <div class="css-body-item-name">汽车</div>
            <div class="css-body-item-price">汽车</div>
            <div class="css-body-item-count">
              <el-input-number size="small" v-model="count" @change="handleChange" :min="1" :max="99"></el-input-number>
            </div>
            <div class="css-body-item-sum">¥ 29.99</div>
          </div>
        </div>
      </section>

    <section>
      <div class="css-footer">
        <div class="css-footer-sum">合计 ： <span class="css-footer-sum-num">¥ 99999.00</span></div>
        <div class="css-footer-btn"><el-button type="primary">确认订单</el-button></div>
      </div>
    </section>
  </div>
</template>

<script>
const cityOptions = ['上海', '北京', '广州', '深圳'];

export default {
  data () {
    return {
      count: 2,
      checked: false,

      cities: cityOptions,

      checkedCities: [],
      checkAll: false,
      isIndeterminate: true,
    }
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    handleCheckAllChange(event) {
      this.checkedCities = event.target.checked ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
    let checkedCount = value.length;
    this.checkAll = checkedCount === this.cities.length;
    this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    }
  }
}
</script>

<style scoped lang="scss">

  .css-footer {
    margin-top: 10px;
    float: right;
    .css-footer-sum {
      padding-top: 5px;
      width: 200px;
      height:35px;
      font-size: 22px;
      margin-right: 20px;
      float:left;
      .css-footer-sum-num {
        margin-left: 10px;
        color: red;
      }
    }
    .css-footer-btn {
      float:left;
      background-color: green;
    }
  }
  .css-top {
    float:left;
    font-size:20px;
    font-weight: bold;
    height:40px;
  }
  .css-body {
    .css-body-item {
      margin-top: 5px;
      border-bottom: 1px solid black;
      width:860px;
      height:100px;
      padding: 10px 30px 10px 30px;
      text-align: right;
      .css-body-item-img {
        width: 70px;
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
        padding: 20px 30px 0px 0px;
      }
      .css-body-item-price {
        float: left;
        width:21.6%;
        height:70px;
        padding: 20px 55px 0px 0px;
      }
      .css-body-item-count {
        float: left;
        width:21.7%;
        height:70px;
        padding: 20px 0px 0px 0px;
      }
      .css-body-item-sum {
        overflow:hidden;
        line-height: 70px;
        float: left;
        width:28%;
        height:70px;
        color: red;
        text-align: center;
        font-weight: bold;
      }
    }
  }
  .css-title {
    width:100%;
    text-align: right;
    margin-top: 5px;
    .css-title-all {
      padding-right: 15px;
      float:left;
      width:15%;
    }
    .css-title-name {
      padding-right: 15px;
      float:left;
      width:15%;
    }
    .css-title-price {
      padding-right: 55px;
      float:left;
      width:20%;
    }
    .css-title-count {
      padding-right: 55px;
      float:left;
      width:20%;
    }
    .css-title-sum {
      padding-right: 90px;
      float:left;
      width:30%;
    }
  }

</style>
