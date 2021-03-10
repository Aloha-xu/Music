<template>
  <div id="app">
    <top-tab-bar></top-tab-bar>
    <el-container v-show="!this.$store.state.isShowMaxPlayer">
      <el-aside class="navbar" width="210px">
        <nav-bar></nav-bar>
      </el-aside>
      <keep-alive
        exclude="PlayListDetail,SingerListDetail,MvDetail,PrivateFM,UpDataPapg"
      >
        <router-view></router-view>
      </keep-alive>
    </el-container>
    <max-play v-show="this.$store.state.isShowMaxPlayer"></max-play>
    <mini-play class="mini-play"></mini-play>
  </div>
</template>
<script>
/* tese */
import TopTabBar from "./components/common/top-tabbar/top-tabbar.vue";
import NavBar from "./components/common/navbar/left-navbar";
import MaxPlay from "./views/player/MaxPlay.vue";
import MiniPlay from "./views/player/MiniPlay.vue";
export default {
  name: "app",
  components: {
    TopTabBar,
    NavBar,
    MaxPlay,
    MiniPlay,
  }
};
</script>
<style scoped>
#id {
  position: relative;
}
.navbar {
  border-right: 1.5px solid rgb(173, 174, 175, 0.5);
  height: 86vh;
  float: left;
  overflow: scroll;
}
.mini-play {
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>
