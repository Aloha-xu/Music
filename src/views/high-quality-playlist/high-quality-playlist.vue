<template>
  <div class="high-quality-playlist">
    <div class="head">
      <div class="title">精品歌单</div>
      <div class="type-btn">全部歌单</div>
    </div>
    <div class="content_">
      <div class="cards" v-for="(item, index) in hqPlaylistInfo" :key="index">
        <play-card
          :id="item.id"
          :pic="item.coverImgUrl"
          :playcount="item.playCount"
        ></play-card>
        <div class="des-text">
          <div class="name">{{ item.name }}</div>
          <div class="creator">{{ item.creator.nickname }}</div>
          <div class="des">{{ item.copywriter }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTopSonglistType, getTopSonglist } from "../../network/api";
import playCard from "../../components/common/play-card.vue";
export default {
  components: { playCard },
  name: "HighQualityPlaylist",
  data() {
    return {
      hqPlaylistInfo: "",
    };
  },
  computed: {},
  methods: {
    async getInfo() {
      const { data } = await getTopSonglistType();
      const hqPlaylist = await getTopSonglist();
      this.hqPlaylistInfo = hqPlaylist.data.playlists;
      console.log(this.hqPlaylistInfo);
      console.log(data);
    },
  },
  created() {
    this.getInfo();
  },
};
</script>

<style scoped>
@import "./high-quality-playlist.css";
</style>