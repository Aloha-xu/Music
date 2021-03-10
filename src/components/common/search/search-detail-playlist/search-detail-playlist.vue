<template>
  <div class="search-detail-playlist">
    <search-detail-card
      v-for="(item, index) in playlistInfo.playlists"
      :key="index"
      :name="item.name"
      :scover="item.coverImgUrl"
      :creater="item.creator.nickname"
      :number="item.trackCount"
      :playlistType="true"
      @handleToPapg="handleToPlaylistPapg(item.id)"
    >
    </search-detail-card>
  </div>
</template>

<script>
import searchDetailCard from "../search-detail-card/search-detail-card.vue";
export default {
  components: { searchDetailCard },
  name: "SearchDetailPlaylist",
  props:{
    playlistInfo:Object,
  },
  methods: {
    handleToPlaylistPapg(id){
      this.$router.push("playlistdetail"+id)
    }
  },
};
</script>

<style scoped>
@import "./search-detail-playlist.css";
</style>