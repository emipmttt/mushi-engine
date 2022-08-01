<template>
  <div class="page">
    <aside class="sidebar">
      <Layout />
      <Screens v-if="currentLayout == 'SC'" />
      <BackgroundTiles v-if="currentLayout == 'TL'" />
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

export default {
  components: { Layout, Screens, Screen, BackgroundTiles },
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
  height: 100vh;
  display: inline-block;
  vertical-align: top;
}

.page {
  background: #222;
}
</style>