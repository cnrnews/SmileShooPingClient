<template>
    <div>
        <swiper>
            <swiper-slide class="swiper-slide" v-for="(item,index) in slides" :key="index">
                Slide:{{item}}
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
    import 'swiper/dist/css/swiper.css'
    import {swiper,swiperSlide} from 'vue-awesome-swiper'
    export default {
        components:{
            swiper,
            swiperSlide
        },
        data() {
            return {
                slides:[
                    1,2,3,4
                ]
            }
        },
    }
</script>

<style scoped>
.swiper-slide{
    height: 4rem;
    background-color: pink
}
</style>