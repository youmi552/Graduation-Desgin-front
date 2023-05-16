<template>
    <el-card class="box-card" style="margin-top:15px">
    <template #header>
      <div class="card-header" style="height: 20px;">
        <span style="float:left">投诉建议管理</span>
        <el-button class="button" text @click="clearAdvice()" style="float:right;">
              <el-tooltip
                 class="box-item"
                 effect="dark"
                 content="清空已阅读"
                placement="top-start"
                >
                <el-icon><DeleteFilled /></el-icon>
              </el-tooltip>
            </el-button>
      </div>
    </template>
  <el-row >
   
    
  </el-row>
  <el-row>
    <el-table :data="data" style="width: 100%">
    <el-table-column prop="aid" label="建议id"  />
    <el-table-column prop="title" label="投诉建议名" />
    <el-table-column prop="category" label="类别" />
    <el-table-column prop="userName" label="投诉用户" />
    <el-table-column prop="status" label="阅读状况" :formatter="stateFormat"/>
    <el-table-column prop="createdAt" label="发布时间" width="180" />
    <el-table-column  fixed="right" label="选项" width="100">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="readAdvice(scope.$index)"
          >查看</el-button
        >   
        
      </template>
   
    </el-table-column>
  </el-table>
  </el-row>
  </el-card>
</template>

<script>
import api from "../../../api"
import router from '../../../router'
export default {
    mounted:function(){
        api.getAllAdvice().then(res=>{
            this.data=res.data.data
        })
      
    },
    data(){
        return{
            data:"",
            dialogFormVisible:false,
            categoryParam:{
                cid:"",
                cName:"",
                type:"",
            },
          
        }
    },
    methods:{
        openDig(type){
            this.categoryParam.type=type
            this.dialogFormVisible=true
            
        },
        clearAdvice(){
            api.deleteAdvice().then(res=>{
                if(res.data.code===200){
                    this.$notify({
                  title: '清空成功',
                  type: 'success',
                });
                this.data.forEach((element,index) => {
                    if(element.status===1){
                        this.data.splice(index, 1)
                    }
                });
               
                }else{
                    this.$notify.error({
                  title: '清空失败！',
                  message: res.data.data,
                });
                }
            })
        },
        readAdvice(index){
            api.confirmAdvice(this.data[index].aid)
            router.push("adviceDetail/"+this.data[index].aid)
        },
        stateFormat(row, column) {
             if (row.status === 0) {
              return '未阅读'
                } 
                if (row.status === 1) {
                return '已阅读'
                } 
            return '未知'
                }
             }
}
</script>

<style scoped>
.demo-progress .el-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
.demo-progress .el-progress--circle {
  margin-right: 15px;
}
</style>