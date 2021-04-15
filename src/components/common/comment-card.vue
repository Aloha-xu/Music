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
            <i class="el-icon-thumb" @click="toLike"></i>
            <span>{{ likedCount }}</span>
          </div>
          <span>|</span>
          <div class="share" @click="toShare">
            <i class="el-icon-share"></i>
          </div>
          <span>|</span>
          <div class="reply" @click="toReply">
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
    uid:Number,
  },
  data() {
    return {};
  },
  computed: {
    showDate() {
      return getYMDHMS(this.time);
    },
  },
  methods: {
    toLike(){
      this.$emit("handleLike");
    },
    toShare(){
      this.$emit("handleShareComment");
    },
    toReply(){
      this.$emit("handleReplyComment",[this.uid,this.name]);
      
    }
  },
};
</script>

<style scoped>
@import 'comment-card.css';
</style>