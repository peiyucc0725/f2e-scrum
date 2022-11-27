<script setup>
import { ref, reactive, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import draggable from "vuedraggable";
import Role from "../components/Role.vue";
import Message from "../components/Message.vue";
import ClickPageMask from "../components/ClickPageMask.vue";
import Backlog from "../components/Backlog.vue";

const store = useStore();
const step = ref(0);
const stepLoading = ref(false);
const endStep = ref(false);
const textSteps = reactive([
  {
    role: "po",
    html: "<span>\\ 碰 / </span>我是短衝小精靈 ， 開發 A 組的 PO 。<br /><span>PO 也就是產品負責人（Product Owner）</span> ， 產品負責人會負責評估產品待辦清單的價值與重要性 ， 依序排列要執行的優先順序 ， 對齊產品目標 。 最後排出產品待辦清單 （ProductBacklog） 唷 ！",
    height: 224,
    showClickPage: true,
    clickPage: true,
    next: false,
    nextText: "",
  },
  {
    role: "po",
    html: "剛好我最近手邊有一個 「 人才招募系統 」 的案子 ， 我才剛列出了 <span>「 產品需求清單 」</span> 。<br>  既然你都來了 ， 來試試看調整產品優先度 ， 排出產品待辦清單吧 ！",
    height: 152,
    showClickPage: false,
    clickPage: false,
    next: true,
    nextText: "準備好了",
  },
  {
    role: "po",
    html: "在這階段我們要把需求放進產品待辦清單 ， 並調整其優先順序 。 <br>對了 ！ 我們公司也推薦使用<img src='/f2e-scrum/images/jira_w.svg' width='110' height='38' style='margin: 8px 10px 12px 10px; vertical-align: middle;'/>來做任務的管理呢 ！",
    height: 168,
    showClickPage: false,
    clickPage: true,
    next: false,
    nextText: "",
  },
  {
    role: "po",
    html: "<h2>換你來試試看吧 ！ </h2>提示 ： 請把需求拖移至產品待辦清單 ， 並調整其優先順序 。",
    height: 163,
    showClickPage: false,
    clickPage: false,
    next: true,
    nextText: "我完成了",
  },
  {
    role: "po",
    html: "<h2>哇喔完成惹 ， 尼太棒ㄌ！ 我們繼續吧 ！</h2>",
    height: 128,
    showClickPage: true,
    clickPage: true,
    next: false,
    nextText: "",
    hasMask: true,
  },
]);
const dragItem = ref(null);
const dragItams = reactive([
  { id: 1, text: "後台職缺管理功能（資訊上架、下架、顯示應徵者資料）" },
  { id: 2, text: "會員系統（登入、註冊、權限管理）" },
  { id: 3, text: "應徵者的線上履歷編輯器" },
  { id: 4, text: "前台職缺列表、應徵" },
]);
const answer = reactive(["", "", "", ""]);
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
    const order = answer.map((item) => item.id);
    if (order.join("") !== "1234") return;
  } else if (step.value === 4) {
      store.dispatch("setStep", 35);
    return;
  }
  endStep.value = false;
  stepLoading.value = true;
  step.value++;
};

const handleDragStart = (e) => {
  dragItem.value = e.oldIndex;
};

const handleDragEnd = (e) => {
  dragItem.value = null;
};

const handleDrop = (index) => {
  if (dragItem.value === null) return;
  const data = dragItams[dragItem.value];
  dragItams.splice(dragItem.value, 1);
  answer[index] = data;
};

const answerEmpty = computed(() => {
  const hasEmpty = answer.findIndex((item) => item === "");
  return hasEmpty != -1;
});

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
      }, 2500);
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
      }, 1500);
      break;
    default:
      break;
  }
});

onMounted(() => {
  stepLoading.value = true;
  setTimeout(() => {
    store.dispatch("setStep", 21);
  }, 300);
  setTimeout(() => {
    stepLoading.value = false;
    endStep.value = true;
  }, 2000);
});
</script>

