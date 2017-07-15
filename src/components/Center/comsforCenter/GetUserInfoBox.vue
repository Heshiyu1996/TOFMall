<template>
  <div>
    <el-form :model="Form_Userinfo" ref="Form_Userinfo" label-width="110px" class="demo-Form_Userinfo">
      <div class="updateInfo-box">
        <div style="margin-bottom:16px;width:100%">
          <h4 style="margin-left:-10px;float:left;">我的个人信息</h4>
        </div>
        <div class="errorM" style="margin:0;color:#FF4949;"></div>
        <!-- <div style="height:40px;margin-left:-15px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="Form_Userinfo.username"></el-input>
          </el-form-item>
        </div> -->
        <!-- <div style="height:40px;margin-left:-15px">
          <el-form-item label="密码" prop="password">
            <el-input  type="password" v-model="Form_Userinfo.password"></el-input>
          </el-form-item>
        </div> -->

        <div style="height:40px;margin-left:-15px ">
          <el-form-item label="邮箱" prop="email">
            <!-- <el-input v-model="Form_Userinfo.email"></el-input> -->
            <el-input
              :placeholder="test"
              v-model="Form_Userinfo.email"
              :disabled="true">
            </el-input>
          </el-form-item>
        </div>

        <div style="height:40px;margin-left:-15px">
          <el-form-item label="邮编" prop="ecode">
            <!-- <el-input v-model="Form_Userinfo.ecode"></el-input> -->
            <el-input
              placeholder="请输入内容"
              v-model="Form_Userinfo.ecode"
              :disabled="true">
            </el-input>
          </el-form-item>
        </div>
        <div style="height:40px;margin-left:-15px">
          <el-form-item label="收货地址" prop="address">
            <!-- <el-input v-model="Form_Userinfo.address"></el-input> -->
            <el-input
              placeholder="请输入内容"
              v-model="Form_Userinfo.address"
              :disabled="true">
            </el-input>
          </el-form-item>
        </div>
        <div style="height:40px;margin-left:-15px">
          <el-form-item label="联系电话" prop="phone">
            <!-- <el-input v-model="Form_Userinfo.phone"></el-input> -->
            <el-input
              placeholder="请输入内容"
              v-model="Form_Userinfo.phone"
              :disabled="true">
            </el-input>
          </el-form-item>
        </div>
        <div style="height:40px;margin-left:-15px">
          <el-form-item label="真实姓名" prop="realName">
            <!-- <el-input v-model="Form_Userinfo.realName"></el-input> -->
            <el-input
              placeholder="请输入内容"
              v-model="Form_Userinfo.realName"
              :disabled="true">
            </el-input>
          </el-form-item>
        </div>
        <div style="height:40px;margin-left:-15px">
          <el-form-item label="身份证号" prop="idCard">
            <!-- <el-input v-model="Form_Userinfo.idCard"></el-input> -->
            <el-input
              placeholder="请输入内容"
              v-model="Form_Userinfo.idCard"
              :disabled="true">
            </el-input>
          </el-form-item>
        </div>

      </div>
    </el-form>
  </div>
</template>

<script>

import axios from 'axios'
import config from './../../../publicAPI/config'

import { Notification } from 'element-ui';
export default {
  components: {
  },
  data(){
    return{
        rootURL:config.URL,
        test:'hshs',
        Form_Userinfo: {
            isUpdate: false,
            email:'',
            address:'',
            realName:'',
            ecode:'',
            phone:'',
            idCard: '',
          },
    }
  },
  methods:{

      submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
                        var querystring = require('querystring');//Json数据查询器
              let that = this
              axios.post(config.URL+'/user/addUser',
                 querystring.stringify({
                   username:this.Form_Userinfo.username,
                   type:1,
                   password:this.Form_Userinfo.password,
                   phone:this.Form_Userinfo.phone,
                   email:this.Form_Userinfo.email
                 })//将参数放到查询器的查询函数里，这样传过去的json形式的参数才能被发现然后提取
                )
                .then(function(res){
                if(res.data.status=="fail")
                  Notification.error({
                            title: '注册失败！',
                            message: res.data.msg,
                            offset: 65,
                              duration:2000
                          })
                else{
                  alert('注册成功！')
            window.location = '#/tradeSystem/login'

                }
                    // localStorage.setItem('tokennum_test',res.data[1].obj.tokennum)
                })
                .catch(function(error){
                  console.error('注册不成功！');

                  Message.error('注册不成功！');

                });





            } else {
              console.log('提交错误!请保存您的信息！');
              return false;
            }
          });
        },
  }
}

</script>

<style scoped>
 .updateInfo-box{
 	width: 700px;
 	height: 350px;
 	float: left;
 	border-radius: 4px;
 	background: #fff;
 	padding:20px;
  margin-right:10px;
 	box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);
 }

 .updateInfo-box>div{
 	margin: 12px 0;
  margin-left: 20px;
 	float: left;
 }

 .updateInfo-box h4{
 	color: #555;
 	font-weight: bold;
 }

 .updateInfo-box b{
 	width: 40px;
 	height: 40px;
 	display: inline-block;
 	float: left;
 	border: 1px solid #aaa;
 	border-right: none;
 	border-radius: 2px 0 0 2px;
 	text-align: center;
 }

 .updateInfo-box b span{
 	font-size: 20px;
 	color:  #377ab7;
 }

 .updateInfo-box input[type="text"],
 .updateInfo-box input[type="password"]{
 	width: 240px;
 	height: 40px;
 	float: left;
 	border: 1px solid #aaa;
 	outline: none;
 	border-radius: 0 2px 2px 0;
 	padding: 3px 10px;
 	// color:#606B70;
 	color: #555;
 }

 .updateInfo-box input[type="text"]:focus,
 .updateInfo-box input[type="password"]:focus{
 	border: 1px solid #20A0FF;
 }

 .updateInfo-box input[type="checkbox"]{
 	width: 16px;
 	height: 16px;
 	float: left;
 	border: 1px solid #000;
 }

 .updateInfo-box label{
 	font-weight: normal;
 	color:#606B70;
 }


div>span{
  font-size: 14px;
  color:rgba(76, 84, 85, 1);
}
</style>
