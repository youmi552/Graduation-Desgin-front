<template>
    <div class="personal-wrap">
      <div class="personal-left">
         <PersonNav/>
      </div>
      <div class="personal-right">
          <router-view></router-view>
      </div>
    </div>
  </template>
  
  <script>
  import PersonNav from "./PersonNav.vue"
  export default {
    components:{
        PersonNav,
    },
   data(){
       return{
          personalNav:[
                  {
                      title:"个人信息",
                      url:"",
                      avatar:"http://127.0.0.1/file/系统头像0.jpg"
                  },
                  {
                      title:"我的购物车",
                      url:"cart",
                      avatar:"http://127.0.0.1/file/系统头像0.jpg"
                  },
                  {
                      title:"我的订单",
                      url:"order",
                      avatar:"http://127.0.0.1/file/系统头像0.jpg"
                  },
                  {
                      title:"我的收藏",
                      url:"collect",
                      avatar:"http://127.0.0.1/file/系统头像0.jpg"
                  },
                  {
                      title:"浏览历史",
                      url:"history",
                      avatar:"http://127.0.0.1/file/系统头像0.jpg"
                  }
          ]
       }
   }
  }
  </script>
  
  <style scoped>
  .personal-wrap{
    width: 1200px;
    margin:0 auto;
    overflow: hidden;
  }
  .personal-left{
    float: left;
    width: 300px;
    text-align: left;
  }
  .personal-right{
    position:absolute;
      float: left;
      width:900px;
      left: 500px;
      box-sizing: content-box;
  }
  .product-board {
  background: #fff;
  padding: 20px 0;
  }
  .product-board ul {
  margin-top: 20px;
  }
  .product-board li,.link{
  text-align: left;
  padding: 10px 15px;
  cursor: pointer;
  }
  .link{
  text-align: left;
  padding: 10px 15px;
  cursor: pointer;
  }
  .product-board li.active,.link.active,
  .product-board li:hover,.link:hover{
  background: #4fc08d;
  color: #fff;
  }
  .product-board li a ,.link{
  display: block;
  }
  .sales-board {
  background: #fff;
  }
  .sales-board-intro h2 {
  font-size: 20px;
  padding: 20px;
  }
  .sales-board-intro p {
  background: #f7fcff;
  padding: 10px 20px;
  color: #999;
  line-height: 1.8;
  }
  .sales-board-form {
  padding: 10px 20px;
  font-size: 14px;
  }
  .sales-board-line {
  clear: both;
  padding-bottom: 20px;
  }
  .sales-board-line-left {
  display: inline-block;
  /* width: 100px; */ 
  }
  .sales-board-line-right {
  display: inline-block;
  width: 75%;
  }
  .sales-board-des {
  border-top: 20px solid #f0f2f5;
  padding: 15px 20px;
  }
  .sales-board-des p {
  line-height: 1.6;
  }
  .sales-board-des h2 {
  font-size: 20px;
  padding-bottom: 15px;
  }
  .sales-board-des h3 {
  font-size: 18px;
  font-weight: bold;
  padding: 20px 0 10px 0;
  }
  .sales-board-des li {
  padding: 5px 0;
  }
  .sales-board-table {
  width: 100%;
  margin-top: 20px;
  }
  .sales-board-table th {
  background: #4fc08d;
  color: #fff;
  }
  .sales-board-table td {
  border: lpx solid #f0f2f5;
  padding: 15px;
  }
  </style>
  