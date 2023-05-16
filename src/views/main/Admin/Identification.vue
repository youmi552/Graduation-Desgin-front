<template>
    <el-card class="box-card" style="margin-top:15px">
    <template #header>
      <div class="card-header" style="height: 20px;">
        <span style="float:left">认证管理</span>
        <el-cascader style="float:right;  width: 100px;" v-model="pageParams.keyword" :options="options" @change="handleChange" size="small"/>
      </div>
    </template>
  <el-row >
   
    
  </el-row>
  <el-row>
    <el-table :data="data.identificationData" style="width: 100%">
    <el-table-column prop="id" label="认证id"  width="100"/>
    <el-table-column prop="username" label="用户名" width="100" />
    <el-table-column prop="phoneNumber" label="用户电话"  width="150"/>
    <el-table-column prop="name" label="学生姓名" width="120" />
    <el-table-column prop="studentId" label="学号" />
    <el-table-column  fixed="right" label="选项" width="200">
      <template #default="scope">
        <el-button link type="primary" v-show="pageParams.keyword==0||pageParams.keyword==2" size="small" @click="acceptIdentification(scope.$index)"
          >通过认证</el-button
        >   
        <el-button link type="primary" v-show="pageParams.keyword==0" size="small" @click="refuseIdentification(scope.$index)"
          >拒绝认证</el-button
        >   
        <el-button link type="primary" v-show="pageParams.keyword==1" size="small" @click="refuseIdentification2(scope.$index)"
          >撤销认证</el-button
        >  
      </template>
   
    </el-table-column>
  </el-table>
  <div style="width:100%">
    <div class="example-demonstration"></div>
    <el-pagination layout="prev, pager, next" :total="data.count" :page-size="pageParams.pagesize" :current-page="pageParams.pagenumber"   @current-change="CurrentPageChange" class="pageindex"/>
  </div>
  </el-row>
  </el-card>
</template>

<script>
import api from "../../../api"
import router from '../../../router'
export default {
    mounted:function(){
        api.getAllIdentification(this.pageParams).then(res=>{
            this.data=res.data.data
        })
      
    },
    data(){
        return{
            data:"",
            dialogFormVisible:false,
            pageParams:{
                pagenumber:1,
                pagesize:10,
                keyword:"0",
                },
                options:[
                    {
                        value:"0",
                        label:"未认证",
                    },
                    {
                        value:"1",
                        label:"已认证",
                    },
                    {
                        value:"2",
                        label:"未通过认证"
                    }
                ],
          
        }
    },
    methods:{
        openDig(type){
            this.categoryParam.type=type
            this.dialogFormVisible=true
            
        },
        acceptIdentification(index){
            api.acceptIdentification(this.data.identificationData[index].id).then(res=>{
                if(res.data.code===200){
                    this.$notify({
                    title: '通过认证成功',
                    type: 'success',
                  });
                  this.data.identificationData.splice(index, 1)
                }else{
                    this.$notify.error({
                     title: '通过认证失败！',
                     message: res.data.data,
                   });
                }
            })
        },
        refuseIdentification(index){
            api.refuseIdentification(this.data.identificationData[index].id).then(res=>{
                if(res.data.code===200){
                    this.$notify({
                    title: '拒绝认证成功',
                    type: 'success',
                  });
                  this.data.identificationData.splice(index, 1)
                }else{
                    this.$notify.error({
                     title: '拒绝认证失败！',
                     message: res.data.data,
                   });
                }
            })
        },
        refuseIdentification2(index){
            api.refuseIdentification(this.data.identificationData[index].id).then(res=>{
                if(res.data.code===200){
                    this.$notify({
                    title: '撤销认证成功',
                    type: 'success',
                  });
                  this.data.identificationData.splice(index, 1)
                }else{
                    this.$notify.error({
                     title: '撤销认证失败！',
                     message: res.data.data,
                   });
                }
            })
        },
        handleChange(){
            api.getAllIdentification(this.pageParams).then(res=>{
            this.data=res.data.data
        })
        }
        // stateFormat(row, column) {
        //      if (row.status === 0) {
        //       return '未阅读'
        //         } 
        //         if (row.status === 1) {
        //         return '已阅读'
        //         } 
        //     return '未知'
        //         }
             }
}
</script>

<style scoped>
.pageindex{
  justify-content: center;;
 }
</style>