<template>
    <el-card class="box-card" style="width:100%; margin-top: 15px;">
      <template #header>
        <div class="card-header">
          <span class="goodsName">{{ productDetail.goodsName}}</span>
          <div class="icon">
            <el-button class="button" text>
              <el-tooltip
                 class="box-item"
                 effect="dark"
                 content="浏览量"
                placement="top-start"
                >
                <el-icon ><View /></el-icon>
              </el-tooltip>
            </el-button>
            <span class="icontext">{{ productDetail.views }}</span>
            <el-button class="button" text>
              <el-tooltip
                 class="box-item"
                 effect="dark"
                 :content="collectionInfo"
                placement="top-start"
                >
                <el-icon>
                <component
                  class="fold-menu"
                  :is="iconName"
                  @click="collection"
                >
                </component>
               </el-icon>
              </el-tooltip>
            </el-button >
            <span class="icontext">{{ productDetail.collection }}</span>
          </div>
        </div>
        <div class="card-header" >
            <span class="categoryName">种类:{{ productDetail.categoryName }}</span>
            <span class="categoryName">发布用户:{{ productDetail.userName }}</span>
        </div>
      </template>
      <div class="text item">
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="(item,index) in productDetail.Pictures" :key="index">
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
      <el-collapse-item title="已使用情况" name="1">
        <div>
          {{ productDetail.usedTime }}
        </div>
      </el-collapse-item>
      <el-collapse-item title="商品简介" name="2">
        <div>
          {{ productDetail.introduction }}
        </div>
      </el-collapse-item>
    </el-collapse>
      </div>
      <div class="lastline">
        <span class="price">价格：{{productDetail.price}}元</span>
        <span v-show="productDetail.status!=1">该商品已下架</span>
        <el-button type="primary" v-show="productDetail.status==1" round @click="AddProductInCart(this.productDetail.gid)">加入购物车</el-button>
        <el-button type="success" v-show="productDetail.status==1" @click="dialogFormVisible = true" round>立即购买</el-button>
      </div>
      <el-dialog v-model="dialogFormVisible" title="确认订单信息">
    <el-form :model="order">
      <el-form-item label="收货地址" :label-width="formLabelWidth">
        <el-input v-model="order.place" autocomplete="off" />
      </el-form-item>
      <el-form-item label="订单备注" :label-width="formLabelWidth">
        <el-input v-model="order.notes" type="textarea" :rows="8" autocomplete="off"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="createOrder()">
          创建订单
        </el-button>
      </span>
    </template>
  </el-dialog>
    </el-card>
  </template>
  <script>
  import api from "../../../api"
    export default{
      data(){
        return{
          order:{
            gid:"",
            place:"",
            notesl:"",
          },
          productDetail:"",
          iconName:"Star",
          collectionInfo:"收藏量(点击收藏)",
          errorImage:'this.src="' + require('../../../assets/image/4.png'),
          activeNames:["1","2"],
          dialogFormVisible:false,
        }
      },
      mounted:function(){
        api.getProduct(this.$route.params.gid).then(res=>{
          this.productDetail=res.data.data
          if (!this.productDetail.isCollection){
            this.iconName="Star"
            this.collectionInfo="收藏量(点击收藏)"
          }else{
            this.iconName= "StarFilled"
            this.collectionInfo="收藏量(点击取消收藏)"
          }
          console.log(res.data.data)
        })
      },
      methods:{
        collection(){
          api.collection(this.productDetail.gid,this.productDetail.isCollection).then(res=>{
            if(res.data.code===200){
              if(!res.data.data){
                this.$notify({
                    title: '取消收藏成功',
                    type: 'success',
                  });
                  this.iconName="Star"
                  this.collectionInfo="收藏量(点击收藏)"
                  this.productDetail.collection--
                  }else{
                    this.$notify({
                    title: '收藏成功',
                    type: 'success',
                  });
                  this.iconName= "StarFilled"
                  this.collectionInfo="收藏量(点击取消收藏)"
                  this.productDetail.collection++
              }
              this.productDetail.isCollection=!this.productDetail.isCollection
            }else{
              if(!this.productDetail.isCollection){
                this.$notify.error({
                    title: '收藏失败',
                    message: res.data.data,
                  });
              }else{
                this.$notify.error({
                    title: '取消收藏失败',
                    message: res.data.data,
                  });
              }
            }
            console.log(res.data)
          })
        },
        AddProductInCart(gid){
        api.addProductInCart(gid).then(res=>{
          if(res.data.code===200){
            this.$notify({
                    title: '添加到购物车成功！',
                    type: 'success',
                  });
          }else{
            this.$notify.error({
                    title: '添加到购物车失败！',
                    message: res.data.data,
                  });
          }
        })
      },
      createOrder(){
        this.order.gid=this.productDetail.gid
        api.createOrder(this.order).then(res=>{
          if(res.data.code===200){
            this.$notify({
                  title: '创建订单成功',
                  type: 'success',
                });
          }else{
            this.$notify.error({
                  title: '创建订单失败！',
                  message: res.data.data,
              });
          }
          this.productDetail.status=2
          this.dialogFormVisible = false
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
  