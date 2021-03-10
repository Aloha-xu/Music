<template>
  <div class="all-mv-papg">
    <div class="content">
    <div class="title">全部MV</div>
      <div class="select-bar">
        <div class="left">地区：</div>
        <div class="right">
          <div
            :class="currentArea === item ? 'active' : ''"
            v-for="item in selectBarInfo[0].area"
            :key="item"
            @click="handleclickArea(item)"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="select-bar">
        <div class="left">类型：</div>
        <div class="right">
          <div
            :class="currentType === item ? 'active' : ''"
            v-for="item in selectBarInfo[1].type"
            :key="item"
            @click="handleClickType(item)"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="select-bar">
        <div class="left">排序：</div>
        <div class="right">
          <div
            :class="currentOrder === item ? 'active' : ''"
            v-for="item in selectBarInfo[2].order"
            :key="item"
            @click="handleClickOrder(item)"
          >
            {{ item }}
          </div>
        </div>
      </div>

      <div class="card">
          <mv-card
            v-for="item in mvInfo"
            :key="item.id"
            :id="item.id"
            :pic="item.cover"
            :playcount="item.playCount"
            :singer="item.artists.map(({ name }) => name)"
            :text="item.name"
            class="item"
          ></mv-card>
        </div>
    </div>
  </div>
</template>

<script>
import MvCard from "../../../components/common/findmusic/recommend/recommend-mv/mv-card.vue";
import {getAllMv} from '../../../network/api'
export default {
  name: "AllMvPapg",
  components:{MvCard},
  data() {
    return {
      selectBarInfo: {
        0: { area: ["全部", "内地", "港台", "欧美", "日本", "韩国"] },
        1: { type: ["全部", "官方版", "原生", "现场版", "网易出品"] },
        2: {order: ["上升最快", "最热", "最新"],},
      },
      currentArea: "全部",
      currentType: "全部",
      currentOrder: "上升最快",
      mvInfo:[]
    };
  },
  methods: {
      handleclickArea(values){
          this.currentArea=values
          this.getAllMvInfo()
      },
      handleClickType(values){
          this.currentType=values
          this.getAllMvInfo()
      },
      handleClickOrder(values){
          this.currentOrder=values
          this.getAllMvInfo()
      },
      async getAllMvInfo(){
          const {data} = await getAllMv(this.currentArea,this.currentType,this.currentOrder,60,0)
          this.mvInfo=data.data
      }
  },
  //当页面被缓存了 再一次返回页面执行的钩子函数
  activated(){
      console.log("我是再次返回执行的activated钩子函数")
      if(this.$route.query.area){
          this.currentArea=this.$route.query.area
      }
      if(this.$route.query.type){
          this.currentArea="全部"
          this.currentOrder="最新"
          this.currentType=this.$route.query.type
      }
      if(this.$route.query.order){
          this.currentArea="全部"
          this.currentType="全部"
          this.currentOrder=this.$route.query.order
      }
      this.getAllMvInfo()
  }
};
</script>

<style scoped>
@import "./all-mv-papg.css";
</style>