<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import Loading from "./Loading.vue";
const store = useStore();
const systemSetp = computed(() => {
  return store.state.step;
});

const handleReset = () => {
  setTimeout(() => {
    store.dispatch("setStep", 0);
  }, 1000);
};
</script>

<template>
  <div class="finish-page">
    <transition name="fade">
      <div v-show="systemSetp === 100" class="inner">
        <div class="linear"></div>
        <div class="background"></div>
        <img class="logo" src="../assets/images/logo/logo_txt.png" />
        <div class="finish-text">恭喜你通過</div>
        <div class="title">
          <div class="title-text">《 敏捷任務 - 最初の試煉 》</div>
        </div>
        <div class="reset-btn" @click="handleReset">再玩一次</div>
        <div class="role-wrap role-team2">
          <div class="role-text">窩的冰淇淋ㄋ？</div>
          <img class="hole-img" src="../assets/images/role/hole.png" />
          <img
            class="light-img"
            src="../assets/images/role/role_team2_light_180.png"
          />
          <img
            class="role-img"
            src="../assets/images/role/role_team2_180.png"
          />
        </div>
        <div class="role-wrap role-team1">
          <div class="role-text">嗚嗚我會想尼QQ</div>
          <img class="hole-img" src="../assets/images/role/hole.png" />
          <img
            class="light-img"
            src="../assets/images/role/role_team1_light_180.png"
          />
          <img
            class="role-img"
            src="../assets/images/role/role_team1_180.png"
          />
        </div>
        <div class="role-wrap role-sm">
          <div class="role-text">不愧似窩ㄉ學生</div>
          <img class="hole-img" src="../assets/images/role/hole.png" />
          <img
            class="light-img"
            src="../assets/images/role/role_sm_light.png"
          />
          <img class="role-img" src="../assets/images/role/role_sm.png" />
        </div>
        <div class="role-wrap role-po">
          <div class="role-text">哇喔太厲害ㄌㄅ</div>
          <img class="hole-img" src="../assets/images/role/hole.png" />
          <img
            class="light-img"
            src="../assets/images/role/role_po_light_180.png"
          />
          <img class="role-img" src="../assets/images/role/role_po_180.png" />
        </div>
        <img
          class="logo-dot left-blue"
          src="../assets/images/logo/logo_dot_blue.png"
        />
        <img
          class="logo-dot right-blue"
          src="../assets/images/logo/logo_dot_blue.png"
        />
        <img
          class="logo-dot left-purple"
          src="../assets/images/logo/logo_dot_purple.png"
        />
        <img
          class="logo-dot right-purple"
          src="../assets/images/logo/logo_dot_purple.png"
        />
        <img
          class="logo-dot left-red"
          src="../assets/images/logo/logo_dot_red.png"
        />
        <img
          class="logo-dot right-red"
          src="../assets/images/logo/logo_dot_red.png"
        />
        <img
          class="logo-dot left-yellow"
          src="../assets/images/logo/logo_dot_yellow.png"
        />
        <img
          class="logo-dot right-yellow"
          src="../assets/images/logo/logo_dot_yellow.png"
        />
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.finish-page {
  width: 100%;
  height: 100vh;
  min-height: 944px;
  position: relative;
  .inner {
    & > * {
      position: absolute;
      margin: auto;
    }
  }
  .linear {
    opacity: 0;
    animation: enter 0.5s 0.3s linear forwards;
  }

  .logo {
    width: 600px;
    height: 365.29px;
    top: 8px;
    left: 0;
    right: 0;
    animation: logo-enter 0.5s linear forwards;
    @keyframes logo-enter {
      0% {
        transform: scale(0.1);
      }
      80% {
        transform: scale(1.2);
      }
      100% {
        transform: scale(1);
      }
    }
  }
  .finish-text {
    width: fit-content;
    font-weight: 700;
    font-size: 32px;
    line-height: 150%;
    color: $TextDefault;
    top: 367px;
    left: 0;
    right: 0;
    opacity: 0;
    animation: enter 0.5s 0.8s linear forwards;
  }
  .title {
    top: 435px;
    left: 0;
    right: 0;
    width: 0;
    height: 112px;
    text-align: center;
    background: linear-gradient(
        180deg,
        rgba(0, 255, 224, 0) 0%,
        rgba(0, 255, 224, 0.03) 59.9%,
        rgba(0, 255, 224, 0.12) 78.12%,
        rgba(0, 255, 224, 0.36) 100%
      ),
      rgba(10, 13, 20, 0.6);
    // border: 2px solid $PrimaryDefault;
    border-radius: 40px;
    box-shadow: 0px 0px 8px 0 rgba(0, 255, 224, 0.8),
      0px 0px 8px 0 rgba(0, 255, 224, 0.95);
    backdrop-filter: blur(5px);
    font-weight: 700;
    font-size: 32px;
    color: $PrimaryDefault;
    padding: 31px 0;
    overflow: hidden;
    transform: scaleY(0);
    transform-origin: center center;
    animation: title-enter 0.5s 1s linear forwards;
    @keyframes title-enter {
      0% {
        width: 5px;
        transform: scaleY(0.01);
      }
      10% {
        width: 5px;
        transform: scaleY(0.01);
      }
      40% {
        width: 5px;
        transform: scaleY(1);
        border: 2px solid $PrimaryDefault;
      }
      80% {
        width: 5px;
        transform: scaleY(1);
        border: 2px solid $PrimaryDefault;
      }
      100% {
        width: 601px;
        transform: scaleY(1);
        border: 2px solid $PrimaryDefault;
      }
    }
    .title-text {
      opacity: 0;
      animation: enter 0.5s 1.8s linear forwards;
    }
  }
  .reset-btn {
    width: fit-content;
    top: 574px;
    left: 0;
    right: 0;
    font-weight: 700;
    font-size: 16px;
    color: $PrimaryDefault;
    cursor: pointer;
    transition: 0.3s;
    opacity: 0;
    animation: enter 0.5s 6.5s linear forwards;
    &:hover {
      color: $PrimaryDark;
    }
  }
  .role-wrap {
    width: 300px;
    height: 298px;
    bottom: 44px;
    &.role-team2 {
      left: 144px;
      .role-img {
        animation: role-bottom-enter 0.5s 2.5s linear forwards;
      }
      .light-img {
        animation: light-bottom-enter 0.5s 2.5s linear forwards;
      }
      .role-text {
        margin-top: 32px;
        color: $RoleTeam2;
        animation: infinite-text-move 2s 4.5s linear infinite;
      }
    }
    &.role-team1 {
      left: 384px;
      .role-img {
        animation: role-bottom-enter 0.5s 3s linear forwards;
      }
      .light-img {
        animation: light-bottom-enter 0.5s 3s linear forwards;
      }
      .role-text {
        margin-top: 52px;
        color: $RoleTeam1;
        animation: infinite-text-move 2s 5s linear infinite;
      }
    }
    &.role-sm {
      left: 748px;
      .role-img {
        animation: role-bottom-enter 0.5s 3.5s linear forwards;
      }
      .light-img {
        animation: light-bottom-enter 0.5s 3.5s linear forwards;
      }
      .role-text {
        margin-top: 32px;
        color: $RoleSmTint;
        animation: infinite-text-move 2s 5.5s linear infinite;
      }
    }
    &.role-po {
      left: 996px;
      .role-img {
        animation: role-bottom-enter 0.5s 4s linear forwards;
      }
      .light-img {
        animation: light-bottom-enter 0.5s 4s linear forwards;
      }
      .role-text {
        margin-top: 52px;
        color: $PrimaryDefault;
        transition: enter 5s;
        animation: infinite-text-move 2s 6s linear infinite;
      }
    }
    img {
      position: absolute;
      bottom: 0;
    }
    .role-img {
      width: 205.57px;
      height: auto;
      left: 48px;
      transform-origin: bottom;
      opacity: 0;
    }
    .light-img {
      width: 300px;
      height: auto;
      opacity: 0;
    }
    .hole-img {
      width: 208.14px;
      height: auto;
      left: 48px;
      bottom: -3px;
      transform: scaleX(0);
      animation: hole-enter 0.3s 2s linear forwards;
    }
    .role-text {
      width: 100%;
      text-align: center;
      font-weight: 700;
      font-size: 20px;
      opacity: 0;
    }
    @keyframes infinite-text-move {
      0% {
        opacity: 1;
        transform: translateY(0);
      }
      15% {
        opacity: 1;
        transform: translateY(5%);
      }
      25% {
        opacity: 1;
        transform: translateY(5%);
      }
      45% {
        opacity: 1;
        transform: translateY(10%);
      }
      55% {
        opacity: 1;
        transform: translateY(10%);
      }
      70% {
        opacity: 1;
        transform: translateY(20%);
      }
      80% {
        opacity: 1;
        transform: translateY(20%);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
  .logo-dot {
    position: absolute;
    width: 130px;
    height: 130px;
    opacity: 0;
    @keyframes infinite-trans {
      0% {
        transform: translate(0) scale(1);
        opacity: 1;
      }
      15% {
        transform: translate(0) scale(1);
        opacity: 1;
      }
      43% {
        transform: translate(10px, -10px) scale(0.8);
        opacity: 0.8;
      }
      58% {
        transform: translate(10px, -10px) scale(0.8);
        opacity: 0.8;
      }
      85% {
        transform: translate(0, -20px) scale(0.5);
        opacity: 0.5;
      }
      100% {
        transform: translate(0, -20px) scale(0.5);
        opacity: 0.5;
      }
    }
    &.left-blue {
      top: 26px;
      left: 310px;
      transform: translate(0, -20px) scale(0.5);
      animation: infinite-trans 1.5s 6.5s linear alternate-reverse infinite;
    }
    &.left-purple {
      top: 178px;
      left: 60px;
      animation: infinite-trans 1.5s 6.7s linear alternate infinite;
    }
    &.left-red {
      top: 338px;
      left: 266px;
      transform: translate(0, -20px) scale(0.5);
      animation: infinite-trans 1.5s 6.8s linear alternate-reverse infinite;
    }
    &.left-yellow {
      top: 503px;
      left: 79px;
      animation: infinite-trans 1.5s 6.5s linear alternate infinite;
    }
    &.right-blue {
      top: 329px;
      right: 227px;
      animation: infinite-trans 1.5s 6.6s linear alternate infinite;
    }
    &.right-purple {
      top: 515px;
      right: 60px;
      transform: translate(0, -20px) scale(0.5);
      animation: infinite-trans 1.5s 6.8s linear alternate-reverse infinite;
    }
    &.right-red {
      top: 178px;
      right: 26px;
      animation: infinite-trans 1.5s 6.7s linear alternate infinite;
    }
    &.right-yellow {
      top: 0;
      right: 290px;
      transform: translate(0, -20px) scale(0.5);
      animation: infinite-trans 1.5s 6.6s linear alternate-reverse infinite;
    }
  }
}
</style>