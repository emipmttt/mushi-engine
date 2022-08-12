<template>
  <div class="characters">
    <div class="form-create-character">
      <br />
      <label>
        <div class="form-create-character_square">
          <img :src="topImg" />
        </div>
        <input
          style="display: none"
          @change="(e) => setSprite(e, 'top')"
          type="file"
          multiple
        />
      </label>
      <br />
      <label>
        <div class="form-create-character_square">
          <img :src="leftImg" />
        </div>
        <input
          style="display: none"
          @change="(e) => setSprite(e, 'left')"
          type="file"
          multiple
        />
      </label>
      <label>
        <div class="form-create-character_square">
          <img :src="staticImg" />
        </div>
        <input
          style="display: none"
          @change="(e) => setSprite(e, 'static')"
          type="file"
          multiple
        />
      </label>
      <label>
        <div class="form-create-character_square">
          <img :src="rightImg" />
        </div>
        <input
          style="display: none"
          @change="(e) => setSprite(e, 'right')"
          type="file"
          multiple
        />
      </label>
      <br />
      <label>
        <div class="form-create-character_square">
          <img :src="bottomImg" />
        </div>
        <input
          style="display: none"
          @change="(e) => setSprite(e, 'bottom')"
          type="file"
          multiple
        />
      </label>
    </div>
    <input
      class="input_form"
      placeholder="Character Name"
      v-model="characterName"
      type="text"
    />
    <div @click="createCharacter" class="characters__button">Create</div>
    <hr />
    <div class="characters-list">
      <img
        v-for="(character, index) in gameData.characters"
        :src="character.directions.static"
        :key="index"
        @dblclick="removeCharacter(index)"
        @click="setCharacter(character)"
        class="characters-list__item"
      />
    </div>
    <div v-if="currentCharacter.directions?.static" class="tile-to-put-config">
      <div
        v-for="(option, index) in Object.keys(characterOptions)"
        class="selection-tile"
        :key="'character_option_' + index"
        :style="
          currentCharacter.options[option]
            ? 'background-color: #5dace1;color:white '
            : 'background-color: #333;color:white;'
        "
        @click="
          currentCharacter.options[option] = !currentCharacter.options[option]
        "
      >
        {{ option }}
      </div>
      <img
        id="tileToPut"
        class="current-tile"
        :src="currentCharacter.directions?.static"
      />
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      characterName: "",
      topImg: "",
      leftImg: "",
      staticImg: "",
      rightImg: "",
      bottomImg: "",
      currentCharacter: {},
      characterOptions: {
        // just reference don't update
        pushable: false,
        playable: false,
        attackable: false,
        enemie: false,
      },
    };
  },
  computed: {
    ...mapState(["gameData"]),
  },
  methods: {
    ...mapMutations(["addCharacters", "removeCharacter", "addTile"]),
    setSprite(e, direction) {
      const file = e.target.files[0];
      console.log(file, direction);

      const vm = this;

      var reader = new FileReader();
      reader.onloadend = function () {
        vm[direction + "Img"] = reader.result;
        console.log(vm[direction + "Img"]);
      };
      reader.readAsDataURL(file);
    },
    createCharacter() {
      var vm = this;
      const data = {
        name: this.characterName,
        directions: {
          top: this.topImg,
          left: this.leftImg,
          static: this.staticImg,
          right: this.rightImg,
          bottom: this.bottomImg,
        },
        options: vm.characterOptions,
      };
      this.addCharacters(data);
      this.addTile(data);
    },
    setCharacter(character) {
      this.currentCharacter = character;
    },
  },
};
</script>


<style lang="scss">
.characters {
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

.form-create-character {
  text-align: center;
  &_square {
    display: inline-block;
    width: 64px;
    height: 64px;
    background: #666;
    margin-right: 4px;
    border-radius: 5px;
    cursor: pointer;
    overflow: hidden;
  }

  &_square:hover {
    background: #888;
  }
}

.characters-list {
  &__item:hover {
    background: #666;
    cursor: pointer;
  }
}
</style>