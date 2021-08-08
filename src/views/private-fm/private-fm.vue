<template>
  <!-- 这个私人fm接口回来的数据在短时间内是相同的 没有写完minplay与私人fm接口数据的同步问题 -->
  <div class="private-fm">
    <div class="fm-content">
      <div class="record-tools">
        <div class="record">
          <div class="pic">
            <img :src="currentSongInfo.pic" class="current-pic" />
            <img
              :src="this.$store.state.songList[currentSongIndex + 1].pic"
              class="next-pic"
            />
            <i class="el-icon-caret-right play-button" v-show="!playing"></i>
            <img
              src="../../assets/icon/controltools/stop.png"
              alt=""
              v-show="playing"
              class="stop-button"
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
          <div class="more" >
            <i class="el-icon-more" style="font-size: 30px"></i>
          </div>
        </div>
      </div>
      <div class="song-info">
        <div class="song-name">{{ currentSongInfo.name }}</div>
        <div class="album-name">
          专辑：<span>{{ currentSongInfo.album }}</span>
        </div>
        <div
          class="singer-name"
          v-for="item in currentSongInfo.singer"
          :key="item"
        >
          歌手：<span>{{ item }}</span>
        </div>
        <!-- 纯音乐的时候显示为该音乐为纯音乐的文字 -->
        <div
          class="lyric"
          ref="lyric"
          v-if="!currentSongInfo.lyric.length == 0"
        >
          <div
            v-for="(item, index) in currentSongInfo.lyric"
            :key="index"
            class="lyric-item"
          >
            {{ item.content }}
          </div>
        </div>
        <div class="noLyric" v-else>纯音乐</div>
      </div>
    </div>
    <div class="comment">
      <comment :commentInfo="commentInfo" @refeshCommrnt="getCommentInfo"></comment>
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
      songInfoGroup: [],
      commentInfo: [],
      currentSongInfo: {},
      urls: {},
      //未筛选数据
      allSongInfo: {},
      //当前播放的第几首歌
      currentSongIndex: 0,
      playing: true,
      songList:[]
    };
  },
  methods: {
    async getSongInfo() {

      //私人fm接口数据
      let { data } = await fm();
      this.allSongInfo = data.data;

      this.$store.commit("setAllSongListInfo", this.allSongInfo);

      //全部urls
      let urls = await getSongUrl(data.data.map(({ id }) => id));
      this.urls = urls.data.data;

      // //本来可以用mitations上面的已经写好的赛选数据的方法 但是返回的数据有一些不同
      // for (let i = 0; i < data.data.length; i++) {
      //   let currentSongInfo = {};
      //   currentSongInfo.id = data.data[i].id;
      //   currentSongInfo.url = "";
      //   currentSongInfo.name = data.data[i].name;
      //   currentSongInfo.album = data.data[i].album.name;
      //   currentSongInfo.singer = data.data[i].artists.map(({ name }) => name);
      //   currentSongInfo.pic = data.data[i].album.blurPicUrl;
      //   currentSongInfo.totleTime = data.data[i].duration;
      //   currentSongInfo.lyric = [];
      //     this.songInfoGroup.push(currentSongInfo);
      //   }

      for (let i = 0; i < this.allSongInfo.length; i++) {
            let currentSongInfo = {};
            currentSongInfo.id = this.allSongInfo[i].id;
            currentSongInfo.url = "";
            currentSongInfo.name = this.allSongInfo[i].name;
            currentSongInfo.album = this.allSongInfo[i].album.name;
            currentSongInfo.singer = this.allSongInfo[i].artists.map(({ name }) => name);
            currentSongInfo.pic = this.allSongInfo[i].album.blurPicUrl;
            currentSongInfo.totleTime = this.allSongInfo[i].duration;
            currentSongInfo.lyric = [];
            this.songList.push(currentSongInfo)
            }

      this.$store.commit("setfm",this.songList);

      

      //设置第一首歌曲的信息
      this.currentSongInfo =this.$store.state.songList[0];
      let comment = await getMusicComment(this.currentSongInfo.id);
      this.commentInfo = comment.data.comments;
      let lyric = await getSongLyric(this.currentSongInfo.id);5
      this.currentSongInfo.lyric = parseLyric(lyric.data.lrc.lyric);

      // console.log(data);
      // console.log(this.urls);
      // console.log(comment);
      // console.log(this.lyric);
      // console.log(this.songInfoGroup);
      // console.log(this.currentSongInfo);

      this.$store.commit("changeCurrentPlay", this.currentSongInfo);
      this.$store.commit("play");
      this.findCorrectUrl();
    },

    async getCommentInfo(){
      let comment = await getMusicComment(this.currentSongInfo.id);
      this.commentInfo = comment.data.comments;
    },


    //获取特定id歌曲的评论与歌词
    async getOtherInfo() {
      let comment = await getMusicComment(this.currentSongInfo.id);
      this.commentInfo = comment.data.comments;
      let lyric = await getSongLyric(this.currentSongInfo.id);
      this.currentSongInfo.lyric = parseLyric(lyric.data.lrc.lyric);
    },

    //点击下一首歌曲按钮
    nextSong() {
      //判断是否是最后一首
      //是 --》请求数据     不是 --》切下一首
      if (this.currentSongIndex === 3) {
        //清除原有的数据
        // this.currentSongInfo = {};
        this.songInfoGroup = [];
        // this.allSongInfo = {};
        // this.commentInfo = [];
        this.currentSongIndex = 0,
        this.playing = false,
        //再一次请求数据
        this.getSongInfo();
        this.updataInfo();
      } else {
        this.currentSongInfo = this.$store.state.songList[this.currentSongIndex];
        this.$store.commit("changeCurrentPlay", this.currentSongInfo);
        this.getOtherInfo();
        this.currentSongIndex++;
      }
      this.findCorrectUrl();
      // //每点击下一首歌曲的时候 当currentSongIndex=3时 删掉最前面一首
      //这个功能不写了
      // if(this.currentSongIndex===3){
      //   this.songInfoGroup.splice(1,1)
      // }
    },
    updataInfo() {
      //把歌单的全部歌曲添加到播放列表
      // this.$store.state.songList = this.songInfoGroup;
      //设置当前播放歌曲的下标 要同步两个界面的信息
      this.$store.commit("setCurrentIndex", this.currentSongIndex);
      //点击播放按钮后才把数据传到vuex
      this.$store.commit("setAllSongListInfo", this.allSongInfo);
      this.$store.commit("setAllSongUrls", this.urls);
      //加载图片
      this.$store.commit("setIsLoad", true);
      // this.$store.commit("changeCurrentPlay", this.currentSongInfo);
      // this.$store.commit("setSongListInfo", this.songInfoGroup);
    },

    //找到正确的url 这里不知道是对谁错 数据没验证
    findCorrectUrl() {
      for (let j = 0; j < this.urls.length; j++) {
        if (this.urls[j].id == this.currentSongInfo.id) {
          this.currentSongInfo.url = this.urls[j].url;
          return;
        }
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
    //一开始进来的时候会自动播放请求到数据的第一首歌
    //只是第一次created的时候
    this.getSongInfo();
    this.updataInfo();
  },
  components: {
    Comment,
  },
  computed: {
  },
};
</script>

<style scoped>
@import "./private-fm.css";
</style>