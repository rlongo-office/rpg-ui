<template>
  <div class="CharacterHeader">
      <table id="CharacterHeaderTable">
        <tr>
          {{character.name}}
        </tr>
        <tr >
        </tr>
        <tr v-for="(value,name) in character.race" v-bind:key="name">
          <td>{{name}}</td>
          <td>{{value}}</td>
        </tr>
        <tr v-for="name in character.dieties" v-bind:key="name">
          <td>{{name}}</td>
        </tr>
      </table>
  </div>
</template>

<script>
 export default {
  data (){
      return {
      }
  },
  computed: {
      character () {
        const character = this.$store.state.character;
        return character;
      }
  }
 }

</script>