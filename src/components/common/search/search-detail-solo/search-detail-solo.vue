<template>
  <div class="search-detail-solo">
    <div class="title-card">最佳匹配</div>
    <search-detail-card :name="searchResult[0].name" :scover="searchResult[0].img1v1Url"
    class="card"></search-detail-card>
    <div class="title-name">
      <span>音乐标题</span>
      <span>歌手</span>
      <span>专辑</span>
      <span>时长</span>
    </div>
    <div class="song-item" v-for="(item, index) in songsInfo" :key="index">
      <div class="index-number">
        {{ setIndex(index) }}
      </div>
      <img
        src="../../../../assets/icon/heart.svg"
        alt=""
        v-show="!isClickHeart"
        @click="ClickHeart(index)"
      />
      <img
        src="../../../../assets/icon/heartactive.svg"
        alt=""
        v-show="isClickHeart"
        @click="ClickHeart(index)"
      />
      <p class="el-icon-download"></p>
      <div class="song-name" @click="HandleSongClick(item, index)">
        <span :class="item.id === currentId ? 'active' : ''">{{
          item.name
        }}</span>
        <!-- SQ MV logo的卡槽 -->
        <slot name="SQlogo"></slot>
        <slot name="MVlogo"></slot>
      </div>
      <!-- 飙升榜的数据卡槽 -->
      <slot name="SoaringrateData"></slot>
      <div class="singer">
        <span v-for="(item1, index1) in item.ar" :key="index1"
          >{{ item1.name }}&nbsp;</span
        >
      </div>
      <div class="album">{{ item.al.name }}</div>
      <div class="time">{{ setSongTime(item.dt) }}</div>
    </div>
  </div>
</template>

<script>
import {
  getSongUrl,
  getSongLyric,
  getCheckMusic,
  getSongDetail,
} from "../../../../network/api";
import { forMatTime } from "../../../../utils/format";
import { parseLyric } from "../../../../utils/lyric";
import searchDetailCard from '../search-detail-card/search-detail-card.vue';
export default {
  components: { searchDetailCard },
  name: "SearchDetailSolo",
  methods: {
    /* 点击指定红星添加收藏未做 */
    ClickHeart(index) {
      console.log(index);
      this.isClickHeart = !this.isClickHeart;
    },
    // 处理点击播放音乐事件
    async HandleSongClick(values, index) {

      this.handleSongListDetailInfo()

      let checkmusic = await getCheckMusic(values.id);
      //判断音乐是否有版权
      if (checkmusic.data.success) {

        //获取歌曲的歌词
        let lyric = await getSongLyric(values.id);

        //更新当前播放的下标
        this.$store.commit("setCurrentIndex", index);

        //获取所点击的歌曲的url
        const { data } = await getSongUrl(values.id);

        //筛选出全部歌手名字
        let singers = values.ar.map(({ name }) => name);

        //筛选出需要的歌曲信息以数组形式放到state
        let currentsonginfo = {};
        currentsonginfo.url = data.data[0].url;
        currentsonginfo.id = values.id;
        currentsonginfo.name = values.name;
        currentsonginfo.album = this.$store.state.songListDetailInfo.tracks[index].al.name;
        currentsonginfo.singer = singers;
        currentsonginfo.pic = values.al.picUrl;
        currentsonginfo.totleTime = values.dt;
        currentsonginfo.lyric = parseLyric(lyric.data.lrc.lyric);

        //修改当前播放的音乐信息
        this.$store.commit("changeCurrentPlay", currentsonginfo);

        //清除原有的播放列表信息
        this.$store.commit("clearSongList");

        //点击任意一首歌后把歌单歌曲添加到播放列表中
        this.$store.commit("setAllSongsToPlayList");

        //isload图片
        this.$store.commit("setIsLoad", "true");

      } else {
        alert(checkmusic.data.message);
        // alert(`${checkmusic.data.message}`)
        // alert("没版权")
        //这个功能不知道有没有成功 等写了search功能再测试
      }
      
    },
    //获取并处理歌单列表全部信息
    async handleSongListDetailInfo() {
      //处理歌单中全部的歌曲的ids
      const res = await getSongDetail(
        this.$store.state.SongListAllInfos.map(({ id }) => id)
      );
      console.log(res)
      let SongsInfo = res.data.songs;
      let Urls = await getSongUrl(this.$store.state.SongListAllInfos.map(({ id }) => id));
      this.$store.commit("setAllSongListInfo", SongsInfo);
      this.$store.commit("setAllSongUrls", Urls);
    },
    //计算歌曲时间
    setSongTime(time) {
      return forMatTime((time / 1000) | 0);
    },
    //转换下表格式
    setIndex(values) {
      let index = values + 1;
      return index < 10 ? "0" + index : index;
    },
  },
  computed: {
    currentId() {
      return this.$store.state.currentSongInfo.id;
    },
    //使用SongListAllInfos没有筛选的数据是因为赛选数据后就会发到播放列表显示出来 我没有写一个卡口
    songsInfo() {
      return this.$store.state.SongListAllInfos;
    },
  },
  data(){
    return{
      isClickHeart:false
    }
  },
  props:{
    searchResult:Array
  }
};
</script>

<style scoped>
@import "./search-detail-solo.css";
</style>