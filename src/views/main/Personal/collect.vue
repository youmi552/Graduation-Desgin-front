<template>
   <el-card class="box-card" style="margin-top:15px">
    <template #header>
      <div class="card-header" style="height: 20px;">
        <span style="float:left">收藏管理</span>
        <el-button class="button" text></el-button>
      </div>
    </template>
  <el-row class="indexListBoxRow" :span="22"  style="margin-left:55px">
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
</el-card>
</template>

<script>
import {mapState} from "vuex";
import api from "../../../api"
export default {
    data(){
      return{
        products:"",
        errorImage:'this.src="' + require('../../../assets/image/4.png') + '";this.style = "width:50%;margin-left:55px";',
        products:"",
    }
    },
    computed:{
        ...mapState("login",["user"])
    },
    mounted:function(){  
      api.getUserCollection().then(res =>{
          this.products=res.data.data
          console.log(this.products)
      })
    },
    methods:{
      
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