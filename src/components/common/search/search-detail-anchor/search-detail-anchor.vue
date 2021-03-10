<template>
  <div class="search-detail-anchor">
    <search-detail-card
    v-for="(item, index) in anchorInfo.djRadios"
      :key="index"
      :name="item.name"
      :scover="item.picUrl"
      :creater="item.dj.nickname"
      :djType="true"
      @handleToPapg="handleToAnchorPapg(item.id)"></search-detail-card>
  </div>
</template>

<script>
import searchDetailCard from '../search-detail-card/search-detail-card.vue'
export default {
  components: { searchDetailCard },
    name:'SearchDetailAnchor',
    props:{
      anchorInfo:Object
    },
    methods: {
      handleToAnchorPapg(){

      }
    },
}
</script>

<style scoped>
@import './search-detail-anchor.css';
</style>