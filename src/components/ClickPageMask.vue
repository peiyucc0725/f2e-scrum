<script setup>
import { ref } from "vue";

defineProps({
  show: Boolean,
  hasMask: Boolean,
});
</script>

<template>
  <div class="click-page-mask" :class="{ hasMask: hasMask }">
    <div class="text">點擊畫面任意處繼續</div>
  </div>
</template>

<style lang="scss" scoped>
.click-page-mask {
  position: absolute;
  top: 0;
  max-width: 1440px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  &.hasMask {
    background: $PrimaryLinear;
  }
  .text {
    width: 268px;
    height: 52px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    border: 2px solid $PrimaryDefault;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 40px;
    color: $PrimaryDefault;
    font-size: 20px;
    line-height: 36px;
    word-break: keep-all;
  }
}
</style>