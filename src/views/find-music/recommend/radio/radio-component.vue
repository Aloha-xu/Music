<template>
  <div class="recommend-radio">
    <into-details-button
      :intoDetailsButtonName="intoDetailsButtonName"
      @intoDetailsClick="intoDetailsClick"
    ></into-details-button>
    <div class="content">
        <radio-card v-for="item in CardInfo" :key="item.id" :id="item.artistId" :pic="item.picUrl" :playcount="item.playCount" :text="item.copywriter" :singer="item.artistName" :radioname="item.name"  class="item"></radio-card>
    </div>
  </div>
</template>

<script>
import IntoDetailsButton from "@/components/common/into-details-button.vue";
import RadioCard from "./radio-card.vue";
import {getRecommendRadioStation} from '@/network/api'
export default {
  name: "Radio",
  data() {
    return {
      intoDetailsButtonName: "主播电台",
      CardInfo:[]
    };
  },
  components: {
    IntoDetailsButton,
    RadioCard,
  },
  async created() {
    const {data}=await getRecommendRadioStation()
    this.CardInfo=data.result
  },
  methods: {
    intoDetailsClick(){
      this.$router.push('/anchorradio');
    }
  },
  
};
</script>

<style scoped lang='scss'>
.recommend-radio{
    width: 100%;
    margin-top: 20px;
}
.recommend-radio .content{
    display: flex;
}
.recommend-radio .content .item:nth-child(1){
    margin-right:15px ;
}
</style>