import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentLayout: "",
    currentScreen: {},
    currentScreenIndex: 0,
    tileToReplace: 0,
    tileToReplaceIndex: 0,
    tileToPut: 0,
    gameData: {
      primaryScreen: 0,
      screens: [],
      tiles: [],
    },
  },
  mutations: {
    loadState(state, value) {
      state.currentLayout = value.currentLayout;
      state.currentScreen = value.currentScreen;
      state.gameData = value.gameData;
    },
    updateCurrentLayout(state, value) {
      state.currentLayout = value;
    },
    updateCurrentScreen(state, { screen, index }) {
      state.currentScreen = screen;
      state.currentScreenIndex = index;
    },
    addScreen(state, value) {
      const newState = state.gameData.screens;
      newState.push(value);
      state.gameData.screens = newState;
    },
    addTile(state, value) {
      const newState = state.gameData.tiles;
      newState.push(value);
      state.gameData.tiles = newState;
    },
    addSpecialTile(state, value) {
      const newState = state;
      newState.gameData.screens[state.currentScreenIndex].data.specialTiles[`x${value.x}y${value.y}`] = (value)

      state = Object.assign({}, { ...newState });

    },
    setTileToReplace(state, index) {
      state.tileToReplace = state.gameData.tiles[index];
      state.tileToReplaceIndex = index;
    },
    updateTiles(state, value) {
      state.gameData.tiles = value;
    },
    setTileToPut(state, index) {
      state.tileToPut = state.gameData.tiles[index];
    },
    updateScreenBakground(state, value) {
      const newState = state;

      newState.gameData.screens[state.currentScreenIndex].data.background =
        value;

      state = newState;
    },
  },
  actions: {
    replaceTile({ state, commit }, index) {
      const tiles = state.gameData.tiles;
      const tileToMove = tiles[state.tileToReplaceIndex]; // dragged
      const originalTile = tiles[index]; // drop

      if (state.tileToReplaceIndex > index) {
        tiles.splice(state.tileToReplaceIndex, 1);
        tiles.splice(index, 1, tileToMove, originalTile);
      } else {
        tiles.splice(index, 1, originalTile, tileToMove);
        tiles.splice(state.tileToReplaceIndex, 1);
      }

      commit("updateTiles", tiles);
    },
    createScreen(context) {
      context.commit("addScreen", {
        title: "New Screen",
        data: {
          width: 0,
          height: 0,
          background: "",
          specialTiles: {}
        },
      });
    },
    findAndUpdateScreenBackground({ commit }, image) {
      commit("updateScreenBakground", image);
    },
    createTile(context, tileImageFile) {
      Array.from(tileImageFile.target.files).forEach((file) => {
        var reader = new FileReader();
        reader.onloadend = function () {
          context.commit("addTile", { img: reader.result, solid: false, liquid: false });
        };
        reader.readAsDataURL(file);
      });
    },
    Tile(context, tileImageFile) {
      Array.from(tileImageFile.target.files).forEach((file) => {
        var reader = new FileReader();
        reader.onloadend = function () {
          context.commit("addTile", { img: reader.result, solid: false, liquid: false });
        };
        reader.readAsDataURL(file);
      });
    },
    save({ state }) {
      localStorage.setItem("game", JSON.stringify(state));
    },
    load({ commit }) {
      const storageGame = localStorage.getItem("game");
      if (storageGame) {
        const gameData = JSON.parse(storageGame);
        commit("loadState", gameData);
      }
    },
  },
  modules: {},
});
