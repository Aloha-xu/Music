<template>
  <div class="play-list-detail">
    <play-list-detail-head
      v-if="this.songListDetailInfo"
      :songListDetailInfo="songListDetailInfo"
      :TitleType="TitleType"
      :isShowAlbumComponent="isShowAlbumComponent"
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
      <song-list-component v-if="currentIndex === 0"></song-list-component>
      <collecter
        v-else-if="currentIndex === 2"
        :collecter="songListDetailInfo.subscribers"
      ></collecter>
      <comment v-else :commentInfo="commentInfo" :id="this.id" :t=1 :type=2></comment>
    </div>
  </div>
</template>

<script>
import Collecter from "../../components/common/play-list-detail/collecter";
import Comment from "../../components/common/play-list-detail/comment.vue";
import PlayListDetailHead from "../../components/common/play-list-detail/play-list-detail-head.vue";
import SongListComponent from "../../components/common/play-list-detail/song-list-component.vue";
import {
  getSongListDetail,
  getCollector,
  getSongDetail,
  getSongUrl,
  getPlayListComment,
  getUserPlaylist,
  subPlaylist,
  getSongListType
} from "../../network/api";
export default {
  components: { PlayListDetailHead, SongListComponent, Collecter, Comment },
  name: "PlayListDetail",
  data() {
    return {
      //歌单详细信息
      TitleType: "歌单",
      currentIndex: 0,
      navbar: ["歌曲列表", "评论", "收藏者"],
      isShowAlbumComponent: true,
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
    //获取歌单列表全部信息
    async getSongListDetailInfo() {
      this.id = this.$route.params.id;
      const { data } = await getSongListDetail(this.id, 20);
      // console.log(data);
      this.$store.commit("setSongListDetailInfo", data.playlist);
    },
    //获取并处理歌单列表全部信息
    async handleSongListDetailInfo() {
      this.id = this.$route.params.id;
      const { data } = await getSongListDetail(this.id, 20);
      // console.log(data);
      this.$store.commit("setSongListDetailInfo", data.playlist);
      //处理歌单中全部的歌曲的ids
      const res = await getSongDetail(
        this.$store.state.songListDetailInfo.trackIds.map(({ id }) => id)
      );
      let SongsInfo = res.data.songs;
      let Urls = await getSongUrl(SongsInfo.map(({ id }) => id));
      this.$store.commit("setAllSongListInfo", SongsInfo);
      this.$store.commit("setAllSongUrls", Urls);
    },

    //收藏歌单
    async handleCollectSonglist() {
      //添加歌单
      if (this.$store.state.songListDetailInfo.subscribed) {
        //true
        //弹窗 问是否取消收藏
        this.$confirm("确定不再收藏该歌单?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(async () => {
          await subPlaylist(2, this.$store.state.songListDetailInfo.id);
          this.refreshUserSonglistInfo();
        });
      } else {
        //false
        await subPlaylist(1, this.$store.state.songListDetailInfo.id);
        this.refreshUserSonglistInfo();
      }
      //⭐⭐⭐⭐⭐⭐
      //数据没有更新是因为网易云api接口做了短时间内多次访问只会拿到前一个的数据 ----缓存处理 ---加时间戳可以解决
    },
    //刷新用户歌单信息函数
    async refreshUserSonglistInfo() {
      this.getSongListDetailInfo();
      let uInfo = JSON.parse(window.localStorage.getItem("currentUserInfo"));
      let uId = uInfo.userId;
      let playlist = await getUserPlaylist(uId);
      this.$store.commit("setUserSonglistInfo", playlist);
      this.$store.commit("updataSonglist");
    },
    async getCommentInfo(){
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
    this.getCommentInfo()
    this.getSongListType()
    this.$store.state.allTypeInfo=this.typeLists
  },
  computed: {
    songListDetailInfo() {
      return this.$store.state.songListDetailInfo;
    },
  },
  watch: {
    '$route'(){
      let id = this.$route.params.id;
      if(id){
        this.itemClick(this.currentIndex);
      this.handleSongListDetailInfo();
      this.getCommentInfo()
      }
    },
  },
};
</script>

<style scoped>
@import "./play-list-detail.css";
</style>>
