<template>
  <div class="comment-card">
    <div class="left">
      <img :src="pic" alt="" />
    </div>
    <div class="comment-content">
      <div class="text">
        <span>{{ name }}:</span>
        <span>{{ text }}</span>
      </div>
      <div class="time-tools">
        <div class="time">{{ showDate }}</div>
        <div class="tools">
          <div class="like">
            <i class="el-icon-thumb"></i>
            <span>{{ likedCount }}</span>
          </div>
          <span>|</span>
          <div class="share">
            <i class="el-icon-share"></i>
          </div>
          <span>|</span>
          <div class="reply">
            <i class="el-icon-chat-line-round"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getYMDHMS } from "../../utils/uctil";
export default {
  name: "CommentCard",
  props: {
    name: String,
    text: String,
    pic: String,
    likedCount: Number,
    time: Number,
  },
  data() {
    return {};
  },
  computed: {
    showDate() {
      return getYMDHMS(this.time);
    },
  },
};
</script>

<style scoped>
@import 'comment-card.css';
</style>