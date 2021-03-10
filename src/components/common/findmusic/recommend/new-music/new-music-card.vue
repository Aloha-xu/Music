<template>
  <div class="recommend-newmusic-card" @click="handleClickItem()">
    <div class="pic">
      <img :src="pic" alt="" />
    </div>
    <div class="text">
      <div class="songname">{{ songname }}</div>
      <div
        class="singer"
        v-for="item in singer"
        :key="item"
      >
        <p>{{ item }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewMusicCard",
  props: {
    songname: String,
    singer: Array,
    pic: String,
    id:Number
  },
  methods: {
    handleClickItem(){
      this.$router.push("/playlistdetail/" + this.id)
    }
  },
  data() {
    return {
    };
  },
  created() {
  },
};
</script>

<style scoped>
@import './new-music-card.css';
</style>