<template>
  <div class="product-backlog">
    <transition name="fadeIn">
      <div v-show="systemSetp > 20" class="inner" @click="onClickPage">
        <div class="background"></div>
        <Role :role="textSteps[step].role" />
        <Message
          :width="997"
          :height="textSteps[step].height"
          :role="textSteps[step].role"
          :content="textSteps[step].html"
          :showNext="!textSteps[step].nextText"
        />
        <Backlog v-if="step >= 2">
          <div class="backlog-content">
            <img
              class="capation-img"
              src="../assets/images/attached/capation.png"
              height="436"
            />
            <draggable
              :list="answer"
              item-key="element"
              class="backlog-list"
              draggable=".backlog-draggable"
            >
              <template #item="{ element, index }">
                <div
                  class="backlog-list__item"
                  :class="{ 'backlog-draggable': element }"
                  @drop="handleDrop(index)"
                  @dragover.prevent
                >
                  <div class="text" v-if="element && step > 2">
                    {{ element.text }}
                  </div>
                  <div class="example-text" v-if="step === 2 && index === 0">
                    前台職缺列表、應徵
                  </div>
                  <img
                    v-if="step === 2 && index === 0"
                    class="example-hand"
                    src="../assets/images/attached/hand.svg"
                  />
                  <img
                    v-if="step === 2 && index === 0"
                    class="example-arrow"
                    src="../assets/images/attached/arrow.svg"
                  />
                </div>
              </template>
            </draggable>
          </div>
        </Backlog>
        <draggable
          v-if="step >= 2"
          v-model="dragItams"
          item-key="id"
          class="drag-wrapper"
          draggable=".draggable"
          :class="{ example: step === 2 }"
          @start="handleDragStart"
          @end="handleDragEnd"
        >
          <template #item="{ element }">
            <div
              class="drag-item"
              :class="
                `item${element.id}`, { draggable: step > 2 && !stepLoading }
              "
            >
              {{ element.text }}
            </div>
          </template>
        </draggable>
        <transition name="fade-in">
          <ClickPageMask
            v-show="textSteps[step].hasMask || endStep && textSteps[step].showClickPage"
            :hasMask="textSteps[step].hasMask"
          />
        </transition>
        <custom-btn
          v-if="endStep && textSteps[step].next && textSteps[step].nextText"
          class="next-btn"
          :text="textSteps[step].nextText"
          :disabled="stepLoading || (step === 3 && answerEmpty)"
          @click="handleNext"
        ></custom-btn>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.product-backlog {
  width: 100%;
  height: 100vh;
  min-height: 944px;
  position: relative;
  .role-wrapper {
    top: -10px;
    left: 33px;
  }
  .message {
    top: 35px;
    right: 40px;
  }
  .backlog {
    top: 242px;
    left: 464px;
    .backlog-content {
      position: relative;
      width: 480px;
      height: 100%;
      .capation-img {
        position: absolute;
        top: 28px;
        left: 20px;
      }
      .backlog-list {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 32px 32px 32px 52px;
        &__item {
          width: 100%;
          height: 96px;
          border: 2px dashed $PrimaryDefault;
          border-radius: 20px;
          & > .text,
          & > .example-text {
            width: calc(100% + 8px);
            height: calc(100% + 8px);
            padding: 12px 24px;
            background: $BgDark60;
            border: 4px solid #00ffe0;
            backdrop-filter: blur(2px) brightness(0.6);
            border-radius: 20px;
            display: flex;
            align-items: center;
            font-size: 20px;
            line-height: 36px;
            margin-left: -4px;
            margin-top: -4px;
          }
          & > .example-hand {
            position: absolute;
            top: 102px;
            right: 99px;
            animation: dragHand 0.5s 1.5s forwards;
            opacity: 0;
            @keyframes dragHand {
              0% {
                opacity: 0;
                transform: translate(100px, 100px) scale(0.9);
              }
              100% {
                opacity: 1;
                transform: translate(0) scale(1);
              }
            }
          }
          & > .example-text {
            opacity: 0;
            animation: dragInAni 0.5s 1.5s forwards;
            transform-origin: bottom right;
            @keyframes dragInAni {
              0% {
                opacity: 0;
                transform: translate(10px, 10px) scale(0.9);
              }
              100% {
                opacity: 1;
                transform: translate(0) scale(1);
              }
            }
          }
          & > .example-arrow {
            position: absolute;
            top: 128px;
            right: -80px;
            opacity: 0;
            animation: showArrow 0.5s 1.5s forwards;
            @keyframes showArrow {
              0% {
                opacity: 0;
              }
              100% {
                opacity: 1;
              }
            }
          }
        }
      }
    }
  }
  .drag-wrapper {
    animation: enter 0.8s 0.5s linear forwards;
    opacity: 0;
    z-index: 2;

    @keyframes enter {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
    &.example > *:not(.item4) {
      animation: setOpacity 0.3s 1s linear forwards;
      @keyframes setOpacity {
        0% {
          opacity: 1;
        }
        100% {
          opacity: 0.3;
        }
      }
    }
    .drag-item {
      background: rgba(10, 13, 20, 0.6);
      border: 4px solid $PrimaryDefault;
      border-radius: 20px;
      padding: 12px 24px;
      color: $TextDefault;
      font-size: 20px;
      line-height: 36px;
      max-width: 350px;
      max-height: 100px;
      position: absolute;
      z-index: 2;
      &.item1 {
        top: 604px;
        left: 49px;
      }
      &.item2 {
        top: 487px;
        right: 49px;
      }
      &.item3 {
        top: 485px;
        left: 147px;
      }
      &.item4 {
        top: 631px;
        right: 187px;
      }
    }
  }
}
</style>