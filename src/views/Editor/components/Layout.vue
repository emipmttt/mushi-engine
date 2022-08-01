<template>
  <div class="layout">
    <!-- SCREENS -->
    <div @click="updateCurrentLayout('SC')" class="layout__button">SC</div>
    <!-- TILES -->
    <div @click="updateCurrentLayout('TL')" class="layout__button">TL</div>
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
    ...mapActions(["save"]),
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