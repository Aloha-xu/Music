<template>
  <div class="updata-papg">
    <div class="title">编辑歌单信息</div>
    <div class="playlist-info">
      <div class="palylist-name">
        歌单名：
        <el-input v-model="palylistName"></el-input>
      </div>
      <div class="types">
        标签：
        <span
          class="basie-type"
          v-for="(item, index) in playlistType"
          :key="index"
          >{{ item }}</span
        >
        <span class="add-type" v-show="playlistType">添加标签</span>
      </div>
      <div class="desc">
        简介：
        <el-input
          type="textarea"
          v-model="playlistDesc"
          maxlength="999"
          show-word-limit
          rows="5"
        >
        </el-input>
      </div>
      <div class="save-button" @click="saveClick">保存</div>
      <div class="cancel-button" @click="cancelClick">取消</div>
    </div>
    <div class="cover">
      <img :src="cover" alt="" />
      <el-upload
      class="avatar-uploader"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <div class="updata-button" v-else >编辑封面</div>
      <!-- 上传封面 不写了 搞不懂 -->
    </el-upload>
    </div>
    <user-updata-type-popover
      :currentSongType="playlistType"
      v-show="false"
    ></user-updata-type-popover>
    
  </div>
</template>

<script>
import userUpdataTypePopover from "../../components/common/popover/user-updata-type-popover.vue";
import { updataUserPlaylist, getUserPlaylist } from "../../network/api";
export default {
  components: { userUpdataTypePopover },
  name: "UpDataPapg",
  data() {
    return {
      palylistName: "",
      playlistDesc: "",
      playlistType: [],
      imageUrl: "",
    };
  },
  methods: {
    async saveClick() {
      //判断添加的标签是否大于3个
      if (this.playlistType.length > 3) {
        alert("标签大于3个");
        return;
      }
      console.log(this.playlistType);
      await updataUserPlaylist(
        this.$route.params.id,
        this.palylistName,
        this.playlistDesc,
        this.playlistType.join(";")
      );
      this.getUserPlaylist();
      this.$router.back();
    },
    cancelClick() {
      this.$router.back();
    },
    async getUserPlaylist() {
      let uInfo = JSON.parse(window.localStorage.getItem("currentUserInfo"));
      let uId = uInfo.userId;
      let playlist = await getUserPlaylist(uId);
      console.log(playlist);
      this.$store.commit("setUserSonglistInfo", playlist);
      this.$store.commit("updataSonglist");
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(res);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
  computed: {
    cover() {
      let currentindex = this.$store.state.mySonglist.findIndex(
        (item) => item.id == this.$route.params.id
      );
      return this.$store.state.mySonglist[currentindex].coverImgUrl;
    },
  },
  created() {
    let currentindex = this.$store.state.mySonglist.findIndex(
      (item) => item.id == this.$route.params.id
    );
    this.palylistName = this.$store.state.mySonglist[currentindex].name;
    this.playlistDesc = this.$store.state.mySonglist[currentindex].description;
    this.playlistType = this.$store.state.mySonglist[currentindex].tags;
  },
};
</script>

<style scoped>
@import "./updata-papg.css";
</style>