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
      }, 200);
    },

    handleShowCloudSearch() {
      if (this.isShowHotSearch) {
        this.isShowHotSearch = false;
        this.isShowStringSearch = true;
      }
    },

    handleToSearchDetailPapg() {
      console.log("1111")
      this.$router.push({path:"/cloudsearch",query:{keywords:this.searchValues}});
    },

    handleToSingerDetailPapg(id) {
      console.log("22222")
      
      this.$router.push("/singerlistdetail/" + id);
    },

    handleToAlbumDetailPapg(id) {
      console.log("3333")

      this.$router.push("/albumlistdetail/" + id);
    },

    handleClickHotSong(searchValues) {
      console.log("4444")

      if (this.isShowHotSearch) {
        this.isShowHotSearch = false;
      }
      this.searchValues = searchValues
        this.$router.push({path:"/cloudsearch",query:{keywords:this.searchValues}});
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

<style scoped lang='scss'>
.search{
    position: relative;
    .input-text{
        input{
            width: 180px;
            height: 30px;
            border-radius: 10px;
            border: none;
            background-image: url("../../../assets/icon/search-active.svg");
            background-repeat: no-repeat;
            background-position: 145px;
            //去掉input获取焦点时候的边框
            outline: none;
        }
    }
    .hot-search{
        position: absolute;
        left: -50px;
        top: 48.5px;
        width: 360px;
        height: 460px;
        background-color: rgb(247, 246, 246);
        border-radius: 10px;
        z-index: 999;
        overflow: scroll;
        overflow-x: hidden;
        .title{
            padding-left: 25px;
            font-size: 15px;
            font-weight: 700;
        }
        .item{
            height: 50px;
            width: 360px;
            display: flex;
            margin-bottom: 5px;
            cursor: pointer;
            .left{
                width: 50px;
                height: 50px;
                line-height: 50px;
                text-align: center;
                display: inline-block;
                padding-left: 6px;
                font-size: larger;
            }
            .active{
                color: red;
            }
            .right{
                width: 310px;
                height: 50px;
                line-height: 30px;
                font-size: 13px;
                display: flex;
                flex-direction: column;
                .top{
                    height: 20px;
                    .search-word{
                        font-weight: 900;
                    }
                    .score{
                        font-weight: 100;
                        font-size: xx-small;
                        color: gray;
                        padding-left: 10px;
                    }
                }
                .content{
                    color: rgb(80, 80, 80);
                    white-space:nowrap;
                    overflow:hidden;
                    text-overflow:ellipsis;
                }
            }
        }
        .item:hover{
            background-color: rgb(216, 213, 213);
        }
    }
    .cloud-search{
        position: absolute;
        left: -50px;
        top: 48.5px;
        width: 360px;
        height: 460px;
        background-color: rgb(247, 246, 246);
        border-radius: 10px;
        z-index: 999;
        font-size: 13px;
        color: rgb(53, 53, 53);
        font-weight: 500;
        .search-all{
            height: 40px;
            line-height: 40px;
            margin-left: 10px;
            cursor: pointer;
        }
        .songs,.albums,.artists{
            cursor: pointer;
            .search-title{
                height: 28px;
                line-height: 28px;
                vertical-align: middle;
                padding-left: 15px;
                background-color: rgb(226, 226, 226);
                img{
                vertical-align: middle;
                padding-right: 4px;
                }
            }
            .item{
                height: 28px;
                line-height: 28px;
                padding-left: 40px;
                font-size: 12px;
                white-space:nowrap;
                overflow:hidden;
                text-overflow:ellipsis;
            }
            .item:hover{
                background-color: rgb(226, 226, 226);
            }
        }
    }
}
</style>