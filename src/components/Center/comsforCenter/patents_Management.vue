<template>
  <div style="margin-top:-30px;">
    <div class="hint"></div>
    <div class="bodyBG">
    <div class="middle">
      <div style="margin-top:-20px">
      <el-tabs v-model="activeName" @tab-click="handleClick">

        <el-tab-pane label="发布技术" name="first">
          1
        </el-tab-pane>

        <el-tab-pane label="出售技术" name="second">
        2
        </el-tab-pane>


      </el-tabs>
    </div>
    </div>
</div>
  </div>
</template>

<script>
  import axios from 'axios'
  import config from './../../../publicAPI/config'
  import { Message } from 'element-ui';//信息提示框


  export default {
    components: {
    },
    data() {
      return {
        activeName: 'first',
        ruleForm: {
          money: '',
        },
        rules: {
          money: [
            { required: true, message: '请输入充值金额', trigger: 'blur' },
            // { min: 10, max: 20, message: '长度在 10 到 20 个字符', trigger: 'blur' }用不用限制金额？
          ],
        },
        show_sell:false,
        show_publishing:false,
        show_selling:false,
        show_sellingAuc:false,
        show_SellerRecord:false,
        show_SellerAnswer:false
    };
  },
  methods: {
    handleClick(tab, event) {
        let that = this
       if(tab.label=='出售技术'){
         that.show_sell = true;
     }else{
         that.show_sell = false;
     }

     if(tab.label=='未上架的技术'){
      that.show_publishing = true;
     }else{
      that.show_publishing = false;
     }

     if(tab.label=='我的回答'){
       that.show_SellerAnswer = true;
   }else{
       that.show_SellerAnswer = false;
   }

      if(tab.label=='出售中的技术'){
        that.show_selling = true;
    }else{
        that.show_selling = false;
    }
    if(tab.label=='出售中的拍卖'){
      that.show_sellingAuc = true;
  }else{
      that.show_sellingAuc = false;
  }
              if(tab.label=='订单记录（卖家）'){
                that.show_SellerRecord = true;
            }else{
                that.show_SellerRecord = false;
            }
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
<style scoped>
  .el-submenu .el-menu-item{
    height: 35px;
    line-height: 35px;
  }
  .bodyBG{
    min-height: 538px;
    width:1000px;
    margin:0 auto
  }
  .middle{
    padding-top:20px;
    min-height: 608px;
    width: 1000px;
    background-color: rgba(218,230,244,0.9);/*#dae6f4*/
  }
  .hint{
    width: 100%;
    height:50px;
  }
  .el-tab-pane{
    margin: 40px 300px;
  }
  .el-form-item{
    margin-bottom: 30px;
  }

</style>
