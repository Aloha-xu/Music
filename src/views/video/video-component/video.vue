<template>
  <div class="video">
    <div class="content">
      <div class="navbar">
        <div class="type">
          <div class="alltype" @click="handleShowPopover">
            <el-button>{{ currentPopoverType }}</el-button>
          </div>
          <div class="hottype">
            <span
              v-for="item in hotVideoType"
              :key="item"
              @click="handleHotVideoTypeClick(item)"
              class="item"
              :class="item === currentVideoType ? 'active' : ''"
              >{{ item }}</span
            >
          </div>
        </div>
      </div>
      <div class="all-card">
        <mv-card
          v-for="(item, index) in videoInfo"
          :key="index"
          :id="item.data.vid"
          :playcount="item.data.praisedCount"
          :pic="item.data.coverUrl"
          :singer="item.data.creator.nickname.split('')"
          :text="item.data.title"
          :playType="playType"
        ></mv-card>
      </div>
      <video-type-popover
      :videoType="allvideoType"
      @handleVideoTypeClick="handleVideoTypeClick"
      v-show="isShowPopover"
    ></video-type-popover>
    </div>
    
  </div>
</template>

<script>
import MvCard from "../../../components/common/findmusic/recommend/recommend-mv/mv-card.vue";
import videoTypePopover from "../../../components/common/popover/video-type-popover.vue";
import { getVideoCategoryList, getVideoType } from "../../../network/api";
export default {
  components: { videoTypePopover, MvCard },
  name: "Video",
  data() {
    return {
      currentPopoverType: "全部视频",
      hotVideoType: [
        "翻唱",
        "听BGM",
        "生活",
        "游戏",
        "ACG音乐",
        "最佳饭制",
        "现场",
        "舞蹈",
        "MV",
      ],
      currentVideoType: "",
      allvideoType: [],
      isShowPopover: false,
      videoInfo: [],
      playType:'video'
    };
  },
  methods: {
    handleShowPopover() {
      this.isShowPopover = !this.isShowPopover;
    },
    async handleVideoTypeClick(value) {
      console.log(value.id);
      this.currentVideoType = value.name;
      this.currentPopoverType = value.name;
      this.isShowPopover = false;
      let flag = false;
      for (let i = 1; i <= 9; i++) {
        if (value.name === this.hotVideoType[i]) {
          flag = true;
          break;
        }
      }
      if (flag) {
        this.currentVideoType = value.name;
      } else {
        this.currentVideoType = "";
      }
      const videoInfo = await getVideoType(value.id);
      this.videoInfo = videoInfo.data.datas;
      console.log(videoInfo);
    },
    async handleHotVideoTypeClick(value) {
      this.currentVideoType = value;
      this.currentPopoverType = value;
      let index = this.allvideoType.findIndex((item) => item.name === value);
      const videoInfo = await getVideoType(this.allvideoType[index].id);
      this.videoInfo = videoInfo.data.datas;
      console.log(videoInfo);
    },
  },
  async created() {
    let res = await getVideoCategoryList();
    console.log(res);
    console.log(this.allvideoType);
    for (let i = 0; i < 108; i++) {
      let video = {};
      video.id = res.data.data[i].id;
      video.name = res.data.data[i].name;
      this.allvideoType.push(video);
    }
    let videoInfo = await getVideoType(58107);
    this.videoInfo = videoInfo.data.datas;
    //暂停minplay的音乐播放
    this.$store.commit("stop");
  },
};
</script>

<style scoped>
@import "./video.css";
</style>