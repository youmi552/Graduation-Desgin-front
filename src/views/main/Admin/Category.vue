<template>
    <el-card class="box-card" style="margin-top:15px">
    <template #header>
      <div class="card-header" style="height: 20px;">
        <span style="float:left">分类管理</span>
        <el-button class="button" text></el-button>
      </div>
    </template>
  <el-row >
    <div style="width: 50%">
        <span >二手物品所有分类</span>
        <el-button class="button" text @click="openDig('category')">
              <el-tooltip
                 class="box-item"
                 effect="dark"
                 content="新增分类"
                placement="top-start"
                >
                <el-icon><CirclePlus /></el-icon>
              </el-tooltip>
            </el-button>
    </div>
    <div style="width: 50%">
        <span >投诉建议所有分类</span>
        <el-button class="button" text  @click="openDig('adcategory')">
              <el-tooltip
                 class="box-item"
                 effect="dark"
                 content="新增分类"
                placement="top-start"
                >
                <el-icon><CirclePlus /></el-icon>
              </el-tooltip>
            </el-button>
    </div>
   
    
  </el-row>
  <el-row>
    <el-table :data="data.productCategory" style="width: 50%">
    <el-table-column prop="cid" label="分类id"  />
    <el-table-column prop="CName" label="分类名" />
    <el-table-column fixed="right" label="选项" width="180">
      <template #default="scope">
        <!-- <el-button link type="primary" size="small" @click="updateCategory('category',scope.$index)"
          >编辑</el-button
        >    -->
        <el-popover :visible="visible" placement="top" :width="120">
    <p >确定删除该分类?</p>
    <div style="text-align: left; margin: 0">
      <el-button size="small" text @click="visible = false">取消</el-button>
      <el-button size="small" type="primary" @click="deleteCategory('category',scope.$index)"
        >确定</el-button
      >
    </div>
    <template #reference>
        <el-button link type="primary" size="small" 
          >删除分类</el-button
        >
    </template>
  </el-popover>
        
      </template>
    </el-table-column>
  </el-table>
  <el-table :data="data.adviceCategory" style="width: 50%" >
    <el-table-column prop="cid" label="分类id"  />
    <el-table-column prop="CName" label="分类名" />
    <el-table-column fixed="right" label="选项" width="180">
      <template #default="scope">
        <!-- <el-button link type="primary" size="small" @click="updateUserInfo(scope.$index)"
          >编辑</el-button
        >    -->
        <el-popover :visible="visible" placement="top" :width="120">
    <p >确定删除该分类?</p>
    <div style="text-align: left; margin: 0">
      <el-button size="small" text @click="visible = false">取消</el-button>
      <el-button size="small" type="primary" @click="deleteCategory('adcategory',scope.$index)"
        >确定</el-button
      >
    </div>
    <template #reference>
        <el-button link type="primary" size="small"  
          >删除分类</el-button
        >
    </template>
  </el-popover>  
      </template>
    </el-table-column>
  </el-table>
  </el-row>
  <el-dialog v-model="dialogFormVisible" title="添加分类" style="width: 400px;">
    <el-form :model="categoryParam">
      <el-form-item label="分类id" :label-width="formLabelWidth">
        <el-input v-model="categoryParam.cid" autocomplete="off" />
      </el-form-item>
      <el-form-item label="分类名" :label-width="formLabelWidth">
        <el-input v-model="categoryParam.cName" autocomplete="off"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addCategory()">
          添加
        </el-button>
      </span>
    </template>
  </el-dialog>
  </el-card>
</template>

<script>
import api from "../../../api"
export default {
    mounted:function(){
        api.getData().then(res=>{
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
        addCategory(){
            api.addCategory(this.categoryParam).then(res=>{
                if(res.data.code===200){
                    this.$notify({
                     title: '添加成功',
                     type: 'success',
                   });
                   if(this.categoryParam.type=="category"){
                    this.data.productCategory.push({
                        "cid":this.categoryParam.cid,
                        "CName":this.categoryParam.cName
                    })
                   }
                   if(this.categoryParam.type=="adcategory"){
                    this.data.adviceCategory.push({
                        "cid":this.categoryParam.cid,
                        "CName":this.categoryParam.cName
                    })
                   }
                }else{
                    this.$notify.error({
                     title: '添加失败！',
                     message: res.data.data,
                   });
                }
                this.categoryParam.cid="",
                this.categoryParam.cName="",
                this.categoryParam.type="",
                this.dialogFormVisible=false
            })
        },
        deleteCategory(type,index){
          this.categoryParam.type=type
          if(type==='adcategory'){
            this.categoryParam.cid=this.data.adviceCategory[index].cid
          }
          if(type==='category'){
            this.categoryParam.cid=this.data.productCategory[index].cid
          }
          
          api.deleteCategory(this.categoryParam).then(res=>{
            if(res.data.code===200){
              this.$notify({
                     title: '删除成功',
                     type: 'success',
                   });
              if(type==='adcategory'){
                this.data.adviceCategory.splice(index, 1)
          }
          if(type==='category'){
            this.data.productCategory.splice(index, 1)
          }     
            }else{
              this.$notify.error({
                     title: '删除失败！',
                     message: res.data.data,
                   });
            }
            this.categoryParam.cid=""
                this.categoryParam.cName=""
                this.categoryParam.type=""
          })
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