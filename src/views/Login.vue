<template>
    <div class="login">
      <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>校园二手交易平台</span>
        <!-- <el-button class="button" text></el-button> -->
      </div>
    </template>
    <!-- <div v-for="o in 4" :key="o" class=" text item">{{ 'List item ' + o }}</div> -->
    <div class="text item">
      <el-tabs v-model="currentIndex"  stretch @tab-click="handleTabsClick">
        <!-- 登录 -->
        <el-tab-pane label="登录" name="login">
          <el-form :model="loginForm" status-icon ref="loginForm" :rules="rules" >
              <el-form-item label="用户名" label-width="70px" label-position="right" prop="username">
                <el-input type="text" v-model="loginForm.username"/>
              </el-form-item>
              <el-form-item label="密码" label-width="70px" label-position="right" prop="password">
                <el-input type="password" v-model="loginForm.password"/>
              </el-form-item>
              <!-- <el-form-item label="密码" label-width="70px">
                <el-input type="password" v-model="loginForm.password"/>
              </el-form-item> -->
              <el-form-item label-width="200px">
                <el-button type="primary" @click="submitForm('loginForm')" >提交</el-button>
              </el-form-item>
          </el-form>
        </el-tab-pane>
        <!-- 电话号码登录 -->
        <el-tab-pane label="电话号码登录" name="loginByPhoneNumber">
          <el-form :model="loginByPhoneNumberForm" status-icon ref="loginByPhoneNumberForm" :rules="rules" >
            <el-form-item label="电话号码" label-width="70px" prop="phoneNumber">
                <el-input type="text" v-model="loginByPhoneNumberForm.phoneNumber" style="width: 280px"/>
                <el-button  :disabled="disabled" @click="getCode('loginByPhoneNumberForm')">{{ valiBtn }}</el-button>
              </el-form-item>
              <el-form-item label="验证码" label-width="70px" label-position="right" prop="code">
                <el-input type="text" v-model="loginByPhoneNumberForm.code"/>
              </el-form-item>
              <el-form-item label-width="200px">
                <el-button type="primary" @click="submitForm('loginByPhoneNumberForm')" >提交</el-button>
              </el-form-item>
          </el-form>
        </el-tab-pane>
        <!-- 注册 -->
        <el-tab-pane label="注册" name="register">
          <el-form :model="registerForm" status-icon ref="registerForm" :rules="rules" >
              <el-form-item label="用户名" label-width="70px" label-position="right" prop="username">
                <el-input type="text" v-model="registerForm.username"/>
              </el-form-item>
              <el-form-item label="密码" label-width="70px" label-position="right" prop="password">
                <el-input type="password" v-model="registerForm.password"/>
              </el-form-item>
              <el-form-item label="确认密码" label-width="70px" prop="confirmPassword">
                <el-input type="password" v-model="registerForm.confirmPassword"/>
              </el-form-item>
              <el-form-item label="电话号码" label-width="70px" prop="phoneNumber">
                <el-input type="text" v-model="registerForm.phoneNumber" style="width: 280px"/>
                <el-button  :disabled="disabled" @click="getCode('registerForm')">{{ valiBtn }}</el-button>
              </el-form-item>
              <el-form-item label="验证码" label-width="70px" label-position="right" prop="code">
                <el-input type="text" v-model="registerForm.code"/>
              </el-form-item>
              <el-form-item label-width="200px">
                <el-button type="primary" @click="submitForm('registerForm')" >提交</el-button>
              </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs> 
    </div>
  </el-card>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src


