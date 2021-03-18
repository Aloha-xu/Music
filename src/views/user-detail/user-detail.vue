<template>
  <div class="user-detail">
    <div class="head">
      <div class="user-pic">
        <img :src="img" alt="" />
      </div>
      <div class="user-detail-info">
        <div class="title">{{ userName }}</div>
        <div class="user-basice-info">
          <div class="all-auth-types">
            <div class="auth-types" v-for="item in authTypes" :key="item">
              {{ item }}
            </div>
            <span class="level">Lv{{ level }}</span>
            <span class="man" v-show="gender == 1">♂</span>
            <span class="girl" v-show="gender == 2">♀</span>
          </div>
          <div class="tools-button">
            <span class="other-button" @click="handleOther">
              <i class="el-icon-more"></i>
            </span>
            <span
              class="focus-button-off"
              v-show="!isFocus"
              @click="handleFocus"
            >
              <i class="el-icon-plus"></i>
              关注
            </span>
            <span class="focus-button-on" v-show="isFocus" @click="handleFocus">
              <i class="el-icon-check"></i>
              已关注
            </span>
            <span class="send-msg-button" @click="handlePrivateMsg">
              <i class="el-icon-message"></i>
              发私信
            </span>
          </div>
        </div>
        <div class="user-number-info">
          <div class="dynamic" @click="handleToDynamicPapg">
            <div class="dynamic-number">{{ dynamicNumber }}</div>
            <span>动态</span>
          </div>
          <div class="focus" @click="handleToFocusPapg">
            <div class="focus-number">{{ focusNumber }}</div>
            <span>关注</span>
          </div>
          <div class="fans" @click="handleToFansPapg">
            <div class="fans-number">{{ fansNumber }}</div>
            <span>粉丝</span>
          </div>
        </div>
        <div class="user-introduce-info">
          <div class="sns">社交网络：未绑定</div>
          <div class="self-introduction" v-show="selfIntroduction">
            个人介绍：{{ selfIntroduction }}
          </div>
        </div>
      </div>
    </div>
    <div class="user-detail-content">
      <div class="Dj"></div>
      <div class="play-list-title">
        歌单
        <span>（{{ playlistCount }}）</span>
      </div>

      <div class="all-cards">
        <play-card
          v-for="(item, index) in playListInfo"
          :key="index"
          :id="item.id"
          :pic="item.coverImgUrl"
          :playcount="item.playCount"
          :trackCount="item.trackCount"
          :text="item.name"
        ></play-card>
      </div>
    </div>
  </div>
</template>
 
<script>
import playCard from "../../components/common/play-card.vue";
import { getUserDetail, getUserPlaylist,setFollow } from "../../network/api";
export default {
  components: { playCard },
  name: "UserDetail",
  data() {
    return {
      //head数据
      img: null,
      userName: null,
      authTypes: null,
      level: null,
      gender: null,
      dynamicNumber: null,
      focusNumber: null,
      fansNumber: null,
      selfIntroduction: null,
      sns: null,
      playlistCount: null,
      
      playListInfo: [],

      //当前页面的用户信息
      toUserInfo:{}
    };
  },
  methods: {

    //判断是否关注
    async handleFocus() {
      if (this.isFocus) {
        await setFollow(this.toUserInfo.userId,0)
        this.toUserInfo.followed = false
      } else {
        await setFollow(this.toUserInfo.userId,1)
        this.toUserInfo.followed = true
      }
    },

    //显示私信弹出框
    handlePrivateMsg() {
      //通过vuex传信息给darwer下的innnerDarwer
      this.$store.state.toUserInfo = {cover:this.img,name:this.userName,uId:this.toUserInfo.userId}
      this.$store.commit("setShowMsgInnerDarwer");
      this.$store.commit("setShowMsgDarwer");
    },

    handleOther() {},
    handleToDynamicPapg() {},
    handleToFocusPapg() {},
    handleToFansPapg() {},

    //处理全部数据
    async handleAllInfo() {
      const { data } = await getUserDetail(this.$route.params.id);
      // console.log(data);
      this.img = data.profile.avatarUrl;
      this.userName = data.profile.nickname;
      this.authTypes = data.profile.allAuthTypes.map(({ desc }) => desc);
      this.level = data.level;
      //gender 1 ==> 男 ♂  2 ==> 女 ♀
      this.gender = data.profile.gender;
      this.dynamicNumber = data.profile.eventCount;
      this.focusNumber = data.profile.follows;
      this.fansNumber = data.profile.followeds;
      this.selfIntroduction = data.profile.signature;
      this.isFocus = data.profile.followed;
      this.playlistCount = data.profile.playlistCount;

      //获取用户的歌单信息
      const playListInfo = await getUserPlaylist(data.profile.userId);
      this.playListInfo = playListInfo.data.playlist;

      //设置用户的信息
      this.toUserInfo = data.profile
      // console.log(playListInfo);
    },
  },
  computed: {

    //是否关注的控制变量
    isFocus(){
      return this.toUserInfo.followed
    }
  },
  async created() {
    this.handleAllInfo();
  },
  watch: {
    '$route'() {
      this.handleAllInfo();
    },
  },
};
</script>

<style scoped>
@import "./user-detail.css";
</style>