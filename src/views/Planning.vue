<script setup>
import { ref, reactive, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import draggable from "vuedraggable";
import Role from "../components/Role.vue";
import Message from "../components/Message.vue";
import ClickPageMask from "../components/ClickPageMask.vue";
import Backlog from "../components/Backlog.vue";

const store = useStore();
const step = ref(3);
const stepLoading = ref(false);
const endStep = ref(false);
const textSteps = reactive([
  {
    role: "po",
    roleSub: "mm",
    html: "產品待辦清單好了之後 ， 我們來召集 ScrumMaster 和開發團隊共同召開<span>短衝規劃會議（Sprint Planning）</span> 。 短衝即是一個迭代 ， 具有固定時間限制 ， 我們會在這個會議中 ， 決定要完成哪些工作事項來達到商業需求 ， 列出短衝待辦清單 （Sprint Backlog） ， 並由開發團隊在接下來的產品開發週期裡執行 。",
    height: 224,
    width: 997,
  },
  {
    role: "mm",
    roleSub: "po",
    html: "哦哦 ， 你是新來的前端吧 ！ 我是這次的 <span>ScrumMaster MM</span> ， 我的工作主要是促成開發團隊成員協作 、 引導團隊進行自省會議 ， 提升團隊成員對 Scrum 瞭解 。",
    height: 152,
    width: 997,
  },
  {
    role: "mm",
    roleSub: "team1",
    roleSub1: "team2",
    html: "這兩位是 EE 和 GG ， 是我們開發團隊的成員唷～ 我們團隊<span>一次 Sprint 週期是兩週</span>的時間 ， 依照我的觀察 ， 目前團隊可以負擔的點數 (Story Point) 大約是 <span>20 點</span>左右。",
    height: 152,
    width: 997,
  },
  {
    role: "team1",
    roleSub: "team2",
    html: "欸新來的 ， 你應該不知道點數是什麼意思吧ㄏㄏ ， 我來跟你介紹一下吧～ <span>Story Point</span> 目的是為了<span>衡量速度</span> ， 是用大概花費的時間預估出的相對點數哦 。",
    height: 188,
    width: 790,
  },
  {
    role: "team1",
    roleSub: "team2",
    html: "以 <span>「 費氏數列 」 的 1 、2 、3 、5 、8 、13 、21</span> 來估算各項 Story 的分數 。 Story Point 越小 ， 表示這個 Story 花費時間越少 ； 越大 ， 花費時間則越多 。 如果出現了一個 21 分 ， 可能表示這個 Story 太龐大 ， 需要再拆分細項執行唷 ！",
    height: 224,
    width: 790,
  },
]);

const systemSetp = computed(() => {
  return store.state.step;
});
const onClickPage = () => {
  if (stepLoading.value || !endStep.value || step.value >= textSteps.length)
    return;
  handleNext();
};

const handleNext = () => {
  if (step.value === 4) {
    store.dispatch("setStep", 40);
    return;
  }
  endStep.value = false;
  stepLoading.value = true;
  step.value++;
};

watch(step, (val) => {
  switch (val) {
    case 1:
      setTimeout(() => {
        stepLoading.value = false;
        endStep.value = true;
      }, 2000);
      break;
    case 2:
      setTimeout(() => {
        stepLoading.value = false;
        endStep.value = true;
      }, 2000);
      break;
    case 3:
      setTimeout(() => {
        stepLoading.value = false;
        endStep.value = true;
      }, 2000);
      break;
    case 4:
      setTimeout(() => {
        stepLoading.value = false;
        endStep.value = true;
      }, 3000);
      break;
    default:
      break;
  }
});

onMounted(() => {
  stepLoading.value = true;
  setTimeout(() => {
    store.dispatch("setStep", 26);
  }, 600);
  setTimeout(() => {
    stepLoading.value = false;
    endStep.value = true;
  }, 2500);
});
</script>

<template>
  <div class="planning-page">
    <transition name="fadeIn">
      <div v-show="systemSetp > 25" class="inner" @click="onClickPage">
        <div class="background"></div>
        <Role
          v-if="textSteps[step].role"
          :class="textSteps[step].role"
          :role="textSteps[step].role"
        />
        <Role
          v-if="textSteps[step].roleSub"
          :class="textSteps[step].roleSub"
          :role="textSteps[step].roleSub"
        />
        <Role
          v-if="textSteps[step].roleSub1"
          :class="textSteps[step].roleSub1"
          :role="textSteps[step].roleSub1"
        />
        <Message
          :class="textSteps[step].role"
          :width="textSteps[step].width"
          :height="textSteps[step].height"
          :role="textSteps[step].role"
          :content="textSteps[step].html"
          :showNext="true"
        />
        <div v-if="step === 0" class="sprint">
          <img
            class="sprint-img"
            src="../assets/images/attached/planning_sprint.png"
          />
          <div class="sprint-bg"></div>
          <div class="sprint-bg1"></div>
          <img
            class="sprint-img1"
            src="../assets/images/attached/planning_sprint.png"
          />
          <div class="sprint-bg2"></div>
        </div>
        <div v-if="step === 1" class="team">
          <img
            class="team-img"
            src="../assets/images/attached/planning_team.png"
          />
          <div class="team-bg"></div>
          <div class="team-bg1"></div>
          <img
            class="team-img1"
            src="../assets/images/attached/planning_team.png"
          />
          <div class="team-bg2"></div>
        </div>
        <div v-if="step === 2" class="point">
          <img
            class="point-img"
            src="../assets/images/attached/planning_point.png"
          />
          <div class="point-bg"></div>
          <div class="point-bg1"></div>
          <img
            class="point-img1"
            src="../assets/images/attached/planning_point.png"
          />
          <div class="point-bg2">
            <img
              class="point-img1"
              src="../assets/images/attached/planning_point.png"
            />
          </div>
        </div>
        <div v-if="step > 2" class="story" :class="{ 'show-point': step > 3 }">
          <img class="time-image" src="../assets/images/attached/time.png" />
          <img
            class="book-spine"
            src="../assets/images/attached/story_spine.png"
          />
          <div class="book book-1">
            <div class="book-time"></div>
            <div class="book-point">1</div>
          </div>
          <div class="book book-2">
            <div class="book-time"></div>
            <div class="book-point">2</div>
          </div>
          <div class="book book-3">
            <div class="book-time"></div>
            <div class="book-point">3</div>
          </div>
          <div class="book book-5">
            <div class="book-time"></div>
            <div class="book-point">5</div>
          </div>
          <div class="book book-8">
            <div class="book-time"></div>
            <div class="book-point">8</div>
          </div>
          <div class="book book-13">
            <div class="book-time"></div>
            <div class="book-point">13</div>
          </div>
          <div class="book book-21">
            <div class="book-time"></div>
            <div class="book-point">21</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.planning-page {
  width: 100%;
  height: 100vh;
  min-height: 944px;
  position: relative;
  .role-wrapper {
    &.po {
      top: -3px;
      left: 33px;
    }
    &.mm {
      right: 33px;
      bottom: 25px;
    }
    &.team1 {
      top: -3px;
      right: 280px;
    }
    &.team2 {
      top: -3px;
      right: 10px;
    }
  }
  .message {
    &.po {
      top: 35px;
      right: 40px;
    }
    &.mm {
      bottom: 70px;
      left: 50px;
    }
    &.team1 {
      top: 35px;
      left: 50px;
    }
  }

  .sprint,
  .team,
  .point {
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 592px;
    height: 592px;
    border-radius: 50%;
    backdrop-filter: blur(5px);
    opacity: 0;
    animation: enter 0.8s 0.5s linear forwards;
    @keyframes enter {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    & > div {
      position: absolute;
      width: 580px;
      height: 580px;
      border-radius: 50%;
    }
    img {
      position: absolute;
      z-index: 1;
    }
    &-bg {
      top: 0;
      left: 0;
      backdrop-filter: blur(5px) brightness(0.7);
      z-index: 0;
    }
    &-img1 {
      left: 12px;
      top: 12px;
      opacity: 0.3;
      z-index: -1 !important;
    }
    &-bg1 {
      left: 12px;
      top: 12px;
      z-index: -2;
    }
    &-bg2 {
      left: 12px;
      top: 12px;
      opacity: 0.9;
      z-index: -3;
    }
  }
  .sprint {
    top: 290px;
    &-bg {
      background: rgba(0, 255, 224, 0.3);
    }
    &-bg1 {
      background: rgba(0, 255, 224, 0.15);
    }
    &-bg2 {
      background: radial-gradient(
        50% 50% at 50% 50%,
        #00ffe0 0%,
        rgba(0, 255, 224, 0) 100%
      );
    }
  }
  .team,
  .point {
    top: 90px;
    &-bg {
      background: rgba(255, 0, 245, 0.35);
    }
    &-bg1 {
      background: rgba(255, 0, 245, 0.25);
    }
    &-bg2 {
      background: radial-gradient(
        50% 50% at 50% 50%,
        #ff00f5 0%,
        rgba(255, 48, 247, 0) 100%
      );
    }
  }
  .point {
    left: 120px;
    right: initial;
  }
  .story {
    position: absolute;
    top: 0;
    img {
      position: absolute;
    }
    &.show-point {
      .time-image {
        opacity: 1;
        animation: time-hidden 0.5s 0.5s linear forwards;
        @keyframes time-hidden {
          0% {
            opacity: 1;
            transform: scale(1) translate(0);
          }
          100% {
            opacity: 0;
            transform: scale(0.5) translate(740px, 10px);
          }
        }
      }
      .book {
        &-1 {
          .book-time,
          .book-point {
            animation: book-time-enter 0.2s 0.8s linear forwards;
          }
        }
        &-2 {
          .book-time,
          .book-point {
            animation: book-time-enter 0.2s 1s linear forwards;
          }
        }
        &-3 {
          .book-time,
          .book-point {
            animation: book-time-enter 0.2s 1.2s linear forwards;
          }
        }
        &-5 {
          .book-time,
          .book-point {
            animation: book-time-enter 0.2s 1.4s linear forwards;
          }
        }
        &-8 {
          .book-time,
          .book-point {
            animation: book-time-enter 0.2s 1.6s linear forwards;
          }
        }
        &-13 {
          transition-delay: 1.8s;
          background-image: url("../assets/images/attached/story_13.png");
          .book-time,
          .book-point {
            animation: book-time-enter 0.2s 1.8s linear forwards;
          }
        }
        &-21 {
          transition-delay: 2s;
          background-image: url("../assets/images/attached/story_21.png");
          .book-time,
          .book-point {
            animation: book-time-enter 0.2s 2s linear forwards;
          }
        }
      }
      @keyframes book-time-enter {
        0% {
          opacity: 0;
          transform: translateX(-50%);
        }
        100% {
          opacity: 1;
          transform: translateX(0);
        }
      }
    }
    .time-image {
      width: 165px;
      height: 165px;
      top: 317px;
      left: 94px;
      opacity: 0;
      animation: time-enter 0.5s 1.5s linear forwards;
      @keyframes time-enter {
        0% {
          opacity: 0;
          transform: scale(0);
        }
        80% {
          opacity: 1;
          transform: scale(1.1);
        }
        100% {
          opacity: 1;
          transform: scale(1);
        }
      }
    }
    .book-spine {
      width: 55px;
      height: 185px;
      left: 368px;
      top: 390px;
      animation: book-spine-enter 0.3s linear forwards;
      @keyframes book-spine-enter {
        0% {
          transform: translate(-73px, -54px);
        }
        100% {
          transform: translate(0);
        }
      }
    }
    .book {
      position: absolute;
      width: 195px;
      height: 185px;
      background-size: contain;
      background-image: url("../assets/images/attached/story.png");
      .book-time {
        position: absolute;
        top: -39px;
        right: -39px;
        width: 110px;
        height: 105px;
        background-size: contain;
        opacity: 0;
      }
      .book-point {
        position: absolute;
        top: 52px;
        left: 77px;
        width: 80px;
        height: 80px;
        border-radius: 100px;
        background: rgba(0, 255, 224, 0.7);
        font-weight: 700;
        font-size: 44px;
        line-height: 80px;
        color: $TextDefault;
        text-align: center;
        opacity: 0;
      }
      &:not(.book-1) {
        opacity: 0;
        transform-origin: left center;
        animation: book-enter 0.3s 1s linear forwards;
        @keyframes book-enter {
          0% {
            opacity: 0;
            transform: translateX(-50%);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
      }
      &-1 {
        top: 390px;
        left: 368px;
        opacity: 0;
        animation: book-1-enter 0.3s 0.5s linear forwards;
        .book-time {
          background-image: url("../assets/images/attached/time_1.png");
        }
        @keyframes book-1-enter {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      }
      &-2 {
        top: 390px;
        left: 623px;
        .book-time {
          background-image: url("../assets/images/attached/time_2.png");
        }
      }
      &-3 {
        top: 390px;
        left: 878px;
        .book-time {
          background-image: url("../assets/images/attached/time_3.png");
        }
      }
      &-5 {
        top: 615px;
        left: 240px;
        .book-time {
          background-image: url("../assets/images/attached/time_5.png");
        }
      }
      &-8 {
        top: 615px;
        left: 495px;
        .book-time {
          background-image: url("../assets/images/attached/time_8.png");
        }
      }
      &-13 {
        top: 615px;
        left: 750px;
        .book-time {
          background-image: url("../assets/images/attached/time_13.png");
        }
        .book-point {
          background: rgba(255, 122, 0, 0.7);
        }
      }
      &-21 {
        top: 615px;
        left: 1005px;
        .book-time {
          background-image: url("../assets/images/attached/time_21.png");
        }
        .book-point {
          background: rgba(255, 0, 0, 0.7);
        }
      }
    }
  }
}
</style>