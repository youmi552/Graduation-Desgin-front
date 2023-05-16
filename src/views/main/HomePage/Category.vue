<template>
    <el-card class="box-card" style="margin-top:15px">
    <template #header>
      <div class="card-header" style="height: 20px;">
        <div><span style="float:left">分类查看</span>
      </div>
      </div>
    </template>
    <el-row class="indexListBoxRow" :span="22" style="margin-left:55px">
      <span style="margin-left:270px" v-show="products==null">该分类暂时没有任何二手物品</span>
      <el-col
        class="indexList_box"
        v-for="(item, index) in products"
        :key="index"
        :span="6"
        :offset="(index ) % 3 == 0 ? 0 : 2"
      >
        <el-card :body-style="{ padding: '0px' }">
          <div class="imgclass">
            <img
            :src="('http://'+item.picture)"
            class="image"  
            :onerror="errorImage"
          />
          </div>
          <div style="padding: 14px">
            <router-link :to="'/detail/'+item.gid">{{item.goodsName }}</router-link>
            <div class="bottom">
              <time class="time">{{ item.usedTime }}</time>
              <el-button text class="button">{{item.userName}}</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div >
      <div class="example-demonstration"></div>
      <el-pagination layout="prev, pager, next" :total="total" :page-size="pageParams.pagesize" :current-page="pageParams.pagenumber"   @current-change="CurrentPageChange" class="pageindex"/>
    </div>
 </el-card>
  </template>
  
  <script>
  import {mapState} from "vuex";
  import api from "../../../api"
  export default {
      data(){
        return{
          total:"",
          errorImage:'this.src="' + require('../../../assets/image/4.png') + '";this.style = "width:50%;margin-left:55px";',
          products:"",
          page:1,
          pageParams:{
              pagenumber:1,
              pagesize:6,
          },
        }
      },
      computed:{
          ...mapState("login",["user"])
      },
      mounted:function(){
        api.getProductsByCategory(this.pageParams,this.$route.params.cid).then(res =>{
            this.total=res.data.data.Count
            this.products=res.data.data.GoodsData
            console.log(res.data.data)
        })
      },
      //监听路由参数的变化
      watch: {
        $route: {
            handler() {
                api.getProductsByCategory(this.pageParams,this.$route.params.cid).then(res =>{
                this.total=res.data.data.Count
                this.products=res.data.data.GoodsData
            })
            //深度监听，同时也可监听到param参数变化
            },
             deep: true,
        }
     },
  methods:{
        CurrentPageChange(currentPage){
          console.log(currentPage)
          this.pageParams.pagenumber=currentPage
          api.getProductsByCategory(this.pageParams,this.$route.params.cid).then(res =>{
                this.total=res.data.data.Count
                this.products=res.data.data.GoodsData
        })
        }
      }
  }
  </script>
  
  <style scoped>
  .avatarImg{
      width: 150px;
      height: 150px;
      border:1px solid;
      border-radius:50%;
  }
  .userInfo{
    position: relative;
    background-color: white;
    width: 100%;
    box-sizing: border-box;
  }
  .introduction{
    /* position: relative;
    top:10px; */
    margin-top: 20px;
  }
  .myProduct{
    text-align: left;
  }
  
  .time {
    font-size: 12px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .button {
    padding: 0;
    min-height: auto;
  }
  .imgclass{
    width: 223px;
    height: 125px;
    overflow:hidden;
    
  }
  .image {
    width: 100%;
    display: block; 
  }
  .el-row{
    display:flex;
    flex-wrap: wrap; 
  
  }
  .indexList_box{
      margin-bottom: 16px;
  }
  
  .indexListBoxRow{
      margin-top: 20px;
   }
   .pageindex{
    justify-content: center;;
   }
  </style>