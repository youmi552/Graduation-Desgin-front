<template>
  <el-card class="box-card" style="margin-top:15px">
    <template #header>
      <div class="card-header" style="height: 20px;">
        <span style="float:left">我卖出的</span>
        <el-button class="button" text></el-button>
      </div>
    </template>
    <el-row>
    <el-table :data="order" style="width: 100%" :key="tableKey" empty-text="订单中没有任何物品" class="table">
    <el-table-column prop="oid" label="订单编号" width="180" />
    <el-table-column prop="goodsData.goodsName"  label="物品名称" width="180" />
    <el-table-column prop="place" label="交易地址" />
    <el-table-column prop="notes" label="备注" />
    <el-table-column prop="status" label="订单状态"  :formatter="stateFormat"/>
    <el-table-column fixed="right" label="选项" width="180">
      <template #default="scope">
        <el-button link type="primary" size="small" @click.prevent="getDetail(scope.$index)"
          >详情</el-button
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
  data(){
    return{
      order:"",
      tableKey:"",
      cost:"",
      dialogFormVisible: false,
        formLabelWidth: '120px'
    }
  },
  mounted:function(){
    api.getSell().then(res=>{
      this.order=res.data.data
      console.log(this.order)
    })
  },
  methods:{
    // deleteRow(index){
    //   api.removeProductInCart(this.order[index].gid).then(res=>{
    //     if(res.data.code===200){
    //       this.order.splice(index, 1)
    //       this.getCost(this.order)
    //     }
    // })
    // },
    getDetail(index){
    router.push("/personal/orderDetail/"+this.order[index].oid)
  },
  stateFormat(row, column) {
    console.log(row)
    if (row.status === 0) {
      return '未配送'
    } 
    if (row.status === 1) {
      return '已收货'
    } 
    return '未知'
}
}
}
</script>

<style>
  .table{
    margin-top:15px;
  }
</style>