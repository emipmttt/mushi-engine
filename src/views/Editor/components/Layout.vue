<template>
  <div class="layout">
    <!-- SCREENS -->
    <div @click="updateCurrentLayout('SC')" class="layout__button">SC</div>
    <!-- TILES -->
    <div @click="updateCurrentLayout('TL')" class="layout__button">TL</div>
    <!-- CHARACTER -->
    <div @click="updateCurrentLayout('CH')" class="layout__button">CH</div>
    
    <!-- CODE -->
    <!-- <div @click="updateCurrentLayout('CD')" class="layout__button">CD</div> -->

    <!-- SAVE -->
    <div @click="updateBackground" class="layout__button">SV</div>
    <!-- PLAY -->
    <div @click="play" class="layout__button">
      <img :src="require('../../../assets/icons/play.png')" />
    </div>
  </div>
</template>



<script>
import { mapActions, mapMutations } from "vuex";

export default {
  methods: {
    ...mapMutations(["updateCurrentLayout"]),
    ...mapActions(["save", "findAndUpdateScreenBackground"]),
    updateBackground() {
      const canvas = document.querySelector("#canvas");
      if (canvas) {
        const image = canvas.toDataURL("image/png");
        this.findAndUpdateScreenBackground(image);
        this.save();
      }
    },
  play() {},

  },
};
</script>

<style lang="scss">
.layout {
  width: 64px;
  background: #222;
  height: calc(100vh - 15px);

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