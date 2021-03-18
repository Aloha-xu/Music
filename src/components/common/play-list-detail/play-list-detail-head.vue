<template>
  <!-- 这一个组件的prop数据这些在组件里面找具体数据是不好的，之前因为undefined问题改了 不想改回来了 -->
  <div class="playlistdetail-head">
    <div class="left">
      <img :src="info.coverImgUrl" alt="" />
    </div>
    <div class="right">
      <div class="title">
        <span class="songlist-type">{{ TitleType }}</span>
        <span class="songlist-name">{{ info.name }}</span>
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
      <div class="creator-info" v-if="info.creator && isShowAlbumComponent">
        <img :src="info.creator.avatarUrl" alt="" class="head-portrait" />
        <span class="creator-name" @click="clickToUserDetailPapg">{{ info.creator.nickname }}</span>
        <span class="create-time">{{ info.createTime }}</span>
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
          v-show="!info.subscribed"
          :style="isShowUpdataComponent? 'pointer-events: none; opacity: 0.6;' : ''"
        >
          <span class="el-icon-folder-add"
            >收藏({{ info.subscribedCount }}万)</span
          >
        </el-button>
        <el-button
          round
          @click="handleCollectSonglist"
          v-show="info.subscribed"
        >
          <span class="el-icon-folder-add"
            >已收藏({{ info.subscribedCount }}万)</span
          >
        </el-button>
        <el-button round>
          <span class="el-icon-edit-outline">分享({{ info.shareCount }})</span>
        </el-button>
        <el-button round>
          <span class="el-icon-download">下载全部</span>
        </el-button>
      </div>
      <div class="album-info" v-if="!isShowAlbumComponent">
        <span class="songer">歌手：</span>
        <span class="time">时间：</span>
      </div>
      <span class="biaoqian" v-if="isShowAlbumComponent">标签：</span>
      <span
        class="songlist-title"
        v-for="item in info.tags"
        :key="item"
        v-show="isShowAlbumComponent"
        >{{ item }}
      </span>
      <span class="updata-type" v-show="info.tags.length === 0">添加标签</span>
      <div class="song-other-info" v-if="info.trackIds && isShowAlbumComponent">
        歌曲：{{ info.trackIds.length }} 播放：{{ info.playCount }}万
      </div>
      <div
        v-if="isShowAlbumComponent"
        class="description"
        :style="
          isShowDescription === true
            ? 'overflow: visible;'
            : 'overflow: hidden;'
        "
      >
        简介：<span class="updata-desc" @click="handleToUpdataPapg" v-show="info.description==''"
          >添加简介</span
        >{{ info.description }}
      </div>
    </div>
    <div
      v-if="isShowAlbumComponent"
      class="el-icon-caret-bottom show-description"
      @click="showDescription()"
    ></div>
  </div>
</template>

<script>
export default {
  name: "PlayListDetailHead",
  props: {
    songListDetailInfo: Object,
    TitleType: String,
    isShowAlbumComponent: Boolean,
  },
  data() {
    return {
      isShowDescription: false,
    };
  },
  methods: {
    showDescription() {
      this.isShowDescription = !this.isShowDescription;
      console.log(this.isShowDescription);
    },
    handlePlayAllSongs() {
      this.$store.commit("setAllSongsToPlayList");
      this.$store.commit("setPlayFirstSong");
    },
    handleCollectSonglist() {
      this.$emit("handleCollectSonglist");
    },
    handleToUpdataPapg() {
      this.$router.push("/userupdata/" + this.$route.params.id);
    },
    clickToUserDetailPapg(){
      this.$router.push("/userdetail/" + this.info.creator.userId);
    }
  },
  computed: {
    info() {
      return this.songListDetailInfo;
    },
    isShowUpdataComponent(){
      return this.$store.state.isShowUpdataComponent
    }
    
  },
};
</script>

<style scoped>
@import "./play-list-detail-head.css";
</style>