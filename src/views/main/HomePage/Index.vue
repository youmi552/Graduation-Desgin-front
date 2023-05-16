<template>
  <div>
    <HomeSwiper/>
    <home-product-list/>
  </div>
</template>

<script>
import HomeSwiper from "./HomeSwiper.vue";
export default {
    components: {
    HomeSwiper,
  }
}
</script>

<style scope>
.swiper-size{
  margin-top: 15px;
}
</style>