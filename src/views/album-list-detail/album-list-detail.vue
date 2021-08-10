<template>
  <div class="albumlist-detail">
    <play-list-detail-head
      :values="headInfo"
      :isShowPlayListComponent="isShowPlayListComponent"
    >
    </play-list-detail-head>

    <div class="albumlist-content">
      <div class="top">
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
      </div>
      <song-list-component
        v-if="currentIndex === 0"
        :songsInfo="songList"
        @handleSongClick="handleSongClick"
      ></song-list-component>
      <div v-else-if="currentIndex === 2" class="albumdetail"></div>
      <comment
        v-else
        class="comment"
        :commentInfo="commentInfo"
        @refeshCommrnt="getCommentInfo"
        :id="this.id"
        :t="1"
        :type="3"
      ></comment>
    </div>
  </div>
</template>

<script>
import Comment from "@/components/common/play-list-detail/comment.vue";
import PlayListDetailHead from "@/components/common/play-list-detail/play-list-detail-head.vue";
import SongListComponent from "@/components/common/play-list-detail/song-list-component.vue";
import {
  getSongUrl,
  getAlbumListDetail,
  getAlbumComment,
  // getSongListDetail,
  getCollector,
  getSongDetail,
  getSongLyric,
  getSimiPlayList,
  getMusicComment,
  getCheckMusic,
} from "../../network/api";
import { parseLyric } from "@/utils/lyric";
import {forMatTime} from '@/utils/format'
export default {
  components: { PlayListDetailHead, SongListComponent, Comment },
  name: "AlbumListDetail",
  data() {
    return {
      //歌单详细信息
      headInfo: null,
      currentIndex: 0,
      navbar: ["歌曲列表", "评论", "专辑详情"],
      isShowPlayListComponent: false,
      commentInfo: [],
      songList: [],
      playList: [],
    };
  },
  methods: {
    itemClick(index) {
      switch (index) {
        case 0:
          this.currentIndex = index;
          break;
        case 1:
          this.currentIndex = index;
          break;
        case 2:
          this.currentIndex = index;
          break;
      }
    },
    //获取收藏者信息
    async getCollector() {
      this.id = this.$route.params.id;
      const { data } = await getCollector(this.id, 30, 30);
      console.log(data);
    },
    //获取歌单列表全部信息
    async getSongListDetailInfo() {
      this.id = this.$route.params.id;
      const { data } = await getAlbumListDetail(this.id)
      // const { data } = await getSongListDetail(this.id, 20);
      console.log(data);
      let albumListHeadInfo = {}
      albumListHeadInfo.coverImgUrl = data.album.picUrl
      albumListHeadInfo.titleType = "专辑";
      albumListHeadInfo.name = data.album.name;
      albumListHeadInfo.singer = data.album.artist.name;
      albumListHeadInfo.publishTime = forMatTime(data.album.publishTime);
      albumListHeadInfo.id = data.album.id;

      

      this.headInfo = albumListHeadInfo

      // console.log(JSON.stringify(data, null, 2))这种方法可以展示console的全部内容
      //处理歌单全部的ids
      const res = await getSongDetail(
        data.songs.map(({ id }) => id)
      );
      console.log(res);
      const SongsInfo = res.data.songs;
      const Urls = await getSongUrl(SongsInfo.map(({ id }) => id));

      for (let i = 0; i < SongsInfo.length; i++) {
        let songinfo = {};
        songinfo.url = Urls.data.data[i].url;
        songinfo.id = SongsInfo[i].id;
        songinfo.name = SongsInfo[i].name;
        songinfo.singer = [];
        for (let j = 0; j < SongsInfo[i].ar.length; j++) {
          songinfo.singer[j] = {
            name: SongsInfo[i].ar[j].name,
            id: SongsInfo[i].ar[j].id,
          };
        }
        songinfo.pic = SongsInfo[i].al.picUrl;
        songinfo.totleTime = SongsInfo[i].dt;
        songinfo.lyric = [];
        songinfo.album = { name: SongsInfo[i].al.name, id: SongsInfo[i].al.id };
        this.songList.push(songinfo);
      }

      for (let j = 0; j < SongsInfo.length; j++) {
        let currentsonginfo = {};
        currentsonginfo.id = SongsInfo[j].id;
        currentsonginfo.url = "";
        for (let j = 0; j < Urls.data.data.length; j++) {
          if (Urls.data.data[j].id == currentsonginfo.id) {
            currentsonginfo.url = Urls.data.data[j].url;
          }
        }
        currentsonginfo.name = SongsInfo[j].name;
        currentsonginfo.singer = SongsInfo[j].ar.map(({ name }) => name);
        currentsonginfo.pic = SongsInfo[j].al.picUrl;
        currentsonginfo.totleTime = SongsInfo[j].dt;
        currentsonginfo.lyric = [];
        currentsonginfo.album = SongsInfo[j].al.name;
        this.playList.push(currentsonginfo);
      }
    },

    async handleSongClick(v) {
      console.log(v);
      const checkmusic = await getCheckMusic(v[0].id);
      //判断音乐是否有版权
      if (checkmusic.data.success) {
        //获取歌曲的歌词
        let lyric = await getSongLyric(v[0].id);
        console.log(lyric);

        //更新当前播放的下标
        this.$store.commit("setCurrentIndex", v[1]);

        this.playList[v[1]].lyric = parseLyric(lyric.data.lrc.lyric);

        //修改当前播放的音乐信息
        this.$store.commit("changeCurrentPlay", this.playList[v[1]]);

        //点击任意一首歌后把歌单歌曲添加到播放列表中
        this.$store.commit("setAllSongsToPlayList", this.playList);

        //isload图片
        this.$store.commit("setIsLoad", "true");

        //获取某一首歌的相似歌单信息
        let simimusic = await getSimiPlayList(v[0].id);
        this.$store.state.SimiSongList = simimusic.data.playlists;
        //获取某一首歌的评论
        let musicComments = await getMusicComment(v[0].id, 100);
        this.$store.state.commentInfo = musicComments.data.comments;
      } else {
        alert(checkmusic.data.message);
        // alert(`${checkmusic.data.message}`)
        // alert("没版权")
        //这个功能不知道有没有成功 等写了search功能再测试
      }
    },

    async getCommentInfo() {
      this.id = this.$route.params.id;
      const { data } = await getAlbumComment(this.id, 50);
      this.commentInfo = data.comments;
    },
  },
  created() {
    this.itemClick(this.currentIndex);
    this.getSongListDetailInfo();
    this.getCommentInfo();
  },
  activated(){
    this.itemClick(this.currentIndex);
    this.getSongListDetailInfo();
    this.getCommentInfo();
  }
};
</script>

<style scoped>
@import "./album-list-detail.css";
</style>