<template>
  <div class="search">
    <div class="input-text">
      <form action="">
        <input
          type="text"
          v-model="searchValues"
          @focus="handleShowHotSearch"
          @input="handleShowCloudSearch"
          @blur="handleLostFocus"
          @keyup.delete="handleShowHotSearch"
          @keydown="handleShowHotSearch"
        />
        <input type="text" style="display:none">
      </form>
    </div>
    <div class="hot-search" v-show="isShowHotSearch">
      <div class="title">热门榜</div>
      <div
        class="item"
        v-for="(item, index) in HotSearchDetail"
        :key="index"
        @click="handleClickHotSong(item.searchWord)"
      >
        <div class="left" :class="index < 4 ? 'active' : ''">
          {{ index + 1 }}
        </div>
        <div class="right">
          <div class="top">
            <span class="search-word">{{ item.searchWord }}</span>
            <span class="score">{{ item.score }}</span>
          </div>
          <div class="content">{{ item.content }}</div>
        </div>
      </div>
    </div>
    <div class="cloud-search" v-show="isShowStringSearch">
      <div class="search-all" @click="handleToSearchDetailPapg">
        搜"{{ this.searchValues }}"相关的结果>
      </div>
      <div class="songs" v-show="SearchDetail.songs">
        <div class="search-title" @click="handleToSearchDetailPapg">
          <img src="../../../assets/icon/heart.svg" alt="" /> 单曲
        </div>
        <div
          class="item"
          v-for="(item, index) in SearchDetail.songs"
          :key="index"
          @click="handlePlaySong"
        >
          {{ item.name }}-<span
            v-for="(item1, index1) in item.artists"
            :key="index1"
            >{{ item1.name }}</span
          >
        </div>
      </div>
      <div class="artists" v-show="SearchDetail.artists">
        <div class="search-title" @click="handleToSearchDetailPapg">
          <img src="../../../assets/icon/heart.svg" alt="" /> 歌手
        </div>
        <div
          class="item"
          v-for="(item, index) in SearchDetail.artists"
          :key="index"
          @click="handleToSingerDetailPapg(item.id)"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="albums" v-show="SearchDetail.albums">
        <div class="search-title" @click="handleToSearchDetailPapg">
          <img src="../../../assets/icon/heart.svg" alt="" /> 专辑
        </div>
        <div
          class="item"
          v-for="(item, index) in SearchDetail.albums"
          :key="index"
          @click="handleToAlbumDetailPapg(item.id)"
        >
          {{ item.name }}-{{ item.artist.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { _debounce } from "../../../utils/uctil";
export default {
  name: "Search",
  props: {
    HotSearchDetail: Array,
    SearchDetail: Object,
  },
  data() {
    return {
      isShowHotSearch: false,
      isShowStringSearch: false,
      searchValues: "",
    };
  },
  methods: {
    //展示热搜榜
    handleShowHotSearch() {
      if (!this.isShowHotSearch && this.searchValues == "") {
        this.isShowHotSearch = true;
        this.isShowStringSearch = false;
      }
      if (!this.isShowStringSearch && !this.searchValues == "") {
        this.isShowStringSearch = true;
        this.isShowHotSearch = false;
      }
    },

    //失去焦点隐藏建议
    handleLostFocus() {
      //settimeout手动延迟100ms判断失去焦点后的函数运行
      setTimeout(() => {
        if (this.isShowHotSearch || this.isShowStringSearch) {
          this.isShowHotSearch = false;
          this.isShowStringSearch = false;
        }
      }, 100);
    },

    handleShowCloudSearch() {
      if (this.isShowHotSearch) {
        this.isShowHotSearch = false;
        this.isShowStringSearch = true;
      }
    },

    handleToSearchDetailPapg() {
      this.$router.push({path:"/cloudsearch",query:{keywords:this.searchValues}});
    },

    handleToSingerDetailPapg(id) {
      this.$router.push("/singerlistdetail/" + id);
    },

    handleToAlbumDetailPapg(id) {
      this.$router.push("/albumlistdetail/" + id);
    },

    handleClickHotSong(searchValues) {
      if (this.isShowHotSearch) {
        this.isShowHotSearch = false;
      }
      this.searchValues = searchValues
      //直接跳到detail界面
      this.$router.push({path:"/cloudsearch",query:{keywords:searchValues}});
    },

    handlePlaySong() {},
    aaa() {
      let that = this;
      that.$emit("handleSearchValues", that.searchValues);
    },
  },

  created() {
    //防抖
    this.$watch(
      "searchValues",
      _debounce((searchValues) => {
        this.$emit("handleSearchValues", searchValues);
      }, 200)
    );
  },
};
</script>

<style scoped>
@import "./search-component.css";
</style>