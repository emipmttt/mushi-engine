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
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
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
    ...mapState(["gameDate", "tileToPut"]),
  },
  methods: {
    ...mapActions(["findAndUpdateScreenBackground"]),
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

  width: calc(100vw - 420px);
  height: 100vh;
}

.canvas {
  background: #444;
}
</style>