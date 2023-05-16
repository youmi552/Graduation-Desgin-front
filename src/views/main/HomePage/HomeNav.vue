<template>
  
        <div class="index-left-block">
            <h2>全部产品</h2>
            <div v-for="(product,index) in productList" :key="index">
                <h3>{{ product.title }}</h3>
                <ul>
                    <li v-for="(item,index) in product.list" :key="index">
                        <a :href="item.url">{{ item.name }}</a>
                        <span class="hot-tag" v-if="item.hot">HOT</span>
                    </li>
                </ul>
            </div>
        </div>
</template>

<script>
export default {
    data(){
        return{
            productList:[
                {
                    title:"最新发布",
                    list:[
                        {
                            id:1,
                            name:"91助手",
                            url:"http://43.136.181.83",
                            hot:true,
                        },
                        {
                            id:2,
                            name:"原神",
                            url:"http://43.136.181.83",
                            hot:false,
                        },
                        {
                            id:3,
                            name:"bilibili",
                            url:"http://43.136.181.83",
                            hot:false,
                        },
                        {
                            id:4,
                            name:"网易云音乐",
                            url:"http://43.136.181.83",
                            hot:false,
                        },
                        {
                            id:5,
                            name:"斗鱼直播",
                            url:"http://43.136.181.83",
                            hot:false,
                        },
                    ]
                },
                {
                    title:"最多收藏",
                    list:[
                        {
                            id:1,
                            name:"英雄联盟",
                            url:"http://43.136.181.83",
                            hot:false,
                        },
                        {
                            id:2, 
                            name:"pubg",
                            url:"http://43.136.181.83",
                            hot:true,
                        },
                        {
                            id:3,
                            name:"WeGame",
                            url:"http://43.136.181.83",
                            hot:false,
                        },
                        {
                            id:4,
                            name:"qq音乐",
                            url:"http://43.136.181.83",
                            hot:false,
                        },
                        {
                            id:5,
                            name:"虎牙直播",
                            url:"http://43.136.181.83",
                            hot:false,
                        },
                    ]
                }
            ]
        }
    }
}
</script>

<style scoped lang="less">

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
.index-left-block li {
    padding: 5px;
    a{
        color:#222;
    }
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
    padding-left: 120px;
}
/* .index-board-openproduct .index-board-item-inner{
    background: url(../assets/image/4.png) no-repeat;
}
.index-board-logo .index-board-item-inner{
    background: url(../assets/image/4.png) no-repeat;
}
.index-board-golife .index-board-item-inner{
    background: url(../assets/image/4.png) no-repeat;
}
.index-board-heigh .index-board-item-inner{
    background: url(../assets/image/4.png) no-repeat;
} */
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