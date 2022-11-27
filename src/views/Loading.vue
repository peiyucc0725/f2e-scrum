<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";
const store = useStore();
const progress = ref(0);
const timer = ref(null);
const setTimer = () => {
  window.clearTimeout(timer.value);
  const runTimer = () => {
    timer.value = setTimeout(() => {
      progress.value++;
      if (progress.value < 100) {
        runTimer();
      } else {
          store.dispatch("setStep", 1);
        return;
      }
    }, 20);
  };
  runTimer()
};

onMounted(() => {
  setTimer();
});
onUnmounted(() => {
  window.clearTimeout(timer.value);
});
</script>

<template>
  <div class="loading-page">
    <div class="linear"></div>
    <div class="gif-ani"></div>
    <div class="progress-bar">
      <div class="progress" :style="`width: ${progress}%`"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loading-page {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: $BgDark;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .gif-ani {
    width: 255px;
    height: 120px;
    background-image: url("../assets/images/loading.gif");
  }
  .progress-bar {
    width: 500px;
    height: 8px;
    background-color: $PrimaryDark;
    position: relative;
    margin-top: 24px;
    .progress {
      position: absolute;
      top: 0;
      left: 0;
      height: 8px;
      background: linear-gradient(
        270deg,
        #00ffe0 0%,
        rgba(0, 255, 224, 0) 100%
      );
    }
  }
}
</style>