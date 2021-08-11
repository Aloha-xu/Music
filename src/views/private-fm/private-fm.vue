<template>
  <!-- 这个私人fm接口回来的数据在短时间内是相同的 没有写完minplay与私人fm接口数据的同步问题 -->
  <div class="private-fm">
    <div class="fm-content">
      <div class="record-tools">
        <div class="record">
          <div class="pic">
            <img :src="currentSongInfo.pic" class="current-pic" />
            <i
              class="el-icon-caret-right play-button"
              v-show="!playing || !goblePlayingState"
              @click="handlePlayingState"
            ></i>
            <img
              src="../../assets/icon/controltools/stop.png"
              alt=""
              v-show="playing && goblePlayingState"
              class="stop-button"
              @click="handlePlayingState"
            />
          </div>
        </div>
        <div class="tools">
          <div class="heart">
            <img
              src="../../assets/icon/heart.svg"
              alt=""
              v-show="false"
              style="height: 30px; weight: 30px"
            />
            <img
              src="../../assets/icon/heartactive.svg"
              alt=""
              style="height: 30px; weight: 30px"
            />
          </div>
          <div class="delete">
            <i class="el-icon-delete" style="font-size: 30px"></i>
          </div>
          <div class="next" @click="nextSong">
            <i class="el-icon-caret-right" style="font-size: 30px"></i>
          </div>
          <div class="more">
            <i class="el-icon-more" style="font-size: 30px"></i>
          </div>
        </div>
      </div>
      <div class="song-info">
        <div class="song-name">{{ currentSongInfo.name }}</div>
        <div class="album-name">
          专辑：<span>{{ currentSongInfo.album }}</span>
        </div>
        <div class="singer-name">
          歌手：<span v-for="item in currentSongInfo.singer" :key="item">{{
            item
          }}</span>
        </div>
        <!-- 纯音乐的时候显示为该音乐为纯音乐的文字 -->
        <div class="lyric" ref="lyric" v-show="currentSongInfo.lyric">
          <div
            v-for="(item, index) in currentSongInfo.lyric"
            :key="index"
            class="lyric-item"
          >
            {{ item.content }}
          </div>
        </div>
        <div class="noLyric" v-show="!currentSongInfo.lyric">纯音乐</div>
      </div>
    </div>
    <div class="comment">
      <comment
        :commentInfo="commentInfo"
        @refeshCommrnt="getCommentInfo"
      ></comment>
    </div>
  </div>
</template>

<script>
import Comment from "../../components/common/play-list-detail/comment.vue";
import { parseLyric } from "../../utils/lyric";
import {
  fm,
  getSongUrl,
  getSongLyric,
  getMusicComment,
} from "../../network/api";
export default {
  name: "PrivateFM",
  data() {
    return {
      textarea: "",
      commentInfo: [],
      currentSongInfo: null,
      playing: true,
      playList: [],
      tag: true,
    };
  },
  methods: {
    //私人fm接口数据
    async getSongInfo() {
      const { data } = await fm();
      const Urls = await getSongUrl(data.data.map(({ id }) => id));
      for (let i = 0; i < data.data.length; i++) {
        let currentSongInfo = {};
        currentSongInfo.id = data.data[i].id;
        currentSongInfo.url = "";
        for (let j = 0; j < Urls.data.data.length; j++) {
          if (Urls.data.data[j].id == currentSongInfo.id) {
            currentSongInfo.url = Urls.data.data[j].url;
          }
        }
        currentSongInfo.name = data.data[i].name;
        currentSongInfo.album = data.data[i].album.name;
        currentSongInfo.singer = data.data[i].artists.map(({ name }) => name);
        currentSongInfo.pic = data.data[i].album.blurPicUrl;
        currentSongInfo.totleTime = data.data[i].duration;
        currentSongInfo.lyric = null;
        this.playList.push(currentSongInfo);
      }
      this.currentSongInfo = this.playList[0];
      this.getCommentInfo();
      this.getLyricInfo();
      this.$store.commit("setAllSongsToPlayList", this.playList);
      this.$store.commit("changeCurrentPlay", this.currentSongInfo);
      this.$store.commit("setIsLoad", true);
    },

    handlePlayingState() {
      if (this.playing) {
        this.$store.commit("stop");
      } else {
        this.$store.commit("play");
      }
      this.playing = !this.playing;
    },

    async getCommentInfo() {
      let comment = await getMusicComment(this.currentSongInfo.id);
      this.commentInfo = comment.data.comments;
    },

    async getLyricInfo() {
      let lyric = await getSongLyric(this.currentSongInfo.id);
      this.currentSongInfo.lyric = parseLyric(lyric.data.lrc.lyric);
    },

    //点击下一首歌曲按钮
    nextSong() {
      //判断是否是最后一首
      //是 --》请求数据     不是 --》切下一首
      if (this.currentSongIndex === this.playList.length - 1) {
        //清除原有的数据
        this.currentSongInfo = null;
        this.playList = [];
        this.$store.commit("setCurrentIndex", 0);
        this.playing = true;
        //再一次请求数据
        this.getSongInfo();
      } else {
        this.playing = true;
        this.$store.commit("setCurrentIndex", this.currentSongIndex + 1);
        this.currentSongInfo = this.playList[this.currentSongIndex];
        this.$store.commit("changeCurrentPlay", this.currentSongInfo);
        this.getCommentInfo();
        this.getLyricInfo();
      }
    },
    currentPlayTime(values, index) {
      let flag = false;
      //快进或者减慢歌词速度控制变量
      let controlLyricSpeedValues = -0.5;
      let currentTime =
        this.$store.state.currentTime / 1000 + controlLyricSpeedValues;
      if (
        currentTime >= values.time &&
        currentTime < this.$store.state.currentSongInfo.lyric[index + 1].time &&
        index <= this.$store.state.currentSongInfo.lyric.length
      ) {
        flag = true;
      }
      return flag;
    },
  },
  async created() {
    this.getSongInfo();
  },
  components: {
    Comment,
  },
  activated() {
    this.getSongInfo();
    this.updataInfo();
  },
  computed: {
    goblePlayingState() {
      return this.$store.state.playing;
    },
    currentSongIndex() {
      return this.$store.state.currentIndex;
    },
  },
  watch: {
    tag: () => {},
  },
};
</script>

<style scoped>
@import "./private-fm.css";
</style>