<script setup>
defineProps({
  color: String,
  width: Number,
  height: Number,
  role: String,
});
</script>

<template>
  <div
    class="message"
    :class="{ primary: color === 'primary' }"
    :style="{ width: `${width}px`, height: `${height}px` }"
  >
    <div class="message-role">{{ role }}</div>
    <div class="message-content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.message {
  box-shadow: 0px 0px 24px 8px rgba(0, 255, 224, 0.8),
    0px 0px 8px 8px rgba(0, 255, 224, 0.95);
  backdrop-filter: blur(5px);
  padding: 40px 32px 40px 100px;

  &.primary {
    background: $PrimaryLinear;
    border: 2px solid $PrimaryDefault;
    border-radius: 20px 40px 40px 40px;
  }
  .message-content {
    width: 100%;
    height: 100%;
  }
}
</style>