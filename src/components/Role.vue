<script setup>
import { ref, watch } from "vue";
import RolePO from "../assets/images/role/role_po.png";
import RolePOLight from "../assets/images/role/role_po_light.png";
import RoleMM from "../assets/images/role/role_sm.png";
import RoleMMLight from "../assets/images/role/role_sm_light.png";
import RoleTeam1 from "../assets/images/role/role_team1.png";
import RoleTeam1Light from "../assets/images/role/role_team1_light.png";
import RoleTeam2 from "../assets/images/role/role_team2.png";
import RoleTeam2Light from "../assets/images/role/role_team2_light.png";
let props = defineProps({
  role: String,
});
const visible = ref(true);
const roleItems = ref({
  po: {
    role: RolePO,
    light: RolePOLight,
  },
  mm: {
    role: RoleMM,
    light: RoleMMLight,
  },
  team1: {
    role: RoleTeam1,
    light: RoleTeam1Light,
  },
  team2: {
    role: RoleTeam2,
    light: RoleTeam2Light,
  },
});
watch(
  () => props.role,
  () => {
    visible.value = false;
    setTimeout(() => {
      visible.value = true;
    }, 10);
  }
);
</script>

<template>
  <div
    v-if="visible"
    class="role-wrapper"
    :class="(role, { bottom: role === 'mm' })"
  >
    <img class="hole" src="../assets/images/role/hole.png" />
    <img class="light" :src="roleItems[role].light" />
    <img class="role" :src="roleItems[role].role" />
  </div>
</template>

<style lang="scss" scoped>
.role-wrapper {
  position: absolute;
  width: 320px;
  height: 461px;
  z-index: 1;
  &.po {
    top: -3px;
    left: 33px;
  }
  &.mm {
    right: 33px;
    bottom: 25px;
  }
  &.team1 {
    top: -3px;
    right: 280px;
  }
  &.team2 {
    top: -3px;
    right: 10px;
  }
  &.team1,
  &.team2 {
    width: 260px;
    height: 370px;
    &:not(.bottom) {
      .role {
        left: 10px;
      }
      .light {
        width: 380px;
        left: -55px;
      }
    }
  }
  & > * {
    position: absolute;
    width: 100%;
    height: auto;
  }
  &.bottom {
    .hole {
      bottom: 0;
    }
    .light {
      opacity: 0;
      width: 467px;
      left: -73px;
      bottom: 14px;
      animation: light-bottom-enter 0.5s 0.5s linear forwards;
      transform-origin: bottom;
    }
    .role {
      opacity: 0;
      bottom: 14px;
      animation: role-bottom-enter 0.5s 0.5s linear forwards;
      transform-origin: bottom;
    }
  }
  &:not(.bottom) {
    .hole {
      animation: hole-enter 0.5s linear forwards;
    }
    .light {
      opacity: 0;
      width: 467px;
      left: -73px;
      top: 14px;
      animation: light-enter 0.5s 0.5s linear forwards;
      transform-origin: top;
    }
    .role {
      opacity: 0;
      top: 14px;
      animation: role-enter 0.5s 0.5s linear forwards;
      transform-origin: top;
    }
  }
}
</style>