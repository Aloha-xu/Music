<template>
  <div class="search-detail-video">
    <div class="content">
      <mv-card
        v-for="(item, index) in videoInfo.mvs"
        :key="index"
        :pic="item.cover"
        :id="String(item.id)"
        :playcount="item.playCount"
        :playType="playType"
        :singer="item.artistName.split('')"
        :text="item.name"
        @handleToPapg="handleToSingerPapg(item.id)"
      ></mv-card>
    </div>
  </div>
</template>

<script>
import mvCard from "../../findmusic/recommend/recommend-mv/mv-card.vue";
export default {
  components: { mvCard },
  name: "SearchDetailVideo",
  props: {
    videoInfo: Object,
  },
  data() {
    return {
      playType: "video",
    };
  },
};
</script>

<style scoped>
@import "./search-detail-video.css";
</style>