<template>
    <div>
       <div class="navbar-div">
            <van-nav-bar
            title="商品详情"
            left-title="返回"
            left-arrow
            @click-left="goBack"
            />
        </div>
       <div class="topimage-div">
            <img :src="goodsInfo.IMAGE1" width="100%">
        </div> 
        <div class="goods-name">{{goodsInfo.NAME}}</div>
    <div class="goods-price">价格：{{goodsInfo.PRESENT_PRICE |moneyFilter}}</div>
     <div>
        <van-tabs swipeable sticky >
        <van-tab title="商品详情">
          <div class="detail" v-html="goodsInfo.DETAIL">
          </div>
        </van-tab>
        <van-tab title="评价">
            正在制作中
        </van-tab>
        </van-tabs>
    </div>   
<div class="goods-bottom">
    
    <div>
            <van-button size="large" type="primary" @click="addGoodToCart">加入购物车</van-button>
    </div>
    <div>
            <van-button size="large" type="danger">直接购买</van-button>
    </div>
    
</div>


    </div>
</template>

<script>
import axio from "axios";
import url from "@/serviceAPI.config.js";
import { toMoney } from "@/filter/moneyFilter.js";
import { Toast } from "vant";
export default {
  components: {
    Toast
  },
  data() {
    return {
      goodsId: "",
      goodsInfo: {}
    };
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  created() {
    this.goodsId = this.$route.query.goodsId
      ? this.$route.query.goodsId
      : this.$route.params.goodsId;
    this.getGoodsInfo();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    //获取商品详情
    getGoodsInfo() {
      axio({
        url: url.getDetailGoodsInfo,
        method: "post",
        data: {
          goodsId: this.goodsId
        }
      })
        .then(response => {
          if (response.data.code == 200 && response.data.message) {
            this.goodsInfo = response.data.message;
          } else {
            Toast("服务器错误，数据取得失败");
          }
        })
        .catch(message => {
          Toast.fail(message);
        });
    },
    //添加商品信息到购物车
    addGoodToCart() {
      //取出购物车商品信息
      let cartinfo = localStorage.cartinfo
        ? JSON.parse(localStorage.cartinfo)
        : [];
      //是否存在
      let isExits = cartinfo.find(cart => cart.goodsId == this.goodsId);
      if (!isExits) {
        let newCart = {
          goodsId: this.goodsInfo.ID,
          Name: this.goodsInfo.NAME,
          price: this.goodsInfo.PRESENT_PRICE,
          image: this.goodsInfo.IMAGE1,
          count: 1
        };
        Toast.success('添加成功')
         //存储
        cartinfo.push(newCart);
        localStorage.cartinfo = JSON.stringify(cartinfo);
      } else {
        Toast.fail("此商品已存在购物车!");
      }
      this.$router.push({
        name:'Cart'
      })
    }
  }
};
</script>

<style  scoped>
detail {
  font-size: 0px;
}
.goods-name {
  background-color: #fff;
}
.goods-price {
  background-color: #fff;
}
.goods-bottom {
  position: fixed;
  bottom: 0px;
  left: 0px;
  background-color: #fff;
  width: 100%;

  display: flex;
  flex-direction: row;
  flex-flow: nowrap;
}
.goods-bottom > div {
  flex: 1;
  padding: 5px;
}
</style>