<template>
  <div class="user-updata-type-popover">
    <div>选择合适的标签，最多选择3个</div>
    <div class="center" v-for="(item1, index1) in typeLists" :key="index1">
      <div class="left">
        <div class="text">{{ item1.type }}</div>
      </div>
      <div class="right">
        <div
          class="item"
          v-for="(item2, index2) in item1.list"
          :key="index2"
          @click="handleSongTypeClick(item2)"
        >
          <div class="text">
            {{ item2 }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserUpdataTypePopover",
  data() {
    return {
      typeLists: this.$store.state.allTypeInfo,
    };
  },
  methods: {
    handleSongTypeClick(type) {
      let currentindex = this.currentSongType.findIndex((item) => item == type);
      if (currentindex == -1) {
        this.currentSongType.push(type);
      } else {
        this.currentSongType.splice(currentindex, 1);
      }
    },
  },
  props: {
    currentSongType: Array,
  },
};
</script>

<style scoped>
@import "./user-updata-type-popover.css";
</style>