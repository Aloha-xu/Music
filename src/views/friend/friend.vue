<template>
  <div class="friend">
    <div class="rose" v-for="(item, index) in picinfo" :key="index">
      <img :src="item" alt=""  />
    </div>
  </div>
</template>

<script>
export default {
  name: "Friend",
  data() {
    return {
      picinfo: [
        require("../../assets/blackpink/1.jpg"),
        require("../../assets/blackpink/2.jpg"),
        require("../../assets/blackpink/3.jpg"),
        require("../../assets/blackpink/4.jpg"),
        require("../../assets/blackpink/5.jpg"),
        require("../../assets/blackpink/6.jpg"),
        require("../../assets/blackpink/7.jpg"),
        require("../../assets/blackpink/8.jpg"),
        require("../../assets/blackpink/9.jpg"),
        require("../../assets/blackpink/10.jpg"),

        require("../../assets/blackpink/11.jpg"),
        require("../../assets/blackpink/12.jpg"),
        require("../../assets/blackpink/13.jpg"),
        require("../../assets/blackpink/14.jpg"),
        require("../../assets/blackpink/15.jpg"),
        require("../../assets/blackpink/16.jpg"),
        require("../../assets/blackpink/17.jpg"),
        require("../../assets/blackpink/18.jpg"),
        require("../../assets/blackpink/19.jpg"),
        require("../../assets/blackpink/20.jpg"),

        require("../../assets/blackpink/30.jpg"),
        require("../../assets/blackpink/40.jpg"),
        require("../../assets/blackpink/50.jpg"),
        require("../../assets/blackpink/60.jpg"),
        require("../../assets/blackpink/70.jpg"),
        require("../../assets/blackpink/80.jpg"),
        require("../../assets/blackpink/90.jpg"),

        require("../../assets/blackpink/21.jpg"),
        require("../../assets/blackpink/31.jpg"),
        require("../../assets/blackpink/41.jpg"),
        require("../../assets/blackpink/51.jpg"),
        require("../../assets/blackpink/61.jpg"),
        require("../../assets/blackpink/71.jpg"),
        require("../../assets/blackpink/81.jpg"),

        require("../../assets/blackpink/22.jpg"),
        require("../../assets/blackpink/32.jpg"),
        require("../../assets/blackpink/42.jpg"),
        require("../../assets/blackpink/52.jpg"),
        require("../../assets/blackpink/62.jpg"),
        require("../../assets/blackpink/72.jpg"),
        require("../../assets/blackpink/82.jpg"),

        require("../../assets/blackpink/23.jpg"),
        require("../../assets/blackpink/33.jpg"),
        require("../../assets/blackpink/43.jpg"),
        require("../../assets/blackpink/63.jpg"),
        require("../../assets/blackpink/73.jpg"),
        require("../../assets/blackpink/83.jpg"),

        require("../../assets/blackpink/24.jpg"),
        require("../../assets/blackpink/34.jpg"),
        require("../../assets/blackpink/44.jpg"),
        require("../../assets/blackpink/54.jpg"),
        require("../../assets/blackpink/64.jpg"),
        require("../../assets/blackpink/74.jpg"),
        require("../../assets/blackpink/84.jpg"),

        require("../../assets/blackpink/25.jpg"),
        require("../../assets/blackpink/35.jpg"),
        require("../../assets/blackpink/45.jpg"),
        require("../../assets/blackpink/55.jpg"),
        require("../../assets/blackpink/65.jpg"),
        require("../../assets/blackpink/75.jpg"),
        require("../../assets/blackpink/85.jpg"),

        require("../../assets/blackpink/26.jpg"),
        require("../../assets/blackpink/36.jpg"),
        require("../../assets/blackpink/46.jpg"),
        require("../../assets/blackpink/56.jpg"),
        require("../../assets/blackpink/66.jpg"),
        require("../../assets/blackpink/76.jpg"),
        require("../../assets/blackpink/86.jpg"),

        require("../../assets/blackpink/27.jpg"),
        // require("../../assets/blackpink/37.jpg"),
        require("../../assets/blackpink/47.jpg"),
        require("../../assets/blackpink/57.jpg"),
        require("../../assets/blackpink/67.jpg"),
        require("../../assets/blackpink/77.jpg"),
        require("../../assets/blackpink/87.jpg"),

        require("../../assets/blackpink/28.jpg"),
        require("../../assets/blackpink/38.jpg"),
        require("../../assets/blackpink/48.jpg"),
        require("../../assets/blackpink/58.jpg"),
        require("../../assets/blackpink/68.jpg"),
        require("../../assets/blackpink/78.jpg"),
        require("../../assets/blackpink/88.jpg"),

        require("../../assets/blackpink/29.jpg"),
        require("../../assets/blackpink/39.jpg"),
        require("../../assets/blackpink/49.jpg"),
        require("../../assets/blackpink/59.jpg"),
        require("../../assets/blackpink/69.jpg"),
        require("../../assets/blackpink/79.jpg"),
        require("../../assets/blackpink/89.jpg"),
      ],
    };
  },
};
</script>

<style scoped>
.friend{
   overflow: scroll;
   height: 90vh;
   display: flex;
   flex-wrap: wrap;
}
.rose{
    width: calc(100%/2);
}
img{
    width: 100%;
}
</style>