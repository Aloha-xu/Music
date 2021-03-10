<template>
  <div class="search-detail-album">
    <search-detail-card
      v-for="(item, index) in albumInfo.albums"
      :key="index"
      :name="item.name"
      :scover="item.picUrl"
      :creater="item.artist.name"
      @handleToPapg="handleToAlbumPapg(item.id)" 
    ></search-detail-card>
  </div>
</template>

<script>
import searchDetailCard from '../search-detail-card/search-detail-card.vue'
export default {
  components: { searchDetailCard },
    name:'SearchDetailAlbum',
    props:{
      albumInfo:Object
    },
    methods: {
      handleToAlbumPapg(id){
      this.$router.push("/albumlistdetail/" + id);
    }
    },
}
</script>

<style scoped>
@import './search-detail-album.css';
</style>