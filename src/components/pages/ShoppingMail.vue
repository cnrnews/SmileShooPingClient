
<template>
  <div>
    <div class="search-bar">
        <van-row>
            <van-col span="3">
                <img :src="locationIcon" width="100%" class="location-icon">
            </van-col>
            <van-col span="16">
                <input type="input" class="search_input" placeholder="查找">
            </van-col>
            <van-col span="5">
                <van-button size="mini">查找</van-button>
            </van-col>
        </van-row>
    </div>
    <!--swipe-area-->
    <div  class="swipe-area">
      <van-swipe :autoplay="1000">
        <van-swipe-item v-for="(pic,index) in bannerPicArray" :key="index">
          <img v-lazy="pic.image" width="100%">
        </van-swipe-item>
      </van-swipe>
    </div>
    <!--category-->
      <div class="type-bar">
        <div  v-for="(cate,index) in category" :key="index">
            <img v-lazy="cate.image" width="90%">
          <span>{{cate.mallCategoryName}}</span>
        </div>
      </div>
      <!--advertesPicture-->
      <div>
        <img v-lazy="advertesPicture" width="100%">
      </div>
      <!--商品推荐-->
      <div class="recommand-area">
        <div class="recommand-title">
          商品推荐
        </div>
        <div class="recommand-body">
          <swiper :options="swiperOption">
            <swiper-slide v-for="(item,index) in recommendGoods" :key="index">
              <div class="recommand-item" @click="goodsInfo(item.goodsId)">
                <img v-lazy="item.image" width="80%">
                <div>{{item.goodsName}}</div>
                  <div>￥{{item.price |moneyFilter}}(￥{{item.mallPrice |moneyFilter}})</div>
              </div>
            </swiper-slide>
          </swiper>
          </div>
      </div>
       <floorComponent :floorData="floor" :floorTitle="floorName.floor1"></floorComponent>
        <floorComponent :floorData="floor2" :floorTitle="floorName.floor2"></floorComponent>
         <floorComponent :floorData="floor3" :floorTitle="floorName.floor3"></floorComponent>
         <!--热卖商品-->
        <div class="hot-area">
            <div class="hot-title">热卖商品</div>
            <div class="hot-goods">
                  <van-list>
                    <van-row :gutter='20'>
                      <van-col :span='12' v-for="(item,index) in hotGoods" :key="index">
                        <goods_info :goodsId='item.goodsId' :goodsImage='item.image' :goodsName='item.name' :goodsPrice='item.mallPrice'></goods_info>
                      </van-col>
                    </van-row>
                  </van-list>
                </div>
        </div>
  </div>
</template>
<style scoped>
.hot-goods {
  height: 130rem;
  overflow: hidden;
  background-color: #fff;
}
.hot-area {
  background-color: #fff;
}
.hot-title {
  height: 1.8rem;
  line-height: 1.8rem;
  text-align: center;
  tab-size: 14px;
}
.recommand-body {
  border-bottom: 1px solid #eee;
}
.recommand-item {
  width: 90%;
  border-right: 1px solid #f0f0f0;
  font-size: 14px;
  text-align: center;
}
.recommand-area {
  margin-top: 0.3rem;
  background-color: #fff;
}
.recommand-title {
  font-size: 14px;
  padding: 0.2rem;
  color: #e5017d;
  border-bottom: 1px solid #f0f0f0;
}
.type-bar {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin: 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  background-color: #fff;
}
.type-bar div {
  font-size: 12px;
  padding: 0.3rem;
  flex: 1;
  text-align: center;
}
.swipe-area {
  clear: both;
  overflow: hidden;
  max-height: 10rem;
}
.location-icon {
  padding-bottom: 0.4rem;
}
.search-bar {
  height: 2.2rem;
  line-height: 2.2rem;
  background-color: #e5017d;
  overflow: hidden;
}
.search_input {
  width: 100%;
  background-color: #e5017d;
  height: 1.3rem;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 1px solid 1px !important;
  color: white;
}
input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  /* WebKit browsers */
  color: white;
}
input:-moz-placeholder,
textarea:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: white;
}
input::-moz-placeholder,
textarea::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: white;
}
input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: white;
}
</style>
<script>
import axios from "axios";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import floorComponent from "../component/floorComponent";
import goods_info from "../component/goodsInfoComponent";
import { toMoney } from "@/filter/moneyFilter.js";
import url from '@/serviceAPI.config.js'

export default {
  components: {
    swiper,
    swiperSlide,
    floorComponent,
    goods_info
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 3
      },
      locationIcon: require("../../assets/images/location.png"),
      bannerPicArray: [],
      category: [],
      advertesPicture: "",
      recommendGoods: [],
      floor: [],
      floor2: [],
      floor3: [],
      floorName: {},
      hotGoods: []
    };
  },
  methods:{
    goodsInfo(goodsId){
      this.$router.push({
        name:'Goods',
        params:{
            goodsId: goodsId
        }
      })
    }
  },
  created() {
    axios({
      url: url.getShoppingMail,
      method: "get"
    })
      .then(response => {
        this.category = response.data.data.category;
        this.advertesPicture =
          response.data.data.advertesPicture.PICTURE_ADDRESS;
        this.bannerPicArray = response.data.data.slides;
        this.recommendGoods = response.data.data.recommend;
        this.floor = response.data.data.floor1;
        this.floor2 = response.data.data.floor2;
        this.floor3 = response.data.data.floor3;
        this.floorName = response.data.data.floorName;
        this.hotGoods = response.data.data.hotGoods;
      })
      .catch(error => {
      });
  }
};
</script>
