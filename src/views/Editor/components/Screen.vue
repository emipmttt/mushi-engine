<template>
  <div class="screen">
    <canvas
      class="canvas"
      :width="screen.data.width + 'px'"
      :height="screen.data.height + 'px'"
      ref="canvas"
      id="canvas"
      @mousedown="handleMouseDown"
      @mouseup="handleMouseUp"
      @mousemove="handleMouseMove"
    ></canvas>
    <br />
    {{ currentScreen }}
    <img
      v-for="(tile, index) in gameData.screens[currentScreenIndex].data
        .specialTiles"
      :key="index"
      :src="tile.img"
      draggable="false"
      :style="`user-select:none;position:absolute;top:${tile.y}px;left:${tile.x}px`"
    />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  props: {
    screen: Object,
  },
  data() {
    return {
      intervalSetItem: false,
    };
  },
  computed: {
    ...mapState([
      "gameData",
      "tileToPut",
      "currentLayout",
      "currentScreen",
      "currentScreenIndex",
    ]),
  },
  methods: {
    ...mapActions(["findAndUpdateScreenBackground"]),
    ...mapMutations(["addSpecialTile"]),
    handleMouseDown(e) {
      this.intervalSetItem = true;
      this.putTile(e);
    },
    handleMouseUp() {
      this.intervalSetItem = false;
    },
    handleMouseMove(e) {
      if (this.intervalSetItem) {
        this.putTile(e);
      }
    },

    putTile(e) {
      if (this.tileToPut.solid || this.tileToPut.liquid) {
        this.putTileST(e);
      } else {
        this.putTileBG(e);
      }
    },
    putTileST(e) {
      const mouseX = parseInt(e.clientX + window.scrollX);
      let counterX = 0;
      const mouseY = parseInt(e.clientY + window.scrollY);
      let counterY = 0;

      while (counterX < mouseX) {
        counterX += 64;
      }

      while (counterY < mouseY) {
        counterY += 64;
      }

      this.addSpecialTile({
        ...this.tileToPut,
        x: counterX,
        y: counterY,
      });
      this.$forceUpdate();
    },
    putTileBG(e) {
      const ctx = this.$refs.canvas.getContext("2d");
      const mouseX = parseInt(e.clientX + window.scrollX);
      let counterX = 0;
      const mouseY = parseInt(e.clientY + window.scrollY);
      let counterY = 0;

      while (counterX < mouseX) {
        counterX += 64;
      }

      while (counterY < mouseY) {
        counterY += 64;
      }

      ctx.drawImage(
        document.querySelector("#tileToPut"),
        counterX - 64 - 385,
        counterY - 64
      );

      var image = this.$refs.canvas.toDataURL("image/png");
      this.findAndUpdateScreenBackground(image);
    },
  },
};
</script>

<style>
.screen {
  display: inline-block;

  width: calc(100vw - 440px);
  height: 100vh;
  overflow: scroll;
}

.canvas {
  background: #444;
}
</style>