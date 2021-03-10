<template>
  <div class="singer-list-detail">
    <div class="head">
      <div class="pic">
        <img :src="ArtistInfo.cover" alt="">
      </div>
      <div class="text">
        <div class="name">{{ArtistInfo.name}}</div>
      <!-- <div class="english_name">{{}}</div> -->
      <el-button round class="el-icon-folder-add">收藏</el-button>
      <el-button round class="el-icon-user">个人页面</el-button>
      <div class="other">
        <span class="songs ">歌曲数：{{ArtistInfo.musicSize}}</span>
        <span class="album">专辑数：{{ArtistInfo.albumSize}}</span>
        <span class="mv">MV数：{{ArtistInfo.mvSize}}</span>
      </div>
      </div>
    </div>
    <div class="content">
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
      <album v-if="currentIndex===0" :ArtistAlbumInfo="ArtistAlbumInfo"></album>
      <MV v-else-if="currentIndex === 1" :ArtistMVInfo="ArtistMVInfo"></MV>
      <artist-desc v-else-if="currentIndex === 2"  :ArtistDescdata="ArtistDescInfo" :name="ArtistInfo.name"></artist-desc>
      <simi-artist v-else :SimiArtist="SimiArtistInfo"></simi-artist>
    </div>
  </div>
</template>

<script>
import Album from '../../components/common/singer-list-detail/album.vue'
import ArtistDesc from '../../components/common/singer-list-detail/artist-desc.vue'
import MV from '../../components/common/singer-list-detail/mv.vue'
import SimiArtist from '../../components/common/singer-list-detail/simi-artist.vue'

import {getArtistDetail,getArtistMV,getArtistDesc,getSimiArtist,getArtistAlbum} from '../../network/api'
export default {
  components: {Album, MV, ArtistDesc, SimiArtist  },
    name:'SingerListDetail',
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
        case 3:
          this.currentIndex = index;
          break;
      }
    },
    },
    data() {
      return {
        ArtistInfo:[],
        ArtistMVInfo:[],
        ArtistDescInfo:[],
        SimiArtistInfo:[],
        ArtistAlbumInfo:[],
        navbar: ["专辑", "MV", "歌手详情", "相似歌手"],
        currentIndex: 0,
      }
    },
    async created() {
      this.itemClick(this.currentIndex);
      this.id=this.$route.params.id
      const {data}= await getArtistDetail(this.id)
      this.ArtistInfo=data.data.artist
      const MVdata= await getArtistMV(this.id)
      this.ArtistMVInfo=MVdata.data.mvs
      const ArtistDescInfo= await getArtistDesc(this.id)
      this.ArtistDescInfo=ArtistDescInfo.data
      const SimiArtistInfo= await getSimiArtist(this.id)
      this.SimiArtistInfo=SimiArtistInfo.data.artists
      const ArtistAlbumInfo= await getArtistAlbum(this.id)
      this.ArtistAlbumInfo=ArtistAlbumInfo.data.hotAlbums
      console.log(ArtistAlbumInfo)
    },
}
</script>

<style scoped>
@import './singer-list-detail.css';
</style>