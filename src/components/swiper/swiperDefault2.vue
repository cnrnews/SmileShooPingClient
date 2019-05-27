<template>
    <div>
        <swiper :options="swiperOptions">
            <swiper-slide class="swiper-slide" v-for="(item,index) in slides" :key="index">
                Slide:{{item}}
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      slides: [1, 2, 3, 4],
      swiperOptions: {
          loop:true,
        pagination: {
          el: ".swiper-pagination",
          clickable:true
        }
      }
    };
  }
};
</script>

<style scoped>
.swiper-slide {
  height: 3rem;
  text-align: center;
  padding-top: .3rem;
  background-color: yellow;
}
</style>