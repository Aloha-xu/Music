<template>
  <div class="search-detail-user">
    <search-detail-card
      v-for="(item, index) in userInfo.userprofiles"
      :key="index"
      :name="item.nickname"
      :scover="item.avatarUrl"
      :other="item.signature"
      @handleToPapg="handleToUserPapg(item.id)"
    ></search-detail-card>
  </div>
</template>

<script>
import searchDetailCard from "../search-detail-card/search-detail-card.vue";
export default {
  components: { searchDetailCard },
  name: "SearchDetailUser",
  props: {
    userInfo: Object,
  },
  methods: {
    handleToUserPapg() {},
  },
};
</script>

<style scoped lang='scss'>
.search-detail-user {
  .search-detail-card {
    height: 85px;
    line-height: 80px;
    vertical-align: middle;
    .pic {
      img {
        margin-left: 10px;
      }
    }
  }
  .search-detail-card:nth-child(2n) {
    background-color: rgb(245, 245, 245);
    border-radius: 5px;
  }
  .search-detail-card:hover {
    background-color: rgb(231, 231, 231);
  }
}
</style>