<template>
  <div class="screen" @scroll="setScroll">
    <img
      v-for="(tile, index) in specialTiles"
      :key="index"
      :src="tile.directions?.static || tile.img"
      draggable="false"
      :style="`
        margin-top:${tile.y - scroll.y}px;
        margin-left:${tile.x - scroll.x}px;
        z-index:${tile.x + tile.y}
      `"
      :class="removing ? 'selected-tile' : '' + ' tile-item'"
      @mouseup="handleMouseUp"
      @click="removeTileST(tile.x, tile.y)"
      @mousemove="setMousePosition"
      @contextmenu="
        (e) => {
          customContext(e, index);
        }
      "
    />
    <canvas
      class="canvas"
      :width="screen.data.width + 'px'"
      :height="screen.data.height + 'px'"
      ref="canvas"
      id="canvas"
      @mousedown="handleMouseDown"
      @mouseup="handleMouseUp"
      @mousemove="
        (e) => {
          handleMouseMove(e);
          setMousePosition(e);
        }
      "
      @dblclick="removeTileBG"
    ></canvas>
    <br />
    <img
      v-if="editing"
      :style="`
        position: absolute;
        left:${mouseX}px;
        top:${mouseY}px;
        z-index:99999;
        opacity:.7
      `"
      id="tileToPutPreview"
      :src="tileToPut.directions?.static || tileToPut.img"
      @mousedown="handleMouseDown"
      @mouseup="handleMouseUp"
      @mousemove="
        (e) => {
          handleMouseMove(e);
          setMousePosition(e);
        }
      "
      draggable="false"
    />
    <!-- {{ currentScreen }} -->
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { calculateMousePosition } from "../../../utils/calculateMousePosition";
export default {
  props: {
    screen: Object,
  },
  data() {
    return {
      intervalSetItem: false,
      scroll: { x: 0, y: 0 },
      mouseX: 0,
      mouseY: 0,

      editing: true,
      removing: false,
    };
  },
  computed: {
    ...mapState([
      "gameData",
      "tileToPut",
      "currentLayout",
      "currentScreen",
      "currentScreenIndex",
      "itemToCode",
    ]),
    specialTiles() {
      return this.gameData.screens[this.currentScreenIndex].data.specialTiles;
    },
  },
  methods: {
    ...mapMutations([
      "addSpecialTile",
      "removeSpecialTile",
      "updateCurrentLayout",
      "setItemToCode",
    ]),

    setScroll(e) {
      this.scroll = {
        x: e.target.scrollLeft,
        y: e.target.scrollTop,
      };
    },
    handleMouseDown(e) {
      this.intervalSetItem = true;
      this.putTile(e);
    },
    handleMouseUp() {
      this.intervalSetItem = false;
    },
    handleMouseMove(e) {
      if (this.intervalSetItem) {
        if (this.removing) {
          this.removeTileBG(e);
        } else {
          this.putTile(e);
        }
      }
    },

    removeTileST(x, y) {
      if (this.removing) {
        this.removeSpecialTile({ x, y });
        this.$forceUpdate();
      }
    },
    putTile(e) {
      if (
        this.tileToPut.solid ||
        this.tileToPut.liquid ||
        this.tileToPut.options
      ) {
        this.putTileST(e);
      } else {
        this.putTileBG(e);
      }
    },
    putTileST(e) {
      const { counterX, counterY } = calculateMousePosition(e);

      this.addSpecialTile({
        ...this.tileToPut,
        x: counterX - 64,
        y: counterY - 64,
      });
      this.$forceUpdate();
    },
    putTileBG(e) {
      const tileToPut = document.querySelector("#tileToPut");

      if (tileToPut) {
        const ctx = this.$refs.canvas.getContext("2d");
        const { counterX, counterY } = calculateMousePosition(e);
        ctx.drawImage(tileToPut, counterX - 64, counterY - 64);
      }
    },
    removeTileBG(e) {
      const ctx = this.$refs.canvas.getContext("2d");
      const { counterX, counterY } = calculateMousePosition(e);

      ctx.clearRect(counterX - 64, counterY - 64, 64, 64);
    },

    setMousePosition(event) {
      const { counterX, counterY } = calculateMousePosition(event);
      this.mouseX = counterX + 400 - 64;
      this.mouseY = counterY - 64;
    },

    setBackground() {
      const img = document.createElement("img");
      img.src = this.currentScreen.data.background;
      const canvas = document.querySelector("#canvas");
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      setTimeout(() => {
        canvas.getContext("2d").drawImage(img, 0, 0);
      }, 10);
    },

    customContext(e, index) {
      e.preventDefault();
      this.updateCurrentLayout("CD");
      setTimeout(() => {
        this.setItemToCode(index);
      }, 10);
    },
  },
  mounted() {
    this.setBackground();
    document.addEventListener("keypress", (event) => {
      switch (event.key) {
        case "e":
          this.editing = !this.editing;
          this.removing = false;

          break;
        case "r":
          this.removing = !this.removing;
          this.editing = false;

          break;

        default:
          break;
      }
    });
  },
};
</script>

<style>
.screen {
  display: inline-block;

  width: calc(100vw - 440px);
  height: calc(100vh - 15px);
  overflow: scroll;
}

.canvas {
  background: #444;
}

.selected-tile:hover {
  filter: brightness(200%);
}

.tile-item {
  user-select: none;
  position: absolute;
  top: 0;
  left: 400px;
}

.tile-item:hover {
  filter: brightness(130%);
}
</style>