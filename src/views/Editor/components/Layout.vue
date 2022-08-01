<template>
  <div class="layout">
    <!-- SCREENS -->
    <div @click="updateCurrentLayout('SC')" class="layout__button">SC</div>
    <!-- BACKGROUND -->
    <div @click="updateCurrentLayout('BG')" class="layout__button">BG</div>
    <!-- SOLID TERRAIN -->
    <div @click="updateCurrentLayout('ST')" class="layout__button">ST</div>
    <!-- OBJECTS -->
    <div @click="updateCurrentLayout('OB')" class="layout__button">OB</div>
    <!-- CHARACTERS -->
    <div @click="updateCurrentLayout('CH')" class="layout__button">CH</div>
    <!-- CODE -->
    <div @click="updateCurrentLayout('CD')" class="layout__button">CD</div>
    <!-- SAVE -->
    <div @click="save" class="layout__button">SV</div>
  </div>
</template>



<script>
import { mapActions, mapMutations } from "vuex";

export default {
  methods: {
    ...mapMutations(["updateCurrentLayout"]),
    ...mapActions(["save"])
  },
};
</script>

<style lang="scss">
.layout {
  width: 64px;
  background: #222;
  height: 100vh;
  display: inline-block;

  &__button {
    width: 64px;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.1s;
    cursor: pointer;
  }
  &__button:hover {
    background: #444;
  }
}
</style>