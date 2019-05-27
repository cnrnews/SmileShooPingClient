<template>
  <div>
    <div class="nav-bar">
      <van-nav-bar title="购物车"></van-nav-bar>
    </div>
    <!--清空购物车-->
    <div class="cart-title">
      <van-button size="small" type="danger" @click="clearCart" plain>清空购物车</van-button>
    </div>
    <!--显示购物车中的商品-->
    <div class="cart-list">
      <div class="pang-row" v-for="(item,index) in cartinfo" :key="index">
        <div class="pang-img">
          <img :src="item.image" width="100%">
        </div>
        <div class="pang-text">
          <div class="pang-goods-name">{{item.Name}}</div>
          <div class="pang-control">
            <van-stepper v-model="item.count"/>
          </div>
        </div>
        <div class="pang-goods-price">￥{{item.price*item.count |moneyFilter}}</div>
      </div>
    </div>
    <div class="total-money">
      商品总价:￥{{totalMoney |moneyFilter}}
    </div>
  </div>
</template>

<script>
import { toMoney } from "@/filter/moneyFilter";
export default {
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  computed:{
    //计算购物总价
    totalMoney(){
      let totalMoney=0;
      this.cartinfo.forEach((item,index)=>{
        totalMoney+=item.count*item.price;
      })
      localStorage.cartinfo=JSON.stringify(this.cartinfo);
      return totalMoney;
    }
  },
  data() {
    return {
      cartinfo: [], //购物车信息
      isEmpty: false //购物车是否为空，不为空则显示true，为空显示false
    };
  },
  created() {
    this.getCartInfo();
  },
  methods: {
    getCartInfo() {
      if (localStorage.cartinfo) {
        this.cartinfo = JSON.parse(localStorage.cartinfo);
      }
      this.isEmpty = this.cartinfo.length > 0 ? true : false;
    },
    clearCart() {
      localStorage.removeItem("cartinfo");
      this.cartinfo = [];
    }
  }
};
</script>

<style   scoped>
.cart-title {
  height: 2rem;
  line-height: 2rem;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
  text-align: right;
}
.cart-list {
  background-color: #fff;
}
.pang-row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 0.5rem;
  font-size: 0.85rem;
  border-bottom: 1px solid #e4e7ed;
}
.pang-img {
  flex: 6;
}
.pang-text {
  flex: 14;
  padding-left: 10px;
}
.pang-control {
  padding-top: 10px;
}
.pang-goods-price {
  flex: 4;
  text-align: right;
}
.total-money{
  background-color: #fff;
  text-align: right;
  border-bottom: 1px solid #E4E7ED;
  padding: 5px;
}
</style>