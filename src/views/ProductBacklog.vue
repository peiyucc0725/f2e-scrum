<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import Role from "../components/Role.vue";
import Message from "../components/Message.vue";
const store = useStore();
const textSteps = [
  {
    html: "<span>\\ 碰 / </span>我是短衝小精靈 ， 開發 A 組的 PO 。<br /><span>PO 也就是產品負責人（Product Owner）</span> ， 產品負責人會負責評估產品待辦清單的價值與重要性 ， 依序排列要執行的優先順序 ， 對齊產品目標 。 最後排出產品待辦清單 （ProductBacklog） 唷 ！",
  },
];
const systemSetp = computed(() => {
  return store.state.step;
});
onMounted(() => {
  store.dispatch("setStep", 11);
});
</script>

<template>
  <div class="product-backlog">
    <transition name="fade">
      <div v-show="systemSetp > 10" class="inner">
        <div class="background"></div>
        <Role role="po" />
        <Message :width="997" :height="224" role="po" :content="textSteps[0].html">
        </Message>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.product-backlog {
  width: 100%;
  height: 100vh;
  position: relative;
  .role-wrapper {
    top: -10px;
    left: 33px;
  }
  .message {
    top: 40px;
    right: 40px;
  }
}
</style>