<template>
  <div class="card">
    <div class="card-pic">
      <el-image :src="pic" @click="cardClick" class="playcard-img" lazy>
        <div slot="placeholder" class="image-slot">
          <div>加载中....</div>
        </div>
      </el-image>
      <span class="palycount">
        <slot name="card_palycount">{{ playCount }}</slot>
      </span>
      <!-- slot 作者名字 -->
      <div class="creattor">
        <slot name="card_creator"></slot>
      </div>
      <span class="totle-paly-time">
        <slot name="totlepalytime"></slot>
      </span>
      <!-- 还没有加一个移动到图片上就出现可播放的图片logo -->
    </div>
    <div class="text">
      {{ text }}
    </div>
    <div class="card-YY-MM-DD">
      <slot name="yymmdd"></slot>
    </div>
    <div class="track-count" v-show="trackCount">{{ trackCount }}首</div>
  </div>
</template>
<script>
export default {
  name: "PlayCard",
  props: {
    pic: {
      type: String,
      default: "",
    },
    playcount: {
      type: Number,
      default: 0,
    },
    text: {
      type: String,
      default: "",
    },
    id: {
      type: Number,
      default: 0,
    },
    trackCount: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      activeColor: "red",
    };
  },
  computed: {
    playCount() {
      return parseInt((this.playcount / 10000).toFixed(0)) + "万";
    },
  },
  methods: {
    cardClick() {
      this.$router.push("/playlistdetail/" + this.id);
    },
  },
};
</script>

<style scoped>
.card {
  position: relative;
  padding-bottom: 10px;
  margin-top: 10px;
  border-radius: 5px;
}
.playcard-img {
  width: 100%;
  border-radius: 5px;
}
.palycount {
  position: absolute;
  top: 3px;
  right: 3px;
  font-size: 12px;
  color: white;
}
.text {
  font-size: 13px;
  letter-spacing: 0.7px;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 5px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-height: 20px;
}
.creattor {
  position: absolute;
  left: 10px;
  bottom: 70px;
  color: aliceblue;
}
.totle-paly-time {
  position: absolute;
  right: 8px;
  bottom: 52px;
  color: aliceblue;
}
.card-YY-MM-DD {
  font-size: 13px;
  font-weight: 300;
  margin-top: 10px;
}
.track-count {
  font-size: 13px;
  font-weight: 300;
}
.image-slot {
  width: 207px;
  height: 207px;
  text-align: center;
  line-height: 207px;
}
</style>