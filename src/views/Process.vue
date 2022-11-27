<script setup>
import { ref, reactive, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import draggable from "vuedraggable";
import Role from "../components/Role.vue";
import Message from "../components/Message.vue";
import ClickPageMask from "../components/ClickPageMask.vue";

const store = useStore();
const step = ref(0);
const stepLoading = ref(false);
const endStep = ref(false);
const correct = reactive([2,1,3])
const checkAnswer = ref(true);
const textSteps = reactive([
  {
    role: "team1",
    html: "等等等等等 ， 你都還不知道什麼是 Sprint 吧 ！ 讓我先為你介紹一下～<br>仔細聽好唷 ， 等等會考考你 ！",
    height: 152,
    width: 1070,
    showClickPage: false,
    clickPage: true,
    next: true,
    nextText: "",
  },
  {
    role: "team1",
    html: "Sprint 是一個短衝 ， 開發團隊會在這期間執行開發 。 在這段期間內 ， 開發團隊舉辦<span>每日站立會議 (Daily Scrum)</span> ， 追蹤成員間的工作狀況 ， 在 Sprint 的結束也會包含<span>短衝檢視會議 (Sprint Review)</span> 以及<span>短衝自省會議 (Sprint Retrospective)</span> 。",
    height: 188,
    width: 1070,
    showClickPage: false,
    clickPage: true,
    next: true,
    nextText: "",
  },
  {
    role: "team1",
    html: "優化工作流程、讓團隊有變得更好的機會。<br>推薦工具 ：<img src='/f2e-scrum/images/logo_confluence_w.svg' width='210' height='28' style='margin: 8px 10px 12px 10px; vertical-align: middle;'/> ",
    height: 162,
    width: 1070,
    showClickPage: false,
    clickPage: false,
    next: false,
    nextText: "練習去囉",
  },
  {
    role: "team1",
    html: "<h2>換你來試試看吧 ！</h2>在這經典的 Surum 流程圖中 ， 這些流程分別代表哪一個會議呢 ？<br>提示 ： 把右側的三個流程拖移至正確的位置上吧 ！",
    height: 199,
    width: 1070,
    showClickPage: false,
    clickPage: false,
    next: false,
    nextText: "我完成了",
  },
  {
    role: "team1",
    html: "<h2>哼哼沒想到你這麼快就學會惹 ， 快結束了加油加油 ！</h2>",
    height: 128,
    width: 1070,
    showClickPage: true,
    clickPage: true,
    next: true,
    nextText: "",
    hasMask: true,
  },
]);
const dragItem = ref(null);
const dragItams = reactive([
  {
    id: 1,
    text: "每日站立會議",
    desc: "Daily Scrum",
  },
  { id: 2, text: "短衝檢視會議", desc: "Sprint Review" },
  { id: 3, text: "短衝自省會議", desc: "Sprint Retrospective" },
]);
const answer = reactive(["", "", ""]);
const systemSetp = computed(() => {
  return store.state.step;
});
const onClickPage = () => {
  if (
    stepLoading.value ||
    !endStep.value ||
    step.value >= textSteps.length ||
    !textSteps[step.value].clickPage
  )
    return;
  handleNext();
};
const handleNext = () => {
  if (step.value === 3) {
    const ans = answer.map((item) => item.id).join("");
    checkAnswer.value = ans === "213";
    if (!checkAnswer.value) return;
  } else if (step.value === 4) {
    store.dispatch("setStep", 85);
    return;
  }
  endStep.value = false;
  stepLoading.value = true;
  step.value++;
};

const handleDragStart = (e) => {
  dragItem.value = {
    index: e.oldIndex,
    data: dragItams[e.oldIndex],
  };
};

const handleDragEnd = (e) => {
  dragItem.value = null;
};

const handleDrop = (dropIndex) => {
  if (dragItem.value === null) return;
  const { data, index } = dragItem.value;
  dragItams.splice(index, 1);
  answer[dropIndex] = data;
};

const handleSort = () => {
    checkAnswer.value = true
}

const answerValid = computed(() => {
  const EmptyNum = answer.filter((item) => item === "");
  return EmptyNum.length === 0;
});

watch(step, (val) => {
  switch (val) {
    case 1:
      const el = document.getElementsByClassName("message")[0];
      el.style.opacity = 1;
      setTimeout(() => {
        stepLoading.value = false;
        endStep.value = true;
      }, 3500);
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
      }, 2500);
      break;
    default:
      break;
  }
});

