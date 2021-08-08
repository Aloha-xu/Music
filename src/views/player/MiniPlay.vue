<template>
  <div class="mini-play">
    <div class="song-info">
      <div class="pic" @click="handleShowMaxPlayer">
        <img :src="currentSongInfo.pic" v-if="isLoad" />
      </div>
      <div class="song-info">
        <span class="song-name">{{ currentSongInfo.name }}</span>
        <span class="heart" v-if="isLoad">
          <img src="../../assets/icon/heart.svg" alt="">
        </span>
        <div class="artitse">
          <i v-for="item in currentSongInfo.singer" :key="item">{{ item }}</i>
        </div>
      </div>
    </div>
    <div class="control-tools">
      <div class="top">
        <div class="way-of-play" @click="handleChangePlayWay">
          <img
            src="../../assets/icon/controltools/list.png"
            v-if="wayOfPlay == 0"
          />
          <img
            src="../../assets/icon/controltools/random.png"
            v-if="wayOfPlay == 1"
          />
          <img
            src="../../assets/icon/controltools/single.png"
            v-if="wayOfPlay == 2"
          />
          <img
            src="../../assets/icon/controltools/order.png"
            v-if="wayOfPlay == 3"
          />
        </div>
        <div class="pre" @click="preSong">
          <img src="../../assets/icon/controltools/pre.png" alt="" />
        </div>
        <div class="play-stop" @click="handlePlay">
          <img
            src="../../assets/icon/controltools/play.png"
            alt=""
            v-show="!playing"
          />
          <img
            src="../../assets/icon/controltools/stop.png"
            alt=""
            v-show="playing"
          />
        </div>
        <div class="next" @click="nextSong">
          <img src="../../assets/icon/controltools/next.png" alt="" />
        </div>
        <div class="lyric">
          <img src="../../assets/icon/controltools/ci.png" alt="" />
        </div>
      </div>
      <div class="bottom">
        <div class="current-time">{{ formattime }}</div>
        <el-slider
          :show-tooltip="false"
          v-model="currentValues"
          @change="changeTime"
        ></el-slider>
        <div class="totle-time">{{ totleTime }}</div>
      </div>
    </div>
    <div class="other-tools">
      <div class="voise"></div>
      <div class="song-list" @click="controlSongLists">
        <img src="../../assets/icon/controltools/showlist.png" alt="" />
      </div>
    </div>
    <audio
      :src="currentSongInfo.url"
      autoplay
      @play="start"
      @ended="ended"
      @pause="pause"
      @timeupdate="handleCurrentTime"
      ref="audio"
    ></audio>
    <!-- 在这里写audio播放音乐 当player显示的时候 miniplayer还是在的 -->

    <!-- 歌单信息 -->
    <el-drawer
      :visible.sync="drawer"
      :with-header="false"
      size="420px"
      class="drawer"
    >
      <div class="song-list">
        <div class="top">
          <span class="totle-song">总共{{songList.length}}首</span>
          <div class="collect" @click="handleCollectAll">
            <i class="el-icon-folder-add"></i>
            <span>收藏全部</span>
          </div>
          <div class="clear" @click="handleClearAll">
            <i class="el-icon-delete"></i>
            <span>清空</span>
          </div>
        </div>
        <div class="content">
          <div v-for="(item, index) in songList" :key="index" class="item">
            <div
              class="song"
              :class="item.id === currentSongInfo.id ? 'active' : ''"
              @click="handleClickPlaySong(item, index)"
            >
              {{ item.name }}
            </div>
            <div
              class="singer"
              :class="item.id === currentSongInfo.id ? 'active' : ''"
              @click="handleClickPlaySong(item, index)"
            >
              <span v-for="item1 in item.singer" :key="item1"
                >{{ item1 }}/</span
              >
            </div>
            <div class="el-icon-link link"></div>
            <div class="dt">{{ setForMatTime(item.totleTime) }}</div>
            <div class="delete" @click="handleDelete(item.id)">
              <i>×</i>
            </div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { mapState, mapMutations /* mapActions, mapGetters */ } from "vuex";
