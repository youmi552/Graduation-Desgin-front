<template>
    <div class="swiper-size">
      <swiper :modules="modules" navigation :slides-per-view="1" :space-between="50" :pagination="{ clickable: true }" :autoplay="{delay: 1500,disableOnInteraction: false}" >
        <swiper-slide>
          <img src="../../../assets/image/荧.png" class="swiperimg"/>
        </swiper-slide>
        <swiper-slide>
          <img src="../../../assets/image/猫咪.webp" class="swiperimg"/>
        </swiper-slide>
        <swiper-slide>
          <img src="../../../assets/image/5.jpg" class="swiperimg"/>
        </swiper-slide>
      </swiper>
    </div>
  </template>

  <script>
  import 'swiper/css';
  import 'swiper/css/pagination';
  import 'swiper/css/autoplay';
  import 'swiper/css/navigation';
  
  import {Pagination, Autoplay, Navigation} from 'swiper';
  import {Swiper, SwiperSlide} from 'swiper/vue';
  export default {
    name: 'HelloWorld',
    data(){
      return{
        modules: [ Pagination , Autoplay , Navigation]
      }
        
    },
    components: {
      Swiper,
      SwiperSlide
    }
  }
  </script>
  <style scoped>
  .swiperimg{
    width:100%;
  height:500px;
  }
  </style>