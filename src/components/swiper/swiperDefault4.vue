<template>
    <div>
        <swiper class="swiper" :options="swiperOptions">
            <swiper-slide class="swiper-slide">
              “四川是全国森林防火重点区。”省林业和草原局资源站副站长李海林介绍，四川现有森林面积2.8亿亩，森林覆盖率为38.83%，森林面积居全国第四。


按照《全国森林防火规划（2016-2025年）》，全省有35个县（市、区）和81个县（市、区）分别被国家列为森林火灾高危区、高风险区并实施重点治理，其中，森林火灾高危区县（市、区）数量占全国的23.18%。


特别是，森林资源集中分布的川西高原和攀西地区，为干旱河谷、干热河谷广泛分布区，防火形势更严峻。


以凉山州为例，该州共有17个县市，其中有12个被纳入国家重点生态功能区，与之相对应，也有12个县市为国家一级火险县。


由于降雨偏少，每年冬季至第二年5月底之前，都是我省森林防火期。省林业和草原局统计，仅以2016年为例，全省发生森林火灾263起。其中，当年2月至4月，共计发生209起，占全年总数近八成。
            </swiper-slide>
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
      swiperOptions: {
        direction:'vertical',
        slidesPerView:'auto',
        freeMode:true,
        mousewheel:true
      }
    };
  }
};
</script>

<style scoped>
.swiper-slide {
  text-align: left;
  font-size:  18px !important;
  padding: 30px;
  height: auto;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.swiper{
  height: 300px;
  overflow: hidden;
}
</style>