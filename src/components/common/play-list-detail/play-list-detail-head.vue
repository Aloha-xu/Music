<template>
  <div class="playlistdetail-head">
    <div class="left">
      <img :src="values.coverImgUrl" alt="" />
    </div>
    <div class="right">
      <div class="title">
        <span class="songlist-type">{{ values.titleType }}</span>
        <span class="songlist-name">{{ values.name }}</span>
        <i
          v-show="isShowUpdataComponent"
          class="el-icon-edit-outline"
          style="
            font-size: 25px;
            vertical-align: middle;
            cursor: pointer;
            margin-left: 5px;
          "
          @click="handleToUpdataPapg"
        ></i>
      </div>
      <div class="creator-info" v-if="isShowPlayListComponent">
        <img :src="values.avatarUrl" alt="" class="head-portrait" />
        <span class="creator-name" @click="clickToUserDetailPapg">{{
          values.nickname
        }}</span>
        <span class="create-time">{{ values.createTime }}</span>
      </div>
      <div class="tools">
        <el-button round type="danger">
          <span class="el-icon-caret-right" @click="handlePlayAllSongs"
            >播放全部</span
          >
          <span class="el-icon-plus play-all"></span>
        </el-button>
        <el-button
          round
          @click="handleCollectSonglist"
          v-if="isShowPlayListComponent && !values.subscribed"
          :style="
            isShowUpdataComponent ? 'pointer-events: none; opacity: 0.6;' : ''
          "
        >
          <span class="el-icon-folder-add"
            >收藏({{ values.subscribedCount }}万)</span
          >
        </el-button>
        <el-button
          round
          @click="handleCollectSonglist"
          v-if="isShowPlayListComponent && values.subscribed"
        >
          <span class="el-icon-folder-add"
            >已收藏({{ values.subscribedCount }}万)</span
          >
        </el-button>
        <el-button round>
          <span class="el-icon-edit-outline"
            >分享({{ values.shareCount }})</span
          >
        </el-button>
        <el-button round>
          <span class="el-icon-download">下载全部</span>
        </el-button>
      </div>
      <div class="album-info" v-if="!isShowPlayListComponent">
        <span class="songer">歌手：{{values.singer}}</span>
        <span class="time">时间：{{values.publishTime}}</span>
      </div>
      <span class="biaoqian" v-if="isShowPlayListComponent">标签：</span>
      <span
        class="songlist-title"
        v-for="item in values.tags"
        :key="item"
        v-show="isShowPlayListComponent"
        >{{ item }}
      </span>
      <span class="updata-type" v-if="isShowPlayListComponent && values.tags.length === 0">添加标签</span>
      <div class="song-other-info" v-if="isShowPlayListComponent">
        歌曲：{{ values.trackCount }} 播放：{{ values.playCount }}万
      </div>
      <div
        v-if="isShowPlayListComponent"
        class="description"
        :style="
          isShowDescription === true
            ? 'overflow: visible;'
            : 'overflow: hidden;'
        "
      >
        简介：<span
          class="updata-desc"
          @click="handleToUpdataPapg"
          v-show="values.description == ''"
          >添加简介</span
        >{{ values.description }}
      </div>
    </div>
    <div
      v-if="isShowPlayListComponent"
      class="el-icon-caret-bottom show-description"
      @click="showDescription()"
    ></div>
  </div>
</template>

<script>
export default {
  name: "PlayListDetailHead",
  props: {
    values: Object,
    isShowPlayListComponent: Boolean,
    playList: Array,
  },
  data() {
    return {
      isShowDescription: false,
    };
  },
  methods: {
    showDescription() {
      this.isShowDescription = !this.isShowDescription;
    },
    handlePlayAllSongs() {
      this.$store.commit("setAllSongsToPlayList", this.playList);
      this.$store.commit("changeCurrentPlay", this.playList[0]);
    },
    handleCollectSonglist() {
      this.$emit("handleCollectSonglist");
    },
    handleToUpdataPapg() {
      this.$router.push("/userupdata/" + this.$route.params.id);
    },
    clickToUserDetailPapg() {
      this.$router.push("/userdetail/" + this.info.creator.userId);
    },
  },
  computed: {
    isShowUpdataComponent() {
      return this.$store.state.isShowUpdataComponent;
    },
  },
};
</script>

<style scoped>
@import "./play-list-detail-head.css";
</style>