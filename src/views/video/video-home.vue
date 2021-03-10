<template>
  <div class="mv-home">
    <div class="top-nav">
      <span class="video-item" :class="currentIndex === 0? 'active':''" @click="turnShow(0)">视频</span>
      <span class="mv-item" :class="currentIndex === 1? 'active':''" @click="turnShow(1)">MV</span>
    </div>
      <keep-alive>
        <router-view>
        </router-view>
      </keep-alive> 
  </div>
</template>

<script>
export default {
    name:'VideoHome',
    data() {
      return {
        currentIndex:0
      }
    },
    methods: {
      turnShow(index){
        switch (index){
                case 0:
                this.$router.push('/video');
                this.currentIndex=index
                break;
                case 1:
                this.$router.push('/mv');
                this.currentIndex=index
                break;
            }
      }
    },
    activated() {
      this.turnShow(this.currentIndex)
    },
}
</script>

<style scoped>
.mv-home{
  width: 100%;
}
.mv-home .top-nav{
    display: flex;
    width: 100%;
    text-align: center;
    color: black;;
    height: 60pxpx;
    line-height: 45px;
    font-size: 15px;
    margin: 8px 0px 10px 15px;
}
.mv-home .top-nav .video-item,.mv-home .top-nav .mv-item{
    width: 80px;
}
/* 易错点 */
.mv-home .top-nav > .active{
    color: red;
    border-bottom: 2px solid red;
    font-size: 17px;
    font-weight: 900;
}
</style>