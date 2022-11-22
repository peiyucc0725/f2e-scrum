<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import Loading from "./Loading.vue";
const store = useStore();
// start, startEnd, intro, end
const step = ref("start");
const systemSetp = computed(() => {
  return store.state.step;
});
const handleStart = () => {
  step.value = "startEnd";
  setTimeout(() => {
    step.value = "intro";
  }, 1000);
};
const handleEnd = () => {
  step.value = "end";
  setTimeout(() => {
    store.dispatch("setStep", 10);
  }, 1000);
};
</script>

<template>
  <div class="start-page">
    <div class="loading-step" v-if="systemSetp === 0">
      <Loading />
    </div>
    <transition name="fade">
      <div
        v-show="systemSetp !== 0"
        class="inner"
        :class="{ end: step === 'end' }"
      >
        <img class="leaf-t" src="../assets/images/bg/bg_leafDark_4_t.png" />
        <img class="leaf-b" src="../assets/images/bg/bg_leafDark_2_b.png" />
        <img class="leaf-l" src="../assets/images/bg/bg_leafDark_1_l.png" />
        <img class="leaf-r" src="../assets/images/bg/bg_leafDark_3_r.png" />
        <div
          v-if="step === 'start' || step === 'startEnd'"
          class="step-start"
          :class="{ end: step === 'startEnd' }"
        >
          <img
            class="leaf-tint-lb"
            src="../assets/images/bg/bg_leafTint_2_lb.png"
          />
          <img
            class="leaf-tint-t"
            src="../assets/images/bg/bg_leafTint_3_t.png"
          />
          <img
            class="leaf-tint-rb"
            src="../assets/images/bg/bg_leafTint_4_rb.png"
          />
          <img
            class="leaf-tint-lt"
            src="../assets/images/bg/bg_leafTint_1_lt.png"
          />
          <img class="logo" src="../assets/images/logo/logo_hole.png" />
          <div class="title">深入敏捷の村一探究竟！</div>
          <custom-btn
            class="start-btn"
            text="進入村莊"
            @click="handleStart"
          ></custom-btn>
        </div>
        <transition name="fade">
          <div
            class="step-intro"
            :class="{ visible: step === 'intro' }"
            v-show="step === 'intro' || step === 'introEnd'"
          >
            <div class="intro-box">
              <div class="role">
                <svg
                  width="149"
                  height="52"
                  viewBox="0 0 149 52"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 8L0 0V44L10 52V8Z" fill="#005656" />
                  <rect width="149" height="44" fill="#00FFE0" />
                </svg>
                <div class="role-name">(謎之音)</div>
              </div>
              <div class="message">
                呦呼 ， 歡迎進入 「SCRUM 新手村」 ， 在正式加入專案開發之前
                ，<br />
                需要請你先了解 Scrum 的流程與精神 ！ <br /><br />
                請接受挑戰任務 ， 成功通過 Scrum 新手村的挑戰任務吧～
              </div>
            </div>
            <custom-btn
              class="intro-btn"
              text="接受挑戰"
              @click="handleEnd"
            ></custom-btn>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.start-page {
  width: 100%;
  height: 100vh;
  position: relative;
  .loading-step {
    width: 100%;
    height: 100%;
  }
  .inner {
    & > * {
      position: absolute;
      margin: auto;
    }
    &.end {
      .step-intro {
        animation: ending-intro 0.5s linear forwards;
        @keyframes ending-intro {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      }
      .leaf-l {
        animation: ending-l 0.5s 0.5s linear forwards;
        @keyframes ending-l {
          0% {
            transform: translate(0);
          }
          100% {
            transform: translate(-100%, 0);
          }
        }
      }
      .leaf-r {
        animation: ending-r 0.5s 0.5s linear forwards;
        @keyframes ending-r {
          0% {
            transform: translate(0);
          }
          100% {
            transform: translate(100%, 0);
          }
        }
      }
      .leaf-t {
        animation: ending-t 0.5s 0.5s linear forwards;
        @keyframes ending-t {
          0% {
            transform: translate(0);
          }
          100% {
            transform: translate(0, -100%);
          }
        }
      }
      .leaf-b {
        animation: ending-b 0.5s 0.5s linear forwards;
        @keyframes ending-b {
          0% {
            transform: translate(0);
          }
          100% {
            transform: translate(0, 100%);
          }
        }
      }
    }
    .step-start {
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      & > * {
        position: absolute;
        margin: auto;
      }
      &.end {
        .logo,
        .title,
        .start-btn {
          animation: ending-title 0.5s linear forwards;
          @keyframes ending-title {
            0% {
              opacity: 1;
            }
            100% {
              opacity: 0;
            }
          }
        }
        .leaf-tint-lt {
          animation: ending-tint-lt 0.5s 0.5s linear forwards;
          @keyframes ending-tint-lt {
            0% {
              transform: translate(0);
            }
            100% {
              transform: translate(-100%, -100%);
            }
          }
        }
        .leaf-tint-rb {
          animation: ending-tint-rb 0.5s 0.5s linear forwards;
          @keyframes ending-tint-rb {
            0% {
              transform: translate(0);
            }
            100% {
              transform: translate(100%, 100%);
            }
          }
        }
        .leaf-tint-lb {
          animation: ending-tint-lb 0.5s 0.5s linear forwards;
          @keyframes ending-tint-lb {
            0% {
              transform: translate(0);
            }
            100% {
              transform: translate(-100%, 100%);
            }
          }
        }
        .leaf-tint-t {
          animation: ending-tint-t 0.5s 0.5s linear forwards;
          @keyframes ending-tint-t {
            0% {
              transform: translate(0);
            }
            100% {
              transform: translate(0, -100%);
            }
          }
        }
      }
    }
    .step-intro {
      width: 100%;
      height: 536px;
      top: 0;
      bottom: 0;
      margin: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      &.visible {
        .message {
          animation: show-message 1s 0.5s linear forwards;
          @keyframes show-message {
            0% {
              height: 0;
            }
            100% {
              height: 166px;
            }
          }
        }
        .intro-btn {
          animation: show-btn 0.5s 1.5s linear forwards;
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
      .intro-box {
        width: 908px;
        height: 430px;
        background-color: $BgDark60;
        box-shadow: 0px 0px 8px 0 rgba(0, 255, 224, 0.8),
          0px 0px 8px 0 rgba(0, 255, 224, 0.95);
        backdrop-filter: blur(5px);
        border: 2px solid #00ffe0;
        border-radius: 80px;
        display: flex;
        justify-content: center;
        .role {
          position: absolute;
          left: -10px;
          top: 40px;
          width: 151.96px;
          height: 52px;
          svg {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: -1;
          }
          .role-name {
            text-align: center;
            font-size: 24px;
            line-height: 43px;
          }
        }
        .message {
          height: 0;
          margin-top: 144px;
          font-size: 24px;
          line-height: 43px;
          letter-spacing: 0.05em;
          color: $TextDefault;
          overflow: hidden;
        }
      }
      .intro-btn {
        opacity: 0;
      }
    }
  }
  .leaf-l {
    left: 0;
    width: auto;
    height: 100%;
  }
  .leaf-r {
    right: 0;
    width: auto;
    height: 100%;
  }
  .leaf-t {
    top: 0;
    left: 0;
    right: 0;
    width: 60%;
    height: auto;
  }
  .leaf-b {
    bottom: 0;
    left: 0;
    right: 0;
    width: 60%;
    height: auto;
  }
  .leaf-tint-lt {
    left: 0;
    top: 0;
    width: auto;
    height: 60%;
  }
  .leaf-tint-rb {
    bottom: 0;
    right: 0;
    width: auto;
    height: 60%;
  }
  .leaf-tint-lb {
    left: 0;
    bottom: 0;
    width: 60%;
    height: auto;
  }
  .leaf-tint-t {
    top: 0;
    right: 10%;
    width: 55%;
    height: auto;
  }
  .logo {
    width: 1000px;
    height: 735.95px;
    top: calc(50% - 735.95px / 2 - 50px);
    left: 0;
    right: 0;
  }
  .title {
    width: fit-content;
    font-weight: 700;
    font-size: 32px;
    line-height: 150%;
    color: $TextDefault;
    top: calc(50% - 735.95px / 2 - 50px + 521px);
    left: 0;
    right: 0;
  }
  .custom-btn {
    width: fit-content;
    top: calc(50% - 735.95px / 2 - 50px + 521px + 48px + 17px);
    left: 0;
    right: 0;
  }
}
</style>