<template>
  <div class="index-board-list">
    <div 
    class="index-board-item"
    v-for="(item,index) in buyData"
    :key="index"
    :class="['index-board-'+item.url,{'line-last':index%2!==0}]"
    >
    <div class="index-board-item-inner"  :style=" {background:'url('+item.avatar+')' +' no-repeat', backgroundSize: '120px'}" >
        <h2>{{item.title }}</h2>
        <p>{{ item.desc }}</p>
        <div class="index-board-button">
            <router-link :to="'/details/'+item.url" class="button">立即购买</router-link>
        </div>
    </div>
    </div>
  </div>
</template>

<script>

export default {
    data(){
        return{
            buyData:[
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

.index-right{
    float: left;
    width: 900px;
}
.index-left-block{
    margin: 15px;
    background: #fff;
    box-shadow: 0 0 1px #ddd;
}
.index-left-block .hr{
    margin-bottom: 20px;
    height: 1px;
    width: 100%;
    background: #ddd;
}

.index-left-block h2{
    background: #4fc08d;
    color: #fff;
    padding: 10px 15px;
    margin-bottom: 20px;
}
.index-left-block h3{
    padding: 0 15px 5px 15px;
    font-weight: bold;
    color: #222;
}
.index-left-block ul {
    padding: 10px 15px;
}
.index-board-list{
    overflow: hidden;
    margin-top: 15px;
}
.index-board-item{
    float: left;
    width: 400px;
    background: #fff;
    box-shadow: 0 0 1px #ddd;
    padding: 20px;
    margin-right: 20px;
    margin-bottom: 20px;
}

.index-board-item-inner{
    min-height: 125px;
    padding-left: 12    0px;
}
/* .index-board-openproduct .index-board-item-inner{
    background: url(../../../assets/image/1.png) no-repeat;
    background-size: 120px;
}
.index-board-logo .index-board-item-inner{
    background: url(../../../assets/image/2.png) no-repeat;
    background-size: 120px;
}
.index-board-golife .index-board-item-inner{
    background: url(../../../assets/image/3.png) no-repeat;
    background-size: 120px;
}
.index-board-heigh .index-board-item-inner{
    background: url(../../../assets/image/4.png) no-repeat ;
    background-size: 120px;
} */
/* .index-board-item-inner{
    background-size: 120px;
}  */
.index-board-item h2{
    font-size: 18px;
    font-weight: bold;
    color:#000;
    margin-bottom: 15px;
}
.line-last{
    margin-right: 0;
}
.index-board-button{
    margin-top:20px;
}
.lastest-news{
    min-height:350px;
}
.hot-tag{
    background: red;
    color: #fff;
}
.new-item{
    display: inline-block;
    width: 230px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.swiperimg{
    width:100%;
    height:350px;
}
.swiper-size{
    margin-top:15px;
}
.button{
    background: #4fc08d;
    color:#fff;
    display:inline-block;
    padding:10px 20px;
    cursor: pointer;
}
</style>
