<template>
  <div>
    <div>
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>
    <van-tabbar v-model="active" @change="tabChange">
      <van-tabbar-item icon="shop">首页</van-tabbar-item>
      <van-tabbar-item icon="records">分类</van-tabbar-item>
      <van-tabbar-item icon="cart">购物车</van-tabbar-item>
       <van-tabbar-item icon="contact">会员中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  },
  created() {
    this.changeTabBarActive();
  },
  updated(){
      this.changeTabBarActive();
  },
  methods: {
    tabChange(index) {
      switch (index) {
        case 0:
          this.$router.push({ name: "ShoppingMail" });
          break;
        case 1:
          this.$router.push({ name: "CategoryList" });
          break;
        case 2:
          this.$router.push({ name: "Cart" });
          break;
           case 3:
          this.$router.push({ name: "Member" });
          break;
      }
    },
    //购物车页面底部导航的处理
    changeTabBarActive() {
      let path = this.$route.path;
      if (path == "/Cart") {
        this.active = 2;
      }else if(path == '/CategoryList'){
        this.active=1;
      }else if(path == '/Member'){
        this.active=3;
      }
    }
  }
};
</script>

<style  scoped>
</style>