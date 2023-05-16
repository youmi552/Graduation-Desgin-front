<template>
  <el-card class="box-card" style="margin-top:15px">
    <template #header>
      <div class="card-header" style="height: 20px;">
        <span style="float:left">购物车</span>
        <el-button class="button" text></el-button>
      </div>
    </template>
    <el-row>
    <el-table :data="cart" style="width: 100%" :key="tableKey" empty-text="购物车中没有任何物品" class="table">
    <el-table-column prop="goodsName" label="物品名称" width="180" />
    <el-table-column prop="userName" label="所属用户" width="180" />
    <el-table-column prop="price" label="价格(元)" />
    <el-table-column fixed="right" label="选项" width="180">
      <template #default="scope">
        <el-button link type="primary" size="small" @click.prevent="getDetail(scope.$index)"
          >详情</el-button
        >
        <el-button link type="primary" size="small" @click.prevent="deleteRow(scope.$index)" >移出购物车</el-button>
      </template>
    </el-table-column>
    <!-- <el-table-column> <el-button type="primary" round On>移除购物车</el-button></el-table-column> -->
  </el-table>
  </el-row>
  <div style=" background-color: white; height: 40px;">
    
    <el-button type="success"  round style="font-size: small; float: right; width: 80px;margin-top: 5px;" @click="dialogFormVisible = true">创建订单</el-button>
    <!-- <div style="font-size: medium;background-color: white; float: right; margin-top: 15px; margin-right: 20px;" >总计:{{cost}}元</div> -->
    <el-text style="font-size: small;background-color: white; float: right; margin-top: 15px; margin-right: 20px;">总计:{{cost}}元</el-text>
  </div>
  <el-dialog v-model="dialogFormVisible" title="确认订单信息">
    <el-form :model="order">
      <el-form-item label="收货地址" :label-width="formLabelWidth">
        <el-input v-model="order.place" autocomplete="off" />
      </el-form-item>
      <el-form-item label="订单备注" :label-width="formLabelWidth">
        <el-input v-model="order.notes" type="textarea" :rows="8" autocomplete="off"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="createOrder()">
          创建订单
        </el-button>
      </span>
    </template>
  </el-dialog>
  </el-card>
</template>

<script>
import api from "../../../api"
import router from '../../../router'
export default { 
  data(){
    return{
      cart:"",
      tableKey:"",
      cost:"",
      dialogFormVisible: false,
      order: {
          gid:"",
          place:"",
          notes:"",
        },
        formLabelWidth: '120px'
    }
  },
  mounted:function(){
    api.getUserCart().then(res=>{
      this.cart=res.data.data
      this.getCost(this.cart)
      console.log(this.cart)
    })
  },
  methods:{
    deleteRow(index){
      api.removeProductInCart(this.cart[index].gid).then(res=>{
        if(res.data.code===200){
          this.cart.splice(index, 1)
          this.getCost(this.cart)
        }
    })
    },
    getDetail(index){
    router.push("/detail/"+this.cart[index].gid)
  },
    getCost(cart){
      this.cost=0
      cart.forEach(product => {
        this.cost=this.cost+product.price
      });
    },
    createOrder(){
      this.cart.forEach(product => {
        this.order.gid=product.gid
        api.createOrder(this.order).then(res=>{
          if(res.data.code!==200){
            this.$notify.error({
                  title: '创建订单失败！',
                  message: res.data.data,
                });
                this.dialogFormVisible = false
            return
          }
        })
      });
      this.$notify({
                  title: '创建订单成功',
                  type: 'success',
                });
      api.getUserCart().then(res=>{
      this.cart=res.data.data
      this.getCost(this.cart)
      console.log(this.cart)
    })
      this.dialogFormVisible = false
    }
}
}
</script>

<style>
  .table{
    margin-top:15px;
  }
</style>