import api from "../api"
import { mapMutations } from "vuex";


  
  export default {
    data(){
      //用户名验证规则
     var validateUserName = (rule,value,callback) =>{
      if(value === ''){
        callback(new Error("请输入用户名"));
      }else if(value.length<2){
        callback(new Error("长度不够"));
      } else{
        callback();
      }
     }
     //密码验证规则
     var validatePassword = (rule,value,callback) =>{
      if(value === ''){
        callback(new Error("请输入密码"));
      } else{
        callback();
      }
     }
     //确认密码规则
     var validateConfirmPassword = (rule,value,callback) =>{
      if(value === ''){
        callback(new Error("请重复输入密码"));
      }else if(value!==this.registerForm.password){
          callback(new Error("两次密码输入不一致！"))
      } else{
        callback();

      }
     }
     //电话验证格式规则
     var validatePhoneNumber = (rule, value, callback) => {
      const phoneReg = /^1[345789]\d{9}$$/;
      if (!value) {
        return callback(new Error("电话号码不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (phoneReg.test(value)) {
            callback();
          } else {
            callback(new Error("电话号码格式不正确"));
          }
        }
      }, 100);
    }
    //验证码格式规则
    var validateCode= (rule,value,callback) =>{
      if(value === ''){
        callback(new Error("请输入验证码"));
      }else if(value.length!==5){
        callback(new Error("验证码只能是五位"));
      }else{
        callback();
      }
     }
      return{
        currentIndex:"login",
        loginForm:{
          username:"",
          password:"",
        },
        loginByPhoneNumberForm:{
          phoneNumber:"",
          code:"",
        },
        registerForm:{
          username:"",
          password:"",
          confirmPassword:"",
          phoneNumber:"",
          code:"",
        },
        activeTab:"login",
        valiBtn: '获取验证码',
			  disabled: false,
        rules:{
          username:[
            {
              validator:validateUserName,trigger:"blur" //失去焦点触发
            } 
          ],
          password:[
            {
              validator:validatePassword,trigger:"blur" //失去焦点触发
            } 
          ],
          confirmPassword:[
            {
              validator:validateConfirmPassword,trigger:"blur"
            }
          ],
          phoneNumber:[
            {
              validator:validatePhoneNumber,trigger:"blur"
            }
          ],
          code:[
            {
              validator:validateCode,trigger:"blur"
            }
          ],
        }
      }
    },
    
    methods:{
      ...mapMutations("login",["setUser"]),
      login(res){
        if(res.data.code===200){
                  this.$notify({
                    title: '登录成功',
                    message: '欢迎你,'+res.data.data.userInfo.username,
                    type: 'success',
                  });
                  this.setUser(res.data);
                  localStorage.setItem("ego",JSON.stringify(res.data))
                  api.setToken()
                  this.$router.push('/')
                }else{
                  this.$notify.error({
                    title: '登录失败',
                    message: res.data.data,
                  });
                }
      },
      register(res){
        if(res.data.code===200){
                  this.$notify({
                    title: '注册成功',
                    type: 'success',
                  });
                  // this.setUser(res.data);
                  // localStorage.setItem("ego",JSON.stringify(res.data))
                  // this.$router.push('/login')
                  this.currentIndex="login"
                }else{
                  this.$notify.error({
                    title: '注册失败',
                    message: res.data.data,
                  });
                }
      },
      submitForm(formName){
        this.$refs[formName].validate((valid)=>{
          if(valid){
            if(this.activeTab==="login"){
              //登录
              api.login(this.loginForm).then(res =>{
                this.login(res)
              })
            }
            if(this.activeTab==="loginByPhoneNumber"){
              //电话登录
              api.loginByPhoneNumber(this.loginByPhoneNumberForm).then(res =>{
                this.login(res)
              })
            }
            if(this.activeTab==="register"){
              //注册
              api.register(this.registerForm).then(res =>{
                this.register(res)
              })
            }
          }else{
            return;
          }
        });
      },

      handleTabsClick(tab){
        console.log(tab.props.name)
        this.activeTab = tab.props.name
      },
      //获取验证码 并只验证手机号 是否正确
		getCode(formName) {
			this.$refs[formName].validateField('phoneNumber', (err) => {
				if (err===false) {
					return;
				} else {
          if(this.activeTab==="loginByPhoneNumber"){
              //登录
              api.getCodeByPhoneNumber(this.loginByPhoneNumberForm.phoneNumber).then(res =>{
                if (res.data.code===200) {
                  console.log(res.data)
                }
              })
            }
            if(this.activeTab==="register"){
              //注册
              api.getCodeByPhoneNumber(this.registerForm.phoneNumber).then(res =>{
                console.log(res.data)
              })
            }
					// console.log(this.form.phone)
					this.tackBtn();   //验证码倒数60秒
				}
			})
		},
		tackBtn() {       //验证码倒数60秒
			let time = 60;
			let timer = setInterval(() => {
				if (time == 0) {
					clearInterval(timer);
					this.valiBtn = '获取验证码';
					this.disabled = false;
				} else {
					this.disabled = true;
					this.valiBtn = time + '秒后重试';
					time--;
				}
			}, 1000);
		},
    }
  }
  </script>

<style scoped >
.login {
width: 1200px;
margin: 0 auto;
}

.box-card {
  width: 500px;
  margin: 100px auto;
}
</style>