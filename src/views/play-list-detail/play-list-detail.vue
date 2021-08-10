<template>
  <div class="play-list-detail">
    <play-list-detail-head
      :values="headInfo"
      :isShowPlayListComponent="isShowPlayListComponent"
      @handleCollectSonglist="handleCollectSonglist"
    >
    </play-list-detail-head>

    <div class="play-list-detail-content">
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
        <div class="search">123</div>
      </div>
      <song-list-component
        v-if="currentIndex === 0"
        :songsInfo="songList"
        @handleSongClick="handleSongClick"
      ></song-list-component>
      <collecter
        v-else-if="currentIndex === 2"
        :collecter="songListDetailInfo.subscribers"
      ></collecter>
      <comment
        v-else
        :commentInfo="commentInfo"
        :id="this.id"
        :t="1"
        :type="2"
        @refeshCommrnt="getCommentInfo"
      ></comment>
    </div>
  </div>
</template>

<script>
import Collecter from "@/components/common/play-list-detail/collecter";
import Comment from "@/components/common/play-list-detail/comment.vue";
import PlayListDetailHead from "@/components/common/play-list-detail/play-list-detail-head.vue";
import SongListComponent from "@/components/common/play-list-detail/song-list-component.vue";
import {
  getSongListDetail,
  getCollector,
  getSongDetail,
  getPlayListComment,
  getUserPlaylist,
  subPlaylist,
  getSongListType,
  getSongUrl,
  getSongLyric,
  getSimiPlayList,
  getMusicComment,
  getCheckMusic,
} from "@/network/api";
import { parseLyric } from "@/utils/lyric";
export default {
  components: { PlayListDetailHead, SongListComponent, Collecter, Comment },
  name: "PlayListDetail",
  data() {
    return {
      //歌单详细信息
      TitleType: "歌单",
      currentIndex: 0,
      navbar: ["歌曲列表", "评论", "收藏者"],
      isShowPlayListComponent: true,
      //评论
      commentInfo: [],
      //歌单类型分类
      typeLists: {
        0: { type: "", list: [] },
        1: { type: "", list: [] },
        2: { type: "", list: [] },
        3: { type: "", list: [] },
        4: { type: "", list: [] },
      },
      /* 模板的渲染比route快 */
      songList: [],
      playList: [],
      headInfo: null,
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
    //获取收藏者信息 收藏者信息在getSongListDetail拿到20个了 这个接口可以不用
    async getCollector() {
      this.id = this.$route.params.id;
      const { data } = await getCollector(this.id, 30, 30);
      console.log(data);
    },
    //获取歌单头部信息
    async upDataSongListHeadInfo() {
      this.id = this.$route.params.id;
      const { data } = await getSongListDetail(this.id, 20);
      this.headInfo.subscribed = data.playlist.subscribed
    },
    //获取并处理歌单列表全部信息
    async handleSongListDetailInfo() {
      this.id = this.$route.params.id;
      const { data } = await getSongListDetail(this.id, 20);
      let songListHeadInfo = {};
      songListHeadInfo.coverImgUrl = data.playlist.coverImgUrl;
      songListHeadInfo.titleType = "歌单";
      songListHeadInfo.name = data.playlist.name;
      songListHeadInfo.nickname = data.playlist.creator.nickname;
      songListHeadInfo.createTime = data.playlist.createTime;
      songListHeadInfo.avatarUrl = data.playlist.creator.avatarUrl;
      songListHeadInfo.subscribed = data.playlist.subscribed;
      songListHeadInfo.subscribedCount = data.playlist.subscribedCount;
      songListHeadInfo.shareCount = data.playlist.shareCount;
      songListHeadInfo.tags = data.playlist.tags;
      songListHeadInfo.trackCount = data.playlist.trackCount;
      songListHeadInfo.playCount = data.playlist.playCount;
      songListHeadInfo.description = data.playlist.description;
      songListHeadInfo.id = data.playlist.id;
      this.headInfo = songListHeadInfo;

      //处理歌单中全部的歌曲的ids
      const res = await getSongDetail(
        data.playlist.trackIds.map(({ id }) => id)
      );

      const SongsInfo = res.data.songs;
      console.log(SongsInfo)

      //这里返回的url是不按传入的id按需返回的 所以需要进行url校正
      const Urls = await getSongUrl(SongsInfo.map(({ id }) => id));


      //判断songlist里面有没数据
      if(!this.songList.length == 0){
        this.songList = []
      }
      if(!this.playList.length == 0){
        this.playList = []
      }

      //这里筛选出来的数据是用来渲染歌单的歌曲列表的
      for (let i = 0; i < SongsInfo.length; i++) {
        let songinfo = {};
        songinfo.id = SongsInfo[i].id;
        songinfo.url = Urls.data.data[i].url;
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

      //这里筛选出来的数据是用push进去state的playlist的
      for (let j = 0; j < SongsInfo.length; j++) {
        let currentsonginfo = {};
        currentsonginfo.id = SongsInfo[j].id;
        currentsonginfo.url = "";
        //进行url校正
        //这里无法使用findindex 不知道为什么
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

    //处理点击某一首歌的事件
    //v[0] 歌曲信息
    //v[1] 歌曲下标
    async handleSongClick(v) {
      const checkmusic = await getCheckMusic(v[0].id);
      //判断音乐是否有版权
      if (checkmusic.data.success) {
        //获取歌曲的歌词
        let lyric = await getSongLyric(v[0].id);
        console.log(lyric);

        //更新当前播放的下标
        this.$store.commit("setCurrentIndex", v[1]);

        // //获取所点击的歌曲的url
        // const { data } = await getSongUrl(values.id);
        // console.log(data)

        //筛选出全部歌手名字
        // let singers = values.singer.map(({ name }) => name);

        //筛选出需要的歌曲信息以数组形式放到state
        // let currentsonginfo = {};
        // currentsonginfo.id = values.id;
        // // let correctUrlIndex = data.data.findIndex((item)=>{ currentsonginfo.id == item.id})
        // // currentsonginfo.url = data.data[correctUrlIndex].url;
        // currentsonginfo.url = data.data[0].url;
        // currentsonginfo.name = values.name;
        // currentsonginfo.album = values.album.name;
        // currentsonginfo.singer = singers;
        // currentsonginfo.pic = values.pic;
        // currentsonginfo.totleTime = values.totleTime;
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

    //收藏歌单
    async handleCollectSonglist() {
      //添加歌单
      if (this.headInfo.subscribed) {
        //true
        //弹窗 问是否取消收藏
        this.$confirm("确定不再收藏该歌单?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(async () => {
          await subPlaylist(2, this.headInfo.id);
          this.refreshUserSonglistInfo();
        });
      } else {
        //false
        await subPlaylist(1, this.headInfo.id);
        this.refreshUserSonglistInfo();
      }
      //⭐⭐⭐⭐⭐⭐
      //数据没有更新是因为网易云api接口做了短时间内多次访问只会拿到前一个的数据 ----缓存处理 ---加时间戳可以解决
    },
    //刷新用户歌单信息函数
    async refreshUserSonglistInfo() {
      this.upDataSongListHeadInfo();
      let uInfo = JSON.parse(window.localStorage.getItem("currentUserInfo"));
      let uId = uInfo.userId;
      let playlist = await getUserPlaylist(uId);
      this.$store.commit("setUserSonglistInfo", playlist);
      this.$store.commit("updataSonglist");
    },
    async getCommentInfo() {
      this.id = this.$route.params.id;
      const { data } = await getPlayListComment(this.id, 50);
      this.commentInfo = data.comments;
    },
    /* 获取歌单分类 */
    async getSongListType() {
      const { data } = await getSongListType();
      console.log(data);
      //全部类别
      // this.AllSongType = data.sub;
      let i = 0;
      let j = 0;
      for (i; i <= 4; i++) {
        this.typeLists[i].type = data.categories[i];
        for (j; j <= 69; j++) {
          let a = data.sub[j].category;
          let b = data.sub[j].name;
          this.whatcategory(a, b);
        }
      }
      // console.log(this.typeLists);
    },
    //判断回来的数据是什么类别
    whatcategory(v, i) {
      switch (v) {
        case 0:
          this.typeLists[0].list.push(i);
          break;
        case 1:
          this.typeLists[1].list.push(i);
          break;
        case 2:
          this.typeLists[2].list.push(i);
          break;
        case 3:
          this.typeLists[3].list.push(i);
          break;
        case 4:
          this.typeLists[4].list.push(i);
          break;
      }
    },
  },
  async created() {
    this.itemClick(this.currentIndex);
    this.handleSongListDetailInfo();
    this.getCommentInfo();
    this.getSongListType();
    // this.$store.state.allTypeInfo = this.typeLists;
  },
  computed: {
  },
  watch: {
    $route() {
      let id = this.$route.params.id;
      if (id) {
        this.itemClick(this.currentIndex);
        this.handleSongListDetailInfo();
        this.getCommentInfo();
      }
    },
  },
};
</script>

<style scoped>
@import "./play-list-detail.css";
</style>>
