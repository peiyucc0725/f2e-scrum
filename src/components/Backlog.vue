<script setup>
import { ref, watch, onMounted } from "vue";

let props = defineProps({
  type: {
    type: String,
    default: "product",
  },
  title: String,
  capation: String,
});
</script>

<template>
  <div class="backlog" :class="type">
    <div class="backlog-bg"></div>
    <div class="backlog-bg1"></div>
    <div class="backlog-bg2"></div>
    <div class="backlog-bg3"></div>
    <div class="title">
      <h2>產品待辦清單</h2>
      <div class="capation">Product Backlog</div>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.backlog {
  position: absolute;
  width: 524px;
  height: 620px;
  border-radius: 20px;
  backdrop-filter: blur(5px);
  animation: enter 0.8s 0.5s linear forwards;
  opacity: 0;
  @keyframes enter {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .title {
    position: absolute;
    width: 480px;
    height: 100px;
    border-radius: 20px 20px 0px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .capation {
      color: $PrimaryDark;
    }
  }
  .content {
    position: absolute;
    top: 100px;
    width: 480px;
    height: 496px;
    color: $TextDefault;
  }
  .backlog-bg,
  .backlog-bg1,
  .backlog-bg2,
  .backlog-bg3 {
    width: 480px;
    height: 596px;
    position: absolute;
    border-radius: 20px;
  }
  .backlog-bg {
    top: 0;
    left: 0;
    z-index: 0;
  }
  .backlog-bg1 {
    top: 12px;
    left: 12px;
    z-index: -1;
  }
  .backlog-bg2 {
    top: 24px;
    left: 24px;
    z-index: -2;
  }
  .backlog-bg3 {
    top: 24px;
    left: 24px;
    opacity: 0.9;
    z-index: -3;
  }
  &.product {
    .title {
      background-color: $PrimaryDefault;
    }
    .backlog-bg {
      background: rgba(0, 255, 224, 0.3);
    }
    .backlog-bg1 {
      background: rgba(0, 255, 224, 0.2);
    }
    .backlog-bg2 {
      background: rgba(0, 255, 224, 0.1);
    }
    .backlog-bg3 {
      background: radial-gradient(
        50% 50% at 50% 50%,
        #00ffe0 0%,
        rgba(0, 255, 224, 0) 100%
      );
    }
  }
  &.sprint {
    .title {
      background-color: $RoleTeam1;
    }
    .backlog-bg {
      background: rgba(255, 122, 0, 0.4);
    }
    .backlog-bg1 {
      background: rgba(255, 122, 0, 0.3);
    }
    .backlog-bg2 {
      background: rgba(255, 122, 0, 0.2);
    }
    .backlog-bg3 {
      background: radial-gradient(
        50% 50% at 50% 50%,
        #ffc700 0%,
        rgba(255, 199, 0, 0) 100%
      );
    }
  }
}
</style>