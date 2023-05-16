<template>
    <el-card class="box-card" style="width:100%; margin-top:15px;">
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
        <el-button type="primary" v-show="productDetail.status==0" round @click="Allow(this.productDetail.gid)">上架物品</el-button>
        <el-button type="success" v-show="productDetail.status==1" round @click="Ban(this.productDetail.gid)">下架物品</el-button>
      </div>
      
    </el-card>
  </template>
  <script >
  import api from "../../../api"
    export default{
      data(){
        return{
          productDetail:"",
          iconName:"Star",
          collectionInfo:"收藏量(点击收藏)",
          errorImage:'this.src="' + require('../../../assets/image/4.png'),
          activeNames:["1","2"]
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
          })
        },
        Allow(gid){
          api.allow(gid).then(res=>{
            if(res.data.code===200){
              this.$notify({
                  title: '上架物品成功',
                  type: 'success',
                });
                this.productDetail.status=1
            }else{
              this.$notify.error({
                  title: '上架物品失败！',
                  message: res.data.msg,
                });
            }
          })
        },
        Ban(gid){
          api.ban(gid).then(res=>{
            if(res.data.code===200){
              this.$notify({
                  title: '下架物品成功',
                  type: 'success',
                });
                this.productDetail.status=0
            }else{
              this.$notify.error({
                  title: '夏季物品失败！',
                  message: res.data.msg,
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
  