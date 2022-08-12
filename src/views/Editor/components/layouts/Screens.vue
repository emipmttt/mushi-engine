<template>
  <div class="screens">
    <div @click="createScreen" class="screens__button">Create</div>
    <hr />
    <div
      v-for="(screen, index) in gameData.screens"
      :key="index"
      class="screens__button"
      @click="setScreen({ screen, index })"
    >
      <input
        class="screens__button--input"
        type="text"
        v-model="screen.title"
      />
      <input
        class="screens__button--input"
        type="text"
        v-model="screen.data.width"
        placeholder="Width"
        style="width: 40px"
        @input="setScreen({ screen, index })"
      />x
      <input
        class="screens__button--input"
        placeholder="Height"
        type="text"
        v-model="screen.data.height"
        style="width: 40px"
        @input="setScreen({ screen, index })"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  computed: {
    ...mapState(["gameData", "currentScreen"]),
  },
  methods: {
    ...mapActions(["createScreen"]),
    ...mapMutations(["updateCurrentScreen"]),
    setScreen({ screen, index }) {
      this.updateCurrentScreen({ screen, index });

      const img = document.createElement("img");
      img.src = this.currentScreen.data.background;
      console.log(this.currentScreen.data);
      const canvas = document.querySelector("#canvas");
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      setTimeout(() => {
        canvas.getContext("2d").drawImage(img, 0, 0);
      }, 10);
    },
  },
};
</script>

<style lang="scss">
.screens {
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
}
</style>