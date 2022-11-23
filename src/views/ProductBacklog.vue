<script setup>
import { ref, reactive, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import Role from "../components/Role.vue";
import Message from "../components/Message.vue";
import ClickPageMask from "../components/ClickPageMask.vue";
import Backlog from "../components/Backlog.vue";

const store = useStore();
const step = ref(2);
const stepLoading = ref(false);
const endStep = ref(false);
const textSteps = reactive([
  {
    role: "po",
    html: "<span>\\ 碰 / </span>我是短衝小精靈 ， 開發 A 組的 PO 。<br /><span>PO 也就是產品負責人（Product Owner）</span> ， 產品負責人會負責評估產品待辦清單的價值與重要性 ， 依序排列要執行的優先順序 ， 對齊產品目標 。 最後排出產品待辦清單 （ProductBacklog） 唷 ！",
    height: 224,
    showClickPage: true,
    next: false,
    nextText: "",
  },
  {
    role: "po",
    html: "剛好我最近手邊有一個 「 人才招募系統 」 的案子 ， 我才剛列出了 <span>「 產品需求清單 」</span> 。<br>  既然你都來了 ， 來試試看調整產品優先度 ， 排出產品待辦清單吧 ！",
    height: 152,
    showClickPage: false,
    next: true,
    nextText: "準備好了",
  },
  {
    role: "po",
    html: "在這階段我們要把需求放進產品待辦清單 ， 並調整其優先順序 。 <br>對了 ！ 我們公司也推薦使用<img src='/images/jira_w.svg' width='110' height='38' style='margin: 8px 10px 12px 10px; vertical-align: middle;'/>來做任務的管理呢 ！",
    height: 168,
    showClickPage: false,
    next: false,
    nextText: "",
  },
  {
    role: "po",
    html: "<h2>換你來試試看吧 ！ </h2>提示 ： 請把需求拖移至產品待辦清單 ， 並調整其優先順序 。",
    height: 163,
    showClickPage: false,
    next: false,
    nextText: "",
  },
  {
    role: "po",
    html: "<h2>哇喔完成惹 ， 尼太棒ㄌ！ 我們繼續吧 ！",
    height: 128,
    showClickPage: true,
    next: false,
    nextText: "",
    hasMask: true,
  },
]);
const systemSetp = computed(() => {
  return store.state.step;
});
const onClickPage = () => {
  if (
    stepLoading.value ||
    !endStep.value ||
    step.value === textSteps.length - 1 ||
    !textSteps[step.value].showClickPage
  )
    return;
  handleNext();
};
const handleNext = () => {
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
        console.log("step1End");
      }, 2000);
      break;
    case 2:
      setTimeout(() => {
        stepLoading.value = false;
        endStep.value = true;
        console.log("step2End");
      }, 1000);
      break;
    case 3:
      break;
    case 4:
      break;
    default:
      break;
  }
});

onMounted(() => {
  stepLoading.value = true;
  setTimeout(() => {
    store.dispatch("setStep", 11);
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
      <div v-show="systemSetp > 10" class="inner" @click="onClickPage">
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
            <div class="backlog-list">
              <div class="backlog-list__item"></div>
              <div class="backlog-list__item"></div>
              <div class="backlog-list__item"></div>
              <div class="backlog-list__item"></div>
            </div>
          </div>
        </Backlog>
        <div class="drag-wrapper" v-if="step >= 2">
          <div class="drag-item item3">應徵者的線上履歷編輯器</div>
          <div class="drag-item item1">
            後台職缺管理功能（資訊上架、下架、顯示應徵者資料）
          </div>
          <div class="drag-item item2">會員系統（登入、註冊、權限管理）</div>
          <div class="drag-item item4">前台職缺列表、應徵</div>
        </div>
        <transition name="fade-in">
          <ClickPageMask
            v-show="endStep && textSteps[step].showClickPage"
            :hasMask="textSteps[step].hasMask"
          />
        </transition>
        <custom-btn
          v-if="endStep && textSteps[step].next && textSteps[step].nextText"
          class="next-btn"
          :text="textSteps[step].nextText"
          :disabled="stepLoading"
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
    top: 40px;
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
          padding: 12px 24px;
        }
      }
    }
  }
  .drag-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .drag-item {
      max-width: 343px;
      max-height: 96px;
      background: rgba(10, 13, 20, 0.6);
      border: 4px solid $PrimaryDefault;
      border-radius: 20px;
      padding: 12px 24px;
      color: $TextDefault;
    }
  }
  .next-btn {
    position: absolute;
    bottom: 89px;
    right: 40px;
    animation: show-btn 0.5s linear forwards;
    @keyframes show-btn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }
}
</style>