<template>
  <div class="video-type-popover">
    <div class="top" @click="handlevideoTypeClick('全部视频')">
      <div>全部视频</div>
    </div>
    <div class="center">
      <div
        class="item"
        :class="item.name === currentvideoType ? 'active' : ''"
        v-for="(item, index) in videoType"
        :key="index"
        @click="handlevideoTypeClick(item)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "videoTypePopover",
  props: {
    videoType: Array,
  },
  data() {
      return {
          currentvideoType:"",
      }
  },
  methods: {
      handlevideoTypeClick(item){
      this.currentvideoType=item.name
      this.$emit('handleVideoTypeClick',item)
    },
  },
};
</script>

<style scoped>
@import "./video-type-popover.css";
</style>