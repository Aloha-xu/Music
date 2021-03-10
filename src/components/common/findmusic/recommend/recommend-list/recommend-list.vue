<template>
  <div class="recommend-list">
    <into-details-button :intoDetailsButtonName="intoDetailsButtonName" @intoDetailsClick="intoDetailsClick"></into-details-button>
    <div class="play-card">
        <PlayCard
        class="item"
          v-for="item in PlayCarInfo"
          :key="item.id"
          :pic="item.picUrl"
          :playcount="item.playCount"
          :text="item.name"
          :id="item.id"
        >
        <span slot="yymmdd"></span>
        </PlayCard>
    </div>
  </div>
</template>

<script>
import PlayCard from "../../../play-card"
import IntoDetailsButton from '../../../into-details-button'
import { getPersonalized } from "../../../../../network/api"
export default {
  name: "RemcommendList",
  props: {},
  data() {
    return {
      PlayCarInfo: [],
      intoDetailsButtonName:"推荐歌单"
    };
  },
  components: {
    PlayCard,
    IntoDetailsButton,
  },
  async created() {
    this.getPlayCardInfo();
  },
  methods: {
    async getPlayCardInfo() {
      const { data } = await getPersonalized();
      this.PlayCarInfo = data.result.slice(0,10);
    },
    intoDetailsClick(){
      this.$router.push('/songlist');
    }
  },
};
</script>

<style scoped>
@import './recommend-list.css';
</style>