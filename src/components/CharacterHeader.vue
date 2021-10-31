<template>
  <div class="CharacterHeader">
      <table id="CharacterHeaderTable" class="sectionHeader">
        <tr>
          <th scope="col">Header</th>
          <th scope="col">Header</th>
          <th scope="col" colspan="2">Header</th>
        </tr>
        <tr>
          <td><b>Name: </b>{{character.name}}</td>
          <td><b>Age: </b> {{character.age.adj}}</td>
          <td>Hitpoints: {{character.hitpoint.raw}}/{{character.hitpoint.adj}}</td>
          <td>Experience: {{character.experience.adj}}</td>
          <td v-for="(val,index) in character.classes" v-bind:key="index">{{val.name}}:{{val.level}}</td>
          <td><b>Player: </b>{{character.player.name}}</td>
        </tr>
        <tr >
          <td><b>Alignment: </b>{{character.alignment}}</td>
          <td><b>Race:</b></td>
          <td v-for="(value,name) in character.race" v-bind:key="name">{{name}} : {{value}}</td>
          <td><b>Height: </b>{{character.height.adj}}</td>
          <td><b>Weight: </b>{{character.weight.adj}}</td>
          <td><b>Size: </b>{{character.size.adj}}</td>
          <td><b>Hair: </b>{{character.hair}}</td>
          <td><b>Eyes: </b>{{character.eyes}}</td>
          <td><b>Skin: </b>{{character.skin}}</td>
        </tr>
        <tr>
          <td><b>Languages:</b></td>
          <td v-for="(val,index) in character.languages" v-bind:key="index">{{val.name}}</td>
        </tr>
        <tr>
          <td><b>Purse:</b></td>
          <td><b>plat: </b>{{character.purse.platinum}}</td>
          <td><b>gold: </b>{{character.purse.gold}}</td>
          <td><b>elec: </b>{{character.purse.electrum}}</td>
          <td><b>silv: </b>{{character.purse.silver}}</td>
          <td><b>copp: </b>{{character.purse.copper}}</td>
        </tr>
        <tr v-for="name in character.diety" v-bind:key="name">
          <td><b>Dieties</b></td>
          <td>{{name}}</td>
        </tr>
        <tr>
        </tr>
      </table>
  </div>
</template>

<script>
 export default {
  components: {  },
  data (){
      return {
      }
  },
  computed: {
      character () {
        const character = this.$store.state.character;
        return character;
      }
  },

 }

</script>
<style scoped>
  table {
    font-size: 20pt;
    max-width: 100%
  }

  td,th {
    border-style: solid;
    border-color: rgb(180, 170, 170);
    padding: 0 3px;
    font-size: 20px;
  }
</style>