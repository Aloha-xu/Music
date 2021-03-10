<template>
  <div class="search-detail-user">
    <search-detail-card
    v-for="(item, index) in userInfo.userprofiles"
      :key="index"
      :name="item.nickname"
      :scover="item.avatarUrl"
      :other="item.signature"
      @handleToPapg="handleToUserPapg(item.id)"></search-detail-card>
  </div>
</template>

<script>
import searchDetailCard from '../search-detail-card/search-detail-card.vue'
export default {
  components: { searchDetailCard },
    name:'SearchDetailUser',
    props:{
      userInfo:Object
    },
    methods: {
      handleToUserPapg(){
        
      }
    },
}
</script>

<style scoped>
@import './search-detail-user.css';
</style>