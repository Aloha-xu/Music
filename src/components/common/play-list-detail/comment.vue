<template>
  <div class="comment">
    <div class="comment-input-area">
      <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="textarea"
        maxlength="140"
        show-word-limit
      >
      </el-input>
    </div>
    <div class="comment-item">
      <comment-card v-for="(item,index) in commentInfo" :key="index"  :likedCount="item.likedCount" :name="item.user.nickname" :pic="item.user.avatarUrl" :text="item.content" :time="item.time"></comment-card>
    </div>
  </div>
</template>
<script>
import CommentCard from '../comment-card.vue';
export default {
  components: { CommentCard },
  name: "Comment",
  data() {
    return {
    textarea:'',
    }
  },
  props:{
    commentInfo:Array
  },
};
</script>

<style scoped>
.comment{
  width: 100%;
}
.comment .comment-input-area{
  width: 98%;
}
</style>