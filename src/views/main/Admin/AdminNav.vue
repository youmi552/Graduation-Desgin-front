<template>
    <el-row class="tac" style="">
      <el-col :span="20" class="nav">
        <el-menu
          default-active="/admin"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          router
        >
        <el-menu-item index="/admin">
          <el-icon><TrendCharts /></el-icon>
          <span>数据分析</span>
          </el-menu-item>
          <el-menu-item index="/admin/user">
            <el-icon><User /></el-icon>
            <span>用户管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/product">
            <el-icon><Box /></el-icon>
            <span>物品管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/category">
            <el-icon><Grid /></el-icon>
            <span>分类管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/advice">
            <el-icon><ChatLineSquare /></el-icon>
            <span>投诉建议管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/identification">
            <el-icon><Management /></el-icon>
            <span>认证管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </template>
  
  <script>
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