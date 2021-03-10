<template>
  <div class="box">
    <div class="left">
      <div class="logo">
        <img src="../../../assets/icon/logo.png" alt="" />
      </div>
      <div class="back_go_tool">
        <img
          src="../../../assets/icon/arrow-double-left.svg"
          alt=""
          class="back"
          @click="back"
        />
        <img
          src="../../../assets/icon/arrow-double-right.svg"
          alt=""
          class="go"
          @click="go"
        />
      </div>
      <div class="search">
        <search
          :HotSearchDetail="HotSearchDetail"
          :SearchDetail="SearchDetail"
          @handleSearchValues="handleChangeSearch"
        ></search>
      </div>
    </div>
    <div class="right">
      <div class="user-info">
        <div class="out-login" @click="handleLogin" v-if="!currentUserInfo">
          <i class="el-icon-user"></i> <span>未登录</span>
        </div>
        <div class="login" v-if="currentUserInfo">
          <img :src="currentUserInfo.avatarUrl" alt="" />
          <span>{{ currentUserInfo.nickname }}</span>
        </div>
        <div class="tool">
          <img
            src="../../../assets/icon/email.svg"
            alt=""
            @click="getNotices()"
          />
          <img src="../../../assets/icon/clothes.svg" alt="" />
          <img src="../../../assets/icon/setting.svg" alt="" />
        </div>
      </div>
    </div>
    <!-- 通知栏的弹出框 -->
    <el-drawer :visible.sync="drawer" size="365px" :show-close="false">
      <div class="notice-popover">
        <!--  -->
        <div class="title">消息</div>
        <div class="tabs">
          <div
            class="item"
            v-for="(item, index) in tabItem"
            :key="item"
            :class="index == currentNav ? 'active' : ''"
            @click="currentNav = index"
          >
            {{ item }}
          </div>
        </div>
        <div class="content">
          <div class="private">
            <div
              class="notice-card"
              v-for="(item, index) in privateInfo"
              :key="index"
            >
              <img :src="item.fromUser.avatarUrl" alt="" />
              <div
                class="text"
                @click="
                  handleToInnerDrawer(
                    item.fromUser.userId,
                    item.fromUser.nickname,
                    item.fromUser.avatarUrl
                  )
                "
              >
                <div class="name">{{ item.fromUser.nickname }}</div>
                <div class="time">{{ getYMD(item.lastMsgTime) }}</div>
                <div class="new-notice">
                  {{ parseLastNotice(item.lastMsg) }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <el-drawer
          size="365px"
          :append-to-body="true"
          :visible.sync="innerDrawer"
          :show-close="false"
          :wrapperClosable="false"
        >
          <div class="inner-popover">
            <i class="el-icon-arrow-left" @click="handleOutInneerPopover"></i>
            <div class="name">{{ toUserInfo.name }}</div>
            <div class="content">
              <div class="befor-msg">
                <div
                  class="msg-card"
                  v-for="(item, index) in beforMsgs"
                  :key="index"
                >
                  <div class="time">{{ getYestaryToday(item.time) }}</div>
                  <div class="msg" :class="toUserInfo.uId === item.uid ? '' : 'active'">
                    <img
                      :src="toUserInfo.cover"
                      alt=""
                      v-show="toUserInfo.uId == item.uid"
                    />
                    <div
                      class="text"
                    >
                      <div class="text-content">
                        {{ JSON.parse(item.msg).msg }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="new-msg">
                <div
                  class="msg-card"
                  v-for="(item, index) in newMsgs"
                  :key="index"
                >
                  <div class="time">{{ getYestaryToday(item.time) }}</div>
                  <div class="msg" :class="toUserInfo.uId === item.uid ? '' : 'active'">
                    <img
                      :src="toUserInfo.cover"
                      alt=""
                      v-show="toUserInfo.uId == item.uid"
                    />
                    <div
                      class="text"
                    >
                      <div class="text-content">
                        {{ JSON.parse(item.msg).msg }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <el-input
              type="text"
              v-model="text"
              maxlength="200"
              show-word-limit
            >
            </el-input>
            <div class="send-button" @click="sendMsgs">发送</div>
          </div>
        </el-drawer>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import {
  getHotSearchDetail,
  getSearchSuggest,
  account,
  userDetail,
  getLogin,
  getMsgPrivate,
  getPrivateMsgHistory,
  SendText,
} from "../../../network/api";
import { getYMD, getYestaryToday } from "../../../utils/uctil";
import Search from "../search/search-component.vue";
export default {
  components: { Search },
  name: "TopTabBar",
  data() {
    return {
      //热搜榜的数据
      HotSearchDetail: [],
      //搜索建议结果的数据
      SearchDetail: {},
      currentUserInfo: null,
      drawer: false,
      innerDrawer: false,
      tabItem: ["私信", "评论", "@我", "通知"],
      privateInfo: {},
      currentNav: 0,

      beforMsgs: [],
      newMsgs: [],
      text: "",
      toUserInfo: {},
      //刷新消息的定时器
      msgInterval: null,
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    go() {
      this.$router.back(1);
    },
    handleOpen() {},
    handleClose() {},
    handleInputSearch() {},
    async handleChangeSearch(searchValues) {
      /* const CloudSearch_solo = await getCloudSearch(searchValues,1)
      const CloudSearch_album = await getCloudSearch(searchValues,10) */
      const SearchSuggest = await getSearchSuggest(searchValues);
      // console.log(CloudSearch_solo)
      // console.log(CloudSearch_album)
      this.SearchDetail = SearchSuggest.data.result;
      // console.log(SearchSuggest)
      // console.log(this.SearchDetailk)
    },
    loadAll() {
      for (let i = 0; i < this.HotSearchDetail.length; i++) {
        let hotSearchDetail = {};
        (hotSearchDetail.content = this.HotSearchDetail[i].content),
          (hotSearchDetail.score = this.HotSearchDetail[i].score),
          (hotSearchDetail.searchWord = this.HotSearchDetail[i].searchWord),
          this.restaurants.push(hotSearchDetail);
      }
    },
    handleSelect(item) {
      console.log(item);
    },
    handleIconClick(ev) {
      console.log(ev);
    },
    //处理点击登陆 没有写弹出框 输入账号密码 二维码 短信 之类的登陆方式窗口
    async handleLogin() {
      const { data } = await getLogin();
      console.log(data);
      this.currentUserInfo = data.profile;
      window.localStorage.setItem(
        "currentUserInfo",
        JSON.stringify(data.profile)
      );

      let data2 = await account();
      console.log(data2);
      let data1 = await userDetail(data.profile.userId);
      console.log(data1);
    },

    //获取通知消息
    async getNotices() {
      let { data } = await getMsgPrivate();
      this.privateInfo = data.msgs;
      this.drawer = !this.drawer;
      //可以做一个timeinterval刷新数据 有新数据就出现红点 并刷新最新一条数据信息 ⭐⭐⭐
    },
    parseLastNotice(msg) {
      let afterMsg = JSON.parse(msg);
      return afterMsg.msg;
    },
    getYMD(time) {
      return getYMD(time);
    },
    getYestaryToday(time) {
      return getYestaryToday(time);
    },

    handleToInnerDrawer(uId, name, cover) {
      this.toUserInfo = { name, cover, uId };
      this.innerDrawer = true;
      this.getPrivateMsg(uId);
      this.msgInterval = setInterval(() => {
        this.getPrivateMsg(uId);
      }, 5000);
      //推出的时候要关闭这个循环
    },

    //获取历史聊天记录
    async getPrivateMsg(uId) {
      //获取聊天历史数据
      let { data } = await getPrivateMsgHistory(uId);
      //清除聊天数据
      this.beforMsgs = [];
      this.newMsgs = [];
      console.log(data);
      //筛选出昨天的数据
      let nowTime = new Date().getTime();
      for (let i = 0; i < data.msgs.length; i++) {
        if (nowTime - data.msgs[i].time >= 86400000) {
          //前一天的消息
          this.beforMsgs.unshift({
            msg: data.msgs[i].msg,
            uid: data.msgs[i].fromUser.userId,
            time: data.msgs[i].time,
          });
        } else {
          this.newMsgs.unshift({
            msg: data.msgs[i].msg,
            uid: data.msgs[i].fromUser.userId,
            time: data.msgs[i].time,
          });
        }
      }
    },

    //退出innnerPopover
    handleOutInneerPopover() {
      this.innerDrawer = false;
      //清除聊天数据
      this.beforMsgs = [];
      this.newMsgs = [];
      this.toUserInfo = {};
      window.clearInterval(this.msgInterval);
    },

    //发送消息
    async sendMsgs() {
      //数据返回的是历史消息
      const { data } = await SendText(this.toUserInfo.uId, this.text);
      //清除聊天数据
      this.beforMsgs = [];
      this.newMsgs = [];
      let nowTime = new Date().getTime();
      for (let i = 0; i < data.newMsgs.length; i++) {
        if (nowTime - data.newMsgs[i].time >= 86400000) {
          //前一天的消息
          this.beforMsgs.unshift({
            msg: data.newMsgs[i].msg,
            uid: data.newMsgs[i].fromUser.userId,
            time: data.newMsgs[i].time,
          });
        } else {
          this.newMsgs.unshift({
            msg: data.newMsgs[i].msg,
            uid: data.newMsgs[i].fromUser.userId,
            time: data.newMsgs[i].time,
          });
        }
      }
      this.text = "";
    },
  },
  async created() {
    const { data } = await getHotSearchDetail();
    this.HotSearchDetail = data.data;
  },
};
</script>

<style scoped >
@import "./top-tabbar.css";
</style>
