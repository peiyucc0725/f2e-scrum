<script setup>
import { ref, reactive, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import draggable from "vuedraggable";
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
    role: "team2",
    html: "沒錯，如 EE 說的，我這邊已經把剛剛討論好的點數標上去囉～ 你來練習把任務排到短衝待辦清單吧 ！",
    height: 152,
    width: 790,
    roleSub: "team1",
    showClickPage: false,
    clickPage: true,
    next: true,
    nextText: "",
  },
  {
    role: "team2",
    html: "沒錯，如 EE 說的，我這邊已經把剛剛討論好的點數標上去囉～ 你來練習把任務排到短衝待辦清單吧 ！",
    height: 152,
    width: 790,
    roleSub: "team1",
    htmlSub:
      "By the way , 我們平常管理任務是使用<img src='/images/jira_w.svg' width='110' height='38' style='margin: 8px 10px 12px 10px; vertical-align: middle;'/>這套軟體 ， 你有時間記得先去註冊和熟悉唷 !",
    heightSub: 172,
    widthSub: 790,
    showClickPage: false,
    clickPage: false,
    next: false,
    nextText: "練習去囉",
  },
  {
    role: "team2",
    html: "<h2>換你來試試看吧 ！ </h2>把 <span>「 產品待辦清單 」</span> 的項目拖進 <span> 「開發Ａ組的短衝待辦清單 」</span> 裡吧 ！<br>提示 ： 置入兩項以上的 Story ， 點數總和不能超過團隊負擔上限 20 點唷 ！",
    height: 199,
    width: 1070,
    showClickPage: false,
    clickPage: false,
    next: false,
    nextText: "開始sprint",
  },
  {
    role: "team2",
    html: "<h2>噢嗚嗚 ， 太厲害ㄌ ！ 又完成了一關 ！ 還有下一關等著你 ！</h2>",
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
    text: "後台職缺管理功能（資訊上架、下架、顯示應徵者資料）",
    point: 8,
  },
  { id: 2, text: "應徵者的線上履歷編輯器", point: 5 },
  { id: 3, text: "會員系統（登入、註冊、權限管理）", point: 13 },
  { id: 4, text: "前台職缺列表、應徵", point: 8 },
]);
const pointTotal = computed(() => {
  return answer.reduce((accumulator, object) => {
    const point = object.point || 0;
    return accumulator + point;
  }, 0);
});
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
    store.dispatch("setStep", 55);
    return;
  }
  endStep.value = false;
  stepLoading.value = true;
  step.value++;
};

const handleDragStart = (e, type) => {
  let data;
  if (type === "product") {
    data = dragItams[e.oldIndex];
  } else {
    data = answer[e.oldIndex];
  }
  dragItem.value = {
    type,
    index: e.oldIndex,
    data,
  };
};

const handleDragEnd = (e) => {
  dragItem.value = null;
};

const handleDrop = (dropIndex, dropType) => {
  if (dragItem.value === null) return;
  const { type, data, index } = dragItem.value;
  if (dropType === type) return;
  if (type === "product") {
    const hasEmpty = answer.findIndex((item) => item === "");
    if (hasEmpty === -1) return;
    dragItams.splice(index, 1);
    answer[hasEmpty] = data;
  } else {
    answer.splice(index, 1);
    answer.push("");
    dragItams.push(data);
  }
};

const answerValid = computed(() => {
  const EmptyNum = answer.filter((item) => item === "");
  return EmptyNum.length < 2 && pointTotal.value <= 20;
});

watch(step, (val) => {
  switch (val) {
    case 1:
      const el = document.getElementsByClassName("message")[0];
      el.style.opacity = 1;
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
      }, 1000);
      break;
    default:
      break;
  }
});

onMounted(() => {
  stepLoading.value = true;
  setTimeout(() => {
    store.dispatch("setStep", 41);
  }, 300);
  setTimeout(() => {
    stepLoading.value = false;
    endStep.value = true;
  }, 2000);
});
</script>

