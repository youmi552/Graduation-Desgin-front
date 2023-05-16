
<template>
   <el-card class="box-card" style="margin-top:15px">
    <template #header>
      <div class="card-header" style="height: 20px;">
        <span style="float:left">用户管理</span>
        <el-button class="button" text></el-button>
      </div>
    </template>
    <el-row>
    <el-table :data="userData" style="width: 100% ;"  empty-text="订单中没有任何物品" class="table" >
    <el-table-column prop="uid" label="用户id"  :formatter="stateFormat"/>
    <el-table-column prop="userName" label="用户名" width="180" />
    <el-table-column prop="phoneNumber"  label="电话号码" width="180" />
    <el-table-column prop="level" label="权限等级"  :formatter="stateFormat"/>
    <el-table-column fixed="right" label="选项" width="180">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="updateUserInfo(scope.$index)"
          >编辑</el-button
        >   
    <el-popover :visible="visible" placement="top" :width="120">
    <p >确定注销该账号?</p>
    <div style="text-align: left; margin: 0">
      <el-button size="small" text @click="visible = false">取消</el-button>
      <el-button size="small" type="primary" @click=deleteUser(scope.$index)
        >确定</el-button
      >
    </div>
    <template #reference>
        <el-button link type="primary" size="small"  @click="visible = true"
          >注销账号</el-button
        >
    </template>
  </el-popover>
        
      </template>
    </el-table-column>
  </el-table>
  </el-row>
    <el-dialog v-model="dialogFormVisible" title="修改用户信息">
    <el-form :model="user">
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="user.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="电话号码" label-width="formLabelWidth">
        <el-input v-model="user.phonenumber" autocomplete="off" />
      </el-form-item>
      <el-form-item label="权限等级" :label-width="formLabelWidth">
        <el-select v-model="user.level" class="m-2" placeholder="Select" size="large" >
            <el-option
      v-for="item in items"
      :key="item.value"
      :label="item.name"
      :value="item.value"
    />

  </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="updateUserInfo2()">
          保存
        </el-button>
      </span>
    </template>
  </el-dialog>
  </el-card>
  
</template>

<script>
import api from "../../../api"
export default {
    data(){
        return{
            userData:[],
            dialogFormVisible:false,
            index:"",
            user:{
                uid:"",
                username:"",
                phonenumber:"",
                level:"",
                visible:false,
            },
            items:[
                {
                    name:"普通用户",
                    value:1
                },
                {
                    name:"管理员",
                    value:2
                }
            ]
        }
    },
    mounted:function(){
        api.getUserData().then(res=>{
            this.userData=res.data.data
        })
    },
    methods:{
        getDetail(index){
            console.log(index)
        },
        updateUserInfo(index){
            this.user.uid=this.userData[index].uid
            this.user.username=this.userData[index].userName
            this.user.phonenumber=this.userData[index].phoneNumber
            this.user.level=this.userData[index].level
            this.dialogFormVisible = true
            this.index=index
        },
        updateUserInfo2(){
            api.updateUserData(this.user).then(res=>{
                if(res.data.code===200){
                    this.$notify({
                  title: '修改用户信息成功',
                  type: 'success',
                });
                this.userData[this.index].level=this.user.level
                this.userData[this.index].userName=this.user.username
                this.userData[this.index].phoneNumber=this.user.phonenumber
                }else{
                    this.$notify.error({
                  title: '修改用户信息失败！',
                  message: res.data.msg,
                });
                console.log(res.data.data)
                }
                this.dialogFormVisible = false
            })
        },
        deleteUser(index){
           
           api.deleteUser(this.userData[index].uid).then(res=>{
           if(res.data.code===200){
               this.$notify({
                     title: '注销用户成功',
                     type: 'success',
                   });
             this.userData.splice(index, 1)
           }else{
               this.$notify.error({
                     title: '注销用用户失败！',
                     message: res.data.data,
                   });
           }
          })
           },
     stateFormat(row, column) {
     
    if (row.level === 1) {
      return '普通用户'
    } 

    if (row.level === 2) {
      return '管理员'
    } 
    return '未知'
}
    }
}
</script>

<style>

</style>