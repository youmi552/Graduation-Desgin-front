
<template>
    <el-card class="box-card" style="margin-top:15px">
    <template #header>
      <div class="card-header" style="height: 20px;">
        <span style="float:left">二手物品管理</span>
        <span style="float:right; font-size: 13px; color:red;">还有 {{this.ban}} 件二手物未审核</span>
        <el-button class="button" text></el-button>
      </div>
    </template>
    <el-row>
    <el-table :data="products" style="width: 100% ;"  empty-text="没有任何二手物品" class="table" >
    <el-table-column prop="gid" label="物品id" />
    <el-table-column prop="goodsName" label="二手物品名" width="180" />
    <el-table-column prop="userName"  label="所属用户" width="180" />
    <el-table-column prop="status" label="物品状态"  :formatter="stateFormat"/>
    <el-table-column fixed="right" label="选项" width="180">
      <template #default="scope">
        <el-button link type="primary" size="small" @click.prevent="getDetail(scope.$index)"
          >详情</el-button
        >
    <!-- <el-popover :visible="visible" placement="top" :width="120">
    <p >确定下架该物品?</p>
    <div style="text-align: left; margin: 0">
      <el-button size="small" text @click="visible = false">取消</el-button>
      <el-button size="small" type="primary" @click=deleteUser(scope.$index)
        >确定</el-button
      >
    </div>
    <template #reference>
        <el-button link type="primary" size="small"  @click="visible = true"
          >下架物品</el-button
        >
    </template>
  </el-popover> -->
      </template>
    </el-table-column>
  </el-table>
  <div style="width:100%">
    <div class="example-demonstration"></div>
    <el-pagination layout="prev, pager, next" :total="total" :page-size="pageParams.pagesize" :current-page="pageParams.pagenumber"   @current-change="CurrentPageChange" class="pageindex"/>
  </div>
</el-row>
    <el-dialog v-model="dialogFormVisible" title="修改用户信息">
    <el-form :model="user">
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="user.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="电话号码" :label-width="formLabelWidth">
        <el-input v-model="user.phonenumber" autocomplete="off"/>
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
import router from '../../../router'
import api from "../../../api"
export default {
    data(){
        return{
            userData:"",
            dialogFormVisible:false,
            index:"",
            user:{
                uid:"",
                username:"",
                phonenumber:"",
                level:"",
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
            ],
                total:0,
                ban:0,
                errorImage:'this.src="' + require('../../../assets/image/4.png') + '";this.style = "width:50%;margin-left:55px";',
                products:[],
                page:1,
                 pageParams:{
                pagenumber:1,
                pagesize:10,
                },
        }
    },
    mounted:function(){
        api.getAllProductsWithAdmin(this.pageParams).then(res =>{
          this.total=res.data.data.Count
          this.ban=res.data.data.Ban
          this.products=res.data.data.GoodsData
      })
    },
    methods:{
        getDetail(index){
        router.push("detail/"+this.products[index].gid)
        },
        CurrentPageChange(currentPage){
        this.pageParams.pagenumber=currentPage
        api.getAllProductsWithAdmin(this.pageParams).then(res =>{
          this.total=res.data.data.Count
          this.ban=res.data.data.Ban
          this.products=res.data.data.GoodsData
      })
      },
           stateFormat(row, column) {
     
    if (row.status === 0) {
      return '未审核'
    } 

    if (row.status === 1) {
      return '上架'
    } 
    if (row.status === 2) {
      return '下架'
    } 
}
    }
}
</script>

<style scoped>
.pageindex{
  justify-content: center;;
 }
</style>