<template>
  <el-card class="box-card" style="margin-top:15px">
    <el-dialog v-model="dialogFormVisible" title="编辑个人信息">
    <el-form :model="user">
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="user.userInfo.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="个人简介" :label-width="formLabelWidth">
        <el-input v-model="user.userInfo.introduction" type="textarea" :rows="8" autocomplete="off"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="updateUserInfo()">
          保存
        </el-button>
      </span>
    </template>
  </el-dialog>
    <template #header>
      <div class="card-header" style="height:30px">
        <span style="float:left">个人信息</span>
        <el-button class="button" text style="float:right;"  @click="dialogFormVisible = true">
              <el-tooltip
                 class="box-item"
                 effect="dark"
                 content="编辑个人信息"
                placement="top-start"
                >
                <el-icon><EditPen /></el-icon>
              </el-tooltip>
            </el-button>
      </div>
    </template>
    <div class="userInfo">
  <div class="avatar">
    <img :src="user.userInfo.avatar" class="avatarImg">
  </div>
  <div>
    {{ user.userInfo.username}}
  </div>
  <div class="introduction">
    {{ user.userInfo.introduction}}
  </div>
  <div class="myProduct">
      <h2>我的商品</h2>
  </div>
  <div class="myproducts">
  <el-row class="indexListBoxRow" :span="22">
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
          <span>{{ item.goodsName }}</span>
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
</div>
</div>
  </el-card>

</template>

<script>
import {mapState} from "vuex";
import api from "../../../api"
export default {
    data(){
      return{
        products:"",
        total:"",
        ego:"",
        errorImage:'this.src="' + require('../../../assets/image/4.png') + '";this.style = "width:50%;margin-left:55px";',
        products:"",
        dialogFormVisible:false,
        page:1,
        pageParams:{
            pagenumber:1,
            pagesize:6,
      }
    }
    },
    computed:{
        ...mapState("login",["user"])
    },
    mounted:function(){  
      api.getProductsByUid(JSON.parse(localStorage.getItem("ego"),).data.userInfo.uid,this.pageParams).then(res =>{
          this.total=res.data.data.Count
          this.products=res.data.data.GoodsData
          console.log(this.products)
      })
    },
    methods:{
      CurrentPageChange(currentPage){
        this.pageParams.pagenumber=currentPage
        api.getProductsByUid(JSON.parse(localStorage.getItem("ego")).data.userInfo.uid,this.pageParams).then(res =>{
          this.total=res.data.data.Count
          this.products=res.data.data.GoodsData
      })
      },
      updateUserInfo(){
        api.updateUserInfo(this.user.userInfo.username,this.user.userInfo.introduction).then(res=>{
          if(res.data.code==200){
                    this.$notify({
                    title: '修改用户信息成功',
                    type: 'success',
                  });
                this.ego=JSON.parse(localStorage.getItem("ego"))
                this.ego.data.userInfo.username=this.user.userInfo.username
                this.ego.data.userInfo.introduction=this.user.userInfo.introduction
                // localStorage.removeItem("ego")
                localStorage.setItem("ego",JSON.stringify(this.ego))
          }else{
            this.$notify.error({
                     title: '修改用户信息失败！',
                     message: res.data.data,
                   });
          }
          this.dialogFormVisible = false
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
.index-board-list{
    overflow: hidden;
    margin-top: 15px;
}
.index-board-item{
    float: left;
    width: 400px;
    background: #fff;
    box-shadow: 0 0 1px #ddd;
    padding: 20px;
    margin-right: 20px;
    margin-bottom: 20px;
}

.index-board-item-inner{
    min-height: 125px;
    padding-left: 12    0px;
}
.line-last{
    margin-right: 0;
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
 .imgclass{
  width: 223px;
  height: 125px;
  overflow:hidden;
  
}
.image {
  width: 100%;
  display: block;
 
}
.myproducts{
  margin-left: 50px;
} 
</style>