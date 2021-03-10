<template>
  <div class="mv">
    <div class="content">
      <div class="new-mv">
        <into-details-button
          :intoDetailsButtonName="newMvName"
          class="new-MV-into-button"
          @intoDetailsClick="ClickNewMv"
        ></into-details-button>
        <span
          v-for="item in area"
          :key="item"
          class="type"
          :class="item === currentArea ? 'active' : ''"
          @click="SongTypeClick(item)"
          >{{ item }}</span
        >
        <div class="card">
          <mv-card
            v-for="item in newMvInfo.data"
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
      <div class="hot-mv">
        <into-details-button
          :intoDetailsButtonName="hotMvName"
          @intoDetailsClick="ClickHotMv()"
        ></into-details-button>
        <div class="card">
          <mv-card
            v-for="item in hotMvInfo.data"
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
      <div class="wy-mv">
        <into-details-button
          :intoDetailsButtonName="wyMvName"
          @intoDetailsClick="ClickWyMv()"
        ></into-details-button>
        <div class="card">
          <mv-card
            v-for="item in wycpMvInfo.data"
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
  </div>
</template>

<script>
import MvCard from "../../../components/common/findmusic/recommend/recommend-mv/mv-card.vue";
import intoDetailsButton from "../../../components/common/into-details-button.vue";
import { getNewMv, getWYCPMv, getAllMv } from "../../../network/api";
export default {
  components: { intoDetailsButton, MvCard },
  name: "MV",
  data() {
    return {
      area: ["内地", "港台", "欧美", "日本", "韩国"],
      newMvName: "最新MV",
      hotMvName: "热门MV",
      wyMvName: "网易出品",
      currentArea: "",
      newMvInfo: [],
      wycpMvInfo: [],
      hotMvInfo: [],
    };
  },
  methods: {
    /* 处理点击热门音乐种类的点击事件 */
    async SongTypeClick(type) {
      //设置当前音乐类型
      this.currentArea = type;
      //根据选着的音乐类型更新数据
      const res1 = await getNewMv(this.currentArea, 8);
      this.newMvInfo = res1.data;
    },
    ClickNewMv(){
      this.$router.push({path:'/allmvpapg',query:{area:this.currentArea}})
    },
    ClickHotMv(){
      this.$router.push({path:'/allmvpapg',query:{order:'最热'}})
    },
    ClickWyMv(){
      this.$router.push({path:'/allmvpapg',query:{type:'网易出品'}})
    },
  },
  async created() {
    const res1 = await getNewMv(this.currentArea, 8);
    const res2 = await getWYCPMv(8);
    const res3 = await getAllMv("全部", "全部", "最热", 8, 0);
    this.newMvInfo = res1.data;
    this.wycpMvInfo = res2.data;
    this.hotMvInfo = res3.data;
    // console.log(res1);
    // console.log(res2);
    // console.log(res3);
  },
};
</script>

<style scoped>
@import "./mv.css";
</style>