<template>
  <div class="left-navbar">
    <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      active-text-color="red"
    >
      <el-menu-item index="1-1" @click="ClickToFindMusicPapg">
        <span slot="title" class="slot">发现音乐</span>
      </el-menu-item>
      <el-menu-item index="1-2" @click="ClickToMVPapg">
        <span slot="title" class="slot">视频</span>
      </el-menu-item>
      <el-menu-item index="1-3" @click="ClickToFriendPapg">
        <span slot="title" class="slot">朋友</span>
      </el-menu-item>
      <el-menu-item index="1-4" @click="ClickToLivePapg">
        <span slot="title" class="slot">直播</span>
      </el-menu-item>
      <el-menu-item index="1-5" @click="ClickToFMPapg">
        <span slot="title" class="slot">私人FM</span>
      </el-menu-item>
      <p class="xu-top"></p>
      <span class="my-music">我的音乐</span>
      <p class="xu-btm"></p>
      <el-menu-item index="2-1">
        <i class="el-icon-menu"></i>
        <span slot="title">本地音乐</span>
      </el-menu-item>
      <el-menu-item index="2-2">
        <i class="el-icon-download"></i>
        <span slot="title">下载管理</span>
      </el-menu-item>
      <el-menu-item index="2-3">
        <i class="el-icon-cloudy"></i>
        <span slot="title">我的音乐云盘</span>
      </el-menu-item>
      <el-menu-item index="2-4">
        <i class="el-icon-headset"></i>
        <span slot="title">我的电台</span>
      </el-menu-item>
      <el-menu-item index="2-5">
        <i class="el-icon-star-off"></i>
        <span slot="title">我的收藏</span>
      </el-menu-item>
    </el-menu>
    <div class="user-songlist">
      <div class="created-playlist">
        <div class="titile">
          <span class="name" @click="handleShowPlaylist">创建的歌单</span>
          <i
            class="el-icon-caret-right"
            @click="handleShowPlaylist"
            v-show="!isShowPlaylist"
          ></i>
          <i
            class="el-icon-caret-bottom"
            v-show="isShowPlaylist"
            @click="handleShowPlaylist"
          ></i>
          <i class="el-icon-plus"></i>
        </div>
        <div class="user-love" v-show="isShowPlaylist" @click="handleToPlaylistPapg(heartSonglist.id,'heartplaylist')">
          <img src="../../../assets/icon/heart.svg" alt="" />
          <span class="name">我喜欢的音乐</span>
        </div>
        <div
          class="playlist-item"
          v-for="(item, index) in mySonglist"
          :key="index"
          v-show="isShowPlaylist"
          @click="handleToPlaylistPapg(item.id,'myplaylist')"
        >
          <i class="el-icon-service"></i>
          <span class="name" >{{ item.name }}</span>
        </div>
      </div>
      <div class="collectd-playlist">
        <div class="titile">
          <span class="name" @click="handleShowCollectPlaylist"
            >收藏的歌单</span
          >
          <i
            class="el-icon-caret-right"
            @click="handleShowCollectPlaylist"
            v-show="!isShowCollectPlaylist"
          ></i>
          <i
            class="el-icon-caret-bottom"
            @click="handleShowCollectPlaylist"
            v-show="isShowCollectPlaylist"
          ></i>
        </div>
        <div
          class="playlist-item"
          v-for="(item, index) in collectSonglist"
          :key="index"
          v-show="isShowCollectPlaylist"
          @click="handleToPlaylistPapg(item.id,'collectplaylist')"
        >
          <i class="el-icon-service"></i>
          <span class="name" >{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { /* getsubcount,  */ getUserPlaylist } from "../../../network/api";
export default {
  name: "NavBar",
  data() {
    return {
      //控制歌单是否下拉
      isShowPlaylist: false,
      isShowCollectPlaylist: false,
    };
  },
  methods: {
    handleOpen() {},
    handleClose() {},
    ClickToFindMusicPapg() {
      this.$router.push("/findmusic");
    },
    ClickToMVPapg() {
      this.$router.push("/videohome");
    },
    ClickToFriendPapg() {
      this.$router.push("/friend");
    },
    ClickToLivePapg() {
      this.$router.push("/live");
    },
    ClickToFMPapg() {
      this.$router.push("/fm");
    },
    //歌单的信息需要写在topnavbar上面 传到vuex 实现跨页面同步数据
    //也可以动态监听 computed 或者 watch
    async handleShowPlaylist() {
      this.isShowPlaylist = !this.isShowPlaylist;
      //判断vuex里面有没用户歌单列表信息
      if (!this.$store.state.heartSonglist) {
        this.getUserPlaylist();
      }
    },
    async handleShowCollectPlaylist() {
      this.isShowCollectPlaylist = !this.isShowCollectPlaylist;
      if (!this.$store.state.heartSonglist) {
        this.getUserPlaylist();
      }
    },
    //获取用户的歌单信息
    async getUserPlaylist() {
      let uInfo = JSON.parse(window.localStorage.getItem("currentUserInfo"));
      let uId = uInfo.userId;
      let playlist = await getUserPlaylist(uId);
      console.log(playlist);
      this.$store.commit("setUserSonglistInfo", playlist);
      this.$store.commit("updataSonglist");
    },
    handleToPlaylistPapg(id,type){
      if(type == 'myplaylist'){
        this.$store.state.isShowUpdataComponent = true
      }else[
        this.$store.state.isShowUpdataComponent = false
      ]
        this.$router.push("/playlistdetail/"+id);
    },
    
  },
  computed: {
    mySonglist() {
      return this.$store.state.mySonglist;
    },
    heartSonglist() {
      return this.$store.state.heartSonglist;
    },
    collectSonglist() {
      return this.$store.state.collectSonglist;
    },
  },
};
</script>

<style scoped>
@import "./left-navbar.css";
</style>