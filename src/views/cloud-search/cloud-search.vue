<template>
  <div class="cloud-search">
    <div class="title" v-if="titleValue">找到{{ titleValue }}</div>
    <div class="navbar">
      <div
        v-for="(item, index) in navbar"
        :key="index"
        @click="itemClick(index)"
        class="item"
        :class="currentIndex === index ? 'active' : ''"
      >
        {{ item }}
      </div>
    </div>
    <hr />
    <div class="cloud-search-content" v-show="setDelay">
      <search-detail-solo
        v-show="currentIndex === 0"
        :searchResult="searchResult"
      ></search-detail-solo>
      <search-detail-singer
        v-show="currentIndex === 1"
        :singerInfo="singerInfo"
      ></search-detail-singer>
      <search-detail-album
        v-show="currentIndex === 2"
        :albumInfo="albumInfo"
      ></search-detail-album>
      <search-detail-video
        v-show="currentIndex === 3"
        :videoInfo="mvInfo"
      ></search-detail-video>
      <search-detail-playlist
        v-show="currentIndex === 4"
        :playlistInfo="playlistInfo"
      ></search-detail-playlist>
      <search-detail-lyric v-show="currentIndex === 5"></search-detail-lyric>
      <search-detail-anchor
        v-show="currentIndex === 6"
        :anchorInfo="anchorInfo"
      ></search-detail-anchor>
      <search-detail-user
        v-show="currentIndex === 7"
        :userInfo="userInfo"
      ></search-detail-user>
    </div>
    <loading v-show="!setDelay"></loading>
  </div>
</template>

<script>
import searchDetailAlbum from "../../components/common/search/search-detail-album/search-detail-album.vue";
import SearchDetailAnchor from "../../components/common/search/search-detail-anchor/search-detail-anchor.vue";
import SearchDetailLyric from "../../components/common/search/search-detail-lyric/search-detail-lyric.vue";
import SearchDetailPlaylist from "../../components/common/search/search-detail-playlist/search-detail-playlist.vue";
import SearchDetailSinger from "../../components/common/search/search-detail-singer/search-detail-singer.vue";
import SearchDetailSolo from "../../components/common/search/search-detail-solo/search-detail-solo.vue";
import SearchDetailUser from "../../components/common/search/search-detail-user/search-detail-user.vue";
import SearchDetailVideo from "../../components/common/search/search-detail-video/search-detail-video.vue";
import Loading from "../../components/common/icon-loading/loading.vue";
import { getCloudSearch, getSearchMultimatch } from "../../network/api";
export default {
  components: {
    searchDetailAlbum,
    SearchDetailAnchor,
    SearchDetailLyric,
    SearchDetailPlaylist,
    SearchDetailSinger,
    SearchDetailSolo,
    SearchDetailUser,
    SearchDetailVideo,
    Loading
  },
  name: "CloudSearch",
  data() {
    return {
      navbar: [
        "单曲",
        "歌手",
        "专辑",
        "视频",
        "歌单",
        "歌词",
        "主播电台",
        "用户",
      ],
      currentIndex: 0,
      searchResult: [],
      titleValue: null,

      //每一个分页面下的数据
      soloInfo: {},
      singerInfo: {},
      albumInfo: {},
      playlistInfo: {},
      userInfo: {},
      mvInfo: {},
      lyricInfo: {},
      anchorInfo: {},

      setDelay:false
    };
  },
  async created() {
    setTimeout(() => {
      this.setDelay = true
    }, 1500);
    this.getInfo();
    this.itemClick(this.currentIndex);
  },
  methods: {
    itemClick(value) {
      switch (value) {
        case 0:
          this.currentIndex = value;
          this.titleValue = `${this.soloInfo.songCount}` + "首歌单";
          break;
        case 1:
          this.currentIndex = value;
          this.titleValue = `${this.singerInfo.artistCount}` + "位歌手";
          break;
        case 2:
          this.currentIndex = value;
          this.titleValue = `${this.albumInfo.albumCount}` + "张专辑";
          break;
        case 3:
          this.currentIndex = value;
          this.titleValue = `${this.mvInfo.mvCount}` + "个视频";
          break;
        case 4:
          this.currentIndex = value;
          this.titleValue = `${this.playlistInfo.playlistCount}` + "个歌单";
          break;
        case 5:
          this.currentIndex = value;
          this.titleValue = `${this.lyricInfo.songCount}` + "首歌词";
          break;
        case 6:
          this.currentIndex = value;
          this.titleValue = `${this.anchorInfo.djRadiosCount}` + "个电台";
          break;
        case 7:
          this.currentIndex = value;
          this.titleValue = `${this.userInfo.userprofileCount}` + "位用户";
          break;
      }
    },
    async getInfo() {
      let solo = await getCloudSearch(this.$route.query.keywords, 1);
      let searchResult = await getSearchMultimatch(this.$route.query.keywords);
      this.searchResult = searchResult.data.result.artist;
      let albumInfo = await getCloudSearch(this.$route.query.keywords, 10);
      let singerInfo = await getCloudSearch(this.$route.query.keywords, 100);
      let playlistInfo = await getCloudSearch(this.$route.query.keywords, 1000);
      let userInfo = await getCloudSearch(this.$route.query.keywords, 1002);
      let mvInfo = await getCloudSearch(this.$route.query.keywords, 1004);
      let lyricInfo = await getCloudSearch(this.$route.query.keywords, 1006);
      let anchorInfo = await getCloudSearch(this.$route.query.keywords, 1009);
      this.$store.commit("setAllSongListInfo", solo.data.result.songs);
      this.soloInfo = solo.data.result;
      this.singerInfo = singerInfo.data.result;
      this.albumInfo = albumInfo.data.result;
      this.playlistInfo = playlistInfo.data.result;
      this.lyricInfo = lyricInfo.data.result;
      this.anchorInfo = anchorInfo.data.result;
      this.userInfo = userInfo.data.result;
      this.mvInfo = mvInfo.data.result;
      // console.log(singerInfo);
      // console.log(albumInfo);
      // console.log(playlistInfo);
      // console.log(userInfo);
      // console.log(mvInfo);
      // console.log(lyricInfo);
      // console.log(anchorInfo);
    },
  },
  watch: {
    $route() {
      this.setDelay =false
      this.currentIndex = 0
      this.getInfo();
      this.itemClick(this.currentIndex);
      setTimeout(() => {
      this.setDelay = true
    }, 1500);
    },
  },
};
</script>

<style scoped>
@import "./cloud-search.css";
</style>