<script setup>
import { ref } from "vue";
import RolePO from '../assets/images/role/role_po.png'
import RolePOLight from '../assets/images/role/role_po_light.png'
import RoleTeam1 from '../assets/images/role/role_team1.png'
import RoleTeam1Light from '../assets/images/role/role_team1_light.png'
import RoleTeam2 from '../assets/images/role/role_team2.png'
import RoleTeam2Light from '../assets/images/role/role_team2_light.png'
defineProps({
  role: String,
});
const roleItems = ref({
  po: {
    role: RolePO,
    light: RolePOLight
  },
  team1: {
    role: RoleTeam1,
    light: RoleTeam1Light
  },
  team2: {
    role: RoleTeam2,
    light: RoleTeam2Light
  },

})
</script>

<template>
  <div class="role-wrapper">
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
  & > * {
    position: absolute;
    width: 100%;
    height: auto;
  }
  .hole {
    animation: hole-enter 0.5s linear forwards;
  }
  .light {
    opacity: 0;
    width: 467px;
    left: -73px;
    top: 14px;
    animation: light-enter .5s .5s linear forwards;
    transform-origin: top;
  }
  .role {
    opacity: 0;
    top: 14px;
    animation: role-enter .5s .5s linear forwards;
    transform-origin: top;
  }
  @keyframes hole-enter {
    0% {
      transform: scaleX(0);
    }
    100% {
      transform: scaleX(1);
    }
  }
  @keyframes light-enter {
    0% {
      opacity: 0.5;
      transform: scaleY(1) translateY(-50%);
    }
    50% {
      opacity: 1;
      transform: scaleY(1) translateY(0);
    }
    100% {
      opacity: 1;
      transform: scaleY(1) translateY(0);
    }
  }
  @keyframes role-enter {
    0% {
      opacity: 0.5;
      transform: scaleY(1) translateY(-50%);
    }
    50% {
      opacity: 1;
      transform: scaleY(1) translateY(0);
    }
    75% {
      opacity: 1;
      transform: scaleY(1.3) translateY(0);
    }
    100% {
      opacity: 1;
      transform: scaleY(1) translateY(0);
    }
  }
}
</style>