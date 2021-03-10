<template>
  <div class="collecter">
    <div class="item" v-for="(item,index) in collecter" :key="index">
      <img :src="item.avatarUrl" alt="">
      <div class="nikcname">{{item.nickname}}</div>
    </div>
  </div>
</template>

<script>
export default {
    name:'Collecter',
    props:{
      collecter:[]
    }
}
</script>

<style scoped>
.collecter{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 2.5%;
}
.collecter .item{
  margin-left: 5%;
  margin-right: 5%;
  width: 10%;
  margin-top: 20px;
}
.collecter .item img{
  border-radius: 50%;
  width: 100%;
}
.collecter .item .nikcname{
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
  text-overflow: ellipsis;
}
</style>