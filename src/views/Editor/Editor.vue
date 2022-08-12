<template>
  <div class="page">
    <aside class="sidebar">
      <Layout />
      <Screens v-if="currentLayout == 'SC'" />
      <BackgroundTiles v-if="currentLayout == 'TL'" />
      <Characters v-if="currentLayout == 'CH'" />
      <Code v-if="currentLayout == 'CD'" />
    </aside>
    <Screen v-if="currentScreen.title" :screen="currentScreen" />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Layout from "./components/Layout.vue";
import Screens from "./components/layouts/Screens.vue";
import Screen from "./components/Screen.vue";
import BackgroundTiles from "./components/layouts/BackgroundTiles.vue";
import Characters from "./components/layouts/Characters.vue";
import Code from "./components/layouts/Code.vue";

export default {
  components: { Layout, Screens, Screen, BackgroundTiles, Characters, Code },
  computed: {
    ...mapState(["currentLayout", "currentScreen"]),
  },
  methods: {
    ...mapActions(["load"]),
  },
  mounted() {
    this.load();
  },
};
</script>

<style>
.sidebar {
  width: 400px;
  background: #333;
  color: rgb(173, 173, 173);
  height: calc(100vh - 15px);
  display: inline-block;
  vertical-align: top;
  position: relative;
  z-index: 1;
}

.page {
  background: #222;
}

.input_form {
  width: 100%;
  box-sizing: border-box;
  padding: 15px;
  background: none;
  border: none;
  border-bottom: solid 1px #888;
  color: white;
}
</style>