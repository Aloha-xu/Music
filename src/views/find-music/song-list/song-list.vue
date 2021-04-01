<template>
  <div class="song-list" ref="song_list">
    <!--歌单页面下的顶部歌单种类大卡片显示处  -->
    <div class="content">

      <!-- 精品歌单 -->
      <div class="high-quality-playlist" @click="clickToHighQualityPlaylistPapg">
        <div class="backgroundimage">
          <img :src="TopSongListInfo[0].coverImgUrl" alt="" />
        </div>
        <div class="pic">
          <img :src="TopSongListInfo[0].coverImgUrl" alt="" />
        </div>
        <div class="text">
          <div class="logo">精品歌单</div>
          <div class="text-1">{{ TopSongListInfo[0].name }}</div>
          <div class="text-2">{{ TopSongListInfo[0].copywriter }}</div>
        </div>
      </div>

      <!-- 显示各种歌单种类的内容 -->
      <div class="center">
        <!-- 歌单种类选择栏 -->
        <div class="type">
          <!-- ⭐切换歌曲类型时候字体数量变化时右边的热门词语会往左边跑 -->
          <div class="alltype" @click="HandleShowPopover">
            <el-button>{{ CurrentPopoverType }}</el-button>
          </div>
          <div class="hottype">
            <span
              v-for="item in HotSongType"
              :key="item"
              @click="SongTypeClick(item)"
              class="item"
              :class="item === CurrentType ? 'active' : ''"
              >{{ item }}</span
            >
          </div>
        </div>
        <!-- 选择的歌单类型的详细歌单卡片 -->
        <div class="allcard">
          <play-card
            v-for="item in SongListInfo"
            :key="item.id"
            :id="item.id"
            :pic="item.coverImgUrl"
            :playcount="item.playCount"
            :text="item.name"
            class="item"
          >
            <div slot="creator">{{ item.creator.nickname }}</div>
          </play-card>
        </div>
      </div>

      <!-- 页码组件 -->
      <div class="pagination">
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="100"
            layout="total, prev, pager, next"
            :total="TotalSongs"
            :current-page.sync="CurrentPage"
          >
          </el-pagination>
        </div>
      </div>
    </div>

    <!-- popover弹出框组件 -->
    <all-type-popover
      :TypeLists="TypeLists"
      :HotSongType="HotSongType"
      class="alltypepopover"
      v-show="isShowPopover"
      @handleSongTypeClick="handleSongTypeClick"
    ></all-type-popover>
  </div>
</template>

<script>
import PlayCard from "../../../components/common/play-card.vue";
import AllTypePopover from "../../../components/common/popover/all-type-popover.vue";
import {
  getSongListType,
  getHotSongListType,
  getTopSonglistType,
  getTopSonglist,
  getSongList,
} from "../../../network/api";
export default {
  name: "SongList",
  components: {
    AllTypePopover,
    PlayCard,
  },
  data() {
    return {
      //网友歌单信息
      SongListInfo: [],
      //精品歌单第一条信息
      TopSongListInfo: [],
      //全部音乐类型词语
      AllSongType: [],
      //热门音乐类型词语
      HotSongType: [],
      //现在选择的歌单类型
      CurrentType: "全部",
      //现在选择的popover歌单类型
      CurrentPopoverType: "全部歌单",
      //总共数据条数
      TotalSongs: 0,
      //现在页数
      CurrentPage: 1,
      //歌单类型分类
      TypeLists: {
        0: { type: "", list: [] },
        1: { type: "", list: [] },
        2: { type: "", list: [] },
        3: { type: "", list: [] },
        4: { type: "", list: [] },
      },
      //是否显示全部歌单popover
      isShowPopover: false,
    };
  },
  methods: {
    /* 获取歌单分类 */
    async getSongListType() {
      const { data } = await getSongListType();
      console.log(data);
      //全部类别
      this.AllSongType = data.sub;
      let i = 0;
      let j = 0;
      for (i; i <= 4; i++) {
        this.TypeLists[i].type = data.categories[i];
        for (j; j <= 69; j++) {
          let a = data.sub[j].category;
          let b = data.sub[j].name;
          this.whatcategory(a, b);
        }
      }
      // console.log(this.TypeLists);
    },
    /* 获取歌单(网友的) */
    async getSongList(cat, limit, offset) {
      const { data } = await getSongList(cat, limit, offset);
      this.SongListInfo = data.playlists;
      this.TotalSongs = data.total;
      // console.log(data);
    },
    /* 获取热门歌单分类 */
    async getHotSongListType() {
      const { data } = await getHotSongListType();
      // console.log(data)
      this.HotSongType = data.tags.map(({ name }) => name);
      // console.log(this.HotSongType);
    },
    /* 获取精品歌单 */
    async getTopSonglist(cat, limit, before) {
      const { data } = await getTopSonglist(cat, limit, before);
      //拿到数据中第一条作为精品歌单页面进去的入口
      this.TopSongListInfo = data.playlists.slice(0, 1);
      console.log(data);
      // console.log(this.TopSongListInfo);
    },
    /* 获取精品歌单标签列表 */
    async getTopSonglistType() {
      const { data } = await getTopSonglistType();
      console.log(data);
    },

    /* 处理点击热门音乐种类的点击事件 */
    SongTypeClick(type) {
      //重置当前页面数
      this.CurrentPage = 1;
      //设置当前音乐类型
      this.CurrentType = type;
      //设置当前popover的音乐类型
      this.CurrentPopoverType = type;
      //根据选着的音乐类型更新数据
      this.getSongList(type, 100, 0);
      //更换精品页面的数据
      this.getTopSonglist(type, 100, 0);
    },

    handleSizeChange(e) {
      console.log(e);
      console.log("handleSizeChange");
    },

    //处理点击数字或者前进后退页码
    handleCurrentChange(e) {
      //e是返回当前页面值
      //设置当前页面数
      this.CurrentPage = e;
      //请求下x页的数据
      this.getSongList(this.CurrentType, 100, e * 100);
      //返回顶部  refs ref 处理dom节点
      this.$refs.song_list.scrollTo(0, 0, true);
    },

    //判断回来的数据是什么类别
    whatcategory(v, i) {
      switch (v) {
        case 0:
          this.TypeLists[0].list.push(i);
          break;
        case 1:
          this.TypeLists[1].list.push(i);
          break;
        case 2:
          this.TypeLists[2].list.push(i);
          break;
        case 3:
          this.TypeLists[3].list.push(i);
          break;
        case 4:
          this.TypeLists[4].list.push(i);
          break;
      }
    },

    //处理popover是否显示
    HandleShowPopover() {
      this.isShowPopover = !this.isShowPopover;
    },
    //处理popover发射出来的已选择歌曲类型
    handleSongTypeClick(value) {
      //设置当前popover的歌单类型
      this.CurrentPopoverType = value;
      //重置歌单数据
      this.getSongList(value, 100, 0);
      //关闭popover窗口
      this.isShowPopover = false;
      //判断发射出来的音乐类型是不是在热门类型里面
      let i = 0;
      let flag = false;
      for (i; i <= 9; i++) {
        if (value === this.HotSongType[i]) {
          flag = true;
          break;
        }
      }
      if (flag) {
        this.CurrentType = value;
      } else {
        this.CurrentType = "";
      }
    },
    clickToHighQualityPlaylistPapg(){
      this.$router.push('/highqualityplaylist')
    }
  },
  async created() {
    this.getSongListType();
    this.getHotSongListType();
    this.getTopSonglist();
    this.getTopSonglistType();
    this.getSongList();
  },
};
</script>

<style scoped>
@import "song-list.css";
</style>