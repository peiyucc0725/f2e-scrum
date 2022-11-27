<script setup>
import { ref, reactive, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import Role from "../components/Role.vue";
import Message from "../components/Message.vue";
import ClickPageMask from "../components/ClickPageMask.vue";

const store = useStore();
const step = ref(0);
const stepLoading = ref(false);
const endStep = ref(false);
const correct = reactive([2, 1]);
const checkAnswer = ref(true);
const textSteps = reactive([
  {
    role: "team2",
    html: "嗚啊啊新來的 ， 你真的很幸運 ， 今天剛好是開發 B 組的 Retro ， 你也來見識一下 ，  看看 Retro 都該做些什麼吧～～ ",
    height: 152,
    width: 1070,
    showClickPage: false,
    clickPage: true,
    next: true,
    nextText: "",
  },
  {
    role: "team2",
    html: "我們會在會議裡請團隊成員提出哪些是做得好的地方 、 哪些可以繼續改善的地方 ？ 並記錄再 Confluence 中 。 Retro 重點在於「正面表述」， 你也思考看看 ， 哪一些是適合 Retro 的回饋呢 ？",
    height: 162,
    width: 1070,
    showClickPage: false,
    clickPage: false,
    next: false,
    nextText: "我選好了",
  },
  {
    role: "team2",
    html: "<h2>太酷ㄌ吧 ， 根本天才 ， 畢業之後不要忘記我唷>< !</h2>",
    height: 128,
    width: 1070,
    showClickPage: true,
    clickPage: true,
    next: true,
    nextText: "",
    hasMask: true,
  },
]);

const answer = reactive([0, 0]);
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
  if (step.value === 1) {
    const ans = answer.map((item) => item).join("");
    checkAnswer.value = ans === "21";
    if (!checkAnswer.value) return;
  } else if (step.value === 2) {
    store.dispatch("setStep", 100);
    return;
  }
  endStep.value = false;
  stepLoading.value = true;
  step.value++;
};
const handleSelected = (index, ans) => {
  checkAnswer.value = true;
  answer[index] = ans;
};
const answerValid = computed(() => {
  const EmptyNum = answer.filter((item) => item === 0);
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
      }, 1800);
      break;
    case 2:
      setTimeout(() => {
        stepLoading.value = false;
        endStep.value = true;
      }, 2000);
      break;
    default:
      break;
  }
});

onMounted(() => {
  stepLoading.value = true;
  setTimeout(() => {
    store.dispatch("setStep", 86);
  }, 300);
  setTimeout(() => {
    stepLoading.value = false;
    endStep.value = true;
  }, 2000);
});
</script>

