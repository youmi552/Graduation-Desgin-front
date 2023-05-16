<template>
    <el-row class="tac" style="">
      <el-col :span="20" class="nav">
        <el-menu
          default-active="/personal"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          router
        >
        <el-menu-item index="/personal">
          <el-icon><HomeFilled /></el-icon>
          <span>个人信息</span>
          </el-menu-item>
          <el-menu-item index="/personal/collection">
            <el-icon><Grid /></el-icon>
            <span>收藏物品</span>
          </el-menu-item>
          <el-menu-item index="/personal/history">
            <el-icon><ShoppingCart /></el-icon>
            <span>浏览历史</span>
          </el-menu-item>
          <el-menu-item index="/personal/cart">
            <el-icon><ShoppingCart /></el-icon>
            <span>我的购物车</span>
          </el-menu-item>
          <el-menu-item index="/personal/order">
            <el-icon><List /></el-icon>
            <span>我的订单</span>
          </el-menu-item>
          <el-menu-item index="/personal/sell">
            <el-icon><List /></el-icon>
            <span>我卖出的</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </template>
  
  <script>
  import api from "../../../api"
    export default{
      data(){
        return{
          categoryList:"",
        }
      },
        methods:{
            handleOpen(){

            },
            handleClose(){
                
            }
        },
       
    }
  </script>

  <style scoped>
    .nav{
        margin-top: 15px;
    }

    </style>