onMounted(() => {
  stepLoading.value = true;
  setTimeout(() => {
    store.dispatch("setStep", 71);
  }, 300);
  setTimeout(() => {
    stepLoading.value = false;
    endStep.value = true;
  }, 2000);
});
</script>

<template>
  <div class="process-page">
    <transition name="fadeIn">
      <div v-show="systemSetp > 70" class="inner" @click="onClickPage">
        <div class="background"></div>
        <Role
          v-if="textSteps[step].role"
          :class="textSteps[step].role"
          :role="textSteps[step].role"
        />
        <Message
          :class="textSteps[step].role"
          :width="textSteps[step].width"
          :height="textSteps[step].height"
          :role="textSteps[step].role"
          :content="textSteps[step].html"
          :showNext="textSteps[step].next"
        />
        <div class="process-wrapper" v-if="step >= 1 && step < 3">
          <div class="process-wrapper__row">
            <div class="process-wrapper__col">
              <img src="../assets/images/attached/sprint_daily.png" />
              <div class="process-sprint">
                <div class="process-sprint__title">每日站立會議</div>
                <div class="process-sprint__subtitle">Daily Scrum</div>
              </div>
            </div>
            <div class="process-wrapper__col">
              <img src="../assets/images/attached/sprint_review.png" />
              <div class="process-sprint">
                <div class="process-sprint__title">短衝檢視會議</div>
                <div class="process-sprint__subtitle">Sprint Review</div>
              </div>
            </div>
            <div class="process-wrapper__col">
              <img src="../assets/images/attached/sprint_retro.png" />
              <div class="process-sprint">
                <div class="process-sprint__title">短衝自省會議</div>
                <div class="process-sprint__subtitle">Sprint Retrospective</div>
              </div>
            </div>
          </div>
          <div class="process-wrapper__row">
            <div class="process-wrapper__col">
              <div class="process-sprint__content">
                每天都要進行的會議 ， 以15分鐘為限制
                <ul>
                  <li>昨天為團隊的短衝目標 (Sprint Goal) 做了那些進度</li>
                  <li>今天我會如何準備來幫助團隊達到短衝目標</li>
                  <li>過程中有遇到什麼問題、難題</li>
                </ul>
                透過團隊分享 ， 追蹤大家的工作狀況。
              </div>
            </div>
            <div class="process-wrapper__col">
              <div class="process-sprint__content">
                用來檢視該次短衝增量的成果 ， 以蒐集相關的回饋數據或意見 。
              </div>
            </div>
            <div class="process-wrapper__col">
              <div class="process-sprint__content">
                團隊在自省會議裡 , 會共同回顧該短衝歷程發生的事情
                <ul>
                  <li>好的地方</li>
                  <li>可以改進的地方</li>
                  <li>如何維持我們已有的成功經驗</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="scrum-process" v-else-if="step >= 3">
          <img src="../assets/images/attached/sprint_process.png" />
          <div
            v-for="i in 7"
            :key="i"
            class="step-line"
            :class="`line-${i}`"
          ></div>
          <div class="scrum-process__step product-backlog">
            <div class="step-title">產品待辦清單</div>
            <div class="step-subtitle">Product Backlog</div>
          </div>
          <div class="scrum-process__step planning">
            <div class="step-title">短衝規劃會議</div>
            <div class="step-subtitle">Sprint Planning</div>
          </div>
          <div class="scrum-process__step sprint-backlog">
            <div class="step-title">短衝待辦清單</div>
            <div class="step-subtitle">Sprint Backlog</div>
          </div>
          <div class="scrum-process__step sprint">
            <div class="step-title">短衝</div>
            <div class="step-subtitle">Sprint</div>
          </div>
          <draggable :list="answer" item-key="id" draggable=".draggable" @change="handleSort">
            <template #item="{ element, index }">
              <div
                class="scrum-process__step drag-step"
                :class="
                  `drag-step-${index + 1}`,
                  {
                    empty: !element.text,
                    draggable: element.text,
                    error: !checkAnswer && correct[index] !== element.id,
                  }
                "
                @drop="handleDrop(index)"
                @dragover.prevent
              >
                <div v-if="element.text">
                  <div class="step-title">{{ element.text }}</div>
                  <div class="step-subtitle">{{ element.desc }}</div>
                </div>
              </div>
            </template>
          </draggable>
          <draggable
            :list="dragItams"
            :sort="false"
            item-key="id"
            draggable=".drag-item"
            @start="handleDragStart"
            @end="handleDragEnd"
          >
            <template #item="{ element, index }">
              <div class="drag-item" :class="`drag-item-${element.id}`">
                <div class="item-title">{{ element.text }}</div>
                <div class="item-subtitle">{{ element.desc }}</div>
              </div>
            </template>
          </draggable>
        </div>
        <transition name="fade-in">
          <ClickPageMask
            v-show="textSteps[step].showClickPage"
            :hasMask="textSteps[step].hasMask"
          />
        </transition>
        <custom-btn
          v-if="endStep && textSteps[step].nextText"
          class="next-btn"
          :text="textSteps[step].nextText"
          :disabled="stepLoading || (step === 3 && !answerValid)"
          @click="handleNext"
        ></custom-btn>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.process-page {
  width: 100%;
  height: 100vh;
  min-height: 944px;
  position: relative;
  .role-wrapper.team1 {
    right: 10px;
  }
  .message {
    top: 35px;
    left: 50px;
  }
  .process-wrapper {
    position: absolute;
    width: 100%;
    top: 248px;
    padding: 0 70px;
    &__row {
      display: flex;
      justify-content: space-between;
      &:first-of-type {
        .process-wrapper__col {
          transform-origin: left;
          animation: trans-enter 0.5s 1s linear forwards;
          opacity: 0;
          @keyframes trans-enter {
            0% {
              opacity: 0;
              transform: translateX(-100%);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }
        }
      }
      &:last-of-type {
        .process-sprint__content {
          transform-origin: top;
          overflow: hidden;
          height: 0;
        }
        & > *:nth-child(1) {
          .process-sprint__content {
            animation: scale-enter 0.5s 2s linear forwards;
          }
        }
        & > *:nth-child(2) {
          .process-sprint__content {
            animation: scale-enter 0.5s 2.5s linear forwards;
          }
        }
        & > *:nth-child(3) {
          .process-sprint__content {
            animation: scale-enter 0.5s 3s linear forwards;
          }
        }
        @keyframes scale-enter {
          0% {
            height: 0;
          }
          100% {
            height: 100%;
          }
        }
      }
    }
    &__col {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: $TextDefault;
    }
    .process-sprint {
      width: 380px;
      height: 94px;
      padding: 6px 0;
      background: rgba(10, 13, 20, 0.6);
      border: 4px solid $RoleTeam1;
      backdrop-filter: blur(5px);
      border-radius: 20px;
      text-align: center;
      margin: 10px 0;
      &__title {
        font-weight: 700;
        font-size: 32px;
        line-height: 48px;
        color: $RoleTeam1;
      }
      &__subtitle {
        font-weight: 700;
        font-size: 16px;
        line-height: 22px;
        color: $TextTint;
      }
      &__content {
        margin: 10px;
        width: 380px;
        font-size: 20px;
        line-height: 36px;
        ul {
          margin: 0;
        }
      }
    }
    img {
      width: 400px;
      height: 188px;
    }
  }
  .scrum-process {
    position: absolute;
    top: 235px;
    .step-line {
      position: absolute;
      background-color: $PrimaryDefault;
      width: 22px;
      height: 4px;
      opacity: 0;
      &.line-1 {
        top: 71px;
        left: 94px;
        animation: enter 0.5s .3s linear forwards;
      }
      &.line-2 {
        top: 183px;
        left: 94px;
        animation: enter 0.5s .8s linear forwards;
      }
      &.line-3 {
        top: 295px;
        left: 94px;
        animation: enter 0.5s 1.3s linear forwards;
      }
      &.line-4 {
        width: 4px;
        height: 50px;
        top: 381px;
        left: 372px;
        animation: enter 0.5s 1.8s linear forwards;
      }
      &.line-5 {
        top: 376px;
        left: 562px;
        animation: enter 0.5s 2.3s linear forwards;
      }
      &.line-6 {
        width: 4px;
        height: 32px;
        top: 592px;
        left: 687px;
        animation: enter 0.5s 2.3s linear forwards;
      }
      &.line-7 {
        width: 4px;
        height: 32px;
        top: 592px;
        left: 1022px;
        animation: enter 0.5s 2.3s linear forwards;
      }
    }
    &__step {
      height: 94px;
      width: 300px;
      background: rgba(10, 13, 20, 0.6);
      border: 4px solid $PrimaryDefault;
      backdrop-filter: blur(5px);
      border-radius: 20px;
      text-align: center;
      padding: 8px;
      position: absolute;
      &.error {
        border: 4px solid $DangerDefault !important;
      }
      &.empty {
        opacity: 0;
        border: 2px dashed $PrimaryDefault !important;
        background: transparent;
        backdrop-filter: initial;
        animation: enter 0.5s 2.3s linear forwards;
      }
      &.drag-step {
        border: 4px solid $RoleTeam1;
        .draggable {
          z-index: 1;
        }
        .step-title {
          color: $RoleTeam1;
        }
        .step-subtitle {
          color: $TextTint;
        }
      }
      &.drag-step-1 {
        left: 584px;
        top: 329px;
      }
      &.drag-step-2 {
        left: 544px;
        top: 500px;
      }
      &.drag-step-3 {
        left: 872px;
        top: 500px;
      }
      &.product-backlog {
        top: 24px;
        left: 116px;
        opacity: 0;
        animation: enter 0.5s .3s linear forwards;
      }
      &.planning {
        top: 136px;
        left: 116px;
        opacity: 0;
        animation: enter 0.5s .8s linear forwards;
      }
      &.sprint-backlog {
        top: 248px;
        left: 116px;
        opacity: 0;
        animation: enter 0.5s 1.3s linear forwards;
      }
      &.sprint {
        width: 150px;
        top: 430px;
        left: 297px;
        opacity: 0;
        animation: enter 0.5s 1.8s linear forwards;
      }
      .step-title {
        font-weight: 700;
        font-size: 32px;
        line-height: 48px;
        color: $TextTint;
      }
      .step-subtitle {
        font-weight: 700;
        font-size: 16px;
        line-height: 22px;
        color: $PrimaryDark;
      }
    }
    .drag-item {
      position: absolute;
      height: 94px;
      width: 300px;
      background: rgba(10, 13, 20, 0.6);
      border: 4px solid $RoleTeam1;
      backdrop-filter: blur(5px);
      border-radius: 20px;
      text-align: center;
      padding: 8px;
      left: 1100px;
      z-index: 1;

      .item-title {
        font-weight: 700;
        font-size: 32px;
        line-height: 48px;
        color: $RoleTeam1;
      }
      .item-subtitle {
        font-weight: 700;
        font-size: 16px;
        line-height: 22px;
        color: $TextTint;
      }
      &-1 {
        top: 86px;
        animation: trans-enter-1 0.3s linear forwards;
        @keyframes trans-enter-1 {
            0%{
                transform: translate(-300%, 200%);
            }
            100%{
                transform: translate(0);
            }
        }
      }
      &-2 {
        top: 204px;
        animation: trans-enter-2 0.3s linear forwards;
        @keyframes trans-enter-2 {
            0%{
                transform: translate(-200%, 100%);
            }
            100%{
                transform: translate(0);
            }
        }
      }
      &-3 {
        top: 322px;
        animation: trans-enter-3 0.3s linear forwards;
        @keyframes trans-enter-3 {
            0%{
                transform: translate(-100%, 0);
            }
            100%{
                transform: translate(0);
            }
        }
      }
    }
    img {
      position: absolute;
      top: 0;
      left: 82px;
      width: 1085px;
      height: 650px;
      opacity: 0;
      animation: enter 0.5s linear forwards;
    }
    @keyframes enter {
        0%{
            opacity: 0;
        }
        100%{
            opacity: 1;
        }
    }
  }
}
</style>