<template>
  <div class="retro-page">
    <transition name="fadeIn">
      <div v-show="systemSetp > 85" class="inner" @click="onClickPage">
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
        <div class="retro-wrapper" v-if="step >= 1">
          <div class="retro-ques">
            <div class="retro-ques__title">Q1.做得好的地方?</div>
            <div class="retro-ques__content">
              <div class="retro-ques__role">
                <div class="role-img-wrapper">
                  <img class="hole-img" src="../assets/images/role/hole.png" />
                  <img
                    class="light-img"
                    src="../assets/images/role/role_sm_light.png"
                  />
                  <img
                    class="role-img"
                    src="../assets/images/role/role_sm.png"
                  />
                </div>
                <div
                  class="role-radio"
                  :class="{
                    selected: answer[0] === 1,
                    error: !checkAnswer && answer[0] !== 2,
                  }"
                  @click="handleSelected(0, 1)"
                ></div>
                <div class="role-text">這次我幫了很多人救火耶～</div>
              </div>
              <div class="retro-ques__role">
                <div class="role-img-wrapper">
                  <img class="hole-img" src="../assets/images/role/hole.png" />
                  <img
                    class="light-img"
                    src="../assets/images/role/role_po_light.png"
                    style="transform: rotate(180deg)"
                  />
                  <img
                    class="role-img"
                    src="../assets/images/role/role_po.png"
                    style="transform: rotate(180deg)"
                  />
                </div>
                <div
                  class="role-radio"
                  :class="{ selected: answer[0] === 2 }"
                  @click="handleSelected(0, 2)"
                ></div>
                <div class="role-text">
                  大家在開發上都會互相 cover ， 讓任務都有準在時間內完成 。
                </div>
              </div>
            </div>
          </div>
          <div class="retro-ques">
            <div class="retro-ques__title">Q2.有哪些可以做得更好？</div>
            <div class="retro-ques__content">
              <div class="retro-ques__role">
                <div class="role-img-wrapper">
                  <img class="hole-img" src="../assets/images/role/hole.png" />
                  <img
                    class="light-img"
                    src="../assets/images/role/role_team1_light.png"
                    style="transform: rotate(180deg)"
                  />
                  <img
                    class="role-img"
                    src="../assets/images/role/role_team1.png"
                    style="transform: rotate(180deg)"
                  />
                </div>
                <div
                  class="role-radio"
                  :class="{ selected: answer[1] === 1 }"
                  @click="handleSelected(1, 1)"
                ></div>
                <div class="role-text">
                  可以記錄這次的開發時間 ， 讓預估團隊點數可以更精準 。
                </div>
              </div>
              <div class="retro-ques__role">
                <div class="role-img-wrapper">
                  <img class="hole-img" src="../assets/images/role/hole.png" />
                  <img
                    class="light-img"
                    src="../assets/images/role/role_team2_light.png"
                    style="transform: rotate(180deg)"
                  />
                  <img
                    class="role-img"
                    src="../assets/images/role/role_team2.png"
                    style="transform: matrix(1, 0, 0, -1, 0, 0)"
                  />
                </div>
                <div
                  class="role-radio"
                  :class="{
                    selected: answer[1] === 2,
                    error: !checkAnswer && answer[1] !== 1,
                  }"
                  @click="handleSelected(1, 2)"
                ></div>
                <div class="role-text">
                  開發時間預估不準確 ， 請後端下次改進 ， 避免 delay 到我 。
                </div>
              </div>
            </div>
          </div>
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
          :disabled="stepLoading || (step === 1 && !answerValid)"
          @click="handleNext"
        ></custom-btn>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.retro-page {
  width: 100%;
  height: 100vh;
  min-height: 944px;
  position: relative;
  .role-wrapper.team2 {
    right: 10px;
  }
  .message {
    top: 35px;
    left: 50px;
  }
  .retro-wrapper {
    position: absolute;
    width: 1200px;
    height: 494px;
    left: 120px;
    top: 254px;
    display: flex;
    justify-content: space-between;
    opacity: 0;
    animation: enter .8s .2s linear forwards;
    .retro-ques {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 540px;
      &__title {
        width: max-content;
        height: 56px;
        background-color: $PrimaryDefault;
        font-size: 32px;
        font-weight: 700;
        color: $BgDark;
        text-align: center;
        padding: 4px 32px;
      }
      &__content {
        width: 540px;
        display: flex;
        justify-content: space-between;
      }
      &__role {
        width: 260px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .role-img-wrapper {
          position: relative;
          width: 240px;
          height: 238px;
          opacity: 0;
          animation: slide-enter 0.5s 0.8s linear forwards;
          @keyframes slide-enter {
            0% {
              opacity: 0;
              transform: translateY(100%);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          img {
            position: absolute;
            bottom: 0;
            &.role-img {
              left: 38.03px;
            }
            &.hole-img {
              left: 37px;
              bottom: -3px;
            }
          }
        }
        .role-radio {
          width: 28px;
          height: 28px;
          background: $BgDark60;
          border: 3px solid $PrimaryDefault;
          border-radius: 50%;
          margin: 20px;
          cursor: pointer;
          position: relative;
          &.error {
            border: 3px solid $DangerDefault;
            &:after {
              background: $DangerDefault !important;
            }
          }
          &.selected {
            &:after {
              position: absolute;
              top: 4px;
              left: 4px;
              content: "";
              width: 14px;
              height: 14px;
              border-radius: 50%;
              background: $PrimaryDefault;
            }
          }
        }
        .role-text {
          width: 260px;
          height: 132px;
          background: $BgDark60;
          border: 4px solid $TextTint;
          backdrop-filter: blur(5px);
          border-radius: 20px;
          color: $TextDefault;
          padding: 12px 20px;
          font-size: 20px;
          line-height: 32px;
          text-align: center;
        }
      }
    }
    .role-img {
      width: 164.45px;
      height: auto;
    }
    .light-img {
      width: 240px;
      height: auto;
    }
    .hole-img {
      width: 166.51px;
      height: auto;
    }
    @keyframes enter {
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