<script setup>
import Message from "../components/Message.vue";
</script>

<template>
  <div class="start-page">
    <div class="inner">
      <img class="leaf-t" src="../assets/images/bg/bg_leafDark_4_t.png" />
      <img class="leaf-b" src="../assets/images/bg/bg_leafDark_2_b.png" />
      <img class="leaf-l" src="../assets/images/bg/bg_leafDark_1_l.png" />
      <img class="leaf-r" src="../assets/images/bg/bg_leafDark_3_r.png" />
      <img
        class="leaf-tint-lb"
        src="../assets/images/bg/bg_leafTint_2_lb.png"
      />
      <img class="leaf-tint-t" src="../assets/images/bg/bg_leafTint_3_t.png" />
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
      <custom-btn text="進入村莊"></custom-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.start-page {
  width: 100%;
  height: 100vh;
  .inner {
    background-color: $BgDark;
    & > * {
      position: absolute;
      margin: auto;
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