<template>
  <div class="index-warp">
    <div class="index-left">
    <!-- <HomeNav/> -->
    <HomeMenu/>
  </div>
  <div class="index-right">
    <router-view></router-view>
  </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeMenu from "./HomeMenu"
import HomeNav from "./HomeNav"

export default {
  name: 'HomeView',
  components: {
    HomeNav,
    HomeMenu,
  }
}
</script>
<style scoped>
.index-warp{
    width: 1200px;
    margin:0 auto;
    overflow: hidden;
}
.index-left{
    float: left;
    width: 300px;
    text-align: left;
}
.index-right{
    float: left;
    width: 900px;
}

</style>