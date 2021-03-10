<template>
<div class="recommend ">
  <div class="content">
      <Swiper :banner="banner" ></Swiper>
      <remcommend-list ></remcommend-list>
      <exclusive-push></exclusive-push>
      <new-music></new-music>
      <recommend-mv></recommend-mv>
      <radio></radio>
  </div>
</div>
</template>

<script>
import Swiper from '../../../components/common/swiper/Swiper'
import RemcommendList from '../../../components/common/findmusic/recommend/recommend-list/recommend-list.vue'
import { getBanner } from "../../../network/api"
import ExclusivePush from '../../../components/common/findmusic/recommend/exclusive-push/exclusive-push.vue'
import NewMusic from '../../../components/common/findmusic/recommend/new-music/new-music.vue'
import RecommendMv from '../../../components/common/findmusic/recommend/recommend-mv/recommend-mv.vue'
import Radio from '../../../components/common/findmusic/recommend/radio/radio-component.vue'
export default {
    name:'Recommend',
    data() {
      return {
        banner:[]
      }
    },
    components:{
      Swiper,
      RemcommendList,
      ExclusivePush,
      NewMusic,
      RecommendMv,
      Radio,
    },
    async created() {
    const {data} = await getBanner();
    this.banner=data.banners
    // console.log(data);
  },
  methods: {
    
  },
}
</script>

<style scoped>
@import './recommend.css';
</style>