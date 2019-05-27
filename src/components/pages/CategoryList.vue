<template>
  <div>
    <div>
      <van-nav-bar title="分类列表"/>
    </div>
    <van-row>
      <!--分类菜单-->
      <van-col span="6">
        <div id="leftNav">
          <ul>
            <li
              @click="clickCategory(index)"
              :class="{categoryActive:categoryIndex==index}"
              v-for="(item,index) in category"
              :key="index"
            >{{item.MALL_CATEGORY_NAME}}</li>
          </ul>
        </div>
      </van-col>
      <!--二级菜单-->
      <van-col span="18">
        <div class="tabCategorySub">
          <van-tabs v-model="activie" @click="clickCategorySub">
            <van-tab v-for="(item, index) in categorySub" :key="index" :title="item.MALL_SUB_NAME"></van-tab>
          </van-tabs>
        </div>

        <div id="list-div">
          <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
              <div
                class="list-item"
                v-for="(item,index) in goodsList"
                :key="index"
                @click="goodInfo(item)"
              >
                <div class="list-item-img">
                  <img :src="item.IMAGE1" width="100%" :onerror="errorimg">
                </div>
                <div class="list-item-text">
                  <div>{{item.NAME}}</div>
                  <div>￥{{item.ORI_PRICE}}</div>
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
export default {
  data() {
    return {
      category: [],
      categorySub: [],
      categoryIndex: 0,
      activie: 0,
      list: [],
      loading: false, //下拉加载时使用
      finished: false, //上拉刷新是否加载完毕,
      isRefresh: false, //是否下拉刷新
      page: 1, //商品页码
      goodsList: [], //商品列表
      categorySubId: 0, //二级子分类ID
      errorimg: 'this.src="' + require("@/assets/images/errorimg.png") + '"' //错误图片显示路径
    };
  },
  created() {
    this.getCategoryList();
  },
  mounted() {
    let windowHeight = document.documentElement.clientHeight;
    document.getElementById("leftNav").style.height =
      windowHeight - 46 - 50 + "px";
    document.getElementById("list-div").style.height =
      windowHeight - 90 - 50 + "px";
  },
  methods: {
    //获取商品分类列表
    getCategoryList() {
      axios({
        url: url.getCategoryList,
        method: "get"
      })
        .then(result => {
          if (result.data.code == 200 && result.data.message) {
            this.category = result.data.message;
            this.getCategorySubList(this.category[0].ID);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //商品分类列表点击
    clickCategory(index) {
      this.categoryIndex = index;
      //初始化商品列表参数
      this.page = 1;
      (this.goodsList = []), (this.finished = false);
      this.getCategorySubList(this.category[index].ID);
    },
    //点击子类获取商品信息
    clickCategorySub(index, title) {
      this.categorySubId = this.categorySub[index].ID;
      //初始化商品列表参数
      this.page = 1;
      (this.goodsList = []), (this.finished = false);
      this.onLoad();
    },
    //获取二级分类列表
    getCategorySubList(categoryId) {
      axios({
        url: url.getCategorySubList,
        method: "post",
        data: {
          categoryId: categoryId
        }
      })
        .then(response => {
          if (response.data.code == 200 && response.data.message) {
            this.categorySub = response.data.message;
            this.categorySubId = this.categorySub[0].ID;
            //每次切换分类列表默认加载第一个二级分类数据
            this.getGoodsList();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.isRefresh = false;
        this.loading = false;
        this.list = [];
        this.page = 1;
        this.onLoad();
      }, 500);
    },
    //上拉加载更多
    onLoad() {
      setTimeout(() => {
        this.categorySubId = this.categorySubId
          ? this.categorySubId
          : this.categorySub[0].ID;
        this.getGoodsList();
      }, 1000);
    },
    //加载商品列表
    getGoodsList() {
      axios({
        url: url.getGoodsListByCategorySubID,
        method: "post",
        data: {
          page: this.page,
          categorySubId: this.categorySubId
        }
      })
        .then(response => {
          if (response.data.code == 200 && response.data.message) {
            this.page++;
            this.goodsList = this.goodsList.concat(response.data.message);
          } else {
            this.finished = true;
          }
          this.loading = false;
        })
        .catch(err => {
          this.finished = true;
        });
    },
    //商品详情
    goodInfo(item) {
      this.$router.push({
        name: "Goods",
        params: {
          goodsId: item.ID
        }
      });
    }
  }
};
</script>
<style scoped>
#leftNav {
  background-color: aliceblue;
}
#leftNav ul li {
  line-height: 3rem;
  border-bottom: 1px solid #e4e7ed;
  padding: 3px;
  font-size: 0.8rem;
  text-align: center;
}
#list-div {
  overflow: scroll;
}
.categoryActive {
  background-color: #fff;
}
.list-item {
  display: flex;
  flex-direction: row;
  font-size: 0.8rem;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  padding: 5px;
}
.list-item-img {
  flex: 8;
}
.list-item-text {
  flex: 16;
  margin-top: 10px;
  margin-left: 10px;
}

.tabCategorySub {
  background-color: pink;
}
</style>