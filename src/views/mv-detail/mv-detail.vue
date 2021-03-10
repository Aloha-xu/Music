<template>
  <div class="mv-detail">
    <div class="content">
      <div class="detail">
        <div class="title"><i class="el-icon-arrow-left"></i>MV详情</div>
        <div class="video">
          <video
            :src="mvUrl"
            width="750px"
            height="420px"
            controls
            autoplay="autoplay"
          ></video>
        </div>
        <div class="mv-artist">
          <img :src="artistImg" alt="" />
          <span v-for="item in artist" :key="item" class="item">{{ item }}</span>
        </div>
        <div class="mv-info">
          <div class="name" v-show="Number(this.$route.params.id)">
            {{ artistName }}
          </div>
          <i
            class="el-icon-caret-bottom"
            @click="showDescription"
            v-show="Number(this.$route.params.id)"
          ></i>
          <div class="title" v-show="!Number(this.$route.params.id)">
            {{ title }}
          </div>
          <span>发布：{{ publishTime }}</span>
          <span>播放：{{ playCount }}</span>
        </div>
        <div
          v-show="Number(this.$route.params.id)"
          class="mv-description"
          :style="
            isShowDescription === true
              ? 'overflow: visible;'
              : 'overflow: hidden;'
          "
        >
          {{ desc }}
        </div>
        <div class="video-group" v-show="!Number(this.$route.params.id)">
          <span v-for="(item, index) in videoGroup" :key="index" class="item">{{
            item.name
          }}</span>
        </div>
        <div class="tools">
          <div class="button">
            <span class="el-icon-thumb"></span>
            <span>赞({{ likedCount }})</span>
          </div>
          <div class="button">
            <span class="el-icon-folder-add"></span>
            <span>收藏({{ subCount }})</span>
          </div>
          <div class="button">
            <span class="el-icon-edit-outline"></span>
            <span>分享({{ shareCount }})</span>
          </div>
          <div class="button">
            <span class="el-icon-download"></span>
            <span>下载MV</span>
          </div>
          <span class="tip-off">举报</span>
        </div>
        <div class="comment">
          <div class="title">评论({{ commentCount }})</div>
          <comment :commentInfo="commentInfo"></comment>
        </div>
      </div>
      <!-- 不想写了 -->
      <div class="recommend">相似mv</div>
    </div>
  </div>
</template>

<script>
import comment from "../../components/common/play-list-detail/comment.vue";
import { getYMD } from "../../utils/uctil";
import {
  getMvDetail,
  getMvUrl,
  getMvComment,
  getVideoDetail,
  getVideoComment,
  getVideoUrl,
  getVideoDetailInfo,
  getAllVideo,
  getRecommentMv,
} from "../../network/api";
export default {
  components: { comment },
  name: "MvDetail",
  data() {
    return {
      mvUrl: "",
      commentInfo: [],
      artistImg: "",
      artist: [],
      artistName: "",
      publishTime: "",
      playCount: 0,
      desc: "",
      subCount: 0,
      shareCount: 0,
      commentCount: 0,
      likedCount: 0,
      videoGroup: [],
      isShowDescription: false,
      title: "",
    };
  },
  methods: {
    showDescription() {
      this.isShowDescription = !this.isShowDescription;
      console.log(this.isShowDescription);
    },
    //获取mv的信息
    async getMvDetailInfo() {
      this.id = this.$route.params.id;
      let { data } = await getMvDetail(this.id);
      console.log(data);
      let url = await getMvUrl(this.id);
      console.log(url);
      let commentInfo = await getMvComment(this.id);
      console.log(commentInfo);
      let recommendMvInfo = await getRecommentMv();
      console.log(recommendMvInfo);

      this.artistImg = data.data.cover;
      this.artist = data.data.artists.map(({ name }) => name);
      this.artistName = data.data.name;
      this.publishTime = data.data.publishTime;
      this.playCount = data.data.playCount;
      this.desc = data.data.desc;
      this.subCount = data.data.subCount;
      this.shareCount = data.data.shareCount;
      this.commentCount = data.data.commentCount;
      this.commentInfo = commentInfo.data.comments;
      this.mvUrl = url.data.data.url;
      this.videoGroup = [];
      this.title = "";
    },
    //获取视频的信息
    async getVideoDetailInfo() {
      this.id = this.$route.params.id;
      let { data } = await getVideoDetail(this.id);
      console.log(data);
      const url = await getVideoUrl(this.id);
      console.log(url);
      const commentDetailInfo = await getVideoDetailInfo(this.id);
      const commentInfo = await getVideoComment(this.id);
      const correlationVideo = await getAllVideo(this.id);
      console.log(correlationVideo);

      this.artistImg = data.data.coverUrl;
      this.artist = data.data.creator.nickname.split("");
      this.publishTime = getYMD(data.data.publishTime);
      this.playCount = data.data.praisedCount;
      this.desc = "";
      this.subCount = data.data.subscribeCount;
      this.shareCount = commentDetailInfo.data.shareCount;
      this.commentCount = commentDetailInfo.data.commentCount;
      this.likedCount = commentDetailInfo.data.likedCount;
      this.commentInfo = commentInfo.data.comments;
      this.mvUrl = url.data.urls[0].url;
      this.title = data.data.title;
      this.videoGroup = data.data.videoGroup;
    },
  },
  created() {
    if (Number(this.$route.params.id)) {
      this.getMvDetailInfo();
    } else {
      this.getVideoDetailInfo();
    }
  },
};
</script>

<style>
@import "./mv-detail.css";
</style>