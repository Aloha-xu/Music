<template>
  <div id="app">
    <Header/>
    <el-container v-show="!this.$store.state.isShowMaxPlayer">
      <el-aside class="navbar" width="210px">
        <NavBar/>
      </el-aside>
      <keep-alive
        exclude="PlayListDetail,AlbumListDetail,SingerListDetail,MvDetail,PrivateFM,UpDataPapg">
        <router-view></router-view>
      </keep-alive>
    </el-container>
    <MaxPlay v-show="this.$store.state.isShowMaxPlayer"></MaxPlay>
    <MiniPlay class="mini-play"></MiniPlay>
  </div>
</template>
<script>
import Header from "./views/header/header.vue";
import NavBar from './views/aside/navbar.vue'
import MaxPlay from "./views/player/MaxPlay.vue";
import MiniPlay from "./views/player/MiniPlay.vue";
export default {
  name: "app",
  components: {
    Header,
    NavBar,
    MaxPlay,
    MiniPlay,
  }
};
</script>
<style scoped lang="scss">
#id {
  position: relative;
}
.navbar {
  border-right: 1.5px solid rgba(173, 174, 175, 0.5);
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
