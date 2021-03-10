<template>
  <div class="card">
    <div class="pic" @click="cardClick" >
      <img :src="pic" alt=""  />
      <span class="name">{{ radioname }}</span>
    </div>
    <div class="text">
      {{ text }}
    </div>
    <div class="singer">
        {{singer}}
    </div>
  </div>
</template>
<script>
export default {
  name: "RecommendMvCard",
  props: {
    pic: String,
    playcount: Number,
    text: String,
    id: Number,
    singer:String,
    radioname:String,
  },
  methods: {
    cardClick() {
      // this.$router.push("/playlistdetail/" + this.id);
    },
  },
};
</script>

<style scoped>
.card {
  position: relative;
  padding-bottom: 10px;
  margin-top: 10px;
  border-radius: 5px;
  width: 15%;
}
img {
  width: 100%;
  border-radius: 5px;
}
.name {
  position: absolute;
  left: 0;
  bottom: 0;
  font-size: 12px;
  color: white;
}
.text {
    color:rgb(90, 90, 90);
  font-size: 14px;
  letter-spacing: 0.7px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;/* 不允许换行 */
  margin-top: 5px;
}
.text:hover{
    color:rgb(0, 0, 0);
}
.singer{
  font-size: 13px;
           color:rgb(146, 146, 146);
  letter-spacing: 0.7px;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 5px;  
}
.singer:hover{
    color: rgb(110, 110, 110);
}
</style>