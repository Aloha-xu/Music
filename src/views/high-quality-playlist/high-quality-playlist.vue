<template>
  <div class="high-quality-playlist">
    <div class="head">
      <div class="title">
        精品歌单
        <div class="type-btn" @click="handleTypeBtn">{{currentPopoverType}}</div>
      </div>
    </div>
    <div class="content">
      <div class="cards" v-for="(item, index) in hqPlaylistInfo" :key="index">
        <play-card
          :id="item.id"
          :pic="item.coverImgUrl"
          :playcount="item.playCount"
        ></play-card>
        <div class="des-text">
          <div class="name">{{ item.name }}</div>
          <div class="creator">by{{ item.creator.nickname }}</div>
          <div class="des">{{ item.copywriter }}</div>
        </div>
      </div>
    </div>
    <video-type-popover :videoType="type" @handleVideoTypeClick="clickShowOrClosePopover" v-show="isShow" class="hq-popver"></video-type-popover>
  </div>
</template>

<script>
import { getTopSonglistType, getTopSonglist } from "../../network/api";
import playCard from "../../components/common/play-card.vue";
import VideoTypePopover from "../../components/common/popover/video-type-popover.vue";
export default {
  components: { playCard, VideoTypePopover },
  name: "HighQualityPlaylist",
  data() {
    return {
      hqPlaylistInfo: "",
      type: [],
      isShow:false,
      currentPopoverType: "全部视频",
    };
  },
  computed: {},
  methods: {
    async getInfo() {
      const { data } = await getTopSonglistType();
      data.tags.forEach((e) => {
        this.type.push({name:e.name});
      });
      const hqPlaylist = await getTopSonglist();
      this.hqPlaylistInfo = hqPlaylist.data.playlists;
    },
    async clickShowOrClosePopover(v){
        this.currentPopoverType = v.name
        this.isShow = false
        const hqPlaylist = await getTopSonglist(v.name);
        this.hqPlaylistInfo = hqPlaylist.data.playlists;
    },
    handleTypeBtn(){
        if(this.isShow){
            this.isShow = false
        }else{
            this.isShow = true
        }
    }
  },
  created() {
    this.getInfo();
  },
};
</script>

<style scoped>
@import "./high-quality-playlist.css";
</style>