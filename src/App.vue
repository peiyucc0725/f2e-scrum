<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import Start from './views/Start.vue'
import ProductBacklog from './views/ProductBacklog.vue'
import Planning from './views/Planning.vue'
import SprintBacklog from './views/SprintBacklog.vue'
import Process from './views/Process.vue'
import Retro from './views/Retro.vue'
import Finish from './views/Finish.vue'

const store = useStore();
const systemSetp = computed(() => {
  return store.state.step;
});
</script>

<template>
  <div class="container">
    <div class="background-blur"></div>
    <div class="step-line" v-if="systemSetp !== 0">
      <div class="progress" :style="`width: ${systemSetp}%`"></div>
    </div>
    <!-- start: 10%, ProductBacklog: 20%, Planning: 35%, SprintBacklog: 55%, Process: 70%, Retro: 85%, Finish: 100% -->
    <div class="step-container">
      <Start v-if="systemSetp < 20" />
      <ProductBacklog v-else-if="systemSetp < 35" />
      <Planning v-else-if="systemSetp < 55"/>
      <SprintBacklog v-else-if="systemSetp < 70"/>
      <Process v-else-if="systemSetp < 85"/>
      <Retro v-else-if="systemSetp < 100" />
      <Finish v-else-if="systemSetp === 100" />
    </div>
    <div class="footer">
      <div class="inner">© 2022 The F2E | UI Design - EG | F2E - PeiYu</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  min-width: 1440px;
  height: 100%;
  overflow: hidden;
  position: relative;
}
.background-blur {
  position: absolute;
  top: -30px;
  bottom: -30px;
  left: -30px;
  right: -30px;
  width: calc(100% + 60px);
  height: calc(100% + 60px);
  background-size: contain;
  background-image: url("./assets/images/bg/bg_village.png");
  filter: blur(5px) brightness(0.6);
  z-index: 0;
}
.step-line {
  position: absolute;
  top: 0;
  min-width: 1440px;
  width: 100%;
  height: 12px;
  background-color: $PrimaryDark;
  z-index: 2;
  .progress {
    position: relative;
    width: 0;
    height: 12px;
    background: linear-gradient(270deg, #00ffe0 0%, rgba(0, 255, 224, 0) 100%);
    transition: 0.5s;
  }
}
.footer {
  min-width: 1440px;
  width: 100%;
  height: 44px;
  position: absolute;
  bottom: 0;
  font-weight: 700;
  font-size: 14px;
  line-height: 140%;
  color: $PrimaryDark;
  background: $BgDark60;
  backdrop-filter: blur(5px);
  z-index: 1;

  .inner {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>