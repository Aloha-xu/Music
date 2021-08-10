<template>
  <div class="songlist-component">
    <div class="title-name">
      <span>音乐标题</span>
      <!-- 飙升榜的标题卡槽 -->
      <slot name="SoaringrateTitle"></slot>
      <span>歌手</span>
      <span>专辑</span>
      <span>时长</span>
    </div>
    <div class="song-item" v-for="(item, index) in songsInfo" :key="index">
      <div class="index-number">
        {{ setIndex(index) }}
      </div>
      <img
        src="../../../assets/icon/heart.svg"
        alt=""
        v-show="!isHeart(item.id)"
        @click="ClickHeart(item.id,index)"
        class="no-active-heart"
      />
      <img
        src="../../../assets/icon/heartactive.svg"
        alt=""
        v-show="isHeart(item.id)"
        @click="ClickHeart(item.id,index)"
        class="active-heart"
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
        <span v-for="(item1, index1) in item.singer" :key="index1" @click="clickToSingerPapg(item1.id)"
          >{{ item1.name }}&nbsp;</span
        >
      </div>
      <div class="album" @click="clickToAlbumPapg(item.album.id)">{{ item.album.name }}</div>
      <div class="time">{{ setSongTime(item.totleTime) }}</div>
    </div>
  </div>
</template>

<script>
//获取数据不应该写在这 不想改了
import {
  // getSongUrl,
  // getSongLyric,
  // getSimiPlayList,
  // getMusicComment,
  // getCheckMusic,
  getLikeList,
  setLike,
  getSongListDetail
} from "../../../network/api";
import { forMatTime } from "../../../utils/format";
// import { parseLyric } from "../../../utils/lyric";
export default {
  name: "SongListComponent",
  data() {
    return {
      isClickHeart: false,
      //歌单的全部列表信息
      allSongList: [],
      likeList: [],
    };
  },
  props: {
    songsInfo:Array,
    playList:Array,
  },
  methods: {
    /* 点击指定红星添加收藏未做 */

    //点击后判断是否已经收藏了 控制收藏没有的的元素不可以为data的全局元素 否一点就全改变了

    async ClickHeart(id) {
      //把传进来的id与likelist对比    非-1则存在 红星 / -1 空红星
      let currentIndex = this.likeList.findIndex(item => item == id)
      if(currentIndex==-1){
          await setLike(id,true)
      }else{
          await setLike(id,false)
          //⭐⭐⭐460 网络拥挤  没办法了 以后再写把
      }
      //更新数据
      this.id = this.$route.params.id;
      const { data } = await getSongListDetail(this.id, 20);
      this.$store.commit("setSongListDetailInfo", data.playlist);

      // console.log(id);
      // console.log(currentIndex)
      // console.log(this.likeList)
    },
    // 处理点击播放音乐事件
    async HandleSongClick(values, index) {

      this.$emit('handleSongClick',[values,index])

      // let checkmusic = await getCheckMusic(values.id);
      // //判断音乐是否有版权
      // if (checkmusic.data.success) {
      //   //获取歌曲的歌词
      //   let lyric = await getSongLyric(values.id);

      //   //更新当前播放的下标
      //   this.$store.commit("setCurrentIndex", index);

      //   //获取所点击的歌曲的url
      //   const { data } = await getSongUrl(values.id);
      //   console.log(data)

      //   //筛选出全部歌手名字
      //   let singers = values.singer.map(({ name }) => name);

      //   //筛选出需要的歌曲信息以数组形式放到state
      //   let currentsonginfo = {};
      //   currentsonginfo.id = values.id;
      //   // let correctUrlIndex = data.data.findIndex((item)=>{ currentsonginfo.id == item.id})
      //   // currentsonginfo.url = data.data[correctUrlIndex].url;
      //   currentsonginfo.url = data.data[0].url;
      //   currentsonginfo.name = values.name;
      //   currentsonginfo.album = values.album.name;
      //   currentsonginfo.singer = singers;
      //   currentsonginfo.pic = values.pic;
      //   currentsonginfo.totleTime = values.totleTime;
      //   currentsonginfo.lyric = parseLyric(lyric.data.lrc.lyric);

      //   //修改当前播放的音乐信息
      //   this.$store.commit("changeCurrentPlay", currentsonginfo);

      //   //点击任意一首歌后把歌单歌曲添加到播放列表中
      //   this.$store.commit("setAllSongsToPlayList",this.playList[index]);

      //   //isload图片
      //   this.$store.commit("setIsLoad", "true");

      //   //获取某一首歌的相似歌单信息
      //   let simimusic = await getSimiPlayList(values.id);
      //   this.$store.state.SimiSongList = simimusic.data.playlists;
      //   //获取某一首歌的评论
      //   let musicComments = await getMusicComment(values.id, 100);
      //   this.$store.state.commentInfo = musicComments.data.comments;
      // } else {
      //   alert(checkmusic.data.message);
      //   // alert(`${checkmusic.data.message}`)
      //   // alert("没版权")
      //   //这个功能不知道有没有成功 等写了search功能再测试
      // }
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
    isHeart(id) {
      //把传进来的id与likelist对比    非-1则存在 红星 / -1 空红星
      let currentIndex = this.likeList.findIndex(item => item == id)
      if(currentIndex==-1){
        return false
      }
      return true
    },
    clickToSingerPapg(id){
      this.$router.push("/singerlistdetail/" + id);
    },
    clickToAlbumPapg(id){
      this.$router.push("/albumlistdetail/" + id);
    }
    
  },
  computed: {
    currentId() {
      return this.$store.state.currentSongInfo.id;
    },
    //使用SongListAllInfos没有筛选的数据是因为赛选数据后就会发到播放列表显示出来 我没有写一个卡口
    // songsInfo() {
    //   return this.$store.state.SongListAllInfos;
    // },
    
  },
  async created() {
    let uInfo = JSON.parse(window.localStorage.getItem("currentUserInfo"));
    let uId = uInfo.userId;
    let likeList = await getLikeList(uId);
    this.likeList = likeList.data.ids;
    console.log(likeList);
  },
};
</script>

<style scoped >
@import "./song-list-component.css";
</style>