<template>
  <div class="sprint-backlog">
    <transition name="fadeIn">
      <div v-show="systemSetp > 10" class="inner" @click="onClickPage">
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
        <Message
          :class="textSteps[step].role"
          :width="textSteps[step].width"
          :height="textSteps[step].height"
          :role="textSteps[step].role"
          :content="textSteps[step].html"
          :showNext="textSteps[step].next"
        />
        <Message
          class="sub-message"
          :class="textSteps[step].roleSub"
          :width="textSteps[step].widthSub"
          :height="textSteps[step].heightSub"
          :role="textSteps[step].roleSub"
          :content="textSteps[step].htmlSub"
          :showNext="textSteps[step].next"
        />
        <Backlog v-if="step >= 2">
          <div
            class="backlog-content"
            @drop="handleDrop(null, 'product')"
            @dragover.prevent
          >
            <draggable
              :list="dragItams"
              :sort="false"
              item-key="id"
              class="backlog-list"
              draggable=".backlog-draggable"
              @start="handleDragStart($event, 'product')"
              @end="handleDragEnd($event, 'product')"
            >
              <template #item="{ element, index }">
                <div
                  class="backlog-list__item"
                  :class="{ 'backlog-draggable': element }"
                >
                  <div class="backlog-list__item-content">
                    <div class="point">
                      {{ element.point }}
                    </div>
                    <div class="text">
                      {{ element.text }}
                    </div>
                  </div>
                </div>
              </template>
            </draggable>
          </div>
        </Backlog>
        <Backlog
          v-if="step >= 2"
          type="sprint"
          title="開發Ａ組的短衝待辦清單"
          capation="Sprint Backlog"
        >
          <div class="backlog-content">
            <draggable
              :list="answer"
              :sort="false"
              item-key="id"
              class="backlog-list"
              draggable=".backlog-draggable"
              @start="handleDragStart($event, 'sprint')"
              @end="handleDragEnd($event, 'sprint')"
            >
              <template #item="{ element, index }">
                <div
                  class="backlog-list__item"
                  :class="{ 'backlog-draggable': element }"
                  @drop="handleDrop(index, 'sprint')"
                  @dragover.prevent
                >
                  <div class="backlog-list__item-content" v-if="element.text">
                    <div class="point">
                      {{ element.point }}
                    </div>
                    <div class="text">
                      {{ element.text }}
                    </div>
                  </div>
                </div>
              </template>
            </draggable>
            <div
              class="backlog-progress"
              :class="{ 'point-overflow': pointTotal > 20 }"
            >
              <div
                class="point-progress"
                :style="{
                  width: `${pointTotal > 20 ? 100 : (pointTotal / 20) * 100}%`,
                }"
              ></div>
              <div class="point-text">{{ `${pointTotal}/20(5人)` }}</div>
            </div>
          </div>
        </Backlog>
        <transition name="fade-in">
          <ClickPageMask
            v-show="endStep && textSteps[step].showClickPage"
            :hasMask="textSteps[step].hasMask"
          />
        </transition>
        <custom-btn
          v-if="endStep && textSteps[step].nextText"
          class="next-btn"
          :text="textSteps[step].nextText"
          :disabled="stepLoading || (step === 2 && !answerValid)"
          @click="handleNext"
        ></custom-btn>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.sprint-backlog {
  width: 100%;
  height: 100vh;
  min-height: 944px;
  position: relative;
  .message {
    top: 35px;
    left: 50px;
    &.sub-message {
      top: 400px;
      left: 330px;
    }
  }
  .backlog {
    top: 262px;
    left: 60px;
    &.sprint {
      left: 616px;
      .backlog-content {
        .backlog-list {
          height: 396px;
          &__item {
            border: 2px dashed $RoleTeam1;
          }
          &__item-content {
            border: 4px solid $RoleTeam1;
            .point {
              background-color: $RoleTeam1;
            }
          }
        }
      }
    }
    .backlog-content {
      position: relative;
      width: 480px;
      height: 100%;
      .backlog-list {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        padding: 32px 32px 32px 32px;
        &__item {
          width: 100%;
          height: 96px;
          border: 2px dashed $PrimaryDefault;
          border-radius: 20px;
          margin-bottom: 24px;
          &:last-of-type {
            margin-bottom: 0;
          }
        }
        &__item-content {
          width: calc(100% + 8px);
          height: calc(100% + 8px);
          padding: 12px 24px;
          background: $BgDark60;
          border: 4px solid $PrimaryDefault;
          backdrop-filter: blur(2px) brightness(0.6);
          border-radius: 20px;
          display: flex;
          align-items: center;
          font-size: 20px;
          line-height: 36px;
          margin-left: -4px;
          margin-top: -4px;
          .point {
            width: 50px;
            height: 50px;
            background-color: rgba(0, 255, 224, 0.7);
            border-radius: 100px;
            font-weight: 700;
            font-size: 32px;
            line-height: 50px;
            text-align: center;
            margin-right: 10px;
          }
          .text {
            width: calc(100% - 60px);
          }
        }
      }
      .backlog-progress {
        position: relative;
        margin: 39px 32px 0 32px;
        width: 416px;
        height: 24px;
        background-color: $RoleTeamDark;
        border-radius: 20px;
        padding: 4px;
        overflow: hidden;
        &.point-overflow {
          .point-progress {
            background-color: $DangerDefault;
          }
        }
        .point-progress {
          height: 100%;
          background-color: $RoleTeam1;
          border-radius: 20px;
        }
        .point-text {
          position: absolute;
          width: 100%;
          height: 100%;
          text-align: center;
          font-size: 16px;
          font-weight: 700;
          top: 0;
        }
      }
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