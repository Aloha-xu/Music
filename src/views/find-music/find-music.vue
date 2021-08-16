<template>
  <div class="find-music">
    <!-- 选项导航栏 -->
    <nav-bar></nav-bar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import NavBar from "../../components/common/findmusic/navbar/NavBar.vue";
export default {
  name: "FindMusic",
  components: {
    NavBar,
  },
  methods: {
  
  },
};
</script>

<style scoped lang='scss'>
.find-music{
  /* 把findmusic这个组件的宽度设置铺满横屏 不设置的话就只有该组件下navbar组件的长度大小 */
  width: 100%;
}
</style>