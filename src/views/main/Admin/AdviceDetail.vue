<template>
    <el-card class="box-card" style="width:100% ;">
      <template #header>
        <div class="card-header">
          <span class="goodsName">{{ adviceDetail.title}}</span>
        </div>
        <div class="card-header">
            <span class="categoryName">种类:{{ adviceDetail.category }}</span>
            <span class="categoryName">发布用户:{{adviceDetail.userName}}(电话号码:{{adviceDetail.phoneNumber}})</span>
        </div>
      </template>
      <div class="text item">
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="(item,index) in adviceDetail.pictures" :key="index">
            <img
            :src="('http://'+item)"
            class="image"  
            :onerror="errorImage"
            />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="text item">
    <el-collapse v-model="activeNames" >
      <el-collapse-item title="详情描述" name="1">
        <div>
          {{ adviceDetail.detail }}
        </div>
      </el-collapse-item>
    </el-collapse>
      </div>
      <div class="lastline">
        <el-button type="primary" round @click="SendNoticeToUser(this.adviceDetail.uid)">反馈用户</el-button>
      </div>
    </el-card>
  </template>
  <script>
  import api from "../../../api"
    export default{
      data(){
        return{
          adviceDetail:"",
          errorImage:'this.src="' + require('../../../assets/image/4.png'),
          activeNames:["1"]
        }
      },
      mounted:function(){
        api.getAdvice(this.$route.params.aid).then(res=>{
          this.adviceDetail=res.data.data
          console.log(res.data.data)
        })
      },
      methods:{
        SendNoticeToUser(gid){
        console.log("向用户发送通告")
      }
      },
    }    
  </script>
  <style scoped>
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .text {
    font-size: 14px;
  }
  
  .item {
    margin-bottom: 18px;
  }
  
  .box-card {
    width: 480px;
  }
  .icon{
    font-size: 10%;
     
  }
  .button{
    margin-bottom: 3px;
    width: 10px;
  }
  .goodsName{
    font-size: 150%;
  }
  .categoryName{
    margin-top: 20px;
    font-size: 10%;
  }
  .image {
  width: 100%;
  display: block; 
}
  .lastline{
    float: right;
    margin-bottom:20px ;
  }
  .price{
    margin-right: 50px;
    font-size: 150%;
  }
  </style>
  