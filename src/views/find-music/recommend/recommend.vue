<template>
  <div class="recommend">
    <div class="content">
      <Swiper :banner="banner"></Swiper>
      <RemcommendList />
      <ExclusivePush />
      <NewMusic />
      <RecommendMv />
      <Radio />
    </div>
  </div>
</template>

<script>
import Swiper from "../../../components/common/swiper/Swiper.vue";
import RemcommendList from "../../../components/common/findmusic/recommend/recommend-list/recommend-list.vue";
import { getBanner } from "../../../network/api";
import ExclusivePush from "../../../components/common/findmusic/recommend/exclusive-push/exclusive-push.vue";
import NewMusic from "../../../components/common/findmusic/recommend/new-music/new-music.vue";
import RecommendMv from "../../../components/common/findmusic/recommend/recommend-mv/recommend-mv.vue";
import Radio from "../../../components/common/findmusic/recommend/radio/radio-component.vue";
export default {
  name: "Recommend",
  data() {
    return {
      banner: [],
    };
  },
  components: {
    Swiper,
    RemcommendList,
    ExclusivePush,
    NewMusic,
    RecommendMv,
    Radio,
  },
  async created() {
    this.$store.commit("refeshCurrentNavIndex", 0);
    const { data } = await getBanner();
    this.banner = data.banners;
  },
  activated() {
    this.$store.commit("refeshCurrentNavIndex", 0);
  },
};
</script>

<style scoped lang='scss'>
.recommend{
    display: flex;
    justify-content: center;
    overflow: scroll;
    height: 82vh;
    .content{
        width: 1100px;
    }
}
</style>