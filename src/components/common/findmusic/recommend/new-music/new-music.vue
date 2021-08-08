<template>
  <div class="recommend-newmusic">
      <into-details-button :intoDetailsButtonName="intoDetailsButtonName"
      @intoDetailsClick="intoDetailsClick"
      ></into-details-button>
      <div class="content">
        <new-music-card v-for="item in NewMusicCardInfo" :key="item.id"
        :pic="item.picUrl" :songname="item.name" :singer="item.song.artists.map(({name})=>name)" class="item"
        :id="item.id"
        ></new-music-card>
      </div>
  </div>
</template>

<script>
import NewMusicCard from './new-music-card'
import {getPersonalizedNewSong} from '../../../../../network/api'
import IntoDetailsButton from '../../../into-details-button.vue'
export default {
    name:"NewMusic",
    data() {
      return {
        NewMusicCardInfo:[],
        intoDetailsButtonName:"最新音乐"
      }
    },
    props:{
    },
    methods: {
      async getPersonalizedNewSong(){
        const {data} = await getPersonalizedNewSong(12)
        this.NewMusicCardInfo=data.result
      },
      intoDetailsClick(){
      this.$router.push('/newmusic');
    }
    },
    components:{
      NewMusicCard,
      IntoDetailsButton,
    },
    async created() {
      this.getPersonalizedNewSong()
    },
}
</script>

<style scoped>
@import './new-music.css';
</style>