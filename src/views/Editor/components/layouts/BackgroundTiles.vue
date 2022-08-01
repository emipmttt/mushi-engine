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
      @click="setTileToPut(index)"
      @dblclick="removeTile(index)"
    />
    <div v-if="tileToPut" class="tile-to-put-config">
      Solid
      <input type="checkbox" v-model="tileToPut.solid" />
      <br />
      Liquid
      <input type="checkbox" v-model="tileToPut.liquid" />

      <img id="tileToPut" class="current-tile" :src="tileToPut.img" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
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
  },
};
</script>

<style lang="scss">
.tiles {
  display: inline-block;
  vertical-align: top;
  width: 336px;
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

.tile-to-put-config {
  position: fixed;
  right: 5px;
  bottom: 5px;
}
</style>