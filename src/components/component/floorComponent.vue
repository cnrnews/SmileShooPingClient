<template>
    <div>
   <!--不规则楼层-->
   <div class="floor-title">{{floorTitle}}</div>
        <div class="floor-normally">
          <div class="floor1" @click="goodsInfo(floor1.goodsId)">
            <img :src="floor1.image" width="100%"/>
          </div>
          <div>
            <div class="floor2"  @click="goodsInfo(floor2.goodsId)">
             <img :src="floor2.image" width="100%"/>
            </div>
            <div  @click="goodsInfo(floor3.goodsId)">
                <img :src="floor3.image" width="100%"/>
            </div>
          </div>
        </div>
        <!--规则楼层-->
        <div class="floor-rule">
          <div v-for="(item,index) in floor.slice(1)" :key="index"  @click="goodsInfo(item.goodsId)">
              <img :src="item.image" width="100%"/>
          </div>
        </div>
    </div>
</template>
<style scoped>
.floor-title {
  height: 1.8rem;
  line-height: 1.8rem;
  text-align: center;
  tab-size: 14px;
}
</style>


<script>
export default {
  props: ["floorData", "floorTitle"],
  data() {
    return {
      floor: [],
      floor1: {},
      floor2: {},
      floor3: {}
    };
  },
  watch: {
    floorData: function(val) {
      this.floor = this.floorData;
      this.floor1 = this.floor[0];
      this.floor2 = this.floor[1];
      this.floor3 = this.floor[2];
    }
  },
  methods: {
    goodsInfo(goodsId) {
      this.$router.push({
        name: "Goods",
        params: {
          goodsId: goodsId
        }
      });
    }
  }
};
</script>

<style scoped>
.floor-rule {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #fff;
}
.floor-rule div {
  width: 10rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  border-bottom: 1px solid #ddd;
}
.floor-rule div:nth-child(odd) {
  border-right: 1px solid #ddd;
}
.floor1 {
  border-right: 1px solid #ddd;
}
.floor2 {
  border-bottom: 1px solid #ddd;
}
.floor-normally {
  display: flex;
  flex-direction: row;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
}
.floor-normally div {
  width: 10rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
</style>