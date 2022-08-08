<template>
  <div class="tiles">
    <label>
      <div class="tiles__button">Create</div>
      <input style="display: none" @change="createTile" type="file" multiple />
    </label>
    <img
      v-for="(tile, index) in gameData.tiles"
      :key="index"
      class="tiles__button--tile"
      :src="tile.img"
      draggable="true"
      @dragover="(e) => e.preventDefault()"
      @drop="replaceTile(index)"
      @dragstart="setTileToReplace(index)"
      @click="
        setTileToPut(index);
        pressKey();
      "
      @dblclick="removeTile(index)"
    />
    <div v-if="tileToPut" class="tile-to-put-config">
      <div
        class="selection-tile"
        :style="
          tileToPut.liquid
            ? 'background-color: #5dace1;color:white '
            : 'background-color: #333;color:white;'
        "
        @click="tileToPut.liquid = !tileToPut.liquid"
      >
        Liquid
      </div>
      <div
        class="selection-tile"
        :style="
          tileToPut.solid
            ? 'background-color: #5dace1;color:white '
            : 'background-color: #333;color:white;'
        "
        @click="tileToPut.solid = !tileToPut.solid"
      >
        Solid
      </div>

      <img id="tileToPut" class="current-tile" :src="tileToPut.img" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      mouseX: 0,
      mouseY: 0,
    };
  },
  computed: {
    ...mapState(["gameData", "tileToPut"]),
  },
  methods: {
    ...mapActions(["createTile", "replaceTile"]),
    ...mapMutations([
      "updateCurrentScreen",
      "setTileToReplace",
      "setTileToPut",
      "removeTile",
    ]),
    pressKey() {
      // document.dispatchEvent(new KeyboardEvent("keypress", { key: "e" }));
    },
  },
};
</script>

<style lang="scss">
.tiles {
  display: inline-block;
  vertical-align: top;
  width: 336px;
  overflow-y: scroll;
  height: 98vh;
  &__button {
    padding: 20px;
    cursor: pointer;
  }
  &__button:hover {
    background: #444;
  }

  &__button--input {
    background: none;
    color: white;
    border: none;
  }

  &__button--tile {
    cursor: pointer;
  }
  &__button--tile:hover {
    filter: brightness(110%);
  }
}

.current-tile {
  border-radius: 15px;
  border: solid 1px grey;
}

.selection-tile {
  border-radius: 15px;
  border: solid 1px grey;
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tile-to-put-config {
  position: fixed;
  right: 5px;
  bottom: 5px;
}
</style>