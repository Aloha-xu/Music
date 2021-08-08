<template>
  <div class="albumlist-detail">
    <play-list-detail-head
      v-if="this.songListDetailInfo"
      :songListDetailInfo="songListDetailInfo"
      :TitleType="TitleType"
      :isShowAlbumComponent="isShowAlbumComponent"
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
      <song-list-component v-if="currentIndex === 0" :songsInfo="songList"></song-list-component>
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
import Comment from "../../components/common/play-list-detail/comment.vue";
import PlayListDetailHead from "../../components/common/play-list-detail/play-list-detail-head.vue";
import SongListComponent from "../../components/common/play-list-detail/song-list-component.vue";
import {
  getSongListDetail,
  getCollector,
  getSongDetail,
  getSongUrl,
  getAlbumComment,
} from "../../network/api";
export default {
  components: { PlayListDetailHead, SongListComponent, Comment },
  name: "AlbumListDetail",
  data() {
    return {
      //歌单详细信息
      songListDetailInfo: {},
      TitleType: "专辑",
      currentIndex: 0,
      navbar: ["歌曲列表", "评论", "专辑详情"],
      isShowAlbumComponent: false,
      commentInfo: [],
      songList: [],
      playLisy:[]
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
      const { data } = await getSongListDetail(this.id, 20);
      // console.log(JSON.stringify(data, null, 2))这种方法可以展示console的全部内容
      this.songListDetailInfo = data.playlist;
      console.log(this.songListDetailInfo);
      //处理歌单全部的ids
      const res = await getSongDetail(
        data.playlist.trackIds.map(({ id }) => id)
      );
      let SongsInfo = res.data.songs;
      console.log(SongsInfo);
      let Urls = await getSongUrl(SongsInfo.map(({ id }) => id));

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
        //把歌曲放到播放列表中
        this.songList.push(songinfo);
      }
      for (let i = 0; i < SongsInfo.length; i++) {
        let currentsonginfo = {};
        currentsonginfo.url = Urls.data.data[i].url;
        currentsonginfo.id = SongsInfo[i].id;
        currentsonginfo.name = SongsInfo[i].name;
        currentsonginfo.singer = SongsInfo[i].ar.map(({ name }) => name);
        currentsonginfo.pic = SongsInfo[i].al.picUrl;
        currentsonginfo.totleTime = SongsInfo[i].dt;
        currentsonginfo.lyric = [];
        currentsonginfo.album = SongsInfo[i].al.name;
        //把歌曲放到播放列表中
        this.playList.push(currentsonginfo);
      }

      this.$store.commit("setAllSongsToPlayList", this.playList);
      this.$store.commit("setAllSongUrls", Urls);
    },
    async getCommentInfo() {
      this.id = this.$route.params.id;
      const { data } = await getAlbumComment(this.id, 50);
      this.commentInfo = data.comments;
    },
  },
  async created() {
    this.itemClick(this.currentIndex);
    this.getSongListDetailInfo();
    this.getCommentInfo();
  },
};
</script>

<style scoped>
@import "./album-list-detail.css";
</style>