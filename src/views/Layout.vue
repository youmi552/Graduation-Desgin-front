<template>
    <div>
    <div class="menu">
        <HeaderNav/>
    </div>
    <div class="view" >    
    <router-view></router-view>
    </div>
    </div>
</template>

<script>
import HeaderNav from "@/components/HeaderNav.vue"
export default{
    components:{
        HeaderNav
    }
}
</script>

<style  scoped>
.menu{
    position: fixed;
    width: 100%;
    top:0;
    z-index: 1000;
}
.view{
    position: relative;
    top: 60px;
    z-index: 0px;
}
</style>
