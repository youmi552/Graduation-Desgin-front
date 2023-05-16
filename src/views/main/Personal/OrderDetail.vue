<template>
    <el-card class="box-card" style="width:100% ;">
      <template #header>
        <div class="card-header">
          <span class="goodsName">{{orderDetail.goodsInfo.goodsName}}</span>
        </div>
        <div class="card-header" >
            <span class="categoryName" v-if="user.userInfo.username===orderDetail.userName">卖家联系电话:{{orderDetail.sPhoneNumber}}</span>
            <span class="categoryName"  v-if="user.userInfo.username===orderDetail.sUserName">买家联系电话:{{orderDetail.phoneNumber }}</span>
            <span class="categoryName">发布用户:{{ orderDetail.sUserName }}</span>
        </div>
      </template>
      <div class="text item">
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="(item,index) in orderDetail.goodsInfo.Pictures" :key="index">
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
      <el-collapse-item title="交易地点" name="1">
        <div>
          {{ orderDetail.place }}
        </div>
      </el-collapse-item>
      <el-collapse-item title="订单备注" name="2">
        <div>
          {{ orderDetail.notes }}
        </div>
      </el-collapse-item>
    </el-collapse>
      </div>
      <div class="lastline">
        <span class="price">价格：{{orderDetail.goodsInfo.price}}元</span>
        <el-button type="success" v-if="user.userInfo.username===orderDetail.userName" round @click="UpdateOrder(orderDetail.oid)">确认收货</el-button>
      </div>
      
    </el-card>
  </template>
  <script>
  import api from "../../../api"
  import {mapState} from "vuex";
    export default{
      mounted:function(){
        console.log('页面加载')
        api.getOrderDetail(this.$route.params.oid).then(res=>{
          this.orderDetail=res.data.data
        })
      },
      computed:{
        ...mapState("login",["user"])
    },
      data(){
        return{
          id:"",
          orderDetail:{
            goodsData:"",
            goodsInfo:"",
          },
          iconName:"Star",
          collectionInfo:"收藏量(点击收藏)",
          errorImage:'this.src="' + require('../../../assets/image/4.png'),
          activeNames:["1","2"]
        }
      },
      methods:{
        UpdateOrder(oid){
          api.upDateOrder(oid).then(res=>{
            if(res.data.code===200){
              this.$notify({
                     title: '确认收货成功',
                     type: 'success',
                   });
            }else{
              this.$notify.error({
                     title: '确认收货失败！',
                     message: res.data.data,
                   });
            }
          })
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
  