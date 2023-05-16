<template>
    <div class="personal-wrap">
      <div class="personal-left">
         <AdminNav/>
      </div>
      <div class="personal-right">
          <router-view></router-view>
      </div>
    </div>
  </template>
  
  <script>
  import AdminNav from "./AdminNav"
  export default {
    components:{
        AdminNav,
    },
   data(){
       return{
          
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

 
  </style>
  