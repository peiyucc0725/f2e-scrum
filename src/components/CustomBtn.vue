<script setup>
defineProps({
  text: String,
  disabled: Boolean,
  contantClass: String,
});
</script>

<template>
  <button
    class="custom-btn"
    :class="{ disabled }"
    :disabled="disabled"
    v-bind="$attrs"
  >
    <div>{{ text }}</div>
  </button>
</template>

<style lang="scss" scoped>
.custom-btn {
  height: 65px;
  color: $TextDefault;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.2em;
  opacity: 0.9;
  border-radius: 40px;
  border-width: 0;
  padding: 12px 48px;
  background: linear-gradient(0deg, rgba(0, 255, 224, 0) 0%, #00ffe0 100%),
    #008d96;
  box-shadow: 0px 5px 0px $PrimaryDefault;
  &.disabled {
    background: linear-gradient(
        0deg,
        rgba(238, 238, 238, 0) 0%,
        #dddddd 100%,
        #eeeeee 100%
      ),
      #555555;
    box-shadow: 0px 5px 0px #bbbbbb;
    &:hover {
      box-shadow: 0px 2px 0px #bbbbbb;
    }
  }
  &:hover {
    transition: 0.3s;
    box-shadow: 0px 2px 0px $PrimaryDefault;
    transform: translateY(3px);
  }
}
</style>