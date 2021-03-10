<template>
  <div class="search-detail-card" @click="handleToPapg()">
          <div class="pic">
              <img :src="scover" alt="">
          </div>
          <div class="name">{{name}}</div>
          <div class="song-number" v-show="playlistType || false">{{number}}首</div>
          <div class="creater">
            <span v-show="false || djType || playlistType">by </span>
            {{creater}}</div>
          <div class="other">{{other}}</div>
  </div>
</template>

<script>
export default {
    name:'SearchDetailCard',
    props:{
        scover:String,
        name:String,
        number:Number,
        creater:String,
        other:String,
        playlistType:Boolean,
        djType:Boolean,
    },
    methods: {
        handleToPapg(){
      this.$emit("handleToPapg")
    }
    },
}
</script>

<style scoped>
@import './search-detail-card.css';
</style>