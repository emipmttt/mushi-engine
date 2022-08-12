import { LOADIPHLPAPI } from "dns";
<template>
  <div class="code">
    <div class="title">
      Code | {{ itemToCode }} <span @click="setCode">Save</span> |
      <span @click="format">Format</span>
    </div>
    <codemirror
      :modelValue="codeText"
      placeholder="Code goes here..."
      :style="{ width: '100% !important', height: '95vh' }"
      :autofocus="true"
      :indent-with-tab="true"
      :tab-size="2"
      :extensions="extensions"
      @change="codeText = $event"
    />
  </div>
</template>

<script>
import { Codemirror } from "vue-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { mapMutations, mapState } from "vuex";

export default {
  components: {
    Codemirror,
  },
  data() {
    return {
      extensions: [javascript(), oneDark],
      codeText: `console.log('Hello, world!')`,
    };
  },
  computed: {
    ...mapState(["itemToCode", "gameData", "currentScreenIndex"]),
  },
  watch: {
    itemToCode() {
      const currentScreen = this.gameData.screens[this.currentScreenIndex];
      const selectedTile = currentScreen.data.specialTiles[this.itemToCode];
      this.codeText = selectedTile.code || "";
    },
  },

  methods: {
    ...mapMutations(["setCodeToItem"]),
    setCode() {
      this.setCodeToItem(this.codeText);
    },
  },
};
</script>

<style>
.code {
  display: inline-block;
  vertical-align: top;
  width: 335px !important;
  box-sizing: border-box;
}

.title {
  padding: 10px;
}
</style>