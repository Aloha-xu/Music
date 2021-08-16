<template>
  <div class="btn-nav-bar">
      <div v-for="(item,index) in findMusictype" :key="index" @click="itemClick(index)" class="nav-bar" :class="currentIndex === index? 'active':''">
          {{item}}
      </div>
  </div>
</template>

<script>
export default {
    name:"NavBar",
    data() {
        return {
            findMusictype:['推荐','歌单','主播电台','排行榜','歌手','最新音乐']
        }
    },
    methods: {
        itemClick(index){
            switch (index){
                case 0:
                this.$router.push('/recommend');
                this.$store.commit('refeshCurrentNavIndex',index)
                break;
                case 1:
                this.$router.push('/songlist');
                this.$store.commit('refeshCurrentNavIndex',index)
                break;
                case 2:
                this.$router.push('/anchorradio');
                this.$store.commit('refeshCurrentNavIndex',index)
                break;
                case 3:
                this.$router.push('/rank');
                this.$store.commit('refeshCurrentNavIndex',index)
                break;
                case 4:
                this.$router.push('/singer');
                this.$store.commit('refeshCurrentNavIndex',index)
                break;
                case 5:
                this.$router.push('/newmusic');
                this.$store.commit('refeshCurrentNavIndex',index)
                break;
            }

        },
    },
    created() {
        this.itemClick(this.currentIndex)
    },
    computed:{
        currentIndex(){
            return this.$store.state.navCurrentIndex
        }
    }
}
</script>

<style scoped lang="scss">
.btn-nav-bar{
    display: flex;
    width: 100%;
    text-align: center;
    color: black;;
    height: 60pxpx;
    line-height: 45px;
    font-size: 15px;
    margin: 8px 0px 10px 15px;
}
.btn-nav-bar .nav-bar{
    width: 80px;
}
/* 易错点 */
.btn-nav-bar > .active{
    color: red;
    border-bottom: 2px solid red;
    font-size: 17px;
    font-weight: 900;
}
</style>