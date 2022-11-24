<script setup>
import { ref, watch, onMounted } from "vue";
import PoGif from "../assets/images/gif/ic_continue_po.gif";
import SmGif from "../assets/images/gif/ic_continue_sm.gif";
import Team1Gif from "../assets/images/gif/ic_continue_team1.gif";
import Team2Gif from "../assets/images/gif/ic_continue_team2.gif";

let props = defineProps({
  showNext: Boolean,
  width: Number,
  height: Number,
  role: String,
  content: String,
});
const contentVisible = ref(true);
const roleMapping = ref({
  po: {
    name: "PO",
    pathColor: "#005656",
    rectColor: "#00FFE0",
    next: PoGif,
  },
  sm: {
    name: "MM",
    pathColor: "#4C0071",
    rectColor: "#D355FF",
    next: SmGif,
  },
  team1: {
    name: "EE",
    pathColor: "#933500",
    rectColor: "#FFC700",
    next: Team1Gif,
  },
  team2: {
    name: "GG",
    pathColor: "#933500",
    rectColor: "#FF5C00",
    next: Team2Gif,
  },
});
watch(
  () => props.content,
  () => {
    const el = document.getElementsByClassName("message")[0];
    el.style.animation = "enter 0.8s linear forwards";
    contentVisible.value = false;
    setTimeout(() => {
      contentVisible.value = true;
    }, 10);
  }
);
</script>

<template>
  <div
    v-if="contentVisible"
    class="message"
    :class="role"
    :style="{ width: `${width}px`, height: `${height}px` }"
  >
    <svg
      width="78"
      height="52"
      viewBox="0 0 78 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 8L0 0V44L10 52V8Z" :fill="roleMapping[role].pathColor" />
      <rect width="78" height="44" :fill="roleMapping[role].rectColor" />
    </svg>
    <div class="message-role">{{ roleMapping[role].name }}</div>
    <div class="message-content" v-html="content"></div>
    <img
      v-if="showNext"
      class="message-next"
      :src="roleMapping[role].next"
      width="32"
      height="28"
    />
  </div>
</template>

<style lang="scss" scoped>
.message {
  position: absolute;
  backdrop-filter: blur(5px);
  padding: 40px 84px 40px 100px;
  border-radius: 40px;
  height: fit-content;
  animation: enter 0.8s .5s linear forwards;
  opacity: 0;
  @keyframes enter {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  svg,
  .message-role {
    position: absolute;
    top: 40px;
    left: -10px;
  }
  .message-role {
    width: 78px;
    height: 43px;
    font-size: 24px;
    line-height: 43px;
    letter-spacing: 0.05em;
    text-align: center;
    color: $BgDark;
  }

  &.po {
    box-shadow: 0px 0px 24px 0 rgba(0, 255, 224, 0.8),
      0px 0px 8px 0 rgba(0, 255, 224, 0.95);
    background: linear-gradient(
        180deg,
        rgba(0, 255, 224, 0) 0%,
        rgba(0, 255, 224, 0.03) 59.9%,
        rgba(0, 255, 224, 0.12) 78.12%,
        rgba(0, 255, 224, 0.36) 100%
      ),
      rgba(10, 13, 20, 0.6);
    border: 2px solid $PrimaryDefault;
  }
  &.sm {
    box-shadow: 0px 0px 24px 0 rgba(211, 85, 255, 0.8),
      0px 0px 8px 0 rgba(211, 85, 255, 0.95);
    background: linear-gradient(
        180deg,
        rgba(211, 85, 255, 0) 0%,
        rgba(211, 85, 255, 0.03) 59.9%,
        rgba(211, 85, 255, 0.12) 78.12%,
        rgba(211, 85, 255, 0.36) 100%
      ),
      rgba(10, 13, 20, 0.6);
    border: 2px solid $RoleSm;
  }
  &.team1 {
    box-shadow: 0px 0px 24px 0 $RoleTeam1, 0px 0px 8px 0 $RoleTeam1;
    background: linear-gradient(
        180deg,
        rgba(255, 199, 0, 0) 0%,
        rgba(255, 199, 0, 0.03) 59.9%,
        rgba(255, 199, 0, 0.12) 78.12%,
        rgba(255, 199, 0, 0.36) 100%
      ),
      rgba(10, 13, 20, 0.6);
    border: 2px solid $RoleTeam1;
  }
  &.team2 {
    box-shadow: 0px 0px 24px 0 $RoleTeam2, 0px 0px 8px 0 $RoleTeam2;
    background: linear-gradient(
        180deg,
        rgba(255, 122, 0, 0) 0%,
        rgba(255, 122, 0, 0.03) 59.9%,
        rgba(255, 122, 0, 0.12) 78.12%,
        rgba(255, 122, 0, 0.36) 100%
      ),
      rgba(10, 13, 20, 0.6);
    border: 2px solid $RoleTeam2;
  }
  .message-content {
    overflow: hidden;
    width: 100%;
    height: 0;
    font-size: 20px;
    line-height: 36px;
    color: $TextDefault;
    animation: content-enter 0.8s 1s linear forwards;
  }
  .message-next {
    opacity: 0;
    position: absolute;
    bottom: 40px;
    right: 32px;
    animation: next-enter 0.8s .5s linear forwards;
    @keyframes next-enter {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }
  @keyframes content-enter {
    0% {
      height: 0;
    }
    100% {
      height: 100%;
    }
  }
}
</style>

<style lang="scss">
.message {
  .message-content {
    span {
      color: $TextTint;
    }
  }
}
</style>