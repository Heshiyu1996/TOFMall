<template>
  <div>
    <el-form :model="Form_ChangePassword"
    :rules="rules" ref="Form_ChangePassword"
    label-width="250px"
    class="demo-Form_ChangePassword">
      <div class="updateInfo-box">
        <div style="margin-bottom:16px;width:100%">
          <h4 style="margin-left:-10px;float:left;">修改密码</h4>
        </div>
        <div class="errorM" style="margin:0;color:#FF4949;"></div>
        <div style="height:40px;">
          <el-form-item label="密码" prop="password">
            <el-input  type="password" v-model="Form_ChangePassword.password"></el-input>
          </el-form-item>
        </div>


        <div style="height:40px;">
          <el-form-item label="确认密码" prop="passConf">
            <el-input  type="password" v-model="Form_ChangePassword.passConf"></el-input>
          </el-form-item>
        </div>

        <div style="margin-left:40px;width:100%;">
            <el-form-item>
              <el-button type="primary" @click="submitForm('Form_ChangePassword')">修改</el-button>
              <el-button @click="resetForm('Form_ChangePassword')">重置</el-button>
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
      var validatePass2 = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请再次输入密码'));
    } else if (value !== this.Form_ChangePassword.password) {
      callback(new Error('两次输入密码不一致!'));
    } else {
      callback();
    }
  };
    return{
        rootURL:config.URL,
        Form_ChangePassword: {
            password: '',
            passConf: '',
          },
          rules: {    password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
                {  min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }
              ],
              passConf: [
                { required: true, message: '请再次输入密码', trigger: 'blur' },
                { validator: validatePass2, trigger: 'blur' }
              ],
          },
    }
  },
  methods:{
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

      submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
                        var querystring = require('querystring');//Json数据查询器
              let that = this
              axios.post(config.URL+'/user/addUser',
                 querystring.stringify({
                   username:this.Form_ChangePassword.username,
                   type:1,
                   password:this.Form_ChangePassword.password,
                   phone:this.Form_ChangePassword.phone,
                   email:this.Form_ChangePassword.email
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
