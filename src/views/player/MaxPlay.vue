<template>
  <div class="max-play">
    <!-- 歌曲信息 -->
    <!-- <div class="backgroundPic" :style="returnBackgroundUrl()">
        <img :src="songInfo.pic" alt="" />
    </div> -->
    <div class="content">
      <div class="record-tools">
        <div class="pic">
          <img :src="songInfo.pic" alt="" />
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
          <div class="collect">
            <i class="el-icon-folder-add" style="font-size: 30px"></i>
          </div>
          <div class="download">
            <i class="el-icon-download" style="font-size: 30px"></i>
          </div>
          <div class="share">
            <i class="el-icon-share" style="font-size: 30px"></i>
          </div>
        </div>
      </div>
      <div class="song-info">
        <div class="song-name">{{ songInfo.name }}</div>
        <div class="album-name">
          专辑：<span>{{ songInfo.album }}</span>
        </div>
        <div class="singer-name" v-for="item in songInfo.singer" :key="item">
          歌手：<span>{{ item }}</span>
        </div>
        <!-- <div class="info_source">{{ songInfo.id }}</div> -->
        <!-- 纯音乐的时候显示为该音乐为纯音乐的文字 -->
        <div
          class="lyric"
          ref="lyric"
          v-if="!this.$store.state.currentSongInfo.lyric.length == 0"
        >
          <div
            v-for="(item, index) in this.$store.state.currentSongInfo.lyric"
            :key="index"
            class="lyric-item"
            :class="syncLyricToTime(item, index) ? 'lyric-active' : ''"
          >
            {{ item.content }}
          </div>
        </div>
        <div class="noLyric" v-else>纯音乐</div>
      </div>
      <div class="min-buttom">
        <i class="el-icon-remove-outline"></i>
      </div>
    </div>
    <!-- 包含这首歌的歌单 -->
    <div class="include_songlist"></div>
    <!-- 相似的歌曲 -->
    <div class="simi-song">
      <span>相似的歌曲：</span>
      <div class="simi-content">
        <new-music-card
          v-for="(item, index) in SimiSongListInfo"
          :key="index"
          :pic="item.coverImgUrl"
          :singer="item.creator.nickname.split(' ')"
          :songname="item.name"
          :id="item.id"
          class="simi-item"
        ></new-music-card>
      </div>
    </div>
    <!-- 评论 -->
    <div class="comment">
      <div class="title">评论：</div>
      <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="textarea"
        maxlength="140"
        show-word-limit
      >
      </el-input>
      <comment-card
        v-for="(item, index) in commentInfo"
        :key="index"
        :likedCount="item.likedCount"
        :name="item.user.nickname"
        :pic="item.user.avatarUrl"
        :text="item.content"
        :time="item.time"
      ></comment-card>
    </div>
  </div>
</template>

<script>
import CommentCard from "../../components/common/comment-card.vue";
import NewMusicCard from "../../components/common/findmusic/recommend/new-music/new-music-card.vue";
/* import { mapState} from "vuex"; */
export default {
  name: "MaxPlay",
  components: {
    NewMusicCard,
    CommentCard,
  },
  data() {
    return {
      textarea: "",
      playing: this.$store.state.playing,
      interval: null,

    };
  },
  methods: {
    returnBackgroundUrl() {
      return {
        backgroundImage: `url(${this.$store.state.currentSongInfo.pic})`,
        backgroundSize: "400%",
        filter: "blur(100px)",
        // ⭐⭐虚化背景图
        //就是把background和文字放到不同的div里面
        //因为filter会把div下全部标签都虚化了
      };
    },

    //歌词样式控制
    //同步歌曲播放进度与歌词
    syncLyricToTime(values, index) {
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

    handleCurrentScorllLocation() {
      //通过audio时间与歌词数量判断移动的距离x
      // 6   7  行歌词前就不用动scroll
      // 然后后面的就一行歌词 20px的位移
      //最后到剩下 6  7  行的样子就不需要移动了
      let currentTime = parseInt(this.$store.state.currentTime / 1000);
      console.log(currentTime);
      let lyric = this.$store.state.currentSongInfo.lyric;
      for (let i = 6; i < lyric.length - 6; i++) {
        if (lyric[i].time === currentTime) {
          this.$refs.lyric.scrollBy(0, 20);
        }
      }
    },
  },
  computed: {
    songInfo() {
      return this.$store.state.currentSongInfo;
    },
    SimiSongListInfo() {
      return this.$store.state.SimiSongList;
    },
    commentInfo() {
      return this.$store.state.commentInfo;
    },
  },
  created() {
    this.interval = setInterval(() => {
      this.handleCurrentScorllLocation();
    }, 1000);
  },
  watch: {
    playing() {
      if (!this.playing) {
        clearInterval(this.interval);
      }
    },
    songInfo(){
      this.$refs.lyric.scrollTo(0,0)
    }
  },
};
</script>

<style scoped>
@import "./MaxPlay.css";
</style>