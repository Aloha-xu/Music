<template>
  <div class="search-detail-singer">
    <search-detail-card
      v-for="(item, index) in singerInfo.artists"
      :key="index"
      :name="item.name"
      :scover="item.img1v1Url"
      @handleToPapg="handleToSingerPapg(item.id)"
    ></search-detail-card>
  </div>
</template>

<script>
import searchDetailCard from "../search-detail-card/search-detail-card.vue";
export default {
  components: { searchDetailCard },
  name: "SearchDetailSinger",
  props: {
    singerInfo: Object,
  },
  methods: {
    handleToSingerPapg(id){
      this.$router.push("/singerlistdetail/" + id);
    }
  },
};
</script>

<style scoped>
@import "search-detail-singer.css";
</style>