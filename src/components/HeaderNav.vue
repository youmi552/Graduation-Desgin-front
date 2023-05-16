<template>
    <div> 
    <el-dialog v-model="dialogFormVisible" title="修改头像">
        <div v-for="(item,index) in avatar" :key="index" style="display:inline-block ;width:100px" :class="{'active':choose==index}">
            <img :src="'http://127.0.0.1/file/系统头像'+item.id+'.jpg'"  alt="" class="img2"  @click="clickPic(index)">
        </div>
        
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="updateAvatar">
          保存
        </el-button>
      </span>
    </template>
  </el-dialog>
    <!-- 属性：background-color背景颜色 text-color字体颜色 active-text-color 选中颜色 -->
    <el-menu class="menu"   mode="horizontal" router >
    <el-menu-item index="/">首页</el-menu-item>
    <el-menu-item index="/product">商品发布</el-menu-item>
    <el-menu-item index="/advice" v-show="user.userInfo.level===1">投诉建议</el-menu-item>
    <el-menu-item index="/personal">个人信息</el-menu-item>
    <el-menu-item index="/personal/cart">我的购物车</el-menu-item>
    <el-menu-item index="/personal/order">我的订单</el-menu-item>
    <el-menu-item index="/personal/sell">我卖出的</el-menu-item>
    <el-menu-item index="/personal/collection">收藏物品</el-menu-item>
    <el-menu-item index="/personal/history">浏览历史</el-menu-item>
    <el-menu-item index="/admin" v-show="user.userInfo.level===2">平台管理</el-menu-item>
    <!-- <el-menu-item class="user" index="1">
        <span class="user-name">iwen</span>
        <el-button >退出</el-button>
    </el-menu-item> -->
    <el-menu-item index="" class="avatar"  @click="dialogFormVisible = true">
        <img :src="user.userInfo.avatar"  alt="" class="img">
      </el-menu-item>
    <el-sub-menu index="2" class="user">
      <template #title>{{ user.userInfo.username }}</template>
      <el-menu-item index="/personal" class="sub" >
        <span>个人信息</span>
      </el-menu-item>
      <el-menu-item @click="Identification()" index="" class="sub">
        <span>学生认证</span>
      </el-menu-item>
      <el-menu-item index="/login" @click="logoutHandle" class="sub">
    <span>退出登录</span>
</el-menu-item>
    </el-sub-menu>
</el-menu>
<el-dialog v-model="dialogFormVisible2" title="学生认证" style="width:400px">
    <span v-show="status==0">你的学生认证正在审核中。。。</span>
    <span v-show="status==1">你已经通过了学生认证！</span>
    <span v-show="status==2" >你上次提交的学生认证未通过！</span>
    <el-form :model="identification" v-show="status!=1&&status!=0" style="margin-top:10px">
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input v-model="identification.name" autocomplete="off" style="width:100px" />
      </el-form-item>
      <el-form-item label="学号" :label-width="formLabelWidth">
        <el-input v-model="identification.studentId"  autocomplete="off"  style="width:300px"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取消</el-button>
        <el-button type="primary" v-show="status==-1" @click="createIdentification()">
          提交学生认证
        </el-button>
        <el-button v-show="status==2" type="primary" @click="updateIdentification()">
          更新学生认证
        </el-button>
      </span>
    </template>
  </el-dialog>
</div>

</template>

<script>
import api from "../api";
import {mapState,mapMutations} from "vuex";
export default {
   data(){
    return{
        status:"",
        identification:{
            name:"",
            studentId:"",
        },
        dialogFormVisible:false,
        dialogFormVisible2:false,
        choose:'',
        active:"/",
        ego:"",
        avatar:[
            {
                id:0,
            },
            {
                id:1,
            },
            {
                id:2,
            },
            {
                id:3,
            },
            {
                id:4,
            },
            {
                id:5,
            },
            {
                id:6,
            },
            {
                id:7,
            },
            {
                id:8,
            },
        ],
    }
   },
   
    computed:{
        ...mapState("login",["user"])
    },
    methods:{
        ...mapMutations("login",["removeUser"]),
        logoutHandle(){
            this.removeUser({})
            localStorage.removeItem("ego")
        },
        clickPic(index){
        this.choose = index;
        },
        updateAvatar(){
            api.updateAvatar(this.choose).then(res=>{
                if(res.data.code===200){
                    this.$notify({
                    title: '修改头像成功',
                    type: 'success',
                  });
                }
                this.user.userInfo.avatar=res.data.data.avatar
                this.ego=JSON.parse(localStorage.getItem("ego"))
                this.ego.data.userInfo=res.data.data
                // localStorage.removeItem("ego")
                localStorage.setItem("ego",JSON.stringify(this.ego))
            })
            this.dialogFormVisible = false
        },
        Identification(){
            api.getIdentification().then(res=>{
                if(res.data.code===200){
                    this.status=res.data.data
                }
            })
            this.dialogFormVisible2=true
          },
        createIdentification(){
            api.addIdentification(this.identification).then(res=>{
                if(res.data.code===200){
                    this.$notify({
                    title: '提交认证成功',
                    type: 'success',
                  });
                }else{
                    this.$notify.error({
                  title: '提交认证失败！',
                  message: res.data.data,
                });
                }
                this.dialogFormVisible2=false
            })
        },
        updateIdentification(){
            api.updateIdentification(this.identification).then(res=>{
                if(res.data.code===200){
                    this.$notify({
                    title: '更新认证成功',
                    type: 'success',
                  });
                }else{
                    this.$notify.error({
                  title: '更新认证失败！',
                  message: res.data.data,
                });
                }
                this.dialogFormVisible2=false
            })
        }
    }
   
}
</script>

<style scoped >

/* .menu{
    width: 100%;
    position: fixed;
} */
.img{
    width: 50px;
    height: 50px;
    border:1px solid;
    border-radius:50%;
}
.img2{
    width: 80px;
    height: 80px;
    border:1px solid;
    border-radius:50%;
}
.avatar{
    position:absolute;
    right:102px;
    float: right;
    margin-right:20px;
    line-height: 60px; 
}
.user{
    position:absolute;
    right:0px;
    float: right;
    margin-right:20px;
    line-height: 60px; 
}
.user-name{
        margin-right:10px;
        font-size:15px;
        border:1px solid;
        border-radius:50%;
        width:40px;
        height:40px;
        display:inline-block;
        line-height:40px;
    }
    .active{
        border: 2px;
    }
</style>