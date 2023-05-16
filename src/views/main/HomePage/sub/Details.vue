<template>
  <div class="detail-wrap">
    <div class="detail-left">
        <div class="product-board">
            <img src="../../../../assets/image/1.png" alt="" style="width:120px">
            <ul>
                <router-link v-for="(item,index) in detailsNav" :key="index" :to="'/details/'+item.url" active-class="active" class="link">
                    {{ item.title }}
                </router-link>
                <!-- <li v-for="(item,index) in detailsNav" :key="index" to="/details/golife">
                    {{ item.title }}
                </li> -->
                
            </ul>
        </div>
    </div>
    <div class="detail-right">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
 data(){
     return{
        detailsNav:[
                {
                    title:"原神",
                    desc:"开放世界游戏",
                    url:"openproduct",
                    avatar:"http://127.0.0.1/file/系统头像0.jpg"
                },
                {
                    title:"原神",
                    desc:"开放世界游戏",
                    url:"logo",
                    avatar:"http://127.0.0.1/file/系统头像0.jpg"
                },
                {
                    title:"原神",
                    desc:"开放世界游戏",
                    url:"golife",
                    avatar:"http://127.0.0.1/file/系统头像0.jpg"
                },
                {
                    title:"原神",
                    desc:"开放世界游戏",
                    url:"heigh",
                    avatar:"http://127.0.0.1/file/系统头像0.jpg"
                }
        ]
     }
 }
}
</script>

<style scoped>
.detail-wrap{
    width:1200px;
    margin:0 atuo;
    overflow:hidden;
    padding-top:20px;
}
.detail-left{
    float: left;
    width:200px;
    text-align:center;
    margin-left: 50px;
}
.detail-right{
    float: left;
    width:980px;
    margin-left: -30px;
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
