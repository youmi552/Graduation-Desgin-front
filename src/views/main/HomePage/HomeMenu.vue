<template>
    <el-row class="tac" style="">
      <el-col :span="20" class="nav">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          router
          :default-openeds="openeds"
        >
        <el-menu-item index="/">
          <el-icon><HomeFilled /></el-icon>
          <span>首页</span>
          </el-menu-item>
          <el-menu-item index="/products">
            <el-icon><Grid /></el-icon>
            <span>全部物品</span>
          </el-menu-item>
          <el-sub-menu index="1">
            <template #title>
              <el-icon><Menu /></el-icon>
            <span>物品分类</span>
          </template>
            <el-menu-item  v-for="(item, index) in categoryList" :key="index" :index="'/category/'+item.cid">{{item.CName}}</el-menu-item>
          </el-sub-menu>
          <!-- <el-menu-item index="/cart">
            <el-icon><ShoppingCart /></el-icon>
            <span>我的购物车</span>
          </el-menu-item>
          <el-menu-item index="/products">
            <el-icon><List /></el-icon>
            <span>我的订单</span>
          </el-menu-item> -->
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
          openeds:['1'],
        }
      },
        methods:{
            handleOpen(){

            },
            handleClose(){
                
            }
        },
        mounted:function(){
          api.getAllCategorys().then(res=>{
          this.categoryList=res.data.data
      })
        }
    }
  </script>

  <style scoped>
    .nav{
        margin-top: 15px;
    }

    </style>