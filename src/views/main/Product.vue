<template>
  
    <div class="form" >
      <h2 style="margin-bottom:10px;margin-top:10px;">发布个人二手物品</h2>
    <el-form :model="form" label-width="120px" class="el-form"  >
      <el-form-item label="商品名" style="width:500px">
        <el-input v-model="form.goodsName" />
      </el-form-item>
      <el-form-item label="类别">
        <el-select v-model="form.categoryId" placeholder="选择商品的类别" >
          <el-option v-for="(item, index) in categoryList" :key="index" :label="item.CName" :value="item.cid" />
        </el-select>
      </el-form-item>
      <el-form-item label="使用时间" style="width:500px">
        <el-input v-model="form.usedTime" />
      </el-form-item>
      <el-form-item label="价格" style="width:500px">
        <el-input v-model="form.price" />
      </el-form-item>
      <el-form-item label="商品简介" style="width:600px">
        <el-input v-model="form.introduction" type="textarea" :rows="8"/>
      </el-form-item>
      <el-form-item label="图片添加" style="width:600px">
      <el-upload
      ref="uploadPictures"
      action="#"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-change="handleSuccess"
      :http-request="HttpRequest"
    
  >
    <el-icon><Plus /></el-icon>
  </el-upload>
  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">上传物品</el-button>
        <el-button @click="onCancel">清除表单</el-button>
      </el-form-item>
    </el-form>
</div>
  </template>
  
  <script>
  import api from "../../api"
  import { Plus } from '@element-plus/icons-vue'
  export default{
    components:{
      Plus
    },
    data(){
        return{
            form:{
                goodsName:"",
                categoryId:"",
                introduction:"",
                usedTime:"",
                price:"",
            },
            categoryList:"",
            fileList:"",
            dialogImageUrl: '',
            dialogVisible: false,
            fileParams:{
              f1:"",
              gid:"",
            }
        }
    },
    methods:{
      onSubmit(){
            console.log(this.form)
            api.addProduct(this.form).then(res=>{
              if(res.data.code===200){
              this.fileParams.gid=res.data.data.gid
              this.fileList.forEach(file => {
                this.fileParams.f1=file.raw
                api.addPicture(this.fileParams).then(res2=>{
                  if(res2.data.code===200){
                }else{
                  this.$notify.error({
                    title: '上传部分图片失败',
                    message: res2.data.data,
                  });
                  this.$router.push('/detail/'+res.data.data.gid)
                  return
                }
                 
                })
              });
              this.$notify({
                    title: '上传商品成功',
                    type: 'success',
                  });
                  this.$router.push('/detail/'+res.data.data.gid)
            }else{
              this.$notify.error({
                    title: '上传商品失败',
                    message: res.data.data,
                  });
                  this.onCancel()
            }
            })
        },
      onCancel(){
          this.form.goodsName=""
          this.form.categoryId=""
          this.form.introduction=""
          this.form.usedTime=""
          this.form.price=""
          this.clearFiles()
          this.fileList=""
        },
      handleRemove(file, fileList) {
        this.fileList=fileList
        },
        handleSuccess(file,fileList){
          this.fileList=fileList
        },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      HttpRequest(){
        
      },
      clearFiles(){
            this.$refs['uploadPictures'].clearFiles();
          },

    },
    mounted:function(){
      api.getAllCategorys().then(res=>{
          this.categoryList=res.data.data
      })
    }
  }
  
  </script>
  <style scoped lang="less">
    .form{
        width: 800px;
        position: relative;
        margin: auto;
        left: 0;
        right: 0;
        margin-top:20px;
        bottom: 0;
        border:1px solid;
        border-radius:10%;
        overflow: hidden;
        background-color: white;
    }
    </style>