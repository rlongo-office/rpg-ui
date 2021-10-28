<template>
  <div class="SkillTable">
      <table id="SkillTable" class="sectionHeader">
        <tr class="sectionHeader">
          <th>Name</th>
          <th>Pass</th>
          <th>Base</th>
          <th>Adj</th>
        </tr>
        <tr v-for="(val, index) in character.skills" :key="index">
          <td>{{val.name}}</td>
          <td>{{val.passive}}</td>
          <td>{{val.stat.raw}}</td>
          <td>
            <button class="mybtn stat">{{val.stat.adj}}</button>
          </td>
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
        return this.$store.state.character
      }
  }
 }
</script>
<style scoped>
  td,th {
    border-style: solid;
    border-color: darkgray;
    padding: 0 3px;
    font-size: 18px;
  }
</style>