import { forMatTime } from "../../utils/format";
import {parseLyric} from '../../utils/lyric'
import { getSimiPlayList,getMusicComment,getSongLyric } from "../../network/api";
export default {
  name: "MiniPlay",
  data() {
    return {
      //页面上现在歌曲播放的当前时间
      currentPlayTime: 0,
      //slider滑块滑动的current值
      currentValues: 0,
      //控制播放列表是否显示
      drawer: false,
      //控制播放方式的开关
      wayOfPlay: 0,

    };
  },
  computed: {
    ...mapState([
      "currentSongInfo",
      "playing",
      "songList",
      "currentTime",
      "isLoad",
      "currentIndex",
    ]),
    totleTime() {
      return forMatTime((this.currentSongInfo.totleTime / 1000) | 0);
    },
    formattime() {
      return forMatTime((this.currentTime / 1000) | 0);
    },
  },
  methods: {
    ...mapMutations([
      "play",
      "stop",
      "setCurrentTime",
      "setNextSong",
      "setPreSong",
      "clearSongList",
      "setIsLoad",
      "resetCurrentSongInfo",
      "deleteSong",
      "randomPlayWay",
      "singlePlayWay",
      "changeCurrentPlay",
      "setCurrentIndex",
      "findCorrectUrl",
    ]),
    
    start() {
      this.play();
    },

    ended() {
      //当前播放结束
      console.log("end");
      //看看是哪一种播放顺序
      //1.列表播放顺序
      switch (this.wayOfPlay) {
        case 0:
          this.setNextSong();
          break;
        case 1:
          this.randomPlayWay();
          break;
        case 2:
          this.singlePlayWay();
          break;
        case 3:
          this.setNextSong();
          break;
      }
      this.findCorrectUrl();
      this.getMaxPlayAllInfo()
      this.$refs.audio.play();
    },

    pause() {
      this.stop();
    },

    handleCurrentTime(e) {
      //这里e返回的current时间是以秒为单位的
      this.currentPlayTime = e.target.currentTime;
      //设置滑动条的移动到的位置
      this.currentValues = Math.floor(
        (this.currentPlayTime * 100) /
          ((this.$store.state.currentSongInfo.totleTime / 1000) | 0)
      );
      //设置state的currentTime
      this.setCurrentTime(this.currentPlayTime * 1000);
    },

    //处理播放与暂停按钮
    handlePlay() {
      //判断现在是播放还是停止
      if (this.$store.state.playing) {
        //调用audio方法 暂停音乐
        this.$refs.audio.pause();
      } else {
        //调用audio方法 播放音乐
        this.$refs.audio.play();
      }
    },

    //点击拉动播放进度条处理事件
    changeTime(e) {
      //e返回的是currentValues number类型的
      //拉动完之后就知道了e的值 相当于知道了百分比 拉到的百分之多少的数值。
      //歌曲的总时间×百分比
      this.currentPlayTime =
        (this.$store.state.currentSongInfo.totleTime * e) / 100;
      this.setCurrentTime(this.currentPlayTime);
      //audio有一个  设置或返回音频中的当前播放位置（以秒计）的属性
      this.$refs.audio.currentTime = (this.currentPlayTime / 1000) | 0;
      //设置时间轴移动到哪里
      this.currentValues = e;
    },

    async nextSong() {
      switch (this.wayOfPlay) {
        case 0:
          this.setNextSong();
          break;
        case 1:
          this.randomPlayWay();
          break;
        case 2:
          this.setNextSong();
          break;
        case 3:
          this.setNextSong();
          break;
      }
      this.findCorrectUrl();
      this.getMaxPlayAllInfo()
    },

    async preSong() {
      switch (this.wayOfPlay) {
        case 0:
          this.setPreSong();
          break;
        case 1:
          this.randomPlayWay();
          break;
        case 2:
          this.setPreSong();
          break;
        case 3:
          this.setPreSong();
          break;
      }
      this.findCorrectUrl();
      this.getMaxPlayAllInfo()
    },

    controlSongLists() {
      this.drawer = !this.drawer;
    },

    //转换时间格式
    setForMatTime(time) {
      return forMatTime((time / 1000) | 0);
    },

    //收藏所有播放歌单的音乐
    handleCollectAll() {
      console.log("收藏所有播放歌单的音乐");
    },

    //清除所有播放歌单的音乐
    handleClearAll() {
      //歌单列表的数据全部重置
      this.clearSongList();
      //隐藏
      this.setIsLoad("false"); //⭐⭐未解决问题：点击清除按钮后 歌曲图片没有隐藏
      //清空当前播放的歌曲数据
      this.resetCurrentSongInfo();
      //停止音乐
      this.pause();
      this.$refs.audio.pause();
    },

    //从歌单中移除选中的歌曲
    handleDelete(id) {
      this.deleteSong(id);
      this.findCorrectUrl();
    },

    //处理音乐播放方式
    handleChangePlayWay() {
      //0-- list
      //1-- random
      //2-- single
      //3-- order
      if (this.wayOfPlay == 3) {
        this.wayOfPlay = 0;
        return;
      } else {
        let wayindex = this.wayOfPlay;
        wayindex++;
        switch (wayindex) {
          case 0:
            this.wayOfPlay = 0;
            break;
          case 1:
            this.wayOfPlay = 1;
            break;
          case 2:
            this.wayOfPlay = 2;
            break;
          case 3:
            this.wayOfPlay = 3;
            break;
        }
      }
    },

    //在播放列表中点击特定歌曲并进行播放
    handleClickPlaySong(values, index) {
      this.changeCurrentPlay(values);
      this.findCorrectUrl();
      this.setCurrentIndex(index);
    },

    //处理点击显示最大化播放器
    handleShowMaxPlayer(){
      this.$store.state.isShowMaxPlayer=!this.$store.state.isShowMaxPlayer
    },

    async getMaxPlayAllInfo() {
      //获取歌词
      let lyric=await getSongLyric(this.$store.state.currentSongInfo.id)
      console.log(lyric)
      this.$store.state.currentSongInfo.lyric=parseLyric(lyric.data.lrc.lyric)
      //获取相似歌单
      let simimusic = await getSimiPlayList(this.$store.state.currentSongInfo.id)
      this.$store.state.SimiSongList=simimusic.data.playlists
      //获取单曲评论
      let musicComments=await getMusicComment(this.$store.state.currentSongInfo.id,100)
      this.$store.state.commentInfo = musicComments.data.comments
    },
  },
  created(){
    this.$watch(
      "playing",()=>{
        if(!this.$store.state.playing){
          this.$refs.audio.pause();
        }else{
          this.$refs.audio.play();
        }
        console.log("wo运行了")
      }
    )
  }
};
</script>

<style scoped>
@import "./MiniPlay.css";
</style>